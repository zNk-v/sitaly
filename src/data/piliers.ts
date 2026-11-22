/**
 * Les deux pages piliers écrites pour les artisans (SITA-7, textes validés par
 * Ted ; intégration du 16 novembre 2026).
 *
 * Ce fichier ne porte que l'identité de chaque page : son adresse, sa fiche
 * SEO et le libellé de ses liens entrants. Le contenu vit dans sa route
 * (src/routes/creer-site-internet-artisan.tsx et
 * src/routes/logiciel-devis-factures-artisan.tsx), comme pour /tarifs/ et les
 * pages /outils/.
 *
 * Les pages qui pointent vers un pilier (les modèles, les produits, /tarifs/,
 * les articles du blog) lisent `chemin` et `ancre` ici : une adresse ou un
 * libellé ne se recopie pas ailleurs. Le plan du site les reprend aussi
 * (src/lib/sitemap.ts).
 *
 * Aucun montant ici : les prix affichés sur les deux pages viennent de
 * CREATEUR_IA (src/data/offres.ts).
 */

export interface Pilier {
  /** Dernier segment de l'adresse, et nom du fichier de route. */
  id: string;
  /** Chemin de route TanStack, slash final compris. */
  chemin: "/creer-site-internet-artisan/" | "/logiciel-devis-factures-artisan/";
  /**
   * Le nom de la page dans un fil d'Ariane, celui qui s'affiche comme celui
   * des données structurées : Google demande que les deux concordent, donc le
   * fil visible et le BreadcrumbList lisent tous les deux ce champ.
   */
  nom: string;
  /** Le libellé d'un lien entrant, où qu'il soit posé. */
  ancre: string;
  /** Une ligne sous l'ancre, pour une carte de lien. */
  resume: string;
  /** La balise titre, telle que la fiche SEO du document la fixe. */
  seoTitre: string;
  description: string;
}

/** « Créer un site internet d'artisan », requête cible : créer un site internet d'artisan. */
export const PILIER_SITE: Pilier = {
  id: "creer-site-internet-artisan",
  chemin: "/creer-site-internet-artisan/",
  nom: "Créer un site internet d'artisan",
  ancre: "Lire le guide pour créer un site internet d'artisan",
  resume: "Les étapes, ce que le site doit contenir, et le prix réel en 2026.",
  seoTitre: "Créer un site internet d'artisan : le guide 2026 | Sitaly",
  // Description raccourcie de 173 à 142 signes : au-delà de 160, Google coupe
  // et scripts/verifier-seo.mjs refuse le build. La fin du texte validé
  // (« qui écrit le site pour votre métier ») tombait hors de l'extrait.
  description:
    "Créer un site internet d'artisan sans développeur : les étapes, ce que le site doit contenir, le prix réel. Aperçu gratuit avec l'IA de Sitaly.",
};

/**
 * « Logiciel de devis et factures pour artisans », sur l'intention comparative
 * (comparer et choisir), pour ne pas concurrencer la page produit
 * /produits/devis-et-factures/ sur la même requête : décision de Ted du
 * 15 novembre 2026, les deux pages restent distinctes et celle-ci pousse vers
 * la page produit.
 */
export const PILIER_DEVIS: Pilier = {
  id: "logiciel-devis-factures-artisan",
  chemin: "/logiciel-devis-factures-artisan/",
  // Fil d'Ariane raccourci : le titre entier tient sur deux lignes sur un
  // téléphone, et le fil d'une page produit porte lui aussi un nom court.
  nom: "Logiciel de devis et factures",
  ancre: "Comment choisir un logiciel de devis et factures",
  resume: "Mentions obligatoires, facturation électronique 2027, paiement en ligne.",
  // Titre ramené de 70 à 60 signes et description de 175 à 155, pour les
  // limites de Google et celles de scripts/verifier-seo.mjs. « | Sitaly »
  // saute, comme sur /tarifs/, et « artisans » passe au singulier : la requête
  // cible reste en tête du titre, et l'angle comparatif (« comment choisir »)
  // distingue la page de /produits/devis-et-factures/, dont la balise titre est
  // « Logiciel de devis et factures pour artisans | Sitaly ».
  seoTitre: "Logiciel de devis et factures pour artisan : comment choisir",
  description:
    "Quel logiciel de devis et factures choisir quand on est artisan : mentions obligatoires, facturation électronique 2027, paiement en ligne, devis illimités.",
};

export const PILIERS: Pilier[] = [PILIER_SITE, PILIER_DEVIS];

/**
 * Le pilier qui prolonge une page produit, quand il y en a un : la page
 * produit le cite dès son intro, et le pilier la pousse en retour.
 */
export const PILIER_PAR_PRODUIT: Record<string, Pilier> = {
  "devis-et-factures": PILIER_DEVIS,
};
