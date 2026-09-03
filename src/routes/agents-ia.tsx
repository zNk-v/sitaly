import { useRef, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarClock,
  Check,
  ClipboardList,
  Clock,
  Compass,
  Eye,
  FileWarning,
  FileText,
  Filter,
  HardHat,
  Inbox,
  LineChart,
  ListChecks,
  MessageCircle,
  MessageSquare,
  Phone,
  PhoneMissed,
  Repeat,
  Scale,
  Send,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { HeaderCallButton, MobileMenu } from "@/components/MobileMenu";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { AiFlowRail, type FlowStep } from "@/components/AiFlowRail";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { CALENDLY_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";
import { LinkedinLink } from "@/components/LinkedinLink";

const CONTACT_EMAIL = "contact@sitaly.fr";

/* Ancre du CTA principal, identique sur toute la page. */
const CTA_ANCHOR = "#diagnostic";
const CTA_LABEL = "Demander un diagnostic";

const FAQ_ITEMS = [
  {
    q: "Est-ce un simple chatbot ?",
    a: "Non. Un chatbot répond dans une fenêtre de discussion et s'arrête là. Un agent traite la demande de bout en bout : il comprend le motif, applique vos règles, propose un créneau, enregistre les informations et transmet à votre équipe. Son périmètre est défini avec vous avant le déploiement.",
  },
  {
    q: "L'agent peut-il transférer vers un humain ?",
    a: "Oui, et le transfert fait partie de la configuration. Vous décidez des situations qui déclenchent une reprise humaine : demande sensible, client existant, montant important, urgence, ou simple demande du prospect. L'agent transmet alors le contexte déjà collecté pour éviter de tout redemander.",
  },
  {
    q: "Peut-il se connecter à nos outils ?",
    a: "Cela dépend de vos outils. Un logiciel qui expose une API ou des webhooks se connecte directement. Pour les autres, on passe par des relais comme l'e-mail, un fichier partagé ou un formulaire. Chaque connexion est vérifiée pendant le diagnostic : vous savez ce qui est réellement faisable avant de vous engager.",
  },
  {
    q: "Que se passe-t-il lorsqu'il ne comprend pas ?",
    a: "Il ne devine pas. Il reformule une fois, puis bascule vers votre équipe avec le résumé de l'échange si la demande sort de son périmètre. Ces conversations sont relues pendant la phase de pilotage pour corriger les règles.",
  },
  {
    q: "Combien de temps prend le déploiement ?",
    a: "Le délai dépend du périmètre retenu et des outils à connecter. Un premier processus se met en place nettement plus vite qu'un système complet. Le diagnostic fixe le calendrier et les étapes avant le démarrage.",
  },
  {
    q: "Comment les données sont-elles traitées ?",
    a: "Les agents accèdent uniquement aux données nécessaires au périmètre défini. Les échanges sont conservés pour permettre le suivi et l'amélioration des règles. Nous documentons avec vous ce qui est collecté, où c'est stocké et pendant combien de temps.",
  },
  {
    q: "Peut-on commencer par un seul processus ?",
    a: "C'est la méthode que nous recommandons. On démarre par le point de perte le plus coûteux, on mesure les résultats, puis on étend le périmètre une fois le premier processus stabilisé.",
  },
  {
    q: "Comment le projet est-il facturé ?",
    a: "En deux parties : le déploiement initial, chiffré après le diagnostic selon le périmètre et les connexions à réaliser, puis un suivi mensuel qui couvre le pilotage, les corrections et l'évolution des règles. Rien n'est chiffré avant le diagnostic.",
  },
];

const HERO_FLOW: FlowStep[] = [
  { label: "Demande entrante", detail: "Appel, formulaire ou message", icon: Inbox },
  { label: "Agent IA", detail: "Répond immédiatement", icon: Bot },
  { label: "Qualification", detail: "Vos critères, vos règles", icon: ListChecks },
  { label: "Rendez-vous", detail: "Créneau proposé et confirmé", icon: CalendarCheck },
  { label: "Équipe humaine", detail: "Reprise avec le contexte", icon: Users },
  { label: "Suivi", detail: "Relance et résultats mesurés", icon: LineChart },
];

const CAPABILITIES = [
  { label: "Appels", icon: Phone },
  { label: "Formulaires", icon: ClipboardList },
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Messages", icon: MessageSquare },
  { label: "Prise de rendez-vous", icon: CalendarCheck },
  { label: "E-mails", icon: Send },
  { label: "Relance", icon: Repeat },
  { label: "Mise à jour de vos outils", icon: FileText },
  { label: "Transfert humain", icon: UserCheck },
  { label: "Suivi des conversions", icon: BarChart3 },
];

const LEAKS = [
  {
    icon: PhoneMissed,
    title: "Appels manqués",
    text: "Personne ne décroche pendant un rendez-vous, une intervention ou en dehors des horaires. Le client appelle le suivant.",
  },
  {
    icon: Clock,
    title: "Réponses trop tardives",
    text: "La demande arrive le soir, la réponse part le surlendemain. Entre les deux, la décision est déjà prise ailleurs.",
  },
  {
    icon: Filter,
    title: "Prospects mal qualifiés",
    text: "Vos équipes passent autant de temps sur une demande hors zone ou hors budget que sur une affaire sérieuse.",
  },
  {
    icon: CalendarClock,
    title: "Rendez-vous non confirmés",
    text: "Un créneau posé sans rappel ni confirmation devient un déplacement pour rien ou un créneau perdu.",
  },
  {
    icon: FileWarning,
    title: "Propositions sans suite",
    text: "Le devis, la proposition ou le dossier part, puis plus rien. La relance dépend de la mémoire de celui qui l'a envoyé.",
  },
  {
    icon: Eye,
    title: "Aucune visibilité",
    text: "Impossible de dire combien de demandes sont arrivées, combien ont abouti, et à quelle étape les autres se sont arrêtées.",
  },
];

const JOURNEY = [
  { step: "01", text: "Un client appelle, écrit ou remplit un formulaire." },
  { step: "02", text: "L'agent répond immédiatement, sur le canal utilisé." },
  { step: "03", text: "Il recueille les informations utiles au traitement." },
  { step: "04", text: "Il qualifie la demande selon vos règles métier." },
  { step: "05", text: "Il propose un rendez-vous ou transfère à un humain." },
  { step: "06", text: "Il enregistre les informations dans vos outils." },
  { step: "07", text: "Il relance quand la demande reste sans suite." },
  { step: "08", text: "Vous suivez les résultats étape par étape." },
];

type AgentBlock = {
  id: string;
  index: string;
  name: string;
  icon: typeof Bot;
  pitch: string;
  does: string[];
  changes: string;
  handover: string;
};

const AGENT_BLOCKS: AgentBlock[] = [
  {
    id: "accueil",
    index: "01",
    name: "Agent d'accueil",
    icon: Phone,
    pitch: "Il traite la demande au moment où elle arrive, quel que soit le canal.",
    does: [
      "Répond aux appels et aux demandes écrites",
      "Comprend le motif du contact",
      "Collecte les informations importantes",
      "Identifie les situations sensibles ou complexes",
    ],
    changes:
      "Plus aucune demande ne reste sans réponse pendant que votre équipe est occupée ailleurs.",
    handover:
      "Urgence, litige, client existant ou demande hors périmètre : l'agent passe la main immédiatement.",
  },
  {
    id: "qualification",
    index: "02",
    name: "Agent de qualification et rendez-vous",
    icon: ListChecks,
    pitch: "Il applique vos critères avant que la demande n'arrive sur le bureau d'un commercial.",
    does: [
      "Applique les critères définis avec vous",
      "Écarte les demandes hors zone, hors métier ou hors budget",
      "Propose un créneau réellement disponible",
      "Transmet un résumé structuré à l'équipe",
    ],
    changes: "Vos équipes ouvrent leur agenda sur des rendez-vous préparés, pas sur des inconnues.",
    handover:
      "Un cas limite ou un critère ambigu remonte à un humain plutôt que d'être tranché par l'agent.",
  },
  {
    id: "relance",
    index: "03",
    name: "Agent de relance",
    icon: Repeat,
    pitch: "Il suit ce qui reste en attente, sans dépendre de la mémoire de personne.",
    does: [
      "Suit les devis, les propositions et les dossiers en attente",
      "Relance selon les règles et les délais définis",
      "Arrête la séquence dès qu'une réponse arrive",
      "Fait remonter les opportunités prioritaires",
    ],
    changes: "Ce qui a été envoyé est relancé au bon moment, chaque semaine, sans y penser.",
    handover:
      "Dès qu'un prospect répond ou demande à parler à quelqu'un, la séquence s'arrête et l'équipe prend le relais.",
  },
];

/* Un même système, décliné par métier : chaque carte donne des exemples
   concrets pour que le visiteur se reconnaisse sans avoir à transposer. */
const SECTOR_CASES = [
  {
    icon: ShoppingCart,
    name: "E-commerce et vente en ligne",
    context:
      "Beaucoup de messages, peu de temps, et des questions qui reviennent avant et après l'achat.",
    items: [
      "Questions avant achat sur WhatsApp, chat ou e-mail : stock, délais, tailles",
      "Suivi de commande, retours et remboursements",
      "Relance des paniers et des devis professionnels",
      "Demande d'avis quelques jours après la livraison",
    ],
  },
  {
    icon: Stethoscope,
    name: "Santé et cabinets de soins",
    context: "Le téléphone sonne pendant les consultations et les créneaux annulés restent vides.",
    items: [
      "Prise, déplacement et annulation de rendez-vous",
      "Rappels de rendez-vous par SMS ou WhatsApp pour limiter les absences",
      "Questions pratiques : horaires, accès, documents à apporter",
      "Urgences et cas sensibles transmis directement au praticien",
    ],
  },
  {
    icon: Scale,
    name: "Avocats et professions libérales",
    context:
      "Le premier échange consomme du temps facturable avant même de savoir si le dossier est recevable.",
    items: [
      "Premier contact et qualification de la demande",
      "Vérification du domaine traité avant la prise de rendez-vous",
      "Collecte des pièces avant le rendez-vous",
      "Relance des dossiers en attente et des honoraires impayés",
    ],
  },
  {
    icon: HardHat,
    name: "Artisans et bâtiment",
    context:
      "Les appels arrivent pendant les interventions et les devis partent sans jamais être relancés.",
    items: [
      "Réponse aux appels reçus pendant les chantiers",
      "Qualification : zone, nature des travaux, budget, délai",
      "Relance des devis restés sans réponse",
      "SMS immédiat au client après un appel manqué",
    ],
  },
  {
    icon: Building2,
    name: "Immobilier et gestion",
    context:
      "Les demandes de visite arrivent par cinq canaux différents et se traitent au fil de l'eau.",
    items: [
      "Qualification des demandes de visite et de location",
      "Prise de rendez-vous synchronisée avec les agendas",
      "Suivi des demandes locataires et des interventions",
      "Relance des dossiers incomplets",
    ],
  },
  {
    icon: Briefcase,
    name: "Agences, conseil et services",
    context: "Trop de demandes hors budget occupent le temps des commerciaux.",
    items: [
      "Qualification selon le budget et le périmètre",
      "Prise de rendez-vous de cadrage avec le contexte préparé",
      "Relance des propositions commerciales",
      "Démarrage client : documents, accès et informations à récupérer",
    ],
  },
];

/* Le catalogue va au-delà des trois agents : il montre l'étendue de ce qui
   se traite une fois les outils connectés. */
const AUTOMATION_FAMILIES = [
  {
    icon: Inbox,
    title: "Demandes entrantes",
    items: [
      "Réponse aux appels, aux messages WhatsApp, aux formulaires et aux e-mails",
      "Tri et transmission à la bonne personne",
      "Réponses aux questions fréquentes",
      "Détection des demandes urgentes ou sensibles",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Rendez-vous et agendas",
    items: [
      "Prise, déplacement et annulation de rendez-vous",
      "Confirmation et rappels automatiques",
      "Collecte des informations utiles avant le rendez-vous",
      "Proposition des créneaux libérés à d'autres clients",
    ],
  },
  {
    icon: Repeat,
    title: "Relance et suivi",
    items: [
      "Relance des devis, propositions et paniers abandonnés",
      "Séquences qui s'arrêtent dès qu'une réponse arrive",
      "Relance des documents et pièces manquantes",
      "Rappel des factures impayées",
    ],
  },
  {
    icon: MessageSquare,
    title: "Après-vente et satisfaction",
    items: [
      "Suivi de commande, de livraison et de retour, y compris sur WhatsApp",
      "Demande d'avis au bon moment",
      "Réponse aux avis publiés en ligne",
      "Alerte immédiate en cas de client mécontent",
    ],
  },
  {
    icon: FileText,
    title: "Administratif et documents",
    items: [
      "Création et mise à jour des fiches clients",
      "Préparation des devis et des documents types",
      "Collecte, classement et vérification des pièces",
      "Transfert des informations d'un outil à l'autre",
    ],
  },
  {
    icon: BarChart3,
    title: "Pilotage",
    items: [
      "Suivi des demandes reçues, traitées et perdues",
      "Rapport hebdomadaire envoyé automatiquement",
      "Contrôle des délais de réponse",
      "Alerte quand un indicateur décroche",
    ],
  },
];

const BEFORE = [
  "Informations dispersées entre boîte mail, téléphone et carnet",
  "Appels sans réponse en dehors des heures de bureau",
  "Ressaisie manuelle des mêmes informations",
  "Relances irrégulières, quand quelqu'un y pense",
  "Aucune vision globale sur les demandes reçues",
];

const AFTER = [
  "Réponse immédiate sur chaque canal traité",
  "Informations structurées au même endroit",
  "Rendez-vous préparés avec le contexte de la demande",
  "Relances systématiques selon vos règles",
  "Équipe concentrée sur les demandes importantes",
];

const PHASES = [
  {
    step: "01",
    title: "Diagnostic",
    icon: Compass,
    items: [
      "Analyse de vos demandes entrantes",
      "Identification des pertes et des tâches répétitives",
      "Définition des règles métier",
      "Choix du premier périmètre rentable",
    ],
  },
  {
    step: "02",
    title: "Déploiement",
    icon: SlidersHorizontal,
    items: [
      "Configuration des agents",
      "Connexion aux outils compatibles",
      "Création des scénarios et tests",
      "Formation de l'équipe et mise en production progressive",
    ],
  },
  {
    step: "03",
    title: "Pilotage",
    icon: LineChart,
    items: [
      "Analyse des conversations",
      "Correction des erreurs constatées",
      "Amélioration des règles",
      "Suivi des résultats et extension du périmètre",
    ],
  },
];

const GUARDRAILS = [
  {
    icon: SlidersHorizontal,
    title: "Vos règles, pas les nôtres",
    text: "Ce que l'agent peut dire, proposer et décider est défini avec vous, puis figé dans sa configuration.",
  },
  {
    icon: UserCheck,
    title: "Transfert vers un humain",
    text: "Les situations que vous désignez déclenchent une reprise humaine, avec le contexte déjà collecté.",
  },
  {
    icon: ClipboardList,
    title: "Historique des actions",
    text: "Chaque conversation et chaque action réalisée par l'agent restent consultables.",
  },
  {
    icon: ShieldCheck,
    title: "Périmètre limité",
    text: "L'agent n'accède qu'aux outils et aux données nécessaires aux tâches qui lui sont confiées.",
  },
  {
    icon: Check,
    title: "Validation humaine",
    text: "Les situations sensibles passent par une validation de votre équipe avant toute action engageante.",
  },
  {
    icon: Repeat,
    title: "Amélioration continue",
    text: "Les échanges sont relus régulièrement pour corriger les règles et réduire les cas mal traités.",
  },
  {
    icon: Bell,
    title: "Gestion responsable des données",
    text: "Nous documentons avec vous les données collectées, leur emplacement et leur durée de conservation.",
  },
];

const FIT = [
  "Un volume régulier d'appels, de messages, de commandes ou de demandes de rendez-vous",
  "Une valeur commerciale importante par demande traitée",
  "Une équipe qui perd du temps sur la qualification et la relance",
  "Des outils existants à connecter au parcours",
  "La volonté de mesurer les résultats et d'ajuster",
];

const NOT_FIT = [
  "Vous cherchez un chatbot à installer vous-même pour quelques euros par mois",
  "Vous recevez trop peu de demandes pour qu'un processus se justifie",
  "Vous ne souhaitez ni définir de règles ni relire les conversations",
];

export const Route = createFileRoute("/agents-ia")({
  head: () => ({
    meta: [
      { title: "Agents IA et automatisation pour TPE, PME et cabinets | Sitaly" },
      {
        name: "description",
        content:
          "Sitaly installe et pilote des agents IA qui répondent aux demandes, qualifient, prennent les rendez-vous et relancent : e-commerce, cabinets, artisans, agences.",
      },
      {
        property: "og:title",
        content: "Agents IA et automatisation pour TPE, PME et cabinets | Sitaly",
      },
      {
        property: "og:description",
        content:
          "Sitaly installe et pilote des agents IA qui répondent aux demandes, qualifient, prennent les rendez-vous, relancent et mettent vos outils à jour, avec une reprise humaine dès qu'elle est nécessaire.",
      },
      { property: "og:url", content: "https://sitaly.fr/agents-ia/" },
      { property: "og:image", content: "https://sitaly.fr/og-agents-ia.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Sitaly Agents IA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sitaly.fr/og-agents-ia.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/agents-ia/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      },
    ],
  }),
  component: AgentsIA,
});

function AgentsIA() {
  const pageRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(pageRef);

  return (
    <div ref={pageRef} className="ai-page min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <Problem />
        <Sectors />
        <System />
        <Agents />
        <Automations />
        <BeforeAfter />
        <Deployment />
        <Control />
        <Fit />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <div className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <header className="relative mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Link to="/" className="flex items-center py-3" aria-label="Sitaly — accueil">
          <SitalyLogo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="/#offre"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Offres
          </a>
          <span
            aria-current="page"
            className="rounded-full bg-accent/15 px-4 py-2 text-sm font-semibold text-accent"
          >
            Agents IA
          </span>
          <a
            href="#metiers"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Métiers
          </a>
          <a
            href="#systeme"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Le système
          </a>
          <Link
            to="/blog/"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <HeaderCallButton rounded="full" />
          <a
            href={CTA_ANCHOR}
            className="ai-cta hidden h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold sm:inline-flex"
          >
            {CTA_LABEL}
          </a>
          <MobileMenu variant="floating" current="agents-ia" />
        </div>
      </header>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20">
      <div className="ai-grid" aria-hidden="true" />
      <div
        className="ai-halo left-1/2 top-[-140px] h-[420px] w-[720px] -translate-x-1/2"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div data-reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              Sitaly Agents IA — Automatisation sur mesure
            </div>
            <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Chaque demande traitée.{" "}
              <span className="ai-gradient-text">Chaque client qualifié.</span> Chaque relance
              envoyée.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground sm:text-lg">
              Que vous vendiez en ligne, receviez des patients ou interveniez chez vos clients,
              Sitaly installe et pilote les agents IA qui répondent, qualifient, prennent vos
              rendez-vous et relancent ce qui reste en attente. Un humain reprend la main dès que la
              situation le demande.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={CTA_ANCHOR}
                className="ai-cta inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-4 text-base font-semibold"
              >
                {CTA_LABEL}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#systeme"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-border bg-card px-7 py-4 text-base font-semibold text-foreground transition hover:border-accent/50 hover:bg-secondary"
              >
                Voir le système en action
              </a>
            </div>
          </div>

          <div data-reveal>
            <HeroConsole />
          </div>
        </div>

        <div className="ai-card mt-14 p-6 sm:p-8" data-reveal>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Le parcours d'une demande entrante
          </div>
          <div className="mt-6">
            <AiFlowRail steps={HERO_FLOW} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroConsole() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="ai-halo -inset-6 opacity-25" aria-hidden="true" />
      <div className="ai-card relative overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-5 py-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold">Agent d'accueil</div>
            <div className="flex items-center gap-1.5 text-xs text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              Appel entrant · 14 h 32
            </div>
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-secondary px-3.5 py-2.5 text-sm text-foreground/85">
            « Bonjour, je voudrais un rendez-vous, si possible avant la fin de la semaine. »
          </div>
          <div className="ml-auto max-w-[88%] rounded-xl rounded-tr-sm border border-accent/25 bg-accent/10 px-3.5 py-2.5 text-sm">
            « Bien sûr. Deux questions rapides, puis je vous propose un créneau avec la bonne
            personne. »
          </div>
          <div className="rounded-xl border border-border bg-secondary/50 p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Qualification
            </div>
            <dl className="mt-2 space-y-1.5 text-[13px]">
              {[
                ["Motif", "Première demande"],
                ["Type de client", "Nouveau"],
                ["Échéance", "Cette semaine"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-3.5 py-2.5 text-sm font-medium">
            <CalendarCheck className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            Rendez-vous confirmé, résumé transmis à l'équipe
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- BARRE DE CAPACITÉS ---------------- */
function Capabilities() {
  return (
    <section
      className="border-y border-border bg-secondary/20 py-8"
      aria-label="Canaux et fonctions traités"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-4">
          {CAPABILITIES.map((c) => (
            <li
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium text-foreground/90 sm:text-sm"
            >
              <c.icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- PROBLÈME COMMERCIAL ---------------- */
function Problem() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader
            eyebrow="Le point de départ"
            title="Les demandes arrivent. Mais combien deviennent réellement des clients ?"
            subtitle="Le problème n'est pas le manque d'intelligence artificielle. Ce sont les opportunités qui se perdent entre le moment où un prospect vous contacte et celui où l'affaire se signe."
          />
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEAKS.map((leak) => (
            <div key={leak.title} data-reveal className="ai-card ai-card-hover flex flex-col p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-destructive/12 text-destructive">
                <leak.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-bold">{leak.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{leak.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- LE SYSTÈME (schéma existant) ---------------- */
function System() {
  return (
    <section id="systeme" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader
            eyebrow="Le système Sitaly"
            title="Un système connecté à chaque étape de votre parcours commercial"
            subtitle="Chaque agent est un scénario branché à vos outils : téléphonie, agenda, CRM, messagerie. Choisissez un scénario pour voir le trajet complet d'une demande."
          />
        </div>

        <div className="mt-14" data-reveal>
          <WorkflowCanvas />
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((item) => (
            <li key={item.step} data-reveal className="ai-card p-5">
              <div className="font-display text-sm font-extrabold text-accent">{item.step}</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{item.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center" data-reveal>
          <PrimaryCta />
        </div>
      </div>
    </section>
  );
}

/* ---------------- LES AGENTS ---------------- */
function Agents() {
  return (
    <section
      id="agents"
      className="scroll-mt-24 border-y border-border bg-secondary/20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader
            eyebrow="Les composants"
            title="Trois agents, un seul système"
            subtitle="Ils ne fonctionnent pas isolément : chacun prend le relais du précédent et passe la main à votre équipe au moment prévu."
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {AGENT_BLOCKS.map((agent) => (
            <article
              key={agent.id}
              data-reveal
              className="ai-card ai-topline ai-card-hover relative flex flex-col p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                  <agent.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="font-display text-2xl font-extrabold text-muted-foreground/40">
                  {agent.index}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold leading-tight">{agent.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{agent.pitch}</p>

              <div className="mt-6 border-t border-border pt-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Ce qu'il fait
                </div>
                <ul className="mt-3 space-y-2.5">
                  {agent.does.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="text-foreground/90">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-xl border border-success/25 bg-success/8 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-success">
                  Ce que ça change
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{agent.changes}</p>
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-border bg-secondary/50 p-4">
                <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Reprise humaine
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {agent.handover}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MÉTIERS ---------------- */
function Sectors() {
  return (
    <section id="metiers" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader
            eyebrow="Selon votre activité"
            title="Le même système, des métiers différents"
            subtitle="Ce qui change d'un métier à l'autre, ce sont les règles et le vocabulaire. Le principe reste le même : répondre tout de suite, qualifier selon vos critères, puis passer la main au bon moment."
          />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTOR_CASES.map((sector) => (
            <div key={sector.name} data-reveal className="ai-card ai-card-hover flex flex-col p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/12 text-accent">
                <sector.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-bold">{sector.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sector.context}</p>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {sector.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          data-reveal
          className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground"
        >
          Votre métier n'est pas dans la liste ? Le diagnostic part de vos demandes réelles, pas
          d'un modèle préétabli.
        </p>
      </div>
    </section>
  );
}

/* ---------------- CATALOGUE D'AUTOMATISATIONS ---------------- */
function Automations() {
  return (
    <section id="automatisations" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader
            eyebrow="Le périmètre"
            title="Ce qui peut être automatisé, au-delà des trois agents"
            subtitle="Une fois vos outils connectés, la même mécanique traite bien plus que les demandes entrantes. Voici ce qui se met en place le plus souvent, par famille."
          />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATION_FAMILIES.map((family) => (
            <div key={family.title} data-reveal className="ai-card ai-card-hover p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-accent">
                  <family.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold">{family.title}</h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {family.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center" data-reveal>
          <PrimaryCta />
        </div>
      </div>
    </section>
  );
}

/* ---------------- AVANT / APRÈS ---------------- */
function BeforeAfter() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader
            eyebrow="Avant / après"
            title="Ce qui change dans le quotidien de vos équipes"
            subtitle="Aucun chiffre promis ici : les gains dépendent de votre volume de demandes et du périmètre déployé."
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div data-reveal className="ai-card p-7">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-destructive/12 text-destructive">
                <X className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold">Aujourd'hui</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px]">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            className="ai-card ai-topline relative border-accent/30 p-7"
            style={{ background: "oklch(0.74 0.18 300 / 0.07)" }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <Check className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold">Avec Sitaly</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {AFTER.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- DÉPLOIEMENT ---------------- */
function Deployment() {
  return (
    <section
      id="deploiement"
      className="scroll-mt-24 border-y border-border bg-secondary/20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader
            eyebrow="Déploiement"
            title="Une installation adaptée à votre entreprise, pas un agent générique"
            subtitle="Trois phases, dans cet ordre. On ne configure rien avant d'avoir regardé comment vos demandes circulent aujourd'hui."
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PHASES.map((phase) => (
            <div key={phase.step} data-reveal className="ai-card ai-card-hover flex flex-col p-7">
              <div className="flex items-center gap-4">
                <span className="font-display text-3xl font-extrabold text-accent">
                  {phase.step}
                </span>
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-secondary text-accent">
                  <phase.icon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold">{phase.title}</h3>
              <ul className="mt-5 space-y-3">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="ai-card mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <div className="font-display text-lg font-bold">
              Déploiement sur mesure après diagnostic
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Le périmètre, le calendrier et le budget sont chiffrés une fois vos demandes entrantes
              analysées.
            </p>
          </div>
          <PrimaryCta compact />
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTRÔLE HUMAIN & SÉCURITÉ ---------------- */
function Control() {
  return (
    <section id="controle" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        className="ai-halo left-1/2 top-10 h-[300px] w-[600px] -translate-x-1/2 opacity-20"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader
            eyebrow="Contrôle"
            title="L'IA agit. Votre équipe garde le contrôle."
            subtitle="Un agent n'est ni autonome ni infaillible. Il travaille dans un cadre que vous définissez, et ce cadre reste modifiable à tout moment."
          />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUARDRAILS.map((g) => (
            <div key={g.title} data-reveal className="ai-card ai-card-hover flex gap-4 p-6">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <g.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold leading-tight">{g.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- QUALIFICATION ---------------- */
function Fit() {
  return (
    <section className="border-y border-border bg-secondary/20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader
            eyebrow="À qui ça s'adresse"
            title="Conçu pour les entreprises qui ont déjà des demandes à traiter"
            subtitle="Un système commercial se justifie quand il y a du volume et de la valeur en jeu. En dessous, une bonne organisation suffit."
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal className="ai-card ai-topline relative border-accent/30 p-7">
            <h3 className="text-lg font-bold">Le bon profil</h3>
            <ul className="mt-6 space-y-4">
              {FIT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="ai-card p-7">
            <h3 className="text-lg font-bold text-muted-foreground">Ce n'est pas pour vous si</h3>
            <ul className="mt-6 space-y-4">
              {NOT_FIT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px]">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div data-reveal>
          <SectionHeader eyebrow="FAQ" title="Les questions posées avant de démarrer" />
        </div>
        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} data-reveal className="ai-card group p-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold marker:hidden">
                {item.q}
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-accent transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA FINAL + FORMULAIRE ---------------- */
function FinalCta() {
  return (
    <section id="diagnostic" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="ai-grid" aria-hidden="true" />
      <div
        className="ai-halo left-1/2 top-0 h-[360px] w-[700px] -translate-x-1/2"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div data-reveal>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Où perdez-vous aujourd'hui le plus de demandes ?
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
            Nous analysons votre parcours actuel, identifions le premier processus rentable à
            automatiser et définissons un périmètre de déploiement réaliste.
          </p>

          <ul className="mt-8 space-y-3.5 text-[15px]">
            {[
              "Analyse de vos demandes entrantes et de vos points de perte",
              "Un périmètre de départ chiffré, pas un devis global",
              "Aucune installation avant votre validation",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>

          <div className="ai-card mt-8 p-5">
            <div className="text-sm text-muted-foreground">Vous préférez parler directement ?</div>
            <a
              href={`tel:${SITALY_PHONE}`}
              className="mt-1 inline-flex items-center gap-2.5 py-1.5 font-display text-2xl font-extrabold tracking-tight transition hover:text-accent"
            >
              <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
              {SITALY_PHONE_DISPLAY}
            </a>
            <div className="mt-2">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2 text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                Réserver un créneau en ligne
              </a>
            </div>
          </div>
        </div>

        <div data-reveal>
          <DiagnosticForm />
        </div>
      </div>
    </section>
  );
}

const SECTORS = [
  "E-commerce et vente en ligne",
  "Santé et cabinets de soins",
  "Professions libérales et juridique",
  "Bâtiment et travaux",
  "Immobilier",
  "Agences, conseil et services",
  "Commerce et distribution",
  "Automobile",
  "Autre",
];

const VOLUMES = [
  "Moins de 50 demandes par mois",
  "50 à 150 demandes par mois",
  "150 à 500 demandes par mois",
  "Plus de 500 demandes par mois",
];

function DiagnosticForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) || "").trim();

    const body = [
      `Prénom et nom : ${get("fullName")}`,
      `Entreprise : ${get("company")}`,
      `Téléphone : ${get("phone")}`,
      `E-mail : ${get("email")}`,
      `Secteur : ${get("sector")}`,
      `Volume de demandes : ${get("volume")}`,
      "",
      "Principal problème à résoudre :",
      get("problem"),
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      "Demande de diagnostic — Agents IA",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="ai-card p-8 text-center sm:p-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
          <Send className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-xl font-bold">Votre demande est prête</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Votre messagerie s'ouvre avec le récapitulatif pré-rempli. Envoyez-le et nous revenons
          vers vous sous 24 heures ouvrées.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Rien ne s'est ouvert ?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ai-card p-6 sm:p-8">
      <h3 className="font-display text-xl font-bold">{CTA_LABEL}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Sept champs, deux minutes. Nous préparons l'échange à partir de vos réponses.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField label="Prénom et nom" name="fullName" autoComplete="name" required />
        <FormField label="Entreprise" name="company" autoComplete="organization" required />
        <FormField label="Téléphone" name="phone" type="tel" autoComplete="tel" required />
        <FormField
          label="E-mail professionnel"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <SelectField label="Secteur d'activité" name="sector" options={SECTORS} required />
        <SelectField label="Demandes par mois" name="volume" options={VOLUMES} required />
      </div>

      <div className="mt-4">
        <label htmlFor="ai-problem" className="text-sm font-medium">
          Principal problème à résoudre <span className="text-destructive">*</span>
        </label>
        <textarea
          id="ai-problem"
          name="problem"
          rows={4}
          required
          maxLength={800}
          placeholder="Par exemple : nous manquons des appels en journée et nos devis ne sont pas relancés."
          className="mt-1.5 w-full rounded-[10px] border border-input bg-background px-3.5 py-2.5 text-[15px] text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-accent"
        />
      </div>

      <button
        type="submit"
        className="ai-cta mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-base font-semibold"
      >
        {CTA_LABEL}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
        L'envoi ouvre votre messagerie avec le récapitulatif pré-rempli. Vos informations ne sont
        utilisées que pour préparer le diagnostic.
      </p>
    </form>
  );
}

function FormField({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const id = `ai-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        maxLength={150}
        className="mt-1.5 h-12 w-full rounded-[10px] border border-input bg-background px-3.5 text-[15px] text-foreground outline-none transition focus:border-accent"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  const id = `ai-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="mt-1.5 h-12 w-full rounded-[10px] border border-input bg-background px-3 text-[15px] text-foreground outline-none transition focus:border-accent"
      >
        <option value="" disabled>
          Sélectionner
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <SitalyLogo />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 text-sm text-muted-foreground">
            <Link to="/" className="inline-block py-2.5 transition hover:text-foreground">
              Accueil
            </Link>
            <a href="/#offre" className="inline-block py-2.5 transition hover:text-foreground">
              Offres
            </a>
            <Link to="/blog/" className="inline-block py-2.5 transition hover:text-foreground">
              Blog
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2.5 transition hover:text-foreground"
            >
              Parler de votre projet
            </a>
            <LinkedinLink className="h-9 w-9" />
          </nav>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Sitaly. Tous droits réservés.</div>
          <div className="flex flex-wrap justify-center gap-x-5">
            <Link to="/mentions-legales/" className="inline-block py-2.5 hover:text-foreground">
              Mentions légales
            </Link>
            <Link
              to="/politique-confidentialite/"
              className="inline-block py-2.5 hover:text-foreground"
            >
              Confidentialité
            </Link>
            <Link to="/cgv/" className="inline-block py-2.5 hover:text-foreground">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- ÉLÉMENTS PARTAGÉS ---------------- */
function PrimaryCta({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={CTA_ANCHOR}
      className={`ai-cta inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] font-semibold ${
        compact ? "px-6 py-3.5 text-[15px]" : "px-8 py-4 text-base"
      }`}
    >
      {CTA_LABEL}
      <ArrowRight className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
