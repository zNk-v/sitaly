import { A_LA_CARTE, type OffreId } from "@/data/offres";
import { euros } from "@/lib/config";

/**
 * Le texte des pages d'offre /offres/<id>/ (23 octobre 2026), sur le modèle
 * des pages d'offre de devmiweb.com : chaque entrée du menu mène à une page
 * qui explique l'offre cliquée.
 *
 * Les prix, ce qui est compris et l'écart avec les offres voisines viennent de
 * src/data/offres.ts : ce fichier ne porte que le texte propre à chaque offre.
 * Les offres qui ont déjà leur page (boutique, agents IA, outil sur mesure)
 * n'y figurent pas.
 */

export interface Etape {
  titre: string;
  texte: string;
}

export interface PageOffre {
  id: OffreId;
  /** Ce que l'offre est, pour le titre de l'onglet : « site vitrine et fiche Google ». */
  sujet: string;
  h1: string;
  intro: string;
  pourQui: string[];
  etapes: Etape[];
  faq: { q: string; a: string }[];
}

const prixALaCarte = (debut: string) =>
  euros(A_LA_CARTE.find((a) => a.libelle.startsWith(debut))?.prix ?? 0);

/** Les trois premières étapes d'un site Présence. La quatrième dit ce que fait l'abonnement. */
const ETAPES_SITE: Etape[] = [
  {
    titre: "Quatre questions, puis un appel",
    texte:
      "Vous répondez au questionnaire, puis nous parlons trente minutes de votre activité, de vos clients et des communes où vous travaillez.",
  },
  {
    titre: "Nous écrivons vos pages",
    texte:
      "Nous rédigeons les textes à partir de l'appel. Vous relisez et vous corrigez avant la mise en ligne.",
  },
  {
    titre: "Mise en ligne",
    texte:
      "Le site part en ligne sur votre nom de domaine, et nous remettons votre fiche Google en ordre.",
  },
];

export const PAGES_OFFRES: PageOffre[] = [
  {
    id: "presence",
    sujet: "site vitrine et fiche Google gérée",
    h1: "Présence : le site vitrine pour être trouvé dans votre commune",
    intro:
      "Vous recevez cinq pages rédigées pour vous, hébergées et tenues à jour. Nous gérons votre fiche Google et répondons à vos avis. Quand un client cherche votre métier dans votre commune, il tombe sur vous.",
    pourQui: [
      "Vous travaillez surtout dans votre commune et autour.",
      "Vous n'avez pas de site, ou un site que personne ne trouve.",
      "Vous voulez un site qui tourne sans vous en occuper.",
    ],
    etapes: [
      ...ETAPES_SITE,
      {
        titre: "Chaque mois",
        texte:
          "Une modification faite par nous, les mises à jour, les sauvegardes et les réponses à vos avis Google.",
      },
    ],
    faq: [
      {
        q: "Cinq pages, ça suffit ?",
        a: `Pour une activité locale, oui : accueil, prestations, réalisations, à propos et contact. Une page de plus coûte ${prixALaCarte("Page supplémentaire")}, une fois.`,
      },
      {
        q: "Je peux passer à Présence Pro plus tard ?",
        a: `Oui, à tout moment, pour ${prixALaCarte("Passage")} une fois. Vos pages restent en place : nous ajoutons les pages locales et le suivi de votre fiche.`,
      },
    ],
  },
  {
    id: "presence-pro",
    sujet: "site vitrine, pages locales et avis Google",
    h1: "Présence Pro : être trouvé aussi dans les communes voisines",
    intro:
      "Dix pages, dont cinq écrites pour les communes où vous vous déplacez. Chaque mois, nous publions des posts et des photos sur votre fiche Google, et vos clients reçoivent une demande d'avis après votre passage. C'est l'offre que nous conseillons à la plupart de nos clients.",
    pourQui: [
      "Vous vous déplacez dans plusieurs communes.",
      "Vous avez peu d'avis Google, ou des avis anciens.",
      "Vous voulez savoir chaque mois ce que votre site vous apporte.",
    ],
    etapes: [
      ...ETAPES_SITE,
      {
        titre: "Chaque mois",
        texte:
          "Des posts et des photos sur votre fiche, une demande d'avis après chaque prestation, une modification faite par nous et un rapport mensuel.",
      },
    ],
    faq: [
      {
        q: "À quoi servent les pages locales ?",
        a: "Une page par commune où vous travaillez, avec ce que vous y faites. Google la montre à ceux qui cherchent votre métier dans cette commune, là où votre page d'accueil seule ne ressortirait pas.",
      },
      {
        q: "Comment part la demande d'avis ?",
        a: "Après chaque prestation, votre client reçoit un message avec le lien direct vers votre fiche Google. Il laisse son avis en un clic, et vous n'avez rien à relancer.",
      },
    ],
  },
  {
    id: "presence-expert",
    sujet: "site vitrine, articles et visibilité dans les IA",
    h1: "Présence Expert : quand vos concurrents sont déjà en tête",
    intro:
      "Quinze pages, dont dix locales, deux articles par mois et des textes écrits pour que ChatGPT et Gemini vous comprennent. Nous suivons dix mots-clés sur Google et vingt questions posées aux IA, et nous faisons le point avec vous chaque trimestre en visio.",
    pourQui: [
      "Votre métier est disputé dans votre secteur.",
      "Vos clients comparent avant d'appeler, sur Google et dans ChatGPT.",
      "Vous voulez des modifications sans compter.",
    ],
    etapes: [
      ...ETAPES_SITE,
      {
        titre: "Chaque mois",
        texte:
          "Deux articles, des posts et des photos sur votre fiche, des demandes d'avis, vos modifications sans limite et un rapport. Un bilan en visio chaque trimestre.",
      },
    ],
    faq: [
      {
        q: "Qui écrit les articles ?",
        a: "Nous, à partir des questions que vos clients vous posent. Vous les relisez avant publication si vous le souhaitez.",
      },
      {
        q: "Que veut dire « être cité par les IA » ?",
        a: "Quand quelqu'un demande à ChatGPT ou à Gemini un professionnel de votre métier près de chez lui, l'IA s'appuie sur des pages claires et structurées. Nous écrivons vos textes pour qu'elle les comprenne, et chaque trimestre nous vérifions sur vingt questions si elle vous cite.",
      },
    ],
  },
  {
    id: "maintenance",
    sujet: "maintenance de site WordPress ou autre",
    h1: "La maintenance d'un site que vous avez déjà",
    intro:
      "Votre site a été fait ailleurs, sous WordPress ou avec un autre outil, et personne ne s'en occupe plus. Nous l'auditons au départ, puis chaque mois nous le sauvegardons, le mettons à jour et corrigeons les petits problèmes.",
    pourQui: [
      "Votre site vous convient, mais personne ne le met à jour.",
      "Votre ancien prestataire ne répond plus.",
      "Vous craignez une panne ou un piratage.",
    ],
    etapes: [
      {
        titre: "Vous nous donnez les accès",
        texte:
          "Hébergement, administration du site, nom de domaine : nous listons ensemble ce qu'il nous faut.",
      },
      {
        titre: "L'audit de départ",
        texte:
          "Nous vérifions les versions, les extensions, les sauvegardes et la sécurité. Si le site demande une remise en état, vous recevez un devis séparé avant tout travail.",
      },
      {
        titre: "Chaque mois",
        texte: "Une sauvegarde, les mises à jour, et un contrôle que tout fonctionne après.",
      },
      {
        titre: "Les petites corrections",
        texte: "Un texte à changer, un lien cassé : vous nous écrivez, nous corrigeons.",
      },
    ],
    faq: [
      {
        q: "Mon site est sous WordPress, Wix ou autre : vous le prenez ?",
        a: "WordPress, oui. Pour les autres outils, nous regardons pendant l'audit ce qu'il est possible de faire, et nous vous le disons avant de commencer l'abonnement.",
      },
      {
        q: "Et si mon site est trop ancien ?",
        a: "L'audit le dit. Vous choisissez alors entre une remise en état, chiffrée à part, et une refonte complète.",
      },
    ],
  },
];

export function pageOffre(id: string): PageOffre | undefined {
  return PAGES_OFFRES.find((p) => p.id === id);
}
