import { Hammer, HardHat, Wrench, Zap } from "lucide-react";

/**
 * Les quatre pages métier. Elles portent chacune leurs propres mots-clés
 * (« plombier + ville »), servent de destination aux campagnes Google Ads et
 * se maillent entre elles. Source unique pour l'accueil, les pages métier
 * elles-mêmes et les pieds de page.
 */
export const METIER_PAGES = [
  {
    href: "/site-internet-plombier/",
    icon: Wrench,
    title: "Site internet plombier",
    desc: "Bouton d'appel urgence, formulaire à 3 champs, SEO « plombier + ville ».",
  },
  {
    href: "/site-internet-electricien/",
    icon: Zap,
    title: "Site internet électricien",
    desc: "Certifications mises en avant, devis rapide, confiance dès la première seconde.",
  },
  {
    href: "/site-internet-couvreur/",
    icon: HardHat,
    title: "Site internet couvreur",
    desc: "Photos de chantiers, zone d'intervention, captation des devis de toiture.",
  },
  {
    href: "/site-internet-menuisier/",
    icon: Hammer,
    title: "Site internet menuisier",
    desc: "Portfolio sur mesure, demandes qualifiées, valorisation de vos réalisations.",
  },
] as const;
