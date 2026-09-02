import { useEffect, useRef, useState } from "react";

/**
 * Mot qui se remplace en boucle, procédé repris de linov.fr.
 *
 * Trois précautions qui font la différence entre un gadget et un détail soigné :
 *
 * - La largeur est réservée par le mot le plus long, rendu invisible sous le
 *   mot courant. Sans ça, la ligne se réajuste à chaque changement et fait
 *   sauter tout ce qui suit.
 * - Le cycle s'arrête quand l'onglet passe en arrière-plan : un `setInterval`
 *   qui tourne dans un onglet caché consomme sans que personne ne regarde.
 * - Sous `prefers-reduced-motion`, le premier mot s'affiche et ne bouge plus.
 *   La phrase reste grammaticalement complète dans tous les cas.
 */
export function RotatingWords({
  words,
  interval = 2200,
  className = "",
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [anime, setAnime] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnime(true);

    const demarrer = () => {
      if (timer.current) return;
      timer.current = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    };
    const arreter = () => {
      if (!timer.current) return;
      clearInterval(timer.current);
      timer.current = null;
    };
    const surVisibilite = () => (document.hidden ? arreter() : demarrer());

    demarrer();
    document.addEventListener("visibilitychange", surVisibilite);
    return () => {
      arreter();
      document.removeEventListener("visibilitychange", surVisibilite);
    };
  }, [words, interval]);

  const plusLong = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      {/* Gabarit invisible : il fixe la largeur et la hauteur de la boîte. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {plusLong}
      </span>
      <span
        key={index}
        className={`col-start-1 row-start-1 whitespace-nowrap ${anime ? "word-swap" : ""}`}
      >
        {words[index]}
      </span>
    </span>
  );
}
