import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { REALISATIONS, srcSetCapture } from "@/data/realisations";
import { cn } from "@/lib/utils";

/**
 * Carrousel des réalisations : grande capture à gauche, carte qui la chevauche
 * à droite.
 *
 * Adapté d'un composant 21st.dev prévu pour des témoignages d'équipe. Trois
 * écarts assumés par rapport à l'original :
 *
 * - `next/image` et `next/link` n'existent pas ici : le projet tourne sur Vite
 *   et TanStack Router. Remplacés par une balise img avec srcSet et par Link.
 * - Framer Motion n'entre pas au bundle pour un fondu enchaîné. Les diapositives
 *   restent montées et se croisent en opacité, ce qui coûte deux règles CSS.
 * - Les diapositives montées mais masquées sont retirées de l'ordre de
 *   tabulation et de l'arbre d'accessibilité, sans quoi le clavier traverserait
 *   des liens invisibles.
 */
export function RealisationsCarousel({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const total = REALISATIONS.length;

  const suivant = () => setIndex((i) => (i + 1) % total);
  const precedent = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <div className={cn("mx-auto w-full max-w-6xl", className)}>
      <div className="relative">
        {REALISATIONS.map((r, i) => {
          const actif = i === index;
          return (
            <div
              key={r.slug}
              aria-hidden={!actif}
              inert={!actif}
              className={cn(
                "transition-opacity duration-500",
                actif ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
              )}
            >
              <div className="items-center md:flex">
                {/* Capture réelle du site en ligne. */}
                <Link
                  to="/realisations/$slug/"
                  params={{ slug: r.slug }}
                  className="zoom-frame block w-full shrink-0 overflow-hidden rounded-3xl border border-border bg-card shadow-elevated md:w-[52%]"
                >
                  {/* En WebP, et chargée en différé : le carrousel vit loin
                      sous le premier écran. Chargée d'emblée, la première
                      capture était préchargée en tête de page et disputait
                      la bande passante au mot du hero. */}
                  <img
                    src={r.capture.small}
                    srcSet={srcSetCapture(r)}
                    sizes="(min-width: 1152px) 600px, (min-width: 768px) 52vw, calc(100vw - 2rem)"
                    alt={`Page d'accueil du site de ${r.client}`}
                    width={720}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </Link>

                {/* La carte chevauche la capture, comme dans l'original. */}
                <div className="relative z-10 -mt-8 flex-1 rounded-3xl border border-border bg-card p-7 shadow-elevated sm:p-9 md:-ml-16 md:mt-0">
                  <div className="rail-label text-brand-ink">
                    {r.metier} · {r.zone}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {r.client}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{r.resume}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {r.livre.slice(0, 3).map((l) => (
                      <li
                        key={l}
                        className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      to="/realisations/$slug/"
                      params={{ slug: r.slug }}
                      className="group inline-flex min-h-11 items-center gap-2 font-semibold text-brand-ink"
                    >
                      Voir l'étude de cas
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {r.domaine}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={precedent}
          aria-label="Réalisation précédente"
          className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card shadow-soft transition hover:bg-secondary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Chaque pastille est un bouton de 44 px de côté : le point visible
            est plus petit, la zone tactile ne l'est pas. */}
        <div className="flex">
          {REALISATIONS.map((r, i) => (
            <button
              key={r.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Voir ${r.client}`}
              aria-current={i === index}
              className="group grid h-11 min-w-11 place-items-center px-1"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block h-2.5 rounded-full transition-all",
                  i === index
                    ? "w-8 bg-brand-ink"
                    : "w-2.5 bg-border group-hover:bg-muted-foreground/50",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={suivant}
          aria-label="Réalisation suivante"
          className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card shadow-soft transition hover:bg-secondary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
