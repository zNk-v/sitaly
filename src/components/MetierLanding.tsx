import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Clock,
  ExternalLink,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { CALENDLY_URL } from "@/lib/config";

export interface MetierLandingProps {
  metier: string; // "plombier"
  metierCapitalized: string; // "Plombier"
  h1: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  example?: {
    label: string;
    description: string;
    iframeUrl: string;
    exempleHref: string;
  };
  faq: { q: string; a: string }[];
  testimonial: { quote: string; name: string; role: string };
  url: string; // canonical full URL
}

export function MetierLanding(props: MetierLandingProps) {
  const { metier, metierCapitalized, h1, intro, benefits, example, faq, testimonial } = props;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/50 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Spécialiste site internet {metier}
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {h1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">{intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-90"
            >
              Réserver un appel gratuit
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/"
              hash="offre"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Voir les tarifs
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              Livré en 48h
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Pas d'engagement caché
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              SEO local inclus
            </span>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pourquoi un site {metier} change tout
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Trois leviers concrets qui transforment un site vitrine en machine à appels qualifiés.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      {example && (
        <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-elevated">
                <iframe
                  src={example.iframeUrl}
                  title={`Exemple site ${metier} — ${example.label}`}
                  className="h-[420px] w-full border-0 sm:h-[520px]"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Exemple réel
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                  {example.label}
                </h2>
                <p className="mt-3 text-muted-foreground">{example.description}</p>
                <a
                  href={example.exempleHref}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Voir l'exemple en grand
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Combien coûte un site internet {metier} ?
          </h2>
          <p className="mt-3 text-sm font-semibold text-foreground/80">
            En location, sans engagement et sans frais d'installation. Tout est géré, vous ne touchez à rien.
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl gap-5 md:grid-cols-2">
            {[
              {
                name: "Sitaly Présence",
                price: "149€",
                featured: true,
                features: [
                  "Site professionnel + hébergement",
                  "Maintenance & modifications",
                  "Fiche Google Business",
                  "Référencement local",
                ],
                note: null as string | null,
              },
              {
                name: "Sitaly Acquisition",
                price: "Dès 299€",
                featured: false,
                features: [
                  "Campagnes Google Ads gérées",
                  "Indépendant de votre site",
                  "3 formules selon vos besoins",
                  "Reporting mensuel",
                ],
                note: "Budget publicitaire Google non inclus.",
              },
            ].map((tier) => (
              <article
                key={tier.name}
                className={`rounded-2xl p-7 ${
                  tier.featured
                    ? "border-2 border-primary bg-primary/5 shadow-elevated"
                    : "border border-border bg-card shadow-soft"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      tier.featured ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {tier.name}
                  </div>
                  {tier.featured && (
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      Recommandé
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-extrabold">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">/mois</span>
                </div>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {tier.features.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <Check
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                          tier.featured ? "text-primary" : "text-accent"
                        }`}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {tier.note && (
                  <p className="mt-4 text-xs text-muted-foreground">* {tier.note}</p>
                )}
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Besoin de plus de clients ?{" "}
            <Link to="/acquisition" className="font-semibold text-accent hover:underline">
              Découvrez les formules Sitaly Acquisition
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-y border-border bg-secondary/30 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="inline-flex gap-0.5 text-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <blockquote className="mt-5 font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            « {testimonial.quote} »
          </blockquote>
          <figcaption className="mt-5 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{testimonial.name}</span> —{" "}
            {testimonial.role}
          </figcaption>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Questions fréquentes — {metierCapitalized}
          </h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {faq.map((it, i) => (
              <details key={i} className="group px-5 py-4 open:bg-accent/5 sm:px-6">
                <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
                  <span className="mr-2 text-accent">Q.</span>
                  {it.q}
                </summary>
                <p className="mt-2 text-foreground/85">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Prêt à recevoir plus d'appels qualifiés ?
          </h2>
          <p className="mt-3 text-primary-foreground/90">
            Échangeons 20 minutes pour cadrer votre site {metier}, sans engagement.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-background px-7 py-3.5 text-sm font-semibold text-foreground shadow-elevated transition hover:opacity-95"
          >
            <Phone className="h-4 w-4" />
            Réserver un appel gratuit
          </a>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Sitaly — Création de sites internet pour artisans.
        </div>
      </footer>
    </div>
  );
}

function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center" aria-label="Sitaly — accueil">
          <SitalyLogo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Accueil
          </Link>
          <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Blog
          </Link>
        </nav>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
        >
          Réserver un appel
        </a>
      </div>
    </header>
  );
}

export function buildMetierMeta(opts: {
  title: string;
  description: string;
  url: string;
  metier: string;
  faq: { q: string; a: string }[];
}) {
  const { title, description, url, metier, faq } = opts;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "Sitaly" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: `Création de site internet pour ${metier}`,
          provider: {
            "@type": "Organization",
            name: "Sitaly",
            url: "https://sitaly.fr",
          },
          areaServed: { "@type": "Country", name: "France" },
          offers: [
            { "@type": "Offer", name: "Sitaly Présence", price: "149", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: "149", priceCurrency: "EUR", unitCode: "MON" } },
            { "@type": "Offer", name: "Sitaly Acquisition", price: "299", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: "299", priceCurrency: "EUR", unitCode: "MON" } },
          ],
          url,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sitaly.fr" },
            { "@type": "ListItem", position: 2, name: title, item: url },
          ],
        }),
      },
    ],
  };
}
