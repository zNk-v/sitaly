import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-plombier/";
const TITLE = "Site internet plombier : appels en 48h | Sitaly dès 149€/mois";
const DESCRIPTION =
  "Site internet plombier optimisé urgence et SEO local. Livré en 48h, dès 149€/mois en location, sans engagement et tout inclus. Téléphone cliquable, devis rapide, top Google local.";

const FAQ = [
  {
    q: "Quel est le délai de création d'un site plombier ?",
    a: "48 heures après l'appel découverte et la fourniture des contenus. Si vous n'avez pas de photos, on peut démarrer avec des visuels temporaires et les remplacer ensuite.",
  },
  {
    q: "Le site sera-t-il bien référencé pour 'plombier + ma ville' ?",
    a: "Oui : chaque site inclut une optimisation SEO local complète (balises, contenu géolocalisé, fiche Google Business Profile, schema LocalBusiness). Top 3 visé en 3 à 6 mois selon la concurrence locale.",
  },
  {
    q: "Puis-je gérer les urgences depuis le site ?",
    a: "Le numéro de téléphone est cliquable sur mobile et présent en haut de chaque page, plus un bouton 'Urgence 24/7' optionnel. Les clients appellent en 2 secondes depuis Google.",
  },
  {
    q: "Que se passe-t-il si je veux arrêter ?",
    a: "Nos formules sont en location, sans engagement : vous arrêtez quand vous voulez avec un simple préavis, sans frais ni durée minimale.",
  },
  {
    q: "Je n'ai que des photos prises au téléphone, ça suffit ?",
    a: "Oui. Une photo de chantier prise au téléphone convertit mieux qu'une image de banque d'images. On les recadre, on les compresse et on les légende. L'important, c'est qu'un prospect reconnaisse une vraie salle de bain et un vrai chauffe-eau, pas un décor de catalogue.",
  },
  {
    q: "Faut-il afficher mes tarifs de dépannage ?",
    a: "Afficher une fourchette de déplacement et un tarif horaire filtre les curieux et rassure les autres. Les plombiers qui indiquent « déplacement 60 € puis devis gratuit » reçoivent moins d'appels, mais transforment nettement plus. On en discute avant la mise en ligne, vous restez décideur.",
  },
  {
    q: "Et si je travaille déjà avec des plateformes de mise en relation ?",
    a: "Les plateformes vous facturent chaque contact et vous mettent en concurrence sur le prix. Votre site vous appartient, les appels sont directs et le coût ne bouge pas quand le volume augmente. Beaucoup de plombiers gardent les deux au début, puis réduisent la plateforme au fil des mois.",
  },
];

const INCLUDED = [
  {
    title: "Page d'accueil orientée dépannage",
    desc: "Numéro en évidence, zone d'intervention annoncée, délai moyen d'arrivée. Un prospect avec une fuite doit comprendre en trois secondes que vous pouvez venir aujourd'hui.",
  },
  {
    title: "Pages par prestation",
    desc: "Dépannage fuite, débouchage canalisation, remplacement de chauffe-eau, installation sanitaire, rénovation de salle de bain. Chaque prestation a sa page, donc sa chance de sortir sur Google.",
  },
  {
    title: "Pages par ville desservie",
    desc: "Une page par commune de votre secteur, avec un contenu propre à chacune. C'est ce qui vous fait apparaître sur « plombier + nom de la ville » au-delà de votre commune d'origine.",
  },
  {
    title: "Fiche Google Business Profile optimisée",
    desc: "Catégories, horaires, zone desservie, photos, prestations, questions-réponses. La fiche apporte souvent plus d'appels que le site les premiers mois, et les deux se renforcent.",
  },
  {
    title: "Récolte d'avis automatisée",
    desc: "Un lien court à envoyer par SMS en fin d'intervention. Passer de 4 à 25 avis change le classement dans le pack local Google et le taux de clic sur votre fiche.",
  },
  {
    title: "Hébergement, maintenance et modifications",
    desc: "Nom de domaine, certificat SSL, sauvegardes, mises à jour et vos demandes de changement. Vous envoyez un message, on modifie. Rien à installer, rien à surveiller.",
  },
];

const LOCAL_SEO = {
  title: "Comment on vous positionne sur « plombier + votre ville »",
  paragraphs: [
    "Une recherche de plomberie se fait presque toujours dans l'urgence, sur mobile, à moins de dix kilomètres. Google le sait et affiche d'abord trois fiches locales, avant même les résultats classiques. Sortir dans ce bloc de trois vaut plus que n'importe quelle position en dessous.",
    "Le classement dans ce bloc dépend de trois choses : la proximité entre le prospect et votre adresse, la cohérence de vos informations sur le web, et le volume d'avis récents. On travaille les deux dernières, la première étant fixée par votre implantation. Concrètement : une fiche complète, les mêmes nom, adresse et téléphone partout, et une routine d'avis après chaque intervention.",
    "Le site prend le relais sur les recherches plus longues, du type « remplacement chauffe-eau + ville » ou « plombier ouvert dimanche ». Ces requêtes ont moins de volume mais un taux d'appel bien supérieur, parce que le besoin est déjà précis. C'est le rôle des pages par prestation et par ville, qui captent ce que la fiche Google ne couvre pas.",
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
      h1="Site internet plombier qui fait sonner votre téléphone"
      intro="Un site rapide, optimisé urgence et bien positionné sur Google local. Vos prospects vous appellent en 2 clics — pas vos concurrents."
      benefits={[
        {
          title: "Bouton appel d'urgence visible",
          desc: "Numéro cliquable en haut de chaque page, bouton 'Dépannage 24/7' optionnel. 70 % des prospects plombiers veulent appeler tout de suite.",
        },
        {
          title: "SEO local 'plombier + ville'",
          desc: "Pages dédiées par ville desservie, fiche Google Business Profile optimisée, schema LocalBusiness. Top 3 Google local visé en quelques mois.",
        },
        {
          title: "Formulaire devis ultra court",
          desc: "3 champs (nom, téléphone, type d'urgence) pour ne perdre aucun prospect mobile. Conversion x3 vs un formulaire à 10 champs.",
        },
      ]}
      faq={FAQ}
      testimonial={{
        quote:
          "Depuis que mon site est en ligne, je reçois 3 à 5 appels par semaine de nouveaux clients. Le rapport qualité-prix est imbattable.",
        name: "J. M.",
        role: "Plombier — Lyon",
      }}
      url={URL}
    />
  );
}
