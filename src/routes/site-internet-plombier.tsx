import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-plombier/";
const TITLE = "Création site internet plombier : en 1 minute avec l'IA";
const DESCRIPTION =
  "Votre site internet plombier créé par l'IA en une minute : urgences, zone d'intervention, numéro cliquable. Aperçu gratuit, vous le modifiez vous-même.";

const FAQ = [
  {
    q: "Combien de temps faut-il pour créer un site internet plombier ?",
    a: "Une minute pour la première version. Vous répondez à trois questions sur votre activité, l'IA écrit les textes, choisit la mise en page et crée la photo. Vous relisez, vous corrigez ce qui ne vous ressemble pas, puis vous publiez le site sur une adresse du type votre-nom.sitaly.fr, avec HTTPS.",
  },
  {
    q: "Combien coûte un site internet plombier avec Sitaly ?",
    a: "L'aperçu ne coûte rien : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, Essentiel coûte 19 €/mois les 3 premiers mois, puis 39 €/mois, avec jusqu'à 4 pages et un nom de domaine offert. Pro coûte 79 €/mois, avec jusqu'à 8 pages et une mise en place avec un expert Sitaly. Sans engagement, et satisfait ou remboursé pendant 30 jours.",
  },
  {
    q: "Faut-il savoir coder ?",
    a: "Non. Pour changer un tarif ou ajouter une commune desservie, vous écrivez la demande en une phrase, par exemple « ajoute Massy et Palaiseau à ma zone d'intervention », et l'IA retouche le site. Vous le faites depuis votre téléphone, entre deux interventions.",
  },
  {
    q: "Mes clients en urgence peuvent-ils m'appeler depuis le site ?",
    a: "Oui. Votre numéro est cliquable sur mobile : un client avec une fuite vous appelle d'un geste depuis la page Google. Le site s'affiche vite sur téléphone. Celui qui ne peut pas parler remplit le formulaire de demande de devis et vous rappelez dès que vous sortez du chantier.",
  },
  {
    q: "Je n'ai que des photos prises au téléphone, ça suffit ?",
    a: "Oui. Une photo de chantier prise au téléphone inspire plus confiance qu'une image de banque d'images. Dans l'application, le bouton « Photo de réalisation » ajoute votre photo à la galerie du site et l'IA écrit la légende. Un prospect doit reconnaître une vraie salle de bain et un vrai chauffe-eau.",
  },
  {
    q: "Faut-il afficher mes tarifs de dépannage ?",
    a: "Une fourchette de déplacement et un tarif horaire écartent les curieux et rassurent les autres. Une ligne du type « déplacement 60 €, puis devis gratuit » suffit. Vous la demandez à l'IA en une phrase, et vous la changez le jour où vos prix bougent.",
  },
  {
    q: "Et si je travaille déjà avec des plateformes de mise en relation ?",
    a: "Les plateformes vous facturent chaque contact et vous mettent en concurrence sur le prix. Les appels reçus par votre site arrivent chez vous, et l'abonnement reste le même quand le volume augmente. Vous pouvez garder les deux au début et comparer ce que chacun vous rapporte.",
  },
];

const INCLUDED = [
  {
    title: "Page d'accueil orientée dépannage",
    desc: "L'IA met votre numéro en évidence et annonce votre zone d'intervention et vos horaires, à partir de ce que vous lui dites. Un prospect avec une fuite doit comprendre en trois secondes que vous pouvez venir aujourd'hui.",
  },
  {
    title: "Une page par prestation",
    desc: "Dépannage de fuite, débouchage, remplacement de chauffe-eau, rénovation de salle de bain. Vous créez jusqu'à 4 pages avec Essentiel, jusqu'à 8 avec Pro, chacune avec ses photos et ses tarifs. Chaque prestation a sa page, donc sa chance de sortir sur Google.",
  },
  {
    title: "Formulaire de demande de devis",
    desc: "Le client décrit sa panne et laisse son numéro. Avec Essentiel, un agent prépare la réponse à chaque demande. Vous la relisez, et rien ne part sans vous.",
  },
  {
    title: "Avis Google sur votre site",
    desc: "Avec Essentiel, vous reliez votre fiche Google et vos avis s'affichent sur le site. Un client qui hésite entre trois plombiers lit les avis avant d'appeler.",
  },
  {
    title: "Devis et factures depuis le téléphone",
    desc: "Vous faites le devis sur place et la facture en fin d'intervention. Essentiel et Pro donnent des devis et des factures illimités, et relancent les impayés à J+1, J+8 et J+15.",
  },
  {
    title: "Hébergement et nom de domaine",
    desc: "Le site est en ligne avec HTTPS et un nom de domaine offert dès Essentiel. Vous n'installez rien et vous modifiez le site vous-même, en une phrase.",
  },
];

const LOCAL_SEO = {
  title: "Comment sortir sur « plombier + votre ville »",
  paragraphs: [
    "Une recherche de plomberie se fait presque toujours dans l'urgence, sur mobile, à moins de dix kilomètres. Google le sait et affiche d'abord trois fiches locales, avant même les résultats classiques. Sortir dans ce bloc de trois vaut plus que n'importe quelle position en dessous.",
    "Le classement dans ce bloc dépend de trois choses : la proximité entre le prospect et votre adresse, la cohérence de vos informations sur le web, et le volume d'avis récents. Votre adresse est fixée. Les deux autres se travaillent : une fiche Google complète, les mêmes nom, adresse et téléphone partout, et une demande d'avis après chaque intervention.",
    "Le site prend le relais sur les recherches plus longues, du type « remplacement chauffe-eau + ville » ou « plombier ouvert dimanche ». Ces requêtes ont moins de volume, mais la personne qui les tape sait déjà ce qu'elle veut. Une page par prestation, que vous créez avec l'IA en quelques phrases, capte ce que la fiche Google ne couvre pas.",
  ],
};

export const Route = createFileRoute("/site-internet-plombier")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "plombier",
      faq: FAQ,
    }),
  component: PlombierLanding,
});

function PlombierLanding() {
  return (
    <MetierLanding
      metier="plombier"
      metierCapitalized="Plombier"
      route="/site-internet-plombier/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Création de site internet pour plombier, en 1 minute avec l'IA"
      intro="Vous décrivez votre activité et vos dépannages, l'IA écrit votre site en une minute. Vous le publiez, puis vous le modifiez depuis votre téléphone entre deux urgences."
      benefits={[
        {
          title: "Un numéro qu'on appelle d'un geste",
          desc: "Votre téléphone est cliquable sur mobile. Le client qui a de l'eau plein la cuisine tape sur le numéro depuis Google et vous parle sans chercher.",
        },
        {
          title: "Un site qui parle de votre secteur",
          desc: "Vous indiquez vos communes et vos prestations, l'IA les écrit dans les textes du site. Google comprend où vous intervenez et pour quelles pannes.",
        },
        {
          title: "Modifié en une phrase",
          desc: "Nouveau tarif, horaires d'été, commune ajoutée : vous écrivez la demande à l'IA et le site change. Vous n'attendez personne.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
