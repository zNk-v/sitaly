import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-peintre/";
const TITLE = "Création site internet peintre en bâtiment avec l'IA";
const DESCRIPTION =
  "Création de site internet peintre en bâtiment : l'IA écrit votre site en une minute. Aperçu gratuit, vous le modifiez vous-même depuis votre téléphone.";

const FAQ = [
  {
    q: "Mes chantiers se ressemblent tous en photo, comment me démarquer ?",
    a: "Par la paire avant-après prise sous le même angle, et par le détail : une bande de masquage retirée net, un angle rentrant propre, une plinthe sans bavure. Vous ajoutez ces photos depuis votre téléphone le jour de la réception. Deux images de la même pièce convainquent mieux que dix photos de murs blancs.",
  },
  {
    q: "Je travaille pour des particuliers et des syndics, deux sites ?",
    a: "Un seul site, avec une page pour chaque public. Le particulier cherche une pièce refaite vite et propre. Le syndic ou le gestionnaire cherche des références en copropriété, une attestation d'assurance et un planning tenu en site occupé. Avec la formule Essentiel (4 pages) ou Pro (8 pages), vous demandez à l'IA une page par public.",
  },
  {
    q: "Faut-il afficher un prix au mètre carré ?",
    a: "Une fourchette indicative écarte les demandes hors budget et rassure ceux qui restent. Précisez ce qu'elle comprend : préparation des supports, nombre de couches, fournitures. Vous l'écrivez à l'IA en une phrase, et vous la changez quand vos prix bougent.",
  },
  {
    q: "Le ravalement de façade a-t-il sa place sur mon site ?",
    a: "Si vous en faites, oui, sur une page à part avec la formule Essentiel ou Pro. Le ravalement est un chantier de plus grande valeur, parfois imposé par la mairie, et le client le cherche avec d'autres mots que la peinture intérieure. Noyé dans la page d'accueil, il passe inaperçu sur Google.",
  },
  {
    q: "Combien coûte un site internet peintre avec Sitaly ?",
    a: "L'aperçu ne coûte rien : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, Essentiel coûte 19 € par mois les 3 premiers mois, puis 39 €, avec 4 pages et votre nom de domaine offert. Pro coûte 79 € par mois, avec 8 pages. Sans engagement, et satisfait ou remboursé pendant 30 jours.",
  },
  {
    q: "Faut-il savoir coder pour créer mon site ?",
    a: "Non. Vous répondez à trois questions sur votre activité, l'IA écrit les textes et monte la mise en page. Pour ajouter un chantier ou changer un tarif, vous l'écrivez en une phrase et l'IA modifie le site.",
  },
];

const INCLUDED = [
  {
    title: "Vos photos avant-après",
    desc: "Vous ajoutez vos photos de chantier depuis votre téléphone, pièce par pièce. En attendant vos premières images, l'IA crée des visuels pour habiller le site.",
  },
  {
    title: "Pages intérieur, façade et décoration",
    desc: "Peinture intérieure, ravalement, enduits décoratifs, papier peint, boiseries. Avec Essentiel ou Pro, vous créez une page par prestation, et chacune vise sa recherche.",
  },
  {
    title: "Une page pour les professionnels",
    desc: "Syndics, gestionnaires, commerces, bureaux : références en site occupé, attestation d'assurance, taille d'équipe. Ce marché récurrent lit d'autres arguments que le particulier.",
  },
  {
    title: "Formulaire de demande de devis",
    desc: "Le client décrit les pièces, la surface et l'état des murs. Avec Essentiel, l'IA prépare votre réponse à chaque demande, et rien ne part sans votre accord.",
  },
  {
    title: "Vos avis Google sur le site",
    desc: "Avec Essentiel, vous reliez votre fiche Google et vos avis s'affichent sur le site. Un avis qui dit « propre et dans les temps » pèse lourd dans ce métier.",
  },
  {
    title: "Devis et factures dans la même application",
    desc: "Avec Essentiel, devis et factures illimités, et relance des impayés à J+1, J+8 et J+15, sans que vous ayez à y penser.",
  },
];

const LOCAL_SEO = {
  title: "En peinture, Google départage sur la preuve",
  paragraphs: [
    "La plupart des peintres proposent les mêmes prestations et promettent la même propreté. Le client ne peut pas vérifier une promesse. Il vérifie des photos de chantiers réels, des avis détaillés et une zone d'intervention précise. Mettez ces preuves en haut de votre site.",
    "Les recherches de peinture sont moins urgentes et plus locales qu'on ne le croit : « peintre appartement + quartier », « ravalement façade + commune », « peintre pour syndic + ville ». Une page par prestation, avec les communes où vous travaillez écrites en toutes lettres, capte ces requêtes. Une page d'accueil générique les laisse aux annuaires.",
    "La fiche Google Business Profile complète le site. Publiez les photos d'un chantier sur la fiche le jour de la réception, puis envoyez le lien d'avis au client satisfait : votre fiche gagne des places dans le bloc local au fil des mois. Avec Essentiel, ces avis s'affichent aussi sur votre site.",
  ],
};

export const Route = createFileRoute("/site-internet-peintre")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "peintre",
      faq: FAQ,
    }),
  component: PeintreLanding,
});

function PeintreLanding() {
  return (
    <MetierLanding
      metier="peintre"
      metierCapitalized="Peintre en bâtiment"
      route="/site-internet-peintre/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Création de site internet pour peintre en bâtiment, en 1 minute avec l'IA"
      intro="Vous décrivez vos chantiers de peinture intérieure, de façade ou de décoration, et l'IA écrit votre site en une minute. Vous le publiez, puis vous ajoutez vos avant-après depuis votre téléphone."
      benefits={[
        {
          title: "La finition en photo",
          desc: "Vous montrez la pièce avant et après, puis un angle rentrant ou une plinthe en gros plan. Le client juge votre travail sur ce détail.",
        },
        {
          title: "Deux marchés, deux pages",
          desc: "Particuliers d'un côté, syndics et gestionnaires de l'autre. Avec Essentiel, vous créez une page par public et l'IA en écrit les arguments.",
        },
        {
          title: "Moins de déplacements inutiles",
          desc: "Le client indique la surface et l'état des murs dans sa demande. Vous donnez une fourchette avant de prendre la route.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
