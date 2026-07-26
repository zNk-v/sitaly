/* Moteur d'animation du canvas workflow — vanilla JS, zéro dépendance.
   Fait glisser un "pulse" lumineux le long des connexions (edges), allume
   chaque node à l'arrivée du pulse, puis boucle avec une pause douce.
   Tout passe par transform/opacity + classes CSS : aucun reflow. */

export type FlowEngine = { stop: () => void };

const HOLD = 280; // pause sur un node entre deux trajets
const LIT = 950; // durée d'allumage d'un node (ms)
const END_PAUSE = 1600; // respiration en fin de cycle

/* Accélération douce (smoothstep) pour le déplacement du pulse */
function ease(t: number): number {
  return t * t * (3 - 2 * t);
}

export function startFlowEngine(svg: SVGSVGElement, startDelay = 0): FlowEngine {
  // Accessibilité : pas de pulse si l'utilisateur préfère réduire les animations.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { stop() {} };
  }

  const byOrder = (a: SVGElement, b: SVGElement) =>
    Number(a.dataset.order) - Number(b.dataset.order);
  const edges = Array.from(svg.querySelectorAll<SVGPathElement>("[data-flow-edge]")).sort(byOrder);
  const nodes = Array.from(svg.querySelectorAll<SVGGElement>("[data-flow-node]")).sort(byOrder);
  const pulseEl = svg.querySelector<SVGGElement>("[data-flow-pulse]");
  if (!edges.length || !pulseEl) return { stop() {} };
  // Alias non-nullable : le narrowing de `pulseEl` ne suit pas dans les closures ci-dessous.
  const pulse: SVGGElement = pulseEl;

  // Timeline : durée de trajet proportionnelle à la longueur de chaque edge.
  const segs = edges.map((el) => {
    const len = el.getTotalLength();
    return { el, len, dur: Math.min(800, Math.max(380, len * 1.3)) };
  });
  const starts: number[] = [];
  let acc = 0;
  for (const s of segs) {
    starts.push(acc);
    acc += s.dur + HOLD;
  }
  const total = acc + END_PAUSE;
  const agentIdx = nodes.findIndex((n) => n.dataset.agent === "1");

  let raf = 0;
  const t0 = performance.now() + startDelay;

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const t = now - t0;
    if (t < 0) return; // on attend la fin de l'animation d'entrée
    const tc = t % total;

    // Position du pulse sur l'edge en cours de trajet
    let px: number | null = null;
    let py = 0;
    let activeEdge = -1;
    for (let i = 0; i < segs.length; i++) {
      const local = tc - starts[i];
      if (local >= 0 && local <= segs[i].dur) {
        activeEdge = i;
        const p = segs[i].el.getPointAtLength(ease(local / segs[i].dur) * segs[i].len);
        px = p.x;
        py = p.y;
        break;
      }
    }

    edges.forEach((e, i) => e.classList.toggle("wfc-active", i === activeEdge));

    // Node 0 allumé au départ du cycle, node i+1 allumé à l'arrivée du pulse.
    nodes.forEach((n, i) => {
      const litStart = i === 0 ? 0 : starts[i - 1] + segs[i - 1].dur;
      const lit = i <= segs.length && tc >= litStart && tc <= litStart + LIT;
      n.classList.toggle("wfc-lit", lit);
      // Quand l'Agent IA s'allume, ses liens pointillés vers les sub-nodes pulsent.
      if (i === agentIdx) svg.classList.toggle("wfc-sublit", lit);
    });

    if (px !== null) {
      pulse.setAttribute("transform", `translate(${px} ${py})`);
      pulse.setAttribute("opacity", "1");
    } else {
      pulse.setAttribute("opacity", "0");
    }
  }

  raf = requestAnimationFrame(frame);

  return {
    stop() {
      cancelAnimationFrame(raf);
      edges.forEach((e) => e.classList.remove("wfc-active"));
      nodes.forEach((n) => n.classList.remove("wfc-lit"));
      svg.classList.remove("wfc-sublit");
      pulse.setAttribute("opacity", "0");
    },
  };
}
