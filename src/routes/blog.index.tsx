import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { CarteArticle } from "@/components/produit/CarteArticle";
import { BoiteApp, Confiance, TEXTE_GRIS } from "@/components/produit/Produit";
import {
  BLOG_POSTS as TOUS_LES_ARTICLES,
  POSTS_RECENTS as TOUS_LES_RECENTS,
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
 * 3. Une grille à trois colonnes.
 *
 * Depuis le 30 octobre 2026, la page suit l'allure Durable des pages produit
 * (DESIGN.md §13) : cartes grises arrondies (CarteArticle), une grande carte
 * sombre pour la une, filtres en pastilles, et l'encart de l'application en
 * bas de page.
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

  const puce = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
      active ? "bg-black/85 text-white" : "bg-black/[0.04] text-black/70 hover:bg-black/[0.08]"
    }`;

  // Refonte du 30 octobre 2026 : l'allure Durable des pages produit (DESIGN.md §13),
  // à la place du voile, des sections numérotées et des filets de couleur.
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-14 pb-12 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <nav
              aria-label="Fil d'Ariane"
              className={`flex items-center justify-center gap-1.5 text-sm ${TEXTE_GRIS}`}
            >
              <Link to="/" className="hover:text-black">
                Accueil
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-black">Blog</span>
            </nav>
            <h1 className="titre-produit mt-5 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Créer son site, lancer son activité
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Créer son site, choisir un nom, être trouvé sur Google, trouver des clients. Des
              guides écrits pour être appliqués, sans jargon.
            </p>
          </div>
        </section>

        {/* La une : un grand article sombre et deux autres. */}
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
            <CarteArticle post={uneSelection[0]} sombre className="min-h-[22rem] lg:col-span-2" />
            <div className="grid gap-4">
              {uneSelection.slice(1).map((p) => (
                <CarteArticle key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Tous les articles, filtrés par rubrique. Le rendu statique sort sur
            « Tout » : tous les liens sont dans le HTML livré, pour l'exploration. */}
        <section id="articles" className="scroll-mt-28 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="titre-produit text-[2rem] sm:text-5xl">Tous les articles</h2>
              <p aria-live="polite" className={`max-w-md text-[15px] ${TEXTE_GRIS}`}>
                {rubriqueCourante
                  ? rubriqueCourante.desc
                  : `${BLOG_POSTS.length} guides, du plus récent au plus ancien.`}
              </p>
            </div>
            <div
              role="group"
              aria-label="Filtrer par rubrique"
              className="mt-8 flex flex-wrap gap-2"
            >
              <button
                type="button"
                onClick={() => setRubrique(null)}
                aria-pressed={rubrique === null}
                className={puce(rubrique === null)}
              >
                Tout
                <span className="text-xs opacity-60">{BLOG_POSTS.length}</span>
              </button>
              {rubriquesActives.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRubrique(rubrique === r.key ? null : r.key)}
                  aria-pressed={rubrique === r.key}
                  className={puce(rubrique === r.key)}
                >
                  {r.label}
                  <span className="text-xs opacity-60">{r.nombre}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {liste.map((post) => (
                <CarteArticle key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-12 pb-28 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Passez à la pratique
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase : votre site est en ligne une minute plus tard.
              C'est gratuit.
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
