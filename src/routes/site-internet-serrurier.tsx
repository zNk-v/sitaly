import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-serrurier/";
const TITLE = "Site internet serrurier : urgence et confiance | Sitaly";
const DESCRIPTION =
  "Site internet serrurier qui prouve votre sérieux : adresse réelle, tarifs annoncés, avis vérifiables, appel en un geste. SEO local, livré en 48h, abonnement mensuel sans engagement.";

const FAQ = [
  {
    q: "Comment me distinguer des faux serruriers qui inondent Google ?",
    a: "Par tout ce qu'ils ne peuvent pas montrer : une adresse d'atelier réelle, un nom, un visage, un SIRET, des avis Google anciens et nombreux, une grille de prix de base. Le client échaudé par les histoires de porte ouverte à 800 € cherche ces signes. Votre site les rassemble en haut de page.",
  },
  {
    q: "Faut-il afficher mes tarifs ?",
    a: "Dans ce métier, oui. Un tarif de déplacement et une fourchette pour une ouverture de porte claquée désamorcent la peur de l'arnaque. Le client appelle en sachant à quoi s'attendre, et la conversation au téléphone porte sur le délai, pas sur la méfiance.",
  },
  {
    q: "L'urgence de nuit vaut-elle une page à part ?",
    a: "Si vous intervenez la nuit ou le week-end, oui, avec la majoration annoncée. « Serrurier ouvert dimanche » ou « serrurier nuit + ville » sont des recherches à très forte intention. Si vous ne le faites pas, le site le dit clairement, et vous évitez les appels à 2 heures du matin.",
  },
  {
    q: "L'urgence ne suffit-elle pas à faire tourner l'activité ?",
    a: "L'urgence coûte cher à acquérir et ne fidélise pas. Le site met aussi en avant les prestations planifiées : remplacement de serrure après un vol, porte blindée, blindage de porte existante, contrôle d'accès pour les copropriétés et les commerces. Ces chantiers ont une valeur plus élevée et une concurrence moins agressive.",
  },
  {
    q: "Pourquoi la publicité Google coûte-t-elle si cher pour un serrurier ?",
    a: "La serrurerie d'urgence fait partie des recherches locales où le clic coûte le plus cher, parce que la concurrence est forte et que chaque appel vaut une intervention. Un site qui transforme bien les visiteurs réduit ce coût par appel. Notre calculateur de budget donne un ordre de grandeur pour votre zone.",
  },
];

const INCLUDED = [
  {
    title: "Bloc « serrurier vérifiable »",
    desc: "Nom du dirigeant, adresse de l'atelier, SIRET, assurance, ancienneté, note Google. Tout ce qu'une plateforme d'appels anonyme ne peut pas afficher.",
  },
  {
    title: "Tarifs de base annoncés",
    desc: "Déplacement, ouverture de porte claquée, ouverture de porte fermée à clé, majorations de nuit et de week-end. Le prix affiché désamorce la peur avant l'appel.",
  },
  {
    title: "Page urgence optimisée mobile",
    desc: "Appel en un geste, délai d'arrivée annoncé, zone couverte. La page s'affiche en moins d'une seconde sur un téléphone dans une cage d'escalier.",
  },
  {
    title: "Pages prestations planifiées",
    desc: "Porte blindée, changement de cylindre, serrure multipoints, remplacement après effraction, contrôle d'accès. Des chantiers de plus grande valeur, moins disputés.",
  },
  {
    title: "Page sinistre et assurance",
    desc: "Démarches après un cambriolage, facture détaillée pour l'assureur, mise en sécurité provisoire. Le client en état de choc appelle celui qui le guide.",
  },
  {
    title: "Hébergement, maintenance et modifications",
    desc: "Domaine, SSL, sauvegardes et vos changements. Un tarif qui évolue, une nouvelle commune couverte : vous écrivez, on met à jour.",
  },
];

const LOCAL_SEO = {
  title: "En serrurerie, la confiance se gagne avant l'appel",
  paragraphs: [
    "La serrurerie d'urgence souffre d'une réputation abîmée par des réseaux qui achètent des annonces, affichent de fausses adresses locales et facturent des montants abusifs. Le client le sait. Quand il cherche « serrurier + ville », il ne choisit plus le premier résultat : il vérifie l'adresse, la note, l'ancienneté des avis.",
    "Votre avantage d'artisan installé est d'avoir tout ça pour de vrai. Le site le montre sans détour, et la fiche Google Business Profile le confirme : adresse vérifiée, photos de l'atelier et du véhicule, avis qui citent votre prénom. Google tient compte de la cohérence de ces informations pour classer les fiches locales.",
    "Les recherches planifiées complètent l'urgence. « Porte blindée + ville », « changer serrure après cambriolage », « digicode copropriété » amènent des clients qui ont le temps de comparer et un budget plus élevé. Ce sont ces pages qui équilibrent l'activité quand les appels d'urgence ralentissent.",
  ],
};

export const Route = createFileRoute("/site-internet-serrurier")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "serrurier",
      faq: FAQ,
    }),
  component: SerrurierLanding,
});

function SerrurierLanding() {
  return (
    <MetierLanding
      metier="serrurier"
      metierCapitalized="Serrurier"
      route="/site-internet-serrurier/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Site internet serrurier : prouvez que vous êtes le vrai artisan du coin"
      intro="Adresse réelle, tarifs annoncés, avis vérifiables et appel en un geste. Le site qui rassure un client méfiant en quelques secondes."
      benefits={[
        {
          title: "La preuve du sérieux",
          desc: "Nom, atelier, SIRET, note Google en haut de page. Le client qui craint l'arnaque trouve de quoi vérifier avant d'appeler.",
        },
        {
          title: "Les prix avant l'appel",
          desc: "Déplacement et ouverture de porte annoncés. La peur du devis surprise disparaît, le client compose le numéro.",
        },
        {
          title: "Au-delà de l'urgence",
          desc: "Portes blindées, remplacement après vol, contrôle d'accès : des chantiers planifiés qui stabilisent le chiffre d'affaires.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
