import { BLOG_POSTS } from "@/data/blog-posts";
import { REALISATIONS } from "@/data/realisations";

export const BASE_URL = "https://sitaly.fr";

export interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

/**
 * Source unique du sitemap. Les articles sont dérivés de BLOG_POSTS : ajouter un
 * article suffit, il n'y a rien à tenir à jour ici.
 */
export const SITEMAP_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/agents-ia", changefreq: "weekly", priority: "0.9" },
  // Pages statiques servies depuis public/ (hors routeur React), à garder ici :
  // le prérendu ne les découvre pas tout seul.
  { path: "/chatgpt-ads", changefreq: "weekly", priority: "0.9" },
  { path: "/agents-ia/chatgpt", changefreq: "monthly", priority: "0.6" },
  { path: "/acquisition", changefreq: "monthly", priority: "0.9" },
  { path: "/realisations", changefreq: "monthly", priority: "0.9" },
  ...REALISATIONS.map((r) => ({
    path: `/realisations/${r.slug}`,
    changefreq: "yearly" as const,
    priority: "0.7",
  })),
  { path: "/blog", changefreq: "weekly", priority: "0.9" },
  ...BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    changefreq: "monthly" as const,
    priority: "0.7",
    lastmod: p.updatedAt ?? p.publishedAt,
  })),
  { path: "/site-internet-plombier", changefreq: "monthly", priority: "0.9" },
  { path: "/site-internet-electricien", changefreq: "monthly", priority: "0.9" },
  { path: "/site-internet-menuisier", changefreq: "monthly", priority: "0.9" },
  { path: "/site-internet-couvreur", changefreq: "monthly", priority: "0.9" },
  { path: "/cgv", changefreq: "yearly", priority: "0.3" },
  { path: "/mentions-legales", changefreq: "yearly", priority: "0.3" },
  { path: "/politique-confidentialite", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
];

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
