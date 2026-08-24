import { Hammer, HardHat, Wrench, Zap } from "lucide-react";

/**
 * Source unique des pages métier.
 * Sert au maillage interne : accueil, pages métier entre elles, articles de blog.
 */
export interface MetierLink {
  /** Chemin de route TanStack (le slash final est ajouté par le router). */
  to: "/site-internet-plombier/" | "/site-internet-electricien/" | "/site-internet-couvreur/" | "/site-internet-menuisier/";
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
];

/** Les autres métiers que celui de la page courante. */
export function otherMetiers(current: MetierLink["to"]): MetierLink[] {
  return METIERS.filter((m) => m.to !== current);
}
