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
          {/* Aucun viewBox, volontairement. Avec un viewBox, `slice` applique
              un facteur d'échelle qui dépend du format de la fenêtre, alors que
              la fente réservée au mot est exprimée en vw : les deux divergent et
              le mot finit par mordre la ligne du dessous. Sans viewBox, une
              unité SVG vaut un pixel CSS, la taille en vw est donc respectée au
              pixel près et les deux suivent la même règle. */}
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              {/* Région explicite, bornée à la fenêtre. Un masque est borné par
                  défaut à 120 % de la boîte de l'objet masqué, ce qui était la
                  première explication du plafond de couverture du trou. La
                  mesure l'a démentie : la région explicite n'a rien changé aux
                  chiffres. Elle reste parce qu'elle rend la borne lisible dans
                  le code plutôt qu'implicite, mais la cause du plafond est
                  ailleurs. Voir la note sur `.zoom-cover`. */}
              <mask
                id="zoom-intro-mask"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="100%"
                height="100%"
              >
                {/* Blanc = opaque, noir = percé. */}
                <rect width="100%" height="100%" fill="white" />
                {/* y=0 : la position verticale vient d'une translation CSS, pour
                    qu'elle partage la même formule que la fente réservée dans le
                    flux. Voir --mot-haut dans la feuille de style. */}
                <text
                  className="zoom-word"
                  x="50%"
                  y="0"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                >
                  {nom}
                </text>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="var(--paper)" mask="url(#zoom-intro-mask)" />
          </svg>
        </div>

        {/* Couche du dessous : ce que le trou laisse voir. */}
        <div className="zoom-behind">{children}</div>
      </div>
    </section>
  );
}
