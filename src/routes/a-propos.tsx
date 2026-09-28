import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeader } from "@/components/SectionHeader";
import { FondateurCard } from "@/components/FondateurCard";
import { REALISATIONS } from "@/data/realisations";
import { SECTEURS, cheminSecteur } from "@/data/secteurs";
import { BASE_URL } from "@/lib/sitemap";
import { CALENDLY_URL, SITALY_DEPARTEMENT, SITALY_VILLE } from "@/lib/config";

/**
 * Page auteur et entreprise.
 *
 * Elle existe pour deux lecteurs. Le prospect qui veut savoir à qui il parle,
 * et les moteurs, Google comme les assistants IA, qui relient un article, une
 * page de service et un profil LinkedIn à une même personne et à une même
 * entreprise. D'où l'identité légale écrite en toutes lettres : c'est ce qui
 * rattache le nom commercial au registre.
 *
 * Rien ici n'est inventé. Le parcours reste à écrire par Teddy lui-même.
 */
const TITRE = "Teddy Vidal, fondateur de Sitaly | À propos";
const DESCRIPTION =
  "Sitaly, micro-agence de Teddy Vidal à Brétigny-sur-Orge (Essonne) : agents IA, automatisations et sites pour les PME. Un seul interlocuteur.";
const URL = `${BASE_URL}/a-propos/`;

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${URL}#page`,
          url: URL,
          name: TITRE,
          inLanguage: "fr-FR",
          about: { "@id": `${BASE_URL}/#business` },
          mainEntity: { "@id": `${BASE_URL}/#teddy-vidal` },
          isPartOf: { "@id": `${BASE_URL}/#website` },
        }),
      },
    ],
  }),
  component: APropos,
});

function APropos() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="on-wash pt-[calc(var(--entete-hauteur)+3rem)] pb-16 sm:pt-[calc(var(--entete-hauteur)+5rem)] sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Fil d'Ariane" className="rail-label text-muted-foreground">
            <Link to="/" className="transition hover:text-brand-ink">
              Accueil
            </Link>
            <span className="px-2 text-muted-foreground">/</span>
            <span>À propos</span>
          </nav>
          <h1 className="display-hero mt-6 max-w-4xl">
            Teddy Vidal, <span className="accent-word">fondateur de Sitaly</span>
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">
            Sitaly est une micro-agence d'une seule personne. J'installe les agents IA, je construis
            les automatisations et les sites, et je pilote les campagnes de mes clients. Basé à{" "}
            {SITALY_VILLE}, dans l'{SITALY_DEPARTEMENT}, je travaille avec des PME d'Île-de-France
            et, à distance, de toute la France.
          </p>
          <p className="measure mt-4 text-foreground/75">
            Vous êtes dans le département ? La page{" "}
            <Link to="/essonne/" className="font-semibold text-brand-ink hover:underline">
              agence web et agents IA en Essonne
            </Link>{" "}
            détaille ce que je fais sur place et les communes où j'interviens.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FondateurCard />
        </div>
      </section>

      <section className="bg-paper-sunk py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="01"
            eyebrow="Ce que je fais"
            title={
              <>
                Des agents IA pour <span className="accent-word">les PME</span>
              </>
            }
            subtitle="Accueil téléphonique, qualification des demandes, prise de rendez-vous, relance des devis. Chaque agent est branché sur les outils de l'entreprise, et un humain reprend la main dès que la situation le demande."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/agents-ia/"
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated"
            >
              <h3 className="font-display text-lg font-bold leading-snug transition group-hover:text-brand-ink">
                Agents IA
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Le système complet et la méthode de déploiement.
              </p>
              <ArrowRight className="mt-4 h-4 w-4 text-brand-ink transition-transform group-hover:translate-x-0.5" />
            </Link>
            {SECTEURS.map((s) => (
              <Link
                key={s.slug}
                to={cheminSecteur(s)}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated"
              >
                <h3 className="font-display text-lg font-bold leading-snug transition group-hover:text-brand-ink">
                  {s.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.carte}</p>
                <ArrowRight className="mt-4 h-4 w-4 text-brand-ink transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="02"
            eyebrow="Réalisations"
            title={
              <>
                Des projets <span className="accent-word">réellement en ligne</span>
              </>
            }
          />
          <ul className="mt-12 border-t border-border">
            {REALISATIONS.map((r) => (
              <li key={r.slug} className="border-b border-border">
                <Link
                  to="/realisations/$slug/"
                  params={{ slug: r.slug }}
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <span>
                    <span className="block font-display text-lg font-bold tracking-tight transition group-hover:text-brand-ink">
                      {r.client}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {r.metier} · {r.zone}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand-ink transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-sunk py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            index="03"
            eyebrow="Identité"
            title={
              <>
                L'entreprise, <span className="accent-word">en toutes lettres</span>
              </>
            }
          />
          <div className="measure mt-12 space-y-4 border-t border-border pt-10 leading-relaxed text-muted-foreground">
            <p>
              Sitaly est le nom commercial de Teddy Vidal, entrepreneur individuel, immatriculé sous
              le numéro SIREN 833 848 831, à {SITALY_VILLE} ({SITALY_DEPARTEMENT}).
            </p>
            <p>
              Les mentions complètes figurent dans les{" "}
              <Link
                to="/mentions-legales/"
                className="font-semibold text-brand-ink hover:underline"
              >
                mentions légales
              </Link>
              .
            </p>
          </div>
          <div className="mt-10">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton px-7 py-3.5"
            >
              <Calendar className="h-4 w-4" />
              Réserver un diagnostic de 30 min
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
