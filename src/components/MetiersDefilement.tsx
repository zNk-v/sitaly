import { cn } from "@/lib/utils";

/**
 * Le défilement des métiers : une rangée de mots qui saignent des deux bords.
 *
 * Le parti typographique vient de `preetsuthar17/infinite-text-marquee` sur
 * 21st.dev : des mots posés à nu qui traversent l'écran, au lieu de pastilles
 * encadrées qui ne disent rien du registre du site.
 *
 * Une première version reprenait aussi la structure à deux rangées de
 * `shadcnspace/marquee-01`, en display. Douze mots de titre en mouvement
 * simultané faisaient un mur : le gain de style se payait en lisibilité. Il
 * reste une rangée, à une échelle de libellé et non de titre.
 *
 * Trois écarts avec l'original :
 *
 * - Framer Motion n'entre pas au bundle pour une translation linéaire. Deux
 *   `@keyframes` et une piste dupliquée font la même boucle sans rupture.
 * - Un mot sur deux est en contour plutôt qu'en plein. Sans cette alternance,
 *   douze mots de la même graisse forment une ligne grise.
 * - Sous `prefers-reduced-motion`, la bande ne se fige pas : figée, elle
 *   couperait les mots au bord. La piste doublée disparaît et la liste passe
 *   à la ligne, centrée.
 *
 * La liste des métiers est réelle et sert le référencement : elle est lue une
 * fois par les lecteurs d'écran, la copie de bouclage est masquée.
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

/** Le losange qui sépare deux mots, en dégradé de marque. */
function Losange() {
  return <span aria-hidden="true" className="defile-losange" />;
}

function Rang({
  mots,
  sens,
  vitesse,
}: {
  mots: string[];
  sens: "gauche" | "droite";
  vitesse: string;
}) {
  /* La piste est dupliquée et la translation vaut la moitié de l'ensemble :
     au terme de la course, la copie occupe exactement la place du départ. */
  const Piste = ({ copie = false }: { copie?: boolean }) => (
    <ul
      aria-hidden={copie || undefined}
      className={cn("defile-rang flex shrink-0 items-center", copie && "defile-copie")}
    >
      {mots.map((m, i) => (
        <li key={m} className="flex items-center">
          <span
            className={cn(
              "whitespace-nowrap font-display text-[clamp(1.05rem,1.9vw,1.6rem)] font-extrabold leading-[1.1] tracking-[-0.01em]",
              i % 2 === 1 && "defile-contour",
            )}
          >
            {m}
          </span>
          <Losange />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="defile-piste flex"
      style={
        {
          "--defile-duree": vitesse,
          "--defile-sens": sens === "droite" ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      <Piste />
      <Piste copie />
    </div>
  );
}

export function MetiersDefilement({ className }: { className?: string }) {
  return (
    <div className={cn("defile marquee-mask overflow-hidden", className)}>
      <Rang mots={METIERS} sens="gauche" vitesse="52s" />
    </div>
  );
}
