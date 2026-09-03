import type { ReactNode } from "react";

/**
 * Ouverture au défilement : le nom grandit jusqu'à percer l'écran.
 *
 * Mécanique. Le nom n'est pas un texte posé sur un fond, c'est un **trou** dans
 * un voile couleur papier. Le voile couvre toute la fenêtre, le mot y est
 * découpé au masque SVG, et la section suivante vit dessous. Quand le mot
 * grandit, le trou grandit avec lui : on voit de plus en plus de ce qu'il y a
 * derrière, jusqu'à ce que les lettres débordent et que le voile disparaisse.
 *
 * L'échelle est pilotée par la timeline de défilement de la scène, référencée
 * par son nom : l'enfant collé ne bouge pas, il ne peut donc pas servir de
 * repère à sa propre animation. Aucun écouteur, aucun recalcul de mise en page.
 *
 * Repli. Sans `animation-timeline`, ou sous `prefers-reduced-motion`, le voile
 * n'est jamais rendu : la scène redevient deux sections l'une après l'autre.
 * C'est la seule façon sûre de faire, un voile bloqué à l'échelle 1 masquerait
 * définitivement la section suivante.
 */
export function ZoomIntro({
  nom,
  avant,
  children,
}: {
  /** Le mot découpé dans le voile. */
  nom: string;
  /** Ce qui accompagne le nom au premier plan, et s'efface en montant. */
  avant: ReactNode;
  /** La section révélée à travers le mot. */
  children: ReactNode;
}) {
  return (
    /* Le bandeau et le pied de page renvoient vers #top : l'ancre vit ici. */
    <section id="top" className="zoom-stage">
      {/* Ordre du DOM = ordre de lecture du repli : le texte de tête, puis la
          section révélée. En mode animé, c'est z-index qui fait l'empilement,
          pas l'ordre du DOM. */}
      <div className="zoom-pin">
        <div className="zoom-front">{avant}</div>

        <div className="zoom-cover" aria-hidden="true">
          <svg
            className="absolute inset-0 h-full w-full"
            /* Repère volontairement très haut. Avec `slice`, l'échelle vaut
               max(largeur/1200, hauteur/2400) : ce rapport fait dominer la
               largeur dans presque tous les formats, si bien que le mot grandit
               comme la fente qui lui est réservée, exprimée en vw. Avec un
               repère au format paysage, la hauteur prenait le dessus et le mot
               débordait sur la ligne du dessous. */
            viewBox="0 0 1200 2400"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="zoom-intro-mask">
                {/* Blanc = opaque, noir = percé. Le rectangle déborde largement
                    du repère : avec `slice`, le SVG est rogné sur un côté selon
                    le format de la fenêtre, et un rectangle à ras laisserait
                    passer une bande de panneau sur les bords. */}
                <rect x="-4800" y="-4800" width="12000" height="12000" fill="white" />
                {/* dx compense la chasse que l'interlettrage ajoute après la
                    dernière lettre et qui décale le mot vers la gauche. */}
                <text
                  className="zoom-word"
                  x="600"
                  dx="0.09em"
                  /* Légèrement au-dessus du centre géométrique : la hampe du
                     « y » tire l'encre du mot vers le bas, et le centre optique
                     ne coïncide pas avec le centre de la boîte. */
                  y="1152"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                >
                  {nom}
                </text>
              </mask>
            </defs>
            <rect
              x="-4800"
              y="-4800"
              width="12000"
              height="12000"
              fill="var(--paper)"
              mask="url(#zoom-intro-mask)"
            />
          </svg>
        </div>

        {/* Couche du dessous : ce que le trou laisse voir. */}
        <div className="zoom-behind">{children}</div>
      </div>
    </section>
  );
}
