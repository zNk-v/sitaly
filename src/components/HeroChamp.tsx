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
              chaque forme rejouerait le dégradé entier sur sa propre boîte au
              lieu de composer un seul balayage.
              L'axe suit la diagonale des chevrons, du bas-gauche au
              haut-droite. Sur l'autre diagonale, les deux couples tombaient
              tous deux au milieu du parcours : ni bleu franc, ni rouge
              franc. */}
          <linearGradient
            id="champ-triade"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="900"
            x2="1440"
            y2="0"
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
          {/* Masque du portrait. L'ellipse ci-dessus protège le centre d'un
              écran large, où les chevrons vivent aux extrêmes gauche et droite.
              En portrait, la bande visible du dessin *est* ce centre : la même
              ellipse ramenait les chevrons à une opacité effective de 0,06 à
              0,18, mesurée — invisibles. Ici c'est une bande horizontale : le
              décor vit en haut et en bas, le texte occupe le milieu. */}
          <linearGradient id="champ-fondu-portrait" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="20%" stopColor="white" />
            <stop offset="36%" stopColor="black" />
            <stop offset="86%" stopColor="black" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <mask id="champ-masque-portrait">
            <rect width="1440" height="900" fill="url(#champ-fondu-portrait)" />
          </mask>
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
            le texte et le trou du mot.

            Deux couples seulement, en vis-à-vis sur la diagonale. Quatre
            couples répartis dans les quatre coins ne composaient rien : la
            diagonale donne une direction, et c'est celle du dégradé. */}
        <g mask="url(#champ-masque)">
          <g
            className="champ-derive champ-large"
            fill="none"
            stroke="url(#champ-triade)"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bas-gauche : le sommet est dans le cadre, le bras du bas sort
                par le bord inférieur. C'est donc le haut du couple qu'on voit.
                Il tombe sur l'extrémité bleue du dégradé. */}
            <path d="M -80 440 L 300 820 L -80 1200" strokeWidth="104" opacity="0.6" />
            <path d="M 155 440 L 535 820 L 155 1200" strokeWidth="104" opacity="0.6" />

            {/* Haut-droite, en vis-à-vis sur la diagonale : le bras du haut
                sort par le bord supérieur, c'est le bas du couple qu'on voit.
                Il tombe sur l'extrémité rouge. */}
            <path d="M 800 -290 L 1180 90 L 800 470" strokeWidth="92" opacity="0.46" />
            <path d="M 1035 -290 L 1415 90 L 1035 470" strokeWidth="92" opacity="0.46" />
          </g>
        </g>

        <g mask="url(#champ-masque-portrait)">
          {/* Jeu pour les écrans en portrait. La découpe `slice` n'y montre que
              la bande x 512..928 du dessin, mesurée : les couples ci-dessus,
              posés à x -80..535 et 800..1415, n'y laissaient voir que des
              queues de bras. Ceux-ci ont leurs sommets dans la bande. */}
          <g
            className="champ-derive champ-portrait"
            fill="none"
            stroke="url(#champ-triade)"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Haut : la seule zone vraiment libre en portrait, entre le
                bandeau et le nom. */}
            <path d="M 400 -70 L 620 150 L 400 370" strokeWidth="92" opacity="0.62" />
            <path d="M 570 -70 L 790 150 L 570 370" strokeWidth="92" opacity="0.62" />

            {/* Bas : sommets sous le cadre, seuls les bras du haut entrent,
                derrière le repère de défilement. */}
            <path d="M 430 760 L 630 960 L 430 1160" strokeWidth="80" opacity="0.5" />
            <path d="M 590 760 L 790 960 L 590 1160" strokeWidth="80" opacity="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
