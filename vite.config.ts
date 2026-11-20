// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { PAGES_A_PRERENDRE_HORS_INDEX } from "./src/lib/indexation";

export default defineConfig({
  vite: {
    // La date du build, identique au prérendu et dans le navigateur
    // (src/lib/date-du-build.ts).
    define: {
      __DATE_DU_BUILD__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Pré-génère chaque page en HTML statique (site vitrine → hébergeable sans serveur)
    // /carte n'est liée depuis aucune page (c'est la cible du QR code des cartes
    // de visite) : le prérendu par liens ne la trouverait jamais.
    // Les pages hors index (src/lib/indexation.ts) ne sont plus liées depuis
    // le pied de page ni le blog : listées ici, elles restent générées et
    // accessibles par leur adresse, pour la prospection directe.
    // /404 sort en /404.html, le fichier que GitHub Pages sert pour toute
    // adresse inconnue (src/routes/404.tsx).
    pages: [
      { path: "/carte" },
      // Sitaly Premium : relue à son adresse avant d'entrer dans le menu.
      { path: "/site-premium" },
      {
        path: "/404",
        prerender: { outputPath: "/404", autoSubfolderIndex: false, crawlLinks: false },
      },
      ...PAGES_A_PRERENDRE_HORS_INDEX.map((path) => ({ path })),
      // Serrurier, chauffagiste, carreleur : indexées depuis le 17 novembre 2026
      // (SITA-26), donc sorties de PAGES_METIER_HORS_INDEX, mais toujours sans
      // page indexée qui les lie. Listées ici pour que le prérendu les génère.
      { path: "/site-internet-serrurier" },
      { path: "/site-internet-chauffagiste" },
      { path: "/site-internet-carreleur" },
      // /creation-site-internet/ : même cas depuis le 20 novembre 2026
      // (SITA-90, décision de Ted), sortie de PAGES_AGENCE_HORS_INDEX. Les
      // trois composants de src/components/accueil/ qui la liaient ne sont
      // plus rendus, et le bloc voisines des pages d'expertise ne la lie plus
      // depuis qu'il filtre sur estIndexable : sans cette ligne, le prérendu
      // par liens ne la trouve plus. Google la découvre par le sitemap.
      { path: "/creation-site-internet" },
    ],
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
