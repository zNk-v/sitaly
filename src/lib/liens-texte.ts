/**
 * Liens dans un texte de données, écrits `[ancre](/chemin/)`.
 *
 * Articles, FAQ et pages de vente stockent leur texte en chaînes : cette
 * syntaxe y glisse un lien sans quitter la donnée. Le rendu passe par
 * `TexteAvecLiens` ; les données structurées et les décomptes de mots n'en
 * gardent que l'ancre, par `texteBrut`.
 */
export const LIEN_DANS_LE_TEXTE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Le texte tel qu'on le lit, sans la syntaxe des liens. */
export function texteBrut(texte: string): string {
  return texte.replace(LIEN_DANS_LE_TEXTE, "$1");
}
