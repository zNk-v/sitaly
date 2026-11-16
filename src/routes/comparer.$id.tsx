import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { BoiteApp, CARTE, Confiance, TEXTE_GRIS, TitreSection } from "@/components/produit/Produit";
import {
  COMPARATIFS,
  RELEVE,
  RELEVE_ISO,
  getComparatif,
  type Comparatif,
  type Outil,
  type Source,
} from "@/data/comparatifs";
import { APP_REF, MENTION_TVA } from "@/data/offres";
import { BASE_URL } from "@/lib/sitemap";

/**
 * Une page comparative (30 octobre 2026) : Sitaly face à un autre outil, sur
 * le modèle des pages « compare » de durable.com, ou face à plusieurs outils
 * (« Alternatives à Wix », 14 novembre 2026). Les données et leurs règles
 * (faits vérifiables, prix relevés à une date, sources) vivent dans
 * src/data/comparatifs.ts.
 *
 * Audit SEO du 13 novembre 2026 : un verdict écrit, les limites de Sitaly,
 * les faits datés et sourcés, le coût sur trois ans ; un seul tableau dans le
 * HTML (il se replie en cartes sur téléphone, en CSS) ; une WebPage reliée
 * au WebSite de src/routes/__root.tsx par son @id.
 */

/** Le sujet de la page pour les données structurées : l'autre outil, ou une agence. */
function sujet(c: Comparatif) {
  if (c.id === "agence") return { "@type": "Service", name: "Création de site par une agence web" };
  if (c.outils) return { "@type": "Thing", name: "Créateurs de site internet" };
  return {
    "@type": "SoftwareApplication",
    name: c.colonne,
    applicationCategory: "BusinessApplication",
    ...(c.autreSite ? { url: c.autreSite } : {}),
  };
}

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
        { title: c.titre.length > 51 ? c.titre : `${c.titre} | Sitaly` },
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
                "@type": "WebPage",
                "@id": `${url}#page`,
                url,
                name: c.titre,
                description: c.description,
                inLanguage: "fr-FR",
                isPartOf: { "@id": `${BASE_URL}/#website` },
                about: [APP_REF, sujet(c)],
                publisher: { "@id": `${BASE_URL}/#business` },
                dateModified: RELEVE_ISO,
                breadcrumb: { "@id": `${url}#ariane` },
                ...(c.outils ? { mainEntity: { "@id": `${url}#outils` } } : {}),
              },
              ...(c.outils
                ? [
                    {
                      "@type": "ItemList",
                      "@id": `${url}#outils`,
                      name: c.colonne,
                      numberOfItems: c.outils.length,
                      itemListElement: c.outils.map((o, k) => ({
                        "@type": "ListItem",
                        position: k + 1,
                        name: o.nom,
                        url: o.site,
                      })),
                    },
                  ]
                : []),
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
                "@id": `${url}#ariane`,
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

function LienSource({ s }: { s: Source }) {
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2"
    >
      {s.label}
    </a>
  );
}

/**
 * Un seul tableau, deux mises en page : un tableau sur ordinateur, une carte
 * par ligne sur téléphone. Chaque cellule porte son en-tête dans data-label,
 * que le téléphone affiche devant la valeur.
 */
const TR =
  "mb-3 block rounded-3xl p-5 md:mb-0 md:table-row md:rounded-none md:border-t md:border-black/[0.06] md:p-0 md:align-top";
const TH_LIGNE = "block font-semibold md:table-cell md:py-4";
const TD =
  "mt-2 block before:mr-1 before:font-medium before:text-black/70 before:content-[attr(data-label)] md:mt-0 md:table-cell md:py-4 md:before:content-none";

function TableauDuel({ c }: { c: Comparatif }) {
  return (
    <div className="mt-12 md:overflow-hidden md:rounded-3xl md:border md:border-black/[0.08]">
      <table className="block w-full text-left text-base md:table md:text-[15px]">
        <caption className="sr-only">Sitaly ou {c.nom}, critère par critère</caption>
        <thead className="hidden md:table-header-group">
          <tr className="bg-black/[0.03]">
            <th scope="col" className="w-[20%] px-5 py-4 font-medium text-black/50">
              Critère
            </th>
            <th scope="col" className="w-[40%] px-5 py-4 font-semibold">
              Sitaly
            </th>
            <th scope="col" className="px-5 py-4 font-semibold">
              {c.colonne}
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {c.lignes.map((l) => (
            <tr key={l.critere} className={`${TR} bg-black/[0.03] md:bg-transparent`}>
              <th scope="row" className={`${TH_LIGNE} md:px-5 md:font-medium`}>
                {l.critere}
              </th>
              <td
                data-label="Sitaly :"
                className={`${TD} rounded-2xl bg-[#f6f3ff] p-3 md:rounded-none md:px-5`}
              >
                {l.sitaly}
              </td>
              <td data-label={`${c.colonne} :`} className={`${TD} px-3 md:px-5 ${TEXTE_GRIS}`}>
                {l.autre}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const COLONNES_OUTILS: { cle: keyof Outil; titre: string }[] = [
  { cle: "gratuit", titre: "Formule gratuite" },
  { cle: "prix", titre: "Premier prix payant" },
  { cle: "cout3Ans", titre: "Coût sur 3 ans" },
  { cle: "ia", titre: "Création par l'IA" },
  { cle: "boutique", titre: "Boutique" },
  { cle: "rendezVous", titre: "Rendez-vous" },
  { cle: "factures", titre: "Devis et factures" },
  { cle: "avis", titre: "Avis Google" },
];

function TableauOutils({ outils }: { outils: Outil[] }) {
  return (
    <div className="mt-12 md:overflow-x-auto md:rounded-3xl md:border md:border-black/[0.08]">
      <table className="block w-full text-left text-sm md:table md:min-w-[1100px]">
        <caption className="sr-only">Huit créateurs de site comparés, relevé du {RELEVE}</caption>
        <thead className="hidden md:table-header-group">
          <tr className="bg-black/[0.03]">
            <th scope="col" className="px-4 py-4 font-medium text-black/50">
              Outil
            </th>
            {COLONNES_OUTILS.map((col) => (
              <th key={col.cle} scope="col" className="px-4 py-4 font-semibold">
                {col.titre}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {outils.map((o) => (
            <tr
              key={o.id}
              className={`${TR} ${o.id === "sitaly" ? "bg-[#f6f3ff]" : "bg-black/[0.03] md:bg-transparent"}`}
            >
              <th scope="row" className={`${TH_LIGNE} text-base md:px-4 md:text-sm`}>
                {o.nom}
              </th>
              {COLONNES_OUTILS.map((col) => (
                <td
                  key={col.cle}
                  data-label={`${col.titre} :`}
                  className={`${TD} text-sm md:px-4 ${TEXTE_GRIS}`}
                >
                  {o[col.cle] as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
            <p className={`mt-4 text-sm ${TEXTE_GRIS}`}>
              Prix et fonctions relevés le {RELEVE} sur les pages officielles citées plus bas.
            </p>
          </div>
        </section>

        <section className="px-4 pb-12 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="titre-produit text-3xl sm:text-4xl">Lequel choisir ?</h2>
            <div className={`mt-5 space-y-4 text-lg leading-8 ${TEXTE_GRIS}`}>
              {c.verdict.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className={`${CARTE} mt-8 p-6`}>
              <h3 className="font-semibold">Pas fait pour vous si…</h3>
              <p className={`mt-2 leading-7 ${TEXTE_GRIS}`}>{c.pasPourVous}</p>
            </div>
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
          <div className={`mx-auto ${c.outils ? "max-w-6xl" : "max-w-5xl"}`}>
            <TitreSection
              surtitre="Point par point"
              titre={c.outils ? "Les huit outils côte à côte" : `Sitaly ou ${c.nom}`}
            />
            {c.outils ? <TableauOutils outils={c.outils} /> : <TableauDuel c={c} />}
            <p className={`mt-5 text-sm ${TEXTE_GRIS}`}>
              {c.sources.length > 0 ? (
                <>
                  Relevé le {RELEVE} sur{" "}
                  {c.sources.map((s, k) => (
                    <span key={s.url}>
                      {k > 0 && ", "}
                      <LienSource s={s} />
                    </span>
                  ))}
                  , susceptible d'évoluer.{" "}
                </>
              ) : null}
              Sitaly : {MENTION_TVA}.
            </p>
          </div>
        </section>

        {c.outils && (
          <section className="px-4 pb-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="titre-produit text-3xl sm:text-4xl">Meilleur pour…</h2>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {c.outils.map((o) => (
                  <div key={o.id} className={`${CARTE} p-6`}>
                    <h3 className="font-semibold">{o.nom}</h3>
                    <p className="mt-2 leading-7">
                      <span className="font-medium">Meilleur pour : </span>
                      {o.meilleurPour}
                    </p>
                    <p className={`mt-2 leading-7 ${TEXTE_GRIS}`}>
                      <span className="font-medium text-black/70">À savoir : </span>
                      {o.limite}
                    </p>
                    {o.sources.length > 0 && (
                      <p className={`mt-3 text-sm ${TEXTE_GRIS}`}>
                        Source :{" "}
                        {o.sources.map((s, k) => (
                          <span key={s.url}>
                            {k > 0 && ", "}
                            <LienSource s={s} />
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {c.faits.length > 0 && (
          <section className="px-4 pb-16 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="titre-produit text-3xl sm:text-4xl">Les faits relevés</h2>
              <p className={`mt-3 text-sm ${TEXTE_GRIS}`}>
                Relevés le {RELEVE} sur les pages officielles, chaque fait avec sa source.
              </p>
              <ul className="mt-6 space-y-3">
                {c.faits.map((f) => (
                  <li key={f.texte} className={`${CARTE} p-5`}>
                    <p className="leading-7">{f.texte}</p>
                    <p className={`mt-2 text-sm ${TEXTE_GRIS}`}>
                      Source : <LienSource s={f.source} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {c.cout && (
          <section className="px-4 pb-16 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="titre-produit text-3xl sm:text-4xl">Le coût sur trois ans</h2>
              <p className={`mt-4 leading-7 ${TEXTE_GRIS}`}>{c.cout.hypothese}</p>
              <ul className="mt-6 divide-y divide-black/[0.06] rounded-3xl border border-black/[0.08]">
                {c.cout.lignes.map((l) => (
                  <li
                    key={l.offre}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 p-5"
                  >
                    <div>
                      <div className="font-semibold">{l.offre}</div>
                      <div className={`text-sm ${TEXTE_GRIS}`}>{l.calcul}</div>
                    </div>
                    <div className="titre-produit text-xl">{l.total}</div>
                  </li>
                ))}
              </ul>
              <p className={`mt-5 leading-7 ${TEXTE_GRIS}`}>{c.cout.lecture}</p>
            </div>
          </section>
        )}

        {c.sections.length > 0 && (
          <section className="px-4 pb-16 sm:px-6">
            <div className="mx-auto max-w-3xl space-y-12">
              {c.sections.map((s) => (
                <div key={s.titre}>
                  <h2 className="titre-produit text-3xl sm:text-4xl">{s.titre}</h2>
                  <div className={`mt-4 space-y-4 text-lg leading-8 ${TEXTE_GRIS}`}>
                    {s.paragraphes.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {autres.map((x) => (
                <Link
                  key={x.id}
                  to="/comparer/$id/"
                  params={{ id: x.id }}
                  className={`${CARTE} group flex items-center justify-between p-5 transition hover:bg-black/[0.05]`}
                >
                  <span className="font-semibold">{x.carte}</span>
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
