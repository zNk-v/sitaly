import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Check, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeader } from "@/components/SectionHeader";
import { COULEURS_FAMILLE } from "@/data/expertises";
import { autresSecteurs, cheminSecteur, texteTarif, type Secteur } from "@/data/secteurs";
import { BASE_URL } from "@/lib/sitemap";
import { directiveRobots } from "@/lib/indexation";
import { CALENDLY_URL, PRIX_AGENTS_IA, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

/**
 * Gabarit des pages Agents IA par secteur.
 *
 * Il reprend la forme des pages d'expertise (ouverture sur voile, sections
 * numérotées ancrées à gauche, questions en `details`) pour que le visiteur
 * reste sur le même site, pas sur une landing détachée. Ce qui change est le
 * fond : ces pages répondent à une recherche qui croise un secteur et un
 * problème, et elles servent de page d'atterrissage aux prospects contactés.
 *
 * Le contenu vient entièrement de `src/data/secteurs.ts`.
 */
export function SecteurLanding({ s }: { s: Secteur }) {
  const autres = autresSecteurs(s);
  const encre = COULEURS_FAMILLE.automatisation.encre;
  const etapes = [
    {
      t: "Diagnostic offert, 30 minutes",
      d: "Où se perdent les demandes, quels outils sont en place, quelles règles de transfert vers votre équipe.",
    },
    {
      t: "Proposition écrite",
      d: "Le périmètre, les connexions à réaliser, le prix de mise en place et celui du pilotage mensuel.",
    },
    { t: "Installation et tests", d: s.scenarios },
    {
      t: "Mise en service et pilotage",
      d: "Lecture des échanges, ajustement des règles, compte rendu chaque mois. L'agent s'étend à un autre processus quand le premier est stable.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="on-wash pt-[calc(var(--entete-hauteur)+3rem)] pb-16 sm:pt-[calc(var(--entete-hauteur)+5rem)] sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Fil d'Ariane" className="rail-label text-muted-foreground">
            <Link to="/" className="transition hover:text-brand-ink">
              Accueil
            </Link>
            <span className="px-2 text-muted-foreground">/</span>
            <Link to="/agents-ia/" className="transition hover:opacity-80" style={{ color: encre }}>
              Agents IA
            </Link>
            <span className="px-2 text-muted-foreground">/</span>
            <span>{s.label}</span>
          </nav>

          <h1 className="display-hero mt-6 max-w-5xl">{s.h1}</h1>
          <p className="measure mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">
            {s.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton px-7 py-3.5"
            >
              <Calendar className="h-4 w-4" />
              Réserver le diagnostic offert
            </a>
            <a href={`tel:${SITALY_PHONE}`} className="bouton-secondaire px-6 py-3.5">
              <Phone className="h-4 w-4" />
              {SITALY_PHONE_DISPLAY}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm font-medium">
            {s.reperes.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-signal-ink" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 01. Le constat, dans les mots du métier. C'est ce qui fait qu'un
          dirigeant se reconnaît avant de lire la moindre promesse. */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="01"
            eyebrow="Le constat"
            title={
              <>
                {s.pertesTitre[0]} <span className="accent-word">{s.pertesTitre[1]}</span>
              </>
            }
          />
          <div className="mt-14 grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {s.pertes.map((p) => (
              <div key={p.t} className="lg:border-l lg:border-border lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
                <h3 className="font-display text-xl font-bold tracking-tight">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. Ce que fait l'agent, en liste de définitions comme sur les pages
          d'expertise : énumérer sans donner à chaque ligne le poids d'une offre. */}
      <section className="bg-paper-sunk py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="02"
            eyebrow="L'agent"
            title={
              <>
                Ce que fait <span className="accent-word">l'agent</span>
              </>
            }
          />
          <dl className="mt-14 border-t border-border">
            {s.actions.map((a) => (
              <div
                key={a.t}
                className="grid gap-x-10 gap-y-2 border-b border-border py-6 sm:grid-cols-[20rem_1fr] sm:py-7"
              >
                <dt className="font-display text-lg font-bold tracking-tight sm:text-xl">{a.t}</dt>
                <dd className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {a.d}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 03. Les limites. Elles rendent le reste crédible, et ce sont elles
          que les assistants IA reprennent quand on leur demande ce qu'un agent
          a le droit de faire. */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="03"
            eyebrow="Le cadre"
            title={
              <>
                {s.cadreTitre[0]} <span className="accent-word">{s.cadreTitre[1]}</span>
              </>
            }
          />
          <div
            className={`mt-14 grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 ${
              s.cadre.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {s.cadre.map((c) => (
              <div key={c.t} className="lg:border-l lg:border-border lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
                <h3 className="font-display text-xl font-bold tracking-tight">{c.t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. La mise en place : les outils, les quatre étapes, le tarif. */}
      <section className="bg-paper-sunk py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="04"
            eyebrow="Mise en place"
            title={
              <>
                Branché sur <span className="accent-word">vos outils</span>
              </>
            }
          />
          <div className="mt-14 grid gap-12 border-t border-border pt-10 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="measure leading-relaxed text-foreground/80">{s.outils}</p>
              {s.pourQui && (
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">Pour qui</h3>
                  <p className="measure mt-3 leading-relaxed text-muted-foreground">{s.pourQui}</p>
                </div>
              )}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-display text-xl font-bold tracking-tight">Tarif</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{texteTarif()}</p>
              </div>
            </div>

            <ol className="space-y-0 border-t border-border lg:border-t-0">
              {etapes.map((e, i) => (
                <li
                  key={e.t}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-6 first:pt-6 lg:first:pt-0"
                >
                  <span className="rail-num pt-1 text-sm font-bold text-brand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight">{e.t}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{e.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 05. Les questions, ouvertes sans script. */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="05"
            eyebrow="Questions"
            title={
              <>
                Ce qu'on nous <span className="accent-word">demande</span>
              </>
            }
          />
          <div className="mt-14 border-t border-border">
            {s.faq.map((f) => (
              <details key={f.q} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-lg font-bold tracking-tight marker:content-none sm:text-xl">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-transform group-open:rotate-45"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M6 1.5v9M1.5 6h9" />
                    </svg>
                  </span>
                </summary>
                <p className="measure pb-7 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage : les deux autres secteurs et la page Agents IA. */}
      <section className="bg-paper-sunk py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Agents IA"
            title={
              <>
                Les autres <span className="accent-word">secteurs</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {autres.map((a) => (
              <Link
                key={a.slug}
                to={cheminSecteur(a)}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated"
              >
                <h3 className="font-display text-lg font-bold leading-snug transition group-hover:text-brand-ink">
                  {a.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.carte}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
                  Voir la page
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
            <Link
              to="/agents-ia/"
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated"
            >
              <h3 className="font-display text-lg font-bold leading-snug transition group-hover:text-brand-ink">
                Tous les agents IA
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Le système complet : accueil, qualification, rendez-vous, relances.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
                Voir la page
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 hero-bg" aria-hidden="true" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="display-section">{s.ctaTitre}</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Trente minutes pour regarder où se perdent vos demandes et ce qu'un agent peut en
            reprendre. Le diagnostic est offert, le chiffrage arrive par écrit, sans engagement.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton px-7 py-3.5"
            >
              <Calendar className="h-4 w-4" />
              Réserver le diagnostic offert
            </a>
            <a href={`tel:${SITALY_PHONE}`} className="bouton-secondaire px-6 py-3.5">
              <Phone className="h-4 w-4" />
              {SITALY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/**
 * Métadonnées et données structurées : le service, le fil d'Ariane et la
 * foire aux questions. Le prix n'entre dans le balisage que s'il est affiché
 * sur la page : un balisage ne doit jamais annoncer ce que la page ne dit pas.
 */
export function buildSecteurHead(s: Secteur) {
  const chemin = cheminSecteur(s);
  const url = `${BASE_URL}${chemin}`;

  const service: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Agent IA pour ${s.audience.toLowerCase()}`,
    serviceType: "Installation et pilotage d'agents IA",
    description: s.description,
    url,
    provider: { "@id": `${BASE_URL}/#business` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      { "@type": "Country", name: "France" },
    ],
    audience: { "@type": "BusinessAudience", audienceType: s.audience },
  };
  if (PRIX_AGENTS_IA.afficher) {
    service.offers = [
      {
        "@type": "Offer",
        name: "Mise en place",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: PRIX_AGENTS_IA.miseEnPlaceMin,
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Offer",
        name: "Pilotage mensuel",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: PRIX_AGENTS_IA.mensuelMin,
          priceCurrency: "EUR",
          unitCode: "MON",
          unitText: "mois",
        },
      },
    ];
  }

  return {
    meta: [
      { title: s.titre },
      { name: "description", content: s.description },
      { name: "robots", content: directiveRobots(chemin) },
      { property: "og:type", content: "website" },
      { property: "og:title", content: s.titre },
      { property: "og:description", content: s.description },
      { property: "og:url", content: url },
      { property: "og:image", content: `${BASE_URL}/og-agents-ia.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${BASE_URL}/og-agents-ia.jpg` },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            service,
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Agents IA",
                  item: `${BASE_URL}/agents-ia/`,
                },
                { "@type": "ListItem", position: 3, name: s.label, item: url },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: s.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  };
}
