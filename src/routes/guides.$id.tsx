import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { BOUTON_NOIR, TEXTE_GRIS, lienCreation } from "@/components/produit/Produit";
import { ExtraitGuide, TexteGuide } from "@/components/guides/Guides";
import { GUIDES, clipGuide, getGuide, imageGuide } from "@/data/guides";
import { BASE_URL } from "@/lib/sitemap";

/**
 * Un guide pas à pas (3 novembre 2026) : chaque étape, son texte à gauche et
 * son extrait vidéo à droite, comme les tutoriels des grandes plateformes.
 * Le balisage HowTo donne les étapes aux moteurs et aux IA.
 */

const sansGras = (t: string) => t.replace(/\*\*/g, "");

export const Route = createFileRoute("/guides/$id")({
  loader: ({ params }) => {
    const g = getGuide(params.id);
    if (!g) throw notFound();
    return g;
  },
  head: ({ loaderData: g }) => {
    if (!g) return {};
    const url = `${BASE_URL}/guides/${g.id}/`;
    return {
      meta: [
        { title: g.seoTitre.length > 51 ? g.seoTitre : `${g.seoTitre} | Sitaly` },
        { name: "description", content: g.description },
        { property: "og:title", content: g.seoTitre },
        { property: "og:description", content: g.description },
        { property: "og:url", content: url },
        { property: "og:image", content: imageGuide(g.id, 0) },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "HowTo",
                name: g.titre,
                description: g.description,
                totalTime: `PT${parseInt(g.duree, 10) || 2}M`,
                step: g.etapes.map((e, k) => ({
                  "@type": "HowToStep",
                  position: k + 1,
                  name: e.titre,
                  text: sansGras(e.texte),
                  url: `${url}#etape-${k + 1}`,
                  ...(e.video !== false && {
                    image: imageGuide(g.id, k),
                    video: {
                      "@type": "VideoObject",
                      name: `${g.titre}, étape ${k + 1}`,
                      description: e.titre,
                      contentUrl: clipGuide(g.id, k),
                      thumbnailUrl: imageGuide(g.id, k),
                      uploadDate: "2026-11-03",
                    },
                  }),
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
                  { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
                  { "@type": "ListItem", position: 3, name: g.titre, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: PageGuide,
});

function PageGuide() {
  const g = Route.useLoaderData();
  const autres = GUIDES.filter((x) => x.id !== g.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-10 pb-6 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-5xl">
            <nav
              aria-label="Fil d'Ariane"
              className={`flex items-center gap-1.5 text-sm ${TEXTE_GRIS}`}
            >
              <Link to="/" className="hover:text-black">
                Sitaly App
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/guides/" className="hover:text-black">
                Guides
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-black">{g.titre}</span>
            </nav>
            <h1 className="titre-produit mt-6 text-[2.5rem] sm:text-6xl">{g.titre}</h1>
            <p className={`mt-4 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>{g.resume}</p>
            <p className={`mt-4 flex items-center gap-4 text-sm ${TEXTE_GRIS}`}>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {g.duree}
              </span>
              <span>{g.etapes.length} étapes</span>
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <ol className="mx-auto max-w-5xl space-y-14">
            {g.etapes.map((e, k) => (
              <li
                key={e.titre}
                id={`etape-${k + 1}`}
                className="grid scroll-mt-24 items-start gap-6 md:grid-cols-[1fr_1.45fr] md:gap-10"
              >
                <div className="md:sticky md:top-24">
                  <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-black text-sm font-bold text-white">
                    {k + 1}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">{e.titre}</h2>
                  <div className={`mt-3 space-y-3 text-[17px] leading-8 ${TEXTE_GRIS}`}>
                    <TexteGuide texte={e.texte} />
                  </div>
                </div>
                <ExtraitGuide guide={g} etape={k} />
              </li>
            ))}
          </ol>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-3xl bg-[#0d0f14] p-8 text-white sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="titre-produit text-3xl sm:text-4xl">À vous de jouer</h2>
              <p className="mt-2 text-white/70">
                Votre site en une minute, puis tout le reste dans la même application.
              </p>
            </div>
            <a
              href={lienCreation()}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-base font-medium text-black hover:bg-white/90"
            >
              Créer mon site gratuitement <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="px-4 pt-4 pb-28 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="titre-produit text-2xl sm:text-3xl">Autres guides</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {autres.map((x) => (
                <Link
                  key={x.id}
                  to="/guides/$id/"
                  params={{ id: x.id }}
                  className="group flex items-start justify-between gap-3 rounded-3xl bg-black/[0.03] p-5 transition hover:bg-black/[0.05]"
                >
                  <span>
                    <span className="block font-semibold">{x.titre}</span>
                    <span className={`mt-1 block text-sm ${TEXTE_GRIS}`}>{x.resume}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
            <Link to="/guides/" className={`${BOUTON_NOIR} mt-8`}>
              Tous les guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
