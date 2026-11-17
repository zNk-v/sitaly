import { useEffect, useState, type ReactNode } from "react";
import { useVisible } from "@/components/produit/Vitrine";

/**
 * Une section qui monte en douceur quand elle entre à l'écran (SITA-31).
 *
 * L'accueil avait ses blocs animés depuis le 30 octobre 2026 ; /tarifs/, les
 * pages métier et les deux guides défilaient d'un bloc, sans rien pour marquer
 * le passage d'une idée à la suivante (friction 6 de l'état des lieux).
 *
 * Le masquage n'est posé qu'après le montage : sans JavaScript, ou si
 * l'hydratation échoue, la page reste lisible telle que le serveur l'a rendue.
 * La première section, déjà à l'écran, est déclarée visible par
 * l'IntersectionObserver dès qu'il l'observe : elle n'est donc jamais masquée,
 * et rien ne retarde la lecture à l'arrivée.
 *
 * 250 ms, 12 px : le mouvement se remarque sans se faire attendre. Avec
 * « réduire les animations », il n'y en a aucun (voir styles.css).
 */
export function Apparition({ children }: { children: ReactNode }) {
  const { ref, visible } = useVisible<HTMLDivElement>(0.08);
  const [pret, setPret] = useState(false);
  useEffect(() => setPret(true), []);
  return (
    <div ref={ref} className={`apparition ${pret && !visible ? "apparition-cachee" : ""}`}>
      {children}
    </div>
  );
}
