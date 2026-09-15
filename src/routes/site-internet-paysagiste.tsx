import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-paysagiste/";
const TITLE = "Site internet paysagiste : créations, entretien et devis | Sitaly";
const DESCRIPTION =
  "Site internet paysagiste : portfolio de jardins, contrats d'entretien, crédit d'impôt expliqué, pages par commune. SEO local, livré en 48h, abonnement mensuel sans engagement.";

const FAQ = [
  {
    q: "Comment présenter l'avantage fiscal sur l'entretien de jardin ?",
    a: "Les petits travaux de jardinage chez un particulier ouvrent droit à un crédit d'impôt au titre des services à la personne, sous conditions et dans la limite d'un plafond annuel. La page l'explique en langage clair et renvoie vers la source officielle. Pour un client, un entretien dont une partie revient en crédit d'impôt change la décision.",
  },
  {
    q: "La création et l'entretien doivent-ils être séparés ?",
    a: "Oui. La création d'un jardin est un projet ponctuel à forte valeur, que le client compare longuement sur photos. L'entretien est un contrat récurrent, choisi pour la fiabilité et la proximité. Les deux se cherchent avec des mots différents et ne convainquent pas avec les mêmes arguments.",
  },
  {
    q: "Mes jardins sont beaux au printemps, et le reste de l'année ?",
    a: "Le site suit les saisons : création et engazonnement au printemps, arrosage automatique avant l'été, élagage et taille à l'automne, contrats d'entretien à la rentrée. On met en avant la bonne prestation au bon moment, et les pages restent en ligne toute l'année pour Google.",
  },
  {
    q: "J'ai des photos sur Instagram, faut-il un site en plus ?",
    a: "Instagram montre votre travail à ceux qui vous suivent déjà. Le site vous fait trouver par ceux qui cherchent « paysagiste + commune » sur Google et ne vous connaissent pas. Vos meilleures photos Instagram peuvent alimenter le portfolio du site, qui lui se référence.",
  },
  {
    q: "Je travaille aussi pour des copropriétés et des entreprises, ça se voit ?",
    a: "Une entrée dédiée présente l'entretien d'espaces verts pour copropriétés, sièges d'entreprise et commerces, avec vos références et vos attestations. Ces contrats pèsent lourd dans un chiffre d'affaires de paysagiste, et leurs décideurs cherchent aussi sur Google.",
  },
];

const INCLUDED = [
  {
    title: "Portfolio de jardins par projet",
    desc: "Chaque création présentée avec le terrain de départ, le plan, les végétaux choisis et le résultat. Le client se projette dans son propre jardin.",
  },
  {
    title: "Page contrats d'entretien",
    desc: "Fréquence de passage, prestations comprises, avantage fiscal expliqué. Chaque contrat signé vous assure un revenu régulier sur plusieurs saisons.",
  },
  {
    title: "Une page par prestation",
    desc: "Création de jardin, terrasse bois, clôture et portail, arrosage automatique, élagage, engazonnement. Chaque prestation vise ses recherches et sa saison.",
  },
  {
    title: "Entrée professionnels et copropriétés",
    desc: "Entretien d'espaces verts pour syndics, entreprises et collectivités. Références, attestations, capacité d'équipe.",
  },
  {
    title: "Pages par commune desservie",
    desc: "Les communes où vous travaillez, avec un jardin réalisé sur place quand vous en avez un. C'est ce qui vous fait apparaître sur « paysagiste + commune » au-delà de votre siège.",
  },
  {
    title: "Hébergement, maintenance et modifications",
    desc: "Domaine, SSL, sauvegardes et vos changements. Une création terminée : vous envoyez les photos, on ajoute le projet au portfolio.",
  },
];

const LOCAL_SEO = {
  title: "Le jardin se vend en images, le contrat se vend en proximité",
  paragraphs: [
    "Un propriétaire qui veut refaire son jardin cherche d'abord de l'inspiration, puis un professionnel dont les réalisations ressemblent à ce qu'il imagine. Il regarde les photos, longtemps. Un portfolio classé par projet, avec l'état de départ et le résultat, retient ce visiteur là où une galerie en vrac le perd.",
    "Le client d'entretien raisonne autrement. Il veut quelqu'un de fiable, qui passe à date fixe et qui habite près de chez lui. Il tape « entretien jardin + commune » et regarde la fiche Google, les avis et la distance. Les pages par commune et une fiche Google Business Profile bien tenue répondent à cette recherche.",
    "Les deux activités se renforcent. Un client d'entretien satisfait finit par demander une terrasse ou une haie nouvelle, et un jardin créé débouche sur un contrat d'entretien. Le site est construit pour faire circuler le visiteur d'une offre à l'autre.",
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
      h1="Site internet paysagiste : des jardins qui donnent envie, des contrats qui durent"
      intro="Un portfolio qui fait rêver les projets de création, une page qui vend l'entretien récurrent, et un référencement commune par commune."
      benefits={[
        {
          title: "Le projet en images",
          desc: "État de départ, plan, végétaux, résultat. Le visiteur se projette dans son jardin avant même de vous appeler.",
        },
        {
          title: "Le revenu récurrent",
          desc: "Une page entretien qui explique l'avantage fiscal et le passage à date fixe. Les contrats signés tiennent sur plusieurs années.",
        },
        {
          title: "Le bon message à la bonne saison",
          desc: "Création au printemps, élagage à l'automne, contrats à la rentrée. Le site suit votre calendrier de travail.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
