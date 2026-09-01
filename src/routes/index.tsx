import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Calendar,
  Check,
  ArrowRight,
  Search,
  Clock,
  Frown,
  TrendingUp,
  Shield,
  Star,
  ChevronDown,
  Sparkles,
  Mail,
  Globe,
  Target,
  Zap,
  Megaphone,
  Bell,
  Filter,
  MessageSquare,
  FileText,
  Instagram,
  Bot,
} from "lucide-react";
import exampleRenovation from "@/assets/example-renovation.jpg";
import examplePlombier from "@/assets/example-plombier.jpg";
import exampleElectricien from "@/assets/example-electricien.jpg";
import { SitalyLogo } from "@/components/SitalyLogo";
import { CALENDLY_URL } from "@/lib/config";

const FAQ_ITEMS = [
  {
    q: "Quel est le tarif ?",
    a: "Trois offres combinables, sans engagement et sans frais d'installation. Sitaly Présence (149€/mois) : votre site entretenu et bien référencé localement. Sitaly Acquisition (dès 299€/mois) : la gestion de vos campagnes Google Ads pour générer des clients, indépendamment du site, avec trois formules Starter (299€), Growth (499€) et Performance (799€). Sitaly Agents IA : des agents installés clé en main qui répondent, qualifient, prennent vos rendez-vous et relancent vos devis. Vous prenez l'une, plusieurs, ou tout. Le budget publicitaire Google reste séparé.",
  },
  {
    q: "Que comprennent vraiment les modifications incluses ?",
    a: "Les petites modifications de contenu existant sont incluses : changer un texte, une photo, un prix, des horaires ou vos coordonnées. Ce qui demande de la création — nouvelle page, nouveau visuel, rédaction d'articles — fait l'objet d'un devis transparent. Vous savez toujours à l'avance ce qui est inclus et ce qui ne l'est pas.",
  },
  {
    q: "Puis-je acheter mon site ?",
    a: "Sitaly fonctionne en location : c'est ce qui nous permet de tout gérer pour vous (technique, hébergement, mises à jour) et de rester sans engagement. Un rachat reste possible sur demande si vous le souhaitez.",
  },
  {
    q: "Combien de temps pour le mettre en ligne ?",
    a: "Votre site est livré en 48h après l'appel découverte et la fourniture des contenus.",
  },
  {
    q: "Puis-je arrêter mon abonnement ?",
    a: "Oui. Nos formules sont sans engagement : vous pouvez arrêter à tout moment avec un simple préavis, sans frais ni durée minimale.",
  },
  {
    q: "C'est quoi Google Ads et pourquoi en ai-je besoin ?",
    a: "Google Ads vous place en haut des résultats de recherche dès le premier jour, sans attendre le référencement naturel. On cible les personnes qui cherchent vos services dans votre zone, vous fixez le budget et vous gardez le contrôle. La gestion des campagnes fait l'objet des formules Sitaly Acquisition (le budget publicitaire reste à votre charge).",
  },
  {
    q: "L'automatisation est-elle obligatoire ?",
    a: "Non. Les automatisations — rappel SMS des appels manqués, relance automatique des devis, qualification des demandes, prise de rendez-vous en ligne — s'ajoutent en modules, selon vos besoins. On commence simple et on monte en puissance uniquement si ça vous fait gagner du temps.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sitaly | Sites web, Google Ads et automatisation pour générer plus de clients" },
      {
        name: "description",
        content:
          "Sitaly aide les artisans, indépendants et PME à obtenir plus de clients grâce à des sites internet performants, Google Ads et des automatisations simples. Développez votre activité avec un système conçu pour générer des appels et des demandes de devis.",
      },
      { property: "og:title", content: "Sitaly | Sites web, Google Ads et automatisation pour générer plus de clients" },
      {
        property: "og:description",
        content: "Sitaly aide les artisans, indépendants et PME à obtenir plus de clients grâce à des sites internet performants, Google Ads et des automatisations simples. Développez votre activité avec un système conçu pour générer des appels et des demandes de devis.",
      },
      { property: "og:url", content: "https://sitaly.fr/" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/" }],
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
  component: SitalyHome,
});

function SitalyHome() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <ProfessionsMarquee />
      <TrustBar />
      <Problem />
      <HowItWorks />
      <GoogleAds />
      <Automation />
      <Pricing />
      <BlogOption />
      <Options />
      <Examples />
      <Process />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center" aria-label="Sitaly — accueil">
          <SitalyLogo />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#offre" className="text-sm font-medium text-muted-foreground hover:text-foreground">Offres</a>
          <Link to="/agents-ia" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:opacity-80">
            <Sparkles className="h-3.5 w-3.5" />
            Agents IA
          </Link>
          <a href="#exemples" className="text-sm font-medium text-muted-foreground hover:text-foreground">Exemples</a>
          <a href="#process" className="text-sm font-medium text-muted-foreground hover:text-foreground">Process</a>
          <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground">Blog</Link>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">FAQ</a>
        </nav>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
        >
          <Calendar className="h-4 w-4" />
          Réserver un appel
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="hero-bg relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Pour artisans, indépendants & PME de services
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Plus de clients. Plus d'appels. <span className="gradient-text">Moins de temps perdu.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
              Sitaly met en place les outils qui vous apportent des clients : un <strong className="text-foreground">site internet performant</strong>, <strong className="text-foreground">Google Ads</strong> et des <strong className="text-foreground">automatisations</strong>. Votre site livré en <strong className="text-foreground">48h</strong>.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition hover:opacity-90"
              >
                <Calendar className="h-5 w-5" />
                Réserver un appel
              </a>
              <a
                href="#exemples"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition hover:bg-secondary"
              >
                Voir des exemples
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4 sm:text-[15px]">
              {[
                "Plus d'appels",
                "Plus de devis",
                "Visible sur Google",
                "Zéro temps perdu",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-foreground/90">
                  <Check className="h-4 w-4 shrink-0 text-success" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual mock */}
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
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
        <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <span className="ml-3 truncate rounded bg-background px-2 py-0.5 text-xs text-muted-foreground">
            votre-entreprise.fr
          </span>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 rounded bg-primary/90" />
            <div className="flex gap-2">
              <div className="h-3 w-10 rounded bg-muted" />
              <div className="h-3 w-10 rounded bg-muted" />
              <div className="h-3 w-10 rounded bg-muted" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-7 w-3/4 rounded bg-foreground/85" />
            <div className="h-7 w-2/3 rounded bg-foreground/85" />
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-5/6 rounded bg-muted" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-9 w-32 rounded-lg bg-accent" />
            <div className="h-9 w-28 rounded-lg border border-border" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <div className="mb-2 h-6 w-6 rounded bg-accent/20" />
                <div className="h-2 w-full rounded bg-muted" />
                <div className="mt-1 h-2 w-2/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* floating card */}
      <div className="animate-float absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card p-3 shadow-elevated sm:flex sm:items-center sm:gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-success/15 text-success">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Nouveau appel</div>
          <div className="text-sm font-semibold">+ 3 devis cette semaine</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PROFESSIONS MARQUEE ---------------- */
function ProfessionsMarquee() {
  const metiers = [
    "Artisans",
    "Ostéopathes",
    "Kinésithérapeutes",
    "Coachs sportifs",
    "Agents immobiliers",
    "Garages automobiles",
    "Restaurateurs",
    "Commerçants",
    "Avocats",
    "Experts-comptables",
    "Cabinets de recrutement",
    "Centres de formation",
    "Consultants",
    "PME de services",
    "Entrepreneurs",
  ];

  const Track = ({ hidden = false }: { hidden?: boolean }) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {metiers.map((m) => (
        <li key={m} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-base font-semibold text-foreground/80 sm:px-8 sm:text-lg">
            {m}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="border-y border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          Plus de clients pour votre activité,{" "}
          <span className="gradient-text">quel que soit votre métier</span>
        </h2>
      </div>
      <div className="marquee marquee-mask group relative mt-9 flex overflow-hidden">
        <div className="animate-marquee flex shrink-0">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { v: "Dès 149€", l: "par mois" },
    { v: "Google Ads", l: "+ automatisation" },
    { v: "48h", l: "Mise en ligne" },
    { v: "7j/7", l: "Support réactif" },
  ];
  return (
    <div className="border-y border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
        {items.map((i) => (
          <div key={i.l} className="bg-secondary/50 px-4 py-5 text-center">
            <div className="font-display text-xl font-bold text-foreground sm:text-2xl">{i.v}</div>
            <div className="text-xs text-muted-foreground sm:text-sm">{i.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- PROBLEM ---------------- */
function Problem() {
  const items = [
    {
      icon: Search,
      title: "Pas de site internet",
      desc: "Vos clients vous cherchent sur Google… et trouvent vos concurrents à votre place.",
    },
    {
      icon: Frown,
      title: "Site ancien ou amateur",
      desc: "Un site daté donne une mauvaise première impression et fait fuir les prospects sérieux.",
    },
    {
      icon: Clock,
      title: "Pas le temps de vous en occuper",
      desc: "Vous êtes artisan, pas développeur. Gérer un site, c'est une perte de temps et d'énergie.",
    },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Le constat"
          title="Votre site actuel vous fait perdre des clients"
          subtitle="Aujourd'hui, 8 clients sur 10 vérifient un site web avant de vous contacter."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:shadow-elevated"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: Search,
      title: "Attirer",
      benefit: "Être trouvé par vos futurs clients",
      points: [
        "Site internet professionnel",
        "Référencement local",
        "Google Business Profile",
        "Google Ads",
      ],
    },
    {
      n: "02",
      icon: Target,
      title: "Convertir",
      benefit: "Transformer les visiteurs en demandes",
      points: [
        "Pages optimisées",
        "Formulaires performants",
        "Appels à l'action efficaces",
      ],
    },
    {
      n: "03",
      icon: Zap,
      title: "Automatiser",
      benefit: "Gagner du temps sur le suivi",
      points: [
        "Réponse automatique aux demandes",
        "Qualification des prospects",
        "Relance des devis",
        "Prise de rendez-vous",
      ],
    },
  ];
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Notre méthode"
          title="Comment ça fonctionne ?"
          subtitle="Un système simple en trois temps pour transformer votre présence en ligne en clients."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:shadow-elevated">
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/12 text-accent">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="font-display text-3xl font-extrabold text-accent/30">{s.n}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-[15px] font-medium text-muted-foreground">{s.benefit}</p>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px]">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GOOGLE ADS ---------------- */
function GoogleAds() {
  const points = [
    {
      icon: Megaphone,
      title: "Visibilité immédiate",
      desc: "Pourquoi attendre des mois le référencement naturel ? Apparaissez en haut de Google dès le premier jour.",
    },
    {
      icon: Target,
      title: "Des prospects qualifiés",
      desc: "On cible les personnes qui cherchent vos services, dans votre zone, au bon moment.",
    },
    {
      icon: Shield,
      title: "Un budget maîtrisé",
      desc: "Vous fixez le budget. Pas de mauvaise surprise, vous gardez le contrôle.",
    },
    {
      icon: TrendingUp,
      title: "Des résultats mesurables",
      desc: "Vous savez exactement combien d'appels et de demandes vos campagnes génèrent.",
    },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">Google Ads</div>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Soyez visible <span className="gradient-text">immédiatement</span>
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Le référencement naturel prend du temps. Google Ads vous place en tête des recherches dès aujourd'hui, et vous apporte des demandes pendant que votre visibilité naturelle se construit.
            </p>
            <a
              href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition hover:opacity-90"
            >
              <Calendar className="h-5 w-5" />
              En discuter
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/12 text-accent">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AUTOMATION ---------------- */
function Automation() {
  const examples = [
    { icon: MessageSquare, t: "Répondre automatiquement aux demandes entrantes" },
    { icon: Filter, t: "Qualifier les prospects avant qu'ils vous contactent" },
    { icon: Bell, t: "Relancer les devis automatiquement" },
    { icon: Calendar, t: "Envoyer des rappels de rendez-vous" },
    { icon: Clock, t: "Gagner du temps sur les tâches répétitives" },
  ];
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Automatisation"
          title="Automatisation intelligente"
          subtitle="Laissez les tâches répétitives se faire toutes seules et concentrez-vous sur votre métier."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
          {examples.map((e) => (
            <div
              key={e.t}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-soft transition hover:border-accent/40"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                <e.icon className="h-5 w-5" />
              </div>
              <span className="font-medium">{e.t}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Ces automatisations sont proposées en option, selon les besoins réels de votre entreprise. Rien d'imposé.
        </p>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
const PRICING_TIERS = [
  {
    name: "Sitaly Présence",
    badge: "Le tout-en-un",
    icon: Globe,
    price: "149€",
    period: "/mois",
    setup: null,
    objective: "Votre présence en ligne gérée de A à Z, sans que vous touchiez à la technique.",
    inherits: null,
    features: [
      "Site internet professionnel",
      "Hébergement & maintenance",
      "Modifications*",
      "Fiche Google Business",
      "Référencement local",
    ],
    note: null,
    promise: "Une présence pro qui reste à jour, sans gérer la technique.",
    cta: { label: "Réserver un appel", calendly: true },
    featured: true,
  },
  {
    name: "Sitaly Acquisition",
    badge: "Plus de clients",
    icon: Megaphone,
    price: "Dès 299€",
    period: "/mois",
    setup: null,
    objective: "Des appels et des devis via Google Ads. Avec ou sans site.",
    inherits: "Indépendant de votre site",
    features: [
      "3 formules : Starter, Growth, Performance",
      "Création & gestion des campagnes",
      "Optimisation & suivi des conversions",
      "Reporting mensuel",
    ],
    note: "Budget publicitaire Google non inclus.",
    promise: "Attirez de nouveaux clients, à votre rythme.",
    cta: { label: "Voir les formules", to: "/acquisition" },
    featured: false,
  },
  {
    name: "Sitaly Agents IA",
    badge: "Automatisation",
    icon: Bot,
    price: "Sur mesure",
    period: "",
    setup: null,
    objective: "Des agents IA qui répondent, qualifient et prennent vos rendez-vous. Installés clé en main.",
    inherits: "Se greffe sur n'importe quelle offre",
    features: [
      "Agent standardiste — ne rate plus un appel",
      "Prise de rendez-vous automatique",
      "Relance des devis en attente",
      "Réponse aux messages & réseaux",
    ],
    note: null,
    promise: "Vous ne configurez rien, on branche tout.",
    cta: { label: "Découvrir les agents", to: "/agents-ia" },
    featured: false,
  },
] as const;

function Pricing() {
  return (
    <section id="offre" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Tarifs"
          title="Choisissez le niveau d'accompagnement adapté à votre activité"
          subtitle="Votre présence en ligne avec Présence, plus de clients avec Acquisition. Combinables, sans engagement."
        />

        <p className="mx-auto mt-10 max-w-3xl rounded-full border border-border bg-secondary/60 px-5 py-3 text-center text-sm font-semibold text-foreground/80">
          Sans engagement · Tout est géré, vous ne touchez à rien.
        </p>
        <div className="mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory items-stretch gap-5 overflow-x-auto pb-2 pt-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden">
          {PRICING_TIERS.map((t) => (
            <div
              key={t.name}
              className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-auto lg:shrink"
            >
              <PricingCard tier={t} featured={t.featured} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Tier = (typeof PRICING_TIERS)[number];

function PricingCard({ tier, featured }: { tier: Tier; featured: boolean }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl bg-card p-7 sm:p-8 ${
        featured
          ? "border-2 border-accent shadow-glow"
          : "border border-border shadow-soft"
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-elevated">
          Recommandé
        </div>
      )}

      <div className="flex items-center justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${
            featured ? "bg-accent/15 text-accent" : "bg-secondary text-foreground/70"
          }`}
        >
          <tier.icon className="h-5 w-5" />
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            featured ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"
          }`}
        >
          {tier.badge}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold">{tier.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{tier.objective}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {tier.price}
        </span>
        <span className="text-muted-foreground">{tier.period}</span>
      </div>
      {tier.setup && (
        <p className="mt-1 text-sm font-medium text-foreground/70">{tier.setup}</p>
      )}

      <div className="mt-7 space-y-3">
        {tier.inherits && (
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Check className="h-5 w-5 shrink-0" />
            {tier.inherits}
          </div>
        )}
        <ul className="space-y-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[15px]">
              <Check
                className={`mt-0.5 h-5 w-5 shrink-0 ${
                  featured ? "text-accent" : "text-success"
                }`}
              />
              <span>
                {f.endsWith("*") ? (
                  <>
                    {f.slice(0, -1)}
                    <a
                      href="#faq-modifications"
                      aria-label="Voir le détail des modifications incluses"
                      className="font-semibold text-accent hover:underline"
                    >
                      *
                    </a>
                  </>
                ) : (
                  f
                )}
              </span>
            </li>
          ))}
        </ul>
        {tier.note && (
          <p className="flex items-start gap-1.5 pt-1 text-xs text-muted-foreground">
            <span aria-hidden="true">*</span>
            {tier.note}
          </p>
        )}
      </div>

      <p className="mt-6 border-t border-border pt-5 text-sm font-medium text-foreground/80">
        {tier.promise}
      </p>

      {"to" in tier.cta && tier.cta.to ? (
        <Link
          to={tier.cta.to}
          className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition ${
            featured
              ? "bg-accent text-accent-foreground shadow-elevated hover:opacity-90"
              : "border border-border bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          {tier.cta.label}
          <ArrowRight className="h-5 w-5" />
        </Link>
      ) : (
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition ${
            featured
              ? "bg-accent text-accent-foreground shadow-elevated hover:opacity-90"
              : "border border-border bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          <Calendar className="h-5 w-5" />
          {tier.cta.label}
        </a>
      )}
    </div>
  );
}

/* ---------------- OPTION BLOG SEO ---------------- */
const BLOG_TIERS = [
  { name: "Essentiel", articles: "1 article SEO / mois", price: "89€", featured: false },
  { name: "Croissance", articles: "2 articles SEO / mois", price: "159€", featured: true },
  { name: "Premium", articles: "4 articles SEO / mois", price: "299€", featured: false },
] as const;

function BlogOption() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Option contenu"
          title="Un blog qui vous fait monter sur Google, chaque mois"
          subtitle="Des articles optimisés SEO, rédigés et mis en page pour vous. En option sur votre forfait, ou seul si vous avez déjà un site."
        />
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {BLOG_TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl bg-card p-6 shadow-soft transition ${
                t.featured ? "border-2 border-accent shadow-glow" : "border border-border hover:border-accent/40"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                  Recommandé
                </span>
              )}
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold">Blog SEO {t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.articles}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-2xl font-extrabold">{t.price}</span>
                <span className="text-sm text-muted-foreground">/mois</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- OPTIONS SUR DEVIS ---------------- */
function Options() {
  const opts = [
    { icon: Sparkles, name: "Logo / identité visuelle", price: "390€" },
    { icon: Star, name: "Photos professionnelles", price: "290€" },
    { icon: TrendingUp, name: "Rédaction de contenus", price: "sur devis" },
  ];
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Options ponctuelles"
          title="Des leviers en plus, en paiement unique"
          subtitle="Ajoutez uniquement ce qui vous est utile. Rien d'imposé."
        />
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
          {opts.map((o) => (
            <div
              key={o.name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-soft transition hover:border-accent/40"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                <o.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block font-medium">{o.name}</span>
                <span className="text-sm text-muted-foreground">{o.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXAMPLES ---------------- */
function Examples() {
  type Item = {
    embedUrl: string;
    tag: string;
    title: string;
    desc: string;
  };

  const items: Item[] = [
    {
      embedUrl: "https://znk-v.github.io/aymeric-pataud/",
      tag: "Chef à domicile",
      title: "Aymeric Pataud — Chef expert du goût",
      desc: "Site vitrine premium réalisé pour un chef à domicile. Cliquez sur l'aperçu pour ouvrir le site.",
    },
    {
      embedUrl: "https://lafleur-toiture.fr/#top",
      tag: "Couvreur",
      title: "Lafleur Toiture — Essonne",
      desc: "Site vitrine réalisé pour un couvreur de l'Essonne. Cliquez sur l'aperçu pour ouvrir le site.",
    },
  ];

  return (
    <section id="exemples" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Exemples"
          title="Des sites pensés pour convertir"
          subtitle="Quelques exemples de sites réalisés pour des artisans et indépendants. Cliquez sur un aperçu pour ouvrir le site."
        />

        <div className="mt-16 grid gap-8 sm:mt-20 md:grid-cols-2">
          {items.map((it) => (
            <a
              key={it.title}
              href={it.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated transition duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Media preview — non-interactive, the whole card opens the real site */}
              <div className="border-b border-border bg-secondary">
                <EmbedPreview url={it.embedUrl} title={it.title} />
              </div>

              {/* Caption */}
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-block w-fit rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent sm:text-xs">
                  {it.tag}
                </span>
                <h3 className="mt-2 text-lg font-bold text-foreground sm:text-xl">
                  {it.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {it.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
                  Ouvrir le site
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Non-interactive, scaled-down live preview of an external site (16:9, top-cropped) */
function EmbedPreview({ url, title }: { url: string; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const DESIGN_W = 1440;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESIGN_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[16/9] w-full overflow-hidden bg-white"
    >
      <iframe
        src={url}
        title={`Aperçu du site ${title}`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        referrerPolicy="no-referrer-when-downgrade"
        className="pointer-events-none absolute left-0 top-0 border-0 bg-white"
        style={{
          width: DESIGN_W,
          height: 1024,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
      {/* Transparent overlay: captures all pointer events, the parent <a> handles the click */}
      <span aria-hidden className="absolute inset-0 z-10" />
    </div>
  );
}

/* ---------------- PROCESS ---------------- */
function Process() {
  const steps = [
    { n: "01", t: "Appel découverte", d: "On comprend votre activité et vos besoins (20 min)." },
    { n: "02", t: "Création du site", d: "Nos équipes conçoivent votre site sur mesure." },
    { n: "03", t: "Validation", d: "Vous validez le rendu, on ajuste si besoin." },
    { n: "04", t: "Mise en ligne", d: "Hébergement, nom de domaine, SEO local : on s'occupe de tout." },
    { n: "05", t: "Suivi mensuel", d: "Maintenance, mises à jour et modifications incluses." },
  ];
  return (
    <section id="process" className="bg-primary py-20 text-primary-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">Process</div>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Comment ça se passe ?</h2>
          <p className="mt-3 text-primary-foreground/70">
            5 étapes simples pour avoir un site qui travaille pour vous.
          </p>
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="font-display text-3xl font-extrabold text-accent">{s.n}</div>
              <div className="mt-3 font-bold">{s.t}</div>
              <div className="mt-1.5 text-sm text-primary-foreground/70">{s.d}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const items = [
    {
      name: "J. M.",
      role: "Plombier — Lyon",
      quote:
        "Depuis que mon site est en ligne, je reçois 3 à 5 appels par semaine de nouveaux clients. Le rapport qualité-prix est imbattable.",
    },
    {
      name: "S. R.",
      role: "Artisan rénovation — Bordeaux",
      quote:
        "Sitaly a tout pris en charge. En 48h, j'avais un site magnifique et des demandes de devis dès le premier mois.",
    },
    {
      name: "K. B.",
      role: "Électricien — Toulouse",
      quote:
        "Simple, clair, efficace. Je n'ai rien à gérer et je peux me concentrer sur mes chantiers. Je recommande sans hésiter.",
    },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Témoignages"
          title="Ils ont fait confiance à Sitaly"
          subtitle="Des artisans qui reçoivent enfin des appels grâce à leur site."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="flex gap-0.5 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
                « {t.quote} »
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQ_MODIF_INDEX = FAQ_ITEMS.findIndex((it) =>
  it.q.includes("modifications incluses"),
);

function Faq() {
  const items = FAQ_ITEMS;
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== "#faq-modifications") return;
      setOpen(FAQ_MODIF_INDEX);
      const el = document.getElementById("faq-modifications");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="faq" className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader eyebrow="FAQ" title="Questions fréquentes" subtitle="Tout ce que vous voulez savoir, simplement." />
        <div className="mt-10 space-y-3">
          {items.map((it, i) => (
            <div
              key={it.q}
              id={i === FAQ_MODIF_INDEX ? "faq-modifications" : undefined}
              className="overflow-hidden scroll-mt-24 rounded-xl border border-border bg-card shadow-soft"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
              >
                <span>{it.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 hero-bg" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">Contact</div>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Discutons de votre projet
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Laissez-nous vos coordonnées, on vous rappelle sous 24h pour un échange simple et sans engagement.
          </p>
          <ul className="mt-8 space-y-4 text-[15px]">
            <li className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Phone className="h-5 w-5" />
              </div>
              Un appel découverte de 20 min
            </li>
            <li className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Check className="h-5 w-5" />
              </div>
              Sans engagement, ni démarchage
            </li>
            <li className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Clock className="h-5 w-5" />
              </div>
              Réponse sous 24h
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = String(fd.get("name") || "");
            const firstname = String(fd.get("firstname") || "");
            const company = String(fd.get("company") || "");
            const phone = String(fd.get("phone") || "");
            const message = String(fd.get("message") || "");
            const fullName = `${firstname} ${name}`.trim();
            const body = `Bonjour, je suis ${fullName}${company ? ` (${company})` : ""}.\nTéléphone : ${phone}\n\n${message}`;
            const sitalyPhone = "+33658683372";
            const ua = navigator.userAgent;
            const isIOS = /iPad|iPhone|iPod/.test(ua);
            const separator = isIOS ? "&" : "?";
            window.location.href = `sms:${sitalyPhone}${separator}body=${encodeURIComponent(body)}`;
            setSent(true);
          }}
          className="rounded-2xl border border-border bg-card p-6 shadow-elevated sm:p-8"
        >
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">Merci !</h3>
              <p className="mt-2 text-muted-foreground">
                Votre application de messagerie s'ouvre avec votre message pré-rempli. Il ne vous reste plus qu'à l'envoyer.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom" name="name" required />
                <Field label="Prénom" name="firstname" required />
                <Field label="Téléphone" name="phone" type="tel" required />
                <Field label="Entreprise" name="company" />
              </div>
              <div className="mt-4">
                <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-[15px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Parlez-nous brièvement de votre activité…"
                />
              </div>
              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
              >
                <Phone className="h-5 w-5" />
                Envoyer un message
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Votre application de messagerie s'ouvrira avec le message pré-rempli.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        maxLength={150}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-[15px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-12 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <SitalyLogo />
            </div>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Plus de clients pour les artisans, indépendants et PME : site internet, Google Ads et automatisation.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Navigation</div>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#offre" className="hover:text-primary-foreground">Offres</a></li>
              <li><Link to="/agents-ia" className="hover:text-primary-foreground">Agents IA</Link></li>
              <li><a href="#exemples" className="hover:text-primary-foreground">Exemples</a></li>
              <li><a href="#process" className="hover:text-primary-foreground">Process</a></li>
              <li><a href="#faq" className="hover:text-primary-foreground">FAQ</a></li>
              <li><Link to="/blog" className="hover:text-primary-foreground">Blog</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@sitaly.fr</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4" /> sitaly.fr</li>
              <li>
                <a
                  href="https://instagram.com/sitaly.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary-foreground"
                >
                  <Instagram className="h-4 w-4" /> @sitaly.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <div>© {new Date().getFullYear()} Sitaly. Tous droits réservés.</div>
          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/mentions-legales" className="hover:text-primary-foreground">Mentions légales</Link>
            <Link to="/politique-confidentialite" className="hover:text-primary-foreground">Confidentialité</Link>
            <Link to="/cgv" className="hover:text-primary-foreground">CGV</Link>
            <Link to="/cookies" className="hover:text-primary-foreground">Cookies</Link>
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
      <div className="text-xs font-semibold uppercase tracking-wider text-accent">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}
