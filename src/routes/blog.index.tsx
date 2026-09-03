import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS, formatDate } from "@/data/blog-posts";
import { SitalyLogo } from "@/components/SitalyLogo";
import { HeaderCallButton, MobileMenu } from "@/components/MobileMenu";
import { LinkedinLink } from "@/components/LinkedinLink";
import { CALENDLY_URL } from "@/lib/config";

// Rubriques du blog, dans l'ordre d'affichage. `key` doit correspondre au champ
// `category` des articles (src/data/blog-posts.ts).
const RUBRIQUES: { key: string; id: string; label: string; desc: string }[] = [
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

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog Sitaly — Plus de clients : site web, Google Ads & automatisation" },
      {
        name: "description",
        content:
          "Guides pratiques pour PME, TPE et artisans : acquisition, site internet, référencement local, Google Ads, ChatGPT Ads et automatisation.",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      {
        property: "og:title",
        content: "Blog Sitaly — Plus de clients : site web, Google Ads & automatisation",
      },
      {
        property: "og:description",
        content:
          "Guides pratiques pour générer plus de clients : site internet, référencement Google local, Google Ads et automatisation. Pour PME, TPE et artisans.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sitaly.fr/blog/" },
      { property: "og:site_name", content: "Sitaly" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Blog Sitaly — Plus de clients : site web, Google Ads & automatisation",
      },
      {
        name: "twitter:description",
        content:
          "Guides pratiques pour générer plus de clients : site internet, référencement Google local, Google Ads et automatisation. Pour PME, TPE et artisans.",
      },
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
          description:
            "Guides pour générer plus de clients : site internet, référencement Google local, Google Ads et automatisation. Pour PME, TPE et artisans.",
          publisher: {
            "@type": "Organization",
            name: "Sitaly",
            url: "https://sitaly.fr",
          },
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.metaDescription,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt ?? p.publishedAt,
            url: `https://sitaly.fr/blog/${p.slug}`,
            author: { "@type": "Organization", name: "Sitaly" },
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogNav />
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 pt-[calc(var(--entete-hauteur)+2rem)] pb-16 sm:px-6 sm:pb-20 sm:pt-[calc(var(--entete-hauteur)+3rem)]">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Le blog Sitaly</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Générer <span className="gradient-text">plus de clients</span>, quel que soit votre
            métier
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Site internet, référencement local, Google Ads, ChatGPT Ads et automatisation : les
            guides pratiques pour les PME, TPE et artisans qui veulent développer leur activité en
            2026.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {(() => {
          const sections = RUBRIQUES.map((r) => ({
            ...r,
            posts: BLOG_POSTS.filter((p) => p.category === r.key),
          })).filter((r) => r.posts.length > 0);

          return (
            <>
              {/* Navigation par rubrique */}
              <nav aria-label="Rubriques du blog" className="mb-12 flex flex-wrap gap-2.5">
                {sections.map((r) => (
                  <a
                    key={r.id}
                    href={`#${r.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-soft transition hover:border-accent hover:text-accent"
                  >
                    {r.label}
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent/10 px-1.5 text-xs font-semibold text-accent">
                      {r.posts.length}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="space-y-16">
                {sections.map((r) => (
                  <section key={r.id} id={r.id} className="scroll-mt-24">
                    <div className="border-b border-border pb-5">
                      <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                        {r.label}
                      </h2>
                      <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">{r.desc}</p>
                    </div>
                    <div className="mt-8 grid gap-6 sm:gap-8">
                      {r.posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </>
          );
        })()}

        <div className="mt-20 rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Prêt à générer plus de clients ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Site internet, Google Ads et automatisation, en abonnement mensuel et sans engagement.
            Réservez un appel gratuit de 15 minutes.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bouton mt-6 px-7 py-3.5 text-base"
          >
            Parler de votre projet
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
}

function PostCard({ post }: { post: (typeof BLOG_POSTS)[number] }) {
  return (
    <article className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated sm:p-8">
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
          {post.category}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(post.publishedAt)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.readingTime}
        </span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
        <Link
          to="/blog/$slug/"
          params={{ slug: post.slug }}
          className="transition group-hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-[15px] text-muted-foreground sm:text-base">{post.excerpt}</p>
      <Link
        to="/blog/$slug/"
        params={{ slug: post.slug }}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
      >
        Lire l'article
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

function BlogNav() {
  return <SiteHeader />;
}

function BlogFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-muted-foreground sm:px-6">
        <div className="mb-5 flex justify-center">
          <LinkedinLink />
        </div>
        © {new Date().getFullYear()} Sitaly — Création de sites internet pour artisans.{" "}
        <Link to="/" className="font-medium text-foreground hover:text-accent">
          Retour à l'accueil
        </Link>
      </div>
    </footer>
  );
}
