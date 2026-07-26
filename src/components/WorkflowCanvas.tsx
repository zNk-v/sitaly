/* Canvas "workflow n8n" — section Sous le capot de /agents-ia.
   Reproduit l'esthétique du canvas de build n8n (fond sombre, grille de points,
   nodes arrondis, connexions en Bézier) avec les workflows d'agents Sitaly.
   Rendu : SVG pur, responsive (horizontal desktop / vertical mobile).
   Animation : voir workflowCanvasEngine.ts (vanilla, transform/opacity). */

import { useEffect, useRef, useState } from "react";
import { startFlowEngine, type FlowEngine } from "@/components/workflowCanvasEngine";

/* ------------------------------------------------------------------ */
/* Données : les 4 workflows corrélés aux offres Sitaly                */
/* ------------------------------------------------------------------ */

type IconId =
  | "phone"
  | "phoneMissed"
  | "bolt"
  | "clock"
  | "bot"
  | "message"
  | "mail"
  | "calendar"
  | "star"
  | "database"
  | "spark"
  | "wrench"
  | "branch"
  | "send"
  | "wave"
  | "doc"
  | "pen"
  | "bell";

type WfNode = {
  title: string;
  subtitle: string;
  icon: IconId;
  color: string;
  kind?: "trigger" | "agent";
};

type WfSub = { title: string; subtitle: string; icon: IconId; color: string };

type Workflow = {
  id: string;
  tab: string;
  offer: string;
  blurb: string;
  nodes: WfNode[];
  subs: WfSub[]; // sub-nodes rattachés à l'Agent IA (Chat Model / Memory / Tools)
};

const SUB_CLAUDE: WfSub = { title: "Chat Model", subtitle: "Modèle IA", icon: "spark", color: "#d97757" };
const SUB_SUPABASE: WfSub = { title: "Memory", subtitle: "Historique client", icon: "database", color: "#3ecf8e" };

const WORKFLOWS: Workflow[] = [
  {
    id: "receptionniste",
    tab: "Réceptionniste vocal 24/7",
    offer: "Offre Performance",
    blurb:
      "Un client appelle pendant que vous êtes sur un chantier : l'agent décroche, répond, cale le rendez-vous et vous prévient par SMS.",
    nodes: [
      { title: "Appel entrant", subtitle: "Ligne dédiée 24/7", icon: "phone", color: "#e2574c", kind: "trigger" },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", color: "", kind: "agent" },
      { title: "Décision", subtitle: "Selon la demande", icon: "branch", color: "#3aa7b8" },
      { title: "Réponse vocale", subtitle: "Voix naturelle", icon: "wave", color: "#14b8a6" },
      { title: "Prise de RDV", subtitle: "Agenda synchronisé", icon: "calendar", color: "#5b7bd5" },
      { title: "SMS à l'artisan", subtitle: "Notification instantanée", icon: "message", color: "#e2574c" },
    ],
    subs: [SUB_CLAUDE, SUB_SUPABASE, { title: "Tools", subtitle: "Agenda & outils", icon: "wrench", color: "#5b7bd5" }],
  },
  {
    id: "relance-devis",
    tab: "Relance devis auto",
    offer: "Offre Acquisition",
    blurb:
      "48 h après l'envoi d'un devis resté sans réponse, l'agent rédige une relance personnalisée, l'envoie et la consigne dans votre CRM.",
    nodes: [
      { title: "Devis envoyé", subtitle: "Déclencheur automatique", icon: "bolt", color: "#6d7cff", kind: "trigger" },
      { title: "Attente 48 h", subtitle: "Minuteur", icon: "clock", color: "#8a8f9d" },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", color: "", kind: "agent" },
      { title: "Message personnalisé", subtitle: "Rédigé par l'IA", icon: "pen", color: "#d97757" },
      { title: "Envoi SMS / Email", subtitle: "Au bon moment", icon: "mail", color: "#5b8def" },
      { title: "Suivi dans le CRM", subtitle: "Fiche client à jour", icon: "doc", color: "#b3aca2" },
    ],
    subs: [SUB_CLAUDE, SUB_SUPABASE],
  },
  {
    id: "avis-google",
    tab: "Avis Google",
    offer: "Offre Visibilité",
    blurb:
      "À chaque avis reçu, l'agent rédige une réponse adaptée au ton du client, la publie et vous alerte si l'avis est négatif.",
    nodes: [
      { title: "Nouvel avis Google", subtitle: "Veille automatique", icon: "star", color: "#f5b301", kind: "trigger" },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", color: "", kind: "agent" },
      { title: "Réponse sur mesure", subtitle: "Adaptée au ton", icon: "pen", color: "#d97757" },
      { title: "Publication", subtitle: "Réponse en ligne", icon: "send", color: "#4285f4" },
      { title: "Alerte avis négatif", subtitle: "SMS immédiat", icon: "message", color: "#e2574c" },
    ],
    subs: [SUB_CLAUDE],
  },
  {
    id: "appel-manque",
    tab: "SMS appel manqué",
    offer: "En option",
    blurb:
      "Un appel vous échappe ? Le prospect reçoit un SMS immédiat avec une proposition de créneau, et vous êtes prévenu dans la foulée.",
    nodes: [
      { title: "Appel manqué", subtitle: "Détection instantanée", icon: "phoneMissed", color: "#e2574c", kind: "trigger" },
      { title: "Agent IA", subtitle: "Le cerveau du workflow", icon: "bot", color: "", kind: "agent" },
      { title: "SMS immédiat", subtitle: "Envoyé au prospect", icon: "message", color: "#e2574c" },
      { title: "Créneau proposé", subtitle: "Agenda synchronisé", icon: "calendar", color: "#5b7bd5" },
      { title: "Artisan prévenu", subtitle: "Notification SMS", icon: "bell", color: "#f0a63a" },
    ],
    subs: [SUB_CLAUDE],
  },
];

/* ------------------------------------------------------------------ */
/* Glyphes SVG monochromes (style lucide, 24×24, stroke)               */
/* ------------------------------------------------------------------ */

const ICONS: Record<IconId, React.ReactNode> = {
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

/* ------------------------------------------------------------------ */
/* Layout : positionne nodes, sub-nodes, connexions et ports           */
/* ------------------------------------------------------------------ */

type Laid = WfNode & { x: number; y: number; w: number; h: number; cx: number; cy: number; lines: string[] };
type LaidSub = WfSub & { cx: number; y: number };
type Layout = {
  vb: { w: number; h: number };
  nodes: Laid[];
  subs: LaidSub[];
  edges: string[];
  sublinks: string[];
  ports: { x: number; y: number }[];
};

/* Coupe un titre en 2 lignes max, sur un espace */
function wrapTitle(t: string, max: number): string[] {
  if (t.length <= max) return [t];
  const words = t.split(" ");
  let l1 = "";
  for (const w of words) {
    const test = (l1 + " " + w).trim();
    if (test.length <= max) l1 = test;
    else break;
  }
  if (!l1) l1 = words[0];
  return [l1, t.slice(l1.length).trim()];
}

/* Desktop : chaîne horizontale, légers décalages verticaux façon canvas n8n */
function layoutH(wf: Workflow): Layout {
  const VB_W = 1240;
  const PAD = 18;
  const stagger = [0, -12, 10, -8, 12, -4, 8];
  const widths = wf.nodes.map((n) => (n.kind === "agent" ? 206 : 174));
  const totalW = widths.reduce((a, b) => a + b, 0);
  const gap = (VB_W - PAD * 2 - totalW) / (wf.nodes.length - 1);
  const baseCY = 80;

  let x = PAD;
  const nodes: Laid[] = wf.nodes.map((n, i) => {
    const w = widths[i];
    const h = n.kind === "agent" ? 72 : 62;
    const cy = baseCY + stagger[i % stagger.length];
    const laid: Laid = { ...n, x, y: cy - h / 2, w, h, cx: x + w / 2, cy, lines: wrapTitle(n.title, n.kind === "agent" ? 22 : 16) };
    x += w + gap;
    return laid;
  });

  const agent = nodes.find((n) => n.kind === "agent")!;
  const subTop = agent.y + agent.h + 46;
  const subs: LaidSub[] = wf.subs.map((s, i) => ({
    ...s,
    cx: agent.cx + (i - (wf.subs.length - 1) / 2) * 132,
    y: subTop,
  }));

  const edges: string[] = [];
  const ports: { x: number; y: number }[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const x1 = a.x + a.w;
    const dx = Math.max(26, (b.x - x1) * 0.55);
    edges.push(`M ${x1} ${a.cy} C ${x1 + dx} ${a.cy}, ${b.x - dx} ${b.cy}, ${b.x} ${b.cy}`);
    ports.push({ x: x1, y: a.cy }, { x: b.x, y: b.cy });
  }

  const sublinks = subs.map((s, i) => {
    const px = agent.x + agent.w * ((i + 1) / (subs.length + 1));
    const py = agent.y + agent.h;
    ports.push({ x: px, y: py });
    return `M ${px} ${py} C ${px} ${py + 22}, ${s.cx} ${s.y - 20}, ${s.cx} ${s.y}`;
  });

  return { vb: { w: VB_W, h: subTop + 40 + 42 }, nodes, subs, edges, sublinks, ports };
}

/* Mobile : chaîne verticale, sub-nodes en rangée sous l'Agent IA */
function layoutV(wf: Workflow): Layout {
  const VB_W = 340;
  const NODE_W = 264;
  const X = (VB_W - NODE_W) / 2;
  const GAP = 46;
  const SUBZONE = 118; // liens pointillés + icônes + labels

  let y = 12;
  const nodes: Laid[] = wf.nodes.map((n) => {
    const h = n.kind === "agent" ? 72 : 62;
    const laid: Laid = { ...n, x: X, y, w: NODE_W, h, cx: VB_W / 2, cy: y + h / 2, lines: wrapTitle(n.title, 28) };
    y += h + GAP;
    if (n.kind === "agent") y += SUBZONE;
    return laid;
  });

  const agent = nodes.find((n) => n.kind === "agent")!;
  const subTop = agent.y + agent.h + 34;
  const subs: LaidSub[] = wf.subs.map((s, i) => ({
    ...s,
    cx: agent.cx + (i - (wf.subs.length - 1) / 2) * 96,
    y: subTop,
  }));

  const edges: string[] = [];
  const ports: { x: number; y: number }[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    if (a.kind === "agent") {
      // Le flux contourne les sub-nodes par la gauche
      const x1 = a.x;
      edges.push(`M ${x1} ${a.cy} C ${x1 - 34} ${a.cy + 50}, ${a.x - 34} ${b.y - 50}, ${b.cx} ${b.y}`);
      ports.push({ x: x1, y: a.cy }, { x: b.cx, y: b.y });
    } else {
      const bow = i % 2 === 0 ? 22 : -22;
      const y1 = a.y + a.h;
      edges.push(`M ${a.cx} ${y1} C ${a.cx + bow} ${y1 + 18}, ${b.cx + bow} ${b.y - 18}, ${b.cx} ${b.y}`);
      ports.push({ x: a.cx, y: y1 }, { x: b.cx, y: b.y });
    }
  }

  const sublinks = subs.map((s, i) => {
    const px = agent.x + agent.w * ((i + 1) / (subs.length + 1));
    const py = agent.y + agent.h;
    ports.push({ x: px, y: py });
    return `M ${px} ${py} C ${px} ${py + 16}, ${s.cx} ${s.y - 14}, ${s.cx} ${s.y}`;
  });

  return { vb: { w: VB_W, h: y - GAP + 14 }, nodes, subs, edges, sublinks, ports };
}

/* Contour "pilule" du node Trigger : côté gauche arrondi, côté droit à 8px */
function triggerPath(x: number, y: number, w: number, h: number): string {
  const rl = h / 2;
  const rr = 8;
  return [
    `M ${x + rl} ${y}`,
    `L ${x + w - rr} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + rr}`,
    `L ${x + w} ${y + h - rr}`,
    `Q ${x + w} ${y + h} ${x + w - rr} ${y + h}`,
    `L ${x + rl} ${y + h}`,
    `A ${rl} ${rl} 0 0 1 ${x + rl} ${y}`,
    "Z",
  ].join(" ");
}

/* ------------------------------------------------------------------ */
/* Rendu SVG d'un node                                                 */
/* ------------------------------------------------------------------ */

function NodeIcon({ icon, color, x, y, size }: { icon: IconId; color: string; x: number; y: number; size: number }) {
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
        {ICONS[icon]}
      </g>
    </g>
  );
}

function CanvasNode({ node, order }: { node: Laid; order: number }) {
  const isTrigger = node.kind === "trigger";
  const isAgent = node.kind === "agent";
  const iconSize = 34;
  const iconX = node.x + (isTrigger ? 20 : 13);
  const textX = iconX + iconSize + 11;
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
        <rect className="wfc-node-box" x={node.x} y={node.y} width={node.w} height={node.h} rx={8} />
      )}
      <NodeIcon icon={node.icon} color={node.color} x={iconX} y={node.cy - iconSize / 2} size={iconSize} />
      {twoLines ? (
        <>
          <text className="wfc-title" x={textX} y={node.cy - 8}>{node.lines[0]}</text>
          <text className="wfc-title" x={textX} y={node.cy + 6}>{node.lines[1]}</text>
          <text className="wfc-sub" x={textX} y={node.cy + 21}>{node.subtitle}</text>
        </>
      ) : (
        <>
          <text className="wfc-title" x={textX} y={node.cy - 2}>{node.lines[0]}</text>
          <text className="wfc-sub" x={textX} y={node.cy + 15}>{node.subtitle}</text>
        </>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Composant principal : onglets + canvas + animation                  */
/* ------------------------------------------------------------------ */

export function WorkflowCanvas() {
  const [active, setActive] = useState(0);
  const [vertical, setVertical] = useState(false);
  const [entered, setEntered] = useState(false); // la section est entrée à l'écran au moins une fois
  const [inView, setInView] = useState(false); // la section est visible en ce moment
  const frameRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const wf = WORKFLOWS[active];
  const layout = vertical ? layoutV(wf) : layoutH(wf);
  const agentOrder = wf.nodes.findIndex((n) => n.kind === "agent");

  /* Bascule horizontal/vertical selon la largeur d'écran */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setVertical(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Déclenchement au scroll (~40% visible) */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setEntered(true);
        setInView(e.isIntersecting);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Rejoue l'entrée + (re)lance le pulse à chaque changement d'onglet ou d'orientation */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !entered) return;
    svg.classList.remove("wfc-live");
    void svg.getBoundingClientRect(); // force le reflow pour rejouer les transitions d'entrée
    const raf = requestAnimationFrame(() => svg.classList.add("wfc-live"));
    let engine: FlowEngine | null = null;
    if (inView) engine = startFlowEngine(svg, wf.nodes.length * 120 + 500);
    return () => {
      cancelAnimationFrame(raf);
      engine?.stop();
    };
  }, [active, vertical, entered, inView, wf.nodes.length]);

  return (
    <div ref={frameRef} className="wfc-frame">
      {/* Sélecteur de workflows */}
      <div role="tablist" aria-label="Exemples de workflows d'agents IA" className="wfc-tabs">
        {WORKFLOWS.map((w, i) => (
          <button
            key={w.id}
            role="tab"
            id={`wfc-tab-${w.id}`}
            aria-selected={i === active}
            aria-controls={`wfc-panel-${w.id}`}
            className="wfc-tab"
            onClick={() => setActive(i)}
          >
            <span className="wfc-tab-name">{w.tab}</span>
            <span className="wfc-tab-offer">{w.offer}</span>
          </button>
        ))}
      </div>

      <p className="wfc-blurb" aria-live="polite">{wf.blurb}</p>

      {/* Canvas */}
      <div role="tabpanel" id={`wfc-panel-${wf.id}`} aria-labelledby={`wfc-tab-${wf.id}`}>
        <svg
          key={`${wf.id}-${vertical ? "v" : "h"}`}
          ref={svgRef}
          className={`wfc-svg${vertical ? " wfc-svg--v" : ""}`}
          viewBox={`0 0 ${layout.vb.w} ${layout.vb.h}`}
          style={{ aspectRatio: `${layout.vb.w} / ${layout.vb.h}` }}
          role="img"
          aria-label={`Schéma du workflow « ${wf.tab} » : ${wf.nodes.map((n) => n.title).join(", puis ")}.`}
        >
          {/* Grille de points façon canvas n8n */}
          <defs>
            <pattern id="wfc-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#33333a" />
            </pattern>
          </defs>
          <rect width={layout.vb.w} height={layout.vb.h} fill="url(#wfc-dots)" />

          {/* Connexions principales */}
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

          {/* Liens pointillés Agent IA → sub-nodes */}
          {layout.sublinks.map((d, i) => (
            <path
              key={i}
              className="wfc-sublink"
              d={d}
              style={{ "--d": `${agentOrder * 120 + 300}ms` } as React.CSSProperties}
            />
          ))}

          {/* Ports (petits cercles d'entrée/sortie) */}
          {layout.ports.map((p, i) => (
            <circle key={i} className="wfc-port" cx={p.x} cy={p.y} r={4} />
          ))}

          {/* Nodes */}
          {layout.nodes.map((n, i) => (
            <CanvasNode key={`${n.title}-${i}`} node={n} order={i} />
          ))}

          {/* Sub-nodes (Chat Model / Memory / Tools) */}
          {layout.subs.map((s, i) => (
            <g
              key={s.title}
              className="wfc-subnode"
              style={{ "--d": `${agentOrder * 120 + 300 + i * 90}ms` } as React.CSSProperties}
            >
              <NodeIcon icon={s.icon} color={s.color} x={s.cx - 19} y={s.y} size={38} />
              <text className="wfc-subnode-title" x={s.cx} y={s.y + 54} textAnchor="middle">{s.title}</text>
              <text className="wfc-subnode-sub" x={s.cx} y={s.y + 68} textAnchor="middle">{s.subtitle}</text>
            </g>
          ))}

          {/* Pulse de données (déplacé par workflowCanvasEngine) */}
          <g data-flow-pulse opacity="0">
            <circle r="9" fill="var(--accent)" opacity="0.25" />
            <circle r="4" fill="var(--accent)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
