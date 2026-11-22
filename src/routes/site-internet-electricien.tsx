import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-electricien/";
const TITLE = "Création site internet électricien : en 1 minute avec l'IA";
const DESCRIPTION =
  "Votre site internet électricien créé par l'IA en une minute : habilitations, borne IRVE, dépannage. Aperçu gratuit, vous le modifiez vous-même.";

const FAQ = [
  {
    q: "Combien coûte un site internet électricien avec Sitaly ?",
    a: "L'aperçu ne coûte rien : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, Essentiel coûte 19 €/mois les 3 premiers mois, puis 39 €/mois, avec jusqu'à 4 pages et un nom de domaine offert. Pro coûte 79 €/mois, avec jusqu'à 8 pages et une mise en place avec un expert Sitaly. Sans engagement, et satisfait ou remboursé pendant 30 jours.",
  },
  {
    q: "Mon site mettra-t-il en avant mes habilitations électriques ?",
    a: "Oui. Vous indiquez vos qualifications (Qualifelec, RGE, IRVE), vos assurances et votre SIRET, et l'IA les met en avant sur le site. Un client qui va confier son tableau électrique vérifie ces points avant d'appeler.",
  },
  {
    q: "Puis-je présenter mes prestations IRVE / borne de recharge ?",
    a: "Oui. Avec Essentiel ou Pro, vous créez une page dédiée à l'installation de bornes de recharge, qui vise les recherches « installation borne recharge + ville ». Vous décrivez la prestation, l'IA écrit la page, et vous ajoutez vos tarifs.",
  },
  {
    q: "Le site est-il adapté aux particuliers ET aux pros ?",
    a: "Oui, par les pages. Une page parle aux particuliers (rénovation, mise aux normes), une autre au tertiaire (bureaux, commerces), chacune avec ses arguments. Vous en créez jusqu'à 4 avec Essentiel et jusqu'à 8 avec Pro.",
  },
  {
    q: "Comment éviter les demandes qui font perdre du temps ?",
    a: "Le formulaire du site vous transmet la demande par écrit avant tout appel : vous lisez le besoin et vous choisissez celles qui valent le déplacement. Avec Essentiel, un agent prépare la réponse à chaque demande, et rien ne part sans votre accord.",
  },
  {
    q: "Mes concurrents sont sur Google depuis dix ans, je peux les rattraper ?",
    a: "Sur « électricien + grande ville », rarement à court terme. Sur les recherches précises comme « installation borne de recharge + commune » ou « remise aux normes tableau électrique + quartier », la concurrence est plus faible. Ces recherches amènent les prospects les plus décidés, et une page par prestation sert à les capter.",
  },
  {
    q: "Je fais surtout du bouche-à-oreille, un site sert-il à quelque chose ?",
    a: "Le bouche-à-oreille passe par Google avant de vous appeler. On vous recommande, la personne tape votre nom, et ce qu'elle trouve décide de l'appel. Sans site, elle tombe sur des annuaires et des concurrents qui payent pour votre nom.",
  },
];

const INCLUDED = [
  {
    title: "Habilitations et assurances en évidence",
    desc: "Qualifelec, RGE, IRVE, décennale, numéro SIRET : vous les donnez à l'IA et elle les rassemble sur le site. Un client qui va confier son tableau électrique les vérifie en premier.",
  },
  {
    title: "Une page par prestation",
    desc: "Mise aux normes, remplacement de tableau, installation de borne IRVE, domotique, dépannage, rénovation complète. Jusqu'à 4 pages avec Essentiel, 8 avec Pro : chacune vise sa propre recherche Google.",
  },
  {
    title: "Particuliers et professionnels",
    desc: "Un électricien qui fait du tertiaire ne parle pas à un propriétaire de pavillon comme à un gérant de commerce. Une page par clientèle, avec ses arguments et ses références.",
  },
  {
    title: "Demandes de devis et rendez-vous",
    desc: "Le client décrit son besoin dans le formulaire. Avec Essentiel, il réserve aussi un rendez-vous en ligne, et un agent prépare votre réponse. Vous validez avant chaque envoi.",
  },
  {
    title: "Avis Google sur le site",
    desc: "Avec Essentiel, vous reliez votre fiche Google et vos avis s'affichent sur le site. Quand la sécurité d'une maison est en jeu, l'avis d'un voisin pèse lourd.",
  },
  {
    title: "Hébergement et modifications",
    desc: "En ligne avec HTTPS et nom de domaine offert dès Essentiel. Une certification à ajouter, un tarif à corriger : vous l'écrivez en une phrase et l'IA modifie le site.",
  },
];

const LOCAL_SEO = {
  title: "Le référencement local d'un électricien se joue sur la précision",
  paragraphs: [
    "Personne ne cherche « électricien » tout court. On cherche « remise aux normes tableau électrique », « installation borne de recharge Tesla », « électricien urgence panne » ou « devis rénovation électrique appartement ». Ces recherches sont moins fréquentes qu'un mot-clé générique, mais celui qui les tape sait déjà ce qu'il veut et compare deux ou trois artisans avant d'appeler.",
    "Une page unique qui liste dix prestations ne ressort sur aucune. Google a besoin d'une page par intention pour comprendre ce que vous proposez. Avec Essentiel ou Pro, vous découpez votre site par prestation : vous décrivez chacune en quelques phrases, et l'IA écrit la page.",
    "S'ajoute la dimension géographique. Un électricien intervient rarement au-delà de trente minutes de route. Citez les communes de cette zone dans vos textes, renseignez-les sur votre fiche Google et gardez les mêmes coordonnées partout en ligne. Google recoupe ces signaux pour décider qui il montre dans le bloc de trois fiches locales.",
  ],
};

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
      metier="électricien"
      metierCapitalized="Électricien"
      route="/site-internet-electricien/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Création de site internet pour électricien, en 1 minute avec l'IA"
      intro="Vous décrivez vos habilitations et vos prestations, de la mise aux normes à la borne de recharge, et l'IA écrit votre site en une minute. Vous le publiez, puis vous le modifiez depuis votre téléphone."
      benefits={[
        {
          title: "Habilitations bien visibles",
          desc: "Qualifelec, RGE, IRVE, assurances : l'IA les place là où le client les cherche. Il vérifie en quelques secondes qu'il confie son installation à un professionnel.",
        },
        {
          title: "Une page par prestation",
          desc: "Tableau électrique, IRVE, domotique, dépannage : avec Essentiel ou Pro, chaque prestation a sa page et sa recherche Google.",
        },
        {
          title: "Des demandes lisibles avant l'appel",
          desc: "Le formulaire vous transmet le besoin par écrit. Avec Essentiel, un agent prépare la réponse : vous relisez, puis vous envoyez.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
