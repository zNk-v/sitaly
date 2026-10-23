/**
 * Disponibilité d'un nom de domaine en .fr et en .com.
 *
 * Le navigateur interroge directement les registres officiels par RDAP, le
 * successeur du whois : l'Afnic pour le .fr, Verisign pour le .com. Les deux
 * répondent sans clé et autorisent l'appel depuis n'importe quel site
 * (`Access-Control-Allow-Origin: *`). Une réponse 404 veut dire que le nom
 * n'est pas enregistré, 200 qu'il l'est.
 *
 * Rien ne passe par Sitaly ni par un bureau d'enregistrement : personne ne
 * voit le nom testé et ne peut le réserver avant le visiteur.
 */

export type Extension = "fr" | "com";
export type Disponibilite = "libre" | "pris" | "inconnu";

export const EXTENSIONS: Extension[] = ["fr", "com"];

const RDAP: Record<Extension, string> = {
  fr: "https://rdap.nic.fr/domain/",
  com: "https://rdap.verisign.com/com/v1/domain/",
};

/**
 * Le nom tel qu'on peut l'enregistrer, à partir de ce que le visiteur tape :
 * « Boulangerie Dupont & Fils » → « boulangerie-dupont-et-fils »,
 * « https://www.dupont.fr/contact » → « dupont ».
 */
export function nomDeDomaine(texte: string): string {
  return texte
    .trim()
    .toLowerCase()
    .replace(/^[a-z]+:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[/?#].*$/, "")
    .replace(/\.(fr|com|net|org|eu|io|bzh|paris)$/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/&/g, "-et-")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 63)
    .replace(/-+$/, "");
}

/** Un nom enregistrable : lettres, chiffres et tirets, sans tiret au bord. */
export function nomValide(nom: string): boolean {
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(nom) && nom.slice(2, 4) !== "--";
}

export interface ResultatDomaine {
  nom: string;
  extensions: Record<Extension, Disponibilite>;
}

/** « dupont : .fr libre, .com déjà pris », pour la fiche du questionnaire. */
export function resumeDomaine(r: ResultatDomaine): string {
  const mots: Record<Disponibilite, string> = {
    libre: "libre",
    pris: "déjà pris",
    inconnu: "non vérifié",
  };
  return `${r.nom} : ${EXTENSIONS.map((e) => `.${e} ${mots[r.extensions[e]]}`).join(", ")}`;
}

export async function disponibilite(
  nom: string,
  extension: Extension,
  signal?: AbortSignal,
): Promise<Disponibilite> {
  try {
    const reponse = await fetch(`${RDAP[extension]}${nom}.${extension}`, {
      headers: { Accept: "application/rdap+json" },
      signal,
    });
    if (reponse.status === 404) return "libre";
    if (reponse.ok) return "pris";
    return "inconnu";
  } catch {
    return "inconnu";
  }
}
