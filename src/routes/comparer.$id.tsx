import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { BoiteApp, CARTE, Confiance, TEXTE_GRIS, TitreSection } from "@/components/produit/Produit";
import { COMPARATIFS, RELEVE, getComparatif } from "@/data/comparatifs";
import { MENTION_TVA } from "@/data/offres";
import { BASE_URL } from "@/lib/sitemap";

/**
 * Une page comparative (30 octobre 2026) : Sitaly face à un autre outil, sur
 * le modèle des pages « compare » de durable.com. Les données et leurs règles
 * (faits vérifiables, prix relevés à une date) vivent dans
 * src/data/comparatifs.ts.
 */

export const Route = createFileRoute("/comparer/$id")({
  loader: ({ params }) => {
    const c = getComparatif(params.id);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData: c }) => {
    if (!c) return {};
    const url = `${BASE_URL}/comparer/${c.id}/`;
    return {
      meta: [
        { title: `${c.titre} | Sitaly` },
        { name: "description", content: c.description },
        { property: "og:title", content: c.titre },
        { property: "og:description", content: c.description },
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
                mainEntity: c.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Comparer",
                    item: `${BASE_URL}/comparer/`,
                  },
                  { "@type": "ListItem", position: 3, name: c.colonne, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: PageComparatif,
});

function PageComparatif() {
  const c = Route.useLoaderData();
  const autres = COMPARATIFS.filter((x) => x.id !== c.id);

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-10 pb-12 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-4xl">
            <nav
              aria-label="Fil d'Ariane"
              className={`flex items-center gap-1.5 text-sm ${TEXTE_GRIS}`}
            >
              <Link to="/comparer/" className="hover:text-black">
                Comparer
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-black">{c.colonne}</span>
            </nav>
            <h1 className="titre-produit mt-6 text-[2.3rem] sm:text-5xl lg:text-6xl">{c.titre}</h1>
            <p className={`mt-6 max-w-3xl text-lg leading-7 ${TEXTE_GRIS}`}>{c.intro}</p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[#0d0f14] p-7 text-white">
              <div className="text-sm font-medium text-[#c4b5fd]">Choisissez Sitaly si…</div>
              <ul className="mt-4 space-y-3">
                {c.choisirSitaly.map((x) => (
                  <li key={x} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c4b5fd]" />
                    <span className="text-white/85">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${CARTE} p-7`}>
              <div className={`text-sm font-medium ${TEXTE_GRIS}`}>Choisissez {c.nom} si…</div>
              <ul className="mt-4 space-y-3">
                {c.choisirAutre.map((x) => (
                  <li key={x} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-black/40" />
                    <span className="text-black/75">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <TitreSection surtitre="Point par point" titre={`Sitaly ou ${c.nom}`} />
            {/* Sur ordinateur, un tableau ; sur téléphone, une carte par critère. */}
            <div className="mt-12 hidden overflow-hidden rounded-3xl border border-black/[0.08] md:block">
              <table className="w-full text-left text-[15px]">
                <thead>
                  <tr className="bg-black/[0.03]">
                    <th scope="col" className="w-[22%] px-6 py-4 font-medium text-black/50">
                      Critère
                    </th>
                    <th scope="col" className="w-[39%] px-6 py-4 font-semibold">
                      Sitaly
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      {c.colonne}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.lignes.map((l) => (
                    <tr key={l.critere} className="border-t border-black/[0.06] align-top">
                      <th scope="row" className="px-6 py-4 font-medium">
                        {l.critere}
                      </th>
                      <td className="bg-[#f6f3ff] px-6 py-4">{l.sitaly}</td>
                      <td className={`px-6 py-4 ${TEXTE_GRIS}`}>{l.autre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10 space-y-3 md:hidden">
              {c.lignes.map((l) => (
                <div key={l.critere} className={`${CARTE} p-5`}>
                  <div className="font-semibold">{l.critere}</div>
                  <div className="mt-3 rounded-2xl bg-[#f6f3ff] p-3 text-[15px]">
                    <span className="font-medium">Sitaly : </span>
                    {l.sitaly}
                  </div>
                  <div className={`mt-2 px-3 text-[15px] ${TEXTE_GRIS}`}>
                    <span className="font-medium text-black/70">{c.colonne} : </span>
                    {l.autre}
                  </div>
                </div>
              ))}
            </div>
            <p className={`mt-5 text-sm ${TEXTE_GRIS}`}>
              {c.sources.length > 0 ? (
                <>
                  Tarifs relevés le {RELEVE} sur{" "}
                  {c.sources.map((s, k) => (
                    <span key={s.url}>
                      {k > 0 && ", "}
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        {s.label}
                      </a>
                    </span>
                  ))}
                  , susceptibles d'évoluer.{" "}
                </>
              ) : null}
              Sitaly : {MENTION_TVA}.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <TitreSection surtitre="Questions" titre="Questions fréquentes" />
            <div className="mt-10 space-y-3">
              {c.faq.map((f) => (
                <details key={f.q} className={`${CARTE} group p-5`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                    {f.q}
                    <span className="text-xl leading-none transition group-open:rotate-45">+</span>
                  </summary>
                  <p className={`mt-3 ${TEXTE_GRIS}`}>
                    {f.a}{" "}
                    {c.id === "agence" && (
                      <Link
                        to="/mon-projet/"
                        className="font-medium text-black underline underline-offset-2"
                      >
                        Décrire mon projet
                      </Link>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="titre-produit text-2xl sm:text-3xl">Autres comparatifs</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {autres.map((x) => (
                <Link
                  key={x.id}
                  to="/comparer/$id/"
                  params={{ id: x.id }}
                  className={`${CARTE} group flex items-center justify-between p-5 transition hover:bg-black/[0.05]`}
                >
                  <span className="font-semibold">Sitaly ou {x.nom}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-8 pb-28 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Essayez, c'est gratuit
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase : jugez sur pièce, votre site est prêt une
              minute plus tard.
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
