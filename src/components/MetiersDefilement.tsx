import { cn } from "@/lib/utils";

/**
 * Le défilement des métiers : un ruban plein, les mots en réserve blanche.
 *
 * Adapté de `bundui/marquee-effect` sur 21st.dev, dont le parti est un bandeau
 * de couleur pleine traversé par du texte inversé. Deux versions ont été
 * écartées avant celle-ci, et les raisons valent d'être gardées :
 *
 * - Des pastilles encadrées, une par métier. Bordure, ombre et fond de carte
 *   répétés douze fois : la bande lisait comme un formulaire.
 * - Des mots en display, un sur deux en contour. Le contour se voyait pour ce
 *   qu'il est, un texte transparent, et non pour un effet.
 *
 * Le ruban est un aplat d'encre, et ce sont les mots qui portent le dégradé.
 * L'inverse a été essayé d'abord — dégradé au fond, mots en réserve blanche —
 * mais la couleur passait derrière le texte au lieu de le traverser, et chaque
 * mot changeait de fond en défilant.
 *
 * Le dégradé est fixé sur la fenêtre et non sur chaque mot : sans cela on
 * aurait douze petits dégradés au lieu d'un seul balayage.
 *
 * Framer Motion n'entre pas au bundle pour une translation linéaire : deux
 * `@keyframes` et une piste dupliquée font la même boucle sans rupture. La
 * liste des métiers est réelle et sert le référencement ; elle est lue une
 * fois, la copie de bouclage est masquée.
 */

const METIERS = [
  "Artisans",
  "Ostéopathes",
  "Coachs sportifs",
  "Agents immobiliers",
  "Garages automobiles",
  "Restaurateurs",
  "Commerçants",
  "Avocats",
  "Experts-comptables",
  "Cabinets de recrutement",
  "Centres de formation",
  "Consultants",
];

export function MetiersDefilement({ className }: { className?: string }) {
  /* La piste est dupliquée et la translation vaut la moitié de l'ensemble :
     au terme de la course, la copie occupe exactement la place du départ. */
  const Piste = ({ copie = false }: { copie?: boolean }) => (
    <ul
      aria-hidden={copie || undefined}
      className={cn("defile-rang flex shrink-0 items-center", copie && "defile-copie")}
    >
      {METIERS.map((m) => (
        <li key={m} className="flex items-center">
          <span className="defile-mot whitespace-nowrap font-display text-[clamp(0.95rem,1.6vw,1.3rem)] font-extrabold tracking-[-0.01em]">
            {m}
          </span>
          {/* Le losange sépare aussi le dernier mot d'une piste du premier de
              sa copie, ce qu'un `gap` posé sur la liste ne ferait pas. */}
          <span aria-hidden="true" className="defile-losange" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("ruban defile overflow-hidden py-3.5 sm:py-4", className)}>
      <div className="defile-piste flex">
        <Piste />
        <Piste copie />
      </div>
    </div>
  );
}
