import type { ReactNode } from "react";

/**
 * Trait tracé à la main sous un mot.
 *
 * Le geste passe **sous** le mot et ne le recouvre jamais : un surlignage qui
 * traverse le texte le rend moins lisible et n'est pas ce que fait la
 * référence. La courbe descend légèrement au centre, comme un trait posé d'un
 * seul mouvement, et déborde des deux côtés.
 *
 * Le trait se dessine au défilement via `animation-timeline`, donc sans
 * JavaScript ni observateur : il vit sur le fil de composition. Là où ce n'est
 * pas supporté, il est simplement déjà tracé.
 *
 * Le SVG est étiré en `preserveAspectRatio="none"` : il s'adapte à la longueur
 * du mot sans qu'on ait à mesurer quoi que ce soit.
 *
 * `variante` :
 * - `trait` : un passage sous le mot, le geste par défaut
 * - `cercle` : un entourage, pour un mot isolé qu'on veut désigner
 */
export function Surligne({
  children,
  variante = "trait",
  className = "",
}: {
  children: ReactNode;
  variante?: "trait" | "cercle";
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative">{children}</span>
      <svg
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 24"
        className={`mark-svg mark-${variante}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {variante === "trait" ? (
          /* Une courbe qui creuse au centre et remonte à droite, tracée d'un
             seul geste. Elle dépasse du mot des deux côtés. */
          <path className="mark-draw" d="M2 5C22 20 62 22.5 98 8" strokeWidth="9" />
        ) : (
          <path
            className="mark-draw"
            d="M52 2C24 1 3 6 3.5 12 4 19 28 22.5 54 22 78 21.5 96 17 96.5 11.5 97 6 78 2.5 58 2"
            strokeWidth="3"
          />
        )}
      </svg>
    </span>
  );
}
