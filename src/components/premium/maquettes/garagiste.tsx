import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 03 · Garagiste · Garage Bielle (marque inventée).
 *
 * Au garage, le client veut un prix et une heure de retour : chaque
 * prestation tient sur une ligne, avec sa durée et son prix. Le compte-tours
 * tient lieu de photo, et son afficheur donne l'heure de retour.
 *
 * Le cadran compte 9 graduations chiffrées (de 0 à 8) : la maquette dépasse
 * les 40 nœuds pour elles. Les boutons sont des `span` : l'écran est inerte.
 *
 * Gestes (styles dans garagiste.css) : le site entre par un volet en
 * diagonale (premium.css), l'aiguille monte de -130° à -20° entre 0,1 et
 * 0,9 du pas, les prestations montent à l'entrée et la bande de pied glisse
 * de 2rem vers la gauche.
 */

/** Nom, durée, prix. Une espace insécable lie chaque nombre à son unité. */
const PRESTATIONS = [
  ["Vidange", "45 min", "dès 89 €"],
  ["Plaquettes", "1 h 30", "dès 140 €"],
  ["Pré-contrôle technique", "20 min", "offert"],
];

/** Les créneaux libres de la semaine, du lundi au vendredi. */
const SEMAINE: { jour: string; libres: number; etat?: "complet" | "choisi" }[] = [
  { jour: "L", libres: 2 },
  { jour: "M", libres: 0, etat: "complet" },
  { jour: "M", libres: 3, etat: "choisi" },
  { jour: "J", libres: 1 },
  { jour: "V", libres: 4 },
];

/* Le cadran : un arc de 240°, de 0 à 8 (30° par millier de tours), centré
   sur l'origine du viewBox. L'angle se compte depuis le haut, en sens
   horaire : 0 à -120°, 4 en haut, 8 à +120°. */
const point = (v: number, r: number) => {
  const a = ((-120 + 30 * v) * Math.PI) / 180;
  return `${(r * Math.sin(a)).toFixed(2)} ${(-r * Math.cos(a)).toFixed(2)}`;
};
const arc = (v0: number, v1: number, r: number) =>
  `M${point(v0, r)}A${r} ${r} 0 ${(v1 - v0) * 30 > 180 ? 1 : 0} 1 ${point(v1, r)}`;
const traits = (valeurs: number[], r0: number, r1: number) =>
  valeurs.map((v) => `M${point(v, r0)}L${point(v, r1)}`).join("");

const CHIFFRES = Array.from({ length: 9 }, (_, v) => v);
const PISTE = arc(0, 8, 88);
const ZONE = arc(6.5, 8, 93);
const MAJEURES = traits(CHIFFRES, 88, 75);
const MINEURES = traits(
  Array.from({ length: 32 }, (_, i) => (i + 1) / 4).filter((v) => v % 1 !== 0),
  88,
  82,
);

function Contenu() {
  return (
    <div className="bielle">
      <header className="bielle-entete">
        <span className="bielle-logo logo-marque">Garage Bielle</span>
        <nav className="bielle-nav">
          <span>Entretien</span>
          <span>Réparations</span>
          <span>L'atelier</span>
        </nav>
        <span className="bielle-rdv">Rendez-vous</span>
      </header>

      <div className="bielle-texte">
        <p className="bielle-sur">Mécanique toutes marques</p>
        <p className="bielle-titre">
          <span>
            Déposez-la à&nbsp;<em>8&nbsp;h</em>,
          </span>{" "}
          <span>
            reprenez-la à&nbsp;<em>18&nbsp;h</em>.
          </span>
        </p>

        <ul className="bielle-liste">
          {PRESTATIONS.map(([nom, duree, prix], j) => (
            <li
              key={nom}
              data-g=""
              data-offert={prix === "offert" ? "" : undefined}
              style={{ "--j": j } as CSSProperties}
            >
              {nom}
              <span className="bielle-duree">{duree}</span>
              <span className="bielle-prix">{prix}</span>
            </li>
          ))}
        </ul>

        <div className="bielle-resa">
          <p className="bielle-resa-titre">Créneaux libres cette semaine</p>
          <ul className="bielle-semaine">
            {SEMAINE.map(({ jour, libres, etat }, j) => (
              <li key={j} data-n={libres} data-etat={etat}>
                {jour}
              </li>
            ))}
          </ul>
          <span className="bielle-bouton">Choisir un créneau</span>
        </div>
      </div>

      <div className="bielle-cadran">
        <svg viewBox="-100 -100 200 200">
          <path className="bielle-piste" d={PISTE} />
          <path className="bielle-zone" d={ZONE} />
          <path className="bielle-mineures" d={MINEURES} />
          <path className="bielle-majeures" d={MAJEURES} />
          {CHIFFRES.map((v) => {
            const [x, y] = point(v, 62).split(" ");
            return (
              <text key={v} x={x} y={y} data-rouge={v > 6 ? "" : undefined}>
                {v}
              </text>
            );
          })}

          <path className="bielle-aiguille" data-g="" d="M-2.6 15L2.6 15L0.9 -80L-0.9 -80Z" />
        </svg>
        <span className="bielle-unite">{"tr/min\n× 1000"}</span>
        <span className="bielle-afficheur">
          <span>Retour</span> 18:00
        </span>
      </div>

      <div className="bielle-bande" data-g="" />
    </div>
  );
}

export const maquette: Maquette = { id: "garagiste", Contenu };
