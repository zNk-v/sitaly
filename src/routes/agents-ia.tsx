import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  Calendar,
  Check,
  Minus,
  ArrowRight,
  PhoneMissed,
  CalendarClock,
  MessageSquare,
  Star,
  Bot,
  Users,
  Rocket,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { CALENDLY_URL } from "@/lib/config";

/* Ombres bleutées très subtiles à la Wiza (≤ 32px de flou, ~6-8% d'opacité, teinte bleu-nuit) */
// Cartes & panneaux : pile en couches, flottement "ensoleillé" sans bordure lourde
const FRAME_SHADOW =
  "shadow-[0_32px_24px_-12px_rgba(20,40,92,0.08),0_6px_4px_-2px_rgba(20,40,92,0.03),0_3px_3px_rgba(20,40,92,0.03),0_1px_1px_rgba(20,40,92,0.04)]";
// Cartes standard
const CARD_SHADOW = "shadow-[0_16px_24px_-12px_rgba(20,40,92,0.07),0_2px_4px_rgba(20,40,92,0.04)]";
// Boutons & éléments de nav
const SOFT_SHADOW =
  "shadow-[0_2px_4px_rgba(20,40,92,0.08),0_1px_1px_rgba(20,40,92,0.04),0_0_0_1px_rgba(20,40,92,0.04)]";

const FAQ_ITEMS = [
  {
    q: "Je dois configurer quelque chose ?",
    a: "Non. Sitaly installe et paramètre chaque agent pour votre activité : numéro, messages, horaires, questions à poser. Vous nous confiez les informations une seule fois, on branche tout et l'agent tourne. Vous n'ouvrez aucun logiciel.",
  },
  {
    q: "Un pack ou des agents à l'unité ?",
    a: "Un pack revient moins cher qu'additionner les agents un par un, et couvre un besoin complet dès le départ. Si vous avez un seul besoin précis, prenez l'agent qui y répond : vous ajouterez les autres plus tard, à votre rythme.",
  },
  {
    q: "L'agent va-t-il remplacer le contact humain ?",
    a: "Non. L'agent prend le relais quand vous ne pouvez pas répondre : appel manqué, soir, chantier, week-end, pour ne perdre aucune demande. Vous gardez la main et rappelez vos clients quand vous le souhaitez.",
  },
  {
    q: "Combien de temps pour la mise en service ?",
    a: "Comptez quelques jours entre l'appel de cadrage et la mise en service. On installe le pack ou l'agent choisi, on teste, puis ça tourne. Vous n'avez rien à faire pendant l'installation.",
  },
  {
    q: "Et si je veux arrêter ?",
    a: "Sans engagement, comme le reste de Sitaly. Vous pouvez retirer un agent ou un pack à tout moment avec un simple préavis, sans frais ni durée minimale.",
  },
];

export const Route = createFileRoute("/agents-ia")({
  head: () => ({
    meta: [
      { title: "Agents IA pour artisans & TPE | Sitaly" },
      {
        name: "description",
        content:
          "Une équipe d'agents IA installés clé en main par Sitaly : standardiste, prise de rendez-vous, relance de devis, messages. Des packs pensés pour les artisans et TPE, ou des agents à l'unité. Réservez un appel.",
      },
      { property: "og:title", content: "Agents IA pour artisans & TPE | Sitaly" },
      {
        property: "og:description",
        content:
          "Des agents IA installés clé en main : packs prêts à l'emploi ou agents à l'unité. Ils répondent, qualifient, relancent et prennent les rendez-vous à votre place. Réservez un appel.",
      },
      { property: "og:url", content: "https://sitaly.fr/agents-ia" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/agents-ia" }],
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Packs />
      <Comparatif />
      <AgentsUnit />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------------- NAV (flottante, blanche, sticky) ---------------- */
function Nav() {
  return (
    <div className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <header
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-border/70 bg-background/80 px-4 backdrop-blur-md sm:px-6 ${SOFT_SHADOW}`}
      >
        <Link to="/" className="flex items-center" aria-label="Sitaly — accueil">
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
            className="rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
          >
            Agents IA
          </span>
          <a
            href="/#exemples"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Exemples
          </a>
          <Link
            to="/blog"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            Blog
          </Link>
        </nav>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 ${SOFT_SHADOW}`}
        >
          <Calendar className="h-4 w-4" />
          Réserver un appel
        </a>
      </header>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground ${SOFT_SHADOW}`}
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Nouveau — Une équipe IA installée clé en main
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Une équipe d'agents IA à votre service.{" "}
              <span className="gradient-text">Pendant que vous travaillez.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              De vrais collaborateurs virtuels pour votre activité : ils décrochent quand vous êtes
              sur un chantier, prennent vos rendez-vous et relancent vos devis.{" "}
              <strong className="text-foreground">Vous ne configurez rien</strong>, on branche tout.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#packs"
                className={`inline-flex items-center justify-center gap-2 rounded-[8px] bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition hover:opacity-90 ${CARD_SHADOW}`}
              >
                Voir les packs
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition hover:bg-secondary"
              >
                <Calendar className="h-5 w-5" />
                Réserver un appel
              </a>
            </div>

            <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-[15px]">
              {["Zéro appel manqué", "Installé pour vous", "Sans engagement", "Réponses 24/7"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2 text-foreground/90">
                    <Check className="h-4 w-4 shrink-0 text-success" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="relative">
            <HeroMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 rounded-[16px] bg-gradient-to-br from-accent/15 to-primary/15 blur-2xl" />
      <div className={`relative overflow-hidden rounded-[8px] bg-card ${FRAME_SHADOW}`}>
        <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-5 py-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-accent/12 text-accent">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">Agent standardiste</div>
            <div className="flex items-center gap-1.5 text-xs text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              En ligne · répond en 2 sonneries
            </div>
          </div>
        </div>
        <div className="space-y-3 p-5">
          <div className="max-w-[80%] rounded-[8px] rounded-tl-none bg-secondary px-3.5 py-2.5 text-sm text-foreground/80">
            « Bonjour, avez-vous une dispo cette semaine pour un dépannage ? »
          </div>
          <div className="ml-auto max-w-[85%] rounded-[8px] rounded-tr-none bg-accent/10 px-3.5 py-2.5 text-sm text-foreground">
            « Bien sûr. Je vous propose jeudi 14h ou vendredi 9h. Quel créneau vous arrange ? »
          </div>
          <div className="max-w-[60%] rounded-[8px] rounded-tl-none bg-secondary px-3.5 py-2.5 text-sm text-foreground/80">
            « Jeudi 14h, parfait. »
          </div>
          <div className="flex items-center gap-2 rounded-[8px] border border-success/30 bg-success/10 px-3.5 py-2.5 text-sm font-medium text-foreground">
            <CalendarClock className="h-4 w-4 shrink-0 text-success" />
            Rendez-vous confirmé · jeudi 14h
          </div>
        </div>
      </div>

      <div
        className={`animate-float absolute -bottom-6 -left-6 hidden rounded-[8px] border border-border bg-card p-3 sm:flex sm:items-center sm:gap-3 ${CARD_SHADOW}`}
      >
        <div className="grid h-10 w-10 place-items-center rounded-full bg-success/15 text-success">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Appel pris en charge</div>
          <div className="text-sm font-semibold">1 rendez-vous en plus</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PACKS ---------------- */
type Pack = {
  name: string;
  badge: string;
  featured: boolean;
  icon: typeof Bot;
  desc: string;
  features: string[];
  install: string;
  monthly: string;
};

const PACKS: Pack[] = [
  {
    name: "Pack Essentiel",
    badge: "Le plus simple",
    featured: false,
    icon: Bot,
    desc: "Automatisez votre accueil client et ne perdez plus aucun contact.",
    features: ["Agent Standardiste", "Agent Prise de rendez-vous", "Agent Appels manqués"],
    install: "990 €",
    monthly: "149 €",
  },
  {
    name: "Pack Performance",
    badge: "Le plus populaire",
    featured: true,
    icon: Users,
    desc: "Automatisez votre accueil et votre suivi commercial.",
    features: [
      "Agent Standardiste",
      "Agent Prise de rendez-vous",
      "Agent Relance de devis",
      "Agent Appels manqués",
    ],
    install: "1 490 €",
    monthly: "249 €",
  },
  {
    name: "Pack Croissance",
    badge: "Automatisation complète",
    featured: false,
    icon: Rocket,
    desc: "Confiez la majorité des tâches répétitives à votre équipe IA.",
    features: ["Tous les agents IA", "Optimisations continues", "Support prioritaire"],
    install: "1 990 €",
    monthly: "349 €",
  },
];

function CardPack({ pack }: { pack: Pack }) {
  const { featured } = pack;
  return (
    <div
      className={`relative flex h-full flex-col rounded-[8px] bg-card p-7 sm:p-8 ${
        featured
          ? "shadow-glow border-2 border-accent lg:z-10 lg:scale-[1.03]"
          : `border border-border ${CARD_SHADOW}`
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-elevated">
          {pack.badge}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/12 text-accent">
          <pack.icon className="h-6 w-6" />
        </div>
        {!featured && (
          <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {pack.badge}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold">{pack.name}</h3>
      <p className="mt-2 text-[15px] text-muted-foreground">{pack.desc}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {pack.monthly}
        </span>
        <span className="text-muted-foreground">/mois</span>
      </div>
      <p className="mt-1 text-sm font-medium text-foreground/70">+ {pack.install} d'installation</p>

      <ul className="mt-6 space-y-3">
        {pack.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[15px]">
            <Check className={`mt-0.5 h-5 w-5 shrink-0 ${featured ? "text-accent" : "text-success"}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex w-full items-center justify-center gap-2 rounded-[8px] px-6 py-3.5 text-base font-semibold transition ${
            featured
              ? `bg-accent text-accent-foreground hover:opacity-90 ${CARD_SHADOW}`
              : "border border-border bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          <Calendar className="h-5 w-5" />
          Choisir ce pack
        </a>
      </div>
    </div>
  );
}

function Packs() {
  return (
    <section id="packs" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Nos Packs IA"
          title="Une équipe IA qui travaille pour votre entreprise"
          subtitle="Commencez avec le pack adapté à votre activité. Ajoutez de nouveaux collaborateurs IA au fur et à mesure de votre croissance."
        />
        <div className="mx-auto mt-16 grid max-w-5xl items-stretch gap-6 md:grid-cols-3 lg:gap-8">
          {PACKS.map((p) => (
            <CardPack key={p.name} pack={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPARATIF ---------------- */
const PACK_COLS = ["Essentiel", "Performance", "Croissance"];
const COMPARISON: { feature: string; vals: [boolean, boolean, boolean] }[] = [
  { feature: "Standardiste", vals: [true, true, true] },
  { feature: "Prise de rendez-vous", vals: [true, true, true] },
  { feature: "Relance devis", vals: [false, true, true] },
  { feature: "Messages & Réseaux", vals: [false, false, true] },
  { feature: "Avis Google", vals: [false, false, true] },
  { feature: "SMS appels manqués", vals: [true, true, true] },
  { feature: "Support prioritaire", vals: [false, false, true] },
  { feature: "Optimisation continue", vals: [false, false, true] },
];

function PricingTable() {
  return (
    <div className="mx-auto mt-14 max-w-4xl">
      <div className={`overflow-x-auto rounded-[8px] border border-border bg-card ${CARD_SHADOW}`}>
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-5 py-4 font-semibold text-muted-foreground">
                Inclus dans le pack
              </th>
              {PACK_COLS.map((c, i) => (
                <th
                  scope="col"
                  key={c}
                  className={`px-5 py-4 text-center font-bold ${
                    i === 1 ? "bg-accent/5 text-accent" : "text-foreground"
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.feature} className="border-b border-border last:border-0">
                <th scope="row" className="px-5 py-3.5 text-left font-medium text-foreground">
                  {row.feature}
                </th>
                {row.vals.map((v, i) => (
                  <td
                    key={i}
                    className={`px-5 py-3.5 text-center ${i === 1 ? "bg-accent/5" : ""}`}
                  >
                    {v ? (
                      <Check className="mx-auto h-5 w-5 text-accent" aria-label="Inclus" />
                    ) : (
                      <Minus
                        className="mx-auto h-4 w-4 text-muted-foreground/40"
                        aria-label="Non inclus"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Comparatif() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Comparatif"
          title="Ce que contient chaque pack"
          subtitle="Trois niveaux d'automatisation. Vous montez d'un cran quand votre activité grandit."
        />
        <PricingTable />
      </div>
    </section>
  );
}

/* ---------------- AGENTS À L'UNITÉ ---------------- */
type Agent = {
  icon: typeof Bot;
  name: string;
  desc: string;
  outcome: string;
  install: string;
  monthly: string;
};

const AGENTS: Agent[] = [
  {
    icon: Bot,
    name: "Agent Standardiste",
    desc: "Il décroche à votre place, répond aux questions courantes, qualifie la demande et propose un créneau.",
    outcome: "Plus aucun appel manqué",
    install: "490 €",
    monthly: "149 €",
  },
  {
    icon: CalendarClock,
    name: "Agent Prise de rendez-vous",
    desc: "Il propose vos créneaux disponibles, confirme le rendez-vous et envoie les rappels automatiquement.",
    outcome: "Un agenda qui se remplit seul",
    install: "390 €",
    monthly: "99 €",
  },
  {
    icon: ClipboardCheck,
    name: "Agent Relance de devis",
    desc: "Il relance vos devis en attente au bon moment, avec le bon message, et vous prévient dès qu'un client répond.",
    outcome: "Plus de devis signés",
    install: "390 €",
    monthly: "119 €",
  },
  {
    icon: MessageSquare,
    name: "Agent Messages & Réseaux",
    desc: "Il répond aux messages entrants (formulaire, WhatsApp, Instagram), qualifie le besoin et bascule vers un rendez-vous.",
    outcome: "Une réponse en quelques secondes",
    install: "290 €",
    monthly: "79 €",
  },
  {
    icon: Star,
    name: "Agent Avis Google",
    desc: "Il sollicite un avis après chaque intervention et répond aux avis reçus pour renforcer votre visibilité locale.",
    outcome: "Plus d'avis, mieux classé",
    install: "190 €",
    monthly: "39 €",
  },
  {
    icon: PhoneMissed,
    name: "Agent Appels manqués",
    desc: "Dès qu'un appel est manqué, il envoie un SMS automatique pour garder le contact et proposer de rappeler ou réserver.",
    outcome: "Le lien n'est jamais rompu",
    install: "190 €",
    monthly: "49 €",
  },
];

function CardAgent({ agent }: { agent: Agent }) {
  return (
    <div
      className={`flex flex-col rounded-[8px] border border-border bg-card p-5 transition hover:-translate-y-1 ${CARD_SHADOW}`}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
          <agent.icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold leading-tight">{agent.name}</h3>
      </div>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{agent.desc}</p>
      <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-accent">
        <Check className="h-4 w-4 shrink-0" />
        {agent.outcome}
      </div>
      <div className="mt-4 flex items-baseline gap-1 border-t border-border pt-4">
        <span className="font-display text-2xl font-extrabold">{agent.monthly}</span>
        <span className="text-sm text-muted-foreground">/mois</span>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">+ {agent.install} d'installation</p>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-[8px] border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
      >
        Découvrir
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function AgentsUnit() {
  return (
    <section id="agents" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="À la carte"
          title="Vous avez seulement besoin d'un agent ?"
          subtitle="Commencez avec un seul collaborateur IA et faites évoluer votre automatisation à votre rythme."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <CardAgent key={a.name} agent={a} />
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-[8px] border border-border bg-secondary/40 p-6 text-center">
          <p className="text-sm font-medium text-foreground/80">
            Toutes les offres incluent la configuration personnalisée, les tests, la mise en service,
            les mises à jour, la maintenance et un volume d'utilisation mensuel.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Les consommations dépassant le forfait inclus (appels, SMS ou conversations IA) peuvent
            faire l'objet d'une facturation complémentaire.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Les questions qu'on nous pose"
          subtitle="Et si vous en avez d'autres, on y répond de vive voix pendant l'appel."
        />
        <div className="mt-12 space-y-4">
          {FAQ_ITEMS.map((it) => (
            <div key={it.q} className={`rounded-[8px] border border-border bg-card p-6 ${SOFT_SHADOW}`}>
              <h3 className="font-semibold">{it.q}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 hero-bg" />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Prêt à ne plus rien laisser passer ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Réservez un appel de 20 minutes. On identifie ensemble le pack ou l'agent à installer et ce
          qu'il vous rapporte. Sans engagement, ni démarchage.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-[8px] bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition hover:opacity-90 ${CARD_SHADOW}`}
          >
            <Calendar className="h-5 w-5" />
            Réserver un appel
          </a>
          <a
            href="tel:+33658683372"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-border bg-card px-8 py-4 text-base font-semibold text-foreground transition hover:bg-secondary"
          >
            <Phone className="h-5 w-5" />
            06 58 68 33 72
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-12 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <SitalyLogo />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
            <Link to="/" className="transition hover:text-primary-foreground">Accueil</Link>
            <a href="/#offre" className="transition hover:text-primary-foreground">Offres</a>
            <Link to="/blog" className="transition hover:text-primary-foreground">Blog</Link>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-primary-foreground">
              Réserver un appel
            </a>
          </nav>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <div>© {new Date().getFullYear()} Sitaly. Tous droits réservés.</div>
          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/mentions-legales" className="hover:text-primary-foreground">Mentions légales</Link>
            <Link to="/politique-confidentialite" className="hover:text-primary-foreground">Confidentialité</Link>
            <Link to="/cgv" className="hover:text-primary-foreground">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SHARED ---------------- */
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
      <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}
