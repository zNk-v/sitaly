import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDate, type BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

/**
 * La carte d'article, partagée par l'accueil et le blog.
 *
 * Pas d'image : il n'existe aucune illustration d'article, et une banque
 * d'images en tiendrait lieu au prix de la crédibilité (DESIGN.md §7). Ce qui
 * porte la carte est donc typographique — un filet de couleur en tête, la
 * rubrique, puis le titre au corps d'un titre de section.
 *
 * Le filet prend la teinte de la famille à laquelle la rubrique se rattache.
 * C'est la seule couleur de la carte, et elle sert à repérer d'un coup d'œil
 * de quoi parle une grille de trente articles.
 */

/** Rubrique → teinte de la triade. Les rubriques absentes prennent le violet. */
const TEINTES: Record<string, string> = {
  "Site internet": "var(--blue)",
  Référencement: "var(--blue)",
  "Acquisition de clients": "var(--violet)",
  "Acquisition payante": "var(--violet)",
  "Publicité IA": "var(--violet)",
  "Développement commercial": "var(--violet)",
  "Trouver des chantiers": "var(--violet)",
  Automatisation: "var(--red)",
  "Outils & logiciels": "var(--red)",
  Tarifs: "var(--red)",
};

export function teinteRubrique(categorie: string): string {
  return TEINTES[categorie] ?? "var(--violet)";
}

export function BlogCard({
  post,
  taille = "normale",
  className,
}: {
  post: BlogPost;
  /** `grande` occupe deux colonnes et monte le titre d'un cran. */
  taille?: "normale" | "grande";
  className?: string;
}) {
  const grande = taille === "grande";

  return (
    <article
      className={cn(
        "carte-article group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-elevated",
        className,
      )}
      style={{ "--teinte": teinteRubrique(post.category) } as React.CSSProperties}
    >
      {/* Le filet de rubrique. Il s'épaissit au survol : c'est le seul retour
          visuel de la carte, avec la montée. */}
      <span aria-hidden="true" className="carte-article-filet" />

      <div className={cn("flex flex-1 flex-col p-6", grande && "sm:p-8")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          <span className="carte-article-rubrique">{post.category}</span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>

        <h3
          className={cn(
            "mt-4 font-display font-extrabold leading-[1.12] tracking-[-0.02em]",
            grande ? "text-2xl sm:text-[2rem]" : "text-xl",
          )}
        >
          {/* Le lien couvre toute la carte par son pseudo-élément : la surface
              cliquable fait la carte entière, sans imbriquer de lien dans un
              lien ni doubler l'annonce au lecteur d'écran. */}
          <Link
            to="/blog/$slug/"
            params={{ slug: post.slug }}
            className="carte-article-lien transition-colors group-hover:text-brand-ink"
          >
            {post.title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-3 flex-1 leading-relaxed text-muted-foreground",
            grande ? "text-base" : "text-[15px] line-clamp-3",
          )}
        >
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1.5 font-semibold text-brand-ink">
            Lire
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
