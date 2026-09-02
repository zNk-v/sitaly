import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Bot,
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarClock,
  ChartColumn,
  ChartLine,
  Check,
  ClipboardList,
  Clock,
  Compass,
  Eye,
  FileExclamationPoint,
  FileText,
  Funnel,
  HardHat,
  Inbox,
  ListChecks,
  Menu,
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
import { useEffect, useRef, useState, type RefObject } from "react";

import { LinkedInBadge } from "@/components/LinkedInBadge";
import { SitalyLogo } from "@/components/SitalyLogo";
import { WorkflowChart } from "@/components/WorkflowChart";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/config";

const CONTACT_EMAIL = "contact@sitaly.fr";
const CTA_HREF = "#diagnostic";
const CTA_LABEL = "Demander un diagnostic";

const RAIL = [
  {
    icon: Inbox,
    label: "Demande entrante",
    detail: "Appel, formulaire ou message",
  },
  {
    icon: Bot,
    label: "Agent IA",
    detail: "Répond immédiatement",
  },
  {
    icon: ListChecks,
    label: "Qualification",
    detail: "Vos critères, vos règles",
  },
  {
    icon: CalendarCheck,
    label: "Rendez-vous",
    detail: "Créneau proposé et confirmé",
  },
  {
    icon: Users,
    label: "Équipe humaine",
    detail: "Reprise avec le contexte",
  },
  {
    icon: ChartLine,
    label: "Suivi",
    detail: "Relance et résultats mesurés",
  },
] as const;

const CANAUX = [
  {
    icon: Phone,
    label: "Appels",
  },
  {
    icon: ClipboardList,
    label: "Formulaires",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
  },
  {
    icon: MessageSquare,
    label: "Messages",
  },
  {
    icon: CalendarCheck,
    label: "Prise de rendez-vous",
  },
  {
    icon: Send,
    label: "E-mails",
  },
  {
    icon: Repeat,
    label: "Relance",
  },
  {
    icon: FileText,
    label: "Mise à jour de vos outils",
  },
  {
    icon: UserCheck,
    label: "Transfert humain",
  },
  {
    icon: ChartColumn,
    label: "Suivi des conversions",
  },
] as const;

const PERTES = [
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
    icon: Funnel,
    title: "Prospects mal qualifiés",
    text: "Vos équipes passent autant de temps sur une demande hors zone ou hors budget que sur une affaire sérieuse.",
  },
  {
    icon: CalendarClock,
    title: "Rendez-vous non confirmés",
    text: "Un créneau posé sans rappel ni confirmation devient un déplacement pour rien ou un créneau perdu.",
  },
  {
    icon: FileExclamationPoint,
    title: "Propositions sans suite",
    text: "Le devis, la proposition ou le dossier part, puis plus rien. La relance dépend de la mémoire de celui qui l'a envoyé.",
  },
  {
    icon: Eye,
    title: "Aucune visibilité",
    text: "Impossible de dire combien de demandes sont arrivées, combien ont abouti, et à quelle étape les autres se sont arrêtées.",
  },
] as const;

const ETAPES = [
  {
    step: "01",
    text: "Un client appelle, écrit ou remplit un formulaire.",
  },
  {
    step: "02",
    text: "L'agent répond immédiatement, sur le canal utilisé.",
  },
  {
    step: "03",
    text: "Il recueille les informations utiles au traitement.",
  },
  {
    step: "04",
    text: "Il qualifie la demande selon vos règles métier.",
  },
  {
    step: "05",
    text: "Il propose un rendez-vous ou transfère à un humain.",
  },
  {
    step: "06",
    text: "Il enregistre les informations dans vos outils.",
  },
  {
    step: "07",
    text: "Il relance quand la demande reste sans suite.",
  },
  {
    step: "08",
    text: "Vous suivez les résultats étape par étape.",
  },
] as const;

const AGENTS = [
  {
    icon: Phone,
    index: "01",
    name: "Agent d'accueil",
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
    icon: ListChecks,
    index: "02",
    name: "Agent de qualification et rendez-vous",
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
    icon: Repeat,
    index: "03",
    name: "Agent de relance",
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
] as const;

const METIERS = [
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
] as const;

const PERIMETRE = [
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
    icon: ChartColumn,
    title: "Pilotage",
    items: [
      "Suivi des demandes reçues, traitées et perdues",
      "Rapport hebdomadaire envoyé automatiquement",
      "Contrôle des délais de réponse",
      "Alerte quand un indicateur décroche",
    ],
  },
] as const;

const AUJOURDHUI = [
  "Informations dispersées entre boîte mail, téléphone et carnet",
  "Appels sans réponse en dehors des heures de bureau",
  "Ressaisie manuelle des mêmes informations",
  "Relances irrégulières, quand quelqu'un y pense",
  "Aucune vision globale sur les demandes reçues",
] as const;

const AVEC_SITALY = [
  "Réponse immédiate sur chaque canal traité",
  "Informations structurées au même endroit",
  "Rendez-vous préparés avec le contexte de la demande",
  "Relances systématiques selon vos règles",
  "Équipe concentrée sur les demandes importantes",
] as const;

const DEPLOIEMENT = [
  {
    icon: Compass,
    step: "01",
    title: "Diagnostic",
    items: [
      "Analyse de vos demandes entrantes",
      "Identification des pertes et des tâches répétitives",
      "Définition des règles métier",
      "Choix du premier périmètre rentable",
    ],
  },
  {
    icon: SlidersHorizontal,
    step: "02",
    title: "Déploiement",
    items: [
      "Configuration des agents",
      "Connexion aux outils compatibles",
      "Création des scénarios et tests",
      "Formation de l'équipe et mise en production progressive",
    ],
  },
  {
    icon: ChartLine,
    step: "03",
    title: "Pilotage",
    items: [
      "Analyse des conversations",
      "Correction des erreurs constatées",
      "Amélioration des règles",
      "Suivi des résultats et extension du périmètre",
    ],
  },
] as const;

const CONTROLE = [
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
] as const;

const BON_PROFIL = [
  "Un volume régulier d'appels, de messages, de commandes ou de demandes de rendez-vous",
  "Une valeur commerciale importante par demande traitée",
  "Une équipe qui perd du temps sur la qualification et la relance",
  "Des outils existants à connecter au parcours",
  "La volonté de mesurer les résultats et d'ajuster",
] as const;

const PAS_POUR_VOUS = [
  "Vous cherchez un chatbot à installer vous-même pour quelques euros par mois",
  "Vous recevez trop peu de demandes pour qu'un processus se justifie",
  "Vous ne souhaitez ni définir de règles ni relire les conversations",
] as const;

const SECTEURS = [
  "E-commerce et vente en ligne",
  "Santé et cabinets de soins",
  "Professions libérales et juridique",
  "Bâtiment et travaux",
  "Immobilier",
  "Agences, conseil et services",
  "Commerce et distribution",
  "Automobile",
  "Autre",
] as const;

const VOLUMES = [
  "Moins de 50 demandes par mois",
  "50 à 150 demandes par mois",
  "150 à 500 demandes par mois",
  "Plus de 500 demandes par mois",
] as const;

const FAQ = [
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
] as const;

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
          mainEntity: FAQ.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      },
    ],
  }),
  component: AgentsIaPage,
});

/**
 * Apparition au défilement. Les blocs marqués `data-reveal` partent décalés et
 * remontent quand ils entrent dans le champ ; ceux déjà visibles au chargement
 * sont affichés immédiatement, sinon le haut de page resterait vide. La classe
 * `ai-anim` n'est posée qu'ici : sans JavaScript, rien n'est masqué.
 */
function useRevealOnScroll(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!targets.length) return;

    const fold = window.innerHeight;
    for (const t of targets) {
      if (t.getBoundingClientRect().top < fold) t.classList.add("is-in");
    }
    el.classList.add("ai-anim");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    for (const t of targets) io.observe(t);
    return () => io.disconnect();
  }, [root]);
}

function AgentsIaPage() {
  const root = useRef<HTMLDivElement>(null);
  useRevealOnScroll(root);

  return (
    <div ref={root} className="ai-page min-h-screen">
      <AiNav />
      <main>
        <Hero />
        <Canaux />
        <Pertes />
        <Metiers />
        <Systeme />
        <Composants />
        <Perimetre />
        <AvantApres />
        <Deploiement />
        <Controle />
        <Profil />
        <Faq />
        <Diagnostic />
      </main>
      <AiFooter />
    </div>
  );
}

/* ---------------- EN-TÊTE ---------------- */
function AiNav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Offres", href: "/#offre" },
    { label: "Métiers", href: "#metiers" },
    { label: "Le système", href: "#systeme" },
  ];

  return (
    <div className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <header className="relative mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Link to="/" aria-label="Sitaly — accueil" className="flex items-center py-3">
          <SitalyLogo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="/#offre"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Offres
          </a>
          {/* Page courante : un lien vers soi-même n'aide personne. */}
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
            to="/blog"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm font-semibold text-foreground shadow-soft transition hover:border-accent hover:text-accent sm:px-4"
            aria-label={`Appeler Sitaly au ${PHONE_DISPLAY}`}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden lg:inline">{PHONE_DISPLAY}</span>
            <span className="lg:hidden">Appeler</span>
          </a>
          <a
            href={CTA_HREF}
            className="ai-cta hidden h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold sm:inline-flex"
          >
            {CTA_LABEL}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:border-accent md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div
            id="menu-mobile"
            className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-border bg-background p-4 shadow-elevated md:hidden"
          >
            <nav className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/70 py-3 text-sm font-medium text-muted-foreground"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/blog"
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-muted-foreground"
              >
                Blog
              </Link>
            </nav>
            <a
              href={CTA_HREF}
              onClick={() => setOpen(false)}
              className="ai-cta mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
            >
              {CTA_LABEL}
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

/* ---------------- EN-TÊTE DE SECTION ---------------- */
function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div data-reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </span>
        <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
          {title}
        </h2>
        {text && (
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground sm:text-lg">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

function CtaButton({ className = "px-8 py-4 text-base" }: { className?: string }) {
  return (
    <a
      href={CTA_HREF}
      className={`ai-cta inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] font-semibold ${className}`}
    >
      {CTA_LABEL}
      <ArrowRight className="h-5 w-5" />
    </a>
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
              <Sparkles className="h-3.5 w-3.5 text-accent" />
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
                href={CTA_HREF}
                className="ai-cta inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-4 text-base font-semibold"
              >
                {CTA_LABEL}
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#systeme"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-border bg-card px-7 py-4 text-base font-semibold text-foreground transition hover:border-accent/50 hover:bg-secondary"
              >
                Voir le système en action
              </a>
            </div>
          </div>

          {/* Conversation type plutôt qu'une promesse : on montre ce que l'agent
              collecte et ce qu'il transmet, pas un slogan sur l'IA. */}
          <div data-reveal>
            <div className="relative mx-auto w-full max-w-md">
              <div className="ai-halo -inset-6 opacity-25" aria-hidden="true" />
              <div className="ai-card relative overflow-hidden">
                <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-5 py-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                    <Bot className="h-5 w-5" />
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
                    « Bien sûr. Deux questions rapides, puis je vous propose un créneau avec la
                    bonne personne. »
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
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between gap-3">
                          <dt className="text-muted-foreground">{k}</dt>
                          <dd className="font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-3.5 py-2.5 text-sm font-medium">
                    <CalendarCheck className="h-4 w-4 shrink-0 text-success" />
                    Rendez-vous confirmé, résumé transmis à l'équipe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-card mt-14 p-6 sm:p-8" data-reveal>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Le parcours d'une demande entrante
          </div>
          <div className="mt-6">
            <ol className="ai-rail">
              {RAIL.map((step, i) => (
                <li key={step.label} className="ai-rail-step">
                  <div className="relative z-10 grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-border bg-card text-accent">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-secondary text-[10px] font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-tight">{step.label}</div>
                    <div className="mt-1 text-[13px] leading-snug text-muted-foreground">
                      {step.detail}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CANAUX ---------------- */
function Canaux() {
  return (
    <section
      className="border-y border-border bg-secondary/20 py-8"
      aria-label="Canaux et fonctions traités"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-4">
          {CANAUX.map((c) => (
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

/* ---------------- LE POINT DE DÉPART ---------------- */
function Pertes() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Le point de départ"
          title="Les demandes arrivent. Mais combien deviennent réellement des clients ?"
          text="Le problème n'est pas le manque d'intelligence artificielle. Ce sont les opportunités qui se perdent entre le moment où un prospect vous contacte et celui où l'affaire se signe."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERTES.map((p) => (
            <div key={p.title} data-reveal className="ai-card ai-card-hover flex flex-col p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-destructive/12 text-destructive">
                <p.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MÉTIERS ---------------- */
function Metiers() {
  return (
    <section id="metiers" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Selon votre activité"
          title="Le même système, des métiers différents"
          text="Ce qui change d'un métier à l'autre, ce sont les règles et le vocabulaire. Le principe reste le même : répondre tout de suite, qualifier selon vos critères, puis passer la main au bon moment."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METIERS.map((m) => (
            <div key={m.name} data-reveal className="ai-card ai-card-hover flex flex-col p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/12 text-accent">
                <m.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-bold">{m.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.context}</p>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {m.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-foreground/90">{it}</span>
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

/* ---------------- LE SYSTÈME ---------------- */
function Systeme() {
  return (
    <section id="systeme" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Le système Sitaly"
          title="Un système connecté à chaque étape de votre parcours commercial"
          text="Chaque agent est un scénario branché à vos outils : téléphonie, agenda, CRM, messagerie. Choisissez un scénario pour voir le trajet complet d'une demande."
        />
        <div className="mt-14" data-reveal>
          <WorkflowChart />
        </div>
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e) => (
            <li key={e.step} data-reveal className="ai-card p-5">
              <div className="font-display text-sm font-extrabold text-accent">{e.step}</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{e.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center" data-reveal>
          <CtaButton />
        </div>
      </div>
    </section>
  );
}

/* ---------------- LES COMPOSANTS ---------------- */
function Composants() {
  return (
    <section
      id="agents"
      className="scroll-mt-24 border-y border-border bg-secondary/20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Les composants"
          title="Trois agents, un seul système"
          text="Ils ne fonctionnent pas isolément : chacun prend le relais du précédent et passe la main à votre équipe au moment prévu."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <article
              key={a.name}
              data-reveal
              className="ai-card ai-topline ai-card-hover relative flex flex-col p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                  <a.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="font-display text-2xl font-extrabold text-muted-foreground/40">
                  {a.index}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold leading-tight">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.pitch}</p>
              <div className="mt-6 border-t border-border pt-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Ce qu'il fait
                </div>
                <ul className="mt-3 space-y-2.5">
                  {a.does.map((d) => (
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
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{a.changes}</p>
              </div>
              {/* La reprise humaine est annoncée sur chaque agent : c'est la
                  première objection, autant y répondre au même endroit. */}
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-border bg-secondary/50 p-4">
                <UserCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Reprise humaine
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.handover}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- LE PÉRIMÈTRE ---------------- */
function Perimetre() {
  return (
    <section id="automatisations" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Le périmètre"
          title="Ce qui peut être automatisé, au-delà des trois agents"
          text="Une fois vos outils connectés, la même mécanique traite bien plus que les demandes entrantes. Voici ce qui se met en place le plus souvent, par famille."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERIMETRE.map((f) => (
            <div key={f.title} data-reveal className="ai-card ai-card-hover p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-accent">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold">{f.title}</h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {f.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span className="text-foreground/90">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center" data-reveal>
          <CtaButton />
        </div>
      </div>
    </section>
  );
}

/* ---------------- AVANT / APRÈS ---------------- */
function AvantApres() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Avant / après"
          title="Ce qui change dans le quotidien de vos équipes"
          text="Aucun chiffre promis ici : les gains dépendent de votre volume de demandes et du périmètre déployé."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div data-reveal className="ai-card p-7">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-destructive/12 text-destructive">
                <X className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold">Aujourd'hui</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {AUJOURDHUI.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px]">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                  <span className="text-muted-foreground">{t}</span>
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
              {AVEC_SITALY.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-foreground/90">{t}</span>
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
function Deploiement() {
  return (
    <section
      id="deploiement"
      className="scroll-mt-24 border-y border-border bg-secondary/20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Déploiement"
          title="Une installation adaptée à votre entreprise, pas un agent générique"
          text="Trois phases, dans cet ordre. On ne configure rien avant d'avoir regardé comment vos demandes circulent aujourd'hui."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {DEPLOIEMENT.map((phase) => (
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
                {phase.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-muted-foreground">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Pas de grille tarifaire : le périmètre n'existe qu'après le diagnostic,
            annoncer un prix avant reviendrait à vendre un forfait générique. */}
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
          <CtaButton className="px-6 py-3.5 text-[15px]" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTRÔLE ---------------- */
function Controle() {
  return (
    <section id="controle" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        className="ai-halo left-1/2 top-10 h-[300px] w-[600px] -translate-x-1/2 opacity-20"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Contrôle"
          title="L'IA agit. Votre équipe garde le contrôle."
          text="Un agent n'est ni autonome ni infaillible. Il travaille dans un cadre que vous définissez, et ce cadre reste modifiable à tout moment."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTROLE.map((c) => (
            <div key={c.title} data-reveal className="ai-card ai-card-hover flex gap-4 p-6">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <c.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold leading-tight">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- À QUI ÇA S'ADRESSE ---------------- */
function Profil() {
  return (
    <section className="border-y border-border bg-secondary/20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="À qui ça s'adresse"
          title="Conçu pour les entreprises qui ont déjà des demandes à traiter"
          text="Un système commercial se justifie quand il y a du volume et de la valeur en jeu. En dessous, une bonne organisation suffit."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal className="ai-card ai-topline relative border-accent/30 p-7">
            <h3 className="text-lg font-bold">Le bon profil</h3>
            <ul className="mt-6 space-y-4">
              {BON_PROFIL.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Dire à qui ça ne s'adresse pas évite des rendez-vous perdus des deux côtés. */}
          <div data-reveal className="ai-card p-7">
            <h3 className="text-lg font-bold text-muted-foreground">Ce n'est pas pour vous si</h3>
            <ul className="mt-6 space-y-4">
              {PAS_POUR_VOUS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px]">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">{t}</span>
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
        <SectionIntro eyebrow="FAQ" title="Les questions posées avant de démarrer" />
        <div className="mt-12 space-y-3">
          {FAQ.map((it) => (
            <details key={it.q} data-reveal className="ai-card group p-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold marker:hidden">
                {it.q}
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-accent transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- DIAGNOSTIC ---------------- */
function Diagnostic() {
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
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-foreground/90">{t}</span>
              </li>
            ))}
          </ul>
          <div className="ai-card mt-8 p-5">
            <div className="text-sm text-muted-foreground">Vous préférez parler directement ?</div>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-1 inline-flex items-center gap-2.5 py-1.5 font-display text-2xl font-extrabold tracking-tight transition hover:text-accent"
            >
              <Phone className="h-5 w-5 text-accent" />
              {PHONE_DISPLAY}
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

function Field({
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
  return (
    <div>
      <label htmlFor={`ai-${name}`} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={`ai-${name}`}
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
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={`ai-${name}`} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select
        id={`ai-${name}`}
        name={name}
        required={required}
        defaultValue=""
        className="mt-1.5 h-12 w-full rounded-[10px] border border-input bg-background px-3 text-[15px] text-foreground outline-none transition focus:border-accent"
      >
        <option value="" disabled>
          Sélectionner
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Le formulaire n'envoie rien lui-même : il compose un e-mail pré-rempli et
 * ouvre la messagerie du visiteur. Pas de service tiers à faire consentir,
 * pas de serveur à maintenir pour un site statique, et la demande arrive
 * depuis l'adresse du prospect — donc directement répondable.
 */
function DiagnosticForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (k: string) => String(data.get(k) || "").trim();
    const body = [
      `Prénom et nom : ${value("fullName")}`,
      `Entreprise : ${value("company")}`,
      `Téléphone : ${value("phone")}`,
      `E-mail : ${value("email")}`,
      `Secteur : ${value("sector")}`,
      `Volume de demandes : ${value("volume")}`,
      ``,
      `Principal problème à résoudre :`,
      value("problem"),
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=Demande%20de%20diagnostic%20%E2%80%94%20Agents%20IA&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="ai-card p-8 text-center sm:p-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
          <Check className="h-6 w-6" aria-hidden="true" />
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
        <Field label="Prénom et nom" name="fullName" autoComplete="name" required />
        <Field label="Entreprise" name="company" autoComplete="organization" required />
        <Field label="Téléphone" name="phone" type="tel" autoComplete="tel" required />
        <Field
          label="E-mail professionnel"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <SelectField label="Secteur d'activité" name="sector" options={SECTEURS} required />
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
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
        L'envoi ouvre votre messagerie avec le récapitulatif pré-rempli. Vos informations ne sont
        utilisées que pour préparer le diagnostic.
      </p>
    </form>
  );
}

/* ---------------- PIED DE PAGE ---------------- */
function AiFooter() {
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
            <Link to="/blog" className="inline-block py-2.5 transition hover:text-foreground">
              Blog
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2.5 transition hover:text-foreground"
            >
              Réserver un appel
            </a>
            <LinkedInBadge className="h-9 w-9" />
          </nav>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Sitaly. Tous droits réservés.</div>
          <div className="flex flex-wrap justify-center gap-x-5">
            <Link to="/mentions-legales" className="inline-block py-2.5 hover:text-foreground">
              Mentions légales
            </Link>
            <Link
              to="/politique-confidentialite"
              className="inline-block py-2.5 hover:text-foreground"
            >
              Confidentialité
            </Link>
            <Link to="/cgv" className="inline-block py-2.5 hover:text-foreground">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
