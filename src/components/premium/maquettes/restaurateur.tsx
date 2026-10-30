import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 05 · Restaurateur · Sarment (marque inventée).
 *
 * La carte du jour remplace la galerie photo, et l'on réserve sa table sans
 * quitter le premier écran. Le site se compose comme une affiche de bistrot :
 * le nom en serif italique géant, rogné par le bord droit, un sarment doré
 * tracé d'un seul trait dessous, la carte dans un double filet d'or.
 *
 * Les boutons sont des `span` : l'écran est inerte.
 *
 * Gestes (styles dans restaurateur.css) : le site entre par un volet du haut
 * (premium.css). Le nom glisse de la droite sur la première moitié du pas et
 * finit rogné, le sarment le suit, les trois plats montent un à un, puis
 * l'accroche paraît dans le creux que le nom lui laisse.
 */

const CARTE = [
  ["Entrée", "Velouté de potimarron, noisettes"],
  ["Plat", "Joue de bœuf, carottes au cumin"],
  ["Dessert", "Poire pochée au vin rouge"],
];

/**
 * Le sarment, d'un seul trait : il entre par la gauche, laisse pendre deux
 * vrilles et sort par la droite. Une unité vaut 0,1cqi en paysage.
 */
const SARMENT =
  "M-10 24C0 23.3 31.7 20 50 20C68.3 20 85.8 21.7 100 24C114.2 26.3 125 28.3 135 34C145 39.7 156.2 49.3 160 58C163.8 66.7 162 79.7 158 86C154 92.3 143.3 96.3 136 96C128.7 95.7 117.3 90.3 114 84C110.7 77.7 111.3 66 116 58C120.7 50 129.7 41.7 142 36C154.3 30.3 173.7 26.7 190 24C206.3 21.3 227 19.7 240 20C253 20.3 260 22 268 26C276 30 284.3 37.7 288 44C291.7 50.3 292.3 59.3 290 64C287.7 68.7 279 72.7 274 72C269 71.3 261.3 65.3 260 60C258.7 54.7 260 45.7 266 40C272 34.3 282 29.2 296 26C310 22.8 324.3 21.2 350 21C375.7 20.8 415 25.3 450 25C485 24.7 520 19.3 560 19C600 18.7 646.7 23.2 690 23C733.3 22.8 778.3 18.2 820 18C861.7 17.8 901.7 21.8 940 22C978.3 22.2 1031.7 19.5 1050 19";

function Contenu() {
  return (
    <div className="sarment">
      <header className="sarment-entete">
        <span className="sarment-genre">Bistrot · cave à manger</span>
        <nav className="sarment-nav">
          <span>La carte</span>
          <span>Les vins</span>
          <span>Horaires</span>
        </nav>
        <span className="sarment-entete-resa">Réserver</span>
        <span className="sarment-burger" />
      </header>

      <p className="sarment-nom logo-marque" data-g="">
        <span>Sar</span>
        <span>ment</span>
      </p>

      <svg className="sarment-rameau" data-g="" viewBox="0 0 1040 120">
        <path d={SARMENT} />
      </svg>

      <p className="sarment-accroche" data-g="">
        <span>La carte change chaque mardi.</span> <span>La cuisine ferme à 22&nbsp;h.</span>
      </p>

      <div className="sarment-carte">
        <p className="sarment-carte-titre">La carte du jour</p>
        <ul className="sarment-plats">
          {CARTE.map(([rubrique, plat], j) => (
            <li key={rubrique} data-g="" style={{ "--j": j } as CSSProperties}>
              <span className="sarment-rubrique">{rubrique}</span>
              <span className="sarment-plat">{plat}</span>
            </li>
          ))}
        </ul>
        <p className="sarment-prix">
          Entrée, plat, dessert&nbsp;: <span>32&nbsp;€</span>
        </p>
      </div>

      <div className="sarment-resa">
        <span className="sarment-quand">Ce soir, 20&nbsp;h</span>
        <span className="sarment-couverts-libelle">Couverts</span>
        <span className="sarment-couverts">
          <span data-choisi="">2</span>
          <span>4</span>
          <span>6</span>
        </span>
        <span className="sarment-reserver">Réserver une table</span>
      </div>
    </div>
  );
}

export const maquette: Maquette = { id: "restaurateur", Contenu };
