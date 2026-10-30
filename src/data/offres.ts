import { PRIX_AGENTS_IA, euros } from "@/lib/config";

/**
 * Grille tarifaire de Sitaly : source unique des montants affichés.
 *
 * Décision du 18 octobre 2026 : les prix des sites sont publiés (révision de
 * DESIGN.md §8). Révision du 23 octobre 2026 : trois offres de site, trois
 * boutiques Shopify, et les agents IA entrent dans la grille. Révision du 25
 * octobre 2026 : une seule boutique, et Présence Expert à 4 modifications par
 * mois. La page /tarifs/,
 * le menu, l'accueil, les CGV et la FAQ lisent ce fichier ; aucun montant ne
 * doit être recopié ailleurs dans le code.
 *
 * Le contenu des offres vit dans GRILLES, pas dans les offres : chaque grille
 * range ses lignes par rubrique (le site, Google, les IA, le suivi), et chaque
 * ligne dit pour chaque offre si elle est comprise. Sur /tarifs/, une carte
 * n'affiche que ce qui la distingue ; les lignes communes à tout l'onglet
 * passent dans l'encart « Inclus dans toutes les offres ». Les fichiers texte de public/ (pricing.md,
 * llms.txt, llms-full.txt) se corrigent à la main à chaque changement ici.
 *
 * L'offre Agent IA reprend les planchers de PRIX_AGENTS_IA (src/lib/config.ts),
 * que les pages secteur affichent aussi.
 *
 * Hors grille, sans prix affiché : Google Ads, ChatGPT Ads (la grille
 * Visibilité est à revoir avec le client).
 */

export type OffreId =
  | "presence"
  | "presence-pro"
  | "presence-expert"
  | "boutique"
  | "maintenance"
  | "agent-ia"
  | "agent-ia-pro"
  | "outil-sur-mesure"
  | "site-premium";

/** Les sections de la page /tarifs/, dans l'ordre. */
export type GroupeId = "site" | "boutique" | "maintenance" | "agents-ia" | "premium";

export interface Offre {
  id: OffreId;
  groupe: GroupeId;
  nom: string;
  /** Une ligne sous le nom : pour qui. */
  pour: string;
  /** Une ligne dans le menu de l'en-tête. */
  menuDesc: string;
  /** Absent : le suivi mensuel est chiffré dans le devis. */
  mensuel?: number;
  /** Frais payés une fois, à la signature. */
  depart: number;
  /** Libellé des frais de départ : « mise en service », « mise en place » ou « audit ». */
  departLibelle: string;
  /** Les montants sont des planchers : « dès ». */
  aPartirDe?: boolean;
  /** Précisions affichées sous la liste. */
  notes?: string[];
  /** Encadré obligatoire (Shopify). */
  mention?: string;
  recommandee?: boolean;
  /** La page qui détaille l'offre, quand elle existe. Sinon le menu mène à sa carte. */
  page?: string;
}

const MENTION_SHOPIFY =
  "Abonnement Shopify à votre nom, environ 36 €/mois, payé directement à Shopify, plus les frais de paiement sur les ventes.";

export const OFFRES: Offre[] = [
  {
    id: "presence",
    groupe: "site",
    nom: "Présence",
    pour: "Un site clair et une fiche Google tenue, pour être trouvé dans votre commune.",
    menuDesc: "Un site clair et votre fiche Google, près de chez vous.",
    mensuel: 149,
    depart: 290,
    departLibelle: "de mise en service",
    page: "/offres/presence/",
  },
  {
    id: "presence-pro",
    groupe: "site",
    nom: "Présence Pro",
    pour: "Pour être trouvé aussi dans les communes voisines, et faire grandir vos avis.",
    menuDesc: "Être trouvé dans les communes voisines, avec plus d'avis.",
    mensuel: 249,
    depart: 490,
    departLibelle: "de mise en service",
    recommandee: true,
    page: "/offres/presence-pro/",
  },
  {
    id: "presence-expert",
    groupe: "site",
    nom: "Présence Expert",
    pour: "Pour les secteurs où vos concurrents sont déjà bien placés, sur Google comme dans les IA.",
    menuDesc: "Plus de pages, des articles chaque mois, un suivi Google et IA.",
    mensuel: 399,
    depart: 790,
    departLibelle: "de mise en service",
    page: "/offres/presence-expert/",
  },
  {
    id: "boutique",
    groupe: "boutique",
    nom: "Boutique en ligne",
    pour: "Vendre vos produits en ligne avec Shopify : fleurs, bougies, créations, épicerie.",
    menuDesc: "Shopify configuré, paiement et livraison compris.",
    mensuel: 149,
    depart: 990,
    departLibelle: "de mise en service",
    notes: ["La boutique vous appartient.", "Sans abonnement Sitaly : 1 490 € en une fois."],
    mention: MENTION_SHOPIFY,
    page: "/site-e-commerce/",
  },
  {
    id: "maintenance",
    groupe: "maintenance",
    nom: "Maintenance de site existant",
    pour: "Pour un site que vous avez déjà, fait ailleurs, sous WordPress ou autre.",
    menuDesc: "Entretenir un site fait ailleurs.",
    mensuel: 79,
    depart: 190,
    departLibelle: "d'audit",
    page: "/offres/maintenance/",
    notes: ["Si le site demande une remise en état : devis séparé, annoncé avant tout travail."],
  },
  {
    id: "agent-ia",
    groupe: "agents-ia",
    nom: "Agent IA",
    pour: "Ne plus laisser une demande sans réponse, même le soir et le week-end.",
    menuDesc: "Répondre, qualifier, prendre les rendez-vous.",
    mensuel: PRIX_AGENTS_IA.mensuelMin,
    depart: PRIX_AGENTS_IA.miseEnPlaceMin,
    departLibelle: "de mise en place",
    page: "/agents-ia/",
  },
  {
    id: "agent-ia-pro",
    groupe: "agents-ia",
    nom: "Agent IA Pro",
    pour: "Un standard et un agenda tenus sans vous, appels compris.",
    menuDesc: "Le téléphone et les messages tenus, relances comprises.",
    mensuel: 790,
    depart: 2400,
    departLibelle: "de mise en place",
    recommandee: true,
    page: "/agents-ia/agent-vocal/",
  },
  {
    id: "outil-sur-mesure",
    groupe: "agents-ia",
    nom: "Outil sur mesure",
    pour: "Un CRM, un logiciel ou une application pensés pour votre activité.",
    menuDesc: "CRM, logiciel ou application pour votre activité.",
    depart: 4900,
    departLibelle: "de mise en place",
    aPartirDe: true,
    page: "/logiciel-metier/",
  },
  /* Le site sur mesure, payé une fois (23 octobre 2026) : hors du modèle
     mensuel, sur sa propre page. Plancher, acomptes et contenu restent des
     propositions tant que Teddy ne les a pas validés (voir src/data/premium.ts). */
  {
    id: "site-premium",
    groupe: "premium",
    nom: "Sitaly Premium",
    pour: "Un site dessiné de zéro pour votre métier : direction artistique, textes, animations et code.",
    menuDesc: "Un site dessiné pour votre métier, payé une fois.",
    depart: 6900,
    departLibelle: "en trois acomptes",
    aPartirDe: true,
    notes: [
      "Le site, son code et ses fichiers vous appartiennent au dernier acompte.",
      "Le montant exact est écrit dans le devis, avant de commencer.",
    ],
    page: "/site-premium/",
  },
];

/* ---------------------------------------------------------------------------
   Le contenu des offres, grille par grille
   --------------------------------------------------------------------------- */

/** Le pictogramme d'une rubrique. La page /tarifs/ fait la correspondance. */
export type IconeRubrique =
  | "site"
  | "google"
  | "ia"
  | "support"
  | "boutique"
  | "vendre"
  | "repondre"
  | "organiser"
  | "sur-mesure"
  | "direction-artistique";

/** `true` : compris. Un texte : compris, avec sa quantité. Absent : non compris. */
export type Valeur = true | string;

export interface Ligne {
  libelle: string;
  valeurs: Partial<Record<OffreId, Valeur>>;
}

export interface Rubrique {
  titre: string;
  icone: IconeRubrique;
  lignes: Ligne[];
}

/** Une ligne comprise dans toutes les offres données. */
const partout = (ids: OffreId[], v: Valeur = true) =>
  Object.fromEntries(ids.map((id) => [id, v])) as Partial<Record<OffreId, Valeur>>;

const SITES: OffreId[] = ["presence", "presence-pro", "presence-expert"];
const BOUTIQUES: OffreId[] = ["boutique"];
const AGENTS: OffreId[] = ["agent-ia", "agent-ia-pro", "outil-sur-mesure"];

export const GRILLES: Record<GroupeId, Rubrique[]> = {
  site: [
    {
      titre: "Votre site",
      icone: "site",
      lignes: [
        {
          libelle: "Pages rédigées pour vous",
          valeurs: {
            presence: "5 pages",
            "presence-pro": "10 pages, dont 5 locales",
            "presence-expert": "15 pages, dont 10 locales",
          },
        },
        { libelle: "Hébergement, nom de domaine et maintenance", valeurs: partout(SITES) },
        { libelle: "Articles de blog rédigés", valeurs: { "presence-expert": "2 par mois" } },
      ],
    },
    {
      titre: "Sur Google",
      icone: "google",
      lignes: [
        { libelle: "Fiche Google optimisée et gérée, réponses aux avis", valeurs: partout(SITES) },
        {
          libelle: "Posts et photos sur votre fiche chaque mois",
          valeurs: { "presence-pro": true, "presence-expert": true },
        },
        {
          libelle: "Demande d'avis automatique après chaque prestation",
          valeurs: { "presence-pro": true, "presence-expert": true },
        },
        { libelle: "Mots-clés suivis sur Google", valeurs: { "presence-expert": "10 mots-clés" } },
      ],
    },
    {
      titre: "Dans ChatGPT et les IA",
      icone: "ia",
      lignes: [
        {
          libelle: "Site lisible par les IA : données structurées et fichier llms.txt",
          valeurs: partout(SITES),
        },
        {
          libelle: "Textes rédigés pour être cités par ChatGPT et Gemini",
          valeurs: { "presence-expert": true },
        },
        {
          libelle: "Questions suivies dans les IA chaque trimestre",
          valeurs: { "presence-expert": "20 questions" },
        },
      ],
    },
    {
      titre: "Suivi et support",
      icone: "support",
      lignes: [
        {
          libelle: "Vos modifications faites par nous",
          valeurs: {
            presence: "1 par mois",
            "presence-pro": "1 par mois",
            "presence-expert": "4 par mois",
          },
        },
        { libelle: "Un interlocuteur unique, réponse sous 24\u00a0h", valeurs: partout(SITES) },
        { libelle: "Rapport mensuel", valeurs: { "presence-pro": true, "presence-expert": true } },
        { libelle: "Bilan trimestriel en visio", valeurs: { "presence-expert": true } },
      ],
    },
  ],
  /* Une seule boutique depuis le 25 octobre 2026. Grand catalogue, plusieurs
     langues ou liaison avec vos outils : sur devis (voir /site-e-commerce/). */
  boutique: [
    {
      titre: "Votre boutique",
      icone: "boutique",
      lignes: [
        {
          libelle: "Boutique Shopify configurée : thème, paiement, livraison",
          valeurs: partout(BOUTIQUES),
        },
        { libelle: "Produits mis en ligne", valeurs: { boutique: "jusqu'à 20" } },
        { libelle: "Pages légales et prise en main", valeurs: partout(BOUTIQUES) },
      ],
    },
    {
      titre: "Sur Google",
      icone: "google",
      lignes: [{ libelle: "Fiche Google gérée, réponses aux avis", valeurs: partout(BOUTIQUES) }],
    },
    {
      titre: "Suivi et support",
      icone: "support",
      lignes: [
        {
          libelle: "Modifications chaque mois (produits, bannières de saison)",
          valeurs: { boutique: "1\u00a0h" },
        },
        { libelle: "Mises à jour et support", valeurs: partout(BOUTIQUES) },
      ],
    },
  ],
  maintenance: [
    {
      titre: "Votre site existant",
      icone: "site",
      lignes: [
        { libelle: "Audit de départ", valeurs: { maintenance: true } },
        { libelle: "Sauvegardes", valeurs: { maintenance: true } },
        { libelle: "Mises à jour", valeurs: { maintenance: true } },
        { libelle: "Corrections mineures", valeurs: { maintenance: true } },
      ],
    },
  ],
  "agents-ia": [
    {
      titre: "Répondre",
      icone: "repondre",
      lignes: [
        {
          libelle: "Canaux couverts",
          valeurs: {
            "agent-ia": "1 au choix : site, WhatsApp ou e-mail",
            "agent-ia-pro": "site, WhatsApp et e-mail",
            "outil-sur-mesure": "selon le projet",
          },
        },
        {
          libelle: "Réponse aux questions et qualification de chaque demande",
          valeurs: {
            "agent-ia": true,
            "agent-ia-pro": true,
            "outil-sur-mesure": "selon le projet",
          },
        },
        {
          libelle: "Agent vocal qui décroche et prend les messages",
          valeurs: { "agent-ia-pro": true, "outil-sur-mesure": "selon le projet" },
        },
      ],
    },
    {
      titre: "Organiser",
      icone: "organiser",
      lignes: [
        {
          libelle: "Prise de rendez-vous dans votre agenda",
          valeurs: {
            "agent-ia": true,
            "agent-ia-pro": true,
            "outil-sur-mesure": "selon le projet",
          },
        },
        {
          libelle: "Relances automatiques des devis et des rendez-vous",
          valeurs: { "agent-ia-pro": true, "outil-sur-mesure": "selon le projet" },
        },
        {
          libelle: "Branché à votre agenda et à votre CRM",
          valeurs: { "agent-ia-pro": true, "outil-sur-mesure": true },
        },
      ],
    },
    {
      titre: "Sur mesure",
      icone: "sur-mesure",
      lignes: [
        { libelle: "Diagnostic offert de vos tâches et de vos outils", valeurs: partout(AGENTS) },
        {
          libelle: "CRM, logiciel métier ou application conçus pour vous",
          valeurs: { "outil-sur-mesure": true },
        },
        {
          libelle: "Connexion à tous vos logiciels existants",
          valeurs: { "outil-sur-mesure": true },
        },
      ],
    },
    {
      titre: "Suivi et support",
      icone: "support",
      lignes: [
        {
          libelle: "Pilotage mensuel : réglages et suivi des conversations",
          valeurs: {
            "agent-ia": true,
            "agent-ia-pro": true,
            "outil-sur-mesure": "chiffré dans le devis",
          },
        },
        {
          libelle: "Minutes de voix et SMS compris",
          valeurs: { "agent-ia-pro": true, "outil-sur-mesure": "selon le projet" },
        },
        { libelle: "Un interlocuteur unique, réponse sous 24\u00a0h", valeurs: partout(AGENTS) },
      ],
    },
  ],
  premium: [
    {
      titre: "Direction artistique",
      icone: "direction-artistique",
      lignes: [
        { libelle: "Atelier de lancement de 2 h en visio", valeurs: { "site-premium": true } },
        {
          libelle: "Deux pistes graphiques : palette, lettres, motif",
          valeurs: { "site-premium": true },
        },
        {
          libelle: "Un logotype en lettres si vous n'en avez pas",
          valeurs: { "site-premium": true },
        },
      ],
    },
    {
      titre: "Votre site",
      icone: "site",
      lignes: [
        {
          libelle: "Pages dessinées pour le téléphone puis l'ordinateur",
          valeurs: { "site-premium": "jusqu'à 8" },
        },
        {
          libelle: "Animations au défilement, testées sur iPhone et Android",
          valeurs: { "site-premium": true },
        },
        { libelle: "Code écrit à la main, sans thème acheté", valeurs: { "site-premium": true } },
      ],
    },
    {
      titre: "Textes et images",
      icone: "ia",
      lignes: [
        { libelle: "Toutes les pages rédigées pour vous", valeurs: { "site-premium": true } },
        {
          libelle: "Vos photos triées, recadrées et retouchées",
          valeurs: { "site-premium": true },
        },
        {
          libelle: "Motifs, plans et pictogrammes dessinés en code",
          valeurs: { "site-premium": true },
        },
      ],
    },
    {
      titre: "Mise en ligne et suivi",
      icone: "support",
      lignes: [
        { libelle: "Nom de domaine", valeurs: { "site-premium": true } },
        {
          libelle: "Référencement de départ, données structurées et fichier llms.txt",
          valeurs: { "site-premium": true },
        },
        { libelle: "Fiche Google remise en ordre", valeurs: { "site-premium": true } },
        { libelle: "Une heure de prise en main en visio", valeurs: { "site-premium": true } },
        {
          libelle: "Hébergement et corrections",
          valeurs: { "site-premium": "pendant 3 mois" },
        },
      ],
    },
  ],
};

/** Ce qu'une offre comprend, en phrases : pour les CGV, le JSON-LD et les pages métier. */
export function lignesIncluses(o: Offre): string[] {
  return GRILLES[o.groupe].flatMap((r) =>
    r.lignes.flatMap((l) => {
      const v = l.valeurs[o.id];
      if (!v) return [];
      return [v === true ? l.libelle : `${l.libelle} : ${v}`];
    }),
  );
}

export const GROUPES: Record<GroupeId, { titre: string; ancre: string }> = {
  site: { titre: "Créer votre site", ancre: "site" },
  boutique: { titre: "Vendre en ligne", ancre: "boutique" },
  maintenance: { titre: "Faire évoluer votre site", ancre: "maintenance" },
  "agents-ia": { titre: "Agents IA et automatisation", ancre: "agents-ia" },
  premium: { titre: "Sur mesure", ancre: "premium" },
};

/** Les trois acomptes de Sitaly Premium : signature, maquettes validées, mise en ligne. */
export const ACOMPTES_PREMIUM = [
  { part: 0.3, moment: "à la signature" },
  { part: 0.4, moment: "à la validation des maquettes" },
  { part: 0.3, moment: "à la mise en ligne" },
] as const;

/** Le montant de chaque acompte, arrondi à l'euro ; le dernier par différence, pour que le total reste exact. */
export function montantsAcomptes(o: Offre): { montant: number; moment: string; part: number }[] {
  let deja = 0;
  return ACOMPTES_PREMIUM.map((a, i) => {
    const montant =
      i === ACOMPTES_PREMIUM.length - 1 ? o.depart - deja : Math.round(o.depart * a.part);
    deja += montant;
    return { montant, moment: a.moment, part: a.part };
  });
}

export function offresDu(groupe: GroupeId): Offre[] {
  return OFFRES.filter((o) => o.groupe === groupe);
}

/** Le prix tel que le menu l'affiche : « 149 €/mois », « dès 390 €/mois », « dès 4 900 € ». */
export function prixCourt(o: Offre): string {
  const des = o.aPartirDe ? "dès " : "";
  return o.mensuel === undefined ? `${des}${euros(o.depart)}` : `${des}${euros(o.mensuel)}/mois`;
}

/** Le prix complet : « 249 €/mois + 490 € de mise en service », « dès 4 900 € de mise en place ». */
export function prixLong(o: Offre): string {
  const des = o.aPartirDe ? "dès " : "";
  return o.mensuel === undefined
    ? `${des}${euros(o.depart)} ${o.departLibelle}`
    : `${des}${euros(o.mensuel)}/mois + ${des}${euros(o.depart)} ${o.departLibelle}`;
}

/**
 * La ligne sous le grand prix d'une carte : les frais de départ d'une offre au
 * mois, ou ce qui suit un montant payé une fois.
 */
export function ligneDepart(o: Offre): string {
  if (o.mensuel !== undefined)
    return `+ ${o.aPartirDe ? "dès " : ""}${euros(o.depart)} ${o.departLibelle}`;
  if (o.groupe === "premium") return `${o.departLibelle}, sans abonnement`;
  return `${o.departLibelle.replace(/^de /, "")}, puis un suivi mensuel chiffré dans le devis`;
}

/** Le lien du menu : la page de l'offre, ou sa carte sur /tarifs/. */
export function lienOffre(o: Offre): string {
  return o.page ?? `/tarifs/#${o.id}`;
}

/** Chaque option s'affiche sous l'onglet de son groupe, sur /tarifs/. */
export const A_LA_CARTE: { libelle: string; prix: number; detail?: string; groupe: GroupeId }[] = [
  { libelle: "Page supplémentaire", prix: 90, groupe: "site" },
  { libelle: "10 produits Shopify supplémentaires", prix: 90, groupe: "boutique" },
  {
    libelle: "Optimisation de fiche Google seule, sans site",
    prix: 190,
    detail: "en une fois",
    groupe: "site",
  },
  { libelle: "Passage de Présence à Présence Pro", prix: 200, groupe: "site" },
];

/** Rachat d'un site vitrine au départ du client, selon l'ancienneté. */
export const RACHAT_SITE = [
  { periode: "Pendant la 1re année", prix: 1290 },
  { periode: "Pendant la 2e année", prix: 890 },
  { periode: "Ensuite", prix: 490 },
];

/** Boutique livrée sans abonnement Sitaly, en une fois. */
export const BOUTIQUE_SANS_ABONNEMENT = 1490;

export const MENTION_TVA = "TVA non applicable, art. 293 B du CGI";

/**
 * Sitaly App, le créateur de site par l'IA en libre-service (29 octobre 2026,
 * produit principal de sitaly.fr depuis le 30 octobre). Trois formules
 * calquées sur Durable (Gratuit, Launch, Grow), mensuelles ou annuelles
 * (douze mois moins 15 %, arrondis à l'euro). Les mêmes montants vivent dans
 * l'application (sitaly-saas : src/lib/entitlements.ts) et dans Stripe.
 *
 * Hors de `OFFRES`, qui garde les offres de l'agence, vendues au téléphone.
 */
export const CREATEUR_IA = {
  page: "/",
  menuDesc: "Votre site écrit par l'IA, formule gratuite pour commencer.",
  decouverte: { nom: "Découverte", mensuel: 0, annuel: 0, credits: 50 },
  essentiel: { nom: "Essentiel", mensuel: 39, annuel: 398, credits: 500, creditDomaine: 20 },
  pro: { nom: "Pro", mensuel: 79, annuel: 806, credits: 2500, creditDomaine: 40 },
} as const;

/** Prix le plus bas d'un site, pour les accroches (« à partir de »). */
export const PRIX_SITE_MIN = Math.min(
  ...OFFRES.filter((o) => o.groupe === "site" || o.groupe === "boutique").map(
    (o) => o.mensuel ?? Infinity,
  ),
);

export function offre(id: OffreId): Offre {
  const o = OFFRES.find((x) => x.id === id);
  if (!o) throw new Error(`Offre inconnue : ${id}`);
  return o;
}
