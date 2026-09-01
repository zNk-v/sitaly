import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  Megaphone,
  Target,
  BarChart3,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { CALENDLY_URL } from "@/lib/config";

export const Route = createFileRoute("/acquisition")({
  head: () => ({
    meta: [
      { title: "Sitaly Acquisition — Google Ads pour artisans | Dès 299€/mois" },
      {
        name: "description",
        content:
          "Générez des appels et des devis grâce à Google Ads, avec ou sans site internet. Gestion complète de vos campagnes par Sitaly. Trois formules dès 299€/mois.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Sitaly Acquisition — Google Ads pour artisans" },
      {
        property: "og:description",
        content:
          "La gestion de vos campagnes Google Ads pour attirer des clients. Indépendant de votre site. Dès 299€/mois.",
      },
      { property: "og:url", content: "https://sitaly.fr/acquisition" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/acquisition" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Sitaly Acquisition",
          serviceType: "Gestion de campagnes Google Ads",
          provider: { "@type": "Organization", name: "Sitaly", url: "https://sitaly.fr" },
          areaServed: "FR",
          offers: [
            { "@type": "Offer", name: "Acquisition Starter", price: "299", priceCurrency: "EUR" },
            { "@type": "Offer", name: "Acquisition Growth", price: "499", priceCurrency: "EUR" },
            { "@type": "Offer", name: "Acquisition Performance", price: "799", priceCurrency: "EUR" },
          ],
        }),
      },
    ],
  }),
  component: AcquisitionPage,
});

const TIERS = [
  {
    name: "Starter",
    icon: Target,
    price: "299€",
    objective: "Lancer votre acquisition sur Google, proprement.",
    features: [
      "Création de vos campagnes Google Ads",
      "Ciblage de votre zone d'intervention",
      "Optimisation mensuelle",
      "Reporting clair",
    ],
    featured: false,
  },
  {
    name: "Growth",
    icon: BarChart3,
    price: "499€",
    objective: "Monter en puissance et suivre vos conversions.",
    features: [
      "Plusieurs campagnes",
      "Optimisation avancée",
      "Suivi des conversions (appels, formulaires)",
      "Analyse des performances",
    ],
    featured: true,
  },
  {
    name: "Performance",
    icon: Rocket,
    price: "799€",
    objective: "Une stratégie d'acquisition complète, pilotée avec vous.",
    features: [
      "Stratégie d'acquisition sur mesure",
      "Optimisation du tunnel de conversion",
      "Création de landing pages",
      "Analyse de conversion",
      "Accompagnement stratégique",
    ],
    featured: false,
  },
] as const;

const STEPS = [
  { n: "1", title: "Appel découverte", text: "On comprend votre métier, votre zone, vos objectifs et votre budget." },
  { n: "2", title: "Lancement des campagnes", text: "On crée et paramètre vos annonces Google, ciblées sur les clients qui vous cherchent." },
  { n: "3", title: "Optimisation continue", text: "Chaque mois, on affine pour améliorer vos résultats. Vous recevez un reporting clair." },
];

function AcquisitionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" aria-label="Retour à sitaly.fr" className="flex items-center">
            <SitalyLogo />
          </Link>
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

      {/* Hero */}
      <section className="hero-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <Megaphone className="h-3.5 w-3.5 text-accent" />
            Sitaly Acquisition
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Plus de clients grâce à <span className="gradient-text">Google Ads.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            On crée et pilote vos campagnes Google pour vous apporter des appels et des devis. Avec
            ou sans site internet : cette offre est indépendante de votre présence en ligne.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
              href="#formules"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-base font-semibold shadow-soft transition hover:bg-secondary"
            >
              Voir les formules
            </a>
          </div>
        </div>
      </section>

      {/* Formules */}
      <section id="formules" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-accent">LES FORMULES</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Le tarif dépend de l'accompagnement, pas de votre budget pub
          </h2>
          <p className="mt-4 text-muted-foreground">
            Vous choisissez le niveau, vous gardez la main sur le budget publicitaire.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl bg-card p-7 sm:p-8 ${
                t.featured ? "border-2 border-accent shadow-glow" : "border border-border shadow-soft"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-elevated">
                  Le plus choisi
                </div>
              )}
              <div
                className={`grid h-11 w-11 place-items-center rounded-xl ${
                  t.featured ? "bg-accent/15 text-accent" : "bg-secondary text-foreground/70"
                }`}
              >
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold">Acquisition {t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.objective}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {t.price}
                </span>
                <span className="text-muted-foreground">/mois</span>
              </div>
              <ul className="mt-7 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]">
                    <Check className={`mt-0.5 h-5 w-5 shrink-0 ${t.featured ? "text-accent" : "text-success"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition ${
                  t.featured
                    ? "bg-accent text-accent-foreground shadow-elevated hover:opacity-90"
                    : "border border-border bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                <Calendar className="h-5 w-5" />
                En parler
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
          <p className="flex flex-1 items-start gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Le budget publicitaire Google est toujours séparé et reste votre propriété.
          </p>
          <p className="flex flex-1 items-start gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            On ne promet jamais un nombre de clients garanti. On promet un travail sérieux et transparent.
          </p>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-accent">COMMENT ÇA MARCHE</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Simple, du premier appel au premier client
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="font-display text-4xl font-extrabold text-accent/25">{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="hero-bg border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            On regarde ensemble ce qui est <span className="gradient-text">rentable pour vous</span> ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un appel de 15 minutes, sans engagement, pour voir si Google Ads a du sens dans votre métier.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-elevated transition hover:opacity-90"
          >
            <Calendar className="h-5 w-5" />
            Réserver mon appel
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <SitalyLogo className="scale-90" />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/" className="hover:text-foreground">Accueil</Link>
            <Link to="/agents-ia" className="hover:text-foreground">Agents IA</Link>
            <Link to="/mentions-legales" className="hover:text-foreground">Mentions légales</Link>
            <Link to="/cgv" className="hover:text-foreground">CGV</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
