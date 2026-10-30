import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import {
  BOUTON_NOIR,
  BoiteApp,
  CARTE,
  Confiance,
  TEXTE_GRIS,
  TitreSection,
  lienCreation,
} from "@/components/produit/Produit";
import { VisuelProduit } from "@/components/produit/VisuelsProduits";
import { PRODUITS, getProduit } from "@/data/produits";
import { CREATEUR_IA as IA, MENTION_TVA } from "@/data/offres";
import { euros } from "@/lib/config";
import { BASE_URL } from "@/lib/sitemap";

/**
 * Une page produit de Sitaly App (31 octobre 2026), comme les pages
 * /bookings ou /seo-geo de durable.com : ce que fait la fonction, comment,
 * ce que chaque formule en donne. Les textes vivent dans src/data/produits.ts.
 */

export const Route = createFileRoute("/produits/$id")({
  loader: ({ params }) => {
    const p = getProduit(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => {
    if (!p) return {};
    const url = `${BASE_URL}/produits/${p.id}/`;
    return {
      meta: [
        { title: `${p.seoTitre} | Sitaly` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.seoTitre },
        { property: "og:description", content: p.description },
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
                "@type": "FAQPage",
                mainEntity: p.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
                  { "@type": "ListItem", position: 2, name: p.nom, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: PageProduit,
});

const FORMULES = [
  [IA.decouverte.nom, "Gratuit"],
  [IA.essentiel.nom, `${euros(IA.essentiel.mensuel)}/mois`],
  [IA.pro.nom, `${euros(IA.pro.mensuel)}/mois`],
] as const;

function PageProduit() {
  const p = Route.useLoaderData();
  const autres = PRODUITS.filter((x) => x.id !== p.id);

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-10 pb-10 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <nav
              aria-label="Fil d'Ariane"
              className={`flex items-center justify-center gap-1.5 text-sm ${TEXTE_GRIS}`}
            >
              <Link to="/" className="hover:text-black">
                Sitaly App
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-black">{p.nom}</span>
            </nav>
            <h1 className="titre-produit mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl">{p.titre}</h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>{p.intro}</p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <a href={lienCreation()} className={`${BOUTON_NOIR} min-h-12 px-6 text-base`}>
                Créer mon site gratuitement <ArrowRight className="h-4 w-4" />
              </a>
              <span className={`text-sm ${TEXTE_GRIS}`}>{p.noteInclus}</span>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <VisuelProduit id={p.id} />
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <TitreSection surtitre="Comment ça marche" titre="Trois étapes, quelques minutes" />
            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {p.etapes.map((e, k) => (
                <li key={e.titre} className={`${CARTE} p-7`}>
                  <span className="titre-produit text-5xl text-[#7c3aed]">{k + 1}</span>
                  <h3 className="mt-5 text-xl font-semibold">{e.titre}</h3>
                  <p className={`mt-2 leading-7 ${TEXTE_GRIS}`}>{e.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="text-sm font-medium text-brand-ink">{p.nom}</div>
              <h2 className="titre-produit mt-3 text-[2.15rem] sm:text-5xl">Dans le détail</h2>
            </div>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {p.points.map((x) => (
                <div key={x.titre} className="border-t border-black/10 pt-5">
                  <h3 className="text-lg font-semibold">{x.titre}</h3>
                  <p className={`mt-2 leading-7 ${TEXTE_GRIS}`}>{x.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <TitreSection surtitre="Formules" titre="Ce que chaque formule comprend" />
            <div className="mt-12 grid gap-3 md:grid-cols-3">
              {FORMULES.map(([nom, prix], k) => {
                const v = p.inclus[k];
                return (
                  <div
                    key={nom}
                    className={k === 1 ? "rounded-3xl bg-[#0d0f14] p-7 text-white" : `${CARTE} p-7`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-lg font-semibold">{nom}</span>
                      <span className={k === 1 ? "text-white/60" : TEXTE_GRIS}>{prix}</span>
                    </div>
                    <div className="mt-6 flex items-center gap-2.5 font-medium">
                      {v ? (
                        <>
                          <Check
                            className={`h-5 w-5 ${k === 1 ? "text-[#c4b5fd]" : "text-black/80"}`}
                            aria-hidden="true"
                          />
                          {v}
                        </>
                      ) : (
                        <span className={k === 1 ? "text-white/45" : "text-black/40"}>
                          Non compris
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className={`mt-5 text-center text-sm ${TEXTE_GRIS}`}>
              {MENTION_TVA}.{" "}
              <Link to="/tarifs/" className="font-medium text-black underline underline-offset-2">
                Comparer les formules
              </Link>
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <TitreSection surtitre="Questions" titre="Questions fréquentes" />
            <div className="mt-10 space-y-3">
              {p.faq.map((f) => (
                <details key={f.q} className={`${CARTE} group p-5`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                    {f.q}
                    <span className="text-xl leading-none transition group-open:rotate-45">+</span>
                  </summary>
                  <p className={`mt-3 ${TEXTE_GRIS}`}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="titre-produit text-2xl sm:text-3xl">Les autres produits</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {autres.map((x) => (
                <Link
                  key={x.id}
                  to="/produits/$id/"
                  params={{ id: x.id }}
                  className={`${CARTE} group flex items-start justify-between gap-3 p-5 transition hover:bg-black/[0.05]`}
                >
                  <span>
                    <span className="block font-semibold">{x.nom}</span>
                    <span className={`mt-1 block text-sm ${TEXTE_GRIS}`}>{x.menuDesc}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-8 pb-28 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Commencez par votre site
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase. Votre site est prêt une minute plus tard, avec
              tous ces outils dans la même application.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <BoiteApp idees={false} />
          </div>
          <Confiance />
        </section>
      </SiteChrome>
    </div>
  );
}
