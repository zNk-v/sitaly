import { createFileRoute } from "@tanstack/react-router";
import { PageIntrouvable } from "@/components/PageIntrouvable";

/* Prérendue en /404.html (vite.config.ts), le fichier que GitHub Pages sert
   pour toute adresse inconnue. Jamais indexée, et absente du sitemap. */
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "Page introuvable | Sitaly" }, { name: "robots", content: "noindex, follow" }],
  }),
  component: PageIntrouvable,
});
