import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-serrurier/";
const TITLE = "Création site internet serrurier : en 1 minute avec l'IA";
const DESCRIPTION =
  "Site internet serrurier créé par l'IA en une minute : adresse réelle, tarifs annoncés, appel en un geste. Aperçu gratuit, vous le modifiez vous-même.";

const FAQ = [
  {
    q: "Comment me distinguer des faux serruriers qui inondent Google ?",
    a: "Par tout ce qu'ils ne peuvent pas montrer : une adresse d'atelier réelle, un nom, un visage, un SIRET, des avis Google anciens et nombreux, une grille de prix de base. Le client échaudé par les histoires de porte ouverte à 800 € cherche ces signes. Votre site les rassemble en haut de page.",
  },
  {
    q: "Faut-il afficher mes tarifs ?",
    a: "Dans ce métier, oui. Un tarif de déplacement et une fourchette pour une ouverture de porte claquée désamorcent la peur de l'arnaque. Le client appelle en sachant à quoi s'attendre, et vous parlez au téléphone du délai d'arrivée au lieu de répondre à sa méfiance.",
  },
  {
    q: "L'urgence de nuit vaut-elle une page à part ?",
    a: "Si vous intervenez la nuit ou le week-end, oui, avec la majoration annoncée. « Serrurier ouvert dimanche » ou « serrurier nuit + ville » sont des recherches à très forte intention. Avec Essentiel ou Pro, vous demandez cette page à l'IA. Si vous ne travaillez pas la nuit, écrivez-le sur le site : vous évitez les appels à 2 heures du matin.",
  },
  {
    q: "L'urgence ne suffit-elle pas à faire tourner l'activité ?",
    a: "L'urgence coûte cher à acquérir et ne fidélise pas. Mettez aussi en avant les prestations planifiées : remplacement de serrure après un vol, porte blindée, blindage de porte existante, contrôle d'accès pour les copropriétés et les commerces. Ces chantiers ont une valeur plus élevée et une concurrence moins agressive.",
  },
  {
    q: "Combien coûte un site internet serrurier avec Sitaly ?",
    a: "L'aperçu ne coûte rien : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, Essentiel coûte 19 € par mois les 3 premiers mois, puis 39 €, avec 4 pages et votre nom de domaine offert. Pro coûte 79 € par mois, avec 8 pages. Sans engagement, et satisfait ou remboursé pendant 30 jours.",
  },
  {
    q: "Faut-il savoir coder pour créer mon site ?",
    a: "Non. Vous répondez à trois questions sur votre activité, l'IA écrit les textes et monte la mise en page. Pour changer un tarif ou ajouter une commune, vous l'écrivez en une phrase et l'IA modifie le site.",
  },
];

const INCLUDED = [
  {
    title: "Bloc « serrurier vérifiable »",
    desc: "Nom du dirigeant, adresse de l'atelier, SIRET, assurance, ancienneté. Avec Essentiel, vos avis Google s'affichent aussi sur le site. Une plateforme d'appels anonyme ne peut rien montrer de tout ça.",
  },
  {
    title: "Tarifs de base annoncés",
    desc: "Déplacement, ouverture de porte claquée, ouverture de porte fermée à clé, majorations de nuit et de week-end. Le client voit le prix avant d'appeler.",
  },
  {
    title: "Appel en un geste sur téléphone",
    desc: "Téléphone cliquable, délai d'arrivée, zone couverte. Le site est rapide et s'affiche bien sur un téléphone, même dans une cage d'escalier.",
  },
  {
    title: "Pages prestations planifiées",
    desc: "Porte blindée, changement de cylindre, serrure multipoints, remplacement après effraction, contrôle d'accès. Avec Essentiel ou Pro, chacune a sa page. Ces chantiers valent plus et sont moins disputés.",
  },
  {
    title: "Page sinistre et assurance",
    desc: "Démarches après un cambriolage, facture détaillée pour l'assureur, mise en sécurité provisoire. Le client en état de choc appelle celui qui le guide.",
  },
  {
    title: "Modifications par l'IA, à tout moment",
    desc: "Un nouveau tarif, une commune en plus : vous l'écrivez à l'IA, elle modifie le site. Vous n'attendez aucun développeur.",
  },
];

const LOCAL_SEO = {
  title: "En serrurerie, la confiance se gagne avant l'appel",
  paragraphs: [
    "La serrurerie d'urgence souffre d'une réputation abîmée par des réseaux qui achètent des annonces, affichent de fausses adresses locales et facturent des montants abusifs. Le client le sait. Quand il cherche « serrurier + ville », il ne choisit plus le premier résultat : il vérifie l'adresse, la note, l'ancienneté des avis.",
    "Votre avantage d'artisan installé : vous avez tout ça pour de vrai. Votre site le montre sans détour, et votre fiche Google Business Profile le confirme avec une adresse vérifiée, des photos de l'atelier et du véhicule, des avis qui citent votre prénom. Google tient compte de la cohérence de ces informations pour classer les fiches locales.",
    "Les recherches planifiées complètent l'urgence. « Porte blindée + ville », « changer serrure après cambriolage », « digicode copropriété » amènent des clients qui ont le temps de comparer et un budget plus élevé. Ces pages équilibrent votre activité quand les appels d'urgence ralentissent.",
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
      h1="Création de site internet pour serrurier, en 1 minute avec l'IA"
      intro="Vous décrivez votre atelier, vos tarifs et votre zone, et l'IA écrit en une minute un site qui rassure le client méfiant des faux serruriers. Vous le publiez et vous le modifiez depuis votre téléphone."
      benefits={[
        {
          title: "La preuve du sérieux",
          desc: "Nom, atelier, SIRET, note Google en haut de page. Le client qui craint l'arnaque trouve de quoi vérifier avant d'appeler.",
        },
        {
          title: "Les prix avant l'appel",
          desc: "Déplacement et ouverture de porte annoncés. Le client compose le numéro en sachant ce qu'il paiera.",
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
