import { useRef, type CSSProperties } from "react";
import { CONTENEUR, TITRE_SECTION } from "@/components/premium/communs";
import { METHODE } from "@/data/premium";
import { useProgressionAuDefilement } from "@/hooks/use-progression-defilement";

/**
 * La méthode : cinq étapes et trois acomptes, sur la frise du site (styles.css,
 * `.frise`). Variante `.frise--echelle` (premium.css) : le faisceau grandit en
 * `scaleY` plutôt qu'en hauteur, pour ne bouger que transform et opacité.
 *
 * `--progression` vaut 1 au départ : sans script, la frise est entière et
 * lisible. Le hook la reprend à 0 avant que la section n'entre à l'écran.
 */
export function MethodePremium() {
  const frise = useRef<HTMLDivElement>(null);
  useProgressionAuDefilement(frise);
  const n = METHODE.length;

  return (
    <section aria-labelledby="methode-titre" className="py-20 sm:py-28">
      <div className={CONTENEUR}>
        <p className="rail-label text-brand-ink">La méthode</p>
        <h2 id="methode-titre" className={TITRE_SECTION}>
          Cinq étapes, <span className="accent-word">trois</span> acomptes
        </h2>
        <p className="measure mt-5 text-lg leading-relaxed text-muted-foreground">
          Huit à dix semaines entre l'atelier et la mise en ligne, si vous validez chaque étape sous
          une semaine.
        </p>

        <div
          ref={frise}
          className="frise frise--echelle mt-12 max-w-3xl"
          style={{ "--progression": 1 } as CSSProperties}
        >
          <span className="frise-rail" aria-hidden="true" />
          <span className="frise-faisceau" aria-hidden="true" />
          <ol>
            {METHODE.map((e, i) => (
              <li
                key={e.titre}
                className="frise-etape"
                style={{ "--i": i, "--n": n } as CSSProperties}
              >
                <span className="frise-pastille" aria-hidden="true">
                  <span className="frise-pastille-halo" />
                  <span className="frise-pastille-fond" />
                  <span className="frise-numero">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <div className="frise-bloc">
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {e.titre}{" "}
                    <span className="font-sans text-base font-medium text-muted-foreground">
                      · {e.quand}
                    </span>
                  </h3>
                  <p className="mt-2 leading-relaxed text-foreground/85">{e.texte}</p>
                  {e.acompte && (
                    <p className="mt-3 inline-flex rounded-full border border-border bg-card px-3 py-1 text-sm font-semibold tabular-nums">
                      {e.acompte}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
