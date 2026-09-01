import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-electricien";
const TITLE = "Site internet électricien : devis & SEO local | Sitaly dès 149€/mois";
const DESCRIPTION =
  "Site internet électricien pro livré en 48h. Devis en ligne, urgence cliquable, top Google local. Dès 149€/mois en location, sans engagement et tout inclus.";

const INCLUDED = [
  {
    title: "Bloc habilitations et assurances",
    desc: "Qualifelec, RGE, IRVE, décennale, numéro SIRET : rassemblés en haut de page avec les logos officiels. C'est le premier réflexe de vérification d'un client qui va confier son tableau électrique.",
  },
  {
    title: "Une page par prestation",
    desc: "Mise aux normes, remplacement de tableau, installation de borne IRVE, domotique, dépannage, rénovation complète. Chaque prestation vise sa propre recherche Google.",
  },
  {
    title: "Double parcours particuliers et professionnels",
    desc: "Un artisan qui fait du tertiaire ne parle pas à un propriétaire de pavillon de la même façon. Deux entrées, deux argumentaires, deux formulaires.",
  },
  {
    title: "Formulaire de devis conditionnel",
    desc: "Les questions s'adaptent au type de prestation choisi. Vous recevez une demande exploitable, pas un « bonjour, c'est pour un devis » sans contexte.",
  },
  {
    title: "Fiche Google Business Profile et avis",
    desc: "Catégorie principale bien choisie, prestations détaillées, photos de chantiers propres, et une relance d'avis par SMS après intervention.",
  },
  {
    title: "Hébergement, maintenance et modifications",
    desc: "Domaine, SSL, sauvegardes, mises à jour et vos demandes de changement incluses. Une nouvelle certification à ajouter, un tarif à corriger : vous écrivez, on s'en occupe.",
  },
];

const LOCAL_SEO = {
  title: "Le référencement local d'un électricien se joue sur la précision",
  paragraphs: [
    "Personne ne cherche « électricien » tout court. On cherche « remise aux normes tableau électrique », « installation borne de recharge Tesla », « électricien urgence panne » ou « devis rénovation électrique appartement ». Ces recherches sont moins fréquentes qu'un mot-clé générique, mais celui qui les tape sait déjà ce qu'il veut et compare deux ou trois artisans avant d'appeler.",
    "Une page unique qui liste dix prestations ne ressort sur aucune. Google a besoin d'une page par intention pour comprendre ce que vous proposez. C'est pour cette raison que votre site est découpé par prestation dès la mise en ligne, et pas seulement en une page d'accueil bien écrite.",
    "S'ajoute la dimension géographique. Un électricien intervient rarement au-delà de trente minutes de route. On délimite cette zone, on crée les pages des communes qui la composent, et on rend cohérentes toutes vos informations en ligne. Google recoupe ces signaux pour décider qui il montre dans le bloc de trois fiches locales.",
  ],
};

const FAQ = [
  {
    q: "Mon site mettra-t-il en avant mes habilitations électriques ?",
    a: "Oui : qualifications (Qualifelec, RGE, IRVE...), assurances et certifications sont mises en valeur dans un bloc dédié. C'est un critère de réassurance majeur côté client.",
  },
  {
    q: "Puis-je présenter mes prestations IRVE / borne de recharge ?",
    a: "Tout à fait. On crée une page dédiée IRVE optimisée pour les recherches 'installation borne recharge + ville', avec formulaire devis spécifique et prime CEE intégrée.",
  },
  {
    q: "Que se passe-t-il pour la mise en conformité Consuel ?",
    a: "On peut intégrer une section explicative + un formulaire dédié aux demandes de mise en conformité. Idéal pour capter les recherches 'mise en conformité électrique + ville'.",
  },
  {
    q: "Le site est-il adapté aux particuliers ET aux pros ?",
    a: "Oui : deux parcours visuels distincts (Particuliers / Professionnels - Tertiaire) avec leurs propres pages services et formulaires.",
  },
  {
    q: "Comment éviter les demandes de devis à 80 € qui font perdre du temps ?",
    a: "En qualifiant avant l'appel. Le formulaire demande le type de logement, l'ancienneté de l'installation et la nature du besoin. Vous voyez la demande avant de décrocher et vous choisissez celles qui valent le déplacement.",
  },
  {
    q: "Mes concurrents sont sur Google depuis dix ans, je peux les rattraper ?",
    a: "Sur « électricien + grande ville », rarement à court terme. Sur les recherches précises comme « installation borne de recharge + commune » ou « remise aux normes tableau électrique + quartier », oui, en quelques mois. C'est là que se trouvent les prospects les plus décidés, et c'est par là qu'on commence.",
  },
  {
    q: "Je fais surtout du bouche-à-oreille, un site sert vraiment à quelque chose ?",
    a: "Le bouche-à-oreille passe par Google avant de vous appeler. On vous recommande, la personne tape votre nom, et ce qu'elle trouve décide de l'appel. Sans site, elle tombe sur des annuaires et des concurrents qui payent pour votre nom.",
  },
];

export const Route = createFileRoute("/site-internet-electricien")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "électricien",
      faq: FAQ,
    }),
  component: ElectricienLanding,
});

function ElectricienLanding() {
  return (
    <MetierLanding
      route="/site-internet-electricien/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      metier="électricien"
      metierCapitalized="Électricien"
      h1="Site internet électricien qui inspire confiance dès la 1ère seconde"
      intro="Mettez en avant vos habilitations, vos chantiers et vos services (IRVE, mise en conformité, domotique) avec un site optimisé pour le SEO local."
      benefits={[
        {
          title: "Habilitations bien visibles",
          desc: "Qualifelec, RGE, IRVE, assurances : un bloc dédié rassure le client en 5 secondes. Conversion +35 % vs un site sans réassurance visible.",
        },
        {
          title: "Pages services dédiées",
          desc: "Tableau électrique, IRVE, domotique, dépannage : une page par service avec son mot-clé et son formulaire devis. Trafic SEO multiplié par 3.",
        },
        {
          title: "Devis en ligne intelligent",
          desc: "Formulaire conditionnel (particulier/pro, type de prestation, urgence) qui pré-qualifie le prospect avant l'appel. Vous gagnez 80 % de temps de qualification.",
        },
      ]}
      faq={FAQ}
      testimonial={{
        quote:
          "Simple, clair, efficace. Je n'ai rien à gérer et je peux me concentrer sur mes chantiers. Je recommande sans hésiter.",
        name: "K. B.",
        role: "Électricien — Toulouse",
      }}
      url={URL}
    />
  );
}
