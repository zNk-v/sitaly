import type { CSSProperties } from "react";
import { Lock } from "lucide-react";
import { contenuDe } from "@/components/premium/registre";
import { styleLogo } from "@/components/premium/style-logo";
import type { Vitrine as V } from "@/data/premium";

/**
 * Un site inventé, dans sa figure : la barre d'adresse (en galerie), l'écran
 * inerte qui porte la maquette, et la légende lue par les lecteurs d'écran.
 *
 * L'écran est un conteneur de taille (`container: ecran / size`) : la
 * maquette mesure tout en `cqi` et `cqb`, et choisit sa composition par la
 * largeur du conteneur, pas par celle de la fenêtre.
 *
 * La palette passe en variables (`--v-fond`, `--v-encre`, `--v-accent`,
 * `--v-sur`, `--v-doux`), avec le fond du site précédent (`--v-precedent`)
 * pour les gestes qui le repeignent.
 */
export function Vitrine({
  v,
  numero,
  precedent,
  premiere,
}: {
  v: V;
  numero: number;
  precedent?: V;
  premiere: boolean;
}) {
  const Contenu = contenuDe(v.id);
  const style = {
    "--v-fond": v.palette.fond,
    "--v-encre": v.palette.encre,
    "--v-accent": v.palette.accent,
    "--v-sur": v.palette.sur,
    "--v-doux": v.palette.doux,
    "--v-precedent": precedent?.palette.fond ?? v.palette.fond,
    ...styleLogo(v.logo),
  } as CSSProperties;
  const num = String(numero).padStart(2, "0");

  return (
    <figure
      id={`metier-${v.id}`}
      className={`vitrine m-${v.id}`}
      data-sens={v.sens}
      data-vu={premiere ? "" : undefined}
      style={style}
    >
      <div className="vitrine-barre" aria-hidden="true">
        <span className="vitrine-points">
          <span />
          <span />
          <span />
        </span>
        <span className="vitrine-domaine">
          <Lock className="h-3 w-3" />
          {v.domaine}
        </span>
        <span className="pastille-concept">
          <span className="pastille-concept-long">Concept · marque inventée</span>
          <span className="pastille-concept-court">Concept</span>
        </span>
      </div>
      <div className="vitrine-ecran" aria-hidden="true" inert data-nosnippet="">
        <div className="vitrine-contenu">
          <Contenu v={v} />
          <span className="vitrine-etiquette">Marque inventée · démonstration Sitaly</span>
        </div>
      </div>
      <figcaption className="vitrine-legende">
        <span className="vitrine-legende-num">
          {num} · {v.metier}
        </span>{" "}
        <span className="vitrine-legende-marque">{v.marque} (marque inventée).</span>{" "}
        <span className="vitrine-legende-texte">{v.legende}</span>{" "}
        <span className="vitrine-legende-accroche">Accroche du site : « {v.accroche} »</span>{" "}
        <span className="vitrine-legende-meme">
          Même logique pour : {v.memeLogique.join(", ")}.
        </span>
      </figcaption>
    </figure>
  );
}
