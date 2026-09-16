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
 * Deux voiles, selon le format. Voir `monterPortrait` pour le téléphone.
 *
 * Repli. Sous `prefers-reduced-motion`, ou sur un écran trop bas, le voile
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
      est traversé par le trou du mot au lieu de passer par-dessus. Rendu deux
      fois (voile SVG et voile léger du portrait), d'où le suffixe
      d'identifiants. */
  fond?: (suffixe: string) => ReactNode;
  /** Ce qui accompagne le nom au premier plan, et s'efface en montant. */
  avant: ReactNode;
  /** La section révélée à travers le mot. */
  children: ReactNode;
}) {
  const scene = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    const conditions = matchMedia("(prefers-reduced-motion: no-preference)");
    const portrait = matchMedia("(max-aspect-ratio: 4 / 5)");
    let image = 0;
    let demonter: (() => void) | null = null;
    let generation = 0;

    /* Paysage : l'avancement est écrit en variables au défilement, et le CSS
       en déduit l'échelle du mot, le disque et les fondus. `animation-timeline`
       aurait fait ce travail sans script, mais elle n'existe pas avant
       Safari 26. */
    const ecrire = () => {
      image = 0;
      /* La référence de hauteur vient de la scène, pas de `window.innerHeight`,
         qui varie avec la barre d'URL d'iPhone au milieu de la course. */
      const course = parseFloat(getComputedStyle(el).getPropertyValue("--course")) || 1.95;
      const hauteur = el.offsetHeight / course;
      const y = -el.getBoundingClientRect().top;
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

    const brancher = () => {
      const version = ++generation;
      demonter?.();
      demonter = null;
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      if (!conditions.matches) return;

      if (portrait.matches) {
        /* La police doit être chargée avant la mesure du « t ». */
        document.fonts.ready.then(() => {
          if (version !== generation) return;
          demonter = monterPortrait(el);
        });
        return;
      }
      ecrire();
      window.addEventListener("scroll", planifier, { passive: true });
      window.addEventListener("resize", planifier, { passive: true });
    };

    brancher();
    conditions.addEventListener("change", brancher);
    portrait.addEventListener("change", brancher);
    return () => {
      generation++;
      conditions.removeEventListener("change", brancher);
      portrait.removeEventListener("change", brancher);
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      if (image) cancelAnimationFrame(image);
      demonter?.();
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
              unité SVG vaut un pixel CSS. */}
          <svg className="absolute inset-0 h-full w-full">
            <defs>
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
                {/* Le disque part du « t » et referme le trou quand le mot, en
                    paysage, n'y suffit plus. Centre et rayon posés en CSS. */}
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
            {/* Le voile et son décor sous le même masque : le trou découpe les
                chevrons comme il découpe le papier, et le nom passe devant. */}
            <g mask="url(#zoom-intro-mask)">
              <rect width="100%" height="100%" fill="var(--paper)" />
              {fond?.("voile")}
            </g>
          </svg>
        </div>

        {/* Le voile léger, pour les téléphones en portrait. Le masque SVG
            ci-dessus est recalculé sur le processeur à chaque image : sur un
            iPhone, le défilement saccade. Tant que le panneau est masqué, ce
            que le trou laisse voir est un aplat d'encre : un mot peint en encre
            sur le papier donne la même image, avec une seule transformation. */}
        <div className="zoom-cover-leger" aria-hidden="true">
          <div className="zoom-leger-champ">{fond?.("leger")}</div>
          <span className="zoom-leger-mot">{nom}</span>
        </div>

        {/* Couche du dessous : ce que le trou laisse voir. */}
        <div className="zoom-behind">{children}</div>
      </div>
    </section>
  );
}

/* ---- Portrait : plongée dans le « t » ------------------------------------

   Le zoom entre dans le fût du « t » jusqu'à ce qu'il couvre l'écran. Un
   disque noir a tenu ce rôle et se voyait pour ce qu'il était : une boule qui
   grossit, puis un rideau arrondi. Il compensait un calage approximatif : à
   l'échelle 30, un écart de 2 px devient 60 px, le zoom visait le papier à côté
   de la lettre, et ce blanc envahissait l'écran. Safari et Chrome ne placent
   pas les lettres à la même hauteur dans leur boîte ; un pourcentage relevé
   dans l'un tombait sous la ligne de base dans l'autre.

   Le fût est donc mesuré sur l'appareil : le « t » est dessiné dans un canevas
   avec la police chargée, et la plus longue série de rangées de même largeur
   donne le fût. Sa position dans la page vient d'une plage DOM sur la lettre
   et d'un repère posé sur la ligne de base. Rien n'est supposé.

   Le fût est étroit et haut, comme l'écran : une fois sa largeur agrandie à
   celle de la fenêtre, sa hauteur la couvre aussi. Pendant le zoom, il glisse
   vers le centre de l'écran, proportionnellement à l'agrandissement : le
   déplacement se fait quand la lettre déborde déjà, et il ne se voit pas.

   Pilotage. Là où le navigateur connaît `ViewTimeline` (Safari 26, Chrome), les
   animations sont attachées au défilement de la scène et tournent hors du fil
   principal. Ailleurs, les mêmes animations restent en pause et un écouteur
   règle leur position : il ne touche que quatre éléments, là où l'écriture de
   variables sur la scène recalculait les styles de tout le hero. */

/** Avancement de la plongée, en fractions de la hauteur de référence
    (hauteur de la scène divisée par --course). La course portrait vaut 1,4 :
    la scène reste collée sur 0,4 hauteur. */
const PORTRAIT = {
  tete: [0, 0.05],
  mot: [0.02, 0.3],
  panneau: [0.29, 0.35],
} as const;

type Fut = { x: number; y: number; largeur: number; hauteur: number; ox: number; oy: number };

/** Le fût du « t », en pixels : centre dans le repère du voile, dimensions, et
    origine du zoom dans le repère du mot. `null` si la mesure échoue. */
function mesurerFut(mot: HTMLElement, cadre: HTMLElement): Fut | null {
  const texte = mot.firstChild;
  if (!(texte instanceof Text)) return null;
  const rang = texte.data.indexOf("t");
  if (rang < 0) return null;
  const style = getComputedStyle(mot);
  const corps = parseFloat(style.fontSize);

  /* Canevas à quatre fois le corps, pour une mesure au quart de pixel. */
  const facteur = 4;
  const taille = corps * facteur;
  const canevas = document.createElement("canvas");
  canevas.width = Math.ceil(taille * 1.2);
  canevas.height = Math.ceil(taille * 1.4);
  const ctx = canevas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  const plume = taille * 0.2;
  const base = taille * 1.1;
  ctx.font = `${style.fontWeight} ${taille}px ${style.fontFamily}`;
  ctx.fillText("t", plume, base);
  const { data, width, height } = ctx.getImageData(0, 0, canevas.width, canevas.height);

  /* La barre du « t » est plus large que 0,3 corps, le fût non. */
  let meilleure = { debut: 0, fin: 0, g: 0, d: 0 };
  let serie: { debut: number; g: number; d: number } | null = null;
  for (let y = 0; y <= height; y++) {
    let g = -1;
    let d = -1;
    if (y < height) {
      for (let x = 0; x < width; x++) {
        if (data[(y * width + x) * 4 + 3] > 128) {
          if (g < 0) g = x;
          d = x;
        }
      }
    }
    const valide = g >= 0 && d - g < taille * 0.3;
    if (valide && serie && Math.abs(g - serie.g) <= 2 && Math.abs(d - serie.d) <= 2) continue;
    if (serie && y - serie.debut > meilleure.fin - meilleure.debut) {
      meilleure = { debut: serie.debut, fin: y, g: serie.g, d: serie.d };
    }
    serie = valide ? { debut: y, g, d } : null;
  }
  if (meilleure.fin - meilleure.debut < taille * 0.1) return null;

  /* Positions dans la page, sans transformation : le mot est remis à plat le
     temps de la mesure. */
  mot.style.translate = "none";
  mot.style.transform = "none";
  const repere = document.createElement("span");
  repere.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
  mot.appendChild(repere);
  const plage = document.createRange();
  plage.setStart(texte, rang);
  plage.setEnd(texte, rang + 1);
  const lettre = plage.getBoundingClientRect();
  const ligne = repere.getBoundingClientRect().top;
  const boite = mot.getBoundingClientRect();
  const voile = cadre.getBoundingClientRect();
  repere.remove();
  mot.style.translate = "";
  mot.style.transform = "";

  const centreX = lettre.left + ((meilleure.g + meilleure.d) / 2 - plume) / facteur;
  const centreY = ligne + ((meilleure.debut + meilleure.fin) / 2 - base) / facteur;
  /* Le mot est ensuite recentré par `translate: -50% -50%` : son repère local
     ne bouge pas, sa position à l'écran recule d'une demi-boîte. */
  return {
    x: centreX - voile.left - boite.width / 2,
    y: centreY - voile.top - boite.height / 2,
    largeur: (meilleure.d - meilleure.g) / facteur,
    hauteur: (meilleure.fin - meilleure.debut) / facteur,
    ox: centreX - boite.left,
    oy: centreY - boite.top,
  };
}

function monterPortrait(scene: HTMLElement): (() => void) | null {
  const devant = scene.querySelector<HTMLElement>(".zoom-front");
  const voile = scene.querySelector<HTMLElement>(".zoom-cover-leger");
  const mot = scene.querySelector<HTMLElement>(".zoom-leger-mot");
  const dessous = scene.querySelector<HTMLElement>(".zoom-behind");
  const contenu = scene.querySelector<HTMLElement>(".zoom-behind-content");
  if (!devant || !voile || !mot || !dessous || !contenu) return null;

  let animations: Animation[] = [];
  let image = 0;
  let largeurVue = window.innerWidth;
  const ViewTimelineCtor = (
    window as unknown as { ViewTimeline?: new (o: object) => AnimationTimeline }
  ).ViewTimeline;
  const defilement = ViewTimelineCtor ? new ViewTimelineCtor({ subject: scene }) : null;

  /* Avancement de la scène sur la plage `cover` : 0 quand son haut entre par
     le bas de la fenêtre, 1 quand son bas sort par le haut. C'est la plage par
     défaut d'une ViewTimeline, calculée ici pour le pilote de secours. */
  const couverture = () => {
    const vue = window.innerHeight;
    const y = -scene.getBoundingClientRect().top;
    return Math.min(1, Math.max(0, (vue + y) / (vue + scene.offsetHeight)));
  };

  const monter = () => {
    for (const a of animations) a.cancel();
    animations = [];
    /* Le voile n'est affiché qu'en mode effet : sinon, rien à animer, et une
       opacité posée sur la tête masquerait le hero du repli. */
    if (getComputedStyle(voile).display === "none") return;
    const fut = mesurerFut(mot, voile);
    if (!fut) {
      /* Sans mesure, pas de plongée : le voile est retiré et le hero se lit
         comme deux sections. */
      voile.style.display = "none";
      return;
    }

    const course = parseFloat(getComputedStyle(scene).getPropertyValue("--course")) || 1.4;
    const vue = window.innerHeight;
    const reference = scene.offsetHeight / course;
    const o = (f: number) => Math.min(1, (vue + f * reference) / (vue + scene.offsetHeight));

    const largeur = voile.clientWidth;
    const hauteur = voile.clientHeight;
    /* L'écran occupe 70 % du fût à la fin : la marge absorbe l'arrondi et le
       léger retard d'une image sur le défilement. */
    const echelleMax = Math.min(
      90,
      Math.max(largeur / (fut.largeur * 0.7), hauteur / (fut.hauteur * 0.7)),
    );
    /* Écart entre le fût et le centre de l'écran, que le zoom résorbe. Il est
       résorbé à 60 % de l'agrandissement : ensuite le fût est centré et
       l'écran se remplit sans qu'aucun bord ne passe. */
    const dx = largeur / 2 - fut.x;
    const dy = hauteur / 2 - fut.y;
    const echelleCentree = Math.max(2, echelleMax * 0.6);
    mot.style.transformOrigin = `${fut.ox}px ${fut.oy}px`;

    /* L'échelle croît en exponentielle : chaque cran de défilement multiplie
       la taille par le même facteur, ce que l'œil lit comme une vitesse
       constante. Un parcours linéaire paraît lent puis brutal. */
    const [motDebut, motFin] = PORTRAIT.mot;
    const pas = 18;
    const cadres: Keyframe[] = [{ offset: 0, transform: "translate(0px, 0px) scale(1)" }];
    for (let k = 0; k <= pas; k++) {
      const t = k / pas;
      const s = Math.pow(echelleMax, t);
      const g = Math.min(1, (s - 1) / (echelleCentree - 1));
      cadres.push({
        offset: o(motDebut + (motFin - motDebut) * t),
        transform: `translate(${dx * g}px, ${dy * g}px) scale(${s})`,
      });
    }
    cadres.push({ offset: 1, transform: cadres[cadres.length - 1].transform });

    const fin = o(motFin);
    const options: KeyframeAnimationOptions = defilement
      ? ({ timeline: defilement, fill: "both", easing: "linear" } as KeyframeAnimationOptions)
      : { duration: 1000, fill: "both", easing: "linear" };

    animations = [
      mot.animate(cadres, options),
      /* Le voile disparaît d'un coup quand le fût couvre l'écran : l'encre du
         mot et le fond du panneau sont alors la même surface. */
      voile.animate(
        [
          { offset: 0, opacity: 1 },
          { offset: fin, opacity: 1 },
          { offset: Math.min(1, fin + 0.001), opacity: 0 },
          { offset: 1, opacity: 0 },
        ],
        options,
      ),
      devant.animate(
        [
          { offset: 0, opacity: 1, transform: "translateY(0)" },
          { offset: o(PORTRAIT.tete[0]), opacity: 1, transform: "translateY(0)" },
          { offset: o(PORTRAIT.tete[1]), opacity: 0, transform: "translateY(-2.5rem)" },
          { offset: 1, opacity: 0, transform: "translateY(-2.5rem)" },
        ],
        options,
      ),
      /* Le panneau atteint sa pleine taille au moment où le voile s'en va :
         réduit, il laissait un liseré de papier sur les bords. */
      dessous.animate(
        [
          { offset: 0, transform: "scale(0.94)" },
          { offset: fin, transform: "scale(1)" },
          { offset: 1, transform: "scale(1)" },
        ],
        options,
      ),
      contenu.animate(
        [
          { offset: 0, opacity: 0 },
          { offset: o(PORTRAIT.panneau[0]), opacity: 0 },
          { offset: o(PORTRAIT.panneau[1]), opacity: 1 },
          { offset: 1, opacity: 1 },
        ],
        options,
      ),
    ];
    if (!defilement) {
      for (const a of animations) a.pause();
      piloter();
    }
  };

  const piloter = () => {
    image = 0;
    const t = couverture() * 1000;
    for (const a of animations) a.currentTime = t;
  };
  const planifier = () => {
    if (!image) image = requestAnimationFrame(piloter);
  };
  /* Seul un changement de largeur justifie une nouvelle mesure : sur iPhone,
     la barre d'URL change la hauteur à chaque sens de défilement. */
  const redimensionner = () => {
    if (window.innerWidth === largeurVue) return;
    largeurVue = window.innerWidth;
    monter();
  };

  monter();
  if (!defilement) window.addEventListener("scroll", planifier, { passive: true });
  window.addEventListener("resize", redimensionner, { passive: true });

  return () => {
    window.removeEventListener("scroll", planifier);
    window.removeEventListener("resize", redimensionner);
    if (image) cancelAnimationFrame(image);
    for (const a of animations) a.cancel();
    mot.style.transformOrigin = "";
    voile.style.display = "";
  };
}
