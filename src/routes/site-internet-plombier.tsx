import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-plombier";
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
];

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
