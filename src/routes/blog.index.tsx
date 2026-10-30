import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeader } from "@/components/SectionHeader";
import { BlogCard, encreRubrique, teinteRubrique } from "@/components/BlogCard";
import {
  BLOG_POSTS as TOUS_LES_ARTICLES,
  POSTS_RECENTS as TOUS_LES_RECENTS,
  formatDate,
  postsALaUne,
} from "@/data/blog-posts";
import { articleIndexable } from "@/lib/indexation";

/* Le blog ne liste que les articles indexés (src/lib/indexation.ts). Les
   articles écrits pour les artisans restent en ligne à leur adresse, pour la
   prospection directe, mais ne figurent plus ni ici ni dans le sitemap. */
const BLOG_POSTS = TOUS_LES_ARTICLES.filter((p) => articleIndexable(p.slug));
const POSTS_RECENTS = TOUS_LES_RECENTS.filter((p) => articleIndexable(p.slug));

/**
 * L'index du blog.
 *
 * Il empilait dix rubriques et trente-trois articles en une seule colonne, en
 * cartes identiques : pour trouver un sujet, il fallait faire défiler la page
 * entière. Trois choses changent.
 *
 * 1. Une sélection en tête, un grand article et deux autres. Une page qui
 *    ouvre sur trente-trois articles de même poids ne dit pas par où commencer.
 * 2. Un filtre par rubrique plutôt que dix ancres. L'ancre déplaçait le
 *    lecteur, le filtre lui répond.
 * 3. Une grille à trois colonnes, où la couleur du filet dit la rubrique. Sur
 *    trente-trois articles, c'est ce repère qui remplace la lecture des
 *    étiquettes une par une.
 *
 * Le filtre est un état React, donc le rendu statique sort avec « Tout » :
 * les trente-trois liens sont dans le HTML livré, ce dont dépend l'exploration.
 */

// Rubriques du blog, dans l'ordre d'affichage. `key` doit correspondre au champ
// `category` des articles (src/data/blog-posts.ts).
const RUBRIQUES: { key: string; id: string; label: string; desc: string }[] = [
  {
    key: "Créer son site",
    id: "creer-son-site",
    label: "Créer son site",
    desc: "Gratuit ou payant, avec ou sans IA : créer un site qui vous ressemble et vous amène des clients.",
  },
  {
    key: "Lancer son activité",
    id: "lancer-son-activite",
    label: "Lancer son activité",
    desc: "Trouver un nom, être trouvé sur Google, faire les bonnes démarches dès le départ.",
  },
  {
    key: "Trouver des chantiers",
    id: "trouver-des-chantiers",
    label: "Trouver des chantiers",
    desc: "Les canaux qui remplissent un planning, ce que coûtent les plateformes, et comment ne plus perdre un appel.",
  },
  {
    key: "Outils & logiciels",
    id: "outils-logiciels",
    label: "Outils & logiciels",
    desc: "CRM, devis, chatbot : ce que chaque outil règle vraiment, et celui par lequel commencer.",
  },
  {
    key: "Acquisition de clients",
    id: "clients-par-metier",
    label: "Clients par métier",
    desc: "Ostéo, avocat, coach, consultant, expert-comptable… les leviers concrets, métier par métier.",
  },
  {
    key: "Site internet",
    id: "site-internet",
    label: "Site internet",
    desc: "Créer, refondre et rentabiliser un site qui transforme vos visiteurs en appels.",
  },
  {
    key: "Référencement",
    id: "referencement",
    label: "Référencement local",
    desc: "Être trouvé sur Google : fiche Google Business, avis clients et SEO local.",
  },
  {
    key: "Publicité IA",
    id: "publicite-ia",
    label: "Publicité IA",
    desc: "Les nouveaux canaux publicitaires liés aux assistants conversationnels, et comment décider s'ils méritent votre budget.",
  },
  {
    key: "Acquisition payante",
    id: "google-ads",
    label: "Google Ads",
    desc: "Générer des appels rapidement grâce à la publicité, sans attendre le référencement naturel.",
  },
  {
    key: "Automatisation",
    id: "automatisation",
    label: "Automatisation",
    desc: "Relance de devis, prise de rendez-vous en ligne, suivi client : gagnez du temps.",
  },
  {
    key: "Développement commercial",
    id: "developpement-commercial",
    label: "Développement commercial",
    desc: "Attirer plus de clients et remplir votre planning, sans dépendre du hasard.",
  },
  {
    key: "Tarifs",
    id: "tarifs",
    label: "Prix & rentabilité",
    desc: "Combien ça coûte, combien ça rapporte : les vrais chiffres pour décider.",
  },
];

const TITRE = "Blog Sitaly : créer son site et lancer son activité";
const DESCRIPTION =
  "Guides pour les indépendants et les petites entreprises : créer son site, choisir un nom et un domaine, être trouvé sur Google, trouver des clients. Sans jargon.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sitaly.fr/blog/" },
      { property: "og:site_name", content: "Sitaly" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITRE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/blog/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog Sitaly",
          url: "https://sitaly.fr/blog/",
          inLanguage: "fr-FR",
          description: DESCRIPTION,
          publisher: { "@id": "https://sitaly.fr/#business" },
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.metaDescription,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt ?? p.publishedAt,
            url: `https://sitaly.fr/blog/${p.slug}`,
            author: { "@id": "https://sitaly.fr/#teddy-vidal" },
            articleSection: p.category,
            keywords: p.keyword,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sitaly.fr" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://sitaly.fr/blog/" },
          ],
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [rubrique, setRubrique] = useState<string | null>(null);

  const uneSelection = useMemo(() => postsALaUne(3), []);
  const rubriquesActives = useMemo(
    () =>
      RUBRIQUES.map((r) => ({
        ...r,
        nombre: BLOG_POSTS.filter((p) => p.category === r.key).length,
      })).filter((r) => r.nombre > 0),
    [],
  );
  const liste = useMemo(
    () => (rubrique ? POSTS_RECENTS.filter((p) => p.category === rubrique) : POSTS_RECENTS),
    [rubrique],
  );
  const rubriqueCourante = rubriquesActives.find((r) => r.key === rubrique);

  const derniere = POSTS_RECENTS[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Ouverture. Le voile, comme les pages d'expertise : le blog fait partie
          du site, il ne s'ouvre pas sur une charte à lui. */}
      <header className="on-wash pt-[calc(var(--entete-hauteur)+3rem)] pb-16 sm:pt-[calc(var(--entete-hauteur)+5rem)] sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Fil d'Ariane" className="rail-label text-muted-foreground">
            <Link to="/" className="transition hover:text-brand-ink">
              Accueil
            </Link>
            <span className="px-2 text-muted-foreground">/</span>
            <span className="text-brand-ink">Le journal</span>
          </nav>

          <h1 className="display-hero mt-6 max-w-4xl">Créer son site, lancer son activité</h1>
          <p className="measure mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">
            Créer son site, choisir un nom, être trouvé sur Google, trouver des clients. Des guides
            écrits pour être appliqués, sans jargon et sans promesse de miracle.
          </p>

          {/* Trois repères plutôt qu'une phrase d'introduction de plus. */}
          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-3">
            <div>
              <dt className="rail-label text-muted-foreground">Guides publiés</dt>
              <dd className="brand-gradient-text mt-1.5 font-display text-3xl font-extrabold leading-none">
                {BLOG_POSTS.length}
              </dd>
            </div>
            <div>
              <dt className="rail-label text-muted-foreground">Rubriques</dt>
              <dd className="brand-gradient-text mt-1.5 font-display text-3xl font-extrabold leading-none">
                {rubriquesActives.length}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="rail-label text-muted-foreground">Dernier article</dt>
              <dd className="mt-1.5 flex items-center gap-2 font-display text-base font-bold">
                <Calendar className="h-4 w-4 text-brand-ink" />
                {formatDate(derniere.publishedAt)}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <main>
        {/* À la une. Un grand article et deux autres : une page qui ouvre sur
            trente-trois articles de même poids ne dit pas par où commencer. */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="01"
              eyebrow="À la une"
              title={
                <>
                  Par où <span className="accent-word">commencer</span>
                </>
              }
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <BlogCard post={uneSelection[0]} taille="grande" className="lg:col-span-2" />
              <div className="grid gap-5">
                {uneSelection.slice(1).map((p) => (
                  <BlogCard key={p.slug} post={p} className="h-full" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tous les articles, filtrés par rubrique. */}
        <section id="articles" className="bg-paper-sunk py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="02"
              eyebrow="Le sommaire"
              title={
                <>
                  Tous les <span className="accent-word">articles</span>
                </>
              }
            />

            {/* Le filtre. Des boutons et non des ancres : l'ancre déplaçait le
                lecteur au milieu de la page, le filtre lui répond sur place.
                Le rendu statique sort sans sélection, donc avec les
                trente-trois articles dans le HTML. */}
            <div
              role="group"
              aria-label="Filtrer par rubrique"
              className="mt-10 flex flex-wrap gap-2"
            >
              <button
                type="button"
                onClick={() => setRubrique(null)}
                aria-pressed={rubrique === null}
                className="puce-rubrique"
              >
                Tout
                <span className="puce-rubrique-nombre">{BLOG_POSTS.length}</span>
              </button>
              {rubriquesActives.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRubrique(rubrique === r.key ? null : r.key)}
                  aria-pressed={rubrique === r.key}
                  className="puce-rubrique"
                  style={
                    {
                      "--teinte": teinteRubrique(r.key),
                      "--teinte-encre": encreRubrique(r.key),
                    } as React.CSSProperties
                  }
                >
                  {r.label}
                  <span className="puce-rubrique-nombre">{r.nombre}</span>
                </button>
              ))}
            </div>

            {/* La description de la rubrique retenue. Elle disait quelque chose
                que le libellé seul ne dit pas ; elle reste, mais une à la fois. */}
            <p
              aria-live="polite"
              className="measure mt-6 min-h-[3rem] text-[15px] leading-relaxed text-muted-foreground"
            >
              {rubriqueCourante
                ? rubriqueCourante.desc
                : `Les ${BLOG_POSTS.length} guides, du plus récent au plus ancien.`}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {liste.map((post) => (
                <BlogCard key={post.slug} post={post} className="h-full" />
              ))}
            </div>
          </div>
        </section>

        {/* Appel final, le même que sur les pages d'expertise. */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 -z-10 hero-bg" aria-hidden="true" />
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="rail-label inline-flex items-center gap-2 text-brand-ink">
              <Sparkles className="h-4 w-4" />
              Passer à la pratique
            </span>
            <h2 className="display-section mt-4">
              Et pour <span className="accent-word">votre activité</span> ?
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Quatre questions valent mieux que dix articles lus en diagonale. Vous décrivez votre
              besoin, on vous montre l'offre qui convient et son prix.
            </p>
            <Link to="/mon-projet/" className="bouton mt-9 px-7 py-3.5">
              Trouver mon offre
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
