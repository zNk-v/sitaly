import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 13 · Tatoueur · Fine Ligne (marque inventée).
 *
 * Un tatoueur vend un trait : le site garde le noir, le blanc et les dessins
 * à taille réelle. Une planche de neuf flashs, tracés d'un trait de 1,25 px,
 * légendée comme au mur de l'atelier. Le vermillon ne sert qu'aux numéros.
 *
 * Gestes (tatoueur.css) : les deux lettres « Fl » se rejoignent, les flashs
 * apparaissent en damier.
 */

/* Neuf flashs, dessinés dans un carré de 40. */
const FLASHS: { nom: string; d: string; legende: string }[] = [
  {
    nom: "hirondelle",
    d: "M4 22 C12 14 20 16 24 20 C28 12 34 10 38 12 C32 14 30 18 28 22 L34 30 L26 26 C22 30 14 30 10 26 L2 28 L8 24 Z",
    legende: "N° 14 · 6 cm · 120 €",
  },
  {
    nom: "serpent",
    d: "M8 34 C2 28 12 22 20 24 C30 26 36 18 30 12 C26 8 18 10 18 6 M18 6 l3 -2 M18 6 l3 2",
    legende: "N° 07 · 9 cm · 160 €",
  },
  {
    nom: "dague",
    d: "M20 2 L24 24 L16 24 Z M10 24 H30 M20 24 V36 M17 36 H23",
    legende: "N° 22 · 8 cm · 140 €",
  },
  {
    nom: "fougère",
    d: "M20 38 C20 26 22 14 26 3 M21 30 l-8 -4 M21 30 l8 -5 M22 22 l-8 -5 M22 22 l8 -5 M24 14 l-7 -5 M24 14 l7 -4",
    legende: "N° 03 · 7 cm · 110 €",
  },
  {
    nom: "lune",
    d: "M26 4 A16 16 0 1 0 26 36 A12 12 0 1 1 26 4 Z",
    legende: "N° 11 · 5 cm · 90 €",
  },
  {
    nom: "œil",
    d: "M2 20 C10 8 30 8 38 20 C30 32 10 32 2 20 Z M20 13 A7 7 0 1 1 19.9 13 Z",
    legende: "N° 18 · 6 cm · 120 €",
  },
  {
    nom: "rose",
    d: "M20 20 C22 16 26 18 24 22 C22 27 14 25 15 18 C16 11 27 11 29 19 C31 28 18 34 11 26 M20 30 V38 M20 34 l-6 -3",
    legende: "N° 09 · 8 cm · 150 €",
  },
  {
    nom: "vague",
    d: "M2 30 C8 30 10 20 18 18 C26 16 30 24 24 26 C20 27 20 22 24 22 M2 36 H38",
    legende: "N° 25 · 10 cm · 180 €",
  },
  {
    nom: "clé",
    d: "M12 6 A7 7 0 1 1 11.9 6 Z M12 20 V36 M12 28 H18 M12 33 H16",
    legende: "N° 16 · 7 cm · 110 €",
  },
];

function Contenu() {
  return (
    <div className="ligne">
      <span className="ligne-lettres" aria-hidden="true">
        <span className="ligne-f" data-g="">
          F
        </span>
        <span className="ligne-l" data-g="">
          l
        </span>
      </span>

      <header className="ligne-entete">
        <span className="ligne-logo logo-marque">Fine Ligne</span>
        <nav className="ligne-nav">
          <span>Flashs</span>
          <span>Projets</span>
          <span>L'atelier</span>
        </nav>
      </header>

      <div className="ligne-texte">
        <p className="ligne-accroche">Flashs le premier samedi du mois. Projets sur rendez-vous.</p>
        <p className="ligne-atelier">Atelier sur rendez-vous, du mardi au samedi</p>
        <span className="ligne-bouton">Proposer un projet</span>
      </div>

      <ul className="ligne-planche">
        {FLASHS.map((f, j) => (
          <li
            key={f.nom}
            data-g=""
            data-pair={j % 2 === 0 ? "" : undefined}
            style={{ "--j": j } as CSSProperties}
          >
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d={f.d} />
            </svg>
            <span>
              <b>{f.legende.split(" · ")[0]}</b> · {f.legende.split(" · ").slice(1).join(" · ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const maquette: Maquette = { id: "tatoueur", Contenu };
