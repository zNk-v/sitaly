// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Pré-génère chaque page en HTML statique (site vitrine → hébergeable sans serveur)
    prerender: {
      enabled: true,
      crawlLinks: true,
      // Landings statiques servies depuis public/ : elles n'existent pas dans le
      // routeur, donc le prérendu échoue s'il les suit. La liste doit couvrir
      // toutes les pages statiques liées depuis la navigation, sans quoi le
      // build casse dès qu'un lien vers l'une d'elles apparaît quelque part.
      filter: (page: { path: string }) =>
        !["/chatgpt-ads", "/agents-ia/chatgpt"].some((p) => page.path.startsWith(p)),
    },
  },
});
