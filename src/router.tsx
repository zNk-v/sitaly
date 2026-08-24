import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // GitHub Pages sert /acquisition/index.html : sans slash final, chaque lien
    // interne déclenche une redirection 301 inutile pour l'utilisateur et pour Googlebot.
    trailingSlash: "always",
  });

  return router;
};
