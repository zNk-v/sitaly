import { avecCampagne } from "@/lib/mesure";
import { departVersAppTiktok } from "@/lib/pixel-tiktok";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, Eye, Lock, ShieldCheck, Sparkles, Star } from "lucide-react";
import { APP_URL, euros, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";
import {
  BLACK_FRIDAY,
  blackFridayActif,
  CREATEUR_IA as IA,
  GARANTIE,
  MENTION_TVA,
  PHRASE_APERCU,
  PHRASE_PRIX_APPEL,
  PRIX_APPEL,
} from "@/data/offres";
import { FICHE_GOOGLE_URL, NOTE_GOOGLE } from "@/data/avis-google";
import { FAQ_PRODUIT } from "@/data/faq-produit";
import { RepereRail } from "@/components/RepereRail";
import { useHorsEcran } from "@/lib/ecran";

/**
 * Les blocs de la vitrine de Sitaly App (30 octobre 2026), partagés par
 * l'accueil et /tarifs/. Allure de durable.com (DESIGN.md §13) : fond blanc,
 * titres centrés `titre-produit`, cartes gris très clair, boutons presque
 * noirs, couleur réservée aux surtitres.
 *
 * Tout ce qui est promis ici existe dans l'application. Ce qui n'existe pas
 * encore porte « Bientôt ».
 */

export const CARTE = "rounded-3xl bg-black/[0.03]";
export const BOUTON_NOIR =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-black/85 px-5 py-3 text-sm font-medium text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 disabled:opacity-60";
export const BOUTON_CLAIR =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black/85 transition hover:bg-black/[0.03]";
export const TEXTE_GRIS = "text-black/60";

/** L'adresse de l'application, avec la phrase du visiteur : elle remplit la création après l'inscription. */
/**
 * Sans phrase, le lien va droit à la première question de l'app (/creer) :
 * l'accueil de l'app répète celui de sitaly.fr, le visiteur le verrait deux fois.
 */
export const lienCreation = (activite?: string) =>
  activite
    ? `${APP_URL}/?activite=${encodeURIComponent(activite.slice(0, 600))}`
    : `${APP_URL}/creer`;

export function TitreSection({
  surtitre,
  titre,
  sousTitre,
}: {
  surtitre: string;
  titre: string;
  sousTitre?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-sm font-medium text-brand-ink">{surtitre}</div>
      <h2 className="titre-produit mt-3 text-[2.15rem] sm:text-5xl lg:text-6xl">{titre}</h2>
      {sousTitre && (
        <p className={`mx-auto mt-5 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>{sousTitre}</p>
      )}
    </div>
  );
}

/**
 * La note Google avec son nombre d'avis, menant à la fiche.
 *
 * Le 30 octobre 2026, Teddy avait retiré le compte pour ne pas afficher « 3 ».
 * L'audit SEO du 13 novembre 2026 (1.2) le remet : un « 5/5 » sans compte ni
 * date se lit comme une note inventée, et trois avis nommés valent mieux
 * qu'un chiffre que personne ne peut situer. À rediscuter avec Teddy.
 */
export function NoteGoogle({ clair = false }: { clair?: boolean }) {
  return (
    <a
      href={FICHE_GOOGLE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 hover:underline ${clair ? "text-white/80" : ""}`}
    >
      <span className="inline-flex text-[#16a34a]" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </span>
      Noté {NOTE_GOOGLE.note}/5 sur Google · {NOTE_GOOGLE.nombre} avis, le dernier en{" "}
      {NOTE_GOOGLE.dernier}
    </a>
  );
}

export function Confiance() {
  return (
    <p
      className={`mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base sm:text-sm ${TEXTE_GRIS}`}
    >
      <span>Aperçu gratuit, sans compte ni carte</span>
      <span aria-hidden="true" className="hidden sm:inline">
        •
      </span>
      <NoteGoogle />
      <span aria-hidden="true" className="hidden sm:inline">
        •
      </span>
      <span>Entreprise française</span>
    </p>
  );
}

const IDEES = [
  "Ostéopathe à Lyon",
  "Plombier chauffagiste à Arpajon",
  "Fleuriste à Nantes",
  "Coach sportive à Bordeaux",
];

/** Les phrases que le bouton « Inspire-moi » écrit dans l'encart, lettre après lettre. */
const INSPIRATIONS = [
  "Je suis ostéopathe à Lyon, je soigne aussi les sportifs et les nourrissons",
  "Boulangerie artisanale à Nantes, pain au levain et viennoiseries maison",
  "Plombier chauffagiste en Essonne, dépannage en urgence 7 jours sur 7",
  "Coach sportive à Bordeaux, séances en plein air et à domicile",
  "Fleuriste à Lille, bouquets de mariage et livraison le jour même",
  "Photographe de mariage en Provence, reportages naturels et sans pose",
];

/**
 * La boîte du premier écran : une phrase, puis l'application. La phrase part
 * dans l'adresse (?activite=) ; l'application la garde pendant l'inscription
 * et en remplit la page de création. Le bouton Sitaly à gauche écrit une
 * phrase d'exemple pour qui ne sait pas par où commencer.
 */
export function BoiteApp({ idees = true }: { idees?: boolean }) {
  const id = useId();
  const { ref: refLueur, classe: lueur } = useHorsEcran<HTMLDivElement>();
  const [activite, setActivite] = useState("");
  const minuteur = useRef<ReturnType<typeof setInterval> | null>(null);
  const tour = useRef(0);

  useEffect(
    () => () => {
      if (minuteur.current) clearInterval(minuteur.current);
    },
    [],
  );

  function inspirer() {
    if (minuteur.current) clearInterval(minuteur.current);
    const phrase = INSPIRATIONS[tour.current++ % INSPIRATIONS.length];
    let n = 0;
    setActivite("");
    minuteur.current = setInterval(() => {
      n += 2;
      setActivite(phrase.slice(0, n));
      if (n >= phrase.length && minuteur.current) clearInterval(minuteur.current);
    }, 28);
  }

  function envoyer(e: FormEvent) {
    e.preventDefault();
    departVersAppTiktok("formulaire-produit");
    window.location.href = avecCampagne(lienCreation(activite.trim()));
  }

  return (
    <div data-boite-ia ref={refLueur} className={lueur}>
      {/* Le liseré au dégradé du logo, et sa lueur qui respire derrière (16/11/2026).
          Elle ne respire que dans l'écran : hors champ, elle repeignait pour rien. */}
      <div className="relative isolate rounded-3xl bg-[linear-gradient(to_top_right,#0b53b0,#3049ba,#483dc1,#5d2dc4,#7014c2,#8c009e,#9d0073,#a60047,#a51111)] p-[1.5px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
        <div
          aria-hidden="true"
          className="lueur-sitaly pointer-events-none absolute -inset-1.5 -z-10 rounded-[30px] bg-[linear-gradient(to_top_right,#0b53b0,#3049ba,#483dc1,#5d2dc4,#7014c2,#8c009e,#9d0073,#a60047,#a51111)] blur-lg"
        />
        <form onSubmit={envoyer} className="rounded-[22.5px] bg-white p-2.5">
          <label htmlFor={`${id}-activite`} className="sr-only">
            Votre activité
          </label>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 pl-1">
              <button
                type="button"
                onClick={inspirer}
                title="Inspire-moi : écrire un exemple"
                aria-label="Écrire une phrase d'exemple"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed] sm:h-10 sm:w-10 text-white shadow-sm transition hover:scale-105 active:scale-95"
              >
                <Sparkles className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
              <input
                id={`${id}-activite`}
                value={activite}
                onChange={(e) => setActivite(e.target.value)}
                maxLength={600}
                placeholder="Quelle est votre activité ?"
                className="min-h-12 w-full bg-transparent text-[17px] outline-none placeholder:text-black/40"
              />
            </div>
            <button type="submit" className={`${BOUTON_NOIR} min-h-12 px-6 text-[15px]`}>
              Créer mon site
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
      {idees && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {IDEES.map((idee, k) => (
            <button
              key={idee}
              type="button"
              onClick={() => setActivite(idee)}
              className={`min-h-11 items-center rounded-full bg-black/[0.04] px-3.5 py-1.5 text-sm text-black/65 transition hover:bg-black/[0.08] sm:min-h-0 ${k >= 2 ? "hidden sm:inline-flex" : "inline-flex"}`}
            >
              {idee}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Le mur d'exemples
   --------------------------------------------------------------------------- */

/** Marques inventées, domaines en `.exemple` (RFC 2606) : la légende du mur le dit. */
const EXEMPLES = [
  {
    nom: "Toitures Dumont",
    domaine: "toitures-dumont.exemple",
    titre: "Votre toiture refaite, sans mauvaise surprise",
    services: ["Réfection", "Zinguerie", "Fuites"],
    fond: "#1f2a37",
    texte: "#ffffff",
    accent: "#e0a458",
  },
  {
    nom: "Atelier Lune",
    domaine: "atelier-lune.exemple",
    titre: "Coupe, couleur et soin, sur rendez-vous",
    services: ["Coupe", "Couleur", "Soin"],
    fond: "#f3e9e2",
    texte: "#3b2a22",
    accent: "#b5651d",
  },
  {
    nom: "Vert Cerisier",
    domaine: "vert-cerisier.exemple",
    titre: "Des jardins entretenus toute l'année",
    services: ["Tonte", "Taille", "Création"],
    fond: "#2f4a3a",
    texte: "#ffffff",
    accent: "#c9e4a6",
  },
  {
    nom: "Le Fournil d'Or",
    domaine: "fournil-dor.exemple",
    titre: "Pain au levain cuit chaque matin",
    services: ["Pains", "Viennoiseries", "Commandes"],
    fond: "#f6efe3",
    texte: "#3d2614",
    accent: "#8a4b1e",
  },
  {
    nom: "Clé Minute",
    domaine: "cle-minute.exemple",
    titre: "Porte claquée ? On arrive en 30 minutes",
    services: ["Ouverture", "Serrures", "Blindage"],
    fond: "#ffffff",
    texte: "#111111",
    accent: "#d62828",
  },
];

export function MurDExemples() {
  const decalages = ["lg:mt-16", "lg:mt-4", "lg:mt-0", "lg:mt-8", "lg:mt-20"];
  const visibilite = ["", "", "hidden md:block", "hidden lg:block", "hidden lg:block"];
  return (
    <figure className="mx-auto max-w-7xl">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {EXEMPLES.map((s, i) => (
          <div key={s.domaine} className={`${decalages[i]} ${visibilite[i]}`}>
            <MiniSite site={s} />
          </div>
        ))}
      </div>
      <figcaption className={`mt-8 text-center text-sm ${TEXTE_GRIS}`}>
        Exemples de sites : les entreprises sont inventées.
      </figcaption>
    </figure>
  );
}

function MiniSite({ site }: { site: (typeof EXEMPLES)[number] }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]"
      data-nosnippet
    >
      <div className="flex items-center gap-1.5 border-b border-black/[0.06] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="ml-2 truncate text-[10px] text-black/45">{site.domaine}</span>
      </div>
      <div style={{ background: site.fond, color: site.texte }} className="px-4 pt-4 pb-6">
        <div className="flex items-center justify-between gap-2 text-[10px] font-semibold">
          <span className="truncate">{site.nom}</span>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[9px]"
            style={{ background: site.accent, color: site.fond === "#ffffff" ? "#fff" : site.fond }}
          >
            Devis
          </span>
        </div>
        <div className="mt-6 text-[15px] leading-tight font-semibold">{site.titre}</div>
        <div
          className="mt-3 h-1.5 w-4/5 rounded-full opacity-30"
          style={{ background: site.texte }}
        />
        <div
          className="mt-1.5 h-1.5 w-3/5 rounded-full opacity-30"
          style={{ background: site.texte }}
        />
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-3">
        {site.services.map((s) => (
          <div
            key={s}
            className="truncate rounded-md bg-black/[0.04] px-1.5 py-2 text-center text-[9px] font-medium text-black/70"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

/** L'adresse d'un site publié, cadenas compris. */
export function BarreAdresse({ adresse }: { adresse: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow-sm">
      <Lock className="h-3.5 w-3.5 text-[#16a34a]" aria-hidden="true" />
      <span className="font-medium">{adresse}</span>
      <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-black/55">
        <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
        En ligne
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Les formules
   --------------------------------------------------------------------------- */

interface Fonction {
  titre: string;
  texte: string;
  bientot?: boolean;
}

interface Formule {
  nom: string;
  mensuel: number;
  annuel: number;
  /** Prix barré du Black Friday, et prix d'un an pendant la fenêtre. */
  blackFriday: { an: number; barre: number };
  /** Le prix d'appel au mois (Essentiel seulement, premier abonnement). */
  appel?: typeof PRIX_APPEL;
  pour: string;
  bouton: string;
  intro?: string;
  fonctions: Fonction[];
  badge?: string;
}

/**
 * Le nom de domaine offert, dit une seule fois dans le code : la carte
 * Essentiel, le bloc de passage de l'accueil et le comparatif reprennent cette
 * phrase au lieu d'en écrire chacun une version.
 */
export const DOMAINE_OFFERT = {
  titre: "Votre nom de domaine, offert",
  texte:
    "Un .fr ou un .com enregistré à votre nom, branché sur votre site et renouvelé tant que votre abonnement court.",
} as const;

/**
 * Les deux formules de l'application (décision de Ted du 22 novembre 2026 :
 * plus de publication gratuite), source unique de leurs prix et de leurs
 * phrases. La grille de `/` et de `/tarifs/` les rend en entier ; les pages
 * métier (MetierLanding) n'en reprennent que le nom, le prix et les titres de
 * fonctions, pour ne pas en écrire une deuxième version. L'aperçu gratuit
 * n'est pas une formule : `EtapeApercu` le montre au-dessus des cartes.
 */
export const FORMULES: Formule[] = [
  {
    ...IA.essentiel,
    appel: PRIX_APPEL,
    blackFriday: { an: BLACK_FRIDAY.essentielAn, barre: BLACK_FRIDAY.essentielAnBarre },
    pour: "Votre site en ligne à votre nom, que vous retouchez quand vous voulez.",
    bouton: "Commencer",
    badge: "Recommandé",
    fonctions: [
      {
        titre: "Votre site créé par l'IA, mis en ligne",
        texte:
          "Textes, mise en page et photo écrits pour votre activité, publiés en un clic avec le cadenas HTTPS.",
      },
      { ...DOMAINE_OFFERT },
      {
        titre: "Jusqu'à quatre pages",
        texte: "Accueil, prestations, à propos, contact.",
      },
      {
        titre: `${IA.essentiel.credits.toLocaleString("fr-FR")} crédits IA par mois`,
        texte: "Réécrire une section, ajouter des tarifs, changer le ton, créer des photos.",
      },
      {
        titre: "Articles de blog écrits par l'IA",
        texte: "L'agent choisit un sujet que vos clients cherchent, écrit l'article, vous le relisez.",
      },
      {
        titre: "L'agent qui répond aux demandes de votre site",
        texte: "Chaque message arrive avec sa réponse déjà rédigée, dans votre ton. Rien ne part sans vous.",
      },
      {
        titre: "Devis et factures illimités, impayés relancés",
        texte: "Payables par carte ou virement. Vos retards relancés automatiquement à J+1, J+8 et J+15.",
      },
      { titre: "Assistance par e-mail", texte: "Une vraie personne vous répond, en français." },
      {
        titre: "Mention Sitaly discrète et retirable",
        texte:
          "Votre site affiche « Site réalisé avec Sitaly » en petit, et vous la retirez d'un clic si vous préférez.",
      },
      {
        titre: "Prise de rendez-vous en ligne",
        texte: "Vos clients réservent un créneau depuis votre site.",
      },
      {
        titre: "Vos avis Google",
        texte:
          "Chaque nouvel avis arrive avec sa réponse prête, publiée d'un clic. Vos clients reçoivent la demande d'avis.",
      },
    ],
  },
  {
    ...IA.pro,
    blackFriday: { an: BLACK_FRIDAY.proAn, barre: BLACK_FRIDAY.proAnBarre },
    pour: "L'IA la plus avancée et un expert pour démarrer vite.",
    bouton: "Commencer",
    intro: `Tout ${IA.essentiel.nom}, plus :`,
    fonctions: [
      {
        titre: "Jusqu'à huit pages",
        texte: "Une page par prestation, détaillée, avec ses photos et ses tarifs.",
      },
      {
        titre: "Les devis à relancer",
        texte: "Chaque jour, les devis restés sans réponse, avec le SMS de relance écrit par l'IA.",
      },
      {
        titre: "Notre IA la plus avancée",
        texte: "Les textes de votre site écrits par le meilleur modèle d'IA du moment.",
      },
      {
        titre: `${IA.pro.credits.toLocaleString("fr-FR")} crédits IA par mois`,
        texte: "Cinq fois plus de retouches et de photos.",
      },
      {
        titre: "Mise en place avec un expert",
        texte: "Un rendez-vous avec l'équipe Sitaly pour régler votre site avec vous.",
      },
      {
        titre: "Votre site en deux langues",
        texte: "Une deuxième langue, avec un sélecteur pour vos visiteurs.",
        bientot: true,
      },
    ],
  },
];

/**
 * Le Black Friday, vu du navigateur : le rendu serveur ne connaît pas l'heure
 * du visiteur, la page prérendue part donc sans rien et le navigateur revérifie
 * la date. Hors de la fenêtre, rien ne s'affiche.
 */
export function useBlackFriday() {
  const [actif, setActif] = useState(false);
  useEffect(() => setActif(blackFridayActif()), []);
  return actif;
}

/** La garantie, en petit, sous un bouton de prix. */
export function LigneGarantie({ clair = false }: { clair?: boolean }) {
  return (
    <p
      className={`mt-3 flex items-center justify-center gap-1.5 text-sm ${clair ? "text-white/60" : TEXTE_GRIS}`}
    >
      <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
      {GARANTIE}
    </p>
  );
}

/** L'aperçu gratuit, l'étape avant les formules. */
export function EtapeApercu() {
  return (
    <div
      className={`${CARTE} mx-auto flex max-w-4xl flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7`}
    >
      <div className="flex gap-3">
        <Eye className="mt-0.5 h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />
        <div>
          <div className="text-[15px] font-semibold">D'abord, l'aperçu gratuit</div>
          <p className={`mt-1 text-base leading-6 sm:text-sm ${TEXTE_GRIS}`}>{PHRASE_APERCU}</p>
        </div>
      </div>
      <a href={lienCreation()} className={`${BOUTON_CLAIR} shrink-0`}>
        Voir mon site
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

/** Les deux formules, au mois ou à l'année (−15 %), sous l'étape de l'aperçu. */
export function GrilleTarifs() {
  const [annuel, setAnnuel] = useState(false);
  const blackFriday = useBlackFriday();
  const rail = useRef<HTMLDivElement>(null);
  return (
    <div>
      <EtapeApercu />
      <div className="mt-10 flex justify-center">
        <div
          role="radiogroup"
          aria-label="Période de paiement"
          className="inline-flex rounded-full bg-black/[0.05] p-1 text-sm font-medium"
        >
          {[
            [false, "Mensuel"],
            [true, "Annuel"],
          ].map(([valeur, libelle]) => (
            <button
              key={String(libelle)}
              type="button"
              role="radio"
              aria-checked={annuel === valeur}
              onClick={() => setAnnuel(valeur as boolean)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 transition sm:min-h-10 ${annuel === valeur ? "bg-white shadow-sm" : "text-black/55 hover:text-black/80"}`}
            >
              {libelle as string}
              {valeur && (
                <span className="rounded-full bg-brand-ink px-2 py-0.5 text-[11px] font-semibold text-white">
                  {blackFriday ? "Black Friday" : "−15 %"}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Rail à arrêts sous 640 px (SITA-31, friction 3). */}
      <div ref={rail} className="rail-mobile rail-deux mx-auto mt-10 grid max-w-4xl gap-5 lg:grid-cols-2">
        {FORMULES.map((f) => (
          <CartePrix key={f.nom} formule={f} annuel={annuel} blackFriday={blackFriday} />
        ))}
      </div>
      <RepereRail rail={rail} total={FORMULES.length} />
      <p className={`mx-auto mt-6 max-w-2xl text-center text-sm ${TEXTE_GRIS}`}>
        {MENTION_TVA}. Sans engagement au mois ; l'annuel se paie pour un an. Le prix d'appel
        d'{IA.essentiel.nom} vaut pour le premier abonnement d'un compte, au mois. {GARANTIE}{" "}
        sur le premier paiement, sur simple demande. « Bientôt » : fonctions en préparation,
        ajoutées à votre formule dès leur ouverture. Une retouche coûte 1 ou 2 crédits, une photo
        créée par l'IA 5.
      </p>
    </div>
  );
}

function CartePrix({
  formule,
  annuel,
  blackFriday,
}: {
  formule: Formule;
  annuel: boolean;
  blackFriday: boolean;
}) {
  const { nom, mensuel, appel, pour, intro, fonctions, bouton, badge } = formule;
  const prix = annuel ? formule.annuel : appel ? appel.mensuel : mensuel;
  return (
    <div
      className={`flex flex-col rounded-3xl bg-white p-8 ${badge ? "border-2 border-black/80" : "border border-black/[0.08]"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{nom}</h3>
        {badge && (
          <span className="rounded-full bg-black/85 px-3 py-1 text-xs font-medium text-white">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-semibold tracking-tight">{euros(prix)}</span>
        <span className={TEXTE_GRIS}>{annuel ? "/an" : "/mois"}</span>
      </div>
      <p className={`mt-1 min-h-5 text-sm ${TEXTE_GRIS}`}>
        {annuel
          ? `soit ${euros(Math.round((formule.annuel / 12) * 100) / 100)} par mois, au lieu de ${euros(mensuel)}`
          : appel
            ? `les ${appel.mois} premiers mois, puis ${euros(appel.ensuite)} par mois`
            : ""}
      </p>
      {annuel && blackFriday && (
        <p className="mt-3 rounded-xl bg-black/[0.04] px-3 py-2 text-sm font-medium">
          Black Friday : 1 an à {euros(formule.blackFriday.an)} au lieu de{" "}
          <s>{euros(formule.blackFriday.barre)}</s>, jusqu'au 30 novembre
        </p>
      )}
      <p className={`mt-3 min-h-14 ${TEXTE_GRIS}`}>{pour}</p>
      <a href={lienCreation()} className={`${badge ? BOUTON_NOIR : BOUTON_CLAIR} mt-6`}>
        {bouton}
      </a>
      <LigneGarantie />
      {intro && (
        <p className="mt-8 border-t border-black/[0.06] pt-8 text-sm font-medium">{intro}</p>
      )}
      <ul className={`space-y-5 ${intro ? "mt-5" : "mt-8 border-t border-black/[0.06] pt-8"}`}>
        {fonctions.map((f) => (
          <li key={f.titre} className="flex gap-3">
            {f.bientot ? (
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-black/35" aria-hidden="true" />
            ) : (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-black/75" aria-hidden="true" />
            )}
            <div>
              <div
                className={`flex flex-wrap items-center gap-2 text-[15px] font-semibold ${f.bientot ? "text-black/50" : ""}`}
              >
                {f.titre}
                {f.bientot && (
                  <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-medium text-black/55">
                    Bientôt
                  </span>
                )}
              </div>
              <p
                className={`mt-1 text-base leading-6 sm:text-sm ${f.bientot ? "text-black/45" : TEXTE_GRIS}`}
              >
                {f.texte}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   De l'aperçu à la mise en ligne (22 novembre 2026)
   --------------------------------------------------------------------------- */

/** Ce que l'aperçu gratuit donne, avant tout paiement. */
const DANS_L_APERCU = [
  "Votre site entier, écrit par l'IA en une minute",
  "Vu avant de créer un compte, sans carte",
  "Votre compte créé gratuitement, pour retoucher le site dans l'éditeur",
];

/**
 * Ce que la mise en ligne avec Essentiel apporte le jour même. Chaque ligne se
 * vérifie dans sitaly-saas.
 */
const OUVERT_PAR_ESSENTIEL: { titre: string; texte: string }[] = [
  {
    titre: "Votre site en ligne",
    texte: "Publié en un clic, avec le cadenas HTTPS, sur téléphone et ordinateur.",
  },
  { ...DOMAINE_OFFERT },
  {
    titre: "Une mention Sitaly discrète, que vous retirez",
    texte: "« Site réalisé avec Sitaly » en petit au pied du site, et un clic la retire.",
  },
  {
    titre: "Devis et factures illimités, impayés relancés",
    texte: "Vos retards de paiement relancés par e-mail à J+1, J+8 et J+15.",
  },
  {
    titre: "Rendez-vous et avis Google",
    texte:
      "Vos clients réservent un créneau depuis votre site ; vos avis Google arrivent avec leur réponse prête.",
  },
];

/**
 * Le passage de l'aperçu gratuit à la mise en ligne, sur l'accueil. Avant le
 * 22 novembre 2026, ce bloc opposait la formule gratuite Découverte à
 * Essentiel ; la publication gratuite a disparu, l'aperçu reste.
 */
export function PassageEssentiel() {
  return (
    <div className="rail-mobile rail-deux grid gap-5 lg:grid-cols-2">
      <div className={`${CARTE} flex flex-col p-8 sm:p-10`}>
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg font-semibold">L'aperçu</h3>
          <span className={`text-sm ${TEXTE_GRIS}`}>gratuit, sans compte ni carte</span>
        </div>
        <p className="mt-4 text-[17px] leading-7">{PHRASE_APERCU}</p>
        <ul className="mt-8 space-y-4">
          {DANS_L_APERCU.map((t) => (
            <li key={t} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-black/75" aria-hidden="true" />
              <span className="text-[15px] leading-6">{t}</span>
            </li>
          ))}
        </ul>
        <a href={lienCreation()} className={`${BOUTON_CLAIR} mt-auto self-start`}>
          Voir mon site
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div className="flex flex-col rounded-3xl bg-[#0d0f14] p-8 text-white sm:p-10">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="text-lg font-semibold">{IA.essentiel.nom}</h3>
          <span className="text-sm text-white/60">{PHRASE_PRIX_APPEL}, sans engagement</span>
        </div>
        <p className="mt-4 text-[17px] leading-7 text-white/80">
          Vous publiez quand votre site vous plaît. Ce qui change le jour même :
        </p>
        <ul className="mt-8 space-y-5">
          {OUVERT_PAR_ESSENTIEL.map((f) => (
            <li key={f.titre} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c4b5fd]" aria-hidden="true" />
              <div>
                <div className="text-[15px] font-semibold">{f.titre}</div>
                <p className="mt-1 text-base leading-6 text-white/60 sm:text-sm">{f.texte}</p>
              </div>
            </li>
          ))}
        </ul>
        <a
          href={lienCreation()}
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Créer mon site
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <LigneGarantie clair />
        <p className="mt-1 text-center text-sm text-white/55">
          {MENTION_TVA}. Le détail formule par formule est sur la page Tarifs.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Le tableau comparatif des formules (30 octobre 2026), comme « Compare plans »
   chez durable.com : sous les cartes de prix, ligne par ligne. Il reprend les
   mêmes chiffres (CREATEUR_IA) ; une valeur « bientot » s'affiche grisée.
   Deux colonnes depuis le 22 novembre 2026 : Essentiel et Pro.
   --------------------------------------------------------------------------- */

type Valeur = boolean | string | { bientot: string };

interface LigneComparee {
  libelle: string;
  aide?: string;
  valeurs: [Valeur, Valeur];
}

const GROUPES_COMPARES: { titre: string; lignes: LigneComparee[] }[] = [
  {
    titre: "Votre site",
    lignes: [
      { libelle: "Site complet écrit par l'IA", valeurs: [true, true] },
      {
        libelle: "Modèle d'IA pour la rédaction",
        valeurs: ["Avancé", "Le plus avancé"],
      },
      {
        libelle: "Pages de votre site",
        aide: "Une page par prestation : autant de portes d'entrée depuis Google.",
        valeurs: ["4", "8"],
      },
      { libelle: "Dix-neuf thèmes, changement en un clic", valeurs: [true, true] },
      { libelle: "Retouches à la main dans l'éditeur", valeurs: [true, true] },
      { libelle: "Formulaire de contact", valeurs: [true, true] },
    ],
  },
  {
    titre: "Intelligence artificielle",
    lignes: [
      {
        libelle: "Crédits IA",
        aide: "Une retouche coûte 1 ou 2 crédits, une photo 5.",
        valeurs: [
          `${IA.essentiel.credits.toLocaleString("fr-FR")} par mois`,
          `${IA.pro.credits.toLocaleString("fr-FR")} par mois`,
        ],
      },
      { libelle: "Retouches en une phrase", valeurs: [true, true] },
      { libelle: "Photos créées par l'IA", valeurs: [true, true] },
      {
        libelle: "Articles de blog écrits par l'IA",
        aide: "1 crédit les idées, 6 crédits l'article.",
        valeurs: [true, true],
      },
      { libelle: "Logo et identité de marque", valeurs: [true, true] },
      {
        libelle: "Agent IA : réponses aux demandes du site",
        aide: "1 crédit par réponse rédigée, envoyée après votre accord.",
        valeurs: [true, true],
      },
      {
        libelle: "Agent IA : avis Google",
        aide: "Fiche connectée : avis relevés chaque matin, réponse prête, publiée sur Google après votre clic. 1 crédit par réponse.",
        valeurs: [true, true],
      },
    ],
  },
  {
    titre: "En ligne",
    lignes: [
      { libelle: "Mise en ligne avec le cadenas HTTPS", valeurs: [true, true] },
      {
        libelle: "Prêt pour Google : titres, descriptions, plan du site",
        valeurs: [true, true],
      },
      {
        libelle: DOMAINE_OFFERT.titre,
        aide: "Enregistré à votre nom, renouvelé tant que l'abonnement court.",
        valeurs: [true, true],
      },
      {
        libelle: "Mention Sitaly retirable",
        aide: "Une mention discrète « Site réalisé avec Sitaly », que vous retirez d'un clic.",
        valeurs: [true, true],
      },
      { libelle: "Score de visibilité SEO et GEO, fichier llms.txt", valeurs: [true, true] },
      { libelle: "Site en deux langues", valeurs: [false, { bientot: "Bientôt" }] },
    ],
  },
  {
    titre: "Gérer votre activité",
    lignes: [
      {
        libelle: "Carnet de clients",
        aide: "Les fiches de vos clients, avec leurs devis et leurs factures.",
        valeurs: ["Illimité", "Illimité"],
      },
      { libelle: "Devis acceptés en ligne", valeurs: [true, true] },
      {
        libelle: "Devis dicté à la voix",
        aide: "2 crédits le devis, relu par vous avant l'envoi.",
        valeurs: [true, true],
      },
      { libelle: "Factures conformes", valeurs: ["Illimitées", "Illimitées"] },
      {
        libelle: "Paiement des factures par carte",
        aide: "Sans commission Sitaly : seuls les frais Stripe s'appliquent.",
        valeurs: [true, true],
      },
      { libelle: "Relances automatiques des impayés", valeurs: [true, true] },
      {
        libelle: "Devis à relancer",
        aide: "Chaque jour, les devis restés sans réponse depuis 3 jours, avec le SMS de relance écrit par l'IA.",
        valeurs: [false, true],
      },
      { libelle: "Prise de rendez-vous en ligne", valeurs: [true, true] },
      {
        libelle: "Demandes d'avis à vos clients",
        aide: "Par e-mail, SMS ou QR code, ou envoyées seules après une facture payée ou un rendez-vous.",
        valeurs: [true, true],
      },
      { libelle: "Vos avis Google sur votre site", valeurs: [true, true] },
    ],
  },
  {
    titre: "Accompagnement",
    lignes: [
      { libelle: "Assistance par e-mail, en français", valeurs: [true, true] },
      { libelle: "Mise en place avec un expert", valeurs: [false, true] },
    ],
  },
];

const NOMS_COMPARES = [IA.essentiel.nom, IA.pro.nom] as const;
const PRIX_COMPARES = [
  `${euros(PRIX_APPEL.mensuel)}/mois les ${PRIX_APPEL.mois} premiers mois, puis ${euros(PRIX_APPEL.ensuite)}`,
  `${euros(IA.pro.mensuel)}/mois`,
] as const;

function CelluleValeur({ v }: { v: Valeur }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-black/80" aria-label="Compris" />;
  if (v === false)
    return (
      <span className="text-black/25" aria-label="Non compris">
        —
      </span>
    );
  if (typeof v === "string") return <span className="text-[15px] font-medium">{v}</span>;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.05] px-2.5 py-0.5 text-xs font-medium text-black/55">
      <Clock className="h-3 w-3" aria-hidden="true" />
      {v.bientot}
    </span>
  );
}

/** Les deux formules ligne par ligne : un tableau sur ordinateur, une formule à la fois sur téléphone. */
export function TableauFormules() {
  const [choix, setChoix] = useState(0);
  return (
    <div>
      {/* Ordinateur */}
      <div className="hidden md:block">
        <table className="w-full table-fixed text-left">
          <caption className="sr-only">Comparatif des formules Sitaly</caption>
          <thead>
            <tr className="align-bottom">
              <th scope="col" className="w-[40%] pb-6" />
              {NOMS_COMPARES.map((nom, k) => (
                <th key={nom} scope="col" className="px-3 pb-6 text-center font-normal">
                  <div
                    className={`rounded-3xl p-5 ${k === 0 ? "bg-[#0d0f14] text-white" : "bg-black/[0.03]"}`}
                  >
                    <div className="text-lg font-semibold">{nom}</div>
                    <div className={`mt-1 text-sm ${k === 0 ? "text-white/60" : TEXTE_GRIS}`}>
                      {PRIX_COMPARES[k]}
                    </div>
                    <a
                      href={lienCreation()}
                      className={`mt-4 inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                        k === 0
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-black/85 text-white hover:bg-black"
                      }`}
                    >
                      Choisir
                    </a>
                    <LigneGarantie clair={k === 0} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {GROUPES_COMPARES.map((g) => (
            <tbody key={g.titre}>
              <tr>
                <th
                  colSpan={3}
                  scope="colgroup"
                  className="pt-8 pb-3 text-sm font-semibold text-brand-ink"
                >
                  {g.titre}
                </th>
              </tr>
              {g.lignes.map((l) => (
                <tr key={l.libelle} className="border-t border-black/[0.06]">
                  <th scope="row" className="py-4 pr-6 align-top font-normal">
                    <div className="text-[15px] font-medium">{l.libelle}</div>
                    {l.aide && <div className={`mt-0.5 text-sm ${TEXTE_GRIS}`}>{l.aide}</div>}
                  </th>
                  {l.valeurs.map((v, k) => (
                    <td
                      key={k}
                      className={`px-3 py-4 text-center align-top ${k === 0 ? "bg-black/[0.02]" : ""}`}
                    >
                      <CelluleValeur v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Téléphone : une formule à la fois */}
      <div className="md:hidden">
        <div
          role="tablist"
          aria-label="Formule à comparer"
          className="sticky top-[calc(var(--entete-hauteur)+0.5rem)] z-10 grid grid-cols-2 rounded-full bg-black/[0.05] p-1 text-sm font-medium backdrop-blur"
        >
          {NOMS_COMPARES.map((nom, k) => (
            <button
              key={nom}
              type="button"
              role="tab"
              aria-selected={choix === k}
              onClick={() => setChoix(k)}
              className={`min-h-11 rounded-full transition sm:min-h-10 ${choix === k ? "bg-white shadow-sm" : "text-black/55"}`}
            >
              {nom}
            </button>
          ))}
        </div>
        <p className={`mt-4 text-center text-sm ${TEXTE_GRIS}`}>{PRIX_COMPARES[choix]}</p>
        {GROUPES_COMPARES.map((g) => (
          <div key={g.titre} className="mt-6">
            <div className="text-sm font-semibold text-brand-ink">{g.titre}</div>
            <ul className="mt-2">
              {g.lignes.map((l) => (
                <li
                  key={l.libelle}
                  className="flex items-start justify-between gap-4 border-t border-black/[0.06] py-3.5"
                >
                  <div>
                    <div className="text-[15px] font-medium">{l.libelle}</div>
                    {l.aide && <div className={`mt-0.5 text-sm ${TEXTE_GRIS}`}>{l.aide}</div>}
                  </div>
                  <div className="shrink-0 text-right">
                    <CelluleValeur v={l.valeurs[choix]} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <a href={lienCreation()} className={`${BOUTON_NOIR} mt-6 w-full`}>
          Choisir {NOMS_COMPARES[choix]}
        </a>
        <LigneGarantie />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Les questions fréquentes
   --------------------------------------------------------------------------- */

// Les questions fréquentes vivent dans src/data/faq-produit.ts depuis le
// 16 novembre 2026 : le chat du site les lit par un script Node, qui ne peut
// pas importer ce fichier. Réexportées ici, où l'accueil et /tarifs/ les prennent.
export { FAQ_PRODUIT };

export function Faq() {
  return (
    <div className="space-y-3">
      {FAQ_PRODUIT.map((f) => (
        <details key={f.q} className="group rounded-2xl bg-black/[0.03]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-medium marker:content-none">
            {f.q}
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white transition-transform group-open:rotate-45"
            >
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 1.5v9M1.5 6h9" />
              </svg>
            </span>
          </summary>
          <p className={`px-6 pb-6 leading-7 ${TEXTE_GRIS}`}>{f.a}</p>
        </details>
      ))}
      <p className={`pt-5 text-center text-sm ${TEXTE_GRIS}`}>
        Une autre question ?{" "}
        <a href={`tel:${SITALY_PHONE}`} className="font-medium text-black/85 underline">
          {SITALY_PHONE_DISPLAY}
        </a>
      </p>
    </div>
  );
}
