import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-macon/";
const TITLE = "Création site internet maçon : gratuit avec l'IA | Sitaly";
const DESCRIPTION =
  "Votre site internet maçon créé par l'IA en une minute : extension, mur porteur, dalle, chantiers en photos. Gratuit pour commencer, vous le modifiez vous-même.";

const FAQ = [
  {
    q: "Combien coûte un site internet maçon avec Sitaly ?",
    a: "0 € avec Découverte : une page créée par l'IA et mise en ligne avec HTTPS. Essentiel coûte 39 €/mois, avec jusqu'à 4 pages et un nom de domaine offert. Pro coûte 79 €/mois, avec jusqu'à 8 pages et une mise en place avec un expert Sitaly. Toutes les formules sont sans engagement, et vous commencez sans carte bancaire.",
  },
  {
    q: "Faut-il savoir coder ?",
    a: "Non. Vous répondez à trois questions et l'IA écrit le site. Ensuite, pour ajouter un chantier ou changer un texte, vous écrivez la demande en une phrase, depuis votre téléphone.",
  },
  {
    q: "Mes chantiers durent des semaines, comment les montrer ?",
    a: "Par étapes. Depuis l'application, vous photographiez la fondation, l'élévation puis la finition, et chaque photo rejoint la galerie du site avec une légende écrite par l'IA. Un client qui engage le prix d'une extension veut voir votre méthode à chaque stade.",
  },
  {
    q: "Faut-il parler des démarches administratives ?",
    a: "Oui. « Faut-il un permis pour une extension de 20 m² ? » revient souvent avant un projet. Avec Essentiel, l'IA écrit des articles de blog sur ces questions : déclaration préalable, permis de construire, recours à un architecte. Ils attirent des propriétaires en phase de décision et montrent que vous connaissez le sujet.",
  },
  {
    q: "Je refuse les petits travaux, le site peut-il filtrer ?",
    a: "Annoncez un montant minimum d'intervention sur le site, en une phrase à l'IA. Les demandes arrivent par écrit via le formulaire : vous les lisez avant de rappeler et vous gardez celles qui vous intéressent. Les reprises de joint à 200 € se font plus rares.",
  },
  {
    q: "Mon rayon d'intervention est large, c'est un problème pour Google ?",
    a: "Un maçon se déplace plus loin qu'un plombier, parce que le chantier dure. Citez dans vos textes les communes où vous travaillez et légendez vos photos de chantier avec la ville. Google associe ainsi votre entreprise à toute la zone et pas seulement à votre siège.",
  },
  {
    q: "Comment rassurer sur l'ouverture d'un mur porteur ?",
    a: "En montrant la méthode : étude de structure, étaiement, pose de la poutre, reprise des charges. Avec Essentiel ou Pro, une page dédiée détaille ces étapes et affiche votre assurance décennale. Le client inquiet choisit l'artisan qui lui explique le mieux son chantier.",
  },
];

const INCLUDED = [
  {
    title: "Galerie de chantier étape par étape",
    desc: "Fondations, élévation, finitions : vous prenez la photo sur place, l'IA écrit la légende et la photo rejoint la galerie. La preuve d'un travail propre se voit dans les étapes cachées.",
  },
  {
    title: "Une page par type d'ouvrage",
    desc: "Extension, surélévation, ouverture de mur porteur, dalle béton, mur de clôture. Jusqu'à 4 pages avec Essentiel, 8 avec Pro : chaque ouvrage a son vocabulaire et ses recherches.",
  },
  {
    title: "Articles sur les démarches",
    desc: "Déclaration préalable, permis de construire, recours à un architecte selon la surface. Avec Essentiel, l'IA écrit ces articles de blog, qui répondent aux questions posées avant la demande de devis.",
  },
  {
    title: "Demandes de devis et visites",
    desc: "Les demandes arrivent par le formulaire du site. Avec Essentiel, le client réserve une visite en ligne et un agent prépare votre réponse. Vous validez avant chaque envoi.",
  },
  {
    title: "Assurances et garanties en évidence",
    desc: "Décennale avec le nom de l'assureur, garantie de parfait achèvement, SIRET. Sur un chantier à cinq chiffres, le client les cherche avant de vous appeler.",
  },
  {
    title: "Hébergement, devis et factures",
    desc: "En ligne avec HTTPS dès la formule gratuite, devis illimités compris. Essentiel ajoute un nom de domaine offert, les factures illimitées et la relance des impayés à J+1, J+8 et J+15, utile sur les acomptes d'un long chantier.",
  },
];

const LOCAL_SEO = {
  title: "Le client d'un maçon cherche longtemps avant d'appeler",
  paragraphs: [
    "Personne ne décide d'une extension en une soirée. Le propriétaire commence par des questions : combien coûte une extension au mètre carré, faut-il un permis, combien de temps durent les travaux. Il lit plusieurs pages pendant des semaines, puis il demande des devis aux entreprises dont il a lu le contenu.",
    "Un site de maçon réduit à une page d'accueil et un formulaire rate toute cette phase. Les pages par ouvrage et les articles sur les démarches servent à être trouvé pendant la réflexion. Le jour où le client passe à l'action, votre nom lui est déjà familier.",
    "Côté local, la fiche Google Business Profile reste le premier levier sur « maçon + ville ». Publiez vos photos de chantier sur la fiche au fil des mois, demandez des avis qui citent le type de travaux et gardez les mêmes coordonnées partout sur le web : la fiche monte dans le bloc des trois résultats locaux. Avec Essentiel, ces avis s'affichent aussi sur votre site.",
  ],
};

export const Route = createFileRoute("/site-internet-macon")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "maçon",
      faq: FAQ,
    }),
  component: MaconLanding,
});

function MaconLanding() {
  return (
    <MetierLanding
      metier="maçon"
      metierCapitalized="Maçon"
      route="/site-internet-macon/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Création de site internet pour maçon, gratuite avec l'IA"
      intro="Vous décrivez vos ouvrages, de l'extension à la dalle, et l'IA écrit votre site en une minute. Vous le publiez, puis vous ajoutez chaque étape de chantier en photo depuis votre téléphone."
      benefits={[
        {
          title: "La preuve par l'étape",
          desc: "Fondations, élévation, finitions en photos, prises depuis le chantier. Le client voit la qualité du travail que le crépi cache une fois l'ouvrage fini.",
        },
        {
          title: "Présent pendant la réflexion",
          desc: "Prix au mètre carré, permis, délais : avec Essentiel, l'IA écrit les articles qui répondent aux questions posées des semaines avant la demande de devis.",
        },
        {
          title: "Un site que vous tenez à jour",
          desc: "Un chantier terminé, une nouvelle commune, un tarif revu : vous l'écrivez en une phrase et l'IA modifie le site. Aucun prestataire à relancer.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
