import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { getRealisation, REALISATIONS, srcSetCapture } from "@/data/realisations";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteChrome } from "@/components/SiteChrome";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useSplitWords } from "@/hooks/use-split-words";

export const Route = createFileRoute("/realisations/$slug")({
  loader: ({ params }) => {
    const realisation = getRealisation(params.slug);
    if (!realisation) throw notFound();
    return realisation;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const r = loaderData;
    const title = r.seo.titre;
    const description = r.seo.description;
    const url = `https://sitaly.fr/realisations/${r.slug}/`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CreativeWork",
                "@id": `${url}#etude`,
                name: `${r.client} — ${r.metier}`,
                about: r.metier,
                url,
                // Rattaché à l'entité du graphe racine (__root.tsx).
                creator: { "@id": "https://sitaly.fr/#business" },
                // Le site du client est l'oeuvre décrite : on le relie
                // explicitement plutôt que de laisser croire que la page en
                // est une copie.
                mainEntity: { "@type": "WebSite", name: r.client, url: r.url },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sitaly.fr/" },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Réalisations",
                    item: "https://sitaly.fr/realisations/",
                  },
                  { "@type": "ListItem", position: 3, name: r.client, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: RealisationPage,
});

function RealisationPage() {
  const r = Route.useLoaderData();
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);
  useSplitWords(rootRef);

  const autres = REALISATIONS.filter((x) => x.slug !== r.slug);

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground">
      <SiteChrome>
        {/* ---- Ouverture ---- */}
        <section className="hero-bg relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <Link
              to="/realisations/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Toutes les réalisations
            </Link>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <div>
                <div className="rail-label text-brand-ink">{r.metier}</div>
                <h1 data-split className="display-hero mt-4">
                  {r.client}
                </h1>
                <p className="measure mt-6 text-lg text-muted-foreground">{r.resume}</p>

                <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
                  <div>
                    <dt className="rail-label text-muted-foreground">Métier</dt>
                    <dd className="mt-1.5 font-medium">{r.metier}</dd>
                  </div>
                  <div>
                    <dt className="rail-label text-muted-foreground">Zone</dt>
                    <dd className="mt-1.5 font-medium">{r.zone}</dd>
                  </div>
                  <div>
                    <dt className="rail-label text-muted-foreground">En ligne sur</dt>
                    <dd className="mt-1.5">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
                      >
                        {r.domaine}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </dd>
                  </div>
                </dl>

                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bouton mt-9 px-7 py-3.5"
                >
                  Ouvrir le site
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>

              {/* Capture réelle du site en ligne, pas une maquette. */}
              <figure className="rise">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zoom-frame block rounded-2xl border border-border shadow-elevated"
                >
                  <img
                    src={r.capture.small}
                    srcSet={srcSetCapture(r)}
                    sizes="(min-width: 1280px) 590px, (min-width: 1024px) 46vw, calc(100vw - 2rem)"
                    alt={`Page d'accueil du site de ${r.client}`}
                    width={720}
                    height={500}
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </a>
                <figcaption className="mt-3 text-xs text-muted-foreground">
                  Capture du site en ligne, prise le {r.captureLe}.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---- Ce qui a été livré ---- */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="01"
              eyebrow="Livré"
              title={
                <>
                  Ce que comprend <span className="accent-word">l'accompagnement</span>
                </>
              }
            />
            <ul className="stagger mt-14 grid gap-4 sm:grid-cols-2">
              {r.livre.map((item, i) => (
                <li
                  key={item}
                  data-reveal
                  style={{ "--i": i } as React.CSSProperties}
                  className="lift flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-soft"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-signal-ink" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- Partis pris ---- */}
        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="02"
              eyebrow="Partis pris"
              title={
                <>
                  Pourquoi ce site est{" "}
                  <span className="accent-word text-brand-ink">fait comme ça</span>
                </>
              }
              subtitle="Chaque métier a ses urgences et ses objections. Un couvreur qu'on appelle pour une fuite et un chef qui vend une signature n'ont pas besoin de la même page."
            />
            <div className="stagger mt-14 grid gap-5 lg:grid-cols-3">
              {r.choix.map((c, i) => (
                <div
                  key={c.titre}
                  data-reveal
                  style={{ "--i": i } as React.CSSProperties}
                  className="lift rounded-2xl border border-border bg-card p-7"
                >
                  <span className="rail-num font-display text-3xl font-extrabold text-brand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{c.titre}</h3>
                  <p className="mt-2 text-[15px] text-muted-foreground">{c.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Ce qui est visible sur le site ---- */}
        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <SectionHeader
                  index="03"
                  eyebrow="Vérifiable"
                  title={
                    <>
                      Ce qu'on voit <span className="accent-word">en ouvrant le site</span>
                    </>
                  }
                />
                <ul className="mt-10 space-y-3">
                  {r.constats.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[15px]">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-signal-ink" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                {r.resultats.length > 0 && (
                  <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
                    {r.resultats.map((res) => (
                      <div key={res.libelle}>
                        <dt className="rail-num font-display text-3xl font-extrabold text-brand-ink">
                          {res.valeur}
                        </dt>
                        <dd className="mt-1 text-sm text-muted-foreground">{res.libelle}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              {/* Rendu mobile : c'est là que se joue la majorité du trafic
                  d'un artisan, il mérite mieux qu'une mention. */}
              <div className="rise flex justify-center">
                <div className="w-[260px] overflow-hidden rounded-[2rem] border-8 border-foreground/85 bg-foreground/85 shadow-elevated">
                  <img
                    src={r.capture.mobile}
                    alt={`Le site de ${r.client} sur mobile`}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Autres réalisations ---- */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader index="04" eyebrow="Aussi" title="Les autres réalisations" />
            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {autres.map((a) => (
                <Link
                  key={a.slug}
                  to="/realisations/$slug/"
                  params={{ slug: a.slug }}
                  className="lift group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
                >
                  <div className="zoom-frame relative aspect-[16/10] border-b border-border">
                    <img
                      src={a.capture.small}
                      srcSet={srcSetCapture(a)}
                      sizes="(min-width: 640px) 50vw, calc(100vw - 2rem)"
                      width={720}
                      height={500}
                      alt={`Page d'accueil du site de ${a.client}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <div className="rail-label text-brand-ink">{a.metier}</div>
                    <h3 className="mt-2 font-display text-lg font-bold">{a.client}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Appel final ---- */}
        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 data-split className="display-section">
              Le vôtre pourrait être <span className="accent-word text-brand-ink">le prochain</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Quatre questions sur votre activité, et vous voyez l'offre qui vous convient et son
              prix. Sans engagement.
            </p>
            <Link to="/mon-projet/" className="bouton mt-9 px-7 py-3.5">
              Trouver mon offre
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </Link>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
