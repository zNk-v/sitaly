import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-menuisier/";
const TITLE = "Site internet menuisier : portfolio & devis | Sitaly";
const DESCRIPTION =
  "Site internet menuisier avec portfolio avant/après, devis en ligne et SEO local. Livré en 48h, en abonnement mensuel, sans engagement et tout inclus.";

const FAQ = [
  {
    q: "Le site mettra-t-il bien en valeur mes réalisations ?",
    a: "Oui : galerie portfolio avec photos avant/après, par type d'ouvrage (escaliers, dressings, agencement, fenêtres bois...). Chaque réalisation peut avoir sa propre fiche pour le SEO.",
  },
  {
    q: "Puis-je proposer un configurateur de devis ?",
    a: "Possible en option (cuisine sur mesure, dressing, escalier). Pré-qualifie le prospect et fait gagner 1 à 2h de devis par projet.",
  },
  {
    q: "Au bout de combien de chantiers un site est-il rentabilisé en menuiserie ?",
    a: "1 seul chantier de cuisine ou dressing rapporte généralement 3 000 à 10 000€. Un seul appel converti via votre site dans l'année rentabilise très largement l'abonnement.",
  },
  {
    q: "Travaillez-vous avec les artisans menuisiers d'agencement pro ?",
    a: "Oui, nous travaillons aussi bien avec les menuisiers particuliers que pros (agencement boutiques, bureaux). Le parcours et les pages sont adaptés à votre clientèle cible.",
  },
  {
    q: "Je suis débordé jusqu'en mars, à quoi bon un site maintenant ?",
    a: "Un carnet plein six mois à l'avance, c'est le bon moment pour choisir ses chantiers plutôt que les subir. Plus de demandes entrantes veut dire refuser les projets peu rentables et garder ceux qui paient bien. Et un site mis en ligne aujourd'hui met trois à six mois à se positionner sur Google, donc il sera prêt quand votre planning se videra.",
  },
  {
    q: "Les gens n'achètent pas une cuisine sur mesure par internet, si ?",
    a: "Ils ne l'achètent pas en ligne, mais ils vous choisissent en ligne. Un projet à 8 000 € commence par des semaines de recherches d'inspiration, de comparaisons et de lectures d'avis. Si vos réalisations ne sont visibles nulle part, vous n'êtes pas dans la liste au moment des trois devis.",
  },
  {
    q: "Faut-il afficher mes prix ?",
    a: "Sur du sur-mesure, un prix fixe n'a pas de sens. En revanche un ordre de grandeur par type d'ouvrage, du type « dressing sur mesure à partir de 2 500 € », écarte les projets hors budget et évite les rendez-vous perdus. Vous perdez quelques contacts, vous gagnez des heures.",
  },
];

const INCLUDED = [
  {
    title: "Portfolio par type d'ouvrage",
    desc: "Escaliers, dressings, cuisines, bibliothèques, fenêtres bois, agencement de boutique. Chaque réalisation a sa fiche avec les essences, les dimensions et le délai de fabrication.",
  },
  {
    title: "Une page par spécialité",
    desc: "Le client qui cherche un escalier sur mesure et celui qui veut changer ses fenêtres n'ont rien en commun. Chacun trouve une page qui parle de son projet, avec son propre formulaire.",
  },
  {
    title: "Formulaire de projet détaillé",
    desc: "Type d'ouvrage, pièce, dimensions approximatives, budget envisagé, échéance. Vous arrivez au rendez-vous en sachant déjà si le projet est faisable et rentable.",
  },
  {
    title: "Parcours particuliers et professionnels",
    desc: "L'agencement de boutique et la cuisine de particulier se vendent différemment. Deux entrées distinctes, avec les références et les arguments qui correspondent.",
  },
  {
    title: "Fiche Google Business Profile et avis",
    desc: "Une fiche avec vos photos d'atelier et de réalisations, plus une relance d'avis après chaque pose. Sur un métier de confiance, les avis pèsent lourd dans le choix final.",
  },
  {
    title: "Hébergement, maintenance et modifications",
    desc: "Domaine, SSL, sauvegardes et vos demandes de changement. Un nouveau chantier terminé : vous envoyez les photos, elles sont en ligne dans la foulée.",
  },
];

const LOCAL_SEO = {
  title: "En menuiserie, les photos font le référencement autant que les mots",
  paragraphs: [
    "Un projet de menuiserie sur mesure commence rarement par une recherche d'artisan. Il commence par une recherche d'idées : « dressing sous pente », « escalier bois et métal », « bibliothèque sur mesure salon ». Le particulier regarde des images pendant des semaines avant de chercher qui pourrait les fabriquer. Un site avec de vraies réalisations légendées apparaît dans ces recherches, un site sans photos n'existe pas.",
    "C'est pour cette raison que chaque réalisation devient une fiche à part entière, avec un titre descriptif, un texte court sur les contraintes du chantier et des images nommées correctement. Vous accumulez ainsi des dizaines de portes d'entrée vers votre site, là où une simple galerie sans texte n'en offre aucune.",
    "La dimension locale intervient ensuite. Quand le projet se précise, la recherche devient « menuisier sur mesure + ville » et la comparaison démarre. Là, ce sont votre fiche Google, vos avis et la qualité de vos fiches projets qui décident si vous faites partie des trois devis demandés. Les deux temps se complètent : l'inspiration fait connaître, le local fait appeler.",
  ],
};

export const Route = createFileRoute("/site-internet-menuisier")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "menuisier",
      faq: FAQ,
    }),
  component: MenuisierLanding,
});

function MenuisierLanding() {
  return (
    <MetierLanding
      metier="menuisier"
      metierCapitalized="Menuisier"
      route="/site-internet-menuisier/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Site internet menuisier qui transforme vos photos en clients"
      intro="Un portfolio qui sublime votre savoir-faire, des fiches projets optimisées SEO et un parcours devis fluide. Vos plus belles réalisations deviennent vos meilleurs commerciaux."
      benefits={[
        {
          title: "Portfolio avant/après",
          desc: "Galerie sublimée, slider avant/après, fiches projets détaillées. Vos chantiers parlent pour vous — 2x plus de demandes de devis qu'un site sans portfolio soigné.",
        },
        {
          title: "Pages par spécialité",
          desc: "Escalier, dressing, cuisine, fenêtre bois... Une page = un mot-clé, un trafic, un formulaire. Vous captez 4 à 5x plus de recherches qu'une page 'Services' générique.",
        },
        {
          title: "Devis qualifié en amont",
          desc: "Formulaire intelligent (type de projet, budget, délai) qui pré-qualifie : vous ne perdez plus de temps sur des prospects hors cible.",
        },
      ]}
      faq={FAQ}
      testimonial={{
        quote:
          "Sitaly a tout pris en charge. En 48h, j'avais un site magnifique et des demandes de devis dès le premier mois.",
        name: "S. R.",
        role: "Artisan rénovation — Bordeaux",
      }}
      url={URL}
    />
  );
}
