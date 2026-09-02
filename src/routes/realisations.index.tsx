import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { REALISATIONS } from "@/data/realisations";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteChrome } from "@/components/SiteChrome";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useSplitWords } from "@/hooks/use-split-words";
import { CALENDLY_URL } from "@/lib/config";

const TITLE = "Réalisations : sites internet livrés par Sitaly | Sitaly";
const DESCRIPTION =
  "Les sites réalisés par Sitaly pour des artisans et des indépendants. Chaque projet est en ligne et consultable : couvreur en Essonne, rénovation en Haute-Garonne, chef à domicile en Île-de-France.";

export const Route = createFileRoute("/realisations/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://sitaly.fr/realisations/" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/realisations/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Réalisations Sitaly",
          description: DESCRIPTION,
          url: "https://sitaly.fr/realisations/",
          hasPart: REALISATIONS.map((r) => ({
            "@type": "CreativeWork",
            name: `${r.client} — ${r.metier}`,
            url: `https://sitaly.fr/realisations/${r.slug}/`,
          })),
        }),
      },
    ],
  }),
  component: RealisationsIndex,
});

function RealisationsIndex() {
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);
  useSplitWords(rootRef);

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground">
      <SiteChrome>
        <section className="hero-bg relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="rail-label text-brand-ink">Réalisations</div>
            <h1 data-split className="display-hero mt-4 max-w-4xl">
              Des sites <span className="accent-word text-brand-ink">réellement en ligne</span>
            </h1>
            <p className="measure mt-6 text-lg text-muted-foreground">
              Aucune maquette, aucun projet fictif. Chaque site ci-dessous est ouvert au public :
              cliquez, vérifiez, appelez le numéro si vous voulez.
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="01"
              eyebrow="Le portfolio"
              title={
                <>
                  Trois métiers, <span className="accent-word">trois logiques différentes</span>
                </>
              }
              subtitle="Un couvreur qu'on appelle en urgence et un chef qui vend une signature n'ont pas besoin de la même page d'accueil. C'est tout l'objet de ces études de cas."
            />

            <div className="stagger mt-14 grid gap-8 lg:grid-cols-3">
              {REALISATIONS.map((r, i) => (
                <Link
                  key={r.slug}
                  to="/realisations/$slug/"
                  params={{ slug: r.slug }}
                  data-reveal
                  style={{ "--i": i } as React.CSSProperties}
                  className="lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
                >
                  <div className="zoom-frame relative aspect-[16/11] border-b border-border">
                    <img
                      src={r.capture.small}
                      srcSet={`${r.capture.small} 720w, ${r.capture.large} 1200w`}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      alt={`Page d'accueil du site de ${r.client}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="rail-label text-brand-ink">{r.metier}</div>
                    <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
                      {r.client}
                    </h2>
                    <p className="mt-2 flex-1 text-[15px] text-muted-foreground">{r.resume}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-ink">
                      Voir l'étude de cas
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 data-split className="display-section">
              Et si le prochain <span className="accent-word text-brand-ink">était le vôtre</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Vingt minutes suffisent pour savoir si on peut vous être utile. Sans engagement, sans
              démarchage derrière.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition hover:brightness-110"
            >
              <Calendar className="h-5 w-5" />
              Réserver un appel
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
