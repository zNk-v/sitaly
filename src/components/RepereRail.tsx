import { useEffect, useState, type RefObject } from "react";

/**
 * Le repère de position sous un rail de cartes, sur téléphone (SITA-31).
 *
 * Le bord de la carte suivante dit qu'il y a une suite, mais pas combien :
 * demande de Ted du 17 novembre, « un repère visible de position (points ou
 * 1/3) sous le rail, en plus du bord de la carte suivante ».
 *
 * Il est rendu par le serveur sur la première carte, donc rien ne saute à
 * l'hydratation. Sous 640 px seulement : au-delà, la grille reprend ses
 * colonnes et le repère n'a plus de sens (`sm:hidden`).
 *
 * Décoratif pour un lecteur d'écran : les cartes se lisent dans l'ordre du
 * document, et annoncer « 2 sur 3 » à chaque pixel de défilement gênerait plus
 * qu'il n'aiderait.
 */
export function RepereRail({
  rail,
  total,
}: {
  rail: RefObject<HTMLDivElement | null>;
  total: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;

    /** La carte dont le centre est le plus près du centre du rail. */
    const calculer = () => {
      const centre = element.scrollLeft + element.clientWidth / 2;
      let proche = 0;
      let ecartMin = Infinity;
      for (const [rang, carte] of [...element.children].entries()) {
        const { offsetLeft, offsetWidth } = carte as HTMLElement;
        const ecart = Math.abs(offsetLeft + offsetWidth / 2 - centre);
        if (ecart < ecartMin) {
          ecartMin = ecart;
          proche = rang;
        }
      }
      setIndex(proche);
    };

    /** Un calcul par image : le doigt produit des dizaines d'événements. */
    let demande = 0;
    const auDefilement = () => {
      if (demande) return;
      demande = requestAnimationFrame(() => {
        demande = 0;
        calculer();
      });
    };

    calculer();
    element.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement);
    return () => {
      if (demande) cancelAnimationFrame(demande);
      element.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
    };
  }, [rail]);

  return (
    <div className="mt-4 flex items-center justify-center gap-2.5 sm:hidden" aria-hidden="true">
      <span className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, rang) => (
          <span
            key={rang}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              rang === index ? "w-5 bg-brand-ink" : "w-1.5 bg-black/20"
            }`}
          />
        ))}
      </span>
      <span className="text-xs font-medium text-black/45 tabular-nums">
        {index + 1}/{total}
      </span>
    </div>
  );
}
