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
 *
 * L'écouteur de défilement ne tourne que lorsque l'élément approche de
 * l'écran : un observateur l'allume et l'éteint. Le reste du temps, aucune
 * mesure n'est faite.
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
    let ecoute = false;
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
    const ecouter = (oui: boolean) => {
      if (oui === ecoute) return;
      ecoute = oui;
      if (oui) {
        window.addEventListener("scroll", planifier, { passive: true });
        window.addEventListener("resize", planifier, { passive: true });
        planifier();
      } else {
        window.removeEventListener("scroll", planifier);
        window.removeEventListener("resize", planifier);
        // Une dernière écriture fixe l'état de sortie (0 au-dessus, 1 en dessous).
        planifier();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ecouter(entry.isIntersecting);
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      if (image) cancelAnimationFrame(image);
    };
  }, [ref]);
}
