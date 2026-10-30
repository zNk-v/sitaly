import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 02 · Boulanger · Le Levain du Lavoir (marque inventée).
 *
 * On choisit sa boulangerie sur l'heure de la fournée et le prix de la
 * tradition. L'heure ouvre la page en très grand, l'ardoise du jour la suit,
 * avec ses prix à points de conduite. Trois grignes coiffent le logotype.
 *
 * Couleurs : la brique sert aux grignes, au tampon et à l'heure, jamais au
 * fond d'un bouton. Les boutons sont des `span` : l'écran est inerte.
 * Quarante éléments : les points de conduite et la farine sont des fonds, les
 * retours à la ligne de l'accroche et du tampon passent par `pre-line`.
 *
 * Gestes (styles dans boulanger.css) : le site entre par un volet depuis la
 * droite (premium.css), les lignes de l'ardoise glissent en place, les
 * grignes s'incisent une à une quand le volet découvre le logotype, puis le
 * tampon se pose.
 */

const ARDOISE = [
  ["Tradition", "1,30 €", "La baguette de 6 h 30"],
  ["Seigle", "3,90 €", "Pétri la veille, mie serrée"],
  ["Levain 1 kg", "7,20 €", "Se garde cinq jours"],
  ["Kouign-amann", "2,80 €", "Sort du four à 11 h"],
];

function Contenu() {
  return (
    <div className="levain">
      <header className="levain-entete">
        <span className="levain-marque">
          <span className="levain-grignes">
            {[0, 1, 2].map((j) => (
              <span key={j} data-g="" style={{ "--j": j } as CSSProperties} />
            ))}
          </span>
          <span className="levain-logo logo-marque">Le Levain du Lavoir</span>
        </span>
        <nav className="levain-nav">
          <span>Nos pains</span>
          <span>Le fournil</span>
          <span>Horaires</span>
        </nav>
        <span className="levain-commander">Commander</span>
      </header>

      <div className="levain-corps">
        <div className="levain-heure">
          <p className="levain-surtitre">Boulangerie au levain</p>
          <p className="levain-chiffre">6 h 30</p>
          <p className="levain-accroche">{"Première fournée à 6 h 30,\ndeuxième à 11 h."}</p>
          <p className="levain-horaires">
            Ouvert jusqu'à 19 h 30. <strong>Fermé le mercredi.</strong>
          </p>
          <span className="levain-reserver">Réserver pour samedi</span>
        </div>

        <div className="levain-ardoise">
          <p className="levain-ardoise-titre">L'ardoise du jour</p>
          {ARDOISE.map(([pain, prix, note], j) => (
            <p key={pain} className="levain-ligne" data-g="" style={{ "--j": j } as CSSProperties}>
              <span className="levain-pain">{pain}</span>
              <span className="levain-prix">{prix}</span>
              <span className="levain-note">{note}</span>
            </p>
          ))}
          <span className="levain-tampon" data-g="">
            {"Cuit\nce matin"}
          </span>
        </div>
      </div>
    </div>
  );
}

export const maquette: Maquette = { id: "boulanger", Contenu };
