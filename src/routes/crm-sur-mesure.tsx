import { createFileRoute } from "@tanstack/react-router";
import { ExpertiseLanding, buildExpertiseHead } from "@/components/ExpertiseLanding";
import { expertise } from "@/data/expertises";

/* Contenu, métadonnées et données structurées : src/data/expertises.ts. */
const E = expertise("crm-sur-mesure");

export const Route = createFileRoute("/crm-sur-mesure")({
  head: () => buildExpertiseHead(E),
  component: () => <ExpertiseLanding e={E} />,
});
