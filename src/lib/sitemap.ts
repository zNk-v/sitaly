import { BLOG_POSTS } from "@/data/blog-posts";
import { REALISATIONS } from "@/data/realisations";
import { EXPERTISES } from "@/data/expertises";
import { SECTEURS } from "@/data/secteurs";
import { METIERS } from "@/lib/metiers";
import { estIndexable } from "@/lib/indexation";

export const BASE_URL = "https://sitaly.fr";

export interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
  /**
   * Fichiers dont la date du dernier commit sert de `lastmod` quand l'entrée
   * n'en porte pas. Résolu par scripts/generate-sitemap.mjs au build : la
   * date suit ainsi le contenu réel de la page, pas la date du build.
   */
  source?: string[];
}

const route = (fichier: string) => `src/routes/${fichier}`;

/** Date la plus récente parmi les articles indexés : c'est elle qui date le blog. */
const derniereDateBlog = BLOG_POSTS.filter((p) => estIndexable(`/blog/${p.slug}`))
  .map((p) => p.updatedAt ?? p.publishedAt)
  .sort()
  .at(-1);

/**
 * Toutes les pages, indexables ou non. Le sitemap publié n'en garde que les
 * indexables (voir src/lib/indexation.ts) : une page en `noindex` qui figure
 * au sitemap envoie deux signaux contraires à Google.
 */
export const TOUTES_LES_PAGES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", source: [route("index.tsx")] },
  {
    path: "/agents-ia",
    changefreq: "weekly",
    priority: "0.9",
    source: [route("agents-ia.tsx")],
  },
  // Les pages sectorielles des agents IA, dérivées de leur source.
  ...SECTEURS.map((s) => ({
    path: `/agents-ia/${s.slug}`,
    changefreq: "monthly" as const,
    priority: "0.9",
    source: ["src/data/secteurs.ts", "src/components/SecteurLanding.tsx"],
  })),
  {
    path: "/agents-ia/agent-vocal",
    changefreq: "monthly",
    priority: "0.9",
    source: [
      "src/data/agent-vocal.ts",
      "src/components/SecteurLanding.tsx",
      route("agents-ia_.agent-vocal.tsx"),
    ],
  },
  // Pages statiques servies depuis public/ (hors routeur React), à garder ici :
  // le prérendu ne les découvre pas tout seul.
  {
    path: "/chatgpt-ads",
    changefreq: "weekly",
    priority: "0.9",
    source: ["public/chatgpt-ads/index.html"],
  },
  { path: "/agents-ia/chatgpt", changefreq: "monthly", priority: "0.6" },
  {
    path: "/acquisition",
    changefreq: "monthly",
    priority: "0.9",
    source: [route("acquisition.tsx")],
  },
  // Les pages d'expertise, dérivées de leur source : en ajouter une suffit.
  ...EXPERTISES.map((e) => ({
    path: `/${e.slug}`,
    changefreq: "monthly" as const,
    priority: "0.9",
    source: ["src/data/expertises.ts", route(`${e.slug}.tsx`)],
  })),
  {
    path: "/realisations",
    changefreq: "monthly",
    priority: "0.9",
    source: [route("realisations.index.tsx"), "src/data/realisations.ts"],
  },
  ...REALISATIONS.map((r) => ({
    path: `/realisations/${r.slug}`,
    changefreq: "yearly" as const,
    priority: "0.7",
    source: ["src/data/realisations.ts"],
  })),
  { path: "/blog", changefreq: "weekly", priority: "0.9", lastmod: derniereDateBlog },
  ...BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    changefreq: "monthly" as const,
    priority: "0.7",
    lastmod: p.updatedAt ?? p.publishedAt,
  })),
  { path: "/a-propos", changefreq: "yearly", priority: "0.6", source: [route("a-propos.tsx")] },
  // La grille des prix (18 octobre 2026). Ses montants vivent dans src/data/offres.ts.
  {
    path: "/tarifs",
    changefreq: "monthly",
    priority: "0.9",
    source: [route("tarifs.tsx"), "src/data/offres.ts"],
  },
  // La page locale, hors familles d'expertise (décision du 28 septembre 2026).
  { path: "/essonne", changefreq: "monthly", priority: "0.8", source: [route("essonne.tsx")] },
  // Les pages métier, dérivées de leur source (hors index, voir indexation.ts).
  ...METIERS.map((m) => ({
    path: m.to.replace(/\/$/, ""),
    changefreq: "monthly" as const,
    priority: "0.5",
  })),
  { path: "/outils", changefreq: "monthly", priority: "0.5" },
  { path: "/outils/audit-fiche-google", changefreq: "monthly", priority: "0.5" },
  { path: "/outils/budget-google-ads-artisan", changefreq: "monthly", priority: "0.5" },
  { path: "/cgv", changefreq: "yearly", priority: "0.3", source: [route("cgv.tsx")] },
  {
    path: "/mentions-legales",
    changefreq: "yearly",
    priority: "0.3",
    source: [route("mentions-legales.tsx")],
  },
  {
    path: "/politique-confidentialite",
    changefreq: "yearly",
    priority: "0.3",
    source: [route("politique-confidentialite.tsx")],
  },
  { path: "/cookies", changefreq: "yearly", priority: "0.3", source: [route("cookies.tsx")] },
];

/**
 * Source unique du sitemap publié : les pages indexables seulement. Les
 * articles sont dérivés de BLOG_POSTS : ajouter un article suffit.
 */
export const SITEMAP_ENTRIES: SitemapEntry[] = TOUTES_LES_PAGES.filter((e) => estIndexable(e.path));

export function buildSitemapXml(entries: SitemapEntry[] = SITEMAP_ENTRIES): string {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path.endsWith("/") ? e.path : `${e.path}/`}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}
