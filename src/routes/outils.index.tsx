import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, ClipboardCheck } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";

const URL = "https://sitaly.fr/outils/";
const TITLE = "Outils gratuits pour artisans : fiche Google et budget Google Ads | Sitaly";
const DESCRIPTION =
  "Deux outils gratuits et sans inscription pour artisans et TPE : auditer sa fiche Google Business Profile et calculer un budget Google Ads réaliste selon son métier.";

const OUTILS = [
  {
    to: "/outils/audit-fiche-google/" as const,
    icon: ClipboardCheck,
    titre: "Audit de fiche Google Business Profile",
    desc: "Vingt questions sur votre fiche, un score sur 100 et la liste des corrections classées par impact. Trois minutes, sans inscription.",
  },
  {
    to: "/outils/budget-google-ads-artisan/" as const,
    icon: Calculator,
    titre: "Calculateur de budget Google Ads",
    desc: "Votre métier, votre zone et votre budget : le nombre de clics, d'appels et de chantiers à attendre, et le coût de chaque demande.",
  },
];

export const Route = createFileRoute("/outils/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Outils gratuits Sitaly",
          description: DESCRIPTION,
          url: URL,
          hasPart: OUTILS.map((o) => ({
            "@type": "WebApplication",
            name: o.titre,
            url: `https://sitaly.fr${o.to}`,
            applicationCategory: "BusinessApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          })),
        }),
      },
    ],
  }),
  component: OutilsIndex,
});

function OutilsIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteChrome>
        <section className="hero-bg relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="rail-label text-brand-ink">Outils gratuits</div>
            <h1 className="display-hero mt-4 max-w-4xl">
              Vérifiez vous-même <span className="accent-word text-brand-ink">avant de payer</span>
            </h1>
            <p className="measure mt-6 text-lg text-muted-foreground">
              Deux outils pour savoir où vous en êtes sur Google, sans créer de compte ni laisser
              vos coordonnées.
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2">
            {OUTILS.map((o) => {
              const Icon = o.icon;
              return (
                <Link
                  key={o.to}
                  to={o.to}
                  className="lift group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold tracking-tight">{o.titre}</h2>
                  <p className="mt-3 flex-1 text-muted-foreground">{o.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-ink">
                    Ouvrir l'outil
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
