/**
 * Balises de l'image de partage d'une page, dans l'ordre qu'attend l'aperçu
 * Apple (iMessage, Safari) : og:image d'abord, puis ses dimensions.
 *
 * Une route qui redéfinit seulement og:image laisse og:image:width, :height et
 * :alt de __root.tsx avant elle : TanStack retire l'og:image du layout et
 * ajoute celle de la route en fin de liste. LinkPresentation ignore alors
 * l'og:image et prend la première grande photo de la page. L'accueil montrait
 * le fleuriste au lieu du plombier pour cette raison (21/11/2026).
 * Redéfinir les cinq balises ensemble les replace toutes, dans cet ordre.
 */
export const imagePartage = (url: string, largeur: number, hauteur: number, alt: string) => [
  { property: "og:image", content: url },
  { property: "og:image:width", content: String(largeur) },
  { property: "og:image:height", content: String(hauteur) },
  { property: "og:image:alt", content: alt },
  { name: "twitter:image", content: url },
];
