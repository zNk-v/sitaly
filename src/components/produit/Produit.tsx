import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, Lock, Sparkles, Star } from "lucide-react";
import { APP_URL, euros, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";
import { CREATEUR_IA as IA, MENTION_TVA } from "@/data/offres";
import { FICHE_GOOGLE_URL } from "@/data/avis-google";

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
export const lienCreation = (activite?: string) =>
  activite ? `${APP_URL}/?activite=${encodeURIComponent(activite.slice(0, 600))}` : `${APP_URL}/`;

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
 * La note Google, sans le nombre d'avis (décision de Teddy, 30 octobre 2026) :
 * le lien mène à la fiche, où chacun peut les lire.
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
      Noté 5/5 sur Google
    </a>
  );
}

export function Confiance() {
  return (
    <p
      className={`mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm ${TEXTE_GRIS}`}
    >
      <span>Gratuit, sans carte bancaire</span>
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
    window.location.href = lienCreation(activite.trim());
  }

  return (
    <div data-boite-ia>
      <form
        onSubmit={envoyer}
        className="rounded-3xl border border-black/10 bg-white p-2.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
      >
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
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white shadow-sm transition hover:scale-105 active:scale-95"
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
      {idees && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {IDEES.map((idee, k) => (
            <button
              key={idee}
              type="button"
              onClick={() => setActivite(idee)}
              className={`rounded-full bg-black/[0.04] px-3.5 py-1.5 text-sm text-black/65 transition hover:bg-black/[0.08] ${k >= 2 ? "hidden sm:inline-block" : ""}`}
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
  pour: string;
  bouton: string;
  intro?: string;
  fonctions: Fonction[];
  badge?: string;
}

const FORMULES: Formule[] = [
  {
    ...IA.decouverte,
    pour: "Créez votre site et mettez-le en ligne, sans carte bancaire.",
    bouton: "Commencer gratuitement",
    fonctions: [
      {
        titre: "Votre site créé par l'IA",
        texte: "Textes, mise en page et photo, écrits pour votre activité en une minute.",
      },
      {
        titre: "En ligne sur nom.sitaly.fr",
        texte: "Publié en un clic, avec le cadenas HTTPS, sur téléphone et ordinateur.",
      },
      {
        titre: `${IA.decouverte.credits} crédits IA offerts`,
        texte: "Pour retoucher votre site en une phrase ou créer des photos.",
      },
      {
        titre: "Formulaire de contact",
        texte: "Chaque demande de vos visiteurs arrive dans votre boîte mail.",
      },
    ],
  },
  {
    ...IA.essentiel,
    pour: "Tout pour un site à votre image, que vous retouchez quand vous voulez.",
    bouton: "Commencer",
    badge: "Recommandé",
    intro: `Tout ${IA.decouverte.nom}, plus :`,
    fonctions: [
      {
        titre: `${IA.essentiel.credits.toLocaleString("fr-FR")} crédits IA par mois`,
        texte: "Réécrire une section, ajouter des tarifs, changer le ton, créer des photos.",
      },
      { titre: "Assistance par e-mail", texte: "Une vraie personne vous répond, en français." },
      {
        titre: "Votre nom de domaine",
        texte: `Connectez le vôtre, ou recevez-en un à votre nom (valeur jusqu'à ${euros(IA.essentiel.creditDomaine)} par an).`,
        bientot: true,
      },
      {
        titre: "Prise de rendez-vous en ligne",
        texte: "Vos clients réservent un créneau depuis votre site.",
      },
    ],
  },
  {
    ...IA.pro,
    pour: "L'IA la plus avancée et un expert pour démarrer vite.",
    bouton: "Commencer",
    intro: `Tout ${IA.essentiel.nom}, plus :`,
    fonctions: [
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

/** Les trois formules, au mois ou à l'année (−15 %). */
export function GrilleTarifs() {
  const [annuel, setAnnuel] = useState(false);
  return (
    <div>
      <div className="flex justify-center">
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
              className={`inline-flex min-h-10 items-center gap-2 rounded-full px-5 transition ${annuel === valeur ? "bg-white shadow-sm" : "text-black/55 hover:text-black/80"}`}
            >
              {libelle as string}
              {valeur && (
                <span className="rounded-full bg-brand-ink px-2 py-0.5 text-[11px] font-semibold text-white">
                  −15 %
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {FORMULES.map((f) => (
          <CartePrix key={f.nom} formule={f} annuel={annuel} />
        ))}
      </div>
      <p className={`mx-auto mt-6 max-w-2xl text-center text-sm ${TEXTE_GRIS}`}>
        {MENTION_TVA}. Sans engagement au mois ; l'annuel se paie pour un an. « Bientôt » :
        fonctions en préparation, ajoutées à votre formule dès leur ouverture. Une retouche coûte 1
        ou 2 crédits, une photo créée par l'IA 5.
      </p>
    </div>
  );
}

function CartePrix({ formule, annuel }: { formule: Formule; annuel: boolean }) {
  const { nom, mensuel, pour, intro, fonctions, bouton, badge } = formule;
  const prix = annuel && mensuel > 0 ? formule.annuel : mensuel;
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
        {mensuel > 0 && <span className={TEXTE_GRIS}>{annuel ? "/an" : "/mois"}</span>}
      </div>
      <p className={`mt-1 h-5 text-sm ${TEXTE_GRIS}`}>
        {annuel && mensuel > 0
          ? `soit ${euros(Math.round((formule.annuel / 12) * 100) / 100)} par mois, au lieu de ${euros(mensuel)}`
          : ""}
      </p>
      <p className={`mt-3 min-h-14 ${TEXTE_GRIS}`}>{pour}</p>
      <a href={lienCreation()} className={`${badge ? BOUTON_NOIR : BOUTON_CLAIR} mt-6`}>
        {bouton}
      </a>
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
              <p className={`mt-1 text-sm leading-6 ${f.bientot ? "text-black/45" : TEXTE_GRIS}`}>
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
   Le tableau comparatif des formules (30 octobre 2026), comme « Compare plans »
   chez durable.com : sous les cartes de prix, ligne par ligne. Il reprend les
   mêmes chiffres (CREATEUR_IA) ; une valeur « bientot » s'affiche grisée.
   --------------------------------------------------------------------------- */

type Valeur = boolean | string | { bientot: string };

interface LigneComparee {
  libelle: string;
  aide?: string;
  valeurs: [Valeur, Valeur, Valeur];
}

const GROUPES_COMPARES: { titre: string; lignes: LigneComparee[] }[] = [
  {
    titre: "Votre site",
    lignes: [
      { libelle: "Site complet écrit par l'IA", valeurs: [true, true, true] },
      {
        libelle: "Modèle d'IA pour la rédaction",
        valeurs: ["Avancé", "Avancé", "Le plus avancé"],
      },
      { libelle: "Quatre thèmes, changement en un clic", valeurs: [true, true, true] },
      { libelle: "Retouches à la main dans l'éditeur", valeurs: [true, true, true] },
      { libelle: "Formulaire de contact", valeurs: [true, true, true] },
    ],
  },
  {
    titre: "Intelligence artificielle",
    lignes: [
      {
        libelle: "Crédits IA",
        aide: "Une retouche coûte 1 ou 2 crédits, une photo 5.",
        valeurs: [
          `${IA.decouverte.credits} offerts`,
          `${IA.essentiel.credits.toLocaleString("fr-FR")} par mois`,
          `${IA.pro.credits.toLocaleString("fr-FR")} par mois`,
        ],
      },
      { libelle: "Retouches en une phrase", valeurs: [true, true, true] },
      { libelle: "Photos créées par l'IA", valeurs: [true, true, true] },
      {
        libelle: "Articles de blog écrits par l'IA",
        aide: "1 crédit les idées, 6 crédits l'article.",
        valeurs: [true, true, true],
      },
      { libelle: "Logo et identité de marque", valeurs: [true, true, true] },
    ],
  },
  {
    titre: "En ligne",
    lignes: [
      { libelle: "Adresse nom.sitaly.fr et cadenas HTTPS", valeurs: [true, true, true] },
      {
        libelle: "Prêt pour Google : titres, descriptions, plan du site",
        valeurs: [true, true, true],
      },
      {
        libelle: "Votre nom de domaine, offert",
        aide: "Enregistré à votre nom, renouvelé tant que l'abonnement court.",
        valeurs: [false, { bientot: "Bientôt" }, { bientot: "Bientôt" }],
      },
      { libelle: "Score de visibilité SEO et GEO, fichier llms.txt", valeurs: [true, true, true] },
      { libelle: "Prise de rendez-vous en ligne", valeurs: [false, true, true] },
      { libelle: "Site en deux langues", valeurs: [false, false, { bientot: "Bientôt" }] },
    ],
  },
  {
    titre: "Accompagnement",
    lignes: [
      { libelle: "Assistance par e-mail, en français", valeurs: [false, true, true] },
      { libelle: "Mise en place avec un expert", valeurs: [false, false, true] },
    ],
  },
];

const NOMS_COMPARES = [IA.decouverte.nom, IA.essentiel.nom, IA.pro.nom] as const;
const PRIX_COMPARES = [
  "Gratuit",
  `${euros(IA.essentiel.mensuel)}/mois`,
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

/** Les trois formules ligne par ligne : un tableau sur ordinateur, une formule à la fois sur téléphone. */
export function TableauFormules() {
  const [choix, setChoix] = useState(1);
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
                    className={`rounded-3xl p-5 ${k === 1 ? "bg-[#0d0f14] text-white" : "bg-black/[0.03]"}`}
                  >
                    <div className="text-lg font-semibold">{nom}</div>
                    <div className={`mt-1 text-sm ${k === 1 ? "text-white/60" : TEXTE_GRIS}`}>
                      {PRIX_COMPARES[k]}
                    </div>
                    <a
                      href={lienCreation()}
                      className={`mt-4 inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                        k === 1
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-black/85 text-white hover:bg-black"
                      }`}
                    >
                      {k === 0 ? "Commencer" : "Choisir"}
                    </a>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {GROUPES_COMPARES.map((g) => (
            <tbody key={g.titre}>
              <tr>
                <th
                  colSpan={4}
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
                      className={`px-3 py-4 text-center align-top ${k === 1 ? "bg-black/[0.02]" : ""}`}
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
          className="sticky top-[calc(var(--entete-hauteur)+0.5rem)] z-10 grid grid-cols-3 rounded-full bg-black/[0.05] p-1 text-sm font-medium backdrop-blur"
        >
          {NOMS_COMPARES.map((nom, k) => (
            <button
              key={nom}
              type="button"
              role="tab"
              aria-selected={choix === k}
              onClick={() => setChoix(k)}
              className={`min-h-10 rounded-full transition ${choix === k ? "bg-white shadow-sm" : "text-black/55"}`}
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
          {choix === 0 ? "Commencer gratuitement" : `Choisir ${NOMS_COMPARES[choix]}`}
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Les questions fréquentes
   --------------------------------------------------------------------------- */

export const FAQ_PRODUIT = [
  {
    q: "Combien coûte un site créé avec Sitaly ?",
    a: `La formule ${IA.decouverte.nom} est gratuite, sans carte bancaire. ${IA.essentiel.nom} coûte ${euros(IA.essentiel.mensuel)} par mois et ${IA.pro.nom} ${euros(IA.pro.mensuel)} par mois, ou ${euros(IA.essentiel.annuel)} et ${euros(IA.pro.annuel)} à l'année, soit 15 % de moins. ${MENTION_TVA}.`,
  },
  {
    q: "Faut-il savoir faire un site ?",
    a: "Non. Vous décrivez votre activité en une phrase, l'IA écrit le site, choisit la mise en page et crée la photo. Ensuite, vous le retouchez en écrivant ce que vous voulez changer, comme à une personne.",
  },
  {
    q: "Combien de temps faut-il pour avoir mon site ?",
    a: "Environ une minute pour la création. Vous le relisez, vous changez ce que vous voulez, puis vous le publiez en un clic.",
  },
  {
    q: "Comment modifier mon site ?",
    a: "Écrivez votre demande à l'IA : « ajoute mes horaires », « ton plus chaleureux », « une section tarifs ». Pour corriger un mot, double-cliquez dessus. Vous pouvez aussi déplacer les sections et changer de thème en un clic.",
  },
  {
    q: "À quoi servent les crédits IA ?",
    a: "Chaque demande à l'IA consomme des crédits : 1 pour retoucher une section, 2 pour une demande sur tout le site, 5 pour une photo créée par l'IA. La création du site elle-même ne coûte aucun crédit.",
  },
  {
    q: "Et les photos ?",
    a: "Ajoutez les vôtres, y compris celles de votre iPhone, ou faites-en créer par l'IA. Une image créée par l'IA illustre votre métier : elle n'est jamais présentée comme une de vos réalisations.",
  },
  {
    q: "L'IA peut-elle écrire des choses fausses ?",
    a: "Une IA peut se tromper : relisez avant de publier. Ses consignes lui interdisent d'inventer des avis, des chiffres, des certifications ou des années d'expérience, et elle n'écrit des prix que si vous les donnez.",
  },
  {
    q: "Quelle sera l'adresse de mon site ?",
    a: "Votre site est publié sur votre-nom.sitaly.fr. Le branchement de votre propre nom de domaine arrive bientôt avec Essentiel et Pro.",
  },
  {
    q: "Mon site sera-t-il trouvé sur Google ?",
    a: "Personne ne peut garantir une place. Chaque site part avec les bases : pages rapides et adaptées au téléphone, titre et description, fiche de votre entreprise lisible par Google, plan du site.",
  },
  {
    q: "Puis-je arrêter quand je veux ?",
    a: "Oui. L'abonnement mensuel se résilie chaque mois. L'abonnement annuel est payé pour l'année.",
  },
  {
    q: "Je préfère qu'on s'occupe de tout : c'est possible ?",
    a: `Oui, l'équipe Sitaly peut créer et suivre votre site pour vous. Appelez-nous au ${SITALY_PHONE_DISPLAY}, on en parle.`,
  },
];

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
