import { useEffect, useRef, type ReactNode } from "react";

/**
 * Ouverture au défilement : le nom grandit jusqu'à percer l'écran.
 *
 * Mécanique. Le nom n'est pas un texte posé sur un fond, c'est un **trou** dans
 * un voile couleur papier. Le voile couvre toute la fenêtre, le mot y est
 * découpé au masque SVG, et la section suivante vit dessous. Quand le mot
 * grandit, le trou grandit avec lui : on voit de plus en plus de ce qu'il y a
 * derrière, jusqu'à ce que les lettres débordent et que le voile disparaisse.
 *
 * L'échelle est pilotée par cinq variables que le composant met à jour au
 * défilement. `animation-timeline` aurait fait ce travail sans script, mais
 * elle n'existe pas avant Safari 26 : sur iPhone, aucun navigateur ne la
 * supporte, pas même Chrome, qui roule sur WebKit. Ces visiteurs ne voyaient
 * pas l'effet du tout.
 *
 * Repli. Sans `animation-timeline`, ou sous `prefers-reduced-motion`, le voile
 * n'est jamais rendu : la scène redevient deux sections l'une après l'autre.
 * C'est la seule façon sûre de faire, un voile bloqué à l'échelle 1 masquerait
 * définitivement la section suivante.
 */
export function ZoomIntro({
  nom,
  fond,
  avant,
  children,
}: {
  /** Le mot découpé dans le voile. */
  nom: string;
  /** Le décor du voile, posé sous le même masque que lui : ce qui s'y trouve
      est traversé par le trou du mot au lieu de passer par-dessus. */
  fond?: ReactNode;
  /** Ce qui accompagne le nom au premier plan, et s'efface en montant. */
  avant: ReactNode;
  /** La section révélée à travers le mot. */
  children: ReactNode;
}) {
  const scene = useRef<HTMLElement>(null);

  /* L'avancement de l'ouverture, écrit au défilement.
     `animation-timeline` aurait fait ce travail sans script, mais elle n'existe
     pas avant Safari 26 — donc sur aucun navigateur d'iPhone, Chrome compris,
     qui roule sur WebKit. Ces visiteurs ne voyaient pas l'effet du tout.
     L'écriture est calée sur le rafraîchissement et l'écoute est passive : le
     fil principal ne porte que le calcul des cinq fractions, les
     transformations restent composées par le GPU. */
  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    /* La condition ne porte que sur le mouvement réduit, jamais sur la taille.
       Elle a un temps repris le seuil de hauteur du CSS, et les deux ont
       divergé : le CSS a rendu ce seuil dépendant de la largeur, pas le
       script. Sur un téléphone, la mise en page passait donc en mode effet
       pendant que le script refusait de la piloter — le panneau restait à
       l'opacité 0 et l'on traversait deux écrans de vide.

       Écrire cinq variables que le CSS n'utilise pas ne coûte rien. Les faire
       manquer coûte la page. */
    const conditions = matchMedia("(prefers-reduced-motion: no-preference)");
    /* Le format commande le moment où le panneau se découvre. Voir plus bas. */
    const portrait = matchMedia("(max-aspect-ratio: 4 / 5)");
    let image = 0;

    const ecrire = () => {
      image = 0;
      /* La référence de hauteur vient de la scène, pas de `window.innerHeight`.
         Sur iPhone, la barre d'URL se rétracte au défilement et `innerHeight`
         grandit de 60 à 90 px au milieu de la course : toutes les fractions se
         recalculaient sur une autre échelle et l'ouverture sautait en arrière.
         La scène fait 195vh, posés à la mise en page et stables ensuite ; la
         diviser redonne la hauteur d'écran contre laquelle les seuils sont
         écrits. */
      const course = parseFloat(getComputedStyle(el).getPropertyValue("--course")) || 1.95;
      const hauteur = el.offsetHeight / course;
      /* Et l'avancement se mesure depuis le haut de la scène plutôt que depuis
         le haut du document : le résultat ne dépend plus de ce qui la précède. */
      const y = -el.getBoundingClientRect().top;
      /* Chaque course est exprimée en fractions de fenêtre, comme l'étaient les
         `animation-range` qu'elle remplace. */
      const part = (debut: number, fin: number) =>
        Math.min(1, Math.max(0, (y - debut * hauteur) / ((fin - debut) * hauteur)));

      /* Deux plages dépendent du format, et elles se tiennent.

         Le panneau ne peut se découvrir qu'une fois le trou refermé sur toute
         la fenêtre, sinon on le lit en morceaux répartis entre les lettres.
         L'échelle qui referme le trou vaut environ 21 en paysage et 27 en
         portrait, où le mot est haut et étroit : rapportées à la course du mot,
         0,55 et 0,67 d'avancement.

         En portrait, faire porter la couverture par le mot ne marche pas. À
         grande échelle, ce qu'on voit de l'écran est un tout petit voisinage du
         point d'origine ; s'il tombe dans un blanc entre deux jambages, l'écran
         devient entièrement blanc. C'est ce qu'a montré un enregistrement sur
         iPhone : le mot sortait par le haut et laissait deux secondes de page
         vide avant que le noir n'arrive.

         Le disque, lui, couvre depuis n'importe quel point intérieur. En
         portrait il prend donc l'essentiel du travail : il part tôt, le mot
         grossit moins (voir --facteur-zoom), et il n'existe plus d'instant où
         l'écran ne montre rien. */
      const [remplirDebut, remplirFin] = portrait.matches ? [0.22, 0.52] : [0.5, 0.82];
      const [panneauDebut, panneauFin] = portrait.matches ? [0.44, 0.62] : [0.3, 0.5];

      el.style.setProperty("--p-tete", String(part(0, 0.1)));
      el.style.setProperty("--p-mot", String(part(0.08, 0.84)));
      el.style.setProperty("--p-panneau", String(part(panneauDebut, panneauFin)));
      el.style.setProperty("--p-remplir", String(part(remplirDebut, remplirFin)));
      el.style.setProperty("--p-approche", String(part(0, 0.88)));
    };

    const planifier = () => {
      if (!image) image = requestAnimationFrame(ecrire);
    };

    /* Sous mouvement réduit la scène est dépliée pour de bon : le script se
       tait, ce qui est le seul cas où son travail serait inutile. */
    const brancher = () => {
      if (conditions.matches) {
        ecrire();
        window.addEventListener("scroll", planifier, { passive: true });
        window.addEventListener("resize", planifier, { passive: true });
      } else {
        window.removeEventListener("scroll", planifier);
        window.removeEventListener("resize", planifier);
      }
    };

    brancher();
    conditions.addEventListener("change", brancher);
    /* Une rotation change le format, donc la plage du panneau. */
    portrait.addEventListener("change", planifier);
    return () => {
      conditions.removeEventListener("change", brancher);
      portrait.removeEventListener("change", planifier);
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      if (image) cancelAnimationFrame(image);
    };
  }, []);

  return (
    /* Le bandeau et le pied de page renvoient vers #top : l'ancre vit ici. */
    <section id="top" ref={scene} className="zoom-stage">
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
                {/* L'extension du noir. Un disque, réduit à rien au départ, qui
                    grandit depuis le point même d'où part le zoom : c'est le
                    noir du « t » qui déborde et gagne la page.

                    Un rectangle a tenu ce rôle et se voyait pour ce qu'il
                    était : sur un téléphone, où il fait l'essentiel du travail,
                    on regardait un rectangle à angles vifs grandir au milieu du
                    blanc. Le disque n'a pas d'angle, donc rien à reconnaître.

                    Son centre et son rayon sont posés en CSS : `cx`, `cy` et `r`
                    sont des propriétés de géométrie, et il faut le calcul pour
                    les accrocher au même point que le zoom du mot. */}
                <circle className="zoom-remplir" fill="black" />
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
            {/* Le voile et son décor sous le même masque. Les chevrons étaient
                posés au premier plan, donc au-dessus du trou : ils traversaient
                le mot au lieu de passer derrière. Ici, le trou les découpe
                comme il découpe le papier, et le nom passe devant.

                Le `svg` imbriqué porte son propre `viewBox` : le décor est
                dessiné dans un repère de 1440x900 alors que le voile travaille
                en pixels, et un `svg` dans un `svg` est justement ce qui permet
                aux deux de coexister sous un même masque. */}
            <g mask="url(#zoom-intro-mask)">
              <rect width="100%" height="100%" fill="var(--paper)" />
              {fond}
            </g>
          </svg>
        </div>

        {/* Couche du dessous : ce que le trou laisse voir. */}
        <div className="zoom-behind">{children}</div>
      </div>
    </section>
  );
}
