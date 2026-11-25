import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronDown, CircleHelp, House, MessageCircle, MessageSquare } from "lucide-react";
import {
  ErreurChat,
  envoyer as envoyerAuServeur,
  laisserEmail,
  parlerATed,
  suivre,
  type CodeChat,
} from "@/lib/chat";
import { suivreEvenement } from "@/lib/mesure";
import { SITALY_EMAIL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";
import { Fil, type Ligne } from "@/components/chat/Fil";
import { Accueil } from "@/components/chat/Accueil";
import { Aide, type VueAide } from "@/components/chat/Aide";
import { EnTeteConversation, ListeMessages } from "@/components/chat/Messages";
import { DEGRADE } from "@/components/chat/elements";
import type { Article } from "@/components/chat/articles-aide";

/**
 * La bulle de discussion de sitaly.fr (16 novembre 2026, SITA-22), en trois
 * onglets depuis le 17 novembre, sur le modèle du messager d'Intercom chez
 * Indy : Accueil, Messages, Aide.
 *
 * - Accueil : le bonjour, l'accès à la conversation, la recherche, trois
 *   réponses fréquentes et le lien vers l'application.
 * - Messages : la conversation. L'IA répond tout de suite avec le seul
 *   contenu du site ; quand elle ne sait pas, le visiteur demande Ted, qui
 *   reçoit une notification et un e-mail et répond depuis son pilotage.
 * - Aide : la FAQ produit et les guides pas à pas, rangés en collections,
 *   avec une recherche. Rien n'y part au serveur.
 *
 * Montée en React.lazy depuis __root.tsx, à un moment de repos : rien de cette
 * bulle n'est dans le chemin critique, et le bouton n'entre dans le DOM
 * qu'une fois son lot de JavaScript arrivé. Le LCP ne bouge pas.
 *
 * Ni cookie, ni traceur : l'identifiant de la conversation tient dans
 * sessionStorage, le temps de l'onglet (src/lib/chat.ts).
 */

const TEXTES = {
  bouton: "Une question ? Discuter avec Sitaly",
  accueil:
    "Bonjour. Posez votre question sur Sitaly\u00a0: les formules, ce que fait l'application, ce qui est compris. Je réponds avec ce qui est écrit sur le site.",
  neSaitPas:
    "Je n'ai pas cette réponse sur le site. Ted, qui dirige Sitaly, peut vous répondre lui-même.",
  horsSujet: `Je réponds seulement sur Sitaly et sur ce que fait l'application. Pour autre chose, écrivez à ${SITALY_EMAIL}.`,
  tedPrevenu: "Ted est prévenu. Restez sur la page, sa réponse s'affiche ici.",
  demandeEmail:
    "Vous pouvez laisser votre e-mail pour recevoir sa réponse même après avoir fermé la page. C'est facultatif.",
  emailEnregistre: (email: string) => `C'est noté. Ted vous écrit à ${email}.`,
  limite: `Vous avez posé beaucoup de questions aujourd'hui. Écrivez à ${SITALY_EMAIL}, Ted vous répondra.`,
  close: "Cette discussion est close. Rechargez la page pour en ouvrir une nouvelle.",
  panne: `La réponse ne part pas. Écrivez à ${SITALY_EMAIL} ou appelez le ${SITALY_PHONE_DISPLAY}.`,
  pied: "Vos messages servent à vous répondre. Ni cookie, ni publicité.",
};

/** La relance, tant que Ted n'a pas répondu. Elle ralentit après deux minutes. */
const RELANCE_VIVE = 4_000;
const RELANCE_LENTE = 15_000;
const AVANT_DE_RALENTIR = 120_000;
/** Ted met quelques minutes à écrire : passé une demi-minute, la bulle propose l'e-mail. */
const AVANT_DE_DEMANDER_EMAIL = 30_000;

type Onglet = "accueil" | "messages" | "aide";

const ONGLETS: { id: Onglet; libelle: string; Icone: typeof House }[] = [
  { id: "accueil", libelle: "Accueil", Icone: House },
  { id: "messages", libelle: "Messages", Icone: MessageSquare },
  { id: "aide", libelle: "Aide", Icone: CircleHelp },
];

let compteur = 0;
const cle = () => `l${++compteur}`;

export default function BulleChat() {
  const [ouvert, setOuvert] = useState(false);
  const [onglet, setOnglet] = useState<Onglet>("accueil");
  const [enConversation, setEnConversation] = useState(false);
  const [vueAide, setVueAide] = useState<VueAide>({ type: "collections" });
  const [rechercheAuto, setRechercheAuto] = useState(false);
  const [nonLu, setNonLu] = useState(false);

  const [lignes, setLignes] = useState<Ligne[]>([
    { cle: cle(), auteur: "site", texte: TEXTES.accueil, le: Date.now() },
  ]);
  const [attente, setAttente] = useState(false);
  const [codeErreur, setCodeErreur] = useState<CodeChat | null>(null);
  const [tedDemande, setTedDemande] = useState(false);
  const [tedARepondu, setTedARepondu] = useState(false);
  const [emailDemande, setEmailDemande] = useState(false);
  const [emailLaisse, setEmailLaisse] = useState<string | null>(null);
  const dernierId = useRef(0);
  const panneau = useRef<HTMLDivElement | null>(null);
  const champ = useRef<HTMLInputElement | null>(null);
  const declencheur = useRef<HTMLButtonElement | null>(null);

  const ajouter = useCallback(
    (ligne: Omit<Ligne, "cle" | "le">) =>
      setLignes((l) => [...l, { cle: cle(), le: Date.now(), ...ligne }]),
    [],
  );

  const conversationCommencee = lignes.some((l) => l.auteur === "visiteur");

  /* --------------------------------------------- ouverture et fermeture */

  const ouvrir = () => {
    setOuvert(true);
    suivreEvenement("chat_ouvert");
  };

  const fermer = useCallback(() => setOuvert(false), []);

  const changerOnglet = (o: Onglet) => {
    setOnglet(o);
    setEnConversation(false);
    setRechercheAuto(false);
    if (o === "aide") setVueAide({ type: "collections" });
    suivreEvenement("chat_onglet", { onglet: o });
  };

  /** Ouvre la conversation, et pose la question tout de suite si elle est donnée. */
  const demander = (question?: string) => {
    setOnglet("messages");
    setEnConversation(true);
    setNonLu(false);
    if (question) void envoyer(question);
  };

  const lireArticle = (article: Article) => {
    setOnglet("aide");
    setEnConversation(false);
    setVueAide({ type: "article", article, depuis: { type: "collections" } });
    suivreEvenement("chat_aide_article", { article: article.id, depuis: "accueil" });
  };

  // Le bouton reprend le focus à la fermeture, une fois qu'il est revenu dans
  // le DOM : c'est ce qui permet de refermer et de rouvrir au clavier.
  const aEteOuvert = useRef(false);
  useEffect(() => {
    if (ouvert) aEteOuvert.current = true;
    else if (aEteOuvert.current) declencheur.current?.focus();
  }, [ouvert]);

  // Dans la conversation, le champ prend le focus, sauf sur un écran tactile :
  // le clavier s'ouvrirait, l'écran rétrécirait et la page sauterait.
  useEffect(() => {
    if (!ouvert || !enConversation) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) champ.current?.focus();
  }, [ouvert, enConversation]);

  // Échap ferme, et le focus ne sort pas du panneau tant qu'il est ouvert.
  useEffect(() => {
    if (!ouvert) return;
    // Sur téléphone, le panneau prend tout l'écran : la page derrière ne défile plus.
    const telephone = window.matchMedia("(max-width: 639px)").matches;
    const avant = document.documentElement.style.overflow;
    if (telephone) document.documentElement.style.overflow = "hidden";
    else panneau.current?.focus();
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") return fermer();
      if (e.key !== "Tab" || !panneau.current) return;
      const cibles = panneau.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), a[href]",
      );
      if (!cibles.length) return;
      const premier = cibles[0];
      const dernier = cibles[cibles.length - 1];
      if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      } else if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      }
    };
    document.addEventListener("keydown", auClavier);
    return () => {
      document.removeEventListener("keydown", auClavier);
      if (telephone) document.documentElement.style.overflow = avant;
    };
  }, [ouvert, fermer]);

  /* --------------------------------------------- la question du visiteur */

  const envoyer = async (texte: string) => {
    ajouter({ auteur: "visiteur", texte });
    setAttente(true);
    setCodeErreur(null);
    suivreEvenement("chat_message");
    try {
      const r = await envoyerAuServeur(texte, window.location.pathname);
      if (r.hors_sujet) {
        ajouter({ auteur: "ia", texte: TEXTES.horsSujet });
      } else if (!r.sait) {
        suivreEvenement("chat_ia_ne_sait_pas", { question: texte.slice(0, 100) });
        // La phrase de l'IA dit ce qui manque ; celle du site propose Ted.
        if (r.reponse) ajouter({ auteur: "ia", texte: r.reponse });
        ajouter({ auteur: "site", texte: TEXTES.neSaitPas, offrirTed: !tedDemande });
      } else {
        ajouter({ auteur: "ia", texte: r.reponse, offrirTed: r.proposer_ted && !tedDemande });
      }
    } catch (e) {
      setCodeErreur(e instanceof ErreurChat ? e.code : "PANNE");
    } finally {
      setAttente(false);
    }
  };

  /* --------------------------------------------- « Parler à Ted » */

  const demanderTed = async () => {
    setLignes((l) => l.map((x) => ({ ...x, offrirTed: false })));
    setTedDemande(true);
    suivreEvenement("chat_parler_a_ted");
    try {
      await parlerATed();
      ajouter({ auteur: "site", texte: TEXTES.tedPrevenu });
    } catch (e) {
      setTedDemande(false);
      setCodeErreur(e instanceof ErreurChat ? e.code : "PANNE");
    }
  };

  // Le visiteur qui lit l'aide pendant que Ted écrit voit un point sur
  // l'onglet Messages quand la réponse arrive.
  const regardeLaConversation = useRef(false);
  regardeLaConversation.current = onglet === "messages" && enConversation;

  // La relance ne tourne qu'une fois Ted prévenu : avant, la réponse de l'IA
  // arrive dans la même requête, et il n'y a rien à aller chercher.
  useEffect(() => {
    if (!ouvert || !tedDemande || tedARepondu) return;
    const depuis = Date.now();
    let minuterie = 0;
    const tour = async () => {
      if (document.visibilityState === "visible") {
        try {
          const { messages } = await suivre(dernierId.current);
          for (const m of messages) {
            dernierId.current = Math.max(dernierId.current, m.id);
            if (m.auteur !== "ted") continue;
            ajouter({ auteur: "ted", texte: m.texte });
            setTedARepondu(true);
            if (!regardeLaConversation.current) setNonLu(true);
          }
        } catch {
          // Une relance ratée n'est pas une panne : le tour suivant réessaie.
        }
      }
      minuterie = window.setTimeout(
        tour,
        Date.now() - depuis > AVANT_DE_RALENTIR ? RELANCE_LENTE : RELANCE_VIVE,
      );
    };
    minuterie = window.setTimeout(tour, RELANCE_VIVE);
    return () => window.clearTimeout(minuterie);
  }, [ouvert, tedDemande, tedARepondu, ajouter]);

  // Ted met quelques minutes à écrire : passé une demi-minute, la bulle
  // propose de porter sa réponse par e-mail.
  useEffect(() => {
    if (!tedDemande || tedARepondu || emailLaisse) return;
    const id = window.setTimeout(() => setEmailDemande(true), AVANT_DE_DEMANDER_EMAIL);
    return () => window.clearTimeout(id);
  }, [tedDemande, tedARepondu, emailLaisse]);

  /* --------------------------------------------- l'e-mail facultatif */

  const [email, setEmail] = useState("");
  const noterEmail = async (e: FormEvent) => {
    e.preventDefault();
    const propre = email.trim();
    if (!propre) return;
    try {
      await laisserEmail(propre);
      setEmailLaisse(propre);
      setEmailDemande(false);
      suivreEvenement("chat_email_laisse");
      ajouter({ auteur: "site", texte: TEXTES.emailEnregistre(propre) });
    } catch {
      setCodeErreur("PANNE");
    }
  };

  /* --------------------------------------------- l'affichage */

  const message =
    codeErreur === "LIMITE"
      ? TEXTES.limite
      : codeErreur === "CLOSE"
        ? TEXTES.close
        : codeErreur
          ? TEXTES.panne
          : null;

  return (
    <>
      <button
        ref={declencheur}
        type="button"
        onClick={ouvert ? fermer : ouvrir}
        aria-label={ouvert ? "Fermer la discussion" : TEXTES.bouton}
        aria-expanded={ouvert}
        aria-controls="bulle-chat"
        // Au-dessus du bandeau des cookies et du bouton collant des pages
        // produit, jamais sur eux : les deux annoncent leur hauteur en
        // variable CSS (CookieConsent, BoutonCollant). Panneau ouvert, il reste
        // sur ordinateur pour le refermer ; sur téléphone, le panneau prend
        // tout l'écran et a sa propre croix.
        style={{ bottom: "calc(var(--bandeau-cookies, 0px) + var(--bouton-collant, 0px) + 1rem)" }}
        className={`fixed right-5 z-[70] h-14 w-14 place-items-center rounded-full text-white shadow-[0_8px_24px_-10px_rgba(9,9,11,0.45)] transition hover:scale-105 motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 focus-visible:ring-offset-2 ${DEGRADE} ${ouvert ? "hidden sm:grid" : "grid"}`}
      >
        {ouvert ? (
          <ChevronDown className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
        {nonLu && !ouvert && (
          <span
            className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-[#ef4444] ring-2 ring-white"
            aria-hidden="true"
          />
        )}
      </button>

      {ouvert && (
        <div
          ref={panneau}
          id="bulle-chat"
          role="dialog"
          aria-label="Discuter avec Sitaly"
          tabIndex={-1}
          className="fixed inset-x-0 top-0 bottom-[var(--bandeau-cookies,0px)] z-[70] flex flex-col overflow-hidden bg-white outline-none motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-200 sm:inset-x-auto sm:top-auto sm:right-5 sm:bottom-[calc(var(--bandeau-cookies,0px)_+_var(--bouton-collant,0px)_+_5.25rem)] sm:h-[min(690px,calc(100dvh_-_var(--bandeau-cookies,0px)_-_var(--bouton-collant,0px)_-_7rem))] sm:w-[400px] sm:origin-bottom-right sm:rounded-[22px] sm:shadow-[0_12px_48px_rgba(17,12,46,0.22)] sm:ring-1 sm:ring-black/[0.06] sm:motion-safe:zoom-in-95"
        >
          {onglet === "accueil" && (
            <Accueil
              surFermer={fermer}
              surQuestion={() => demander()}
              surChercher={() => {
                setOnglet("aide");
                setVueAide({ type: "collections" });
                setRechercheAuto(true);
              }}
              surArticle={lireArticle}
              conversationEnCours={conversationCommencee}
            />
          )}

          {onglet === "messages" && !enConversation && (
            <ListeMessages lignes={lignes} surOuvrir={() => demander()} surFermer={fermer} />
          )}

          {onglet === "messages" && enConversation && (
            <>
              <EnTeteConversation surRetour={() => setEnConversation(false)} surFermer={fermer} />
              <Fil
                lignes={lignes}
                attente={attente}
                desactive={codeErreur === "LIMITE" || codeErreur === "CLOSE"}
                surEnvoi={(t) => void envoyer(t)}
                surParlerATed={() => void demanderTed()}
                premierChamp={champ}
              />

              {message && (
                <p className="border-t border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  {message}
                  {codeErreur === "PANNE" && (
                    <>
                      {" "}
                      <a href={`tel:${SITALY_PHONE}`} className="underline">
                        Appeler
                      </a>
                    </>
                  )}
                </p>
              )}

              {emailDemande && !emailLaisse && (
                <form
                  onSubmit={noterEmail}
                  className="space-y-2 border-t border-black/[0.07] bg-[#f7f5fb] px-4 py-3"
                >
                  <label className="block text-xs text-black/60" htmlFor="bulle-chat-email">
                    {TEXTES.demandeEmail}
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="bulle-chat-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="vous@exemple.fr"
                      className="min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-base text-black placeholder:text-black/40 focus:border-[#7014c2]/60 focus:outline-none sm:text-sm"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-xl bg-[#7014c2] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#5d2dc4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7014c2]/40"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              )}

              <p className="bg-white px-4 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-0 text-center text-[11px] leading-snug text-black/40">
                {TEXTES.pied}{" "}
                <a href="/politique-confidentialite/" className="underline">
                  Confidentialité
                </a>
              </p>
            </>
          )}

          {onglet === "aide" && (
            <Aide
              vue={vueAide}
              surVue={setVueAide}
              surFermer={fermer}
              surDemander={demander}
              rechercheAuto={rechercheAuto}
            />
          )}

          {/* Les trois onglets, cachés pendant la conversation comme chez Intercom. */}
          {!(onglet === "messages" && enConversation) && (
            <nav
              aria-label="Rubriques du chat"
              className="grid grid-cols-3 border-t border-black/[0.06] bg-white pb-[env(safe-area-inset-bottom)]"
            >
              {ONGLETS.map(({ id, libelle, Icone }) => {
                const actif = onglet === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => changerOnglet(id)}
                    aria-current={actif ? "page" : undefined}
                    className={`relative flex flex-col items-center gap-1 pb-3 pt-2.5 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7014c2]/40 ${
                      actif
                        ? "font-semibold text-[#7014c2]"
                        : "font-medium text-black/55 hover:text-black/80"
                    }`}
                  >
                    <span className="relative">
                      <Icone
                        className="h-[22px] w-[22px]"
                        strokeWidth={actif ? 2.2 : 1.8}
                        fill={actif ? "currentColor" : "none"}
                        fillOpacity={actif ? 0.14 : 0}
                        aria-hidden="true"
                      />
                      {id === "messages" && nonLu && (
                        <span
                          className="absolute -right-1 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#ef4444] ring-2 ring-white"
                          aria-label="Nouveau message"
                        />
                      )}
                    </span>
                    {libelle}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      )}
    </>
  );
}
