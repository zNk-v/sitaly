import { useRef, type CSSProperties } from "react";
import { List, Lock, X } from "lucide-react";
import { Vitrine } from "@/components/premium/Vitrine";
import { useSceneVitrines } from "@/hooks/use-scene-vitrines";
import { NOMBRE_VITRINES_LETTRES, VITRINES } from "@/data/premium";
import { offre, prixCourt } from "@/data/offres";

const PREMIUM = offre("site-premium");
const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Le défilé : un cadre collé, et dans ce cadre un site inventé qui change de
 * métier à chaque pas de défilement. Mécanique dans use-scene-vitrines.ts,
 * mise en page dans premium.css.
 *
 * Deux états pour un seul DOM. En mode effet (classe `premium-effet` sur
 * <html>), la scène est collée : index et légende à gauche sur ordinateur,
 * ruban et légende courte autour du cadre sur téléphone. En galerie (sans
 * script, mouvement réduit, écran trop bas), les sites se suivent, chacun
 * avec sa barre d'adresse et sa légende visibles.
 */
export function ScenePremium() {
  const scene = useRef<HTMLElement>(null);
  const dialogue = useRef<HTMLDialogElement>(null);
  const n = VITRINES.length;
  const { actif, effet } = useSceneVitrines(scene, n);
  const v = VITRINES[actif];

  return (
    <section
      ref={scene}
      id="defile"
      className="premium-scene"
      style={{ "--n": n } as CSSProperties}
      aria-labelledby="defile-titre"
    >
      <h2 id="defile-titre" className="sr-only">
        {n} métiers, {n} sites inventés
      </h2>

      <div className="premium-pin">
        {/* Colonne de gauche sur ordinateur ; sommaire en galerie. */}
        <div className="scene-gauche">
          <p className="rail-label text-brand-ink">
            {n} métiers, {n} sites inventés
          </p>
          <nav
            aria-label="Les métiers de la démonstration"
            className="scene-index"
            style={{ "--actif": actif } as CSSProperties}
          >
            <ol>
              {VITRINES.map((x, i) => (
                <li key={x.id}>
                  <a
                    href={`#metier-${x.id}`}
                    aria-current={effet && i === actif ? "true" : undefined}
                  >
                    <span className="rail-num">{num(i)}</span>
                    {x.metier}
                  </a>
                </li>
              ))}
            </ol>
            <span className="scene-index-curseur" aria-hidden="true" />
          </nav>

          <div className="scene-legendes" aria-hidden="true">
            {VITRINES.map((x, i) => (
              <div key={x.id} data-actif={i === actif ? "" : undefined}>
                <p className="scene-legende-titre">
                  {num(i)} · {x.marque}, {x.metier.toLowerCase()}
                </p>
                <p className="scene-legende-texte">{x.legende}</p>
                <p className="scene-legende-meme">
                  Même logique pour : {x.memeLogique.join(", ")}.
                </p>
              </div>
            ))}
          </div>

          <a href="#tarif" className="scene-tarif">
            Tarif : {prixCourt(PREMIUM)}
          </a>
        </div>

        {/* Ruban du téléphone : où l'on en est, et tous les métiers. */}
        <div className="scene-ruban">
          <p className="scene-ruban-texte" aria-hidden="true">
            <span className="rail-num">
              {num(actif)} / {num(n - 1)}
            </span>{" "}
            · {v.metier}
          </p>
          <button
            type="button"
            className="scene-ruban-bouton"
            onClick={() => dialogue.current?.showModal()}
          >
            <List className="h-4 w-4" />
            Tous les métiers
          </button>
          <span className="scene-segments" aria-hidden="true">
            {VITRINES.map((x, i) => (
              <span key={x.id} data-plein={i <= actif ? "" : undefined} />
            ))}
          </span>
        </div>

        <div className="scene-cadre">
          <div className="cadre-barre" aria-hidden="true">
            <span className="vitrine-points">
              <span />
              <span />
              <span />
            </span>
            <span className="cadre-domaines">
              {VITRINES.map((x, i) => (
                <span key={x.id} data-actif={i === actif ? "" : undefined}>
                  <Lock className="h-3 w-3" />
                  {x.domaine}
                </span>
              ))}
            </span>
            <span className="pastille-concept">
              <span className="pastille-concept-long">Concept · marque inventée</span>
              <span className="pastille-concept-court">Concept</span>
            </span>
            <span className="cadre-filet" />
          </div>
          <div className="cadre-ecrans">
            {VITRINES.map((x, i) => (
              <Vitrine
                key={x.id}
                v={x}
                numero={i + 1}
                precedent={VITRINES[i - 1]}
                premiere={i === 0}
              />
            ))}
          </div>
        </div>

        {/* Légende courte du téléphone, sous le cadre. */}
        <div className="scene-legende-etroite" aria-hidden="true">
          <p>
            <strong>{v.marque}</strong> · {v.legende}
          </p>
          <a href="#tarif" tabIndex={-1}>
            Tarif : {prixCourt(PREMIUM)}
          </a>
        </div>
      </div>

      <dialog
        ref={dialogue}
        className="scene-dialogue"
        aria-labelledby="tous-metiers-titre"
        onClick={(e) => {
          /* Un clic sur un lien ou sur le voile referme le dialogue. */
          const cible = e.target as HTMLElement;
          if (cible === dialogue.current || cible.closest("a")) dialogue.current?.close();
        }}
      >
        <div className="scene-dialogue-corps">
          <div className="flex items-center justify-between gap-4">
            <p id="tous-metiers-titre" className="font-display text-lg font-bold">
              Les {NOMBRE_VITRINES_LETTRES} métiers
            </p>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-border"
              onClick={() => dialogue.current?.close()}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </button>
          </div>
          <ol className="mt-4 grid gap-1">
            {VITRINES.map((x, i) => (
              <li key={x.id}>
                <a href={`#metier-${x.id}`} className="scene-dialogue-lien">
                  <span className="rail-num">{num(i)}</span>
                  <span>{x.metier}</span>
                  <span className="text-muted-foreground">{x.marque}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </dialog>
    </section>
  );
}
