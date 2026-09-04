import { createFileRoute } from "@tanstack/react-router";
import { ExpertiseLanding, buildExpertiseHead } from "@/components/ExpertiseLanding";
import { expertise } from "@/data/expertises";

/* Contenu, métadonnées et données structurées : src/data/expertises.ts. */
const E = expertise("landing-page");

export const Route = createFileRoute("/landing-page")({
  head: () => buildExpertiseHead(E),
  component: () => <ExpertiseLanding e={E} />,
});
