import type { ReactNode } from "react";

/**
 * Le tableau de comparaison du site, pensé pour le téléphone d'abord.
 *
 * Pourquoi (SITA-28, 16 novembre 2026) : Ted signalait « on doit slider de gauche à
 * droite pour lire les infos du site ». Les tableaux ne faisaient pas déborder la page,
 * ils défilaient dans leur cadre — 278 px de contenu hors écran sur 31 pages. Un tableau
 * à trois colonnes ne tient pas dans 390 px, et aucun réglage de police n'y changera
 * rien : sur téléphone chaque ligne devient donc une carte, intitulé de colonne compris.
 * À partir de `md`, le vrai tableau revient, avec l'habillage d'avant.
 *
 * La première cellule de chaque ligne sert de titre de carte (`th scope="row"`), les
 * suivantes portent leur intitulé par `data-label` : la ligne reste lisible seule.
 */
export function TableauEmpile({
  entetes,
  lignes,
  legende,
  resume,
  rendreCellule,
  classe = "",
}: {
  entetes: readonly string[];
  lignes: readonly (readonly string[])[];
  legende?: string;
  /** Résumé pour les lecteurs d'écran, posé en `<caption>`. */
  resume?: string;
  /** Rend une cellule (liens dans les articles, par exemple). Texte brut par défaut. */
  rendreCellule?: (texte: string, colonne: number) => ReactNode;
  classe?: string;
}) {
  const cellule = rendreCellule ?? ((texte: string) => texte);
  return (
    <figure className={classe}>
      {/* Pas d'`overflow-x` sous `md` : il n'y a plus rien à faire défiler. */}
      <div className="md:overflow-hidden md:rounded-3xl md:border md:border-black/[0.08]">
        <table className="block w-full text-left text-base leading-6 md:table md:text-[15px]">
          {resume && <caption className="sr-only">{resume}</caption>}
          <thead className="hidden md:table-header-group">
            <tr className="bg-black/[0.03]">
              {entetes.map((entete) => (
                <th key={entete} scope="col" className="px-5 py-3.5 font-semibold text-black">
                  {entete}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {lignes.map((ligne, index) => (
              <tr
                key={ligne[0] ?? index}
                className="mb-3 block rounded-3xl border border-black/[0.08] p-5 last:mb-0 md:mb-0 md:table-row md:rounded-none md:border-0 md:border-t md:border-black/[0.06] md:p-0 md:align-top"
              >
                <th
                  scope="row"
                  className="block font-semibold text-black md:table-cell md:px-5 md:py-3.5 md:font-medium"
                >
                  {cellule(ligne[0] ?? "", 0)}
                </th>
                {ligne.slice(1).map((texte, colonne) => (
                  <td
                    key={colonne}
                    data-label={entetes[colonne + 1] ? `${entetes[colonne + 1]} :` : undefined}
                    className="mt-2 block text-black/70 before:mr-1 before:font-medium before:text-black/70 before:content-[attr(data-label)] md:mt-0 md:table-cell md:px-5 md:py-3.5 md:before:content-none"
                  >
                    {cellule(texte, colonne + 1)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {legende && (
        <figcaption className="mt-2 px-1 text-[15px] text-black/50 sm:text-sm">{legende}</figcaption>
      )}
    </figure>
  );
}
