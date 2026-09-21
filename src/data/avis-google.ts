/**
 * Avis Google de la fiche Sitaly, recopiés depuis Google Maps le 21 septembre 2026.
 *
 * Règle : le texte est celui que le client a publié. Seules la ponctuation,
 * les apostrophes et les traits d'union manquants sont corrigés (« C est »
 * devient « C'est »). Le vocabulaire et l'ordre des phrases ne bougent pas.
 * Un avis ajouté ici doit exister sur la fiche.
 */
export const FICHE_GOOGLE_URL = "https://share.google/QDnB6cIksAxPyNdCo";

export type AvisGoogle = {
  auteur: string;
  note: number;
  date: string;
  texte: string;
  /** Réalisation concernée, quand l'auteur est un client présenté sur le site. */
  realisation?: string;
};

export const AVIS_GOOGLE: AvisGoogle[] = [
  {
    auteur: "Aymeric Pataud",
    note: 5,
    date: "septembre 2026",
    realisation: "aymeric-pataud",
    texte:
      "Un accompagnement au top pour mon nouveau site internet et la stratégie autour de mon savoir-faire et de mon personal branding. C'est la 1ère fois que quelqu'un comprend exactement ce que je veux et trouve les bons mots pour raconter qui je suis et ce que je fais. Un seul conseil, si vous cherchez un site qui tient la route et un accompagnement concernant votre stratégie de développement, faites appel à Teddy, vous ne serez pas déçu.",
  },
  {
    auteur: "Ludovic",
    note: 5,
    date: "juin 2026",
    texte:
      "Une très bonne expérience avec Mr Vidal ! Un site au top pour un tarif très avantageux.",
  },
];

/** Moyenne affichée, calculée sur les avis ci-dessus : elle ne peut pas diverger. */
export const NOTE_GOOGLE = {
  note: (AVIS_GOOGLE.reduce((s, a) => s + a.note, 0) / AVIS_GOOGLE.length)
    .toFixed(1)
    .replace(".", ","),
  nombre: AVIS_GOOGLE.length,
};
