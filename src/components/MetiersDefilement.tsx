import { cn } from "@/lib/utils";

/**
 * Le défilement des métiers : deux rangées à contresens, les mots en dégradé.
 *
 * Adapté de `bundui/marquee-effect` sur 21st.dev, dont le parti est un bandeau
 * traversé par du texte. Deux versions ont été écartées avant celle-ci, et les
 * raisons valent d'être gardées :
 *
 * - Des pastilles encadrées, une par métier. Bordure, ombre et fond de carte
 *   répétés douze fois : la bande lisait comme un formulaire.
 * - Des mots en display, un sur deux en contour. Le contour se voyait pour ce
 *   qu'il est, un texte transparent, et non pour un effet.
 *
 * La bande n'a pas de fond : les mots portent le dégradé, posés sur la surface
 * de la section. Elle a été un aplat de dégradé aux mots en réserve blanche,
 * puis un aplat d'encre aux mots en dégradé clair.
 *
 * Le dégradé est fixé sur la fenêtre et non sur chaque mot : sans cela on
 * aurait cinquante petits dégradés au lieu d'un seul balayage.
 *
 * Framer Motion n'entre pas au bundle pour une translation linéaire : deux
 * `@keyframes` et une piste dupliquée font la même boucle sans rupture. La
 * liste des métiers est réelle et sert le référencement ; elle est lue une
 * fois, la copie de bouclage est masquée.
 */

/**
 * Les métiers, par secteur. L'ordre compte : les rangées sont constituées en
 * alternant un métier sur deux, de sorte que chacune traverse tous les
 * secteurs au lieu d'aligner six métiers du bâtiment puis six du droit.
 *
 * La liste est large volontairement. Restreinte aux artisans, elle disait le
 * contraire de ce que fait Sitaly, et un ostéopathe ou un cabinet de
 * recrutement qui la lisait en concluait que ce n'était pas pour lui.
 */
const METIERS = [
  // Bâtiment et second œuvre
  "Plombiers",
  "Électriciens",
  "Couvreurs",
  "Menuisiers",
  "Paysagistes",
  "Entreprises de rénovation",
  // Immobilier et courtage
  "Agents immobiliers",
  "Syndics de copropriété",
  "Diagnostiqueurs",
  "Courtiers en crédit",
  "Courtiers en assurance",
  "Gestionnaires de patrimoine",
  // Professions libérales
  "Avocats",
  "Notaires",
  "Experts-comptables",
  "Architectes",
  "Géomètres",
  "Consultants",
  // Santé
  "Ostéopathes",
  "Kinésithérapeutes",
  "Dentistes",
  "Vétérinaires",
  "Opticiens",
  "Psychologues",
  // Beauté et bien-être
  "Coiffeurs",
  "Barbiers",
  "Instituts de beauté",
  "Spas",
  "Tatoueurs",
  "Coachs sportifs",
  // Automobile et mobilité
  "Garages automobiles",
  "Carrossiers",
  "Auto-écoles",
  "Contrôle technique",
  "Loueurs de véhicules",
  "Sociétés de VTC",
  // Commerce et bouche
  "Restaurateurs",
  "Traiteurs",
  "Boulangers",
  "Cavistes",
  "Fleuristes",
  "Commerçants",
  // Services aux entreprises
  "Cabinets de recrutement",
  "Agences d'intérim",
  "Centres de formation",
  "Sociétés de nettoyage",
  "Déménageurs",
  "Imprimeurs",
  // Tourisme et événementiel
  "Hôtels",
  "Chambres d'hôtes",
  "Campings",
  "Photographes",
  "Wedding planners",
  "Salles de sport",
];

/** Toute la liste, pour les lecteurs d'écran et l'indexation. */
export const TOUS_LES_METIERS = METIERS;

const RANGEE_HAUT = METIERS.filter((_, i) => i % 2 === 0);
const RANGEE_BAS = METIERS.filter((_, i) => i % 2 === 1);

/* Les durées suivent le nombre de mots : la course vaut la moitié de la piste,
   donc à durée constante une piste deux fois plus longue défilerait deux fois
   plus vite. 46 s pour douze mots était le réglage d'origine ; le rapport est
   conservé, et les deux rangées reçoivent des durées légèrement différentes
   pour ne pas se synchroniser à l'œil. */
const duree = (mots: number, facteur = 1) => `${Math.round((46 * mots) / 12) * facteur}s`;

function Piste({ mots, copie = false }: { mots: readonly string[]; copie?: boolean }) {
  /* La piste est dupliquée et la translation vaut la moitié de l'ensemble :
     au terme de la course, la copie occupe exactement la place du départ. */
  return (
    <ul
      aria-hidden={copie || undefined}
      className={cn("defile-rang flex shrink-0 items-center", copie && "defile-copie")}
    >
      {mots.map((m) => (
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
}

function Rangee({
  mots,
  sens,
  duree: d,
}: {
  mots: readonly string[];
  sens?: "reverse";
  duree: string;
}) {
  return (
    <div className="defile overflow-hidden">
      <div
        className="defile-piste flex"
        style={
          {
            "--defile-duree": d,
            ...(sens ? { "--defile-sens": sens } : {}),
          } as React.CSSProperties
        }
      >
        <Piste mots={mots} />
        <Piste mots={mots} copie />
      </div>
    </div>
  );
}

export function MetiersDefilement({ className }: { className?: string }) {
  return (
    <div className={cn("ruban flex flex-col gap-2 sm:gap-3", className)}>
      <Rangee mots={RANGEE_HAUT} duree={duree(RANGEE_HAUT.length)} />
      {/* La seconde rangée remonte le courant : deux rangées dans le même sens
          se lisent comme un seul bloc qui glisse, et l'on perd le mouvement. */}
      <Rangee mots={RANGEE_BAS} sens="reverse" duree={duree(RANGEE_BAS.length, 1.12)} />
    </div>
  );
}
