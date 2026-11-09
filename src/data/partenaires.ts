/**
 * Les offres partenaires (9 novembre 2026) : les outils que Sitaly recommande
 * à un indépendant qui se lance, dans l'ordre où il en a besoin. Créer sa
 * structure, ouvrir son compte professionnel, tenir sa comptabilité.
 *
 * Une offre s'ouvre quand son `lien` est rempli : c'est le lien suivi que le
 * partenaire donne à Sitaly (programme d'affiliation ou accord direct). Sans
 * lien, elle s'affiche grisée avec « Bientôt », à la demande de Teddy. Tant
 * qu'aucune offre n'a de lien, la page /partenaires/ reste hors du sitemap et
 * de l'index : cinq cartes « Bientôt » n'ont rien à apprendre à Google.
 *
 * `avantage` ne s'écrit que si le partenaire accorde une remise aux visiteurs
 * venus de Sitaly, avec ses mots à lui. Vide, la carte n'annonce rien.
 *
 * Le même tableau vit dans l'application : ~/sitaly-saas/src/lib/partenaires.ts.
 * Un lien ou un avantage se change aux deux endroits.
 *
 * Ce fichier ne dépend d'aucun composant : le script du sitemap le lit.
 */

/**
 * L'interrupteur de la rubrique. Décision de Teddy du 9 novembre 2026 : rien ne
 * se publie avant le premier accord d'un partenaire, parce qu'un logo affiché
 * sous « Partenaires » annonce un accord. À `false`, aucun lien ne mène à la
 * page et elle n'affiche ni marque ni logo, même si le projet est déployé pour
 * autre chose. Passer à `true` ici et dans ~/sitaly-saas/src/lib/partenaires.ts.
 */
export const PARTENAIRES_EN_LIGNE = false;

export interface OffrePartenaire {
  id: string;
  nom: string;
  categorie: string;
  /** Ce que fait le partenaire, en une phrase neutre. */
  description: string;
  /** La remise accordée aux visiteurs venus de Sitaly : « 2 mois offerts ». Vide s'il n'y en a pas. */
  avantage: string;
  /** Le lien suivi donné par le partenaire. Vide : l'offre s'affiche grisée, avec « Bientôt ». */
  lien: string;
  /** Le logo de la marque, pris sur son site officiel le 9 novembre 2026. */
  logo: string;
}

export const PARTENAIRES: OffrePartenaire[] = [
  {
    id: "legalstart",
    nom: "Legalstart",
    categorie: "Création d'entreprise",
    description: "Création de société ou de micro-entreprise et démarches juridiques, en ligne.",
    avantage: "",
    lien: "",
    logo: "/vitrine/partenaires/legalstart.svg",
  },
  {
    id: "shine",
    nom: "Shine",
    categorie: "Compte professionnel",
    description:
      "Compte pro en ligne pour indépendants et petites entreprises, avec carte et facturation.",
    avantage: "",
    lien: "",
    logo: "/vitrine/partenaires/shine.svg",
  },
  {
    id: "qonto",
    nom: "Qonto",
    categorie: "Compte professionnel",
    description:
      "Compte pro en ligne pour indépendants, TPE et PME : cartes, virements et facturation.",
    avantage: "",
    lien: "",
    logo: "/vitrine/partenaires/qonto.svg",
  },
  {
    id: "indy",
    nom: "Indy",
    categorie: "Comptabilité",
    description:
      "Comptabilité et déclarations fiscales des indépendants, à partir de leurs relevés bancaires.",
    avantage: "",
    lien: "",
    logo: "/vitrine/partenaires/indy.png",
  },
  {
    id: "abby",
    nom: "Abby",
    categorie: "Gestion d'auto-entrepreneur",
    description: "Facturation, livre des recettes et déclarations URSSAF pour auto-entrepreneurs.",
    avantage: "",
    lien: "",
    logo: "/vitrine/partenaires/abby.svg",
  },
];

/** Les offres dont le lien existe : les seules à être cliquables. */
export const OFFRES_ACTIVES = PARTENAIRES.filter((p) => p.lien.trim() !== "");

/** Les offres ouvertes d'abord, puis celles qui attendent leur lien. */
export const OFFRES_TRIEES = [
  ...OFFRES_ACTIVES,
  ...PARTENAIRES.filter((p) => p.lien.trim() === ""),
];

/** Vrai dès qu'une offre a son lien : la page entre alors au sitemap et dans l'index. */
export const PARTENAIRES_PUBLIES = PARTENAIRES_EN_LIGNE && OFFRES_ACTIVES.length > 0;
