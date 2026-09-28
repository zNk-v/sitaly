/**
 * La date du build, figée pour le serveur comme pour le navigateur.
 *
 * Tout ce qui s'affiche d'après la date du jour (articles publiés, année du
 * pied de page) doit donner le même résultat au prérendu et à l'hydratation.
 * Calculé dans le navigateur, le « jour même » dépend du fuseau du visiteur et
 * du temps écoulé depuis le déploiement : React voyait alors un texte
 * différent de celui du HTML et levait l'erreur #418, relevée par PageSpeed
 * depuis des serveurs américains.
 *
 * Vite injecte la constante au build (vite.config.ts). Hors de Vite (script
 * du sitemap), on retombe sur la date du jour, en UTC.
 */
declare const __DATE_DU_BUILD__: string | undefined;

export const DATE_DU_BUILD: string =
  typeof __DATE_DU_BUILD__ === "string" ? __DATE_DU_BUILD__ : new Date().toISOString().slice(0, 10);

export const ANNEE_DU_BUILD = Number(DATE_DU_BUILD.slice(0, 4));
