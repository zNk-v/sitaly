import { Link } from "@tanstack/react-router";
import { AVIS_GOOGLE, FICHE_GOOGLE_URL, NOTE_GOOGLE, type AvisGoogle } from "@/data/avis-google";
import { getRealisation } from "@/data/realisations";
import { Etoiles, LogoGoogle } from "@/components/accueil/communs";

/**
 * Les avis de la fiche Google, en défilé continu, comme chez la référence.
 *
 * Il n'y en a que deux : la piste les répète jusqu'à couvrir un grand écran,
 * puis se double pour boucler sans saut. Les répétitions sont masquées aux
 * lecteurs d'écran, qui ne lisent chaque avis qu'une fois. Le défilé
 * s'arrête au survol, le temps de lire.
 *
 * Aucun avis n'est ajouté ici s'il n'existe pas sur la fiche
 * (src/data/avis-google.ts).
 */
const REPETITIONS = 4;

export function Avis() {
  const serie = Array.from({ length: REPETITIONS }, () => AVIS_GOOGLE).flat();

  return (
    <section id="avis" className="overflow-hidden bg-paper pt-12 pb-16 sm:pt-14 sm:pb-20">
      <div data-reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 data-split className="display-section">
          La confiance de dirigeants{" "}
          <span className="accent-word">qui veulent se concentrer sur leur métier</span>
        </h2>
        <a
          href={FICHE_GOOGLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-border bg-card px-5 py-2.5 text-sm shadow-soft transition hover:border-foreground/30"
        >
          <Etoiles className="h-3.5 w-3.5" />
          <span>
            <strong className="font-semibold">{NOTE_GOOGLE.note}/5</strong> · {NOTE_GOOGLE.nombre}{" "}
            avis
          </span>
          <span className="h-4 w-px bg-border" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5 font-medium">
            <LogoGoogle />
            Voir sur Google
          </span>
        </a>
      </div>

      <div className="defile-masque defile-avis mt-14">
        <div className="defile-avis-piste flex w-max gap-5 pr-5">
          {[0, 1].map((moitie) =>
            serie.map((a, i) => (
              <CarteAvis
                key={`${moitie}-${i}`}
                avis={a}
                cache={moitie === 1 || i >= AVIS_GOOGLE.length}
              />
            )),
          )}
        </div>
      </div>
    </section>
  );
}

function CarteAvis({ avis, cache }: { avis: AvisGoogle; cache: boolean }) {
  const realisation = avis.realisation ? getRealisation(avis.realisation) : undefined;
  return (
    <figure
      aria-hidden={cache || undefined}
      className="flex w-[19rem] shrink-0 flex-col rounded-[1.5rem] border border-border bg-card p-6 shadow-soft sm:w-[22rem]"
    >
      <div className="flex items-center justify-between">
        <Etoiles className="h-4 w-4" />
        <LogoGoogle className="h-5 w-5" />
      </div>
      <blockquote className="mt-4 line-clamp-7 flex-1 text-[15px] leading-relaxed text-foreground/85">
        {avis.texte}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
          {avis.auteur.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{avis.auteur}</div>
          <div className="truncate text-[13px] text-muted-foreground">
            {realisation ? realisation.metier : "Création de site"} · {avis.date}
          </div>
        </div>
        {realisation && !cache && (
          <Link
            to="/realisations/$slug/"
            params={{ slug: realisation.slug }}
            className="shrink-0 text-[13px] font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition hover:decoration-brand-ink"
          >
            Son site
          </Link>
        )}
      </figcaption>
    </figure>
  );
}
