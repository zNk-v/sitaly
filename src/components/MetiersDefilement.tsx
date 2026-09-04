import { cn } from "@/lib/utils";

/**
 * Le défilement des métiers : une rangée, les mots en dégradé.
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
 * Les métiers, par secteur. L'ordre compte : la piste change de secteur tous
 * les six mots, ce qui suffit à faire comprendre en une seconde de lecture que
 * la liste ne se limite pas au bâtiment.
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

/* La durée suit le nombre de mots : la course vaut la moitié de la piste, donc
   à durée constante une piste quatre fois plus longue défilerait quatre fois
   plus vite. Le rapport d'origine, 46 s pour douze mots, donnait 52 px/s ; à
   ce rythme et avec cinquante-quatre métiers, il fallait 3 min 27 pour voir la
   liste entière. 29 s pour douze mots la montre en 2 min 11, à 84 px/s à
   1440 de large, sans que les mots deviennent illisibles au passage. */
const DUREE = `${Math.round((29 * METIERS.length) / 12)}s`;

function Piste({ copie = false }: { copie?: boolean }) {
  /* La piste est dupliquée et la translation vaut la moitié de l'ensemble :
     au terme de la course, la copie occupe exactement la place du départ. */
  return (
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
}

export function MetiersDefilement({ className }: { className?: string }) {
  return (
    <div className={cn("ruban defile overflow-hidden", className)}>
      <div className="defile-piste flex" style={{ "--defile-duree": DUREE } as React.CSSProperties}>
        <Piste />
        <Piste copie />
      </div>
    </div>
  );
}
