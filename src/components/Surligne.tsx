import type { ReactNode } from "react";

/**
 * Surlignage tracé à la main derrière un mot.
 *
 * Le trait est un chemin SVG volontairement irrégulier, épais et à bouts
 * ronds : il imite un feutre passé d'un geste, pas un rectangle de couleur.
 * Il se dessine au défilement via `animation-timeline`, donc sans JavaScript
 * ni observateur — le tracé vit sur le fil de composition.
 *
 * Le SVG est posé derrière le texte et étiré en `preserveAspectRatio="none"` :
 * il s'adapte à la longueur du mot sans qu'on ait à mesurer quoi que ce soit.
 *
 * `variante` change la forme du geste :
 * - `trait` : un passage de feutre sous le mot, le plus discret
 * - `sweep` : deux passages qui couvrent la hauteur du mot
 * - `cercle` : un entourage, pour un mot isolé qu'on veut désigner
 */
export function Surligne({
  children,
  variante = "trait",
  className = "",
}: {
  children: ReactNode;
  variante?: "trait" | "sweep" | "cercle";
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <svg
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 32"
        className={`mark-svg mark-${variante}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {variante === "trait" && (
          /* Un seul geste, qui déborde légèrement des deux côtés et
             ne suit pas tout à fait l'horizontale. */
          <path className="mark-draw" d="M1.5 25.5C22 21.4 58 20.2 98.5 23.8" strokeWidth="7" />
        )}
        {variante === "sweep" && (
          <>
            <path className="mark-draw" d="M2 12C26 8.2 62 7.4 98 10.5" strokeWidth="12" />
            <path
              className="mark-draw mark-draw-2"
              d="M97 23C70 26.4 34 27 2.5 24.2"
              strokeWidth="11"
            />
          </>
        )}
        {variante === "cercle" && (
          <path
            className="mark-draw"
            d="M52 2.5C24 1.5 3 8 3.5 16.5 4 25.5 28 30.5 54 30 78 29.5 96 24 96.5 16 97 8.5 78 3 58 2.2"
            strokeWidth="3"
          />
        )}
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}
