import { euros } from "@/lib/config";
import { montantsAcomptes, offre, prixCourt } from "@/data/offres";

/**
 * La page /site-premium/ (23 octobre 2026) : un cadre reste collé à l'écran
 * pendant le défilement, et le site inventé qu'il montre change de métier
 * treize fois. Concept retenu après quatre propositions et trois jugements
 * (projection, direction artistique, faisabilité) ; voir DESIGN.md §12.
 *
 * Ce fichier porte le texte et les réglages de la page. Aucun montant n'y est
 * écrit : le plancher et les acomptes viennent de src/data/offres.ts.
 *
 * Les marques sont inventées et le disent à six endroits (sous-titre, barre
 * d'adresse, étiquette dans chaque composition, légende de figure, titre de
 * la preuve, FAQ). Leurs adresses finissent en .exemple, domaine réservé à la
 * documentation (RFC 2606). Une maquette ne montre ni avis, ni étoile, ni
 * adresse, ni nom de personne, ni nom de ville réelle.
 */

export type VitrineId =
  | "plombier"
  | "boulanger"
  | "garagiste"
  | "osteopathe"
  | "restaurateur"
  | "menuisier"
  | "barbier"
  | "agent-immobilier"
  | "avocat"
  | "fleuriste"
  | "chambres-d-hotes"
  | "proprete"
  | "tatoueur";

/**
 * L'entrée d'un site dans le cadre. Les volets découvrent le nouveau site par
 * un bord net qui glisse (aucun clip-path) ; « fondu » croise les opacités ;
 * « lames », « carte » et « raclette » ajoutent un geste propre à la maquette
 * par-dessus un volet ou un fondu.
 */
export type Sens =
  | "bas"
  | "haut"
  | "gauche"
  | "droite"
  | "diagonale"
  | "fondu"
  | "lames"
  | "carte"
  | "raclette";

export interface Palette {
  /** Fond de la maquette. */
  fond: string;
  /** Texte principal. */
  encre: string;
  /** Couleur d'action : fond de bouton, chiffres forts. */
  accent: string;
  /** Texte posé sur l'accent. */
  sur: string;
  /** Texte secondaire, 4,5:1 au moins sur le fond. */
  doux: string;
}

/** Le logotype en lettres de la marque, repris par sa maquette et par sa tuile de la mosaïque. */
export interface Logo {
  police: "display" | "sans" | "serif" | "mono";
  /** Graisse : Jakarta 200 à 800, Inter 100 à 900 ; la serif n'a que 400 italique. */
  graisse: number;
  casse?: "capitales" | "minuscules";
  /** Approche, en em. */
  approche: number;
}

export interface Vitrine {
  id: VitrineId;
  /** Le métier, au singulier, comme dans l'index : « Plombier ». */
  metier: string;
  famille: string;
  marque: string;
  /** Domaine fictif, en .exemple. */
  domaine: string;
  accroche: string;
  /** Pourquoi ce métier reçoit cette forme : la légende de Sitaly. */
  legende: string;
  /** Les métiers que le même raisonnement sert. */
  memeLogique: string[];
  /** Ce qu'un visiteur peut taper pour arriver ici, en plus du métier et de `memeLogique`. */
  alias: string[];
  palette: Palette;
  logo: Logo;
  sens: Sens;
  /** Lot 1 : publié d'abord ; lot 2 : la suite. Voir LOT_PUBLIE. */
  lot: 1 | 2;
}

export const VITRINES_TOUTES: Vitrine[] = [
  {
    id: "plombier",
    metier: "Plombier",
    famille: "Bâtiment",
    marque: "Clapet",
    domaine: "clapet.exemple",
    accroche: "Une fuite à 22 h ? On décroche.",
    legende:
      "Pour un dépanneur, le numéro passe avant le logo. Le client appelle d'abord et lit ensuite.",
    memeLogique: ["électricien", "serrurier", "chauffagiste", "vitrier", "couvreur"],
    alias: ["plomberie", "plombier chauffagiste", "dépannage", "depanneur", "fuite"],
    palette: {
      fond: "#f2f8fb",
      encre: "#002635",
      accent: "#f3821d",
      sur: "#002635",
      doux: "#445963",
    },
    logo: { police: "display", graisse: 800, casse: "capitales", approche: -0.05 },
    sens: "fondu",
    lot: 1,
  },
  {
    id: "boulanger",
    metier: "Boulanger",
    famille: "Bouche",
    marque: "Le Levain du Lavoir",
    domaine: "levain-du-lavoir.exemple",
    accroche: "Première fournée à 6 h 30, deuxième à 11 h.",
    legende:
      "On choisit sa boulangerie sur l'heure de la fournée et le prix de la tradition. L'ardoise ouvre la page.",
    memeLogique: ["pâtissier", "chocolatier", "boucher", "fromager", "primeur"],
    alias: ["boulangerie", "boulangère", "patisserie", "fournil", "viennoiserie"],
    palette: {
      fond: "#f9edd5",
      encre: "#45240f",
      accent: "#45240f",
      sur: "#f9edd5",
      doux: "#6b4e3a",
    },
    logo: { police: "serif", graisse: 400, approche: -0.01 },
    sens: "droite",
    lot: 1,
  },
  {
    id: "garagiste",
    metier: "Garagiste",
    famille: "Automobile",
    marque: "Garage Bielle",
    domaine: "garage-bielle.exemple",
    accroche: "Déposez-la à 8 h, reprenez-la à 18 h.",
    legende:
      "Au garage, le client veut un prix et une heure de retour. Les deux tiennent sur la même ligne.",
    memeLogique: [
      "carrossier",
      "contrôle technique",
      "dépanneur-remorqueur",
      "vendeur de pneus",
      "réparateur de motos",
    ],
    alias: ["garage", "mécanicien", "mecanique", "auto", "carrosserie", "pneus", "moto"],
    palette: {
      fond: "#14191e",
      encre: "#eff2f5",
      accent: "#f9cc21",
      sur: "#14191e",
      doux: "#a9afb4",
    },
    logo: { police: "display", graisse: 800, casse: "capitales", approche: 0.08 },
    sens: "diagonale",
    lot: 1,
  },
  {
    id: "osteopathe",
    metier: "Ostéopathe",
    famille: "Santé",
    marque: "L'Axe",
    domaine: "laxe-osteopathie.exemple",
    accroche: "On commence par vous écouter. La séance dure une heure.",
    legende:
      "Un patient inquiet prend son temps pour lire. Graisse fine, grands blancs, une seule action : le rendez-vous.",
    memeLogique: ["kinésithérapeute", "sage-femme", "psychologue", "podologue", "diététicienne"],
    alias: [
      "ostéo",
      "osteopathie",
      "kiné",
      "kine",
      "masseur",
      "sophrologue",
      "naturopathe",
      "infirmier",
      "cabinet médical",
      "médecin",
      "dentiste",
    ],
    palette: {
      fond: "#f6f4e9",
      encre: "#213642",
      accent: "#93573b",
      sur: "#fcfcfc",
      doux: "#4d616c",
    },
    logo: { police: "display", graisse: 200, casse: "minuscules", approche: -0.02 },
    sens: "fondu",
    lot: 1,
  },
  {
    id: "restaurateur",
    metier: "Restaurateur",
    famille: "Restauration",
    marque: "Sarment",
    domaine: "sarment-bistrot.exemple",
    accroche: "La carte change chaque mardi. La cuisine ferme à 22 h.",
    legende:
      "La carte du jour remplace la galerie photo. On réserve sa table sans quitter le premier écran.",
    memeLogique: ["brasserie", "pizzeria", "crêperie", "bar à vins", "traiteur"],
    alias: [
      "restaurant",
      "bistrot",
      "cuisinier",
      "chef",
      "café",
      "bar",
      "food truck",
      "pizzaiolo",
      "glacier",
    ],
    palette: {
      fond: "#44131a",
      encre: "#ffdfdc",
      accent: "#e3b667",
      sur: "#44131a",
      doux: "#d7b4b1",
    },
    logo: { police: "serif", graisse: 400, approche: -0.02 },
    sens: "haut",
    lot: 1,
  },
  {
    id: "menuisier",
    metier: "Menuisier",
    famille: "Bâtiment",
    marque: "Atelier Tenon",
    domaine: "atelier-tenon.exemple",
    accroche: "Cuisines, escaliers et placards, dessinés au millimètre.",
    legende:
      "Un menuisier vend des mesures justes. Les cotes du plan servent de décor et de preuve.",
    memeLogique: ["ébéniste", "cuisiniste", "charpentier", "maçon", "entreprise de rénovation"],
    alias: [
      "menuiserie",
      "agenceur",
      "plaquiste",
      "carreleur",
      "peintre",
      "artisan",
      "btp",
      "bâtiment",
    ],
    palette: {
      fond: "#f0dabe",
      encre: "#312317",
      accent: "#085e7a",
      sur: "#fdf8f1",
      doux: "#5a493d",
    },
    logo: { police: "display", graisse: 700, approche: -0.03 },
    sens: "gauche",
    lot: 2,
  },
  {
    id: "barbier",
    metier: "Barbier",
    famille: "Beauté",
    marque: "Fondu",
    domaine: "fondu-barbier.exemple",
    accroche: "Trois fauteuils, sans attente : réservez le vôtre.",
    legende:
      "Un salon vend des créneaux. L'agenda s'affiche dès l'ouverture, avec la durée et le prix de chaque prestation.",
    memeLogique: [
      "coiffeur",
      "institut de beauté",
      "prothésiste ongulaire",
      "auto-école",
      "coach sportif",
    ],
    alias: [
      "coiffeuse",
      "salon de coiffure",
      "esthéticienne",
      "estheticienne",
      "onglerie",
      "spa",
      "maquilleuse",
      "salle de sport",
      "moniteur",
    ],
    palette: {
      fond: "#130e0b",
      encre: "#f1e7d2",
      accent: "#d7a85b",
      sur: "#130e0b",
      doux: "#aba397",
    },
    logo: { police: "serif", graisse: 400, approche: 0 },
    sens: "bas",
    lot: 2,
  },
  {
    id: "agent-immobilier",
    metier: "Agent immobilier",
    famille: "Immobilier",
    marque: "Persienne",
    domaine: "persienne-immobilier.exemple",
    accroche: "Une estimation signée sous 48 h, plan coté à l'appui.",
    legende:
      "Sans photo, un plan coté donne la surface, l'étage et l'orientation. L'acheteur trie sur ces trois chiffres.",
    memeLogique: [
      "syndic de copropriété",
      "diagnostiqueur",
      "courtier en crédit",
      "gestion locative",
      "géomètre",
    ],
    alias: ["agence immobilière", "immobilier", "mandataire", "courtier", "promoteur"],
    palette: {
      fond: "#f9f6f2",
      encre: "#171d26",
      accent: "#c18e35",
      sur: "#171d26",
      doux: "#595e66",
    },
    logo: { police: "display", graisse: 200, casse: "capitales", approche: 0.35 },
    sens: "lames",
    lot: 1,
  },
  {
    id: "avocat",
    metier: "Avocat",
    famille: "Droit et conseil",
    marque: "Cabinet Alinéa",
    domaine: "cabinet-alinea.exemple",
    accroche: "Votre dossier expliqué sur une page, avant toute signature.",
    legende:
      "Un client d'avocat veut comprendre avant de payer. Le site emprunte la mise en page d'un code : articles numérotés, marges, renvois.",
    memeLogique: [
      "notaire",
      "expert-comptable",
      "commissaire de justice",
      "médiateur",
      "architecte",
    ],
    alias: [
      "avocate",
      "juriste",
      "cabinet",
      "comptable",
      "conseil",
      "consultant",
      "assurance",
      "banque",
    ],
    palette: {
      fond: "#f8f5ec",
      encre: "#13110f",
      accent: "#13110f",
      sur: "#f8f5ec",
      doux: "#5a5450",
    },
    logo: { police: "serif", graisse: 400, approche: 0 },
    sens: "bas",
    lot: 1,
  },
  {
    id: "fleuriste",
    metier: "Fleuriste",
    famille: "Commerce",
    marque: "Herbier",
    domaine: "herbier-fleurs.exemple",
    accroche: "Le bouquet de la semaine : renoncules et eucalyptus.",
    legende:
      "On commande des fleurs au dernier moment. L'heure limite de livraison suit le bouquet de la semaine, en haut de page.",
    memeLogique: ["caviste", "épicerie fine", "librairie", "créatrice de bijoux", "concept store"],
    alias: [
      "fleurs",
      "commerce",
      "commerçant",
      "boutique",
      "magasin",
      "cave",
      "épicerie",
      "bijouterie",
      "décoration",
    ],
    palette: {
      fond: "#feeaf2",
      encre: "#283c1b",
      accent: "#283c1b",
      sur: "#feeaf2",
      doux: "#4c5a44",
    },
    logo: { police: "serif", graisse: 400, approche: -0.01 },
    sens: "droite",
    lot: 1,
  },
  {
    id: "chambres-d-hotes",
    metier: "Chambres d'hôtes",
    famille: "Hôtellerie",
    marque: "Les Sept Lieues",
    domaine: "sept-lieues.exemple",
    accroche: "Quatre chambres, un jardin, le petit-déjeuner jusqu'à 10 h 30.",
    legende:
      "Un voyageur compare trois onglets ouverts. Les nuits libres et le prix passent avant la visite des chambres.",
    memeLogique: ["gîte", "hôtel", "camping", "salle de réception", "domaine viticole"],
    alias: [
      "chambre d'hôtes",
      "maison d'hôtes",
      "hébergement",
      "location saisonnière",
      "vigneron",
      "tourisme",
    ],
    palette: {
      fond: "#f4debd",
      encre: "#422616",
      accent: "#0d6277",
      sur: "#ffffff",
      doux: "#5f4738",
    },
    logo: { police: "serif", graisse: 400, approche: 0 },
    sens: "carte",
    lot: 2,
  },
  {
    id: "proprete",
    metier: "Propreté",
    famille: "Services",
    marque: "Escouade",
    domaine: "escouade-proprete.exemple",
    accroche: "Vos bureaux propres à 8 h, le rapport dans votre boîte à 8 h 05.",
    legende:
      "Un gestionnaire de bureaux achète une régularité. Le site affiche l'heure du passage et le rapport du lendemain.",
    memeLogique: [
      "déménageur",
      "conciergerie",
      "aide à domicile",
      "jardinier",
      "société de sécurité",
    ],
    alias: [
      "entreprise de propreté",
      "nettoyage",
      "ménage",
      "menage",
      "paysagiste",
      "élagueur",
      "multiservice",
      "services à la personne",
    ],
    palette: {
      fond: "#f7f8ec",
      encre: "#181b1f",
      accent: "#c9f14c",
      sur: "#181b1f",
      doux: "#52555b",
    },
    logo: { police: "display", graisse: 800, casse: "minuscules", approche: -0.04 },
    sens: "raclette",
    lot: 2,
  },
  {
    id: "tatoueur",
    metier: "Tatoueur",
    famille: "Création",
    marque: "Fine Ligne",
    domaine: "fine-ligne.exemple",
    accroche: "Flashs le premier samedi du mois. Projets sur rendez-vous.",
    legende:
      "Un tatoueur vend un trait. Le site garde le noir, le blanc et les dessins à taille réelle.",
    memeLogique: [
      "photographe",
      "graphiste",
      "illustratrice",
      "céramiste",
      "studio d'enregistrement",
    ],
    alias: ["tatouage", "tattoo", "artiste", "créateur", "créatrice", "artisan d'art", "musicien"],
    palette: {
      fond: "#f4f2ec",
      encre: "#060606",
      accent: "#060606",
      sur: "#f4f2ec",
      doux: "#4e4d4a",
    },
    logo: { police: "serif", graisse: 400, approche: -0.02 },
    sens: "haut",
    lot: 2,
  },
];

/** Le lot publié : 1 pour les huit premiers métiers, 2 pour les treize. */
export const LOT_PUBLIE: 1 | 2 = 2;

export const VITRINES: Vitrine[] = VITRINES_TOUTES.filter((v) => v.lot <= LOT_PUBLIE);

/**
 * Tant que Teddy n'a pas validé le plancher, les acomptes, le contenu et la
 * preuve, la page reste hors menu, hors sitemap et en noindex. Elle est
 * prérendue quand même (vite.config.ts) pour être relue à son adresse.
 */
export const PREMIUM_PUBLIE = false;

/** Les métiers nommés sur la page, par famille, chacun relié au site qui suit la même logique. */
export const FAMILLES_METIERS: {
  famille: string;
  metiers: { nom: string; vitrine: VitrineId }[];
}[] = (() => {
  const familles = new Map<string, { nom: string; vitrine: VitrineId }[]>();
  for (const v of VITRINES) {
    const liste = familles.get(v.famille) ?? [];
    liste.push({ nom: v.metier.toLowerCase(), vitrine: v.id });
    for (const m of v.memeLogique) liste.push({ nom: m, vitrine: v.id });
    familles.set(v.famille, liste);
  }
  return [...familles].map(([famille, metiers]) => ({ famille, metiers }));
})();

export const NOMBRE_METIERS = FAMILLES_METIERS.reduce((n, f) => n + f.metiers.length, 0);

/** Treize, en lettres, pour les phrases. */
const EN_LETTRES: Record<number, string> = { 8: "huit", 13: "treize" };
export const NOMBRE_VITRINES_LETTRES = EN_LETTRES[VITRINES.length] ?? String(VITRINES.length);

/**
 * Capacité affichée dans le tarif et l'appel final. `null` : la ligne n'est
 * pas rendue. À remplir quand Teddy l'aura décidée.
 */
export const CAPACITE: { parTrimestre: number | null; prochainDemarrage: string | null } = {
  parTrimestre: null,
  prochainDemarrage: null,
};

/** Date à laquelle les treize noms ont été vérifiés (annuaire des entreprises, INPI). `null` : pas encore. */
export const NOMS_VERIFIES_LE: string | null = null;

/**
 * Les conditions du mode « effet » (scène collée). Mêmes seuils que
 * l'ouverture de l'accueil (.zoom-stage) : sous 700 px de haut, ou 580 px
 * sur téléphone, la scène ne tient pas dans l'écran et la page reste en
 * galerie. Reprise à l'identique dans le script en tête de page.
 */
export const MEDIA_EFFET =
  "(prefers-reduced-motion: no-preference) and (min-height: 700px), (prefers-reduced-motion: no-preference) and (max-width: 699px) and (min-height: 580px)";

/**
 * La course de la scène, en fractions de hauteur d'écran : `lead` avant le
 * premier changement (la sortie du hero sur ordinateur), `pas` par métier,
 * `fin` après le dernier. `transition` est la part du pas occupée par le
 * volet. Les mêmes valeurs vivent dans premium.css.
 */
export const SCENE = {
  large: { lead: 1, pas: 0.6, fin: 0.3 },
  etroit: { lead: 0.25, pas: 0.55, fin: 0.2 },
  transition: 0.35,
} as const;

const PREMIUM = offre("site-premium");
const MAINTENANCE = offre("maintenance");
const PRESENCE_PRO = offre("presence-pro");
const [A1, A2, A3] = montantsAcomptes(PREMIUM);

/** Les cinq étapes, avec l'acompte qui tombe à la fin de certaines. */
export const METHODE: { titre: string; quand: string; texte: string; acompte?: string }[] = [
  {
    titre: "L'atelier",
    quand: "semaine 1",
    texte:
      "Deux heures en visio : vos clients, vos concurrents, ce que vous voulez qu'on retienne de vous. Vous recevez un compte rendu d'une page.",
    acompte: `${Math.round(A1.part * 100)} % ${A1.moment} · ${euros(A1.montant)}`,
  },
  {
    titre: "La direction artistique",
    quand: "semaines 2 et 3",
    texte:
      "Deux pistes, chacune avec sa palette, ses lettres, son motif et un écran d'accueil. Vous en retenez une, ou vous prenez dans les deux.",
  },
  {
    titre: "Les maquettes",
    quand: "semaines 3 à 5",
    texte:
      "Toutes les pages, sur téléphone et sur ordinateur, à ouvrir dans votre navigateur. Deux tours de corrections compris.",
    acompte: `${Math.round(A2.part * 100)} % ${A2.moment} · ${euros(A2.montant)}`,
  },
  {
    titre: "Les textes et les images",
    quand: "en parallèle",
    texte:
      "Nous rédigeons chaque page. Nous trions et retouchons vos photos, et nous dessinons en code les motifs, les plans et les pictogrammes, comme sur cette page.",
  },
  {
    titre: "Le développement et la mise en ligne",
    quand: "semaines 6 à 9",
    texte:
      "Code écrit à la main, sans thème acheté, testé sur iPhone, sur Android et au clavier. Nom de domaine, référencement de départ, fiche Google remise en ordre, une heure de prise en main en visio.",
    acompte: `${Math.round(A3.part * 100)} % ${A3.moment} · ${euros(A3.montant)}`,
  },
];

export const FAQ_PREMIUM: { q: string; a: string }[] = [
  {
    q: "Les marques de cette page existent-elles ?",
    a: `Non. Les ${NOMBRE_VITRINES_LETTRES} marques, leurs adresses en .exemple et leurs prix sont inventés pour montrer ce que Sitaly dessine. Le seul site réel de la page est celui d'Aymeric Pataud.`,
  },
  {
    q: "Premium ou Présence Pro pour mon métier ?",
    a: `Regardez comment vos clients choisissent. S'ils comparent avant de signer, pour une cuisine, une salle de bains, un mariage ou une table, Premium vous distingue. S'ils appellent le plus proche, pour une fuite ou une serrure bloquée, ${PRESENCE_PRO.nom} suffit, à ${prixCourt(PRESENCE_PRO)}. Un plombier qui refait aussi des salles de bains peut viser les deux : le questionnaire tranche avec vous.`,
  },
  {
    q: "Pourquoi payer en une fois plutôt que chaque mois ?",
    a: "L'abonnement Présence inclut la création dans la mensualité, et le site reste à Sitaly tant que dure l'abonnement. Avec Premium, vous payez la création en trois acomptes, et le site vous appartient au dernier : code, fichiers, textes et photos.",
  },
  {
    q: `Que veut dire « ${prixCourt(PREMIUM)} » ?`,
    a: "C'est le prix d'un site de huit pages avec sa direction artistique complète. Plus de pages, une deuxième langue, une réservation ou une boutique en ligne font monter le devis. Vous lisez le montant exact avant de signer.",
  },
  {
    q: "Combien de temps faut-il ?",
    a: "Huit à dix semaines entre l'atelier et la mise en ligne, si vous validez chaque étape sous une semaine.",
  },
  {
    q: "Et après la mise en ligne ?",
    a: `Hébergement et corrections sont compris pendant trois mois. Ensuite, vous confiez l'entretien à Sitaly pour ${euros(MAINTENANCE.mensuel ?? 0)} par mois, sans engagement, ou vous reprenez le site avec le prestataire de votre choix.`,
  },
  {
    q: "Utilisez-vous des images générées par l'IA ?",
    a: "Pas pour montrer votre entreprise. Vos chantiers, vos produits, votre local et votre équipe apparaissent sur vos vraies photos, que nous retouchons. Les motifs, les plans et les pictogrammes sont dessinés en code, comme sur cette page.",
  },
  {
    q: "Mon métier n'est pas sur la page.",
    a: `Les ${NOMBRE_VITRINES_LETTRES} métiers servent d'exemples. Tapez le vôtre plus haut, ou présentez votre projet : la direction artistique part de votre activité et de vos clients.`,
  },
];
