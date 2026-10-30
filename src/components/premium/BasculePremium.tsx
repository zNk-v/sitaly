import { useSyncExternalStore } from "react";
import { CONTENEUR, TITRE_SECTION } from "@/components/premium/communs";
import { NOMBRE_VITRINES_LETTRES, VITRINES } from "@/data/premium";
import { storeMesures, type MesuresScene } from "@/hooks/use-scene-vitrines";

const SERVEUR: MesuresScene = { debut: null, fin: null, vus: 0 };

/**
 * La bascule : la page cesse de montrer des sites et s'adresse au visiteur.
 * Il vient de faire défiler un site Premium. Les chiffres en vert signal
 * marquent ce qui se vérifie (DESIGN.md §3) : aucune image dans les
 * maquettes, et le temps de la traversée, mesuré sur son appareil quand il
 * l'a faite d'un bout à l'autre.
 */
export function BasculePremium() {
  const m = useSyncExternalStore(storeMesures.abonner, storeMesures.lire, () => SERVEUR);
  const n = VITRINES.length;
  const secondes =
    m.debut !== null && m.fin !== null ? Math.max(1, Math.round((m.fin - m.debut) / 1000)) : null;

  const chiffres = [
    { valeur: "0", texte: "photo, vidéo ou image générée dans les maquettes" },
    secondes !== null
      ? {
          valeur: `${secondes} s`,
          texte: `pour traverser les ${n} sites, à votre rythme. Mesuré sur votre appareil, à l'instant.`,
        }
      : { valeur: String(n), texte: "maquettes écrites en code, une par métier" },
    { valeur: "3", texte: "polices, celles de ce site : les maquettes n'en chargent aucune autre" },
  ];

  return (
    <section aria-labelledby="bascule-titre" className="bg-paper-sunk py-20 sm:py-28">
      <div className={CONTENEUR}>
        <p className="rail-label text-brand-ink">La bascule</p>
        <h2 id="bascule-titre" className={TITRE_SECTION}>
          Vous venez de défiler dans un site <span className="accent-word">Premium</span>
        </h2>
        <p className="measure mt-6 text-lg leading-relaxed text-foreground/85">
          Cette page suit les règles des sites que nous livrons. Nous n'y avons mis ni vidéo, ni
          photo générée, ni bibliothèque d'animation : les {NOMBRE_VITRINES_LETTRES} maquettes sont
          écrites en HTML et en CSS, comme ce paragraphe. Sur un téléphone, une tablette ou un grand
          écran, elles se recomposent sans rien télécharger de plus. Votre site suivra les mêmes
          règles, avec vos photos et vos textes.
        </p>
        <dl className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
          {chiffres.map((c) => (
            <div key={c.texte}>
              <dt className="sr-only">{c.texte}</dt>
              <dd>
                <span className="block font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.04em] text-signal-ink tabular-nums sm:text-[3.25rem]">
                  {c.valeur}
                </span>
                <span className="mt-3 block max-w-xs leading-relaxed text-muted-foreground">
                  {c.texte}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
