import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-macon/";
const TITLE = "Site internet maçon : extensions, gros œuvre et devis | Sitaly";
const DESCRIPTION =
  "Site internet maçon qui montre vos chantiers étape par étape : extension, ouverture de mur porteur, dalle, clôture. SEO local, livré en 48h, abonnement mensuel sans engagement.";

const FAQ = [
  {
    q: "Mes chantiers durent des semaines, comment les montrer ?",
    a: "Par étapes. Une fiche chantier suit la fondation, l'élévation, la charpente et la finition, avec trois ou quatre photos à chaque stade. Un client qui engage le prix d'une extension veut voir comment vous travaillez, pas seulement le résultat.",
  },
  {
    q: "Faut-il parler des démarches administratives ?",
    a: "Oui. « Faut-il un permis pour une extension de 20 m² ? » fait partie des questions les plus cherchées avant un projet. Une page qui explique la différence entre déclaration préalable et permis de construire attire des propriétaires en phase de décision, et vous positionne comme celui qui connaît le sujet.",
  },
  {
    q: "Je refuse les petits travaux, le site peut-il filtrer ?",
    a: "Le formulaire demande la nature du projet, la surface et le délai souhaité. Vous pouvez aussi annoncer un montant minimum d'intervention. Les demandes de reprise de joint à 200 € diminuent, celles d'extension restent.",
  },
  {
    q: "Mon rayon d'intervention est large, c'est un problème pour Google ?",
    a: "Un maçon se déplace plus loin qu'un plombier, parce que le chantier dure. Le site crée des pages pour les communes où vous travaillez vraiment, avec vos chantiers réalisés sur place quand ils existent. Google associe ainsi votre entreprise à toute la zone et pas seulement à votre siège.",
  },
  {
    q: "Comment rassurer sur l'ouverture d'un mur porteur ?",
    a: "En montrant la méthode : étude de structure, étaiement, pose de la poutre, reprise des charges. Une page dédiée détaille les étapes et affiche votre assurance décennale. C'est une recherche fréquente et anxieuse, et le client choisit celui qui l'explique le mieux.",
  },
];

const INCLUDED = [
  {
    title: "Fiches chantier étape par étape",
    desc: "Fondations, élévation, finitions : vos photos classées par stade. La preuve d'un travail propre se voit dans les étapes cachées, pas seulement sur la photo finale.",
  },
  {
    title: "Une page par type d'ouvrage",
    desc: "Extension, surélévation, ouverture de mur porteur, dalle béton, mur de clôture, piscine maçonnée. Chaque ouvrage a son vocabulaire et ses recherches.",
  },
  {
    title: "Guide des démarches",
    desc: "Déclaration préalable, permis de construire, recours à un architecte selon la surface. Un contenu qui répond aux questions posées avant même la demande de devis.",
  },
  {
    title: "Formulaire de qualification",
    desc: "Type d'ouvrage, surface, délai, avancement du projet. Vous voyez si le permis est obtenu ou non avant de vous déplacer.",
  },
  {
    title: "Assurances et garanties en évidence",
    desc: "Décennale avec le nom de l'assureur, garantie de parfait achèvement, SIRET. Sur un chantier à cinq chiffres, le client les cherche avant de vous appeler.",
  },
  {
    title: "Hébergement, maintenance et modifications",
    desc: "Domaine, SSL, sauvegardes et vos changements. Un chantier terminé à ajouter à la galerie : vous envoyez les photos, on publie la fiche.",
  },
];

const LOCAL_SEO = {
  title: "Le client d'un maçon cherche longtemps avant d'appeler",
  paragraphs: [
    "Personne ne décide d'une extension en une soirée. Le propriétaire commence par des questions : combien coûte une extension au mètre carré, faut-il un permis, combien de temps durent les travaux. Il lit plusieurs pages pendant des semaines, puis il demande des devis aux entreprises dont il a lu le contenu.",
    "Un site de maçon qui ne montre qu'une page d'accueil et un formulaire rate toute cette phase. Les pages par ouvrage et le guide des démarches existent pour être trouvées pendant la réflexion. Le jour où le client passe à l'action, votre nom lui est déjà familier.",
    "Côté local, la fiche Google Business Profile reste le premier levier sur « maçon + ville ». Les photos de chantiers publiées régulièrement sur la fiche, les avis qui mentionnent le type de travaux et la cohérence de vos coordonnées partout sur le web font monter la fiche dans le bloc des trois résultats locaux.",
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
      h1="Site internet maçon pour décrocher les chantiers d'extension"
      intro="Vos ouvrages montrés étape par étape, les démarches expliquées, les petites demandes filtrées. Un site qui travaille pendant les semaines où le client réfléchit."
      benefits={[
        {
          title: "La preuve par l'étape",
          desc: "Fondations, élévation, finitions en photos. Le client voit la qualité du travail que le crépi cache une fois le chantier fini.",
        },
        {
          title: "Présent pendant la réflexion",
          desc: "Prix au mètre carré, permis, délais : des pages qui répondent aux questions posées bien avant la demande de devis.",
        },
        {
          title: "Des demandes à votre taille",
          desc: "Le formulaire qualifie l'ouvrage, la surface et l'avancement du projet. Vous choisissez les rendez-vous qui valent le déplacement.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
