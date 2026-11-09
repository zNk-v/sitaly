import { METIERS, type Metier } from "@/components/produit/Vitrine";
import { METIERS_PLUS, MODELES } from "@/data/modeles";

/**
 * Les métiers qui ont une page de modèle (9 novembre 2026) : ceux de l'accueil,
 * puis ceux qui n'existent que comme modèles (METIERS_PLUS), dans l'ordre de
 * MODELES.
 */
export const METIERS_MODELES: Metier[] = MODELES.flatMap((modele) => {
  const metier = [...METIERS, ...METIERS_PLUS].find((m) => m.id === modele.id);
  return metier ? [metier] : [];
});

/**
 * La phrase qui ouvre l'application depuis une page de modèle, sans sa ville
 * d'exemple : « Fleuriste à Nantes, bouquets de mariage » devient « Fleuriste,
 * bouquets de mariage ». Le visiteur indique sa propre ville à l'étape suivante ;
 * avec la ville d'exemple, son site partirait situé à Nantes.
 */
export const phraseSansVille = (phrase: string) => phrase.replace(/ à \p{Lu}[\p{L}'’-]*/u, "");
