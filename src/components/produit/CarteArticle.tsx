import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { formatDate, type BlogPost } from "@/data/blog-posts";
import { TEXTE_GRIS } from "@/components/produit/Produit";
import { Couverture } from "@/components/produit/Couverture";

/**
 * La carte d'un article dans l'allure Durable (30 octobre 2026) : le blog et
 * ses suggestions de lecture. BlogCard garde l'ancienne allure pour les pages
 * de l'agence.
 *
 * « sombre » met un article en avant : la grande carte de la une.
 */
export function CarteArticle({
  post,
  sombre = false,
  className = "",
}: {
  post: BlogPost;
  sombre?: boolean;
  className?: string;
}) {
  return (
    <Link
      to="/blog/$slug/"
      params={{ slug: post.slug }}
      className={`group flex flex-col justify-between rounded-3xl p-6 transition sm:p-7 ${
        sombre ? "bg-[#0d0f14] text-white hover:bg-black" : "bg-black/[0.03] hover:bg-black/[0.05]"
      } ${className}`}
    >
      {/* La grande carte laisse sa couverture animée occuper toute la hauteur libre. */}
      <div className={sombre ? "flex flex-1 flex-col" : ""}>
        <Couverture
          slug={post.slug}
          rubrique={post.category}
          className={`mb-5 rounded-2xl ${sombre ? "min-h-[16rem] flex-1" : "aspect-[1.9/1]"}`}
        />
        <div className="flex flex-wrap items-center gap-2 text-[13px]">
          <span
            className={`rounded-full px-3 py-1 font-medium ${sombre ? "bg-white/10 text-[#c4b5fd]" : "bg-white text-black/70"}`}
          >
            {post.category}
          </span>
          <span className={sombre ? "text-white/50" : "text-black/45"}>{post.readingTime}</span>
        </div>
        <h3
          className={
            sombre
              ? "titre-produit max-w-2xl pt-2 text-[2rem] leading-[1.05] text-white sm:text-[2.6rem]"
              : "mt-5 text-xl leading-snug font-semibold tracking-tight"
          }
        >
          {post.title.replace(/ ([:;?!])/g, " $1")}
        </h3>
        <p
          className={`mt-3 line-clamp-3 text-[15px] leading-relaxed ${sombre ? "max-w-xl text-white/65" : TEXTE_GRIS}`}
        >
          {post.excerpt}
        </p>
      </div>
      <div
        className={`mt-6 flex items-center justify-between text-[13px] ${sombre ? "text-white/50" : "text-black/45"}`}
      >
        <span>{formatDate(post.publishedAt)}</span>
        <span
          className={`inline-flex items-center gap-1.5 font-semibold ${sombre ? "text-white" : "text-black"}`}
        >
          Lire
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
