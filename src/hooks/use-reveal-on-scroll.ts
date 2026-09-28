import { useEffect, type RefObject } from "react";

/**
 * Apparition progressive des éléments marqués `data-reveal` dans un conteneur.
 *
 * Le contenu reste visible tant que le script n'a pas tourné (SSR, prerender,
 * JS désactivé) : c'est l'effet qui ajoute la classe `ai-anim` responsable de
 * l'état masqué, après avoir marqué comme déjà visibles les éléments présents
 * à l'écran. Aucune animation si l'utilisateur réduit les animations.
 *
 * Aucune mesure synchrone : un premier observateur, sans marge, dit ce qui est
 * déjà à l'écran ; il répond hors du fil de rendu, en une seule fois pour tous
 * les éléments. Lire `getBoundingClientRect` élément par élément juste après
 * le rendu forçait un recalcul de mise en page complet au chargement.
 */
export function useRevealOnScroll(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!targets.length) return;

    // Même garde que pour le découpage des titres : sans hauteur de viewport
    // mesurable, l'état masqué ne serait jamais levé.
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (!viewportHeight) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    const initial = new IntersectionObserver((entries) => {
      initial.disconnect();
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add("is-in");
      }
      root.classList.add("ai-anim");
      for (const el of targets) if (!el.classList.contains("is-in")) observer.observe(el);
    });
    for (const el of targets) initial.observe(el);

    return () => {
      initial.disconnect();
      observer.disconnect();
    };
  }, [containerRef]);
}
