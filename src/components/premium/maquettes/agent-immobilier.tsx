import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 08 · Agent immobilier · Persienne (marque inventée).
 *
 * Sans photo, un plan coté donne la surface, l'étage et l'orientation :
 * l'acheteur trie sur ces trois chiffres. Les plans des biens remplacent la
 * galerie, avec les pièces nommées et la flèche du nord.
 *
 * Geste (agent-immobilier.css) : la persienne. Dix lames à la couleur du
 * site précédent se ferment sur lui, puis s'ouvrent sur Persienne.
 */

const LAMES = Array.from({ length: 10 }, (_, j) => j);

function Plan({ variante }: { variante: "t3" | "maison" }) {
  return variante === "t3" ? (
    <svg viewBox="0 0 200 120" className="persienne-svg" aria-hidden="true">
      <path className="mur" d="M6 6 H194 V114 H6 Z M98 6 V70 M98 70 H194 M140 70 V114 M6 70 H60" />
      <text x="52" y="40">
        Séjour 28 m²
      </text>
      <text x="146" y="40">
        Chambre 11 m²
      </text>
      <text x="40" y="96">
        Cuisine
      </text>
      <text x="166" y="96">
        Ch. 10 m²
      </text>
      <path className="nord" d="M184 112 l-5 -14 l5 4 l5 -4 z" />
    </svg>
  ) : (
    <svg viewBox="0 0 200 120" className="persienne-svg" aria-hidden="true">
      <rect className="jardin" x="2" y="2" width="196" height="116" rx="3" />
      <path className="mur" d="M30 24 H170 V96 H30 Z M100 24 V96 M30 62 H100" />
      <text x="65" y="46">
        Séjour 34 m²
      </text>
      <text x="135" y="62">
        3 chambres
      </text>
      <text x="65" y="83">
        Cuisine
      </text>
      <text x="100" y="112" className="legende-jardin">
        Jardin 400 m²
      </text>
      <path className="nord" d="M184 18 l-5 -14 l5 4 l5 -4 z" />
    </svg>
  );
}

function Contenu() {
  return (
    <div className="persienne">
      <div className="persienne-site" data-g="">
        <header className="persienne-entete">
          <span className="persienne-logo logo-marque">Persienne</span>
          <nav className="persienne-onglets">
            <span>Acheter</span>
            <span>Louer</span>
            <span data-actif="">Faire estimer</span>
          </nav>
        </header>

        <div className="persienne-tete">
          <p className="persienne-accroche">
            Une estimation signée sous 48 h, plan coté à l'appui.
          </p>
          <span className="persienne-bouton">Faire estimer mon bien</span>
        </div>

        <ul className="persienne-fiches">
          <li>
            <Plan variante="t3" />
            <p className="persienne-type">T3 · 68 m²</p>
            <p className="persienne-details">2e étage · plein sud</p>
            <p className="persienne-prix">289 000 €</p>
          </li>
          <li>
            <Plan variante="maison" />
            <p className="persienne-type">Maison · 112 m²</p>
            <p className="persienne-details">jardin de 400 m²</p>
            <p className="persienne-prix">415 000 €</p>
          </li>
        </ul>
        <p className="persienne-bareme">Barème des honoraires</p>
      </div>

      <div className="persienne-lames" aria-hidden="true">
        {LAMES.map((j) => (
          <span key={j} className="lame" data-g="" style={{ "--j": j } as CSSProperties}>
            <span className="lame-ouverture" data-g="" />
          </span>
        ))}
      </div>
    </div>
  );
}

export const maquette: Maquette = { id: "agent-immobilier", Contenu };
