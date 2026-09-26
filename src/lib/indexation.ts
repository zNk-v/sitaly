/**
 * Ce que Google doit indexer, et ce qu'il doit laisser de côté.
 *
 * Décision du 26 septembre 2026, à la suite de l'audit SEO/GEO : le
 * référencement de sitaly.fr sert les agents IA et l'automatisation pour les
 * PME. Le contenu écrit pour les artisans et les sujets hors offre dispersait
 * le site sur des requêtes où un domaine jeune n'a aucune chance, et Google ne
 * savait plus pour quoi le classer.
 *
 * Ces pages restent en ligne, parce qu'elles servent la prospection directe
 * des artisans : on les envoie par lien. Elles sortent seulement de l'index
 * (`noindex, follow`), du sitemap, de `llms.txt`, du pied de page et des
 * listes du blog. Elles ne doivent jamais être bloquées dans robots.txt :
 * Google doit pouvoir les explorer pour lire le `noindex`.
 *
 * Avant de retirer une page de cette liste, regarder ses clics dans Search
 * Console : une page qui en reçoit mérite peut-être de revenir dans l'index.
 *
 * Ce module ne dépend de rien d'autre dans `src/` : `vite.config.ts` l'importe
 * pour que le prérendu génère ces pages même quand plus rien ne les lie.
 */

/** Pages métier écrites pour les artisans. */
export const PAGES_METIER_HORS_INDEX = [
  "/site-internet-plombier",
  "/site-internet-electricien",
  "/site-internet-couvreur",
  "/site-internet-menuisier",
  "/site-internet-chauffagiste",
  "/site-internet-macon",
  "/site-internet-peintre",
  "/site-internet-paysagiste",
  "/site-internet-serrurier",
  "/site-internet-carreleur",
];

/** Outils gratuits pensés pour les artisans. */
export const PAGES_OUTILS_HORS_INDEX = [
  "/outils",
  "/outils/audit-fiche-google",
  "/outils/budget-google-ads-artisan",
];

/** Articles écrits pour les artisans, les professions libérales, ou hors offre. */
export const ARTICLES_HORS_INDEX = [
  "creation-site-internet-artisan-guide",
  "comment-attirer-clients-artisan",
  "referencement-local-google-artisan",
  "combien-coute-site-internet-artisan",
  "fiche-google-business-profile-artisan",
  "site-internet-plombier-electricien",
  "seo-local-villes-pages-artisan",
  "site-internet-artisan-rentabilite-roi",
  "google-ads-artisan-quand-utiliser",
  "refonte-site-artisan-quand-comment",
  "google-ads-artisan-pourquoi-investir",
  "google-ads-vs-seo-artisan",
  "cout-google-ads-artisan-vrais-chiffres",
  "logiciel-gestion-artisan-choisir",
  "recolter-avis-google-artisan",
  "trouver-patients-osteopathe",
  "site-internet-kinesitherapeute-patients",
  "trouver-clients-coach-sportif",
  "trouver-clients-consultant-independant",
  "trouver-clients-avocat",
  "trouver-clients-expert-comptable",
  "trouver-des-chantiers-artisan",
  "plateformes-mise-en-relation-artisan-avis",
  "crm-artisan-guide",
  "logiciel-devis-artisan-choisir",
  "comparatif-solutions-site-internet-artisan",
  "resilier-contrat-site-internet-location-financiere",
  "iphone-duo-site-internet-ecran-pliable",
  // Écrit pour les artisans, chiffres sans source : le sujet des appels manqués
  // est porté par /agents-ia/btp/ et l'article sur le démarchage.
  "appels-manques-artisan-permanence-telephonique",
];

/**
 * Landings statiques servies depuis `public/`, gardées pour leur trafic
 * payant mais hors index : leur sujet est déjà porté par une page du routeur.
 * Leur `noindex` est écrit en dur dans leur HTML.
 */
export const LANDINGS_STATIQUES_HORS_INDEX = ["/agents-ia/chatgpt"];

function normaliser(chemin: string): string {
  const sansQuery = chemin.split(/[?#]/)[0];
  const net = sansQuery.replace(/\/+$/, "");
  return net === "" ? "/" : net;
}

const HORS_INDEX = new Set<string>([
  ...PAGES_METIER_HORS_INDEX,
  ...PAGES_OUTILS_HORS_INDEX,
  ...ARTICLES_HORS_INDEX.map((slug) => `/blog/${slug}`),
  ...LANDINGS_STATIQUES_HORS_INDEX,
]);

/** Vrai si la page doit être indexée. Accepte un chemin avec ou sans slash final. */
export function estIndexable(chemin: string): boolean {
  return !HORS_INDEX.has(normaliser(chemin));
}

/** Vrai si l'article doit être indexé et listé sur le blog. */
export function articleIndexable(slug: string): boolean {
  return !ARTICLES_HORS_INDEX.includes(slug);
}

/**
 * Valeur de la balise robots. Les pages indexables gardent les directives
 * d'extrait larges qu'elles avaient déjà ; les autres passent en `noindex`,
 * sans `nofollow` pour que leurs liens continuent de compter.
 */
export function directiveRobots(chemin: string): string {
  return estIndexable(chemin)
    ? "index, follow, max-snippet:-1, max-image-preview:large"
    : "noindex, follow";
}

/**
 * Pages que le prérendu doit générer explicitement. Retirées du pied de page
 * et des listes du blog, elles ne sont plus forcément liées depuis une page
 * indexable : sans cette liste, le prérendu par liens ne les trouverait plus
 * et elles tomberaient en 404.
 */
export const PAGES_A_PRERENDRE_HORS_INDEX = [
  ...PAGES_METIER_HORS_INDEX,
  ...PAGES_OUTILS_HORS_INDEX,
  ...ARTICLES_HORS_INDEX.map((slug) => `/blog/${slug}`),
];
