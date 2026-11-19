import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-carreleur/";
const TITLE = "Création site internet carreleur gratuit | Sitaly";
const DESCRIPTION =
  "Créez votre site internet carreleur avec l'IA : salles de bain, douches à l'italienne, terrasses. Gratuit pour commencer, sans carte bancaire.";

const FAQ = [
  {
    q: "Comment montrer la qualité d'une pose en photo ?",
    a: "Par le gros plan : joints réguliers, calepinage centré, coupes nettes autour d'un siphon, alignement sur toute la longueur d'un grand format. Une photo d'ensemble montre une jolie pièce, un gros plan montre un bon carreleur. Le portfolio alterne les deux.",
  },
  {
    q: "La douche à l'italienne mérite-t-elle une page ?",
    a: "Oui. C'est une des demandes les plus fréquentes en rénovation de salle de bain, et une des plus anxieuses, parce qu'une étanchéité ratée se paie cher. Une page qui détaille la pente, le receveur, l'étanchéité sous carrelage et la garantie attire les clients qui ont compris l'enjeu.",
  },
  {
    q: "Je travaille souvent en sous-traitance, un site sert-il ?",
    a: "Il sert à deux choses : trouver des clients particuliers en direct, avec une meilleure marge, et être trouvé par les entreprises générales et les architectes qui cherchent un carreleur fiable sur la zone. Une entrée professionnelle présente vos références de chantiers et votre capacité.",
  },
  {
    q: "Les grands formats et la pierre naturelle, ça se vend en ligne ?",
    a: "Ces poses demandent un savoir-faire que tous les carreleurs n'ont pas, et les clients qui les choisissent cherchent précisément ceux qui le maîtrisent. Une page par spécialité, avec vos chantiers réels, vous place sur ces recherches à plus forte valeur.",
  },
  {
    q: "Combien coûte un site de carreleur avec Sitaly ?",
    a: "La création est gratuite, sans carte bancaire, avec une adresse en .sitaly.fr. La formule Essentiel, à 39 € par mois sans engagement, ajoute votre nom de domaine en .fr ou en .com.",
  },
];

const INCLUDED = [
  {
    title: "Portfolio en plans larges et gros plans",
    desc: "Chaque chantier montré en ensemble puis en détail de pose. Le client juge vos joints et vos coupes, pas une photo de catalogue.",
  },
  {
    title: "Une page par type de pose",
    desc: "Salle de bain complète, douche à l'italienne, terrasse extérieure, grands formats, pierre naturelle, crédence de cuisine. Chaque pose a ses recherches.",
  },
  {
    title: "Page étanchéité et garanties",
    desc: "Système d'étanchéité utilisé, décennale, garantie de parfait achèvement. Sur une douche à l'italienne, c'est l'argument qui décide.",
  },
  {
    title: "Entrée professionnels",
    desc: "Pour les entreprises générales, architectes et maîtres d'œuvre qui cherchent un carreleur sur la zone. Références, capacité, disponibilités.",
  },
  {
    title: "Formulaire de demande détaillé",
    desc: "Surface, type de support, carrelage envisagé : le client décrit son projet en texte libre. Une demande exploitable dès la lecture.",
  },
  {
    title: "Modifications par l'IA, à tout moment",
    desc: "Un chantier terminé, une nouvelle spécialité : vous l'écrivez à l'IA, elle met le site à jour elle-même. Pas de développeur à attendre.",
  },
];

const LOCAL_SEO = {
  title: "Le carrelage se cherche par projet, rarement par métier",
  paragraphs: [
    "Peu de particuliers tapent « carreleur » tout court. Ils cherchent « rénovation salle de bain + ville », « douche à l'italienne prix », « poser carrelage terrasse ». Leur projet passe avant le nom du métier. Un site qui n'a qu'une page « Carrelage » ne ressort sur aucune de ces recherches.",
    "Les pages par type de pose répondent à cette logique. Chacune reprend le vocabulaire du client, ses questions de prix et de délai, et montre des chantiers qui correspondent. Google trouve une page précise pour une recherche précise, et le visiteur trouve la preuve qu'il cherchait.",
    "La fiche Google Business Profile porte les recherches plus directes, du type « carreleur + commune ». Photos de chantiers publiées régulièrement, avis qui mentionnent la salle de bain ou la terrasse réalisée, zone desservie bien renseignée : ces signaux font monter la fiche parmi les trois résultats locaux.",
  ],
};

export const Route = createFileRoute("/site-internet-carreleur")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "carreleur",
      faq: FAQ,
    }),
  component: CarreleurLanding,
});

function CarreleurLanding() {
  return (
    <MetierLanding
      metier="carreleur"
      metierCapitalized="Carreleur"
      route="/site-internet-carreleur/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Site internet carreleur : la qualité de pose se voit en gros plan"
      intro="Salles de bain, douches à l'italienne, terrasses et grands formats montrés dans le détail, sur un site créé par l'IA, gratuit pour commencer."
      benefits={[
        {
          title: "Le détail qui convainc",
          desc: "Joints, coupes, calepinage en gros plan. Le client distingue un bon carreleur d'un poseur pressé en une photo.",
        },
        {
          title: "Trouvé par projet",
          desc: "Une page par type de pose, avec les mots du client. Vous ressortez sur « douche à l'italienne + ville », pas seulement sur votre nom.",
        },
        {
          title: "Un devis bien préparé",
          desc: "Surface, support et carrelage envisagé décrits dans la demande. Vous chiffrez avec les bonnes informations, sans aller-retour.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
