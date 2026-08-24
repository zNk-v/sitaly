import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Check,
  Megaphone,
  Target,
  ShieldCheck,
} from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { HeaderCallButton, MobileMenu } from "@/components/MobileMenu";
import { LinkedinLink } from "@/components/LinkedinLink";
import { CALENDLY_URL } from "@/lib/config";

export const Route = createFileRoute("/acquisition")({
  head: () => ({
    meta: [
      { title: "Sitaly Acquisition — Gestion Google Ads | 299€/mois" },
      {
        name: "description",
        content:
          "Générez des demandes qualifiées grâce à Google Ads, avec ou sans site internet. Gestion complète de vos campagnes par Sitaly : 299€/mois plus 15 % du budget publicitaire.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Sitaly Acquisition — Google Ads pour artisans" },
      {
        property: "og:description",
        content:
          "La gestion de vos campagnes Google Ads pour attirer des clients. Indépendant de votre site. 299€/mois + 15 % du budget publicitaire.",
      },
      { property: "og:url", content: "https://sitaly.fr/acquisition/" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/acquisition/" }],
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
            { "@type": "Offer", name: "Gestion Google Ads", price: "299", priceCurrency: "EUR" },
          ],
        }),
      },
    ],
  }),
  component: AcquisitionPage,
});

/**
 * Offre unique : la gestion est facturée 299 €/mois, plus un pourcentage du budget
 * publicitaire confié. Les anciens paliers Growth (499 €) et Performance (799 €) ont
 * été retirés le 24/08/2026 — un seul tarif affiché, ajusté au budget réel.
 */
const COMMISSION = "15 %";

const OFFRE = {
  name: "Gestion Google Ads",
  icon: Target,
  price: "299€",
  commission: `+ ${COMMISSION} du budget publicitaire`,
  objective: "Vos campagnes créées, pilotées et optimisées, du premier euro au dernier.",
  features: [
    "Création et paramétrage de vos campagnes",
    "Ciblage précis de votre zone d'intervention",
    "Suivi des conversions : appels, formulaires, messages",
    "Optimisation continue et arbitrage des enchères",
    "Reporting mensuel clair : dépense, demandes, coût réel",
    "Un interlocuteur unique, joignable",
  ],
} as const;

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
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" aria-label="Retour à sitaly.fr" className="flex items-center">
            <SitalyLogo />
          </Link>
          <div className="flex items-center gap-2">
            <HeaderCallButton />
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 sm:inline-flex"
            >
              <Calendar className="h-4 w-4" />
              Réserver un appel
            </a>
            <MobileMenu />
          </div>
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
          <p className="text-xs font-bold tracking-widest text-accent">LE TARIF</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Une seule offre, un tarif qui suit votre budget
          </h2>
          <p className="mt-4 text-muted-foreground">
            Un forfait de gestion fixe, plus un pourcentage du budget publicitaire que vous nous
            confiez. Vous gardez la main sur ce budget, et notre rémunération suit vos ambitions.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border-2 border-accent bg-card p-7 shadow-glow sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <OFFRE.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{OFFRE.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{OFFRE.objective}</p>
            </div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Sans engagement
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-display text-5xl font-extrabold tracking-tight">{OFFRE.price}</span>
            <span className="text-muted-foreground">/mois</span>
            <span className="text-lg font-semibold text-accent">{OFFRE.commission}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Le budget publicitaire est versé directement à Google : il ne transite pas par nous et
            reste votre propriété.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {OFFRE.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground shadow-elevated transition hover:opacity-90"
          >
            <Calendar className="h-5 w-5" />
            En parler
          </a>
        </div>

        {/* Passerelle vers l'autre canal publicitaire. Page statique : lien classique. */}
        <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/40 px-5 py-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Vos clients cherchent aussi dans ChatGPT ?</span>{" "}
            Nous pilotons également des campagnes ChatGPT Ads, à partir de 890 €/mois.
          </p>
          <a
            href="/chatgpt-ads/"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            Voir ChatGPT Ads
            <ArrowRight className="h-4 w-4" />
          </a>
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
            <Link to="/agents-ia/" className="hover:text-foreground">Agents IA</Link>
            <a href="/chatgpt-ads/" className="hover:text-foreground">ChatGPT Ads</a>
            <Link to="/mentions-legales/" className="hover:text-foreground">Mentions légales</Link>
            <Link to="/cgv/" className="hover:text-foreground">CGV</Link>
            <LinkedinLink className="h-9 w-9" />
          </div>
        </div>
      </footer>
    </div>
  );
}
