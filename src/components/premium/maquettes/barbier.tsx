import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 07 · Barbier · Fondu (marque inventée).
 *
 * Un salon vend des créneaux : l'agenda du jour ouvre le site, avec la durée
 * et le prix de chaque prestation à côté. L'enseigne de barbier, une colonne
 * de verre à rayures rouge, crème et bleu entre deux bagues de laiton, tient
 * lieu de photo.
 *
 * Les boutons sont des `span` : l'écran est inerte.
 *
 * Gestes (styles dans barbier.css) : les créneaux tombent un par un pendant
 * l'entrée, la bande de l'enseigne monte avec le défilement.
 */

const CRENEAUX: { heure: string; etat?: "choisi" | "pris" }[] = [
  { heure: "10:00" },
  { heure: "10:45", etat: "choisi" },
  { heure: "14:30", etat: "pris" },
  { heure: "17:15" },
];

const CARTE = [
  ["Coupe", "30 min", "25 €"],
  ["Barbe", "20 min", "18 €"],
  ["Coupe et barbe", "45 min", "38 €"],
];

function Contenu() {
  return (
    <div className="fondu">
      <header className="fondu-entete">
        <span className="fondu-logo logo-marque">Fondu</span>
        <nav className="fondu-nav">
          <span>Prestations</span>
          <span>Le salon</span>
          <span>Horaires</span>
        </nav>
        <span className="fondu-cta">Réserver</span>
      </header>

      <div className="fondu-enseigne">
        <div className="fondu-vitre">
          <div className="fondu-bande" data-g="" />
        </div>
      </div>

      <div className="fondu-texte">
        <p className="fondu-sur">Barbier · du mardi au samedi</p>
        <p className="fondu-accroche">
          Trois fauteuils, <span>sans attente</span>
          {" "}: réservez le vôtre.
        </p>
        <p className="fondu-sous">
          Dégradé à blanc, taille aux ciseaux, barbe à la serviette chaude.
        </p>
      </div>

      <div className="fondu-resa">
        <p className="fondu-jour">
          Aujourd'hui <span>3 créneaux libres</span>
        </p>
        <ul className="fondu-creneaux">
          {CRENEAUX.map(({ heure, etat }, j) => (
            <li key={heure} data-g="" data-etat={etat} style={{ "--j": j } as CSSProperties}>
              {etat === "pris" ? (
                <>
                  <s>{heure}</s>
                  <span>pris</span>
                </>
              ) : (
                heure
              )}
            </li>
          ))}
        </ul>
        <ul className="fondu-carte">
          {CARTE.map(([nom, duree, prix]) => (
            <li key={nom}>
              {nom}
              <span>{duree}</span>
              <span>{prix}</span>
            </li>
          ))}
        </ul>
        <span className="fondu-reserver">Réserver mon fauteuil</span>
      </div>
    </div>
  );
}

export const maquette: Maquette = { id: "barbier", Contenu };
