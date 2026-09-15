import {
  BrickWall,
  Flame,
  Grid3x3,
  Hammer,
  HardHat,
  KeyRound,
  PaintRoller,
  Trees,
  Wrench,
  Zap,
} from "lucide-react";

/**
 * Source unique des pages métier.
 * Sert au maillage interne : accueil, pages métier entre elles, articles de blog, sitemap.
 */
export interface MetierLink {
  /** Chemin de route TanStack (le slash final est ajouté par le router). */
  to:
    | "/site-internet-plombier/"
    | "/site-internet-electricien/"
    | "/site-internet-couvreur/"
    | "/site-internet-menuisier/"
    | "/site-internet-chauffagiste/"
    | "/site-internet-macon/"
    | "/site-internet-peintre/"
    | "/site-internet-paysagiste/"
    | "/site-internet-serrurier/"
    | "/site-internet-carreleur/";
  /** Nom du métier au singulier, minuscule. */
  metier: string;
  /** Libellé court affiché dans les liens et les cartes. */
  label: string;
  /** Accroche d'une ligne pour les cartes. */
  teaser: string;
  icon: typeof Wrench;
}

export const METIERS: MetierLink[] = [
  {
    to: "/site-internet-plombier/",
    metier: "plombier",
    label: "Site internet plombier",
    teaser: "Bouton d'appel urgence, formulaire à 3 champs, SEO « plombier + ville ».",
    icon: Wrench,
  },
  {
    to: "/site-internet-electricien/",
    metier: "électricien",
    label: "Site internet électricien",
    teaser: "Certifications mises en avant, devis rapide, confiance dès la première seconde.",
    icon: Zap,
  },
  {
    to: "/site-internet-couvreur/",
    metier: "couvreur-façadier",
    label: "Site internet couvreur",
    teaser: "Photos de chantiers, zone d'intervention, captation des devis de toiture.",
    icon: HardHat,
  },
  {
    to: "/site-internet-menuisier/",
    metier: "menuisier",
    label: "Site internet menuisier",
    teaser: "Portfolio sur mesure, demandes qualifiées, valorisation de vos réalisations.",
    icon: Hammer,
  },
  {
    to: "/site-internet-chauffagiste/",
    metier: "chauffagiste",
    label: "Site internet chauffagiste",
    teaser: "Dépannage l'hiver, pompes à chaleur l'été, contrats d'entretien toute l'année.",
    icon: Flame,
  },
  {
    to: "/site-internet-macon/",
    metier: "maçon",
    label: "Site internet maçon",
    teaser: "Extensions, ouvertures de murs, dalles : des chantiers suivis étape par étape.",
    icon: BrickWall,
  },
  {
    to: "/site-internet-peintre/",
    metier: "peintre",
    label: "Site internet peintre",
    teaser: "Avant-après, particuliers et syndics, devis au mètre carré qui filtre les curieux.",
    icon: PaintRoller,
  },
  {
    to: "/site-internet-paysagiste/",
    metier: "paysagiste",
    label: "Site internet paysagiste",
    teaser: "Créations de jardins en photos, contrats d'entretien et crédit d'impôt expliqué.",
    icon: Trees,
  },
  {
    to: "/site-internet-serrurier/",
    metier: "serrurier",
    label: "Site internet serrurier",
    teaser:
      "Tarifs annoncés, adresse réelle, avis vérifiables : la preuve qu'on n'est pas un arnaqueur.",
    icon: KeyRound,
  },
  {
    to: "/site-internet-carreleur/",
    metier: "carreleur",
    label: "Site internet carreleur",
    teaser: "Salles de bain, terrasses, grands formats : la finition se montre en gros plan.",
    icon: Grid3x3,
  },
];

/** Les autres métiers que celui de la page courante. */
export function otherMetiers(current: MetierLink["to"]): MetierLink[] {
  return METIERS.filter((m) => m.to !== current);
}
