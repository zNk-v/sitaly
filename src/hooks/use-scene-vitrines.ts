import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { MEDIA_EFFET, SCENE } from "@/data/premium";
import { suivreEvenement } from "@/lib/mesure";

/**
 * Le pilote de la scène de /site-premium/ : un cadre collé, des sites
 * empilés, un par métier, qui entrent l'un après l'autre au défilement.
 *
 * Il n'écrit qu'une variable par site, `--t`, son temps local en « pas » :
 * 0 au début de son entrée, 0,35 à la fin du volet, 1 à la fin de sa tenue,
 * 1,35 quand le suivant l'a recouvert. Tout le reste se calcule en CSS à
 * partir de `--t` (premium.css et la feuille de chaque maquette) : volets,
 * sortie, gestes des pièces. `animation-timeline` aurait fait ce travail sans
 * script, mais elle n'existe pas sur iPhone avant iOS 26 (voir ZoomIntro).
 *
 * Les mesures sont prises au montage et au redimensionnement ; à chaque
 * image, le défilement ne fait que calculer et écrire, sans relire la mise en
 * page. Une valeur n'est écrite que si elle change : les sites hors de
 * l'écran gardent leur valeur bornée et ne coûtent rien.
 *
 * Mode effet. La classe `premium-effet` sur <html> rend la scène collée. Le
 * script en tête de page la pose avant le premier affichage ; ce hook la pose
 * aussi pour une arrivée par le menu, la retire au démontage et suit la
 * requête média. Sans elle, la page est une galerie lisible sans script.
 */

const SORTIE = 1 + SCENE.transition;

/** Mesures de la traversée, lues par la section « La bascule ». */
export interface MesuresScene {
  debut: number | null;
  fin: number | null;
  vus: number;
}
let mesures: MesuresScene = { debut: null, fin: null, vus: 0 };
const abonnes = new Set<() => void>();
export const storeMesures = {
  lire: () => mesures,
  abonner(f: () => void) {
    abonnes.add(f);
    return () => abonnes.delete(f);
  },
  ecrire(m: Partial<MesuresScene>) {
    mesures = { ...mesures, ...m };
    abonnes.forEach((f) => f());
  },
};

declare global {
  interface Window {
    __premiumScene?: boolean;
  }
}

const borne = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function useSceneVitrines(sceneRef: RefObject<HTMLElement | null>, n: number) {
  const [actif, setActif] = useState(0);
  const [effet, setEffet] = useState(false);
  const allerRef = useRef<(i: number, doux?: boolean) => void>(() => {});

  /* La classe avant le premier affichage, pour une arrivée par le menu. */
  useLayoutEffect(() => {
    const media = matchMedia(MEDIA_EFFET);
    const appliquer = () => {
      document.documentElement.classList.toggle("premium-effet", media.matches);
      setEffet(media.matches);
    };
    appliquer();
    window.__premiumScene = true;
    media.addEventListener("change", appliquer);
    return () => {
      media.removeEventListener("change", appliquer);
      document.documentElement.classList.remove("premium-effet");
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const vitrines = Array.from(scene.querySelectorAll<HTMLElement>(".vitrine"));
    const cadre = scene.querySelector<HTMLElement>(".scene-cadre");
    const pin = scene.querySelector<HTMLElement>(".premium-pin");
    if (!effet || !pin || vitrines.length !== n) {
      /* Galerie : chaque site à son état final, aucun calque réservé. */
      for (const v of vitrines) {
        v.style.removeProperty("--t");
        v.removeAttribute("data-proche");
        v.setAttribute("data-vu", "");
      }
      allerRef.current = () => {};
      return;
    }

    const large = matchMedia("(min-width: 1024px)");
    let E = 0;
    let R = 1;
    let haut = 0;
    let reglage: (typeof SCENE)["large"] | (typeof SCENE)["etroit"] = SCENE.large;
    const ecrits = new Array<number>(n).fill(Number.NaN);
    let actifCourant = -1;
    let image = 0;
    let largeur = 0;

    const mesurer = () => {
      E = parseFloat(getComputedStyle(pin).top) || 0;
      R = pin.offsetHeight + E;
      haut = scene.getBoundingClientRect().top + window.scrollY;
      reglage = large.matches ? SCENE.large : SCENE.etroit;
      largeur = window.innerWidth;
    };

    /** Le défilement depuis le collage du cadre, en pixels. */
    const course = () => window.scrollY - haut + E;

    const ecrire = () => {
      image = 0;
      const d = course();
      const lead = reglage.lead * R;
      const T = (d - lead) / (reglage.pas * R);
      let charge = 1;

      for (let k = 0; k < n; k++) {
        /* Le premier site est déjà en place au chargement : pendant la pose,
           son temps va de la fin du volet (0,35) à la fin de la tenue (1). */
        let t =
          k === 0
            ? d < lead
              ? SCENE.transition + (1 - SCENE.transition) * borne(d / Math.max(lead, 1), 0, 1)
              : 1 + T
            : T - (k - 1);
        t = borne(t, 0, k === n - 1 ? 1 : SORTIE);
        if (Math.abs(t - ecrits[k]) > 0.0005 || Number.isNaN(ecrits[k])) {
          ecrits[k] = t;
          const v = vitrines[k];
          v.style.setProperty("--t", t.toFixed(4));
          const vu = k === 0 ? t < SORTIE : t > 0 && t < SORTIE;
          v.toggleAttribute("data-vu", vu || (k === n - 1 && t > 0));
        }
        if (k > 0 && t > 0 && t < SCENE.transition) charge = t / SCENE.transition;
      }
      cadre?.style.setProperty("--charge", charge.toFixed(3));

      const k =
        T < SCENE.transition / 2 ? 0 : borne(Math.floor(T - SCENE.transition / 2) + 1, 0, n - 1);
      if (k !== actifCourant) {
        actifCourant = k;
        setActif(k);
        vitrines.forEach((v, i) => v.toggleAttribute("data-proche", Math.abs(i - k) <= 1));
        const m = storeMesures.lire();
        if (k > 0 && m.debut === null) storeMesures.ecrire({ debut: performance.now() });
        if (k + 1 > m.vus) storeMesures.ecrire({ vus: k + 1 });
      }
      if (
        T > n - 1 + 0.5 &&
        storeMesures.lire().fin === null &&
        storeMesures.lire().debut !== null
      ) {
        storeMesures.ecrire({ fin: performance.now() });
        suivreEvenement("premium_scene_fin", { metiers: n });
      }
    };
    const planifier = () => {
      if (!image) image = requestAnimationFrame(ecrire);
    };
    const redimensionner = () => {
      /* La barre d'adresse d'iPhone change la hauteur en cours de défilement :
         seule une vraie variation de largeur justifie de tout remesurer. */
      if (window.innerWidth === largeur && R > 1) return planifier();
      mesurer();
      ecrits.fill(Number.NaN);
      planifier();
    };

    /** Mène au milieu de la tenue du métier i, pas au milieu de son volet. */
    allerRef.current = (i: number, doux = true) => {
      const lead = reglage.lead * R;
      const cible = i === 0 ? lead * 0.5 : lead + (i - 0.45) * reglage.pas * R;
      const ecart = Math.abs(i - Math.max(actifCourant, 0));
      window.scrollTo({ top: haut - E + cible, behavior: doux && ecart <= 2 ? "smooth" : "auto" });
    };

    let ecoute = false;
    const ecouter = (oui: boolean) => {
      if (oui === ecoute) return;
      ecoute = oui;
      if (oui) {
        window.addEventListener("scroll", planifier, { passive: true });
        planifier();
      } else {
        window.removeEventListener("scroll", planifier);
        planifier();
      }
    };
    const observateur = new IntersectionObserver((e) => ecouter(e[0].isIntersecting), {
      rootMargin: "25% 0px 25% 0px",
    });

    let annule = false;
    document.fonts.ready.then(() => {
      if (annule) return;
      mesurer();
      ecrire();
      observateur.observe(scene);
      window.addEventListener("resize", redimensionner, { passive: true });
      large.addEventListener("change", redimensionner);
      /* Une ancre #metier-… dans l'adresse : on y va une fois la scène mesurée. */
      const id = decodeURIComponent(location.hash.slice(1));
      const i = vitrines.findIndex((v) => v.id === id);
      if (i >= 0) allerRef.current(i, false);
    });

    return () => {
      annule = true;
      observateur.disconnect();
      ecouter(false);
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", redimensionner);
      large.removeEventListener("change", redimensionner);
      if (image) cancelAnimationFrame(image);
    };
  }, [effet, n, sceneRef]);

  /* Les liens #metier-… (index, mosaïque, liste des métiers) mènent au palier
     de lecture du métier en mode effet. En galerie, l'ancre native suffit. */
  useEffect(() => {
    if (!effet) return;
    const scene = sceneRef.current;
    const clic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#metier-"]');
      if (!a || !scene) return;
      const id = a.getAttribute("href")!.slice(1);
      const i = Array.from(scene.querySelectorAll(".vitrine")).findIndex((v) => v.id === id);
      if (i < 0) return;
      e.preventDefault();
      allerRef.current(i);
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", clic);
    return () => document.removeEventListener("click", clic);
  }, [effet, sceneRef]);

  const aller = useCallback((i: number) => allerRef.current(i), []);
  return { actif, effet, aller };
}
