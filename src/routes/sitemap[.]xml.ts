import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { buildSitemapXml } from "@/lib/sitemap";

/**
 * Route servie en développement et sur un hébergeur capable d'exécuter des handlers.
 * En production (GitHub Pages), c'est public/sitemap.xml qui est servi ; ce fichier est
 * régénéré à partir de la même source par scripts/generate-sitemap.mjs avant chaque build.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(buildSitemapXml(), {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
