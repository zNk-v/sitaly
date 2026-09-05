import { useEffect, type RefObject } from "react";

/**
 * Écrit `--progression`, de 0 à 1, à mesure que l'élément traverse la fenêtre.
 *
 * `animation-timeline: view()` ferait ce travail sans script, mais elle n'existe
 * pas avant Safari 26 : sur iPhone, aucun navigateur ne la supporte, pas même
 * Chrome, qui roule sur WebKit. La même leçon que pour l'ouverture du hero.
 *
 * La course va du moment où le haut de l'élément atteint 80 % de la fenêtre à
 * celui où son bas en atteint 35 % : le faisceau démarre quand la première
 * étape entre et finit quand la dernière est lue, plutôt qu'aux bords exacts,
 * où il resterait vide puis se remplirait d'un coup.
 */
export function useProgressionAuDefilement(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--progression", "1");
      return;
    }

    let image = 0;
    const ecrire = () => {
      image = 0;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight || document.documentElement.clientHeight;
      if (!h) return;
      const debut = h * 0.8;
      const fin = h * 0.35;
      const course = r.height + debut - fin;
      const p = course > 0 ? (debut - r.top) / course : 0;
      el.style.setProperty("--progression", String(Math.min(1, Math.max(0, p))));
    };
    const planifier = () => {
      if (!image) image = requestAnimationFrame(ecrire);
    };

    ecrire();
    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier, { passive: true });
    return () => {
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      if (image) cancelAnimationFrame(image);
    };
  }, [ref]);
}
