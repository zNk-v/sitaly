import { createFileRoute } from "@tanstack/react-router";
import { SecteurLanding, buildSecteurHead } from "@/components/SecteurLanding";
import { AGENT_VOCAL } from "@/data/agent-vocal";

/* Contenu, métadonnées et données structurées : src/data/agent-vocal.ts.
   Même gabarit que les pages secteurs ; le « _ » après agents-ia sort la page
   du gabarit de /agents-ia/ : même chemin, page autonome. */
export const Route = createFileRoute("/agents-ia_/agent-vocal")({
  head: () => buildSecteurHead(AGENT_VOCAL),
  component: () => <SecteurLanding s={AGENT_VOCAL} />,
});
