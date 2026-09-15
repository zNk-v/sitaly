import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-peintre/";
const TITLE = "Site internet peintre en bâtiment : avant-après et devis | Sitaly";
const DESCRIPTION =
  "Site internet peintre en bâtiment : galeries avant-après, pages intérieur, façade et syndics, formulaire de devis au mètre carré. SEO local, livré en 48h, sans engagement.";

const FAQ = [
  {
    q: "Mes chantiers se ressemblent tous en photo, comment me démarquer ?",
    a: "Par le avant-après pris sous le même angle, et par le détail : une bande de masquage retirée net, un angle rentrant propre, une plinthe sans bavure. Un curseur de comparaison sur la même pièce convainc mieux que dix photos de murs blancs.",
  },
  {
    q: "Je travaille pour des particuliers et des syndics, deux sites ?",
    a: "Un seul site, deux entrées. Le particulier cherche une pièce refaite vite et propre. Le syndic ou le gestionnaire cherche des références en copropriété, une assurance et une capacité à tenir un planning en site occupé. Chaque entrée a sa page, ses arguments et son formulaire.",
  },
  {
    q: "Faut-il afficher un prix au mètre carré ?",
    a: "Une fourchette indicative filtre les demandes hors budget et rassure ceux qui restent. Elle doit préciser ce qu'elle comprend : préparation des supports, nombre de couches, fournitures. On en discute avant la mise en ligne, et vous décidez.",
  },
  {
    q: "Le ravalement de façade a-t-il sa place sur mon site ?",
    a: "Si vous le faites, oui, sur une page séparée. Le ravalement est un chantier de plus grande valeur, parfois imposé par la mairie, et il se cherche avec d'autres mots que la peinture intérieure. Le mélanger à la page d'accueil le rend invisible.",
  },
  {
    q: "Les clics coûtent-ils cher en peinture sur Google Ads ?",
    a: "La peinture fait partie des métiers où le clic coûte le moins cher, parce que les urgences sont rares. C'est une bonne nouvelle pour tester la publicité avec un budget modeste, à condition que le site transforme les visiteurs en demandes. Notre calculateur de budget donne un ordre de grandeur par métier.",
  },
];

const INCLUDED = [
  {
    title: "Comparateur avant-après",
    desc: "Un curseur glissant sur vos photos, pièce par pièce. C'est l'élément qui retient le visiteur le plus longtemps sur un site de peintre.",
  },
  {
    title: "Pages intérieur, façade et décoration",
    desc: "Peinture intérieure, ravalement, enduits décoratifs, papier peint, traitement des boiseries. Chaque prestation vise sa recherche et son budget.",
  },
  {
    title: "Entrée dédiée aux professionnels",
    desc: "Syndics, gestionnaires, commerces, bureaux. Références en site occupé, attestations d'assurance, capacité d'équipe. Un marché récurrent qui ne lit pas les mêmes arguments.",
  },
  {
    title: "Formulaire de devis au mètre carré",
    desc: "Nombre de pièces, surface approximative, état des murs, photos jointes. Vous chiffrez une première fourchette sans vous déplacer pour rien.",
  },
  {
    title: "Fiche Google et avis avec photos",
    desc: "Catégorie principale bien choisie, photos de chantiers publiées sur la fiche, demande d'avis après chaque réception. Un avis qui mentionne « propre et dans les temps » vaut de l'or dans ce métier.",
  },
  {
    title: "Hébergement, maintenance et modifications",
    desc: "Domaine, SSL, sauvegardes et vos changements. Un nouveau chantier à ajouter au comparateur : vous envoyez les deux photos, on le met en ligne.",
  },
];

const LOCAL_SEO = {
  title: "En peinture, Google départage sur la preuve",
  paragraphs: [
    "La plupart des peintres proposent les mêmes prestations et affichent les mêmes promesses de propreté et de délais. Le client ne peut pas vérifier une promesse. Il peut vérifier des photos de chantiers réels, des avis détaillés et une zone d'intervention précise. Ce sont ces signaux que votre site met en avant.",
    "Les recherches de peinture sont moins urgentes et plus locales qu'on ne le croit : « peintre appartement + quartier », « ravalement façade + commune », « peintre pour syndic + ville ». Un site découpé en prestations et en communes capte ces requêtes, qu'une page d'accueil générique laisse aux annuaires.",
    "La fiche Google Business Profile complète le dispositif. Publier les photos d'un chantier sur la fiche le jour de la réception, puis envoyer le lien d'avis au client satisfait, fait monter la fiche dans le bloc local mois après mois. C'est un travail régulier et peu coûteux, qui creuse l'écart avec les concurrents qui ne le font pas.",
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
      h1="Site internet peintre en bâtiment : vos finitions parlent pour vous"
      intro="Des avant-après pièce par pièce, une entrée pour les particuliers et une pour les syndics, un formulaire qui chiffre avant le déplacement."
      benefits={[
        {
          title: "La finition en gros plan",
          desc: "Comparateur avant-après et photos de détail. Le client juge la qualité sur un angle ou une plinthe, pas sur une promesse.",
        },
        {
          title: "Deux marchés, deux discours",
          desc: "Particuliers d'un côté, syndics et professionnels de l'autre. Chaque public trouve ses arguments et ses références.",
        },
        {
          title: "Moins de déplacements inutiles",
          desc: "Surface, état des murs et photos dans le formulaire. Vous donnez une fourchette avant de prendre la route.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
