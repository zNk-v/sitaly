import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CONTENEUR, TITRE_SECTION } from "@/components/premium/communs";
import { REALISATIONS, srcSetCapture } from "@/data/realisations";

const PREUVE = REALISATIONS.find((r) => r.slug === "aymeric-pataud");

/**
 * La preuve : les marques sont inventées, celle-ci existe. Une réalisation
 * réelle, présentée comme « un site sur mesure livré par Sitaly » et jamais
 * comme un site Premium : le client est au mois. Seul endroit de la page sans
 * pastille « Concept ».
 */
export function PreuvePremium() {
  if (!PREUVE) return null;
  return (
    <section aria-labelledby="preuve-titre" className="border-t border-border py-20 sm:py-28">
      <div className={CONTENEUR}>
        <p className="rail-label text-brand-ink">La preuve</p>
        <h2 id="preuve-titre" className={TITRE_SECTION}>
          Les marques sont inventées. <span className="accent-word">Celle-ci</span> existe.
        </h2>

        <article className="lift mt-12 grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft lg:grid-cols-[7fr_5fr]">
          <img
            src={PREUVE.capture.webp.w560}
            srcSet={srcSetCapture(PREUVE)}
            sizes="(min-width: 1024px) 700px, 100vw"
            alt={`La page d'accueil de ${PREUVE.domaine}`}
            loading="lazy"
            className="aspect-[16/10] h-full w-full object-cover object-top"
          />
          <div className="flex flex-col p-6 sm:p-8">
            <span className="w-fit rounded-full bg-signal/20 px-3 py-1 text-sm font-semibold text-signal-ink">
              En ligne
            </span>
            <p className="mt-5 font-display text-2xl font-bold tracking-tight">{PREUVE.client}</p>
            <p className="mt-1 text-muted-foreground">
              {PREUVE.metier}, {PREUVE.zone}
            </p>
            <p className="mt-5 font-accent text-2xl italic leading-snug">« {PREUVE.accroche} »</p>
            <p className="mt-5 leading-relaxed text-foreground/85">
              Un site sur mesure livré par Sitaly. La mise en page part de son écriture : titres
              généreux, mesure de lecture courte, navigation par univers.
            </p>
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-8">
              <a
                href={PREUVE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-ink"
              >
                Ouvrir {PREUVE.domaine}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                to="/realisations/$slug/"
                params={{ slug: PREUVE.slug }}
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-ink"
              >
                Lire l'étude du projet
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
