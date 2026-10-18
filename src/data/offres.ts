/**
 * Grille tarifaire de Sitaly : source unique des montants affichés.
 *
 * Décision du 18 octobre 2026 : les prix des sites sont publiés (révision de
 * DESIGN.md §8). La page /tarifs/, l'accueil et la FAQ lisent ce fichier ;
 * aucun montant de site ne doit être recopié ailleurs dans le code. Les
 * fichiers texte de public/ (pricing.md, llms.txt, llms-full.txt) se
 * corrigent à la main à chaque changement ici.
 *
 * Hors grille, sans prix affiché : agents IA, Google Ads, ChatGPT Ads.
 */

export type OffreId = "presence" | "presence-pro" | "boutique" | "maintenance";

export interface Offre {
  id: OffreId;
  nom: string;
  /** Une ligne sous le nom : pour qui. */
  pour: string;
  mensuel: number;
  /** Frais payés une fois, à la signature. */
  depart: number;
  /** Libellé des frais de départ : « mise en service » ou « audit ». */
  departLibelle: string;
  /** Première ligne de la liste, en gras, quand l'offre en reprend une autre. */
  reprend?: string;
  inclus: string[];
  /** Précisions affichées sous la liste. */
  notes?: string[];
  /** Encadré obligatoire (Shopify). */
  mention?: string;
  recommandee?: boolean;
  cta: "rappel" | "devis";
}

export const OFFRES: Offre[] = [
  {
    id: "presence",
    nom: "Présence",
    pour: "Un site clair et une fiche Google tenue, pour être trouvé dans votre commune.",
    mensuel: 149,
    depart: 290,
    departLibelle: "de mise en service",
    inclus: [
      "Site vitrine jusqu'à 5 pages, rédaction incluse",
      "Hébergement, nom de domaine et maintenance",
      "Fiche Google optimisée et gérée, réponses aux avis",
      "1 modification par mois",
    ],
    cta: "rappel",
  },
  {
    id: "presence-pro",
    nom: "Présence Pro",
    pour: "Pour être trouvé aussi dans les communes voisines, et faire grandir vos avis.",
    mensuel: 249,
    depart: 490,
    departLibelle: "de mise en service",
    reprend: "Tout Présence, plus :",
    inclus: [
      "5 pages locales, une par commune voisine",
      "Posts et photos sur votre fiche Google chaque mois",
      "Demande d'avis automatique après chaque prestation",
      "Rapport mensuel",
    ],
    recommandee: true,
    cta: "rappel",
  },
  {
    id: "boutique",
    nom: "Boutique en ligne",
    pour: "Vendre vos produits en ligne avec Shopify : fleurs, bougies, créations, épicerie.",
    mensuel: 149,
    depart: 990,
    departLibelle: "de mise en service",
    inclus: [
      "Boutique Shopify configurée : thème, jusqu'à 20 produits, paiement, livraison",
      "Pages légales et prise en main",
      "Chaque mois : mises à jour, support et 1 h de modifications (produits, bannières de saison)",
      "Fiche Google gérée, réponses aux avis",
    ],
    notes: ["La boutique vous appartient.", "Sans abonnement Sitaly : 1 490 € en une fois."],
    mention:
      "Abonnement Shopify à votre nom, environ 36 €/mois, payé directement à Shopify, plus les frais de paiement sur les ventes.",
    cta: "devis",
  },
  {
    id: "maintenance",
    nom: "Maintenance de site existant",
    pour: "Pour un site que vous avez déjà, fait ailleurs, sous WordPress ou autre.",
    mensuel: 79,
    depart: 190,
    departLibelle: "d'audit",
    inclus: ["Audit de départ", "Sauvegardes", "Mises à jour", "Corrections mineures"],
    notes: ["Si le site demande une remise en état : devis séparé, annoncé avant tout travail."],
    cta: "devis",
  },
];

export const A_LA_CARTE: { libelle: string; prix: number; detail?: string }[] = [
  { libelle: "Page supplémentaire", prix: 90 },
  { libelle: "10 produits Shopify supplémentaires", prix: 90 },
  { libelle: "Optimisation de fiche Google seule, sans site", prix: 190, detail: "en une fois" },
  { libelle: "Passage de Présence à Présence Pro", prix: 200 },
];

/** Rachat d'un site vitrine au départ du client, selon l'ancienneté. */
export const RACHAT_SITE = [
  { periode: "Pendant la 1re année", prix: 1290 },
  { periode: "Pendant la 2e année", prix: 890 },
  { periode: "Ensuite", prix: 490 },
];

export const MENTION_TVA = "TVA non applicable, art. 293 B du CGI";

/** Prix le plus bas d'un site, pour les accroches (« à partir de »). */
export const PRIX_SITE_MIN = Math.min(
  ...OFFRES.filter((o) => o.id !== "maintenance").map((o) => o.mensuel),
);

export function offre(id: OffreId): Offre {
  const o = OFFRES.find((x) => x.id === id);
  if (!o) throw new Error(`Offre inconnue : ${id}`);
  return o;
}
