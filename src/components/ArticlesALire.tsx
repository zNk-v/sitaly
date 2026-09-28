import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getPostBySlug, type BlogPost } from "@/data/blog-posts";

/**
 * Le bloc « À lire » des pages de vente : les articles qui répondent aux
 * questions que la page ne détaille pas. Il renvoie vers le blog autant que
 * le blog renvoie vers la page, et c'est ce maillage croisé qui fait circuler
 * l'exploration entre les deux.
 *
 * Les slugs sont résolus sur les articles publiés : un article pas encore en
 * ligne, ou retiré, disparaît du bloc sans laisser de lien cassé.
 */
export function articlesPublies(slugs: readonly string[]): BlogPost[] {
  return slugs.map((s) => getPostBySlug(s)).filter((p): p is BlogPost => Boolean(p));
}

export function ArticlesALire({
  slugs,
  titre = "À lire",
  classeCarte = "rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:shadow-elevated",
  classeLien = "text-brand-ink",
}: {
  slugs: readonly string[];
  titre?: string;
  classeCarte?: string;
  classeLien?: string;
}) {
  const articles = articlesPublies(slugs);
  if (articles.length === 0) return null;
  return (
    <div>
      {titre && <h3 className="mb-5 font-display text-xl font-bold tracking-tight">{titre}</h3>}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((p) => (
          <li key={p.slug} className="flex">
            <Link
              to="/blog/$slug/"
              params={{ slug: p.slug }}
              className={`group flex w-full flex-col ${classeCarte}`}
            >
              <span className="font-display text-[15px] font-bold leading-snug">
                {p.title.replace(/ ([:;?!])/g, " $1")}
              </span>
              <span
                className={`mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold ${classeLien}`}
              >
                Lire l'article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
