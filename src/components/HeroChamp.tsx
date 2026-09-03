/**
 * Le champ derrière le premier écran : des arcs tramés qui balayent la fenêtre.
 *
 * Adapté d'un hero 21st.dev (`componentry/hero-geometric`), dont l'idée tient
 * en deux couches : de larges arcs concentriques qui saignent de tous les
 * côtés, et une trame de points qui leur donne la texture d'un aplat imprimé
 * plutôt que celle d'un dégradé de synthèse. Trois écarts avec l'original :
 *
 * - Le fond d'origine est un shader WebGL. Ici c'est un SVG : la scène est déjà
 *   pilotée au défilement, ajouter un contexte de rendu pour un décor qui
 *   s'efface au premier tiers coûterait plus qu'il ne rapporte.
 * - Les arcs portent la triade de la marque, du bleu au rouge, au lieu du bleu
 *   monochrome de l'original. C'est le seul endroit du premier écran où la
 *   signature du logo apparaît. Le dégradé est délibérément déséquilibré : sur
 *   un papier crème, violet et rouge à faible opacité virent tous deux au rose,
 *   et un parcours régulier donne un champ rose uni au lieu d'un bleu qui rougit.
 *   Le bleu tient donc la première moitié et le rouge la seule extrémité.
 * - Les arcs s'éteignent au centre au lieu de le traverser. Deux raisons, et
 *   la seconde n'est pas cosmétique : le texte y garde le papier nu pour
 *   contraste, et le mot du voile y est un trou sur le panneau noir. Un décor
 *   posé par-dessus ce trou délave le noir en gris.
 *
 * Les opacités sont basses par obligation, pas par timidité : le texte gris de
 * la ligne de sens tient 7:1 sur le papier nu, et chaque point d'opacité posé
 * dessus en retire.
 */
export function HeroChamp() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Interpolé en oklch : en sRGB, un bleu qui rejoint un rouge passe
              par un gris boueux au milieu du parcours. */}
          {/* En coordonnées de la scène, et non de chaque forme : par défaut,
              chaque arc rejouerait le dégradé entier sur sa propre boîte, et
              les quatre anneaux viraient au rouge sur leur bord extérieur au
              lieu de composer un seul balayage en diagonale. */}
          <linearGradient
            id="champ-triade"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="1440"
            y2="900"
          >
            <stop offset="0%" stopColor="var(--blue)" />
            <stop offset="28%" stopColor="var(--blue)" />
            <stop offset="55%" stopColor="var(--violet)" />
            <stop offset="78%" stopColor="var(--red)" />
            <stop offset="100%" stopColor="var(--red)" />
          </linearGradient>

          {/* La trame. Un pas de 13 unités pour un point de 2,6 : assez serré
              pour lire comme une matière, assez lâche pour rester visible. */}
          <pattern id="champ-trame" width="13" height="13" patternUnits="userSpaceOnUse">
            <circle cx="6.5" cy="6.5" r="2.6" fill="var(--ink)" />
          </pattern>

          {/* Le fondu central, partagé par les arcs et la trame : au milieu de
              la fenêtre passent le texte et le trou du mot, tous deux à laisser
              nus. Le décor ne vit que sur les bords. */}
          <radialGradient id="champ-fondu" cx="50%" cy="46%" r="72%">
            <stop offset="0%" stopColor="black" />
            <stop offset="42%" stopColor="black" />
            <stop offset="100%" stopColor="white" />
          </radialGradient>
          <mask id="champ-masque">
            <rect width="1440" height="900" fill="url(#champ-fondu)" />
          </mask>
        </defs>

        {/* Les arcs. Centre posé hors cadre en bas à gauche : seule la portion
            qui traverse la fenêtre se voit, et elle la traverse en diagonale.
            Le masque porte sur le groupe extérieur et la dérive sur l'intérieur.
            Sur le même groupe, le masque suivrait le mouvement et le fondu
            central dériverait avec les arcs. */}
        <g mask="url(#champ-masque)">
          <g className="champ-derive" fill="none" stroke="url(#champ-triade)">
            <circle cx="-190" cy="1120" r="560" strokeWidth="150" opacity="0.62" />
            <circle cx="-190" cy="1120" r="800" strokeWidth="104" opacity="0.4" />
            <circle cx="-190" cy="1120" r="1030" strokeWidth="188" opacity="0.52" />
            <circle cx="-190" cy="1120" r="1320" strokeWidth="96" opacity="0.34" />
          </g>
        </g>

        <rect
          width="1440"
          height="900"
          fill="url(#champ-trame)"
          mask="url(#champ-masque)"
          opacity="0.09"
        />
      </svg>
    </div>
  );
}
