import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // GitHub Pages sert les pages depuis des dossiers : sans slash final,
    // chaque lien interne coûte une redirection 301 avant d'afficher la page.
    trailingSlash: "always",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
