import { BLOG_POSTS } from "@/data/blog-posts";
import { PAGES_OFFRES } from "@/data/pages-offres";
import { PREMIUM_PUBLIE } from "@/data/premium";
import { REALISATIONS } from "@/data/realisations";
import { EXPERTISES } from "@/data/expertises";
import { SECTEURS } from "@/data/secteurs";
import { METIERS } from "@/lib/metiers";
import { MODELES } from "@/data/modeles";
import { PARTENAIRES_PUBLIES } from "@/data/partenaires";
import { COMPARATIFS } from "@/data/comparatifs";
import { PRODUITS } from "@/data/produits";
import { PILIERS } from "@/data/piliers";
import { GUIDES } from "@/data/guides";
import { estIndexable } from "@/lib/indexation";

export const BASE_URL = "https://sitaly.fr";

/**
 * Une page du plan du site.
 *
 * Ni `changefreq` ni `priority` : Google les ignore depuis des années, et
 * l'audit SEO du 13 novembre 2026 (1.7) demande de les retirer. Les champs
 * sont partis du type, pas seulement du XML, pour qu'une nouvelle entrée ne
 * les réintroduise pas. Seul `lastmod` compte, et il doit être vrai : une
 * date inventée ou une date de build apprend à Google à ne plus la lire.
 */
export interface SitemapEntry {
  path: string;
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
  { path: "/", source: [route("index.tsx")] },
  {
    path: "/agents-ia",
    source: [route("agents-ia.tsx")],
  },
  // Les pages sectorielles des agents IA, dérivées de leur source.
  ...SECTEURS.map((s) => ({
    path: `/agents-ia/${s.slug}`,
    source: ["src/data/secteurs.ts", "src/components/SecteurLanding.tsx"],
  })),
  {
    path: "/agents-ia/agent-vocal",
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
    source: ["public/chatgpt-ads/index.html"],
  },
  { path: "/agents-ia/chatgpt", source: ["public/agents-ia/chatgpt/index.html"] },
  {
    path: "/acquisition",
    source: [route("acquisition.tsx")],
  },
  // Les pages d'expertise, dérivées de leur source : en ajouter une suffit.
  ...EXPERTISES.map((e) => ({
    path: `/${e.slug}`,
    source: ["src/data/expertises.ts", route(`${e.slug}.tsx`)],
  })),
  {
    path: "/realisations",
    source: [route("realisations.index.tsx"), "src/data/realisations.ts"],
  },
  ...REALISATIONS.map((r) => ({
    path: `/realisations/${r.slug}`,
    source: ["src/data/realisations.ts"],
  })),
  // Les comparatifs (30 octobre 2026).
  {
    path: "/comparer",
    source: [route("comparer.index.tsx"), "src/data/comparatifs.ts"],
  },
  ...COMPARATIFS.map((c) => ({
    path: `/comparer/${c.id}`,
    source: [route("comparer.$id.tsx"), "src/data/comparatifs.ts"],
  })),
  // Les pages produits de Sitaly App (31 octobre 2026).
  ...PRODUITS.map((p) => ({
    path: `/produits/${p.id}`,
    source: [route("produits.$id.tsx"), "src/data/produits.ts"],
  })),
  // Les guides pas à pas de Sitaly App, en vidéo (3 novembre 2026).
  {
    path: "/guides",
    source: [route("guides.index.tsx"), "src/data/guides.ts"],
  },
  ...GUIDES.map((g) => ({
    path: `/guides/${g.id}`,
    source: [route("guides.$id.tsx"), "src/data/guides.ts"],
  })),
  // Le générateur de noms d'entreprise (31 octobre 2026).
  {
    path: "/outils/generateur-nom-entreprise",
    source: [route("outils.generateur-nom-entreprise.tsx")],
  },
  // Les générateurs de mentions légales et de devis (9 novembre 2026).
  {
    path: "/outils/generateur-mentions-legales",
    source: [route("outils.generateur-mentions-legales.tsx")],
  },
  {
    path: "/outils/generateur-devis-gratuit",
    source: [route("outils.generateur-devis-gratuit.tsx")],
  },
  // Les modèles de sites par métier (31 octobre 2026).
  {
    path: "/modeles",
    source: [route("modeles.index.tsx"), "src/data/modeles.ts"],
  },
  ...MODELES.map((m) => ({
    path: `/modeles/${m.id}`,
    source: [route("modeles.$id.tsx"), "src/data/modeles.ts"],
  })),
  // Les deux pages piliers artisans (16 novembre 2026), textes validés par Ted.
  ...PILIERS.map((p) => ({
    path: p.chemin.replace(/\/$/, ""),
    source: [route(`${p.id}.tsx`), "src/components/pilier/Pilier.tsx", "src/data/piliers.ts"],
  })),
  { path: "/blog", lastmod: derniereDateBlog },
  ...BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    lastmod: p.updatedAt ?? p.publishedAt,
  })),
  { path: "/a-propos", source: [route("a-propos.tsx")] },
  // Le parrainage (5 novembre 2026) : les règles vivent dans l'app (src/lib/parrainage.ts).
  {
    path: "/parrainage",
    source: [route("parrainage.tsx")],
  },
  // Les offres partenaires (9 novembre 2026) : au sitemap dès qu'une offre a son lien.
  ...(PARTENAIRES_PUBLIES
    ? [
        {
          path: "/partenaires",
          source: [route("partenaires.tsx"), "src/data/partenaires.ts"],
        },
      ]
    : []),
  // La grille des prix (18 octobre 2026). Ses montants vivent dans src/data/offres.ts.
  {
    path: "/tarifs",
    source: [route("tarifs.tsx"), "src/data/offres.ts"],
  },
  // /creer-son-site-ia/ redirige vers l'accueil depuis le 30 octobre 2026 : hors plan du site.
  // La page locale, hors familles d'expertise (décision du 28 septembre 2026).
  { path: "/essonne", source: [route("essonne.tsx")] },
  // Les pages métier, dérivées de leur source (hors index, voir indexation.ts).
  ...METIERS.map((m) => ({
    path: m.to.replace(/\/$/, ""),
  })),
  // Les pages d'offre (23 octobre 2026), une par offre sans page à elle.
  ...PAGES_OFFRES.map((p) => ({
    path: `/offres/${p.id}`,
    source: [route("offres.$id.tsx"), "src/data/pages-offres.ts", "src/data/offres.ts"],
  })),
  // Sitaly Premium : dans le sitemap une fois publiée (premium.ts).
  ...(PREMIUM_PUBLIE
    ? [
        {
          path: "/site-premium",
          source: [route("site-premium.tsx"), "src/data/premium.ts", "src/data/offres.ts"],
        },
      ]
    : []),
  { path: "/outils", source: [route("outils.index.tsx")] },
  {
    path: "/outils/audit-fiche-google",
    source: [route("outils.audit-fiche-google.tsx")],
  },
  {
    path: "/outils/budget-google-ads-artisan",
    source: [route("outils.budget-google-ads-artisan.tsx")],
  },
  {
    path: "/outils/verifier-nom-de-domaine",
    source: [route("outils.verifier-nom-de-domaine.tsx")],
  },
  { path: "/cgv", source: [route("cgv.tsx")] },
  {
    path: "/mentions-legales",
    source: [route("mentions-legales.tsx")],
  },
  {
    path: "/politique-confidentialite",
    source: [route("politique-confidentialite.tsx")],
  },
  { path: "/cookies", source: [route("cookies.tsx")] },
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
