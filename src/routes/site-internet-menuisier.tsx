import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-menuisier/";
const TITLE = "Création site internet menuisier : en 1 minute avec l'IA";
const DESCRIPTION =
  "Votre site internet menuisier créé par l'IA en une minute : escaliers, dressings, cuisines et réalisations en photos. Aperçu gratuit, modifié par vous.";

const FAQ = [
  {
    q: "Combien coûte un site internet menuisier avec Sitaly ?",
    a: "L'aperçu ne coûte rien : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, Essentiel coûte 19 €/mois les 3 premiers mois, puis 39 €/mois, avec jusqu'à 4 pages et un nom de domaine offert. Pro coûte 79 €/mois, avec jusqu'à 8 pages et une mise en place avec un expert Sitaly. Sans engagement, et satisfait ou remboursé pendant 30 jours.",
  },
  {
    q: "Le site mettra-t-il en valeur mes réalisations ?",
    a: "Oui. Le jour de la pose, vous photographiez l'escalier ou le dressing depuis l'application, vous ajoutez quelques mots (« chêne massif, sous pente, Rambouillet ») et la photo rejoint la galerie du site. L'IA écrit la légende à partir de vos mots.",
  },
  {
    q: "Faut-il savoir coder ?",
    a: "Non. Vous répondez à trois questions et l'IA écrit le site. Pour ajouter une spécialité ou changer un texte, vous écrivez la demande en une phrase, depuis l'atelier ou le chantier.",
  },
  {
    q: "Je fais aussi de l'agencement pour les professionnels, le site peut le montrer ?",
    a: "Oui. Avec Essentiel ou Pro, vous créez une page pour l'agencement de boutiques et de bureaux, à côté des pages pour les particuliers. Chacune parle à sa clientèle, avec ses références.",
  },
  {
    q: "Je suis débordé jusqu'en mars, à quoi bon un site maintenant ?",
    a: "Avec un carnet plein, vous choisissez vos chantiers au lieu de les subir. Plus de demandes entrantes vous permettent de refuser les projets peu rentables et de garder ceux qui paient bien. Un site met plusieurs mois à se faire une place sur Google : mis en ligne aujourd'hui, il sera prêt quand votre planning se videra. L'aperçu ne coûte rien : vous pouvez commencer dès maintenant.",
  },
  {
    q: "Les gens n'achètent pas une cuisine sur mesure par internet, si ?",
    a: "Ils vous choisissent en ligne, puis ils signent à l'atelier. Un projet à 8 000 € commence par des semaines de recherches d'inspiration, de comparaisons et de lectures d'avis. Si vos réalisations ne sont visibles nulle part, vous n'êtes pas dans la liste au moment des trois devis.",
  },
  {
    q: "Faut-il afficher mes prix ?",
    a: "Sur du sur-mesure, un prix fixe n'a pas de sens. Un ordre de grandeur par type d'ouvrage, du type « dressing sur mesure à partir de 2 500 € », écarte les projets hors budget et évite les rendez-vous perdus. Vous l'ajoutez en une phrase à l'IA. Vous perdez quelques contacts et vous gagnez des heures de déplacement.",
  },
];

const INCLUDED = [
  {
    title: "Galerie de réalisations",
    desc: "Escaliers, dressings, cuisines, bibliothèques, fenêtres bois. Vous ajoutez la photo avec l'essence, la pièce et la ville, et l'IA écrit la légende. Le client voit votre travail avant de vous appeler.",
  },
  {
    title: "Une page par spécialité",
    desc: "Le client qui cherche un escalier sur mesure et celui qui veut changer ses fenêtres n'ont rien en commun. Pro vous donne jusqu'à 8 pages, une par prestation avec ses photos et ses tarifs. Essentiel en donne 4.",
  },
  {
    title: "Demandes de projet et rendez-vous",
    desc: "Le client décrit son projet dans le formulaire du site. Avec Essentiel, il réserve un rendez-vous en ligne et un agent prépare votre réponse. Rien ne part sans vous.",
  },
  {
    title: "Particuliers et professionnels",
    desc: "L'agencement de boutique et la cuisine de particulier se vendent différemment. Une page par clientèle, avec les références et les arguments qui lui correspondent.",
  },
  {
    title: "Avis Google sur le site",
    desc: "Avec Essentiel, vous reliez votre fiche Google et vos avis s'affichent sur le site. Sur un métier de confiance, les avis pèsent lourd dans le choix final.",
  },
  {
    title: "Hébergement, devis et factures",
    desc: "En ligne avec HTTPS dès Essentiel, avec un nom de domaine offert, les devis et factures illimités et la relance des impayés à J+1, J+8 et J+15.",
  },
];

const LOCAL_SEO = {
  title: "En menuiserie, les photos font le référencement autant que les mots",
  paragraphs: [
    "Un projet de menuiserie sur mesure commence rarement par une recherche d'artisan. Il commence par une recherche d'idées : « dressing sous pente », « escalier bois et métal », « bibliothèque sur mesure salon ». Le particulier regarde des images pendant des semaines avant de chercher qui pourrait les fabriquer. Un site avec de vraies réalisations légendées apparaît dans ces recherches, un site sans photos n'existe pas.",
    "Légendez chaque réalisation : l'essence, la pièce, la contrainte du chantier, la ville. Dans Sitaly, vous ajoutez ces quelques mots à la photo et l'IA rédige la légende. Vous accumulez ainsi des dizaines de portes d'entrée vers votre site, là où une galerie sans texte n'en offre aucune.",
    "La dimension locale intervient ensuite. Quand le projet se précise, la recherche devient « menuisier sur mesure + ville » et la comparaison démarre. Votre fiche Google, vos avis et vos photos de réalisations décident alors si vous faites partie des trois devis demandés. L'inspiration vous fait connaître des mois avant le projet, et la recherche locale déclenche l'appel.",
  ],
};

export const Route = createFileRoute("/site-internet-menuisier")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "menuisier",
      faq: FAQ,
    }),
  component: MenuisierLanding,
});

function MenuisierLanding() {
  return (
    <MetierLanding
      metier="menuisier"
      metierCapitalized="Menuisier"
      route="/site-internet-menuisier/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Création de site internet pour menuisier, en 1 minute avec l'IA"
      intro="Vous décrivez votre atelier et vos spécialités, l'IA écrit votre site en une minute. Vous le publiez, puis vous ajoutez chaque réalisation en photo depuis votre téléphone, le jour de la pose."
      benefits={[
        {
          title: "Vos réalisations en vitrine",
          desc: "Escaliers, dressings, cuisines en photos, avec une légende écrite par l'IA. Le client voit votre savoir-faire dès sa première visite.",
        },
        {
          title: "Une page par spécialité",
          desc: "Escalier, dressing, cuisine, fenêtre bois : avec Essentiel ou Pro, chaque spécialité a sa page et sa recherche Google.",
        },
        {
          title: "Des demandes de projet lisibles",
          desc: "Le client décrit son projet par écrit avant tout rendez-vous. Avec Essentiel, un agent prépare votre réponse, et vous la relisez avant l'envoi.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
