import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-chauffagiste/";
const TITLE = "Création site internet chauffagiste : en 1 minute avec l'IA";
const DESCRIPTION =
  "Site internet chauffagiste créé par l'IA en une minute : dépannage, pompes à chaleur, contrats d'entretien. Aperçu gratuit, vous le modifiez vous-même.";

const FAQ = [
  {
    q: "Mon site peut-il vendre des contrats d'entretien ?",
    a: "Oui. L'entretien annuel d'une chaudière est obligatoire, et chaque année des propriétaires cherchent quelqu'un pour le faire. Une page dédiée présente vos formules et la zone couverte, et le client vous écrit par le formulaire. Avec Essentiel, il réserve aussi la visite d'entretien en ligne. Ce contrat vous apporte le revenu le plus stable du métier, douze mois sur douze.",
  },
  {
    q: "Comment mettre en avant ma qualification RGE ?",
    a: "Placez le logo et le numéro de qualification en haut de page et sur chaque page d'installation. Pour une pompe à chaleur, le client sait que les aides dépendent d'un installateur RGE : il vérifie avant d'appeler.",
  },
  {
    q: "Je travaille sur plusieurs marques de chaudières, faut-il les citer ?",
    a: "Oui. Beaucoup de pannes se cherchent par marque : « dépannage chaudière Saunier Duval + ville », « code erreur Frisquet ». Avec Essentiel, une page liste les marques que vous maîtrisez et leurs pannes courantes. Avec Pro et ses 8 pages, vous donnez une page aux marques que vous dépannez le plus. Ces recherches viennent de clients en panne, prêts à appeler.",
  },
  {
    q: "L'été, le site ne sert plus à rien ?",
    a: "L'été est la saison des installations. Les propriétaires préparent le remplacement de leur chaudière fioul ou gaz, comparent les pompes à chaleur et montent leurs dossiers d'aides. Vous demandez à l'IA de basculer la mise en avant : dépannage en hiver, projets d'installation d'avril à septembre.",
  },
  {
    q: "Combien coûte un site internet chauffagiste avec Sitaly ?",
    a: "L'aperçu ne coûte rien : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, Essentiel coûte 19 € par mois les 3 premiers mois, puis 39 €, avec 4 pages et votre nom de domaine offert. Pro coûte 79 € par mois, avec 8 pages. Sans engagement, et satisfait ou remboursé pendant 30 jours.",
  },
  {
    q: "Faut-il savoir coder pour créer mon site ?",
    a: "Non. Vous répondez à trois questions sur votre activité, l'IA écrit les textes et monte la mise en page. Pour ajouter une marque ou changer le prix d'un entretien, vous l'écrivez en une phrase et l'IA modifie le site.",
  },
];

const INCLUDED = [
  {
    title: "Dépannage mis en avant l'hiver",
    desc: "Numéro en grand et cliquable, délai d'intervention, marques prises en charge. Un client sans chauffage en janvier appelle le premier artisan qui dit qu'il peut venir.",
  },
  {
    title: "Page contrat d'entretien",
    desc: "Formules, périmètre, fréquence, zone couverte. Avec Essentiel, le client réserve sa visite en ligne. Chaque contrat signé revient l'année suivante sans nouvelle dépense d'acquisition.",
  },
  {
    title: "Pages installation par équipement",
    desc: "Pompe à chaleur air-eau, chaudière gaz à condensation, poêle à granulés, climatisation réversible. Avec Essentiel ou Pro, chaque équipement a sa page, ses recherches et ses objections.",
  },
  {
    title: "Bloc aides et qualification RGE",
    desc: "Les dispositifs expliqués en langage clair, un lien vers le site officiel France Rénov' et votre qualification visible. Le client qui arrive par ce bloc a déjà un projet.",
  },
  {
    title: "Marques et codes erreur",
    desc: "Les marques que vous dépannez, chacune avec ses pannes courantes. Vous captez les recherches de clients qui ont le code erreur sous les yeux.",
  },
  {
    title: "Modifications par l'IA, à tout moment",
    desc: "Une nouvelle marque dépannée, un tarif d'entretien qui change : vous l'écrivez à l'IA, elle met le site à jour. Vous n'attendez aucun développeur.",
  },
];

const LOCAL_SEO = {
  title: "Un chauffagiste se cherche de deux façons opposées",
  paragraphs: [
    "En panne, le client tape « chauffagiste urgence » ou « chaudière en panne + ville » depuis son téléphone, dans une maison froide. Il regarde les trois fiches Google du haut, lit la note, appelle. La fiche Google Business Profile, les avis récents et un site qui s'affiche vite sur mobile décident de l'appel.",
    "En projet, le client compare pendant des semaines. Il cherche « prix pompe à chaleur air-eau », « installateur RGE + ville », « remplacer chaudière fioul ». Il lit, il revient, il demande trois devis. Là, les pages de contenu, les photos d'installations et l'explication des aides font la différence.",
    "Donnez une page à chaque public. Ajoutez-y le contrat d'entretien, qui transforme un dépannage ponctuel en client récurrent. La recherche « entretien chaudière + ville » revient chaque automne, avec un volume stable et une concurrence plus faible que sur l'urgence.",
  ],
};

export const Route = createFileRoute("/site-internet-chauffagiste")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "chauffagiste",
      faq: FAQ,
    }),
  component: ChauffagisteLanding,
});

function ChauffagisteLanding() {
  return (
    <MetierLanding
      metier="chauffagiste"
      metierCapitalized="Chauffagiste"
      route="/site-internet-chauffagiste/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Création de site internet pour chauffagiste, en 1 minute avec l'IA"
      intro="Vous décrivez vos dépannages, vos installations et vos contrats d'entretien, et l'IA écrit votre site en une minute. Depuis votre téléphone, vous passez des pannes de janvier aux pompes à chaleur du printemps en une phrase."
      benefits={[
        {
          title: "L'urgence sans friction",
          desc: "Numéro cliquable partout, marques dépannées listées, zone annoncée. Un client sans chauffage ne lit pas, il appelle.",
        },
        {
          title: "Les contrats d'entretien",
          desc: "Une page qui vend l'entretien annuel obligatoire. Le client signé revient chaque année, sans vous coûter une nouvelle recherche.",
        },
        {
          title: "Les projets d'installation",
          desc: "Pompe à chaleur, chaudière, poêle : des pages qui répondent aux questions de prix et d'aides avant le premier appel.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
