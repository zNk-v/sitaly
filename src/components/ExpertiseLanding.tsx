import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Check, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeader } from "@/components/SectionHeader";
import { FAMILLES, cheminExpertise, voisines, type Expertise } from "@/data/expertises";
import { BASE_URL } from "@/lib/sitemap";
import { CALENDLY_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

/**
 * Gabarit des pages d'expertise.
 *
 * Court par construction : quatre blocs, pas douze. Une page d'expertise n'a
 * pas à refaire le travail de l'accueil, elle doit répondre à une question
 * précise et proposer l'appel. Ce qui déborde de ces quatre blocs appartient
 * soit à l'accueil, soit à une autre expertise.
 *
 * Le contenu vient entièrement de `src/data/expertises.ts` : ce fichier ne
 * décide que de la mise en page.
 */
export function ExpertiseLanding({ e }: { e: Expertise }) {
  const famille = FAMILLES.find((f) => f.id === e.famille)!;
  const autres = voisines(e);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Ouverture. Le voile plutôt qu'un aplat : la page doit ressembler à
          une section de l'accueil, pas à une plaquette détachée. */}
      <section className="on-wash pt-[calc(var(--entete-hauteur)+3rem)] pb-16 sm:pt-[calc(var(--entete-hauteur)+5rem)] sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Fil d'Ariane" className="rail-label text-muted-foreground">
            <Link to="/" className="transition hover:text-brand-ink">
              Accueil
            </Link>
            <span className="px-2 text-muted-foreground">/</span>
            <span className="text-brand-ink">{famille.titre}</span>
          </nav>

          <h1 className="display-hero mt-6 max-w-4xl">{e.h1}</h1>
          <p className="measure mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">
            {e.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton px-7 py-3.5"
            >
              <Calendar className="h-4 w-4" />
              Parler de votre projet
            </a>
            <a href={`tel:${SITALY_PHONE}`} className="bouton-secondaire px-6 py-3.5">
              <Phone className="h-4 w-4" />
              {SITALY_PHONE_DISPLAY}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm font-medium">
            {e.reperes.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-signal-ink" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 01. Le détail de la prestation, en liste de définitions : c'est la
          forme la plus sobre pour énumérer sans donner à chaque ligne le poids
          visuel d'une offre. */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="01"
            eyebrow="Le détail"
            title={
              <>
                Ce que ça <span className="accent-word">comprend</span>
              </>
            }
          />
          <dl className="stagger mt-14 border-t border-border">
            {e.comprend.map((c, i) => (
              <div
                key={c.t}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className="grid gap-x-10 gap-y-2 border-b border-border py-6 sm:grid-cols-[20rem_1fr] sm:py-7"
              >
                <dt className="font-display text-lg font-bold tracking-tight sm:text-xl">{c.t}</dt>
                <dd className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {c.d}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 02. Les cas où la prestation se justifie, et celui où elle ne se
          justifie pas : c'est ce dernier qui rend les trois autres crédibles. */}
      <section className="bg-paper-sunk py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="02"
            eyebrow="Pour qui"
            title={
              <>
                Quand ça se <span className="accent-word">justifie</span>
              </>
            }
          />
          <div className="stagger mt-14 grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-3">
            {e.quand.map((q, i) => (
              <div
                key={q.t}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className="sm:border-l sm:border-border sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
              >
                <h3 className="font-display text-xl font-bold tracking-tight">{q.t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{q.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. Quatre questions, ouvertes sans script : `details` suffit et
          reste lisible sans JavaScript, ce qui vaut aussi pour l'exploration. */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="03"
            eyebrow="Questions"
            title={
              <>
                Ce qu'on nous <span className="accent-word">demande</span>
              </>
            }
          />
          <div className="mt-14 border-t border-border">
            {e.faq.map((f) => (
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

      {/* Maillage interne : les autres pages de la même famille. C'est ce qui
          fait circuler le visiteur et l'exploration entre des pages qui, sans
          lui, ne seraient reliées que par le menu. */}
      {autres.length > 0 && (
        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={famille.titre}
              title={
                <>
                  Les autres pages de <span className="accent-word">cette famille</span>
                </>
              }
            />
            <div className="stagger mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((a, i) => (
                <Link
                  key={a.slug}
                  to={cheminExpertise(a)}
                  data-reveal
                  style={{ "--i": i } as React.CSSProperties}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated"
                >
                  <h3 className="font-display text-lg font-bold leading-snug transition group-hover:text-brand-ink">
                    {a.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.menuDesc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
                    Voir la page
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Appel final. Vingt minutes, pas un formulaire de dix champs. */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 hero-bg" aria-hidden="true" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="display-section">
            On en parle <span className="accent-word">vingt minutes</span> ?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Vous décrivez votre activité, on dit ce qui est faisable et ce qui ne l'est pas. Le
            chiffrage arrive par écrit après l'appel, sans engagement.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton px-7 py-3.5"
            >
              <Calendar className="h-4 w-4" />
              Réserver l'appel
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
 * Métadonnées de la page : titre, description, canonique, et les données
 * structurées que les moteurs comme les assistants lisent en priorité.
 *
 * Trois blocs : le service rendu, le fil d'Ariane, et la foire aux questions.
 * Le dernier est celui qui produit les résultats enrichis, et c'est aussi
 * celui que les modèles de langage citent le plus volontiers, parce qu'une
 * question suivie de sa réponse se reprend telle quelle.
 */
export function buildExpertiseHead(e: Expertise) {
  const url = `${BASE_URL}${cheminExpertise(e)}`;
  const famille = FAMILLES.find((f) => f.id === e.famille)!;

  return {
    meta: [
      { title: e.titre },
      { name: "description", content: e.description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: e.titre },
      { property: "og:description", content: e.description },
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
              "@type": "Service",
              name: e.label,
              serviceType: e.label,
              description: e.description,
              url,
              category: famille.titre,
              areaServed: { "@type": "Country", name: "France" },
              provider: {
                "@type": "Organization",
                name: "Sitaly",
                url: `${BASE_URL}/`,
                telephone: SITALY_PHONE,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
                { "@type": "ListItem", position: 2, name: e.label, item: url },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: e.faq.map((f) => ({
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
