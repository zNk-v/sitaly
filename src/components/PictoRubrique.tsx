import {
  CalendarCheck,
  Headset,
  MessageCircle,
  Monitor,
  PenTool,
  Puzzle,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { IconeRubrique } from "@/data/offres";
import { PLATEFORMES } from "@/data/plateformes";

const GOOGLE = PLATEFORMES.find((p) => p.nom === "Google")!.d;

const LUCIDE: Record<
  Exclude<IconeRubrique, "google">,
  React.ComponentType<{ className?: string }>
> = {
  site: Monitor,
  ia: Sparkles,
  support: Headset,
  boutique: ShoppingBag,
  vendre: TrendingUp,
  repondre: MessageCircle,
  organiser: CalendarCheck,
  "sur-mesure": Puzzle,
  "direction-artistique": PenTool,
};

/**
 * Le pictogramme d'une rubrique de la grille tarifaire : un ordinateur pour le
 * site, le « G » pour Google, une étincelle pour les IA, un casque pour le
 * support. Le « G » est le tracé de Simple Icons déjà utilisé sur l'accueil,
 * en une couleur, pour qu'il se fonde dans la série.
 */
export function PictoRubrique({ icone, className }: { icone: IconeRubrique; className?: string }) {
  if (icone === "google") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d={GOOGLE} />
      </svg>
    );
  }
  const Icone = LUCIDE[icone];
  return <Icone className={className} />;
}
