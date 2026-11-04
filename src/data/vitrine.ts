import type { BlogPost, BlogSection } from "@/data/blog-posts";
import donnees from "@/data/vitrine.json";

/**
 * Ce que Teddy pilote depuis l'app (centre de pilotage, espace « sitaly.fr »),
 * lu avant chaque build par scripts/contenus-vitrine.mjs. Chaque valeur absente
 * laisse la valeur écrite dans le code : le site reste entier sans le pilotage.
 */

type Tarif = { mensuel?: number; annuel?: number };
type Contenus = {
  accueil?: { titre?: string; sousTitre?: string };
  annonce?: { actif?: boolean; texte?: string; lien?: string };
  tarifs?: { essentiel?: Tarif; pro?: Tarif };
};
type ArticleVitrine = {
  slug: string;
  titre: string;
  meta_titre: string | null;
  description: string | null;
  extrait: string | null;
  categorie: string;
  mot_cle: string | null;
  contenu: string;
  publie_le: string | null;
  modifie_le: string | null;
};

const D = donnees as { contenus: Contenus; articles: ArticleVitrine[] };
const texte = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
const prix = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : undefined);

export const VITRINE = {
  accueilTitre: texte(D.contenus.accueil?.titre),
  accueilSousTitre: texte(D.contenus.accueil?.sousTitre),
  annonce: D.contenus.annonce?.actif && texte(D.contenus.annonce.texte) ? { texte: texte(D.contenus.annonce.texte)!, lien: texte(D.contenus.annonce.lien) } : null,
  tarif: (formule: "essentiel" | "pro", periode: "mensuel" | "annuel") => prix(D.contenus.tarifs?.[formule]?.[periode]),
};

/** Le Markdown simple du centre de pilotage (##, ###, -, >, paragraphes) en sections d'article. */
export function sectionsDuMarkdown(md: string): BlogSection[] {
  const sections: BlogSection[] = [];
  for (const brut of md.split(/\n\s*\n/)) {
    const b = brut.trim();
    if (!b) continue;
    if (b.startsWith("### ")) sections.push({ type: "h3", text: b.slice(4).trim() });
    else if (b.startsWith("## ")) sections.push({ type: "h2", text: b.slice(3).trim() });
    else if (b.startsWith("> ")) sections.push({ type: "quote", text: b.replace(/^>\s?/gm, "").replace(/\n/g, " ").trim() });
    else if (/^[-*] /.test(b)) sections.push({ type: "ul", items: b.split("\n").map((l) => l.replace(/^[-*]\s+/, "").trim()).filter(Boolean) });
    else sections.push({ type: "p", text: b.replace(/\n/g, " ") });
  }
  return sections;
}

const minutes = (md: string) => `${Math.max(2, Math.round(md.split(/\s+/).length / 200))} min`;

/** Les articles publiés depuis le centre de pilotage, au format du blog. */
export const ARTICLES_VITRINE: BlogPost[] = D.articles.map((a) => ({
  slug: a.slug,
  title: a.titre,
  metaTitle: a.meta_titre || a.titre,
  metaDescription: a.description || a.extrait || a.titre,
  excerpt: a.extrait || a.description || "",
  category: a.categorie,
  readingTime: minutes(a.contenu),
  publishedAt: (a.publie_le ?? new Date().toISOString()).slice(0, 10),
  updatedAt: a.modifie_le ? a.modifie_le.slice(0, 10) : undefined,
  author: "Teddy Vidal",
  keyword: a.mot_cle || a.titre,
  cta: "app",
}));

export function corpsVitrine(slug: string): BlogSection[] | undefined {
  const a = D.articles.find((x) => x.slug === slug);
  return a ? sectionsDuMarkdown(a.contenu) : undefined;
}
