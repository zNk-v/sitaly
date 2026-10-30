import type { Maquette } from "@/components/premium/registre";

/**
 * 11 · Chambres d'hôtes · Les Sept Lieues (marque inventée).
 *
 * Un voyageur compare trois onglets ouverts : les nuits libres et le prix
 * passent avant la visite des chambres. Le décor est une carte postale à
 * bord dentelé, avec son timbre et son cachet. Aucun nom de lieu réel.
 *
 * Gestes (chambres-d-hotes.css) : la carte se pose en pivotant, le timbre
 * se tamponne.
 */

/* Le mois : 1 à 30, commencé un mercredi. Nuits prises : week-ends chargés. */
const PRISES = new Set([4, 5, 11, 12, 13, 18, 19, 25, 26]);
const JOURS = Array.from({ length: 30 }, (_, i) => i + 1);

function Contenu() {
  return (
    <div className="lieues">
      <header className="lieues-entete">
        <span className="lieues-logo logo-marque">Les Sept Lieues</span>
        <nav className="lieues-nav">
          <span>Les chambres</span>
          <span>Le jardin</span>
          <span>Venir</span>
        </nav>
      </header>

      <div className="lieues-carte" data-g="">
        <p className="lieues-rubrique">Chambres d'hôtes</p>
        <p className="lieues-accroche">
          Quatre chambres, un jardin, le petit-déjeuner jusqu'à 10 h 30.
        </p>
        <p className="lieues-prix">Dès 95 € la nuit pour deux, petit-déjeuner compris</p>
        <span className="lieues-timbre" data-g="">
          4<small>chambres</small>
        </span>
        <svg className="lieues-cachet" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="lieues-cercle" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
          </defs>
          <circle cx="50" cy="50" r="46" />
          <circle cx="50" cy="50" r="26" />
          <text>
            <textPath href="#lieues-cercle">Les Sept Lieues · chambres d'hôtes ·</textPath>
          </text>
        </svg>
      </div>

      <div className="lieues-resa">
        <p className="lieues-mois">
          Ce mois-ci <span>nuits libres en bleu</span>
        </p>
        <ol className="lieues-calendrier">
          {JOURS.map((j) => (
            <li key={j} data-prise={PRISES.has(j) ? "" : undefined}>
              {j}
            </li>
          ))}
        </ol>
        <span className="lieues-bouton">Voir les dates libres</span>
      </div>
    </div>
  );
}

export const maquette: Maquette = { id: "chambres-d-hotes", Contenu };
