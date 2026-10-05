import { createFileRoute } from "@tanstack/react-router";
import { SecteurLanding, buildSecteurHead } from "@/components/SecteurLanding";
import { secteur } from "@/data/secteurs";

/* Contenu, métadonnées et données structurées : src/data/secteurs.ts.
   Le « _ » après agents-ia sort la page du gabarit de /agents-ia/ : même
   chemin, page autonome. */
const S = secteur("restauration");

export const Route = createFileRoute("/agents-ia_/restauration")({
  head: () => buildSecteurHead(S),
  component: () => <SecteurLanding s={S} />,
});
