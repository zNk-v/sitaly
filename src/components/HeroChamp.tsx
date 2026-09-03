/**
 * Le champ derrière le premier écran : les chevrons du logo, emboîtés.
 *
 * Adapté d'un hero 21st.dev (`componentry/hero-geometric`), dont l'idée tient
 * en deux couches : de larges arcs concentriques qui saignent de tous les
 * côtés. L'original y ajoute une trame de points ; elle a été retirée, elle
 * salissait le papier plus qu'elle ne lui donnait de la matière. Les arcs ont
 * ensuite cédé la place aux chevrons du logo : même rythme, forme de la
 * marque. Trois écarts avec l'original :
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

          {/* Le fondu central : au milieu de la fenêtre passent le texte et le
              trou du mot, tous deux à laisser nus. Le décor ne vit que sur les
              bords. */}
          <radialGradient id="champ-fondu" cx="50%" cy="46%" r="72%">
            <stop offset="0%" stopColor="black" />
            <stop offset="42%" stopColor="black" />
            <stop offset="100%" stopColor="white" />
          </radialGradient>
          <mask id="champ-masque">
            <rect width="1440" height="900" fill="url(#champ-fondu)" />
          </mask>
        </defs>

        {/* Les chevrons du logo, par couples. Ils remplacent des arcs
            concentriques : même principe de formes qui saignent des bords,
            mais la figure est celle de la marque.

            Deux tentatives ont échoué avant celle-ci, et les raisons méritent
            d'être gardées.

            Emboîtés aux rayons des arcs, ils étaient plus grands que la
            fenêtre : on n'en voyait que les bras et la forme ne se lisait
            plus. Puis posés par `transform`, ils sont tous devenus bleu pâle :
            un dégradé `userSpaceOnUse` se résout dans le repère courant, donc
            chaque groupe transformé rejouait le dégradé dans son propre
            espace au lieu de partager le balayage de la scène. Les sommets
            sont donc calculés en coordonnées absolues.

            Ils pointent à droite, comme dans le logo. Pivotés, un chevron à
            90° se lit comme un angle et non comme un chevron.

            Ils vivent près des bords : le masque éteint le centre, où passent
            le texte et le trou du mot. */}
        <g mask="url(#champ-masque)">
          <g
            className="champ-derive"
            fill="none"
            stroke="url(#champ-triade)"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bas-gauche, le plus présent, à l'extrémité bleue. */}
            <path d="M -30 575 L 300 905 L -30 1235" strokeWidth="96" opacity="0.58" />
            <path d="M 175 575 L 505 905 L 175 1235" strokeWidth="96" opacity="0.58" />

            {/* Gauche lointain, il saigne du bord. */}
            <path d="M -550 -130 L -120 300 L -550 730" strokeWidth="88" opacity="0.3" />
            <path d="M -285 -130 L 145 300 L -285 730" strokeWidth="88" opacity="0.3" />

            {/* Haut-droite. */}
            <path d="M 1145 -145 L 1395 105 L 1145 355" strokeWidth="74" opacity="0.42" />
            <path d="M 1300 -145 L 1550 105 L 1300 355" strokeWidth="74" opacity="0.42" />

            {/* Bas-droite, à l'extrémité rouge du dégradé. */}
            <path d="M 1070 660 L 1290 880 L 1070 1100" strokeWidth="66" opacity="0.46" />
            <path d="M 1210 660 L 1430 880 L 1210 1100" strokeWidth="66" opacity="0.46" />
          </g>
        </g>
      </svg>
    </div>
  );
}
