import { useEffect, useRef, useState, type ReactNode } from "react";

/* --------------------------------------------------------------------------
 * Schéma de workflow de la page Agents IA.
 *
 * Le schéma est dessiné, pas illustré : les positions, les courbes de Bézier
 * et les ports sont calculés à partir de la liste de nœuds. Ajouter une étape
 * à un scénario suffit, la mise en page suit. Deux dispositions existent —
 * horizontale au-delà de 768 px, verticale en dessous — parce qu'une frise de
 * six nœuds côte à côte devient illisible sur un téléphone.
 *
 * Les classes .wfc-* vivent dans styles.css : leur géométrie ne s'exprime pas
 * en utilitaires Tailwind.
 * ----------------------------------------------------------------------- */

export type WorkflowNode = {
  title: string;
  subtitle: string;
  icon: string;
  color?: string;
  /** "trigger" = point d'entrée (bord gauche arrondi), "agent" = nœud central. */
  kind?: "trigger" | "agent";
};

export type Workflow = {
  id: string;
  tab: string;
  offer: string;
  blurb: string;
  nodes: WorkflowNode[];
  /** Briques rattachées à l'agent : modèle, mémoire, outils. */
  subs: readonly WorkflowNode[];
};

type PlacedNode = WorkflowNode & {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  lines: string[];
};

type PlacedSub = WorkflowNode & { cx: number; y: number };

type Layout = {
  vb: { w: number; h: number };
  nodes: PlacedNode[];
  subs: PlacedSub[];
  edges: string[];
  sublinks: string[];
  ports: { x: number; y: number }[];
};

/** Cadence de l'animation du flux, en millisecondes. */
const EDGE_GAP = 280;
const LIT_DURATION = 950;
const CYCLE_TAIL = 1600;

const ICON_BOX = 34;
const SUB_BOX = 38;

/** Coupe un titre en deux lignes au dernier mot qui tient dans la largeur. */
function wrapTitle(text: string, max: number): string[] {
  if (text.length <= max) return [text];
  const words = text.split(" ");
  let head = "";
  for (const w of words) {
    const next = `${head} ${w}`.trim();
    if (next.length > max) break;
    head = next;
  }
  if (!head) head = words[0];
  return [head, text.slice(head.length).trim()];
}

/** Boîte de déclenchement : bord gauche en demi-cercle, bord droit arrondi. */
function triggerPath(x: number, y: number, w: number, h: number): string {
  const r = h / 2;
  return [
    `M ${x + r} ${y}`,
    `L ${x + w - 8} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + 8}`,
    `L ${x + w} ${y + h - 8}`,
    `Q ${x + w} ${y + h} ${x + w - 8} ${y + h}`,
    `L ${x + r} ${y + h}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    `Z`,
  ].join(" ");
}

/**
 * Disposition horizontale. Les nœuds sont décalés verticalement selon une
 * séquence fixe : une frise parfaitement alignée ressemble à un diagramme
 * d'architecture, le léger désaxement lui donne l'allure d'un vrai canevas.
 */
function layoutHorizontal(wf: Workflow): Layout {
  const VB_W = 1240;
  const OFFSETS = [0, -12, 10, -8, 12, -4, 8];
  const widths = wf.nodes.map((n) => (n.kind === "agent" ? 206 : 174));
  const total = widths.reduce((a, b) => a + b, 0);
  const gap = (VB_W - 36 - total) / (wf.nodes.length - 1);

  let x = 18;
  const nodes: PlacedNode[] = wf.nodes.map((n, i) => {
    const w = widths[i];
    const h = n.kind === "agent" ? 72 : 62;
    const cy = 80 + OFFSETS[i % OFFSETS.length];
    const placed: PlacedNode = {
      ...n,
      x,
      y: cy - h / 2,
      w,
      h,
      cx: x + w / 2,
      cy,
      lines: wrapTitle(n.title, n.kind === "agent" ? 22 : 16),
    };
    x += w + gap;
    return placed;
  });

  const agent = nodes.find((n) => n.kind === "agent")!;
  const subsY = agent.y + agent.h + 46;
  const subs: PlacedSub[] = wf.subs.map((s, i) => ({
    ...s,
    cx: agent.cx + (i - (wf.subs.length - 1) / 2) * 132,
    y: subsY,
  }));

  const edges: string[] = [];
  const ports: { x: number; y: number }[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const from = nodes[i];
    const to = nodes[i + 1];
    const fx = from.x + from.w;
    const bend = Math.max(26, (to.x - fx) * 0.55);
    edges.push(
      `M ${fx} ${from.cy} C ${fx + bend} ${from.cy}, ${to.x - bend} ${to.cy}, ${to.x} ${to.cy}`,
    );
    ports.push({ x: fx, y: from.cy }, { x: to.x, y: to.cy });
  }

  const sublinks = subs.map((s, i) => {
    const x0 = agent.x + agent.w * ((i + 1) / (subs.length + 1));
    const y0 = agent.y + agent.h;
    ports.push({ x: x0, y: y0 });
    return `M ${x0} ${y0} C ${x0} ${y0 + 22}, ${s.cx} ${s.y - 20}, ${s.cx} ${s.y}`;
  });

  return { vb: { w: VB_W, h: subsY + 40 + 42 }, nodes, subs, edges, sublinks, ports };
}

/** Disposition verticale (mobile) : une colonne, les branches sortent par la gauche. */
function layoutVertical(wf: Workflow): Layout {
  const VB_W = 340;
  let y = 12;
  const nodes: PlacedNode[] = wf.nodes.map((n) => {
    const h = n.kind === "agent" ? 72 : 62;
    const placed: PlacedNode = {
      ...n,
      x: 38,
      y,
      w: 264,
      h,
      cx: VB_W / 2,
      cy: y + h / 2,
      lines: wrapTitle(n.title, 28),
    };
    y += h + 46;
    // L'agent réserve la place de ses briques rattachées, dessinées dessous.
    if (n.kind === "agent") y += 118;
    return placed;
  });

  const agent = nodes.find((n) => n.kind === "agent")!;
  const subsY = agent.y + agent.h + 34;
  const subs: PlacedSub[] = wf.subs.map((s, i) => ({
    ...s,
    cx: agent.cx + (i - (wf.subs.length - 1) / 2) * 96,
    y: subsY,
  }));

  const edges: string[] = [];
  const ports: { x: number; y: number }[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const from = nodes[i];
    const to = nodes[i + 1];
    if (from.kind === "agent") {
      // On contourne les briques rattachées par la gauche.
      const x0 = from.x;
      edges.push(
        `M ${x0} ${from.cy} C ${x0 - 34} ${from.cy + 50}, ${from.x - 34} ${to.y - 50}, ${to.cx} ${to.y}`,
      );
      ports.push({ x: x0, y: from.cy }, { x: to.cx, y: to.y });
    } else {
      const bend = i % 2 === 0 ? 22 : -22;
      const y0 = from.y + from.h;
      edges.push(
        `M ${from.cx} ${y0} C ${from.cx + bend} ${y0 + 18}, ${to.cx + bend} ${to.y - 18}, ${to.cx} ${to.y}`,
      );
      ports.push({ x: from.cx, y: y0 }, { x: to.cx, y: to.y });
    }
  }

  const sublinks = subs.map((s, i) => {
    const x0 = agent.x + agent.w * ((i + 1) / (subs.length + 1));
    const y0 = agent.y + agent.h;
    ports.push({ x: x0, y: y0 });
    return `M ${x0} ${y0} C ${x0} ${y0 + 16}, ${s.cx} ${s.y - 14}, ${s.cx} ${s.y}`;
  });

  return { vb: { w: VB_W, h: y - 46 + 14 }, nodes, subs, edges, sublinks, ports };
}

const CHART_ICONS: Record<string, ReactNode> = {
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  phoneMissed: (
    <>
      <path d="M15.5 3.5 21 9M21 3.5 15.5 9" />
      <path d="M20 16.92v2a2 2 0 0 1-2.18 2 17.8 17.8 0 0 1-7.77-2.76 17.5 17.5 0 0 1-5.4-5.4A17.8 17.8 0 0 1 1.9 5.18 2 2 0 0 1 3.9 3h2a2 2 0 0 1 2 1.72c.11.86.32 1.7.63 2.53a2 2 0 0 1-.45 2.11l-1 1a14.4 14.4 0 0 0 5.4 5.4l1-1a2 2 0 0 1 2.11-.45c.83.31 1.67.52 2.53.63a2 2 0 0 1 1.72 2z" />
    </>
  ),
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  bot: (
    <>
      <path d="M12 8V5M10 3.5h4" />
      <rect x="4" y="8" width="16" height="11" rx="2.5" />
      <path d="M9 13v1.5M15 13v1.5" />
    </>
  ),
  message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  star: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </>
  ),
  spark: <path d="M12 4v16M5 8l14 8M19 8 5 16" />,
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  branch: (
    <>
      <path d="M3 12h5c3 0 4-1.4 6-3.6L16.5 6M3 12h5c3 0 4 1.4 6 3.6l2.5 2.4" />
      <path d="M15 4.5h4v4M15 19.5h4v-4" />
    </>
  ),
  send: <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />,
  wave: <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />,
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </>
  ),
  pen: <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />,
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
};

const SHARED_SUBS = {
  chatModel: { title: "Chat Model", subtitle: "Modèle IA", icon: "spark", color: "#d97757" },
  memory: { title: "Memory", subtitle: "Historique client", icon: "database", color: "#3ecf8e" },
  tools: { title: "Tools", subtitle: "Agenda & outils", icon: "wrench", color: "#5b7bd5" },
} as const;

export const WORKFLOWS: Workflow[] = [
  {
    id: "receptionniste",
    tab: "Réceptionniste vocal 24/7",
    offer: "Offre Performance",
    blurb:
      "Un client appelle pendant que vous êtes en rendez-vous ou en intervention : l'agent décroche, répond, cale le rendez-vous et vous prévient par SMS.",
    nodes: [
      {
        title: "Appel entrant",
        subtitle: "Ligne dédiée 24/7",
        icon: "phone",
        color: "#e2574c",
        kind: "trigger",
      },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", kind: "agent" },
      { title: "Décision", subtitle: "Selon la demande", icon: "branch", color: "#3aa7b8" },
      { title: "Réponse vocale", subtitle: "Voix naturelle", icon: "wave", color: "#14b8a6" },
      { title: "Prise de RDV", subtitle: "Agenda synchronisé", icon: "calendar", color: "#5b7bd5" },
      {
        title: "SMS à l'équipe",
        subtitle: "Notification instantanée",
        icon: "message",
        color: "#e2574c",
      },
    ],
    subs: [SHARED_SUBS.chatModel, SHARED_SUBS.memory, SHARED_SUBS.tools],
  },
  {
    id: "relance-devis",
    tab: "Relance devis & propositions",
    offer: "Offre Acquisition",
    blurb:
      "48 h après un devis ou une proposition restée sans réponse, l'agent rédige une relance personnalisée, l'envoie et la consigne dans votre CRM.",
    nodes: [
      {
        title: "Devis ou proposition",
        subtitle: "Déclencheur automatique",
        icon: "bolt",
        color: "#6d7cff",
        kind: "trigger",
      },
      { title: "Attente 48 h", subtitle: "Minuteur", icon: "clock", color: "#8a8f9d" },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", kind: "agent" },
      { title: "Message personnalisé", subtitle: "Rédigé par l'IA", icon: "pen", color: "#d97757" },
      { title: "Envoi SMS / Email", subtitle: "Au bon moment", icon: "mail", color: "#5b8def" },
      {
        title: "Suivi dans le CRM",
        subtitle: "Fiche client à jour",
        icon: "doc",
        color: "#b3aca2",
      },
    ],
    subs: [SHARED_SUBS.chatModel, SHARED_SUBS.memory],
  },
  {
    id: "avis-google",
    tab: "Avis Google",
    offer: "Offre Visibilité",
    blurb:
      "À chaque avis reçu, l'agent rédige une réponse adaptée au ton du client, la publie et vous alerte si l'avis est négatif.",
    nodes: [
      {
        title: "Nouvel avis Google",
        subtitle: "Veille automatique",
        icon: "star",
        color: "#f5b301",
        kind: "trigger",
      },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", kind: "agent" },
      { title: "Réponse sur mesure", subtitle: "Adaptée au ton", icon: "pen", color: "#d97757" },
      { title: "Publication", subtitle: "Réponse en ligne", icon: "send", color: "#4285f4" },
      { title: "Alerte avis négatif", subtitle: "SMS immédiat", icon: "message", color: "#e2574c" },
    ],
    subs: [SHARED_SUBS.chatModel],
  },
  {
    id: "appel-manque",
    tab: "SMS appel manqué",
    offer: "En option",
    blurb:
      "Un appel vous échappe ? Le prospect reçoit un SMS immédiat avec une proposition de créneau, et vous êtes prévenu dans la foulée.",
    nodes: [
      {
        title: "Appel manqué",
        subtitle: "Détection instantanée",
        icon: "phoneMissed",
        color: "#e2574c",
        kind: "trigger",
      },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", kind: "agent" },
      { title: "SMS immédiat", subtitle: "Envoyé au prospect", icon: "message", color: "#e2574c" },
      {
        title: "Créneau proposé",
        subtitle: "Agenda synchronisé",
        icon: "calendar",
        color: "#5b7bd5",
      },
      { title: "Équipe prévenue", subtitle: "Notification SMS", icon: "bell", color: "#f0a63a" },
    ],
    subs: [SHARED_SUBS.chatModel],
  },
  {
    id: "whatsapp",
    tab: "Agent WhatsApp",
    offer: "En option",
    blurb:
      "Un client écrit sur votre WhatsApp professionnel : l'agent répond dans la conversation, qualifie la demande, propose un créneau et passe la main à votre équipe avec l'historique.",
    nodes: [
      {
        title: "Message WhatsApp",
        subtitle: "Numéro professionnel",
        icon: "message",
        color: "#25d366",
        kind: "trigger",
      },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", kind: "agent" },
      {
        title: "Réponse instantanée",
        subtitle: "Dans la conversation",
        icon: "send",
        color: "#14b8a6",
      },
      { title: "Prise de RDV", subtitle: "Agenda synchronisé", icon: "calendar", color: "#5b7bd5" },
      {
        title: "Passage à l'équipe",
        subtitle: "Historique complet",
        icon: "branch",
        color: "#f0a63a",
      },
    ],
    subs: [SHARED_SUBS.chatModel, SHARED_SUBS.memory],
  },
  {
    id: "suivi-commande",
    tab: "Suivi de commande",
    offer: "En option",
    blurb:
      "Un client demande où en est sa commande : l'agent retrouve le dossier, répond avec le statut réel et n'appelle un humain qu'en cas de litige.",
    nodes: [
      {
        title: "Message client",
        subtitle: "WhatsApp, e-mail ou chat",
        icon: "mail",
        color: "#5b8def",
        kind: "trigger",
      },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", kind: "agent" },
      {
        title: "Recherche du dossier",
        subtitle: "Commande et livraison",
        icon: "database",
        color: "#3ecf8e",
      },
      {
        title: "Réponse envoyée",
        subtitle: "Statut et prochaine étape",
        icon: "send",
        color: "#14b8a6",
      },
      { title: "Litige au support", subtitle: "Reprise humaine", icon: "branch", color: "#e2574c" },
    ],
    subs: [SHARED_SUBS.chatModel, SHARED_SUBS.memory, SHARED_SUBS.tools],
  },
];

/**
 * Fait courir une impulsion le long des arêtes, allume chaque nœud à son tour
 * et boucle. Rien ne s'anime si le visiteur a demandé moins de mouvement.
 * Retourne un objet dont `stop()` remet le schéma à l'état neutre.
 */
function runFlow(svg: SVGSVGElement, delay = 0) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { stop() {} };
  }
  const byOrder = (a: Element, b: Element) =>
    Number((a as HTMLElement).dataset.order) - Number((b as HTMLElement).dataset.order);
  const edges = Array.from(svg.querySelectorAll<SVGPathElement>("[data-flow-edge]")).sort(byOrder);
  const nodes = Array.from(svg.querySelectorAll<SVGGElement>("[data-flow-node]")).sort(byOrder);
  const pulse = svg.querySelector<SVGGElement>("[data-flow-pulse]");
  if (!edges.length || !pulse) return { stop() {} };

  // Une arête longue met plus longtemps à être parcourue, dans des bornes
  // lisibles : en dessous de 380 ms l'œil ne suit pas, au-delà de 800 ms ça traîne.
  const timeline = edges.map((el) => {
    const len = el.getTotalLength();
    return { el, len, dur: Math.min(800, Math.max(380, len * 1.3)) };
  });
  const starts: number[] = [];
  let cursor = 0;
  for (const step of timeline) {
    starts.push(cursor);
    cursor += step.dur + EDGE_GAP;
  }
  const cycle = cursor + CYCLE_TAIL;
  const agentIndex = nodes.findIndex((n) => n.dataset.agent === "1");

  let frame = 0;
  const startedAt = performance.now() + delay;
  const smoothstep = (t: number) => t * t * (3 - 2 * t);

  function tick(now: number) {
    frame = requestAnimationFrame(tick);
    const elapsed = now - startedAt;
    if (elapsed < 0) return;
    const t = elapsed % cycle;

    let px: number | null = null;
    let py = 0;
    let activeEdge = -1;
    for (let i = 0; i < timeline.length; i++) {
      const local = t - starts[i];
      if (local >= 0 && local <= timeline[i].dur) {
        activeEdge = i;
        const p = timeline[i].el.getPointAtLength(
          smoothstep(local / timeline[i].dur) * timeline[i].len,
        );
        px = p.x;
        py = p.y;
        break;
      }
    }

    edges.forEach((el, i) => el.classList.toggle("wfc-active", i === activeEdge));
    nodes.forEach((el, i) => {
      const from = i === 0 ? 0 : starts[i - 1] + timeline[i - 1].dur;
      const lit = i <= timeline.length && t >= from && t <= from + LIT_DURATION;
      el.classList.toggle("wfc-lit", lit);
      if (i === agentIndex) svg.classList.toggle("wfc-sublit", lit);
    });

    if (px === null) {
      pulse.setAttribute("opacity", "0");
    } else {
      pulse.setAttribute("transform", `translate(${px} ${py})`);
      pulse.setAttribute("opacity", "1");
    }
  }

  frame = requestAnimationFrame(tick);
  return {
    stop() {
      cancelAnimationFrame(frame);
      edges.forEach((el) => el.classList.remove("wfc-active"));
      nodes.forEach((el) => el.classList.remove("wfc-lit"));
      svg.classList.remove("wfc-sublit");
      pulse.setAttribute("opacity", "0");
    },
  };
}

function ChartIcon({
  icon,
  color,
  x,
  y,
  size,
}: {
  icon: string;
  color?: string;
  x: number;
  y: number;
  size: number;
}) {
  const glyph = size * 0.6;
  const pad = (size - glyph) / 2;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={8} fill={color || "var(--accent)"} />
      <g
        transform={`translate(${x + pad} ${y + pad}) scale(${glyph / 24})`}
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {CHART_ICONS[icon]}
      </g>
    </g>
  );
}

function ChartNode({ node, order }: { node: PlacedNode; order: number }) {
  const isTrigger = node.kind === "trigger";
  const isAgent = node.kind === "agent";
  const iconX = node.x + (isTrigger ? 20 : 13);
  const textX = iconX + ICON_BOX + 11;
  const twoLines = node.lines.length > 1;

  return (
    <g
      className={`wfc-node${isAgent ? " wfc-node--agent" : ""}`}
      data-flow-node
      data-order={order}
      data-agent={isAgent ? "1" : undefined}
      style={{ "--d": `${order * 120}ms` } as React.CSSProperties}
    >
      {isTrigger ? (
        <path className="wfc-node-box" d={triggerPath(node.x, node.y, node.w, node.h)} />
      ) : (
        <rect
          className="wfc-node-box"
          x={node.x}
          y={node.y}
          width={node.w}
          height={node.h}
          rx={8}
        />
      )}
      <ChartIcon
        icon={node.icon}
        color={node.color}
        x={iconX}
        y={node.cy - ICON_BOX / 2}
        size={ICON_BOX}
      />
      {twoLines ? (
        <>
          <text className="wfc-title" x={textX} y={node.cy - 8}>
            {node.lines[0]}
          </text>
          <text className="wfc-title" x={textX} y={node.cy + 6}>
            {node.lines[1]}
          </text>
          <text className="wfc-sub" x={textX} y={node.cy + 21}>
            {node.subtitle}
          </text>
        </>
      ) : (
        <>
          <text className="wfc-title" x={textX} y={node.cy - 2}>
            {node.lines[0]}
          </text>
          <text className="wfc-sub" x={textX} y={node.cy + 15}>
            {node.subtitle}
          </text>
        </>
      )}
    </g>
  );
}

export function WorkflowChart() {
  const [current, setCurrent] = useState(0);
  const [vertical, setVertical] = useState(false);
  const [seen, setSeen] = useState(false);
  const [visible, setVisible] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const workflow = WORKFLOWS[current];
  const layout = vertical ? layoutVertical(workflow) : layoutHorizontal(workflow);
  const agentIndex = workflow.nodes.findIndex((n) => n.kind === "agent");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setVertical(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // L'animation ne tourne que quand le schéma est à l'écran : inutile de faire
  // travailler le processeur d'un téléphone pour une section qu'on a dépassée.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
        setVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !seen) return;
    svg.classList.remove("wfc-live");
    svg.getBoundingClientRect(); // force le reflow pour rejouer l'apparition
    const raf = requestAnimationFrame(() => svg.classList.add("wfc-live"));
    const flow = visible ? runFlow(svg, workflow.nodes.length * 120 + 500) : null;
    return () => {
      cancelAnimationFrame(raf);
      flow?.stop();
    };
  }, [current, vertical, seen, visible, workflow.nodes.length]);

  return (
    <div ref={frameRef} className="wfc-frame">
      <div role="tablist" aria-label="Exemples de workflows d'agents IA" className="wfc-tabs">
        {WORKFLOWS.map((w, i) => (
          <button
            key={w.id}
            role="tab"
            id={`wfc-tab-${w.id}`}
            aria-selected={i === current}
            aria-controls={`wfc-panel-${w.id}`}
            className="wfc-tab"
            onClick={() => setCurrent(i)}
          >
            <span className="wfc-tab-name">{w.tab}</span>
            <span className="wfc-tab-offer">{w.offer}</span>
          </button>
        ))}
      </div>

      <p className="wfc-blurb" aria-live="polite">
        {workflow.blurb}
      </p>

      <div
        role="tabpanel"
        id={`wfc-panel-${workflow.id}`}
        aria-labelledby={`wfc-tab-${workflow.id}`}
      >
        <svg
          key={`${workflow.id}-${vertical ? "v" : "h"}`}
          ref={svgRef}
          className={`wfc-svg${vertical ? " wfc-svg--v" : ""}`}
          viewBox={`0 0 ${layout.vb.w} ${layout.vb.h}`}
          style={{ aspectRatio: `${layout.vb.w} / ${layout.vb.h}` }}
          role="img"
          aria-label={`Schéma du workflow « ${workflow.tab} » : ${workflow.nodes
            .map((n) => n.title)
            .join(", puis ")}.`}
        >
          <defs>
            <pattern id="wfc-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="var(--wfc-dot, #33333a)" />
            </pattern>
          </defs>
          <rect width={layout.vb.w} height={layout.vb.h} fill="url(#wfc-dots)" />

          {layout.edges.map((d, i) => (
            <path
              key={i}
              className="wfc-edge"
              d={d}
              pathLength={1}
              data-flow-edge
              data-order={i}
              style={{ "--d": `${i * 120 + 180}ms` } as React.CSSProperties}
            />
          ))}
          {layout.sublinks.map((d, i) => (
            <path
              key={i}
              className="wfc-sublink"
              d={d}
              style={{ "--d": `${agentIndex * 120 + 300}ms` } as React.CSSProperties}
            />
          ))}
          {layout.ports.map((p, i) => (
            <circle key={i} className="wfc-port" cx={p.x} cy={p.y} r={4} />
          ))}
          {layout.nodes.map((n, i) => (
            <ChartNode key={`${n.title}-${i}`} node={n} order={i} />
          ))}
          {layout.subs.map((s, i) => (
            <g
              key={s.title}
              className="wfc-subnode"
              style={{ "--d": `${agentIndex * 120 + 300 + i * 90}ms` } as React.CSSProperties}
            >
              <ChartIcon
                icon={s.icon}
                color={s.color}
                x={s.cx - SUB_BOX / 2}
                y={s.y}
                size={SUB_BOX}
              />
              <text className="wfc-subnode-title" x={s.cx} y={s.y + 54} textAnchor="middle">
                {s.title}
              </text>
              <text className="wfc-subnode-sub" x={s.cx} y={s.y + 68} textAnchor="middle">
                {s.subtitle}
              </text>
            </g>
          ))}

          <g data-flow-pulse opacity="0">
            <circle r="9" fill="var(--accent)" opacity="0.25" />
            <circle r="4" fill="var(--accent)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
