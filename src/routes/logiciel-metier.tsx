import { createFileRoute } from "@tanstack/react-router";
import { ExpertiseLanding, buildExpertiseHead } from "@/components/ExpertiseLanding";
import { expertise } from "@/data/expertises";

/* Contenu, métadonnées et données structurées : src/data/expertises.ts. */
const E = expertise("logiciel-metier");

export const Route = createFileRoute("/logiciel-metier")({
  head: () => buildExpertiseHead(E),
  component: () => <ExpertiseLanding e={E} />,
});
