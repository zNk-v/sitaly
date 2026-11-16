import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, X } from "lucide-react";
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

/**
 * La bulle de discussion de sitaly.fr (16 novembre 2026, SITA-22).
 *
 * Du 4 au 16 novembre : 608 visiteurs, 2 inscriptions. Un visiteur qui a une
 * question et ne trouve pas la réponse repart. L'IA répond tout de suite avec
 * le seul contenu du site ; quand elle ne sait pas, le visiteur demande Ted,
 * qui reçoit une notification et un e-mail et répond depuis son pilotage.
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
  titre: "Une question sur Sitaly ?",
  sous: "L'IA de Sitaly répond avec le contenu du site. Ted prend le relais quand il faut.",
  accueil:
    "Bonjour. Posez votre question sur Sitaly : les formules, ce que fait l'application, ce qui est compris. Je réponds avec ce qui est écrit sur le site.",
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

let compteur = 0;
const cle = () => `l${++compteur}`;

export default function BulleChat() {
  const [ouvert, setOuvert] = useState(false);
  const [lignes, setLignes] = useState<Ligne[]>([
    { cle: cle(), auteur: "site", texte: TEXTES.accueil },
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
    (ligne: Omit<Ligne, "cle">) => setLignes((l) => [...l, { cle: cle(), ...ligne }]),
    [],
  );

  /* --------------------------------------------- ouverture et fermeture */

  const ouvrir = () => {
    setOuvert(true);
    suivreEvenement("chat_ouvert");
  };

  const fermer = useCallback(() => setOuvert(false), []);

  // Le bouton reprend le focus à la fermeture, une fois qu'il est revenu dans
  // le DOM : c'est ce qui permet de refermer et de rouvrir au clavier.
  const aEteOuvert = useRef(false);
  useEffect(() => {
    if (ouvert) aEteOuvert.current = true;
    else if (aEteOuvert.current) declencheur.current?.focus();
  }, [ouvert]);

  // Échap ferme, et le focus ne sort pas du panneau tant qu'il est ouvert.
  useEffect(() => {
    if (!ouvert) return;
    // Sur un écran tactile, le focus ouvrirait le clavier dès l'ouverture :
    // l'écran rétrécit et la page saute. Le visiteur touche le champ lui-même.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) champ.current?.focus();
    // Sur téléphone, la page derrière le panneau ne défile plus tant qu'il est ouvert.
    const telephone = window.matchMedia("(max-width: 639px)").matches;
    const avant = document.documentElement.style.overflow;
    if (telephone) document.documentElement.style.overflow = "hidden";
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
        onClick={ouvrir}
        aria-label={TEXTES.bouton}
        aria-expanded={ouvert}
        aria-controls="bulle-chat"
        hidden={ouvert}
        // Au-dessus du bandeau des cookies et du bouton collant des pages
        // produit, jamais sur eux : les deux annoncent leur hauteur en
        // variable CSS (CookieConsent, BoutonCollant).
        style={{ bottom: "calc(var(--bandeau-cookies, 0px) + var(--bouton-collant, 0px) + 1rem)" }}
        className="fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(to_top_right,#0b53b0,#3049ba,#483dc1,#5d2dc4,#7014c2,#8c009e,#9d0073,#a60047,#a51111)] text-white shadow-lg shadow-[#7014c2]/40 ring-4 ring-[#7014c2]/15 transition hover:scale-105 hover:shadow-xl motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-[#7014c2]/50 focus-visible:ring-offset-2"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </button>

      {ouvert && (
        <div
          ref={panneau}
          id="bulle-chat"
          role="dialog"
          aria-label="Discuter avec Sitaly"
          className="fixed inset-x-3 z-40 flex flex-col overflow-hidden rounded-3xl border border-[#7014c2]/20 bg-white shadow-2xl shadow-[#7014c2]/20 sm:inset-x-auto sm:right-4 sm:w-[380px]"
          style={{
            height: "min(70dvh, 560px)",
            bottom: "calc(var(--bandeau-cookies, 0px) + 0.75rem)",
          }}
        >
          <div className="flex items-start justify-between gap-3 bg-[linear-gradient(to_top_right,#0b53b0,#3049ba,#483dc1,#5d2dc4,#7014c2,#8c009e,#9d0073,#a60047,#a51111)] px-4 py-3.5 text-white">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-semibold">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-[#4ade80] ring-2 ring-white/40"
                  aria-hidden="true"
                />
                {TEXTES.titre}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-white/90">{TEXTES.sous}</p>
            </div>
            <button
              type="button"
              onClick={fermer}
              aria-label="Fermer la discussion"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

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
              className="space-y-2 border-t border-black/[0.07] bg-black/[0.02] px-4 py-3"
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
                  className="min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-base text-black sm:text-sm placeholder:text-black/40 focus:border-[#7014c2]/60 focus:outline-none"
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

          <p className="border-t border-black/[0.07] px-4 py-2.5 text-[11px] leading-snug text-black/45">
            {TEXTES.pied}{" "}
            <a href="/politique-confidentialite/" className="underline">
              Confidentialité
            </a>
          </p>
        </div>
      )}
    </>
  );
}
