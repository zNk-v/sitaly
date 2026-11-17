import { useEffect, useRef, useState } from "react";

/**
 * Pose `.hors-ecran` sur un bloc tant qu'il est hors de l'écran (SITA-31).
 *
 * Cinq animations sans fin tournaient pendant tout le défilement de l'accueil
 * — le liseré du logo, le bandeau des demandes, le curseur qui clignote — y
 * compris quand leur bloc était loin de l'écran (friction 8 de l'état des
 * lieux du 17 novembre 2026). Elles repeignent à chaque image ; sur un
 * téléphone d'entrée de gamme, c'est autant de retard pris par le doigt.
 *
 * Le repère est à l'envers de `useVisible` : ce qui ne porte pas la classe
 * continue d'animer. Un bloc oublié garde donc son allure, il ne se fige pas.
 *
 * Ce hook vit ici, et non dans Vitrine.tsx, parce que Produit.tsx s'en sert
 * aussi et que Vitrine.tsx importe déjà Produit.tsx.
 */
export function useHorsEcran<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [horsEcran, setHorsEcran] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHorsEcran(!e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, classe: horsEcran ? "hors-ecran" : "" };
}
