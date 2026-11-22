import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-couvreur/";
const TITLE = "Création site internet couvreur : en 1 minute avec l'IA";
const DESCRIPTION =
  "Votre site internet couvreur créé par l'IA en une minute : toiture, façade, urgences après tempête. Aperçu gratuit, vous le modifiez vous-même.";

const FAQ = [
  {
    q: "Combien coûte un site internet couvreur avec Sitaly ?",
    a: "L'aperçu ne coûte rien : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, Essentiel coûte 19 €/mois les 3 premiers mois, puis 39 €/mois, avec jusqu'à 4 pages et un nom de domaine offert. Pro coûte 79 €/mois, avec jusqu'à 8 pages et une mise en place avec un expert Sitaly. Sans engagement, et satisfait ou remboursé pendant 30 jours.",
  },
  {
    q: "Comment gérer les urgences (fuite, tempête) ?",
    a: "Votre numéro est cliquable sur téléphone et le site s'affiche vite : après une tempête, le particulier appelle le premier couvreur joignable. Quand vous êtes sur un toit, le formulaire de devis recueille les demandes. Avec Essentiel, un agent prépare la réponse et vous la validez avant l'envoi.",
  },
  {
    q: "Puis-je présenter mes prestations façade et isolation ?",
    a: "Oui. Vous créez jusqu'à 4 pages avec Essentiel, jusqu'à 8 avec Pro, une par prestation avec ses photos et ses tarifs : couverture, zinguerie, démoussage, ravalement, isolation par l'extérieur. Vous décrivez la prestation, l'IA écrit la page.",
  },
  {
    q: "Mon activité est saisonnière, le site sert-il en hiver ?",
    a: "L'hiver amène les fuites, les tuiles arrachées et le démoussage, l'été les ravalements et les réfections complètes. Quand la saison tourne, vous changez la mise en avant du site en une phrase. En basse saison, les articles de blog écrits par l'IA (Essentiel) répondent aux questions que les particuliers se posent avant leurs travaux de printemps.",
  },
  {
    q: "Comment rassurer sur un devis de 15 000 € ?",
    a: "Par la preuve. Affichez votre décennale et vos assurances, les photos de vos chantiers réels, vos avis Google et le déroulé des étapes et des délais. Un particulier qui engage le prix d'une voiture vérifie avant d'appeler, et il vérifie sur votre site.",
  },
  {
    q: "Mes concurrents passent par des apporteurs d'affaires, c'est mieux ?",
    a: "Un apporteur prend un pourcentage sur chaque chantier, sans fin. L'abonnement Sitaly reste le même chaque mois, quel que soit le nombre de chantiers, et l'aperçu de votre site ne coûte rien. Faites le calcul sur vos chantiers de toiture de l'an dernier.",
  },
  {
    q: "Faut-il savoir coder ?",
    a: "Non. Vous répondez à trois questions et l'IA écrit le site. Ensuite, pour ajouter une commune, un chantier ou une prestation de façade, vous écrivez la demande en une phrase depuis votre téléphone.",
  },
];

const INCLUDED = [
  {
    title: "Galerie de chantiers",
    desc: "Vous photographiez la toiture finie, vous ajoutez quelques mots, et la photo rejoint la galerie du site avec une légende écrite par l'IA. Les particuliers regardent ces photos en premier, et elles justifient votre prix.",
  },
  {
    title: "Une page par prestation",
    desc: "Réfection de toiture, zinguerie, démoussage, ravalement de façade, isolation par l'extérieur, réparation après tempête. Jusqu'à 4 pages avec Essentiel, 8 avec Pro : chacune vise sa recherche et son type de client.",
  },
  {
    title: "Les aides expliquées",
    desc: "MaPrimeRénov', CEE, éco-PTZ, TVA réduite : vous demandez à l'IA une section ou un article de blog sur les aides liées à vos travaux. Ces recherches amènent des propriétaires déjà décidés à faire des travaux.",
  },
  {
    title: "Assurances et garanties en évidence",
    desc: "Décennale, RGE, SIRET, garantie de parfait achèvement. Vous les donnez à l'IA et elle les place sur le site. Sur des montants à cinq chiffres, ce bloc fait la différence entre un devis demandé et un onglet fermé.",
  },
  {
    title: "Demandes de devis et rendez-vous",
    desc: "Le formulaire recueille les demandes pendant que vous êtes sur un chantier. Avec Essentiel, le client réserve un créneau de visite en ligne et un agent prépare votre réponse. Rien ne part sans vous.",
  },
  {
    title: "Hébergement et modifications",
    desc: "En ligne avec HTTPS et nom de domaine offert dès Essentiel. Un chantier à ajouter, une commune à citer : vous l'écrivez en une phrase et l'IA modifie le site.",
  },
];

const LOCAL_SEO = {
  title: "Deux saisons, deux façons d'être trouvé",
  paragraphs: [
    "L'urgence et le projet ne se cherchent pas de la même manière. Après une tempête, on tape « couvreur urgence » sur son téléphone et on appelle le premier numéro visible : là, ce sont la fiche Google et la vitesse d'affichage du site qui décident. Pour un ravalement, on compare pendant trois semaines, on lit les avis, on regarde les photos, on demande trois devis : là, c'est le contenu et la preuve qui décident.",
    "Un site de couvreur doit tenir les deux rôles. La page d'accueil sert l'appel immédiat, avec le numéro cliquable et la zone d'intervention. Les pages de prestation, plus fournies, décrivent les étapes, les matériaux, les délais et les aides. Les deux se nourrissent : les interventions d'urgence vous valent des avis, et ces avis rassurent les propriétaires qui préparent un ravalement.",
    "Reste la couverture géographique. Vous intervenez sur vingt ou trente communes, mais Google ne vous associe qu'à celle de votre adresse tant que rien ne lui indique le reste. Citez vos communes dans les textes du site, renseignez la zone desservie sur votre fiche Google et gardez les mêmes coordonnées partout sur le web : votre visibilité s'étend peu à peu à votre vrai rayon d'intervention.",
  ],
};

export const Route = createFileRoute("/site-internet-couvreur")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "couvreur",
      faq: FAQ,
    }),
  component: CouvreurLanding,
});

function CouvreurLanding() {
  // `metierCapitalized` part dans le `?activite=` de l'application, un champ
  // libre où personne n'écrit « Couvreur / Façadier ». Un seul métier, comme
  // les neuf autres pages ; un façadier qui arrive d'ici change un mot.
  // Décision du 20 novembre 2026. Le contenu de la page parle toujours des
  // deux métiers, et le titre de la FAQ suit ce libellé.
  return (
    <MetierLanding
      metier="couvreur"
      metierCapitalized="Couvreur"
      route="/site-internet-couvreur/"
      included={INCLUDED}
      localSeo={LOCAL_SEO}
      h1="Création de site internet pour couvreur, de la toiture à la façade"
      intro="Vous décrivez vos chantiers de toiture et de façade, l'IA écrit votre site en une minute. Vous le publiez et vous le modifiez depuis votre téléphone, de l'hiver des fuites à l'été des ravalements."
      benefits={[
        {
          title: "Urgence toiture en un geste",
          desc: "Numéro cliquable, site qui s'affiche vite sur mobile. Après une tempête, le particulier appelle le premier couvreur joignable : autant que ce soit vous.",
        },
        {
          title: "Toiture et façade, chacune sa page",
          desc: "Couverture, ravalement, isolation, démoussage : avec Essentiel ou Pro, vous créez une page par prestation avec l'IA. Chaque page répond à une recherche précise.",
        },
        {
          title: "Vos chantiers en photos",
          desc: "Vous ajoutez vos photos de toitures et de façades depuis le chantier, l'IA écrit la légende. Le client voit votre travail avant d'appeler, et vos tarifs se justifient.",
        },
      ]}
      faq={FAQ}
      url={URL}
    />
  );
}
