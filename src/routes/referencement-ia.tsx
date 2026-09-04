import { createFileRoute } from "@tanstack/react-router";
import { ExpertiseLanding, buildExpertiseHead } from "@/components/ExpertiseLanding";
import { expertise } from "@/data/expertises";

/* Contenu, métadonnées et données structurées : src/data/expertises.ts. */
const E = expertise("referencement-ia");

export const Route = createFileRoute("/referencement-ia")({
  head: () => buildExpertiseHead(E),
  component: () => <ExpertiseLanding e={E} />,
});
