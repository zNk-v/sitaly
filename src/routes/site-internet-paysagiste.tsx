import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-paysagiste/";
const TITLE = "Création site internet paysagiste : en 1 minute avec l'IA";
const DESCRIPTION =
  "Site internet paysagiste créé par l'IA en une minute : vos jardins, l'entretien, vos tarifs. Aperçu gratuit, vous le modifiez vous-même, en une phrase.";

const FAQ = [
  {
    q: "Comment présenter l'avantage fiscal sur l'entretien de jardin ?",
    a: "Les petits travaux de jardinage chez un particulier ouvrent droit à un crédit d'impôt au titre des services à la personne, sous conditions et dans la limite d'un plafond annuel. Demandez à l'IA un paragraphe qui l'explique en langage clair, avec un lien vers la source officielle. Pour un client, un entretien dont une partie revient en crédit d'impôt change la décision.",
  },
  {
    q: "La création et l'entretien doivent-ils être séparés ?",
    a: "Oui. La création d'un jardin est un projet ponctuel à forte valeur, que le client compare des semaines sur photos. L'entretien est un contrat récurrent, choisi pour la fiabilité et la proximité. Les deux se cherchent avec des mots différents. Avec Essentiel (4 pages) ou Pro (8 pages), chacun a sa page et ses arguments.",
  },
  {
    q: "Mes jardins sont beaux au printemps, et le reste de l'année ?",
    a: "Vous changez la mise en avant selon la saison : création et engazonnement au printemps, arrosage automatique avant l'été, élagage et taille à l'automne, contrats d'entretien à la rentrée. Vous l'écrivez à l'IA en une phrase. Les pages de prestations restent en ligne toute l'année pour Google.",
  },
  {
    q: "J'ai des photos sur Instagram, faut-il un site en plus ?",
    a: "Instagram montre votre travail à ceux qui vous suivent déjà. Le site vous fait trouver par ceux qui cherchent « paysagiste + commune » sur Google et ne vous connaissent pas. Vos meilleures photos Instagram peuvent rejoindre le site : vous les ajoutez depuis votre téléphone.",
  },
  {
    q: "Je travaille aussi pour des copropriétés et des entreprises, ça se voit ?",
    a: "Avec Essentiel ou Pro, vous créez une page pour l'entretien d'espaces verts des copropriétés, sièges d'entreprise et commerces, avec vos références et vos attestations. Ces contrats pèsent lourd dans le chiffre d'affaires d'un paysagiste, et leurs décideurs cherchent aussi sur Google.",
  },
  {
    q: "Combien coûte un site internet paysagiste avec Sitaly ?",
    a: "L'aperçu ne coûte rien : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, Essentiel coûte 19 € par mois les 3 premiers mois, puis 39 €, avec 4 pages et votre nom de domaine offert. Pro coûte 79 € par mois, avec 8 pages. Sans engagement, et satisfait ou remboursé pendant 30 jours.",
  },
  {
    q: "Faut-il savoir coder pour créer mon site ?",
    a: "Non. Vous répondez à trois questions sur votre activité, l'IA écrit les textes et monte la mise en page. Pour ajouter un jardin ou changer un tarif d'entretien, vous l'écrivez en une phrase et l'IA modifie le site.",
  },
];

const INCLUDED = [
  {
    title: "Portfolio de jardins par projet",
    desc: "Vous ajoutez les photos du terrain de départ, des travaux et du résultat. Vous décrivez la création en une phrase, l'IA écrit le texte qui l'accompagne.",
  },
  {
    title: "Page contrats d'entretien",
    desc: "Fréquence de passage, prestations comprises, crédit d'impôt expliqué. Chaque contrat signé vous assure un revenu sur plusieurs saisons.",
  },
  {
    title: "Une page par prestation",
    desc: "Création de jardin, terrasse bois, clôture, arrosage automatique, élagage, engazonnement. Essentiel compte 4 pages, Pro en compte 8, chacune avec ses photos et ses tarifs.",
  },
  {
    title: "Une page professionnels et copropriétés",
    desc: "Entretien d'espaces verts pour syndics, entreprises et collectivités. Références, attestations, taille d'équipe.",
  },
  {
    title: "Visite du terrain réservée en ligne",
    desc: "Avec Essentiel, le client choisit un créneau pour la visite depuis votre site. Vous arrivez avec un rendez-vous calé et l'adresse du terrain.",
  },
  {
    title: "Articles de saison écrits par l'IA",
    desc: "Avec Essentiel, l'IA écrit vos articles de blog : quand tailler une haie, comment préparer son gazon avant l'été. Ils répondent aux questions que vos clients tapent sur Google.",
  },
];

const LOCAL_SEO = {
  title: "Le jardin se vend en images, le contrat se vend en proximité",
  paragraphs: [
    "Un propriétaire qui veut refaire son jardin cherche d'abord de l'inspiration, puis un professionnel dont les réalisations ressemblent à ce qu'il imagine. Il passe du temps sur les photos. Un portfolio classé par projet, avec l'état de départ et le résultat, retient ce visiteur là où une galerie en vrac le perd.",
    "Le client d'entretien raisonne autrement. Il veut quelqu'un de fiable, qui passe à date fixe et qui habite près de chez lui. Il tape « entretien jardin + commune » et regarde la fiche Google, les avis et la distance. Écrivez sur votre site les communes que vous desservez, et tenez à jour votre fiche Google Business Profile : vous répondez à cette recherche.",
    "Les deux activités se renforcent. Un client d'entretien satisfait finit par demander une terrasse ou une haie nouvelle, et un jardin créé débouche sur un contrat d'entretien. Mettez les deux offres sur le même site : le visiteur venu pour une terrasse découvre l'entretien, et l'inverse.",
  ],
};

export const Route = createFileRoute("/site-internet-paysagiste")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "paysagiste",
      faq: FAQ,
    }),
  component: PaysagisteLanding,
});

function PaysagisteLanding() {
  return (
    <MetierLanding
      metier="paysagiste"
      metierCapitalized="Paysagiste"
      route="/site-internet-paysagiste/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Création de site internet pour paysagiste, en 1 minute avec l'IA"
      intro="Vous décrivez vos créations de jardin et vos contrats d'entretien, et l'IA écrit votre site en une minute. Vous le publiez, puis vous ajoutez vos jardins au fil des saisons, depuis votre téléphone."
      benefits={[
        {
          title: "Le projet en images",
          desc: "Terrain de départ, végétaux choisis, résultat : vous ajoutez les photos de chaque création. Le visiteur se projette dans son jardin avant de vous appeler.",
        },
        {
          title: "Le revenu récurrent",
          desc: "Une page entretien qui explique le crédit d'impôt et le passage à date fixe. Un contrat signé tient plusieurs saisons.",
        },
        {
          title: "Le bon message à la bonne saison",
          desc: "Création au printemps, élagage à l'automne, contrats à la rentrée. Vous changez la mise en avant en une phrase à l'IA.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
