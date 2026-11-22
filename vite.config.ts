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
      // Les dix pages métier, indexées depuis le 17 novembre 2026 (serrurier,
      // chauffagiste, carreleur, SITA-26) et le 22 novembre 2026 (les sept
      // autres). Les modèles en lient sept : les trois autres n'ont aucune page
      // indexée qui les lie. Toutes listées ici pour que le prérendu les génère.
      ...[
        "plombier",
        "electricien",
        "couvreur",
        "menuisier",
        "macon",
        "peintre",
        "paysagiste",
        "serrurier",
        "chauffagiste",
        "carreleur",
      ].map((m) => ({ path: `/site-internet-${m}` })),
      // /essonne/ : même cas depuis le 20 novembre 2026 (SITA-76). Sortie de
      // PAGES_AGENCE_HORS_INDEX, donc plus dans la liste ci-dessus, et aucune
      // page du site ne la lie : sans cette ligne, le prérendu par liens ne la
      // trouve pas et le sitemap annonce une adresse absente de dist/client.
      { path: "/essonne" },
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
