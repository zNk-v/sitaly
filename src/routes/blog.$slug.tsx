import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock, List, User } from "lucide-react";
import {
  BLOG_POSTS,
  formatDate,
  getPostBySlug,
  getRelatedPosts,
  slugifyHeading,
  type BlogSection,
} from "@/data/blog-posts";
import { SitalyLogo } from "@/components/SitalyLogo";
import { CALENDLY_URL } from "@/lib/config";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [{ title: "Article introuvable | Blog Sitaly" }],
      };
    }
    const url = `https://sitaly.fr/blog/${post.slug}`;
    const faqSection = post.content.find((s) => s.type === "faq");
    const wordCount = post.content.reduce((acc, s) => {
      if (s.type === "p" || s.type === "h2" || s.type === "h3" || s.type === "quote") return acc + s.text.split(/\s+/).length;
      if (s.type === "ul") return acc + s.items.join(" ").split(/\s+/).length;
      if (s.type === "faq") return acc + s.items.map((i) => `${i.q} ${i.a}`).join(" ").split(/\s+/).length;
      if (s.type === "table") return acc + [s.caption ?? "", ...s.headers, ...s.rows.flat()].join(" ").split(/\s+/).length;
      return acc;
    }, 0);
    const scripts: { type: string; children: string }[] = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          inLanguage: "fr-FR",
          articleSection: post.category,
          keywords: post.keyword,
          wordCount,
          author: { "@type": "Organization", name: "Sitaly", url: "https://sitaly.fr" },
          publisher: {
            "@type": "Organization",
            name: "Sitaly",
            url: "https://sitaly.fr",
            logo: { "@type": "ImageObject", url: "https://sitaly.fr/apple-touch-icon.png" },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          isPartOf: { "@type": "Blog", "@id": "https://sitaly.fr/blog" },
          url,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sitaly.fr" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://sitaly.fr/blog" },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }),
      },
    ];
    if (faqSection && faqSection.type === "faq") {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSection.items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      });
    }
    return {
      meta: [
        { title: post.metaTitle },
        { name: "description", content: post.metaDescription },
        { name: "keywords", content: post.keyword },
        { name: "author", content: post.author },
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Sitaly" },
        { property: "og:locale", content: "fr_FR" },
        { property: "article:published_time", content: post.publishedAt },
        { property: "article:modified_time", content: post.updatedAt ?? post.publishedAt },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
        { property: "article:tag", content: post.keyword },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.metaTitle },
        { name: "twitter:description", content: post.metaDescription },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl font-bold">Article introuvable</h1>
        <p className="mt-3 text-muted-foreground">
          Cet article n'existe pas ou a été déplacé.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au blog
        </Link>
      </div>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const relatedPosts = getRelatedPosts(post.slug, 3);

  // Build table of contents from h2 sections
  const headings: { id: string; text: string }[] = post.content
    .filter((s: BlogSection) => s.type === "h2")
    .map((s: BlogSection) =>
      s.type === "h2" ? { id: slugifyHeading(s.text), text: s.text } : { id: "", text: "" },
    );

  // Inject mid-article CTA after ~55% of sections
  const midIndex = Math.max(2, Math.floor(post.content.length * 0.55));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PostNav />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Tous les articles
        </Link>

        <header className="mt-6">
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
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground sm:text-xl">{post.excerpt}</p>
        </header>

        {headings.length >= 3 && (
          <nav
            aria-label="Table des matières"
            className="mt-10 rounded-2xl border border-border bg-secondary/30 p-5 sm:p-6"
          >
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
              <List className="h-4 w-4" />
              Sommaire
            </div>
            <ol className="mt-3 space-y-1.5 text-[15px] leading-relaxed">
              {headings.map((h: { id: string; text: string }, i: number) => (
                <li key={h.id} className="flex gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${h.id}`}
                    className="text-foreground/85 underline-offset-4 transition hover:text-accent hover:underline"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="prose-content mt-10 space-y-5 text-[17px] leading-relaxed text-foreground/90">
          {post.content.map((section: BlogSection, idx: number) => (
            <>
              <RenderSection key={`s-${idx}`} section={section} />
              {idx === midIndex && <InlineCTA key={`cta-${idx}`} />}
            </>
          ))}
        </div>

        <FinalCTA />
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">À lire ensuite</h2>
            <p className="mt-2 text-muted-foreground">
              Continuez votre lecture avec des articles complémentaires.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-xl border border-border bg-card p-5 shadow-soft transition hover:shadow-elevated"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug transition group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Lire l'article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Sitaly — Création de sites internet pour artisans.
          {" — "}
          <Link to="/blog" className="underline-offset-2 hover:underline">
            Tous les articles
          </Link>
        </div>
      </footer>
    </div>
  );
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2": {
      const id = slugifyHeading(section.text);
      return (
        <h2
          id={id}
          className="mt-10 scroll-mt-24 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          {section.text}
        </h2>
      );
    }
    case "h3":
      return (
        <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {section.text}
        </h3>
      );
    case "p":
      return <p>{section.text}</p>;
    case "ul":
      return (
        <ul className="ml-5 list-disc space-y-2 marker:text-accent">
          {section.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-accent bg-accent/5 px-5 py-3 italic text-foreground/80">
          {section.text}
        </blockquote>
      );
    case "table":
      return (
        <figure className="my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-secondary/60">
              <tr>
                {section.headers.map((h, i) => (
                  <th key={i} className="border-b border-border px-3 py-2.5 text-left font-semibold text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri} className="odd:bg-background even:bg-secondary/20">
                  {row.map((cell, ci) => (
                    <td key={ci} className="border-b border-border/60 px-3 py-2.5 align-top text-foreground/90">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {section.caption && (
            <figcaption className="px-3 py-2 text-xs text-muted-foreground">{section.caption}</figcaption>
          )}
        </figure>
      );
    case "faq":
      return (
        <div className="my-4 divide-y divide-border rounded-xl border border-border bg-card">
          {section.items.map((it, i) => (
            <details key={i} className="group px-5 py-4 open:bg-accent/5">
              <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
                <span className="mr-2 text-accent">Q.</span>
                {it.q}
              </summary>
              <p className="mt-2 text-foreground/85">{it.a}</p>
            </details>
          ))}
        </div>
      );
  }
}

function InlineCTA() {
  return (
    <aside className="my-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-6 sm:p-7">
      <div className="text-xs font-semibold uppercase tracking-widest text-primary">Sitaly</div>
      <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">
        Vous voulez appliquer tout ça sans y passer 40 heures ?
      </h3>
      <p className="mt-2 text-foreground/80">
        Site artisan livré en 48h, optimisé pour le SEO local. À partir de 149€/mois en location, sans engagement.
      </p>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
      >
        Réserver un appel gratuit
        <ArrowRight className="h-4 w-4" />
      </a>
    </aside>
  );
}

function FinalCTA() {
  return (
    <div className="mt-12 rounded-2xl border border-accent/30 bg-accent/5 p-7 sm:p-8">
      <h2 className="font-display text-xl font-bold sm:text-2xl">
        Et si on créait votre site ?
      </h2>
      <p className="mt-2 text-muted-foreground">
        Sitaly s'occupe de tout : création, référencement local, mise en ligne en 48h.
        À partir de 149€/mois en location, tout inclus et sans engagement.
      </p>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-90"
      >
        Réserver un appel gratuit
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function PostNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center" aria-label="Sitaly — accueil">
          <SitalyLogo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Accueil
          </Link>
          <Link to="/blog" className="text-sm font-medium text-foreground">
            Blog
          </Link>
        </nav>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
        >
          Réserver un appel
        </a>
      </div>
    </header>
  );
}

// keep BLOG_POSTS import side-effect for sitemap consumers if needed
void BLOG_POSTS;
