import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Plus } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { PictoRubrique } from "@/components/PictoRubrique";
import { euros } from "@/lib/config";
import { BASE_URL } from "@/lib/sitemap";
import { FAQ_TARIFS } from "@/data/faq-tarifs";
import { pageOffre, type PageOffre } from "@/data/pages-offres";
import { REALISATIONS, srcSetCapture } from "@/data/realisations";
import {
  A_LA_CARTE,
  GRILLES,
  GROUPES,
  MENTION_TVA,
  RACHAT_SITE,
  offre,
  offresDu,
  prixCourt,
  type Offre,
} from "@/data/offres";

/**
 * Page d'une offre (23 octobre 2026), sur le modèle des pages d'offre de
 * devmiweb.com : chaque entrée du menu mène à la page de l'offre cliquée.
 *
 * Dans l'ordre : l'accroche et le prix, pour qui, ce qui est compris (les
 * rubriques de la grille), l'écart avec les offres voisines, le déroulé, le
 * prix ligne par ligne, les réalisations, les questions, puis le
 * questionnaire avec l'offre déjà choisie.
 *
 * Prix et contenu : src/data/offres.ts. Texte propre à l'offre :
 * src/data/pages-offres.ts. Questions communes : src/data/faq-tarifs.ts.
 */

/** Les questions de /tarifs/ reprises sur une page d'offre de site. */
const FAQ_SITE = [
  "Est-ce vraiment sans engagement ?",
  "À qui appartient mon site ?",
  "Que se passe-t-il si j'arrête ?",
  "Pourquoi des frais de mise en service ?",
];
const FAQ_MAINTENANCE = ["Est-ce vraiment sans engagement ?", "Je garde mon nom de domaine ?"];

function questions(p: PageOffre, o: Offre) {
  const communes = o.groupe === "site" ? FAQ_SITE : FAQ_MAINTENANCE;
  return [...p.faq, ...FAQ_TARIFS.filter((f) => communes.includes(f.q))];
}

/** Ce que `o` a de plus que `autre` : lignes absentes chez l'autre, ou avec une autre valeur. */
function ecart(o: Offre, autre: Offre): string[] {
  return GRILLES[o.groupe].flatMap((r) =>
    r.lignes.flatMap((l) => {
      const v = l.valeurs[o.id];
      if (!v || v === l.valeurs[autre.id]) return [];
      return [v === true ? l.libelle : `${l.libelle} : ${v}`];
    }),
  );
}

export const Route = createFileRoute("/offres/$id")({
  loader: ({ params }) => {
    const page = pageOffre(params.id);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.page;
    if (!p) return {};
    const o = offre(p.id);
    const url = `${BASE_URL}/offres/${o.id}/`;
    const titre = `${o.nom} : ${p.sujet}, ${prixCourt(o)} | Sitaly`;
    const description = `${o.pour} ${prixCourt(o)} + ${euros(o.depart)} ${o.departLibelle}, sans engagement.`;
    return {
      meta: [
        { title: titre },
        { name: "description", content: description },
        { property: "og:title", content: titre },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: o.nom,
            description: o.pour,
            url,
            provider: { "@type": "Organization", name: "Sitaly", url: BASE_URL },
            areaServed: "FR",
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: o.mensuel ?? o.depart,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: o.mensuel ?? o.depart,
                priceCurrency: "EUR",
                ...(o.mensuel !== undefined ? { unitText: "MONTH" } : {}),
              },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: questions(p, o).map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Tarifs", item: `${BASE_URL}/tarifs/` },
              { "@type": "ListItem", position: 3, name: o.nom, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PageDOffre,
});

function PageDOffre() {
  const { page: p } = Route.useLoaderData();
  const o = offre(p.id);
  const groupe = offresDu(o.groupe);
  const rang = groupe.findIndex((x) => x.id === o.id);
  const avant = groupe[rang - 1];
  const apres = groupe[rang + 1];
  const site = o.groupe === "site";
  const faq = questions(p, o);

  return (
    <div
      className={`${o.groupe === "agents-ia" ? "ambiance-automatisation" : "ambiance-site"} min-h-screen bg-background text-foreground`}
    >
      <SiteChrome>
        {/* ---------- Accroche et prix ---------- */}
        <section className="hero-bg relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_24rem] lg:items-center">
            <div>
              <div className="rail-label text-brand-ink">
                <Link to="/tarifs/" hash={GROUPES[o.groupe].ancre} className="hover:underline">
                  {GROUPES[o.groupe].titre}
                </Link>
              </div>
              <h1 className="display-hero mt-4 max-w-4xl">{p.h1}</h1>
              <p className="measure mt-6 text-lg text-muted-foreground">{p.intro}</p>
            </div>

            <aside className="on-ink relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-elevated sm:p-8">
              <span
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-[image:var(--gradient-ruban)]"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-2xl font-extrabold tracking-[-0.03em]">{o.nom}</p>
                {o.recommandee && (
                  <span className="rounded-full bg-[image:var(--gradient-ruban)] px-3 py-1 text-[12px] font-semibold text-white">
                    Recommandée
                  </span>
                )}
              </div>
              <p className="mt-5 flex items-baseline gap-1.5">
                {o.aPartirDe && <span className="font-medium text-white/70">dès</span>}
                <span className="font-display text-[3.25rem] font-extrabold leading-none tracking-[-0.045em] tabular-nums">
                  {euros(o.mensuel ?? o.depart)}
                </span>
                {o.mensuel !== undefined && (
                  <span className="font-medium text-white/70">/mois</span>
                )}
              </p>
              <p className="mt-2 text-[15px] font-medium text-white/85">
                + {o.aPartirDe ? "dès " : ""}
                {euros(o.depart)} {o.departLibelle}
              </p>
              <p className="mt-1 text-sm text-white/55">Sans engagement. {MENTION_TVA}.</p>
              <Link
                to="/mon-projet/"
                search={{ offre: o.id }}
                className="bouton mt-7 w-full px-6 py-3.5"
              >
                Choisir cette offre
                <ArrowRight className="bouton-fleche h-4 w-4" />
              </Link>
              {groupe.length > 1 && (
                <Link
                  to="/tarifs/"
                  hash={GROUPES[o.groupe].ancre}
                  className="mt-4 block text-center text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  Comparer les {groupe.length} offres
                </Link>
              )}
            </aside>
          </div>
        </section>

        {/* ---------- Pour qui ---------- */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Cette offre est pour vous si
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {p.pourQui.map((t) => (
                <li
                  key={t}
                  className="flex gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-signal/20 text-signal-ink">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[16px] leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Ce qui est compris ---------- */}
        <section className="border-t border-border bg-paper-sunk py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">Ce qui est compris</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {GRILLES[o.groupe].map((r) => {
                const lignes = r.lignes.filter((l) => l.valeurs[o.id]);
                if (!lignes.length) return null;
                return (
                  <div
                    key={r.titre}
                    className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                  >
                    <p className="flex items-center gap-3 font-display text-lg font-bold">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-ink/10 text-brand-ink">
                        <PictoRubrique icone={r.icone} className="h-4.5 w-4.5" />
                      </span>
                      {r.titre}
                    </p>
                    <ul className="mt-4 space-y-2.5 text-[15px]">
                      {lignes.map((l) => {
                        const v = l.valeurs[o.id];
                        return (
                          <li key={l.libelle} className="flex gap-3">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-ink" />
                            <span>
                              {l.libelle}
                              {typeof v === "string" && (
                                <strong className="font-semibold"> : {v}</strong>
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- L'écart avec les offres voisines ---------- */}
        {(avant || apres) && (
          <section className="py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <h2 className="font-display text-3xl font-bold tracking-tight">
                {avant && apres
                  ? "Ce qui change d'une offre à l'autre"
                  : avant
                    ? `L'écart avec ${avant.nom}`
                    : "Et si vous voulez plus ?"}
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {avant && (
                  <Ecart
                    titre={`Ce que ${o.nom} ajoute à ${avant.nom}`}
                    prix={`${prixCourt(o)} au lieu de ${prixCourt(avant)}`}
                    lignes={ecart(o, avant)}
                    lien={{ label: `Voir ${avant.nom}`, offre: avant }}
                  />
                )}
                {apres && (
                  <Ecart
                    titre={`Ce que ${apres.nom} ajoute`}
                    prix={`${prixCourt(apres)}, ${euros(apres.depart)} ${apres.departLibelle}`}
                    lignes={ecart(apres, o)}
                    lien={{ label: `Voir ${apres.nom}`, offre: apres }}
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {/* ---------- Le déroulé ---------- */}
        <section className="border-t border-border bg-paper-sunk py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">Comment ça se passe</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {p.etapes.map((e, i) => (
                <li
                  key={e.titre}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <span className="font-display text-sm font-bold text-brand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold">{e.titre}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {e.texte}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Le prix, ligne par ligne ---------- */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              {euros(o.depart)} puis {euros(o.mensuel ?? 0)} par mois : le détail
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              <BlocPrix titre={`${euros(o.depart)} ${o.departLibelle}, une fois`}>
                {site
                  ? "Payés à la signature : l'appel de départ, la rédaction des pages, la conception du site, sa mise en ligne et la remise en ordre de votre fiche Google. Non remboursables une fois le travail lancé."
                  : "Payés à la signature : l'état des lieux du site, de ses versions, de ses extensions et de ses sauvegardes. Si une remise en état s'impose, vous recevez un devis séparé avant tout travail."}
              </BlocPrix>
              <BlocPrix titre={`${euros(o.mensuel ?? 0)} par mois, sans engagement`}>
                {site
                  ? "L'hébergement, le nom de domaine, la maintenance et tout ce que la liste ci-dessus prévoit chaque mois. Vous arrêtez quand vous voulez, sans frais."
                  : "Les sauvegardes, les mises à jour et les corrections mineures. Vous arrêtez quand vous voulez, sans frais."}
              </BlocPrix>
              <BlocPrix titre="À prévoir à part">
                {site ? (
                  <ul className="space-y-1.5">
                    {A_LA_CARTE.filter(
                      (a) =>
                        a.libelle.startsWith("Page supplémentaire") ||
                        (o.id === "presence" && a.libelle.startsWith("Passage")),
                    ).map((a) => (
                      <li key={a.libelle} className="flex justify-between gap-3">
                        <span>{a.libelle}</span>
                        <span className="shrink-0 font-semibold text-foreground tabular-nums">
                          {euros(a.prix)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  (o.notes?.[0] ?? "Rien d'autre que ce qui est annoncé dans l'audit.")
                )}
              </BlocPrix>
            </div>
            {site && (
              <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                Le site reste la propriété de Sitaly tant que dure l'abonnement : c'est ce qui
                permet d'inclure la création dans la mensualité. Si vous partez, vous pouvez le
                racheter (
                {RACHAT_SITE.map((r) => `${euros(r.prix)} ${r.periode.toLowerCase()}`).join(", ")}
                ). Votre nom de domaine vous est transféré gratuitement, et votre fiche Google reste
                la vôtre. {MENTION_TVA}.
              </p>
            )}
          </div>
        </section>

        {/* ---------- Réalisations ---------- */}
        {site && (
          <section className="border-t border-border bg-paper-sunk py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-3xl font-bold tracking-tight">Des sites livrés</h2>
                <Link
                  to="/realisations/"
                  className="inline-flex items-center gap-2 font-semibold text-brand-ink"
                >
                  Toutes les réalisations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {REALISATIONS.slice(0, 3).map((r) => (
                  <Link
                    key={r.slug}
                    to="/realisations/$slug/"
                    params={{ slug: r.slug }}
                    className="lift group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
                  >
                    <img
                      src={r.capture.webp.w560}
                      srcSet={srcSetCapture(r)}
                      sizes="(min-width: 1024px) 400px, 100vw"
                      alt={`Le site de ${r.client}`}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                    <div className="p-5">
                      <p className="font-display text-lg font-bold">{r.client}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {r.metier}, {r.zone}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------- Questions ---------- */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">Vos questions</h2>
            <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
              {faq.map((f) => (
                <details key={f.q} className="group p-5 sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <Plus className="h-4 w-4 shrink-0 transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Le questionnaire ---------- */}
        <section className="border-t border-border bg-paper-sunk py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">On démarre ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Deux écrans : votre activité, puis vos coordonnées. Vous recevez l'offre par e-mail,
              avec le lien pour réserver un appel de 30 minutes.
            </p>
            <Link to="/mon-projet/" search={{ offre: o.id }} className="bouton mt-8 px-7 py-3.5">
              Choisir cette offre
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </Link>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}

function Ecart({
  titre,
  prix,
  lignes,
  lien,
}: {
  titre: string;
  prix: string;
  lignes: string[];
  lien: { label: string; offre: Offre };
}) {
  const page = pageOffre(lien.offre.id);
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-lg font-bold">{titre}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-ink">{prix}</p>
      <ul className="mt-4 flex-1 space-y-2.5 text-[15px]">
        {lignes.map((l) => (
          <li key={l} className="flex gap-3">
            <Plus className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
            <span>{l}</span>
          </li>
        ))}
      </ul>
      {page ? (
        <Link
          to="/offres/$id/"
          params={{ id: lien.offre.id }}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-ink"
        >
          {lien.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <Link
          to="/tarifs/"
          hash={lien.offre.id}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-ink"
        >
          {lien.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function BlocPrix({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-lg font-bold">{titre}</h3>
      <div className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
