import { VITRINES, type Vitrine } from "@/data/premium";

/**
 * Retrouve, pour un métier tapé par le visiteur de /site-premium/, le site
 * inventé qui suit la même logique. Pas d'IA : une table d'alias construite
 * depuis premium.ts (le métier, les métiers « même logique » et les alias de
 * chaque vitrine), puis trois tolérances, dans l'ordre :
 * 1. le texte normalisé (minuscules, sans accents, sans « je suis », sans
 *    article, au singulier et au masculin) égal à une entrée ;
 * 2. un mot de la saisie égal à une entrée, ou une entrée qui commence par
 *    ce mot (préfixe de quatre lettres au moins) ;
 * 3. une faute de frappe : distance d'édition de 1 au-delà de cinq lettres.
 */

export type Via = "metier" | "meme-logique" | "alias";

export interface Trouve {
  vitrine: Vitrine;
  /** Comment la saisie a été reconnue : le métier même, un métier voisin, un alias. */
  via: Via;
  /** Le nom reconnu, tel qu'il figure dans premium.ts. */
  nom: string;
}

export function normaliser(texte: string): string {
  return (
    texte
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, " ")
      .replace(/\b(je suis|je fais|on est|nous sommes|un|une|des|le|la|les|l|d|de|du)\b/g, " ")
      .replace(/[^a-z0-9 -]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .map((m) => (m.length > 3 ? m.replace(/(s|x)$/, "") : m))
      /* Au masculin, des deux côtés : « électricienne » retrouve « électricien ». */
      .map((m) =>
        m.length > 5
          ? m
              .replace(/ienne$/, "ien")
              .replace(/euse$/, "eur")
              .replace(/trice$/, "teur")
              .replace(/ere$/, "er")
          : m,
      )
      .join(" ")
  );
}

interface Entree {
  cle: string;
  nom: string;
  vitrine: Vitrine;
  via: Via;
}

const ENTREES: Entree[] = VITRINES.flatMap((v) => [
  { cle: normaliser(v.metier), nom: v.metier.toLowerCase(), vitrine: v, via: "metier" as const },
  ...v.memeLogique.map((m) => ({
    cle: normaliser(m),
    nom: m,
    vitrine: v,
    via: "meme-logique" as const,
  })),
  ...v.alias.map((a) => ({ cle: normaliser(a), nom: a, vitrine: v, via: "alias" as const })),
]);

function distanceUn(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let ecarts = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++ecarts > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return ecarts + (a.length - i) + (b.length - j) <= 1;
}

const ordre: Record<Via, number> = { metier: 0, "meme-logique": 1, alias: 2 };
const meilleur = (liste: Entree[]) =>
  liste.sort((x, y) => ordre[x.via] - ordre[y.via] || x.cle.length - y.cle.length)[0];

export function trouver(saisie: string): Trouve | null {
  const texte = normaliser(saisie.slice(0, 40));
  if (!texte) return null;

  const exact = ENTREES.filter((e) => e.cle === texte);
  if (exact.length) return emballer(meilleur(exact));

  const mots = texte.split(" ").filter((m) => m.length >= 3);
  const parMot = ENTREES.filter((e) =>
    mots.some((m) => e.cle.split(" ").includes(m) || (m.length >= 4 && e.cle.startsWith(m))),
  );
  if (parMot.length) return emballer(meilleur(parMot));

  const proche = ENTREES.filter((e) =>
    mots.some((m) => m.length > 5 && e.cle.split(" ").some((c) => distanceUn(m, c))),
  );
  if (proche.length) return emballer(meilleur(proche));

  return null;
}

function emballer(e: Entree): Trouve {
  return { vitrine: e.vitrine, via: e.via, nom: e.nom };
}
