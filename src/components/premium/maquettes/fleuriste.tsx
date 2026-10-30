import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 10 · Fleuriste · Herbier (marque inventée).
 *
 * On commande des fleurs au dernier moment : l'heure limite de livraison
 * suit le bouquet de la semaine, en haut de page. Le décor est une planche
 * d'herbier, trois tiges d'un seul trait et une étiquette à double filet.
 *
 * Gestes (fleuriste.css) : les tiges poussent l'une après l'autre,
 * l'étiquette se pose.
 */

const TIGES = [
  "M60 300 C58 240 70 190 62 130 C58 100 64 80 60 60",
  "M120 300 C124 250 112 200 122 150 C128 120 118 100 124 80",
  "M180 300 C176 260 190 220 182 170 C178 140 186 120 180 100",
];

function Contenu() {
  return (
    <div className="herbier">
      <div className="herbier-bandeau">
        Livré le jour même pour toute commande passée avant 14 h
      </div>
      <header className="herbier-entete">
        <span className="herbier-logo logo-marque">Herbier</span>
        <nav className="herbier-nav">
          <span>Bouquets</span>
          <span>Mariages</span>
          <span>Abonnement</span>
        </nav>
        <span className="herbier-panier">Panier · 0</span>
      </header>

      <div className="herbier-planche">
        <svg className="herbier-tiges" viewBox="0 0 240 310" aria-hidden="true">
          {TIGES.map((d, j) => (
            <g key={d} className="tige" data-g="" style={{ "--j": j } as CSSProperties}>
              <path className="trait" d={d} />
              <path
                className="feuille"
                d={`M${62 + j * 60} ${210 - j * 10} q-26 -8 -34 -30 q26 4 34 30 z`}
              />
              <circle className="fleur" cx={[60, 124, 180][j]} cy={[52, 72, 92][j]} r="15" />
              <circle className="coeur" cx={[60, 124, 180][j]} cy={[52, 72, 92][j]} r="5" />
            </g>
          ))}
        </svg>
        <div className="herbier-etiquette" data-g="">
          <p>
            <span>Espèce</span> <em>Ranunculus asiaticus</em>
          </p>
          <p>
            <span>Cueillie le</span> mardi
          </p>
          <p>
            <span>Lieu</span> jardin de la boutique
          </p>
        </div>
      </div>

      <div className="herbier-offre">
        <p className="herbier-latin">Ranunculus asiaticus · Eucalyptus gunnii</p>
        <p className="herbier-accroche">Le bouquet de la semaine : renoncules et eucalyptus.</p>
        <ul className="herbier-tailles">
          {[
            ["S", "35 €"],
            ["M", "55 €"],
            ["L", "80 €"],
          ].map(([t, p]) => (
            <li key={t} data-choisi={t === "M" ? "" : undefined}>
              <span className="herbier-taille">{t}</span>
              <span className="herbier-prix">{p}</span>
            </li>
          ))}
        </ul>
        <span className="herbier-bouton">Commander</span>
      </div>
    </div>
  );
}

export const maquette: Maquette = { id: "fleuriste", Contenu };
