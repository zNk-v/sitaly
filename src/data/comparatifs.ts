import { CREATEUR_IA as IA } from "@/data/offres";

/**
 * Les pages comparatives (30 octobre 2026), /comparer/<id>/, sur le modèle des
 * pages « compare » de durable.com : Sitaly face à Wix, WordPress, Squarespace
 * et une agence web.
 *
 * Publicité comparative : chaque ligne doit rester exacte et vérifiable
 * (article L122-1 du Code de la consommation). Les prix des autres outils ont
 * été relevés sur leurs pages officielles le 30 octobre 2026 (RELEVE) ; à
 * revoir à chaque changement de leur grille. On compare des faits, sans
 * dénigrer : chaque page dit aussi quand l'autre choix est le bon.
 */

export const RELEVE = "30 octobre 2026";

export interface Ligne {
  critere: string;
  sitaly: string;
  autre: string;
}

export interface Comparatif {
  id: string;
  /** Le nom tel qu'on le lit dans une phrase : « Wix », « une agence web ». */
  nom: string;
  /** Le nom en tête de colonne. */
  colonne: string;
  titre: string;
  description: string;
  intro: string;
  choisirSitaly: string[];
  choisirAutre: string[];
  lignes: Ligne[];
  faq: { q: string; a: string }[];
  /** Les pages officielles d'où viennent les chiffres de l'autre colonne. */
  sources: { label: string; url: string }[];
}

const prixSitaly = `Gratuit pour commencer, puis ${IA.essentiel.mensuel} €/mois ou ${IA.essentiel.annuel} €/an (Essentiel)`;
const domaineSitaly =
  "Offert avec Essentiel et Pro, au mois comme à l'année, et renouvelé tant que l'abonnement court";
const creationSitaly =
  "Une phrase sur votre activité : l'IA écrit le site complet et le met en ligne en une minute";

export const COMPARATIFS: Comparatif[] = [
  {
    id: "wix",
    nom: "Wix",
    colonne: "Wix",
    titre: "Sitaly ou Wix : lequel choisir pour votre site ?",
    description:
      "Sitaly ou Wix : création, prix, nom de domaine, modifications. Le comparatif honnête pour choisir l'outil qui convient à votre activité.",
    intro:
      "Wix est un créateur de site très complet, avec des centaines de modèles et un éditeur où l'on place chaque élément soi-même. Sitaly part de l'autre bout : vous décrivez votre activité, l'IA écrit et publie le site, et vous le retouchez en lui parlant.",
    choisirSitaly: [
      "Vous voulez un site en ligne aujourd'hui, sans passer vos soirées à le construire.",
      "Vous préférez dire ce que vous voulez changer plutôt que déplacer des blocs.",
      "Vous voulez votre nom de domaine compris, même en payant au mois.",
    ],
    choisirAutre: [
      "Vous voulez régler chaque détail de la mise en page vous-même.",
      "Vous avez besoin d'une boutique en ligne complète ou d'applications spécialisées.",
    ],
    lignes: [
      {
        critere: "Création du site",
        sitaly: creationSitaly,
        autre: "Un modèle à choisir parmi plus de 900, à remplir et ajuster dans l'éditeur",
      },
      {
        critere: "Modifications",
        sitaly: "En une phrase à l'IA, ou à la main dans l'éditeur",
        autre: "Dans l'éditeur glisser-déposer",
      },
      {
        critere: "Prix d'entrée payant",
        sitaly: prixSitaly,
        autre: "Light à 16,80 €/mois TTC, payé à l'année",
      },
      {
        critere: "Nom de domaine",
        sitaly: domaineSitaly,
        autre: "Offert la première année avec un forfait Premium annuel",
      },
      {
        critere: "Boutique en ligne",
        sitaly: "Pas encore : Sitaly fait des sites vitrines",
        autre: "Oui, à partir du forfait Essentiel (30 €/mois TTC)",
      },
      {
        critere: "Assistance",
        sitaly: "Une équipe en France, par e-mail",
        autre: "Assistance en français",
      },
    ],
    faq: [
      {
        q: "Puis-je passer de Wix à Sitaly ?",
        a: "Oui. Décrivez votre activité : l'IA crée un nouveau site en une minute. Vous reprenez ensuite vos textes et vos photos en les donnant à l'IA, et vous reliez votre nom de domaine quand le site vous plaît.",
      },
      {
        q: "Wix a aussi de l'IA : quelle différence ?",
        a: "Wix propose des outils d'IA dans un éditeur complet, pensé pour qui veut tout régler. Sitaly est construit autour de l'IA : pas de modèle à remplir ni de blocs à placer, vous parlez à votre site et il se met à jour.",
      },
    ],
    sources: [{ label: "Tarifs Wix", url: "https://fr.wix.com/pricing" }],
  },
  {
    id: "wordpress",
    nom: "WordPress",
    colonne: "WordPress",
    titre: "Sitaly ou WordPress : lequel choisir pour votre site ?",
    description:
      "Sitaly ou WordPress : temps de création, hébergement, mises à jour, coût réel. Le comparatif pour choisir sans se tromper.",
    intro:
      "WordPress fait tourner une grande partie du web : il peut tout faire, à condition de le choisir, l'installer, l'héberger, le mettre à jour et le sécuriser. Sitaly s'occupe de tout cela à votre place : vous décrivez votre activité, le site est en ligne.",
    choisirSitaly: [
      "Vous ne voulez gérer ni hébergement, ni extensions, ni mises à jour de sécurité.",
      "Vous voulez un site prêt en une minute, que vous modifiez en une phrase.",
      "Vous voulez un prix fixe, nom de domaine compris.",
    ],
    choisirAutre: [
      "Vous avez un développeur, ou le temps d'apprendre, et un projet très particulier.",
      "Vous avez besoin d'extensions précises : forum, espace membres, catalogue complexe.",
    ],
    lignes: [
      {
        critere: "Création du site",
        sitaly: creationSitaly,
        autre:
          "Choisir un hébergeur ou WordPress.com, installer un thème, des extensions, puis écrire chaque page",
      },
      {
        critere: "Hébergement",
        sitaly: "Compris, sécurisé en HTTPS",
        autre:
          "Gratuit à installer, mais l'hébergement se paie à part (ou une formule WordPress.com)",
      },
      {
        critere: "Mises à jour et sécurité",
        sitaly: "Faites par Sitaly",
        autre: "WordPress, le thème et les extensions sont à mettre à jour régulièrement",
      },
      {
        critere: "Textes et photos",
        sitaly: "Écrits et créés par l'IA, pour votre métier",
        autre: "À écrire et à trouver vous-même",
      },
      {
        critere: "Prix",
        sitaly: prixSitaly,
        autre: "Hébergement, thème, extensions et éventuellement un prestataire, selon vos choix",
      },
      {
        critere: "Nom de domaine",
        sitaly: domaineSitaly,
        autre:
          "Offert la première année sur les formules annuelles de WordPress.com ; sinon à acheter",
      },
    ],
    faq: [
      {
        q: "WordPress est gratuit : pourquoi payer Sitaly ?",
        a: "Le logiciel WordPress est gratuit, pas le site : il faut un hébergement, souvent un thème et des extensions payants, et du temps pour l'installer et le maintenir. Avec Sitaly, tout est compris dans un prix fixe, et la formule Découverte permet de commencer sans payer.",
      },
      {
        q: "Mon site Sitaly sera-t-il bien référencé ?",
        a: "Oui : titres, descriptions, plan du site et données pour Google sont préparés dès la publication, et le site est rapide car il ne charge rien d'inutile.",
      },
    ],
    sources: [{ label: "Tarifs WordPress.com", url: "https://wordpress.com/fr/pricing/" }],
  },
  {
    id: "squarespace",
    nom: "Squarespace",
    colonne: "Squarespace",
    titre: "Sitaly ou Squarespace : lequel choisir pour votre site ?",
    description:
      "Sitaly ou Squarespace : création, prix, nom de domaine, langue. Le comparatif pour choisir l'outil qui convient à votre activité.",
    intro:
      "Squarespace est connu pour ses modèles soignés, très appréciés des créatifs. Sitaly vise le même résultat professionnel sans passer par un modèle à remplir : l'IA écrit votre site à partir d'une phrase.",
    choisirSitaly: [
      "Vous voulez commencer gratuitement, sans carte bancaire.",
      "Vous voulez que les textes soient écrits pour vous, en français.",
      "Vous voulez votre nom de domaine compris, même en payant au mois.",
    ],
    choisirAutre: [
      "Vous voulez partir d'un modèle très graphique et tout mettre en forme vous-même.",
      "Vous avez besoin de fonctions de vente avancées.",
    ],
    lignes: [
      {
        critere: "Création du site",
        sitaly: creationSitaly,
        autre: "Un modèle à choisir et à remplir",
      },
      {
        critere: "Formule gratuite",
        sitaly: "Oui, Découverte : le site est en ligne sur nom.sitaly.fr",
        autre: "Non, un essai gratuit avant de payer",
      },
      {
        critere: "Prix d'entrée payant",
        sitaly: prixSitaly,
        autre: "Basic à 14,40 €/mois payé à l'année, 20,40 € au mois (TTC estimée)",
      },
      {
        critere: "Nom de domaine",
        sitaly: domaineSitaly,
        autre: "Offert la première année avec un abonnement annuel",
      },
      {
        critere: "Modifications",
        sitaly: "En une phrase à l'IA, ou à la main dans l'éditeur",
        autre: "Dans l'éditeur du modèle",
      },
    ],
    faq: [
      {
        q: "Le design d'un site Sitaly est-il aussi soigné ?",
        a: "Sitaly propose quatre thèmes soignés, et l'IA adapte couleurs, photos et mise en page à votre métier. Vous changez de thème en un clic, vos textes restent.",
      },
    ],
    sources: [{ label: "Tarifs Squarespace", url: "https://fr.squarespace.com/tarifs" }],
  },
  {
    id: "agence",
    nom: "une agence web",
    colonne: "Agence web",
    titre: "Sitaly ou une agence web : que choisir pour votre site ?",
    description:
      "Créer son site avec Sitaly ou le confier à une agence web : délai, prix, autonomie. Ce qui convient à chaque projet.",
    intro:
      "Une agence crée un site sur mesure, avec des rendez-vous, des maquettes et un devis. Pour beaucoup d'indépendants et de petites entreprises, Sitaly suffit : un site professionnel en une minute, à un prix fixe. Et si votre projet demande plus, l'équipe Sitaly fait aussi du sur-mesure.",
    choisirSitaly: [
      "Vous voulez être en ligne cette semaine, pas dans deux mois.",
      "Vous voulez modifier votre site vous-même, sans attendre ni payer chaque changement.",
      "Votre budget est celui d'un abonnement, pas d'un devis de plusieurs milliers d'euros.",
    ],
    choisirAutre: [
      "Votre projet a des besoins très particuliers : outil métier, intégrations, identité complète.",
      "Vous préférez tout déléguer, avec un interlocuteur qui s'occupe de chaque détail.",
    ],
    lignes: [
      {
        critere: "Délai",
        sitaly: "Une minute pour la première version, en ligne aussitôt",
        autre: "Plusieurs semaines : rendez-vous, maquettes, allers-retours",
      },
      {
        critere: "Prix",
        sitaly: prixSitaly,
        autre: "Sur devis, souvent plusieurs milliers d'euros, plus la maintenance",
      },
      {
        critere: "Modifications",
        sitaly: "Vous-même, en une phrase, quand vous voulez",
        autre: "Par l'agence, selon le contrat",
      },
      {
        critere: "Sur-mesure",
        sitaly: "Thèmes et sections adaptés à votre métier",
        autre: "Entièrement sur mesure",
      },
      { critere: "Nom de domaine", sitaly: domaineSitaly, autre: "Selon le devis" },
    ],
    faq: [
      {
        q: "Et si mon projet dépasse ce que fait Sitaly ?",
        a: "L'équipe Sitaly crée aussi des sites et des outils sur mesure. Décrivez votre projet sur la page dédiée, nous vous rappelons.",
      },
    ],
    sources: [],
  },
];

export const getComparatif = (id: string) => COMPARATIFS.find((c) => c.id === id);
