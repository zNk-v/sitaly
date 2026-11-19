import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-chauffagiste/";
const TITLE = "Création site internet chauffagiste gratuit | Sitaly";
const DESCRIPTION =
  "Créez votre site internet chauffagiste avec l'IA : pannes, pompes à chaleur, contrats d'entretien. Gratuit pour commencer, sans carte bancaire.";

const FAQ = [
  {
    q: "Mon site peut-il vendre des contrats d'entretien ?",
    a: "Oui. L'entretien annuel d'une chaudière est obligatoire, et chaque année des propriétaires cherchent quelqu'un pour le faire. Une page dédiée présente vos formules, la zone couverte et un formulaire de souscription. C'est le revenu le plus stable d'un chauffagiste, et la page qui l'attire travaille douze mois sur douze.",
  },
  {
    q: "Comment mettre en avant ma qualification RGE ?",
    a: "Le logo et le numéro de qualification figurent en haut de page et sur chaque page d'installation. Pour une pompe à chaleur, le client sait que les aides dépendent d'un installateur RGE : il vérifie avant d'appeler.",
  },
  {
    q: "Je travaille sur plusieurs marques de chaudières, faut-il les citer ?",
    a: "Oui. Beaucoup de pannes se cherchent par marque : « dépannage chaudière Saunier Duval + ville », « code erreur Frisquet ». Une page par marque que vous maîtrisez capte ces recherches, qui viennent de clients en panne donc prêts à appeler.",
  },
  {
    q: "L'été, le site ne sert plus à rien ?",
    a: "L'été est la saison des installations. Les propriétaires préparent le remplacement de leur chaudière fioul ou gaz, comparent les pompes à chaleur et montent leurs dossiers d'aides. Le site bascule la mise en avant : dépannage en hiver, projets d'installation d'avril à septembre.",
  },
  {
    q: "Combien coûte un site de chauffagiste avec Sitaly ?",
    a: "La création est gratuite, sans carte bancaire, avec une adresse en .sitaly.fr. La formule Essentiel, à 39 € par mois sans engagement, ajoute votre nom de domaine en .fr ou en .com.",
  },
];

const INCLUDED = [
  {
    title: "Page dépannage taillée pour l'hiver",
    desc: "Numéro en grand, délai d'intervention, marques prises en charge. Un client sans chauffage en janvier appelle le premier artisan qui dit clairement qu'il peut venir.",
  },
  {
    title: "Page contrat d'entretien",
    desc: "Formules, périmètre, fréquence, zone couverte et souscription en ligne. Chaque contrat signé revient l'année suivante sans nouvelle dépense d'acquisition.",
  },
  {
    title: "Pages installation par équipement",
    desc: "Pompe à chaleur air-eau, chaudière gaz à condensation, poêle à granulés, climatisation réversible. Chaque équipement a ses recherches et ses objections.",
  },
  {
    title: "Bloc aides et qualification RGE",
    desc: "Les dispositifs expliqués en langage clair, le lien vers le simulateur officiel et votre qualification visible. Le client qui arrive par cette page a déjà un projet.",
  },
  {
    title: "Pages par marque maîtrisée",
    desc: "Les marques que vous dépannez, chacune avec ses pannes courantes. Ces pages captent les recherches de clients qui ont le code erreur sous les yeux.",
  },
  {
    title: "Modifications par l'IA, à tout moment",
    desc: "Une nouvelle marque dépannée, un tarif d'entretien qui change : vous l'écrivez à l'IA, elle met le site à jour elle-même. Pas de développeur à attendre.",
  },
];

const LOCAL_SEO = {
  title: "Un chauffagiste se cherche de deux façons opposées",
  paragraphs: [
    "En panne, le client tape « chauffagiste urgence » ou « chaudière en panne + ville » depuis son téléphone, dans une maison froide. Il regarde les trois fiches Google du haut, lit la note, appelle. La fiche Google Business Profile, les avis récents et un site qui s'affiche vite sur mobile décident de l'appel.",
    "En projet, le client compare pendant des semaines. Il cherche « prix pompe à chaleur air-eau », « installateur RGE + ville », « remplacer chaudière fioul ». Il lit, il revient, il demande trois devis. Là, ce sont les pages de contenu, les photos d'installations et l'explication des aides qui font la différence.",
    "Votre site traite les deux publics avec des pages distinctes. Et il travaille le contrat d'entretien, qui transforme un dépannage ponctuel en client récurrent. La recherche « entretien chaudière + ville » revient chaque automne, avec un volume stable et une concurrence souvent plus faible que sur l'urgence.",
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
      h1="Site internet chauffagiste : les pannes l'hiver, les installations l'été"
      intro="Un site qui capte les urgences de janvier, les projets de pompe à chaleur du printemps et les contrats d'entretien qui reviennent chaque année, créé par l'IA et gratuit pour commencer."
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
