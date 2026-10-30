import type { ComponentType } from "react";
import type { Vitrine, VitrineId } from "@/data/premium";

/**
 * Le registre des maquettes de /site-premium/. Chaque fichier
 * `maquettes/<id>.tsx` exporte `maquette` ; sa feuille `maquettes/<id>.css`
 * est importée par src/premium.css.
 *
 * Une maquette est un site inventé, écrit en HTML, CSS et SVG, sans image.
 * Elle reçoit sa vitrine (palette, marque, accroche) et rend le contenu de
 * l'écran. Ses boutons sont des `span` : rien n'y est focalisable, l'écran est
 * `inert` et `aria-hidden` (la légende de la figure le décrit).
 *
 * Tant qu'une maquette manque, l'écran affiche une ébauche : la marque et
 * l'accroche sur sa palette. La page reste construisible pendant le travail.
 */
export interface Maquette {
  id: VitrineId;
  Contenu: ComponentType<{ v: Vitrine }>;
}

const modules = import.meta.glob<{ maquette: Maquette }>("./maquettes/*.tsx", { eager: true });

const REGISTRE = new Map<VitrineId, Maquette>(
  Object.values(modules).map((m) => [m.maquette.id, m.maquette]),
);

function Ebauche({ v }: { v: Vitrine }) {
  return (
    <div className="ebauche">
      <p className="ebauche-marque">{v.marque}</p>
      <p className="ebauche-accroche">{v.accroche}</p>
    </div>
  );
}

export function contenuDe(id: VitrineId): ComponentType<{ v: Vitrine }> {
  return REGISTRE.get(id)?.Contenu ?? Ebauche;
}
