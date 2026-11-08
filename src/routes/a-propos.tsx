import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeader } from "@/components/SectionHeader";
import { FondateurCard } from "@/components/FondateurCard";
import { REALISATIONS } from "@/data/realisations";
import { PRODUITS } from "@/data/produits";
import { lienCreation } from "@/components/produit/Produit";
import { BASE_URL } from "@/lib/sitemap";
import { SITALY_DEPARTEMENT, SITALY_VILLE } from "@/lib/config";

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
  "Teddy Vidal a fondé Sitaly, l'application française qui crée le site internet des artisans, des indépendants et des TPE à partir d'une phrase, avec l'IA.";
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

const BADGE_FABRIQUE_DU_NET =
  "https://www.lafabriquedunet.fr/badge/software/sitaly/badge.js?color=dark";

/**
 * Badge La Fabrique du Net. Leur script s'insère juste avant sa propre balise.
 * La balise reste dans le HTML prérendu, comme le demande leur consigne
 * d'intégration ; une navigation interne ne l'exécute pas, d'où l'effet.
 */
function BadgeFabriqueDuNet() {
  const zone = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = zone.current;
    if (!el || el.querySelector("[data-lfdn-badge]")) return;
    el.replaceChildren();
    const script = document.createElement("script");
    script.src = BADGE_FABRIQUE_DU_NET;
    el.append(script);
  }, []);
  return (
    <div
      ref={zone}
      style={{ minHeight: 42 }}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `<script src="${BADGE_FABRIQUE_DU_NET}" defer></script>`,
      }}
    />
  );
}

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
            Sitaly est une application française qui crée le site internet des artisans, des
            indépendants et des TPE à partir d'une phrase, avec l'IA. Avant l'application, je
            créais ces sites à la main. Aujourd'hui, l'IA écrit le vôtre en une minute environ, et
            vous gardez la main pour le relire et le publier.
          </p>
          <p className="measure mt-4 text-foreground/75">
            Vous préférez qu'on s'occupe de tout ? L'équipe Sitaly peut créer et suivre votre site à
            votre place, ou installer des{" "}
            <Link to="/agents-ia/" className="font-semibold text-brand-ink hover:underline">
              agents IA sur mesure
            </Link>
            .
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
                Une application pour <span className="accent-word">les petites entreprises</span>
              </>
            }
            subtitle="Votre site, vos devis et factures, vos rendez-vous, vos avis Google et votre référencement, au même endroit."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUITS.map((p) => (
              <Link
                key={p.id}
                to="/produits/$id/"
                params={{ id: p.id }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated"
              >
                <h3 className="font-display text-lg font-bold leading-snug transition group-hover:text-brand-ink">
                  {p.nom}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.menuDesc}</p>
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
            subtitle="Des sites que j'ai conçus à la main, avant l'application."
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
            <BadgeFabriqueDuNet />
          </div>
          <div className="mt-10">
            <a href={lienCreation()} className="bouton px-7 py-3.5">
              Créer mon site
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
