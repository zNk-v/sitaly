import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 04 · Ostéopathe · L'Axe (marque inventée).
 *
 * Un patient inquiet lit lentement : graisse fine, grands blancs, une seule
 * action, le rendez-vous. En paysage, un axe descend du « l » du logo et
 * porte une colonne de sept vertèbres, des cervicales fines aux lombaires
 * larges. En portrait, la colonne se couche et devient un filet au-dessus du
 * titre.
 *
 * Vocabulaire permis à la profession (consultation, séance), aucune promesse
 * de soin. Les boutons sont des `span` : l'écran est inerte.
 *
 * Gestes (styles dans osteopathe.css) : le site entre en fondu (premium.css).
 * L'axe se trace depuis le logo, puis les vertèbres quittent leur décalage et
 * s'alignent, de haut en bas, entre 0,25 et 0,6 du pas. Les trois lignes et
 * l'action montent ensuite, une à une.
 */

/** Le décalage de départ de chaque vertèbre, en cqi : une courbe en S qui se redresse. */
const VERTEBRES = [0.9, 1.7, 2.2, 1.5, 0.3, -0.8, -1.4];

const piece = (j: number) => ({ "--j": j }) as CSSProperties;

function Contenu() {
  return (
    <div className="axe">
      <header className="axe-entete">
        <span className="axe-logo logo-marque">L'Axe</span>
        <nav className="axe-nav">
          <span>L'approche</span>
          <span>Les séances</span>
          <span>Accès</span>
        </nav>
        <span className="axe-entete-rdv">Rendez-vous</span>
      </header>

      <div className="axe-corps">
        <div className="axe-colonne" data-g="">
          {VERTEBRES.map((d, j) => (
            <span key={j} data-g="" style={{ "--j": j, "--d": d } as CSSProperties} />
          ))}
        </div>

        <div className="axe-texte">
          <p className="axe-surtitre">Cabinet d'ostéopathie</p>
          <p className="axe-titre">
            <span>On commence par vous écouter.</span>{" "}
            <span>La{"\u00a0"}séance dure une heure.</span>
          </p>
          <ul className="axe-lignes">
            <li data-g="" style={piece(0)}>
              <span>Première consultation</span>
              <span className="axe-valeur">60 min, 65 €</span>
            </li>
            <li data-g="" style={piece(1)}>
              Nourrissons, sportifs, femmes enceintes
            </li>
            <li data-g="" style={piece(2)}>
              Cabinet de plain-pied
            </li>
          </ul>
          <div className="axe-action" data-g="" style={piece(3)}>
            <span className="axe-bouton">Prendre rendez-vous</span>
            <p className="axe-mention">
              Séance non remboursée par l'Assurance maladie, prise en charge possible par votre
              mutuelle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const maquette: Maquette = { id: "osteopathe", Contenu };
