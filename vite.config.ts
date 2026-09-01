// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** Pages HTML autonomes livrées telles quelles depuis public/ (hors routeur). */
const STATIC_PAGES = ["/chatgpt-ads/", "/pub/", "/agents-ia/chatgpt/"];

export default defineConfig({
  vite: {
    // Certains environnements de build (conteneurs CI sans IPv6) rejettent le bind
    // par défaut sur "::" du serveur de preview utilisé par le prerender.
    preview: { host: "127.0.0.1" },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Pré-génère chaque page en HTML statique (site vitrine → hébergeable sans serveur)
    prerender: {
      enabled: true,
      crawlLinks: true,
      // Le crawler suit tous les liens internes rencontrés. Les landings
      // autonomes (/chatgpt-ads/, /pub/, /agents-ia/chatgpt/) sont du HTML
      // servi depuis public/ et n'ont pas de route : les demander au serveur
      // de rendu renvoie un 404 et fait échouer le build.
      filter: ({ path }: { path: string }) =>
        !STATIC_PAGES.some((p) => path === p || path.startsWith(`${p}?`)),
    },
  },
});
