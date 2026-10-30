import type { Maquette } from "@/components/premium/registre";

/**
 * 06 · Menuisier · Atelier Tenon (marque inventée).
 *
 * Un menuisier vend des mesures justes : l'élévation cotée d'un placard sert
 * de décor et de preuve, sur un papier millimétré. Les cotes sont en
 * millimètres, comme sur un vrai plan d'atelier.
 *
 * Gestes (menuisier.css) : les lignes de cote se tracent depuis leur centre,
 * puis les chiffres apparaissent.
 */
function Contenu() {
  return (
    <div className="tenon">
      <header className="tenon-entete">
        <span className="tenon-logo logo-marque">Atelier Tenon</span>
        <nav className="tenon-nav">
          <span>Cuisines</span>
          <span>Escaliers</span>
          <span>Placards</span>
        </nav>
        <span className="tenon-cta">Demander un métré</span>
      </header>

      <div className="tenon-texte">
        <p className="tenon-sur">Menuiserie sur mesure · bois massif</p>
        <p className="tenon-accroche">Cuisines, escaliers et placards, dessinés au millimètre.</p>
        <ul className="tenon-engagements">
          <li>
            <span className="tenon-num">01</span>Métré chez vous sous 10 jours
          </li>
          <li>
            <span className="tenon-num">02</span>Bois massif, fabriqué à l'atelier
          </li>
          <li>
            <span className="tenon-num">03</span>Pose comprise
          </li>
        </ul>
        <span className="tenon-bouton">Demander un métré</span>
      </div>

      <figure className="tenon-plan">
        <svg viewBox="0 0 320 290" aria-hidden="true">
          {/* Le placard : caisson, plinthe, tiroirs en partie haute, trois portes. */}
          <rect className="trait" x="40" y="30" width="210" height="220" />
          <line className="trait" x1="40" y1="236" x2="250" y2="236" />
          <line className="trait" x1="40" y1="85" x2="250" y2="85" />
          <line className="trait" x1="145" y1="30" x2="145" y2="85" />
          <line className="trait" x1="110" y1="85" x2="110" y2="236" />
          <line className="trait" x1="180" y1="85" x2="180" y2="236" />
          <path
            className="trait fin"
            d="M100 150 v22 M120 150 v22 M190 150 v22 M86 52 h18 M186 52 h18"
          />
          {/* Cotes : largeur en bas, hauteur à droite, tiroirs en haut. */}
          <g className="cote" data-g="">
            <path d="M40 268 H250 M40 262 v12 M250 262 v12 M40 268 l8 -4 v8 z M250 268 l-8 -4 v8 z" />
          </g>
          <g className="cote cote-v" data-g="">
            <path d="M285 30 V250 M279 30 h12 M279 250 h12 M285 30 l-4 8 h8 z M285 250 l-4 -8 h8 z" />
          </g>
          <g className="cote cote-h2" data-g="">
            <path d="M40 14 H145 M40 8 v12 M145 8 v12 M40 14 l8 -4 v8 z M145 14 l-8 -4 v8 z" />
          </g>
          <text className="chiffre" data-g="" x="145" y="284">
            900
          </text>
          <text className="chiffre chiffre-v" data-g="" x="303" y="145">
            2 400
          </text>
          <text className="chiffre" data-g="" x="92" y="10">
            600
          </text>
        </svg>
        <figcaption>Placard d'entrée, chêne massif · échelle 1:20</figcaption>
      </figure>
    </div>
  );
}

export const maquette: Maquette = { id: "menuisier", Contenu };
