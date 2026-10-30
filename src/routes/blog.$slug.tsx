import { Fragment } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import {
  BLOG_POSTS,
  formatDate,
  getPostBySlug,
  getRelatedPosts,
  slugifyHeading,
  texteBrut,
  type BlogSection,
  type CtaArticle,
} from "@/data/blog-posts";
import { chargerContenu } from "@/data/articles/charger";
import { TexteAvecLiens } from "@/components/TexteAvecLiens";
import { MetierLinksStrip } from "@/components/MetierLinks";
import { SiteChrome } from "@/components/SiteChrome";
import { CarteArticle } from "@/components/produit/CarteArticle";
import { BOUTON_NOIR, BoiteApp, CARTE, Confiance, TEXTE_GRIS } from "@/components/produit/Produit";
import { articleIndexable, directiveRobots } from "@/lib/indexation";
import { APP_URL, CALENDLY_URL } from "@/lib/config";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const meta = getPostBySlug(params.slug);
    if (!meta) throw notFound();
    const content = await chargerContenu(meta.slug);
    if (!content) throw notFound();
    return { post: { ...meta, content } };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [{ title: "Article introuvable | Blog Sitaly" }],
      };
    }
    const url = `https://sitaly.fr/blog/${post.slug}/`;
    const ogImage = post.image ? `https://sitaly.fr${post.image.src}-og.jpg` : undefined;
    const faqSection = post.content.find((s) => s.type === "faq");
    const wordCount = post.content.reduce((acc, s) => {
      if (s.type === "p" || s.type === "h2" || s.type === "h3" || s.type === "quote")
        return acc + texteBrut(s.text).split(/\s+/).length;
      if (s.type === "ul") return acc + texteBrut(s.items.join(" ")).split(/\s+/).length;
      if (s.type === "faq")
        return acc + texteBrut(s.items.map((i) => `${i.q} ${i.a}`).join(" ")).split(/\s+/).length;
      if (s.type === "table")
        return (
          acc + [s.caption ?? "", ...s.headers, ...s.rows.flat()].join(" ").split(/\s+/).length
        );
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
          // Sans illustration propre, l'image de partage du site.
          image: ogImage ?? "https://sitaly.fr/og-image.png",
          wordCount,
          // Auteur et éditeur rattachés au graphe racine (__root.tsx) : une
          // personne identifiable pèse plus qu'une signature collective.
          author: { "@id": "https://sitaly.fr/#teddy-vidal" },
          publisher: { "@id": "https://sitaly.fr/#business" },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          isPartOf: { "@type": "Blog", "@id": "https://sitaly.fr/blog/" },
          url,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sitaly.fr/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://sitaly.fr/blog/" },
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
            acceptedAnswer: { "@type": "Answer", text: texteBrut(it.a) },
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
        { name: "robots", content: directiveRobots(`/blog/${post.slug}`) },
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
        ...(post.image && ogImage
          ? [
              { property: "og:image", content: ogImage },
              { property: "og:image:width", content: "1200" },
              { property: "og:image:height", content: "630" },
              { property: "og:image:alt", content: post.image.alt },
              { name: "twitter:image", content: ogImage },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl font-bold">Article introuvable</h1>
        <p className="mt-3 text-muted-foreground">Cet article n'existe pas ou a été déplacé.</p>
        <Link to="/blog/" className="bouton mt-6 px-6 py-2.5 text-sm">
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
  const cta = post.cta ?? "site";

  const headings: { id: string; text: string }[] = post.content
    .filter((s: BlogSection) => s.type === "h2")
    .map((s: BlogSection) =>
      s.type === "h2" ? { id: slugifyHeading(s.text), text: s.text } : { id: "", text: "" },
    );

  // L'appel du milieu, à la fin de la section qui passe la moitié de l'article :
  // jamais entre un intertitre et son texte.
  const moitie = Math.max(2, Math.floor(post.content.length * 0.55));
  const finDeSection = post.content.findIndex(
    (s: BlogSection, i: number) =>
      i >= moitie && s.type !== "h2" && s.type !== "h3" && post.content[i + 1]?.type === "h2",
  );
  const midIndex = finDeSection >= 0 ? finDeSection : moitie;

  // Refonte du 30 octobre 2026 : l'allure Durable des pages produit (DESIGN.md §13).
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <article className="mx-auto max-w-3xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-16">
          <nav
            aria-label="Fil d'Ariane"
            className={`flex items-center gap-1.5 text-sm ${TEXTE_GRIS}`}
          >
            <Link to="/blog/" className="hover:text-black">
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-black">{post.category}</span>
          </nav>

          <header className="mt-6">
            <h1 className="titre-produit text-[2.3rem] leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
              {post.title.replace(/ ([:;?!])/g, "\u00a0$1")}
            </h1>
            <p className={`mt-6 text-lg leading-8 sm:text-xl ${TEXTE_GRIS}`}>{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-black/55">
              <Link to="/a-propos/" className="font-medium text-black hover:underline">
                {post.author}
              </Link>
              <span>{formatDate(post.publishedAt)}</span>
              <span>{post.readingTime} de lecture</span>
            </div>
          </header>

          {post.image && (
            <figure className="mt-10 overflow-hidden rounded-3xl">
              <img
                src={`${post.image.src}-1200.webp`}
                srcSet={`${post.image.src}-1200.webp 1200w, ${post.image.src}-2400.webp 2400w`}
                sizes="(min-width: 768px) 720px, calc(100vw - 2rem)"
                width={1200}
                height={630}
                alt={post.image.alt}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full"
              />
            </figure>
          )}

          {headings.length >= 3 && (
            <nav aria-label="Table des matières" className={`${CARTE} mt-10 p-6`}>
              <div className="text-sm font-semibold">Dans cet article</div>
              <ol className="mt-3 space-y-2 text-[15px]">
                {headings.map((h, i) => (
                  <li key={h.id} className="flex gap-3">
                    <span className="w-5 shrink-0 text-black/35 tabular-nums">{i + 1}</span>
                    <a
                      href={`#${h.id}`}
                      className="text-black/75 underline-offset-4 transition hover:text-black hover:underline"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-10 space-y-6 text-[17px] leading-8 text-black/80">
            {post.content.map((section: BlogSection, idx: number) => (
              <Fragment key={idx}>
                <RenderSection section={section} />
                {idx === midIndex && <InlineCTA cta={cta} />}
              </Fragment>
            ))}
          </div>
        </article>

        <FinalCTA cta={cta} />

        {relatedPosts.length > 0 && (
          <section className="px-4 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="titre-produit text-[2rem] sm:text-4xl">À lire ensuite</h2>
                <Link to="/blog/" className="text-sm font-semibold hover:underline">
                  Tous les articles
                </Link>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((p) => (
                  <CarteArticle key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Les liens vers les pages métier artisans ne restent que sur les
            articles hors index, écrits pour ce public (src/lib/indexation.ts). */}
        {!articleIndexable(post.slug) && <MetierLinksStrip />}
      </SiteChrome>
    </div>
  );
}

const LIEN_ARTICLE =
  "font-medium text-black underline decoration-black/25 underline-offset-4 transition hover:decoration-black";

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2": {
      const id = slugifyHeading(section.text);
      return (
        <h2
          id={id}
          className="titre-produit !mt-14 scroll-mt-28 text-[1.9rem] leading-tight text-black sm:text-[2.2rem]"
        >
          {section.text}
        </h2>
      );
    }
    case "h3":
      return (
        <h3 className="!mt-9 text-xl font-semibold tracking-tight text-black">{section.text}</h3>
      );
    case "p":
      return (
        <p>
          <TexteAvecLiens texte={section.text} classeLien={LIEN_ARTICLE} />
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-3">
          {section.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c3aed]"
                aria-hidden="true"
              />
              <span>
                <TexteAvecLiens texte={it} classeLien={LIEN_ARTICLE} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="!my-10 border-l-2 border-black pl-6 text-[1.4rem] leading-snug font-medium tracking-tight text-black">
          <TexteAvecLiens texte={section.text} classeLien={LIEN_ARTICLE} />
        </blockquote>
      );
    case "table":
      return (
        <figure className="!my-8">
          <div className="overflow-x-auto rounded-3xl border border-black/[0.08]">
            <table className="w-full text-left text-[15px] leading-6">
              <thead className="bg-black/[0.03]">
                <tr>
                  {section.headers.map((h, i) => (
                    <th key={i} scope="col" className="px-5 py-3.5 font-semibold text-black">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-black/[0.06] align-top">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-5 py-3.5 ${ci === 0 ? "font-medium text-black" : "text-black/70"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.caption && (
            <figcaption className="mt-2 px-1 text-sm text-black/50">{section.caption}</figcaption>
          )}
        </figure>
      );
    case "faq":
      return (
        <div className="!mt-10 space-y-3">
          <h2 className="titre-produit text-[1.9rem] leading-tight text-black sm:text-[2.2rem]">
            Questions fréquentes
          </h2>
          {section.items.map((it, i) => (
            <details key={i} className={`${CARTE} group p-5`}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-black marker:content-none">
                {it.q}
                <span className="text-xl leading-none transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[16px] leading-7 text-black/70">
                <TexteAvecLiens texte={it.a} classeLien={LIEN_ARTICLE} />
              </p>
            </details>
          ))}
        </div>
      );
  }
}

/**
 * L'étape suivante proposée par l'article, selon son champ `cta` : chaque
 * article pousse vers la page de vente de son sujet. Les articles sans champ
 * gardent l'appel d'origine, écrit pour le site internet.
 */
type Appel = { titre: string; texte: string; label: string; href: string };

const APPELS: Record<CtaArticle, { milieu: Appel; fin: Appel }> = {
  "agents-ia": {
    milieu: {
      titre: "Un agent IA pour ne plus laisser filer de demande",
      texte:
        "Il décroche, qualifie, propose un rendez-vous et relance, en se présentant comme une IA. Sitaly l'installe et le pilote pour les PME.",
      label: "Voir les agents IA",
      href: "/agents-ia/",
    },
    fin: {
      titre: "30 minutes pour repérer où vos demandes se perdent",
      texte:
        "Un diagnostic offert, au téléphone : vos demandes entrantes, vos outils, ce qu'un agent IA peut reprendre. Le chiffrage arrive par écrit, sans engagement.",
      label: "Réserver un diagnostic",
      href: CALENDLY_URL,
    },
  },
  "chatgpt-ads": {
    milieu: {
      titre: "Tester ChatGPT Ads avec une méthode",
      texte:
        "Le suivi des conversions avant la première dépense, un seuil d'arrêt écrit, une décision sur les chiffres.",
      label: "Voir la gestion ChatGPT Ads",
      href: "/chatgpt-ads/",
    },
    fin: {
      titre: "ChatGPT Ads a-t-il du sens pour votre entreprise ?",
      texte:
        "Décrivez votre activité : vous recevez une lecture honnête du potentiel, du budget de test qu'il suppose, ou de la raison pour laquelle ce n'est pas le moment.",
      label: "Demander une analyse",
      href: "/chatgpt-ads/#analyse",
    },
  },
  automatisation: {
    milieu: {
      titre: "Chiffrer avant d'automatiser",
      texte:
        "Chaque tâche se mesure en minutes par semaine. On n'automatise que celles que le calcul justifie, avec un repli manuel prévu.",
      label: "Voir l'automatisation des tâches",
      href: "/automatisation-taches/",
    },
    fin: {
      titre: "Ce que vous pouvez arrêter de faire à la main",
      texte:
        "Relances, rappels, saisies en double : on liste vos tâches répétitives, on chiffre le temps gagné, et on automatise celles qui le méritent.",
      label: "Voir les automatisations",
      href: "/automatisation-taches/",
    },
  },
  // Sitaly App (30 octobre 2026) : les articles pour qui veut créer son site lui-même.
  app: {
    milieu: {
      titre: "Votre site, écrit par l'IA en une minute",
      texte:
        "Décrivez votre activité en une phrase : Sitaly écrit vos pages, crée vos photos et met le site en ligne. Gratuit pour commencer.",
      label: "Créer mon site",
      href: `${APP_URL}/`,
    },
    fin: {
      titre: "Passez de la lecture à votre site",
      texte:
        "Une phrase sur votre activité suffit : votre site est en ligne une minute plus tard, et vous le retouchez en parlant à l'IA. Gratuit, sans carte bancaire.",
      label: "Créer mon site gratuitement",
      href: `${APP_URL}/`,
    },
  },
  site: {
    milieu: {
      titre: "Vous voulez appliquer tout ça sans y passer 40 heures ?",
      texte:
        "Site artisan livré en 48h, optimisé pour le SEO local. En abonnement mensuel, sans engagement.",
      label: "Trouver mon offre",
      href: "/mon-projet/",
    },
    fin: {
      titre: "Et si on créait votre site ?",
      texte:
        "Sitaly s'occupe de tout : création, référencement local, mise en ligne en 48h. En abonnement mensuel, tout inclus et sans engagement.",
      label: "Trouver mon offre",
      href: "/mon-projet/",
    },
  },
};

/** Le bouton d'un appel : Calendly dans un nouvel onglet, l'application et la
    page statique ChatGPT Ads par un lien classique, les pages du routeur par `Link`. */
function BoutonAppel({ appel, className }: { appel: Appel; className: string }) {
  const contenu = (
    <>
      {appel.label}
      <ArrowRight className="h-4 w-4" />
    </>
  );
  // L'application s'ouvre dans le même onglet : c'est la suite de la lecture.
  if (appel.href.startsWith(APP_URL) || appel.href.startsWith("/chatgpt-ads")) {
    return (
      <a href={appel.href} className={className}>
        {contenu}
      </a>
    );
  }
  if (appel.href.startsWith("http")) {
    return (
      <a href={appel.href} target="_blank" rel="noopener noreferrer" className={className}>
        {contenu}
      </a>
    );
  }
  return (
    <Link to={appel.href} className={className}>
      {contenu}
    </Link>
  );
}

/** L'appel du milieu : une carte sombre, comme la une du blog. */
function InlineCTA({ cta }: { cta: CtaArticle }) {
  const appel = APPELS[cta].milieu;
  return (
    <aside className="!my-12 rounded-3xl bg-[#0d0f14] p-7 text-white sm:p-8">
      <div className="text-sm font-medium text-[#c4b5fd]">Sitaly</div>
      <p className="titre-produit mt-2 text-[1.7rem] leading-tight text-white sm:text-3xl">
        {appel.titre}
      </p>
      <p className="mt-3 text-[16px] leading-7 text-white/65">{appel.texte}</p>
      <BoutonAppel
        appel={appel}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
      />
    </aside>
  );
}

/** L'appel de fin : l'encart de l'application pour les articles Sitaly App, une carte sinon. */
function FinalCTA({ cta }: { cta: CtaArticle }) {
  const appel = APPELS[cta].fin;
  if (cta === "app") {
    return (
      <section data-cta={cta} className="px-4 pt-8 pb-16 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="titre-produit text-[2.15rem] sm:text-5xl">{appel.titre}</h2>
          <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>{appel.texte}</p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <BoiteApp idees={false} />
        </div>
        <Confiance />
      </section>
    );
  }
  return (
    <section data-cta={cta} className="px-4 pt-4 pb-12 sm:px-6">
      <div className={`${CARTE} mx-auto max-w-3xl p-8 text-center sm:p-10`}>
        <h2 className="titre-produit text-[1.9rem] leading-tight sm:text-4xl">
          {appel.titre.replace(/ ([:;?!])/g, "\u00a0$1")}
        </h2>
        <p className={`mx-auto mt-4 max-w-xl text-[16px] leading-7 ${TEXTE_GRIS}`}>{appel.texte}</p>
        <BoutonAppel appel={appel} className={`${BOUTON_NOIR} mt-7 px-6 py-3.5`} />
      </div>
    </section>
  );
}

// keep BLOG_POSTS import side-effect for sitemap consumers if needed
void BLOG_POSTS;
