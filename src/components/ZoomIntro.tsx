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
    const conditions = matchMedia(
      "(prefers-reduced-motion: no-preference) and (min-height: 700px)",
    );
    let image = 0;

    const ecrire = () => {
      image = 0;
      const hauteur = window.innerHeight;
      const y = window.scrollY;
      /* Chaque course est exprimée en fractions de fenêtre, comme l'étaient les
         `animation-range` qu'elle remplace. */
      const part = (debut: number, fin: number) =>
        Math.min(1, Math.max(0, (y - debut * hauteur) / ((fin - debut) * hauteur)));
      el.style.setProperty("--p-tete", String(part(0, 0.1)));
      el.style.setProperty("--p-mot", String(part(0.08, 0.84)));
      el.style.setProperty("--p-panneau", String(part(0.3, 0.5)));
      el.style.setProperty("--p-remplir", String(part(0.5, 0.82)));
      el.style.setProperty("--p-approche", String(part(0, 0.88)));
    };

    const planifier = () => {
      if (!image) image = requestAnimationFrame(ecrire);
    };

    /* Hors conditions — mouvement réduit, écran trop bas — la scène est
       dépliée : écrire des variables que personne ne lit userait la batterie
       pour rien. */
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
    return () => {
      conditions.removeEventListener("change", brancher);
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
                {/* L'extension du noir. Un rectangle plus grand que la fenêtre,
                    réduit à rien au départ, qui grandit depuis le point même
                    d'où part le zoom : visuellement, c'est le noir du « t » qui
                    déborde et gagne la page. Il remplace une coupure sèche du
                    voile, qui sautait d'un coup sur les écrans larges où le
                    trou des lettres ne se referme jamais complètement. */}
                <rect
                  className="zoom-remplir"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                  fill="black"
                />
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
