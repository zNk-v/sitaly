import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 12 · Propreté · Escouade (marque inventée).
 *
 * Un gestionnaire de bureaux achète une régularité : le site affiche l'heure
 * du passage et le rapport du lendemain, une liste cochée et un calculateur.
 * Citron en fond seulement, jamais en texte (1,2:1 sur le fond).
 *
 * Gestes (proprete.css) : la raclette. Une bande citron suit le bord du
 * volet, puis s'efface ; les coches se posent l'une après l'autre.
 */

const TACHES = ["Sols", "Sanitaires", "Corbeilles", "Vitres, une fois par mois"];

function Contenu() {
  return (
    <div className="escouade">
      <div className="escouade-bandeau">Passage chaque soir à 19 h, rapport photo à 8 h</div>
      <header className="escouade-entete">
        <span className="escouade-logo logo-marque">escouade</span>
        <nav className="escouade-nav">
          <span>bureaux</span>
          <span>commerces</span>
          <span>copropriétés</span>
        </nav>
      </header>

      <div className="escouade-texte">
        <p className="escouade-accroche">
          Vos bureaux propres à 8 h, le rapport dans votre boîte à 8 h 05.
        </p>
        <ul className="escouade-liste">
          {TACHES.map((t, j) => (
            <li key={t}>
              <span className="escouade-coche" data-g="" style={{ "--j": j } as CSSProperties} />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="escouade-calcul">
        <p className="escouade-calcul-titre">Chiffrez vos locaux</p>
        <p className="escouade-ligne">
          Surface <strong>250 m²</strong>
        </p>
        <span className="escouade-jauge" />
        <p className="escouade-ligne">
          Passages <strong>3 par semaine</strong>
        </p>
        <span className="escouade-pastilles">
          <span>1</span>
          <span>2</span>
          <span data-choisi="">3</span>
          <span>5</span>
        </span>
        <p className="escouade-delai">Devis sous 24 h</p>
        <span className="escouade-bouton">Chiffrer mes locaux</span>
      </div>

      <span className="escouade-raclette" aria-hidden="true" />
    </div>
  );
}

export const maquette: Maquette = { id: "proprete", Contenu };
