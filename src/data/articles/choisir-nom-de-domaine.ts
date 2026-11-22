import type { BlogSection } from "@/data/blog-posts";

/** Le corps de l'article « choisir-nom-de-domaine ». Ses métadonnées vivent dans
    src/data/blog-posts.ts ; ce fichier n'est chargé que sur sa page. */
export const contenu: BlogSection[] = [
  {
    type: "p",
    text: "Le nom de domaine, c'est l'adresse de votre site : mon-entreprise.fr. Vos clients le tapent, le lisent sur votre camionnette, l'entendent au téléphone. Un bon domaine se retient du premier coup. Voici comment le choisir, et pourquoi le .fr est souvent le meilleur choix pour une activité en France.",
  },
  { type: "h2", text: "Faut-il choisir un .fr ou un .com ?" },
  {
    type: "p",
    text: "Pour une activité en France, choisissez le .fr : il dit tout de suite où vous travaillez, il reste plus de noms courts libres, et il coûte en moyenne 20 à 30 % moins cher qu'un .com selon l'[Afnic](https://www.afnic.fr/noms-de-domaine/tout-savoir/pourquoi-choisir-le-fr/), qui gère le .fr. Si le .com du même nom est libre, réservez-le aussi.",
  },
  {
    type: "table",
    headers: ["", ".fr", ".com"],
    rows: [
      ["Ce qu'il dit", "Une activité en France", "Une activité internationale, ou sans pays"],
      [
        "Qui peut le réserver",
        "Les personnes et entreprises établies dans l'Union européenne, en Islande, au Liechtenstein, en Norvège ou en Suisse",
        "Tout le monde",
      ],
      ["Disponibilité", "Plus de noms courts encore libres", "Beaucoup de noms courts déjà pris"],
      ["Prix courant", "12 € par an en moyenne, selon l'[Afnic](https://www.afnic.fr/noms-de-domaine/tout-savoir/pourquoi-choisir-le-fr/)", "20 à 30 % plus cher qu'un .fr en moyenne, selon l'Afnic"],
    ],
  },
  {
    type: "p",
    text: "Pour une activité locale, le .fr rassure et se comprend tout de suite. Réserver aussi le .com évite qu'un autre ne le prenne et ne capte les clients qui se trompent d'extension.",
  },
  { type: "h2", text: "Comment choisir un bon nom de domaine ?" },
  {
    type: "p",
    text: "Prenez un nom court, proche du nom de votre entreprise, qui se dicte au téléphone sans l'épeler. Évitez les accents, les doubles tirets et les noms proches d'une marque connue. Vérifiez qu'il est libre, réservez-le à votre nom, puis seulement imprimez vos cartes de visite. Les huit règles ci-dessous détaillent chaque point.",
  },
  {
    type: "ul",
    items: [
      "Court : moins de vingt caractères si possible.",
      "Simple à dicter : pas de double lettre piège, pas d'orthographe inventée.",
      "Sans accent : les accents sont techniquement possibles en .fr, mais vos clients ne les tapent pas.",
      "Un tiret au plus : garnier-plomberie.fr se dicte bien, garnier-plomberie-depannage-91.fr non.",
      "Proche du nom de l'entreprise : le client doit faire le lien sans réfléchir.",
      "Sans marque d'un autre : un nom proche d'une marque connue vous expose à devoir le rendre.",
      "Pensé pour durer : évitez une ville ou un produit si votre activité peut changer.",
      "Vérifié avant de l'annoncer : réservez-le avant d'imprimer quoi que ce soit.",
    ],
  },
  {
    type: "p",
    text: "Pour savoir en une seconde si votre nom est libre, utilisez notre [vérificateur de nom de domaine](/outils/verifier-nom-de-domaine/) : il interroge les registres officiels du .fr et du .com. L'Afnic propose aussi une [recherche Whois](https://www.afnic.fr/noms-de-domaine/tout-savoir/whois-trouver-un-nom-de-domaine/) pour le .fr.",
  },
  { type: "h2", text: "Peut-on avoir un nom de domaine gratuit ?" },
  {
    type: "p",
    text: "Pas vraiment. Un .fr ou un .com se loue à l'année auprès d'un bureau d'enregistrement, et quelqu'un paie toujours ce renouvellement. Quand une offre annonce un nom de domaine gratuit, il s'agit en général de l'un de ces trois cas.",
  },
  {
    type: "ul",
    items: [
      "Une sous-adresse : votre-nom.wixsite.com, par exemple. Elle est gratuite, mais elle porte le nom de l'outil et vous ne pouvez pas l'emporter si vous changez de service.",
      "Un domaine offert la première année : fréquent chez les créateurs de sites avec un abonnement annuel. Regardez le prix du renouvellement, payé dès la deuxième année.",
      "Un domaine inclus dans l'abonnement : pas de facture séparée tant que l'abonnement court. Vérifiez à quel nom il est enregistré et ce qu'il devient si vous partez.",
    ],
  },
  {
    type: "p",
    text: "Chez Sitaly, l'aperçu de votre site est gratuit, sans compte ni carte. Pour le mettre en ligne, les formules Essentiel et Pro incluent un .fr ou un .com, enregistré à votre nom. Essentiel coûte 19 € par mois les 3 premiers mois, puis 39 €. Ailleurs, une sous-adresse gratuite permet de démarrer : passez à votre propre domaine quand vos premiers clients arrivent.",
  },
  { type: "h2", text: "Le domaine doit être à votre nom" },
  {
    type: "p",
    text: "C'est le point le plus important, et le plus souvent négligé : le titulaire du domaine doit être vous ou votre entreprise. Si un prestataire l'enregistre à son nom, vous risquez de perdre votre adresse le jour où vous changez de prestataire. Demandez toujours qui est le titulaire, et comment récupérer le domaine si vous partez.",
  },
  {
    type: "quote",
    text: "Votre site peut changer d'outil. Votre adresse, elle, doit vous suivre.",
  },
  {
    type: "p",
    text: "Un domaine ne s'achète pas : son titulaire reçoit un droit d'utilisation exclusif, renouvelable, comme l'explique l'[Afnic](https://www.afnic.fr/noms-de-domaine/tout-savoir/gerer-son-nom-de-domaine/). Avec les formules Essentiel et Pro de Sitaly, votre domaine est offert et enregistré à votre nom. Sitaly le renouvelle tant que votre abonnement court, et il reste le vôtre si vous partez.",
  },
  {
    type: "faq",
    items: [
      {
        q: "Existe-t-il un nom de domaine gratuit ?",
        a: "Un vrai .fr ou .com se paie chaque année, environ 12 € pour un .fr selon l'Afnic. Ce qu'on appelle un domaine gratuit est soit une sous-adresse au nom de l'outil (votre-nom.wixsite.com), soit un domaine inclus ou offert la première année avec un abonnement.",
      },
      {
        q: "Peut-on changer de nom de domaine plus tard ?",
        a: "Oui. Gardez alors l'ancien quelques années et faites-le rediriger vers le nouveau : vos clients et Google suivront.",
      },
      {
        q: "Que se passe-t-il si j'oublie de renouveler mon domaine ?",
        a: "Le site et les e-mails cessent de fonctionner. Pour un .fr, le nom est supprimé, puis il redevient libre après une période de rédemption de 30 jours, pendant laquelle vous pouvez encore le récupérer. Activez le renouvellement automatique ou confiez-le à votre outil de site.",
      },
    ],
  },
];
