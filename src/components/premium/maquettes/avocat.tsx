import type { CSSProperties } from "react";
import type { Maquette } from "@/components/premium/registre";

/**
 * 09 · Avocat · Cabinet Alinéa (marque inventée).
 *
 * Un client d'avocat veut comprendre avant de payer. Le site emprunte la
 * mise en page d'un code : articles numérotés, notes de marge, renvois en
 * exposant, double filet vertical, et un § géant en filigrane.
 *
 * Gestes (avocat.css) : le filet sous le titre se trace, les articles
 * montent l'un après l'autre.
 */

const ARTICLES = [
  {
    num: "§ 1",
    titre: "Droit du travail",
    texte: "Licenciement, rupture conventionnelle : nous lisons votre contrat avec vous.",
    marge: "Prud'hommes",
  },
  {
    num: "§ 2",
    titre: "Droit de la famille",
    texte: "Divorce, garde, pension : chaque étape, son délai, son coût.",
    marge: "Médiation possible",
  },
  {
    num: "§ 3",
    titre: "Baux commerciaux",
    texte: "Renouvellement, loyer, congé : le bail relu avant signature.",
    marge: "Commerçants",
  },
];

function Contenu() {
  return (
    <div className="alinea">
      <span className="alinea-filigrane" aria-hidden="true">
        §
      </span>
      <header className="alinea-entete">
        <span className="alinea-logo logo-marque">Cabinet Alinéa</span>
        <nav className="alinea-nav">
          <span>Domaines</span>
          <span>Honoraires</span>
          <span>Le cabinet</span>
        </nav>
      </header>

      <div className="alinea-tete">
        <p className="alinea-sur">Avocats au barreau</p>
        <p className="alinea-accroche">
          Votre dossier expliqué sur une page, avant toute signature<sup>1</sup>.
        </p>
        <span className="alinea-filet" data-g="" />
        <p className="alinea-rdv">
          Premier rendez-vous : 30 minutes, 80 € TTC. Convention d'honoraires remise avant tout
          engagement.
        </p>
        <span className="alinea-bouton">Exposer ma situation</span>
        <p className="alinea-note">
          <sup>1</sup> Une page, sans jargon : vos droits, les étapes, le coût.
        </p>
      </div>

      <ol className="alinea-articles">
        {ARTICLES.map((a, j) => (
          <li key={a.num} data-g="" style={{ "--j": j } as CSSProperties}>
            <span className="alinea-num">{a.num}</span>
            <div>
              <p className="alinea-article-titre">{a.titre}</p>
              <p className="alinea-article-texte">{a.texte}</p>
            </div>
            <span className="alinea-marge">{a.marge}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export const maquette: Maquette = { id: "avocat", Contenu };
