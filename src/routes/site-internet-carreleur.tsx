import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-carreleur/";
const TITLE = "Création site internet carreleur : en 1 minute avec l'IA";
const DESCRIPTION =
  "Site internet carreleur créé par l'IA en une minute : salles de bain, douches à l'italienne, terrasses. Aperçu gratuit, vous le modifiez vous-même.";

const FAQ = [
  {
    q: "Comment montrer la qualité d'une pose en photo ?",
    a: "Par le gros plan : joints réguliers, calepinage centré, coupes nettes autour d'un siphon, alignement sur toute la longueur d'un grand format. Une photo d'ensemble montre une jolie pièce, un gros plan montre un bon carreleur. Alternez les deux dans vos photos, que vous ajoutez depuis votre téléphone.",
  },
  {
    q: "La douche à l'italienne mérite-t-elle une page ?",
    a: "Oui. C'est une des demandes les plus fréquentes en rénovation de salle de bain, et une des plus anxieuses, parce qu'une étanchéité ratée se paie cher. Avec Essentiel ou Pro, vous créez une page qui détaille la pente, le receveur, l'étanchéité sous carrelage et la garantie. Elle attire les clients qui ont compris l'enjeu.",
  },
  {
    q: "Je travaille souvent en sous-traitance, un site sert-il ?",
    a: "Il sert à deux choses : trouver des clients particuliers en direct, avec une meilleure marge, et être trouvé par les entreprises générales et les architectes qui cherchent un carreleur fiable sur la zone. Une page pour les professionnels présente vos références de chantiers et votre capacité.",
  },
  {
    q: "Les grands formats et la pierre naturelle, ça se vend en ligne ?",
    a: "Ces poses demandent un savoir-faire que tous les carreleurs n'ont pas, et les clients qui les choisissent cherchent ceux qui le maîtrisent. Une page par spécialité, avec vos chantiers réels, vous place sur ces recherches à plus forte valeur. La formule Pro compte 8 pages, une par prestation.",
  },
  {
    q: "Combien coûte un site internet carreleur avec Sitaly ?",
    a: "L'aperçu ne coûte rien : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, Essentiel coûte 19 € par mois les 3 premiers mois, puis 39 €, avec 4 pages et votre nom de domaine offert. Pro coûte 79 € par mois, avec 8 pages. Sans engagement, et satisfait ou remboursé pendant 30 jours.",
  },
  {
    q: "Faut-il savoir coder pour créer mon site ?",
    a: "Non. Vous répondez à trois questions sur votre activité, l'IA écrit les textes et monte la mise en page. Pour ajouter un chantier ou une spécialité, vous l'écrivez en une phrase et l'IA modifie le site.",
  },
];

const INCLUDED = [
  {
    title: "Portfolio en plans larges et gros plans",
    desc: "Vous ajoutez chaque chantier en vue d'ensemble puis en détail de pose. Le client juge vos joints et vos coupes sur vos propres photos.",
  },
  {
    title: "Une page par type de pose",
    desc: "Salle de bain complète, douche à l'italienne, terrasse extérieure, grands formats, pierre naturelle, crédence de cuisine. Essentiel compte 4 pages, Pro en compte 8.",
  },
  {
    title: "Étanchéité et garanties",
    desc: "Système d'étanchéité utilisé, décennale, garantie de parfait achèvement. Sur une douche à l'italienne, cet argument décide.",
  },
  {
    title: "Une page pour les professionnels",
    desc: "Pour les entreprises générales, architectes et maîtres d'œuvre qui cherchent un carreleur sur la zone. Références, capacité, disponibilités.",
  },
  {
    title: "Formulaire de demande de devis",
    desc: "Surface, type de support, carrelage envisagé : le client décrit son projet en texte libre. Avec Essentiel, l'IA prépare votre réponse, et rien ne part sans votre accord.",
  },
  {
    title: "Modifications par l'IA, à tout moment",
    desc: "Un chantier terminé, une nouvelle spécialité : vous l'écrivez à l'IA, elle met le site à jour. Vous n'attendez aucun développeur.",
  },
];

const LOCAL_SEO = {
  title: "Votre client cherche son projet avant de chercher un carreleur",
  paragraphs: [
    "Peu de particuliers tapent « carreleur » tout court. Ils cherchent « rénovation salle de bain + ville », « douche à l'italienne prix », « poser carrelage terrasse ». Leur projet passe avant le nom du métier. Un site qui n'a qu'une page « Carrelage » ne ressort sur aucune de ces recherches.",
    "Les pages par type de pose répondent à cette logique. Chacune reprend le vocabulaire du client, ses questions de prix et de délai, et montre des chantiers qui correspondent. Google trouve une page précise pour une recherche précise, et le visiteur trouve la preuve qu'il cherchait.",
    "La fiche Google Business Profile porte les recherches plus directes, du type « carreleur + commune ». Publiez des photos de chantiers sur la fiche, demandez des avis qui mentionnent la salle de bain ou la terrasse réalisée, renseignez votre zone : votre fiche monte parmi les trois résultats locaux. Avec Essentiel, ces avis s'affichent aussi sur votre site.",
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
      h1="Création de site internet pour carreleur, en 1 minute avec l'IA"
      intro="Vous décrivez vos poses de salle de bain, de douche à l'italienne ou de terrasse, et l'IA écrit votre site en une minute. Vous le publiez, puis vous ajoutez vos gros plans de chantier depuis votre téléphone."
      benefits={[
        {
          title: "Le détail qui convainc",
          desc: "Joints, coupes, calepinage en gros plan. Le client distingue un bon carreleur d'un poseur pressé en une photo.",
        },
        {
          title: "Trouvé par projet",
          desc: "Une page par type de pose, avec les mots du client. Vous ressortez sur « douche à l'italienne + ville » en plus de votre nom.",
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
