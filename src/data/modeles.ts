/**
 * Les modèles de sites (31 octobre 2026), comme les « templates » de
 * durable.com : une page par métier, /modeles/<id>/, qui montre le site que
 * l'IA prépare et ouvre l'application avec le métier déjà écrit.
 *
 * Les neuf premiers reprennent les identifiants, les photos et les couleurs
 * des métiers de l'accueil (METIERS, src/components/produit/Vitrine.tsx). Les
 * dix suivants (9 novembre 2026) ont leur fiche dans METIERS_PLUS, plus bas :
 * ils ont une page, sans entrer dans le défilé de l'accueil. Trois de plus le
 * 10 novembre 2026 (nettoyage, consultant, formateur), choisis d'après les
 * créations d'entreprises de septembre et octobre.
 *
 * Chaque page vise la recherche « site internet » suivie du métier. Pour ne pas
 * être vingt-deux fois la même page, chacune porte ce qui est propre au métier :
 * ce que son client veut savoir, ses sections, ses conseils et ses questions.
 *
 * Ce fichier ne dépend d'aucun composant : le script du sitemap le lit.
 */

export interface Modele {
  id: string;
  /** Le métier en minuscules, pour les phrases : « site internet pour fleuriste ». */
  nom: string;
  /** Regroupe les modèles voisins : la page d'un maçon propose d'abord ceux du bâtiment. */
  famille: "batiment" | "soin" | "commerce" | "service";
  /** Ce que le client de ce métier veut savoir avant d'appeler : le sujet propre à chaque page. */
  attentes: string;
  /** Les outils de Sitaly les plus utiles à ce métier (identifiants de src/data/produits.ts). */
  outils: string[];
  /** Les questions de ce métier, reprises dans les données lues par Google (FAQPage). */
  faq: { q: string; a: string }[];
  intro: string;
  /** Les sections du site que l'IA prépare pour ce métier. */
  sections: { titre: string; texte: string }[];
  conseils: { titre: string; texte: string }[];
}

export const MODELES: Modele[] = [
  {
    id: "fleuriste",
    nom: "fleuriste",
    famille: "commerce",
    attentes:
      "Avant de commander, un client veut voir vos bouquets, connaître vos prix de départ et savoir si vous livrez chez lui. Pour un mariage ou un deuil, il cherche quelqu'un à qui parler vite. Votre site répond à ces trois points dès la première page.",
    outils: ["avis-google", "devis-et-factures", "blog-ia"],
    faq: [
      {
        q: "Puis-je montrer mes propres bouquets ?",
        a: "Oui. L'IA crée une photo d'illustration pour l'accueil, que vous remplacez par les vôtres. Pour une fleuriste, vos créations vendent mieux que n'importe quelle image : ajoutez-en au fil des saisons.",
      },
      {
        q: "Mes clients peuvent-ils commander en ligne ?",
        a: "Le site reçoit les commandes par un formulaire : le client décrit le bouquet, la date et l'adresse, et le message arrive dans votre boîte mail. Vous confirmez le prix avec lui et vous pouvez lui envoyer une facture à payer par carte. Sitaly n'est pas une boutique en ligne avec panier.",
      },
      {
        q: "Comment annoncer la Saint-Valentin ou la fête des mères ?",
        a: "Écrivez à l'IA « ajoute un bandeau pour la fête des mères, commandes jusqu'au vendredi » : elle le pose en haut du site. Vous le retirez de la même façon après la date.",
      },
      {
        q: "Combien coûte un site de fleuriste avec Sitaly ?",
        a: "La création est gratuite, sans carte bancaire, avec une adresse en .sitaly.fr. La formule Essentiel, à 39 € par mois sans engagement, ajoute votre nom de domaine en .fr ou en .com.",
      },
    ],
    intro:
      "Un site qui donne envie de pousser la porte : vos bouquets en grand, vos créations pour les mariages et la livraison mise en avant.",
    sections: [
      {
        titre: "Accueil",
        texte: "Vos créations du moment et votre adresse, dès le premier écran.",
      },
      { titre: "Bouquets et compositions", texte: "Vos gammes, du bouquet du jour au deuil." },
      { titre: "Mariages et événements", texte: "Une page pour les demandes de devis." },
      { titre: "Livraison", texte: "Vos zones et vos délais, sans ambiguïté." },
      { titre: "Avis clients", texte: "Les mots de vos clients, en confiance." },
      { titre: "Contact", texte: "Horaires, plan et formulaire de commande." },
    ],
    conseils: [
      {
        titre: "Montrez vos vraies créations",
        texte: "Remplacez peu à peu les photos créées par l'IA par celles de vos bouquets.",
      },
      {
        titre: "Annoncez vos délais",
        texte: "Commande la veille, livraison le jour même : vos clients veulent le savoir.",
      },
      {
        titre: "Pensez aux grandes dates",
        texte: "Saint-Valentin, fête des mères : demandez à l'IA un bandeau pour chacune.",
      },
    ],
  },
  {
    id: "plombier",
    nom: "plombier",
    famille: "batiment",
    attentes:
      "Une fuite se cherche sur un téléphone, dans l'urgence, à quelques kilomètres. Le client veut trois réponses avant d'appeler : intervenez-vous dans sa commune, quand pouvez-vous venir, et combien coûte le déplacement. Un site qui les donne sur le premier écran reçoit l'appel.",
    outils: ["devis-et-factures", "avis-google", "agents-ia"],
    faq: [
      {
        q: "Faut-il afficher le prix du déplacement ?",
        a: "Un tarif de déplacement et un taux horaire écartent les curieux et rassurent les autres. L'IA n'écrit un prix que si vous le lui donnez : indiquez-le dans votre description, ou ajoutez-le plus tard en une phrase.",
      },
      {
        q: "Mon site sortira-t-il sur « plombier » suivi de ma ville ?",
        a: "Sitaly pose les bases : des pages rapides, lisibles sur téléphone, un titre et une description par page, vos communes nommées. Personne ne peut garantir une place sur Google. Pour un plombier, la fiche Google Business Profile et les avis récents pèsent autant que le site.",
      },
      {
        q: "Que se passe-t-il quand un client remplit le formulaire ?",
        a: "La demande arrive dans votre boîte mail et dans votre espace Sitaly. Vous pouvez répondre par un devis créé dans l'application, que le client accepte en ligne.",
      },
      {
        q: "J'ai déjà une page Facebook, pourquoi un site ?",
        a: "Sur Facebook, votre numéro et votre zone se perdent sous les publications. Un site les donne en dix secondes, et Google peut le montrer à quelqu'un qui cherche un plombier dans votre commune.",
      },
    ],
    intro:
      "Un site qui rassure en dix secondes : votre numéro en haut, votre zone d'intervention et vos délais de dépannage.",
    sections: [
      { titre: "Accueil", texte: "Votre numéro et votre zone, visibles tout de suite." },
      { titre: "Dépannage", texte: "Fuites, débouchage, chauffe-eau : vos urgences." },
      { titre: "Installation et rénovation", texte: "Salles de bain, chaudières, réseaux." },
      { titre: "Zone d'intervention", texte: "Les villes que vous couvrez, une par une." },
      { titre: "Avis clients", texte: "Les retours qui font choisir un artisan." },
      { titre: "Demande de devis", texte: "Un formulaire court, envoyé dans votre boîte mail." },
    ],
    conseils: [
      {
        titre: "Votre numéro partout",
        texte: "En haut de chaque page et en un bouton d'appel sur téléphone.",
      },
      {
        titre: "Citez vos villes",
        texte: "Google montre d'abord les artisans proches : nommez vos communes.",
      },
      {
        titre: "Affichez vos garanties",
        texte: "Décennale, devis gratuit, déplacement : dites-le clairement.",
      },
    ],
  },
  {
    id: "coach",
    nom: "coach sportif",
    famille: "soin",
    attentes:
      "Un futur client hésite avant de vous écrire : il se demande si votre méthode lui convient, combien coûte une séance et où elle a lieu. Il compare deux ou trois coachs. Celui qui affiche ses formules et rend la première séance simple à réserver prend l'avantage.",
    outils: ["prise-de-rendez-vous", "avis-google", "blog-ia"],
    faq: [
      {
        q: "Mes clients peuvent-ils réserver une séance en ligne ?",
        a: "Oui, avec les formules Essentiel et Pro : vous définissez vos prestations et vos créneaux, le client choisit le sien depuis votre site et reçoit une confirmation par e-mail. Avec la formule gratuite, il vous écrit par le formulaire.",
      },
      {
        q: "Dois-je afficher mes tarifs ?",
        a: "Oui, au moins un prix de départ. Donnez vos tarifs à l'IA dans votre description : elle ne les invente pas. Sans eux, le site ne montre aucun prix.",
      },
      {
        q: "Puis-je publier des conseils d'entraînement ?",
        a: "Le blog de Sitaly propose des idées d'articles tirées de votre activité, puis écrit un article complet que vous relisez avant de le publier.",
      },
      {
        q: "Je débute et je n'ai pas encore de témoignages.",
        a: "L'IA n'invente aucun avis. Votre site part sans témoignage, et vous ajoutez les premiers quand vos clients vous les donnent.",
      },
    ],
    intro:
      "Un site qui donne envie de commencer : votre méthode, vos formules et une première séance facile à réserver.",
    sections: [
      { titre: "Accueil", texte: "Votre promesse et votre ville, en une phrase." },
      { titre: "Méthode", texte: "Comment vous travaillez, et pour qui." },
      { titre: "Formules et tarifs", texte: "Séance, carnet ou abonnement, sans surprise." },
      { titre: "Lieux", texte: "En plein air, à domicile ou en salle." },
      { titre: "Témoignages", texte: "Les progrès de vos clients, avec leurs mots." },
      { titre: "Contact", texte: "Un formulaire pour la première séance." },
    ],
    conseils: [
      {
        titre: "Affichez vos prix",
        texte: "Un tarif clair lève le premier frein d'un futur client.",
      },
      {
        titre: "Parlez de vos diplômes",
        texte: "Votre carte professionnelle rassure : citez-la.",
      },
      {
        titre: "Offrez la première séance",
        texte: "Demandez à l'IA un bandeau pour votre offre de découverte.",
      },
    ],
  },
  {
    id: "boulanger",
    nom: "boulangerie",
    famille: "commerce",
    attentes:
      "Vos clients cherchent d'abord vos horaires et votre adresse, souvent depuis la rue. Viennent ensuite les commandes : gâteau d'anniversaire, pièce montée, bûche de Noël. Le site doit dire quand vous êtes ouvert et comment commander, avant de raconter votre histoire.",
    outils: ["avis-google", "identite-de-marque", "blog-ia"],
    faq: [
      {
        q: "Comment changer mes horaires pendant les vacances ?",
        a: "Écrivez-le à l'IA : « fermé du 3 au 18 août ». Elle met le site à jour, vous publiez d'un clic.",
      },
      {
        q: "Peut-on prendre les commandes de gâteaux sur le site ?",
        a: "Le formulaire reçoit la demande : le gâteau, le nombre de parts, la date. Vous la recevez par e-mail et vous confirmez avec le client. Le site n'encaisse pas de commande avec un panier.",
      },
      {
        q: "Une boulangerie a-t-elle besoin d'un site ?",
        a: "Votre fiche Google donne déjà vos horaires. Le site ajoute ce qu'elle ne montre pas : votre gamme, vos commandes de fêtes, votre façon de travailler. La fiche peut renvoyer vers lui.",
      },
      {
        q: "Combien de temps faut-il pour le créer ?",
        a: "Une phrase et une minute environ. Vous relisez les textes, vous remplacez la photo de l'accueil par celle de votre vitrine, et vous publiez.",
      },
    ],
    intro:
      "Un site gourmand : vos pains et vos viennoiseries, vos horaires bien visibles et les commandes pour les fêtes.",
    sections: [
      { titre: "Accueil", texte: "Votre fournil, vos horaires et votre adresse." },
      { titre: "Nos pains", texte: "Levain, tradition, spéciaux : votre gamme." },
      { titre: "Pâtisseries et viennoiseries", texte: "Les douceurs de la vitrine." },
      { titre: "Commandes", texte: "Gâteaux d'anniversaire et bûches de Noël." },
      { titre: "Notre histoire", texte: "Votre savoir-faire et vos farines." },
      { titre: "Infos pratiques", texte: "Horaires, jours de fermeture et plan." },
    ],
    conseils: [
      {
        titre: "Horaires à jour",
        texte: "C'est la page la plus vue : changez-les en une phrase à l'IA.",
      },
      {
        titre: "Vos spécialités d'abord",
        texte: "Le pain qui fait votre réputation mérite le premier écran.",
      },
      {
        titre: "Les commandes de fêtes",
        texte: "Ouvrez la page des bûches dès novembre.",
      },
    ],
  },
  {
    id: "coiffeuse",
    nom: "salon de coiffure",
    famille: "soin",
    attentes:
      "Une cliente regarde vos prix, vos horaires et des photos de vos coupes avant de réserver. Si elle doit appeler pendant vos heures de travail pour connaître un tarif, elle va voir ailleurs. Une grille lisible et un créneau à réserver suffisent à la décider.",
    outils: ["prise-de-rendez-vous", "avis-google", "identite-de-marque"],
    faq: [
      {
        q: "Les clientes peuvent-elles réserver en ligne ?",
        a: "Oui, avec Essentiel et Pro : elles choisissent une prestation et un créneau libre depuis votre site, reçoivent une confirmation par e-mail et peuvent annuler en un clic. La formule gratuite affiche votre téléphone et un formulaire.",
      },
      {
        q: "Comment afficher ma grille de tarifs ?",
        a: "Donnez vos prix à l'IA en vrac, « coupe femme 38 €, couleur à partir de 55 € » : elle les range dans une grille. Elle n'invente aucun tarif.",
      },
      {
        q: "Puis-je ajouter mes photos avant-après ?",
        a: "Oui. Le site a une galerie : vous y envoyez vos photos, et vous en ajoutez au fil des mois.",
      },
      {
        q: "Comment obtenir plus d'avis Google ?",
        a: "Sitaly prépare un QR code à poser à la caisse et une demande d'avis à envoyer après le passage de la cliente. Pour répondre aux avis, l'IA prépare une réponse que vous validez.",
      },
    ],
    intro:
      "Un site à l'image de votre salon : vos prestations, vos prix et la prise de rendez-vous en avant.",
    sections: [
      { titre: "Accueil", texte: "L'ambiance du salon et votre adresse." },
      { titre: "Prestations", texte: "Coupe, couleur, soins, chignons." },
      { titre: "Tarifs", texte: "Femme, homme, enfant : une grille lisible." },
      { titre: "L'équipe", texte: "Vos coiffeuses et leurs spécialités." },
      { titre: "Avis clients", texte: "Les retours qui donnent confiance." },
      {
        titre: "Rendez-vous",
        texte: "Téléphone, formulaire et réservation en ligne des créneaux libres.",
      },
    ],
    conseils: [
      {
        titre: "Publiez vos prix",
        texte: "Une grille claire évite les appels pour rien.",
      },
      {
        titre: "Montrez vos réalisations",
        texte: "Ajoutez vos photos avant-après au fil des mois.",
      },
      {
        titre: "Soignez vos horaires",
        texte: "Nocturnes et samedis : affichez-les en haut.",
      },
    ],
  },
  {
    id: "paysagiste",
    nom: "paysagiste",
    famille: "batiment",
    attentes:
      "Un particulier qui cherche un paysagiste veut voir des jardins finis, savoir si vous entretenez à l'année et si vous venez jusqu'à chez lui. Le crédit d'impôt pour l'entretien pèse dans sa décision. Des photos de vos chantiers et une zone claire font le tri avant le premier appel.",
    outils: ["devis-et-factures", "avis-google", "referencement-seo-geo"],
    faq: [
      {
        q: "Le site parle-t-il du crédit d'impôt ?",
        a: "Si vous indiquez que vos prestations d'entretien y ouvrent droit, l'IA écrit une section qui l'explique. Elle ne l'affirme pas à votre place : vérifiez votre situation avant de l'afficher.",
      },
      {
        q: "Comment montrer mes chantiers ?",
        a: "Ajoutez vos photos dans la galerie, avant et après. Depuis votre espace, une photo de chantier terminé entre en tête de galerie.",
      },
      {
        q: "Puis-je envoyer mes devis depuis Sitaly ?",
        a: "Oui. Vous créez le devis dans l'application, le client l'accepte en ligne, et la facture peut se payer par carte.",
      },
      {
        q: "Mon activité change avec les saisons.",
        a: "Demandez à l'IA un bandeau pour la taille d'automne ou les plantations de printemps. Elle l'ajoute, vous le retirez quand la saison passe.",
      },
    ],
    intro:
      "Un site qui montre vos jardins : création, entretien, élagage, avec votre zone d'intervention et le devis en un clic.",
    sections: [
      { titre: "Accueil", texte: "Vos plus beaux jardins et votre zone." },
      { titre: "Création de jardins", texte: "Plantations, terrasses, allées." },
      { titre: "Entretien", texte: "Tonte, taille de haies, contrats à l'année." },
      { titre: "Réalisations", texte: "Vos chantiers, en photos." },
      { titre: "Avantage fiscal", texte: "Le crédit d'impôt pour l'entretien, expliqué." },
      { titre: "Demande de devis", texte: "Un formulaire avec la surface et le besoin." },
    ],
    conseils: [
      {
        titre: "Parlez du crédit d'impôt",
        texte: "S'il s'applique à vos services, c'est un argument décisif.",
      },
      {
        titre: "Photos de chantiers",
        texte: "Un avant-après vaut mieux qu'un long texte.",
      },
      {
        titre: "Pensez aux saisons",
        texte: "Demandez à l'IA un bandeau pour l'entretien d'automne.",
      },
    ],
  },
  {
    id: "photographe",
    nom: "photographe",
    famille: "service",
    attentes:
      "Un couple compare plusieurs photographes sur leurs images, puis sur leurs prix. Il veut voir un reportage entier, comprendre ce que contient une formule et savoir si vous êtes libre à sa date. Le site doit montrer vos séries et rendre la demande de date facile.",
    outils: ["devis-et-factures", "avis-google", "identite-de-marque"],
    faq: [
      {
        q: "Le site utilise-t-il des images créées par l'IA ?",
        a: "L'IA en crée une pour l'accueil, le temps que vous posiez les vôtres. Pour un photographe, remplacez-la avant de publier : vos images sont votre vitrine.",
      },
      {
        q: "Comment présenter mes séries ?",
        a: "Le site a une section galerie où vous envoyez vos photos par lots. Demandez à l'IA d'en ajouter une par spécialité : mariages, portraits, entreprises.",
      },
      {
        q: "Comment un client réserve-t-il une date ?",
        a: "Il remplit le formulaire avec la date, le lieu et le projet. Vous recevez la demande par e-mail et vous répondez par un devis, qu'il accepte en ligne.",
      },
      {
        q: "Puis-je avoir mon nom de domaine ?",
        a: "Oui. Les formules Essentiel et Pro offrent un nom en .fr ou en .com, enregistré à votre nom. La formule gratuite met votre site sur une adresse en .sitaly.fr.",
      },
    ],
    intro:
      "Un site qui laisse parler vos images : vos galeries en grand, vos formules et un formulaire pour réserver une date.",
    sections: [
      { titre: "Accueil", texte: "Une image forte et votre spécialité." },
      { titre: "Galeries", texte: "Mariages, portraits, entreprises." },
      { titre: "Formules", texte: "Ce qui est compris, et à quel prix." },
      { titre: "Déroulement", texte: "De la prise de contact à la livraison des photos." },
      { titre: "Témoignages", texte: "Les mots des couples et des clients." },
      { titre: "Contact", texte: "La date, le lieu, le projet." },
    ],
    conseils: [
      {
        titre: "Vos photos uniquement",
        texte: "Pour un photographe, remplacez toutes les images par les vôtres.",
      },
      {
        titre: "Donnez un prix de départ",
        texte: "« À partir de » suffit à filtrer les demandes.",
      },
      {
        titre: "Montrez une série complète",
        texte: "Une journée entière rassure plus que dix photos isolées.",
      },
    ],
  },
  {
    id: "osteopathe",
    nom: "ostéopathe",
    famille: "soin",
    attentes:
      "Un patient cherche un ostéopathe près de chez lui, souvent avec une douleur précise. Il veut savoir si vous traitez son motif, le prix de la séance, si sa mutuelle rembourse et quand vous avez un créneau. Un site sobre qui répond à ces questions inspire confiance.",
    outils: ["prise-de-rendez-vous", "avis-google", "referencement-seo-geo"],
    faq: [
      {
        q: "Les patients peuvent-ils prendre rendez-vous en ligne ?",
        a: "Oui, avec Essentiel et Pro : le patient choisit un créneau libre depuis votre site et reçoit une confirmation par e-mail.",
      },
      {
        q: "L'IA respecte-t-elle les règles de communication des ostéopathes ?",
        a: "Ses consignes lui interdisent d'inventer des diplômes, des chiffres ou des avis. Relisez quand même chaque texte avant de publier et retirez toute promesse de résultat : vous restez responsable de ce que votre site affirme.",
      },
      {
        q: "Puis-je expliquer le remboursement par les mutuelles ?",
        a: "Oui. Indiquez à l'IA votre tarif et le fonctionnement du remboursement : elle écrit une section « Tarifs et remboursement ».",
      },
      {
        q: "J'ai déjà une fiche sur une plateforme de rendez-vous.",
        a: "Gardez-la. Votre site présente ce qu'une fiche ne dit pas : vos motifs de consultation, le déroulement d'une séance et l'accès au cabinet, sous votre nom et à votre adresse.",
      },
    ],
    intro:
      "Un site sobre et rassurant : vos motifs de consultation, vos tarifs, votre cabinet et la prise de rendez-vous.",
    sections: [
      { titre: "Accueil", texte: "Votre cabinet, votre ville et vos créneaux." },
      { titre: "Motifs de consultation", texte: "Dos, nourrissons, sportifs, femmes enceintes." },
      { titre: "Déroulement d'une séance", texte: "Ce qui attend le patient." },
      { titre: "Tarifs et remboursement", texte: "Prix de la séance et mutuelles." },
      { titre: "Le cabinet", texte: "Accès, stationnement, accessibilité." },
      { titre: "Rendez-vous", texte: "Vos moyens de réservation." },
    ],
    conseils: [
      {
        titre: "Restez factuel",
        texte: "Relisez les textes de l'IA : pas de promesse de guérison.",
      },
      {
        titre: "Parlez des mutuelles",
        texte: "La question revient sans cesse : répondez-y sur le site.",
      },
      {
        titre: "Indiquez l'accès",
        texte: "Étage, parking, transports : vos patients vous remercieront.",
      },
    ],
  },
  {
    id: "traiteur",
    nom: "traiteur",
    famille: "commerce",
    attentes:
      "Pour un mariage ou un séminaire, le client compare les traiteurs sur trois points : ce que vous cuisinez, un prix par personne et les événements que vous avez déjà servis. Il veut aussi savoir si vous venez jusqu'à son lieu de réception. Des photos de buffets dressés et un formulaire de devis précis font la différence.",
    outils: ["devis-et-factures", "avis-google", "agents-ia"],
    faq: [
      {
        q: "Faut-il afficher un prix par personne ?",
        a: "Un repère « à partir de » aide le client à savoir s'il est dans votre gamme. Donnez-le à l'IA : elle n'invente aucun prix.",
      },
      {
        q: "Que demande le formulaire de devis ?",
        a: "La date, le nombre d'invités et le type de service. Vous recevez la demande par e-mail et vous répondez par un devis créé dans Sitaly, accepté en ligne.",
      },
      {
        q: "Puis-je présenter mes menus ?",
        a: "Oui. Écrivez-les à l'IA ou collez-les dans votre description : elle les met en page par type de prestation, cocktail, buffet ou repas assis.",
      },
      {
        q: "Comment répondre vite aux demandes en pleine saison ?",
        a: "L'agent des demandes prépare une réponse à chaque message reçu par le site. Vous la relisez et vous l'envoyez.",
      },
    ],
    intro:
      "Un site qui met en appétit : vos buffets et vos menus, les événements que vous servez et la demande de devis.",
    sections: [
      { titre: "Accueil", texte: "Vos plus belles tables et votre région." },
      { titre: "Menus", texte: "Cocktails, buffets, repas assis." },
      { titre: "Événements", texte: "Mariages, entreprises, fêtes de famille." },
      { titre: "Notre cuisine", texte: "Produits locaux, fait maison." },
      { titre: "Avis clients", texte: "Les retours de vos réceptions." },
      { titre: "Demande de devis", texte: "Date, nombre d'invités, type de service." },
    ],
    conseils: [
      {
        titre: "Un prix par personne",
        texte: "Un repère « à partir de » aide vos clients à se projeter.",
      },
      {
        titre: "Montrez la présentation",
        texte: "Vos buffets dressés comptent autant que vos recettes.",
      },
      {
        titre: "Précisez votre zone",
        texte: "Jusqu'où vous déplacez-vous ? Dites-le sur la page devis.",
      },
    ],
  },
  {
    id: "electricien",
    nom: "électricien",
    famille: "batiment",
    attentes:
      "Un client appelle un électricien pour deux raisons : une panne à régler vite, ou des travaux à chiffrer. Dans les deux cas il vérifie d'abord que vous êtes qualifié et assuré. Pour une borne de recharge, il cherche la mention IRVE. Affichez vos qualifications et vos délais : ce sont eux qu'il compare.",
    outils: ["devis-et-factures", "avis-google", "referencement-seo-geo"],
    faq: [
      {
        q: "Puis-je mettre en avant les bornes de recharge ?",
        a: "Oui. Décrivez cette activité à l'IA : elle lui consacre une section. Si vous avez la qualification IRVE, indiquez-la, elle figurera sur le site.",
      },
      {
        q: "Le site affiche-t-il mon assurance décennale ?",
        a: "Oui, si vous la mentionnez dans votre description ou plus tard, en une phrase à l'IA. Elle n'écrit ni garantie ni label que vous n'avez pas donnés.",
      },
      {
        q: "Comment recevoir les demandes de devis ?",
        a: "Par le formulaire du site : elles arrivent dans votre boîte mail et dans votre espace Sitaly, où vous créez le devis que le client accepte en ligne.",
      },
      {
        q: "Combien coûte un site d'électricien avec Sitaly ?",
        a: "Rien pour commencer : la création est gratuite et sans carte bancaire. La formule Essentiel, à 39 € par mois sans engagement, ajoute votre nom de domaine.",
      },
    ],
    intro:
      "Un site qui inspire confiance avant le premier appel : vos domaines d'intervention, vos qualifications et votre zone.",
    sections: [
      {
        titre: "Accueil",
        texte: "Votre numéro, votre ville et vos spécialités.",
      },
      {
        titre: "Dépannage",
        texte: "Panne de courant, disjoncteur, prise qui chauffe.",
      },
      {
        titre: "Mise aux normes",
        texte: "Tableau électrique, rénovation, diagnostic.",
      },
      {
        titre: "Installations",
        texte: "Bornes de recharge, domotique, éclairage.",
      },
      {
        titre: "Zone d'intervention",
        texte: "Vos communes, nommées une par une.",
      },
      {
        titre: "Demande de devis",
        texte: "Le besoin et l'adresse, envoyés dans votre boîte mail.",
      },
    ],
    conseils: [
      {
        titre: "Citez vos qualifications",
        texte: "Qualifelec, IRVE, RGE : écrivez celles que vous détenez, l'IA n'en invente aucune.",
      },
      {
        titre: "Séparez dépannage et chantier",
        texte: "Un client en panne et un client qui rénove ne lisent pas la même page.",
      },
      {
        titre: "Nommez vos communes",
        texte: "Google montre d'abord les électriciens proches du client.",
      },
    ],
  },
  {
    id: "peintre",
    nom: "peintre en bâtiment",
    famille: "batiment",
    attentes:
      "Le client d'un peintre achète un résultat qu'il ne peut pas voir à l'avance. Il juge donc sur vos photos de chantiers, sur les avis et sur votre façon de protéger son logement pendant les travaux. Il veut aussi un ordre de prix avant de demander un devis.",
    outils: ["devis-et-factures", "avis-google", "identite-de-marque"],
    faq: [
      {
        q: "Comment ajouter mes photos de chantiers ?",
        a: "Dans la galerie du site. Une photo de chantier terminé s'ajoute aussi depuis votre espace et entre en tête de galerie.",
      },
      {
        q: "Dois-je afficher mes prix au mètre carré ?",
        a: "Un ordre de grandeur suffit. Donnez-le à l'IA : sans indication de votre part, le site n'affiche aucun prix.",
      },
      {
        q: "Je travaille seul, le site peut-il le dire ?",
        a: "Oui. Écrivez-le dans votre description : l'IA présente un artisan qui suit lui-même chaque chantier, du devis aux finitions.",
      },
      {
        q: "Puis-je modifier le site moi-même ?",
        a: "Oui, sans rien installer. Vous écrivez ce que vous voulez changer, « ajoute les enduits décoratifs à mes prestations », et l'IA le fait. Un double-clic corrige un mot.",
      },
    ],
    intro:
      "Un site qui montre vos finitions : vos chantiers en photos, vos prestations et la demande de devis.",
    sections: [
      {
        titre: "Accueil",
        texte: "Vos plus beaux chantiers et votre secteur.",
      },
      {
        titre: "Peinture intérieure",
        texte: "Murs, plafonds, boiseries.",
      },
      {
        titre: "Façades et extérieurs",
        texte: "Ravalement, volets, portails.",
      },
      {
        titre: "Revêtements",
        texte: "Papier peint, enduits décoratifs, sols.",
      },
      {
        titre: "Réalisations",
        texte: "Vos avant-après, pièce par pièce.",
      },
      {
        titre: "Demande de devis",
        texte: "La surface, les pièces et le délai souhaité.",
      },
    ],
    conseils: [
      {
        titre: "Montrez l'avant et l'après",
        texte: "Deux photos du même mur disent plus qu'un paragraphe.",
      },
      {
        titre: "Parlez de la protection du chantier",
        texte: "Bâches, nettoyage, délais tenus : c'est ce que retient un client.",
      },
      {
        titre: "Donnez un prix au mètre carré",
        texte: "Un ordre de grandeur évite les demandes hors budget.",
      },
    ],
  },
  {
    id: "menuisier",
    nom: "menuisier",
    famille: "batiment",
    attentes:
      "Un meuble sur mesure coûte plus cher qu'un meuble de série, et le client le sait. Il cherche la preuve que la différence se voit : des réalisations proches de son projet, le détail des essences et des finitions, un atelier réel. Il veut aussi comprendre le déroulement, de la prise de cotes à la pose.",
    outils: ["devis-et-factures", "avis-google", "blog-ia"],
    faq: [
      {
        q: "Fabricant ou poseur : le site fait-il la différence ?",
        a: "Oui, si vous le précisez. Écrivez « fabrication en atelier » ou « pose de menuiseries » dans votre description : l'IA construit le site autour de votre activité réelle.",
      },
      {
        q: "Comment présenter un projet du début à la fin ?",
        a: "Demandez à l'IA une section « Déroulement » : prise de cotes, plan, fabrication, pose. Ajoutez les photos du chantier dans la galerie.",
      },
      {
        q: "Puis-je recevoir des demandes avec des dimensions ?",
        a: "Le formulaire a un champ libre : le client y décrit son projet et ses mesures. La demande arrive dans votre boîte mail.",
      },
      {
        q: "Aurai-je mon propre nom de domaine ?",
        a: "Avec Essentiel et Pro, un nom en .fr ou en .com vous est offert et enregistré à votre nom. La formule gratuite utilise une adresse en .sitaly.fr.",
      },
    ],
    intro:
      "Un site qui met le bois en valeur : vos réalisations sur mesure, votre atelier et la demande de devis.",
    sections: [
      {
        titre: "Accueil",
        texte: "Une réalisation forte et votre région.",
      },
      {
        titre: "Agencement sur mesure",
        texte: "Dressings, bibliothèques, cuisines.",
      },
      {
        titre: "Menuiseries",
        texte: "Fenêtres, portes, escaliers.",
      },
      {
        titre: "L'atelier",
        texte: "Vos essences de bois et vos machines.",
      },
      {
        titre: "Réalisations",
        texte: "Vos chantiers, du plan à la pose.",
      },
      {
        titre: "Demande de devis",
        texte: "Les dimensions, l'essence et le délai.",
      },
    ],
    conseils: [
      {
        titre: "Montrez l'atelier",
        texte: "Un client qui voit où son meuble est fabriqué fait confiance.",
      },
      {
        titre: "Détaillez une réalisation",
        texte: "Le besoin, le bois choisi, la pose : racontez un projet entier.",
      },
      {
        titre: "Dites ce que vous ne faites pas",
        texte: "Pose seule ou fabrication : précisez-le pour recevoir les bonnes demandes.",
      },
    ],
  },
  {
    id: "couvreur",
    nom: "couvreur",
    famille: "batiment",
    attentes:
      "Refaire une toiture coûte des milliers d'euros, et le démarchage abusif a rendu les clients méfiants. Avant d'appeler, ils vérifient que l'entreprise existe, qu'elle est assurée et qu'elle travaille près de chez eux. Un site avec votre adresse, votre assurance décennale et des chantiers locaux répond à cette méfiance.",
    outils: ["devis-et-factures", "avis-google", "referencement-seo-geo"],
    faq: [
      {
        q: "Comment prouver mon sérieux face aux démarcheurs ?",
        a: "Donnez ce qu'un démarcheur ne donne pas : votre adresse, votre numéro SIRET, votre assurance décennale et des photos de chantiers de votre secteur. Écrivez-les dans votre description : l'IA les place sur le site.",
      },
      {
        q: "Le site gère-t-il les urgences après une tempête ?",
        a: "Votre numéro reste en haut de chaque page, avec un bouton d'appel sur téléphone. Demandez à l'IA un bandeau « intervention rapide » les jours où vous ouvrez des créneaux d'urgence.",
      },
      {
        q: "Dois-je nommer les communes où j'interviens ?",
        a: "Oui. Un client cherche un couvreur dans sa ville : citez vos communes, l'IA les intègre aux textes.",
      },
      {
        q: "Combien de temps pour avoir le site en ligne ?",
        a: "Une minute environ pour la création, puis le temps de relire. Vous publiez d'un clic, et vous corrigez plus tard en écrivant à l'IA.",
      },
    ],
    intro:
      "Un site qui rassure sur un chantier coûteux : vos interventions, vos garanties et un contact rapide après une fuite.",
    sections: [
      {
        titre: "Accueil",
        texte: "Votre numéro, votre secteur et vos urgences.",
      },
      {
        titre: "Réparation de toiture",
        texte: "Fuites, tuiles cassées, dégâts de tempête.",
      },
      {
        titre: "Rénovation et couverture neuve",
        texte: "Tuiles, ardoises, zinc.",
      },
      {
        titre: "Zinguerie et isolation",
        texte: "Gouttières, chéneaux, isolation des combles.",
      },
      {
        titre: "Garanties",
        texte: "Décennale et assurances, noir sur blanc.",
      },
      {
        titre: "Demande de devis",
        texte: "L'adresse, le type de toit et le problème constaté.",
      },
    ],
    conseils: [
      {
        titre: "Affichez votre décennale",
        texte: "Sur un toit, c'est la première chose qu'un client vérifie.",
      },
      {
        titre: "Répondez à l'urgence",
        texte: "Après une tempête, un numéro visible et un délai annoncé font la différence.",
      },
      {
        titre: "Montrez vos chantiers",
        texte: "Des photos de toits de votre secteur valent une recommandation.",
      },
    ],
  },
  {
    id: "macon",
    nom: "maçon",
    famille: "batiment",
    attentes:
      "Une extension ou un mur porteur engage le client pour des années. Il veut voir des ouvrages finis, vérifier votre assurance décennale et comprendre comment se passe un chantier chez lui. Il compare peu d'entreprises, mais il les étudie de près : il lit votre site en entier.",
    outils: ["devis-et-factures", "avis-google", "referencement-seo-geo"],
    faq: [
      {
        q: "Comment présenter un chantier long ?",
        a: "Ajoutez des photos à chaque étape dans la galerie, et demandez à l'IA une section qui raconte le projet : le besoin, les contraintes, le résultat.",
      },
      {
        q: "Le site peut-il afficher ma décennale ?",
        a: "Oui, avec le nom de votre assureur si vous le donnez. L'IA n'écrit aucune garantie que vous n'avez pas indiquée.",
      },
      {
        q: "Je fais aussi de la rénovation, comment tout montrer ?",
        a: "Listez vos activités en une phrase : l'IA crée une section par activité. Vous en ajoutez ou en retirez ensuite en lui écrivant.",
      },
      {
        q: "Puis-je envoyer mes devis depuis Sitaly ?",
        a: "Oui. Le devis se crée dans l'application, le client l'accepte en ligne et la facture suit. Les impayés reçoivent une relance.",
      },
    ],
    intro:
      "Un site solide comme vos ouvrages : vos chantiers, vos garanties et la demande de devis.",
    sections: [
      {
        titre: "Accueil",
        texte: "Vos réalisations et votre secteur.",
      },
      {
        titre: "Gros œuvre",
        texte: "Fondations, murs, dalles.",
      },
      {
        titre: "Extensions et rénovation",
        texte: "Agrandissements, ouvertures, reprises.",
      },
      {
        titre: "Extérieurs",
        texte: "Terrasses, murets, clôtures.",
      },
      {
        titre: "Réalisations",
        texte: "Vos chantiers, étape par étape.",
      },
      {
        titre: "Demande de devis",
        texte: "Le projet, la surface et le terrain.",
      },
    ],
    conseils: [
      {
        titre: "Montrez les étapes",
        texte: "Fondations, élévation, finitions : un chantier suivi en photos rassure.",
      },
      {
        titre: "Citez vos assurances",
        texte: "Décennale et responsabilité civile, avec le nom de l'assureur.",
      },
      {
        titre: "Précisez votre rayon",
        texte: "Jusqu'où vous déplacez-vous pour une extension ? Dites-le.",
      },
    ],
  },
  {
    id: "estheticienne",
    nom: "esthéticienne",
    famille: "soin",
    attentes:
      "Une cliente choisit un institut sur ses soins, ses prix et la facilité à réserver. Elle regarde la grille de tarifs sur son téléphone, souvent le soir, quand l'institut est fermé. Si elle peut réserver à ce moment-là, vous gagnez le rendez-vous.",
    outils: ["prise-de-rendez-vous", "avis-google", "identite-de-marque"],
    faq: [
      {
        q: "La réservation en ligne est-elle comprise ?",
        a: "Elle fait partie des formules Essentiel et Pro : vos soins, leurs durées et vos créneaux, avec confirmation par e-mail et annulation en un clic. La formule gratuite affiche votre téléphone et un formulaire.",
      },
      {
        q: "Je travaille à domicile, le site convient-il ?",
        a: "Oui. Écrivez « esthéticienne à domicile » et vos communes : le site présente votre zone de déplacement à la place d'une adresse d'institut.",
      },
      {
        q: "Comment afficher toute ma carte de soins ?",
        a: "Collez votre liste de soins et de prix dans votre description, en vrac. L'IA la range par famille. Vous changez un prix plus tard en une phrase.",
      },
      {
        q: "Mon institut n'a pas encore de logo.",
        a: "Sitaly en crée un avec vos couleurs et votre police. Il s'applique au site et vous le téléchargez pour vos cartes et votre vitrine.",
      },
    ],
    intro:
      "Un site doux et clair : vos soins, vos tarifs et la réservation, sans que la cliente ait à téléphoner.",
    sections: [
      {
        titre: "Accueil",
        texte: "L'ambiance de l'institut et votre adresse.",
      },
      {
        titre: "Soins du visage",
        texte: "Vos protocoles et leurs durées.",
      },
      {
        titre: "Épilations",
        texte: "Vos zones et vos méthodes.",
      },
      {
        titre: "Mains, pieds et regard",
        texte: "Manucure, pose de vernis, cils.",
      },
      {
        titre: "Tarifs",
        texte: "Une grille par famille de soins.",
      },
      {
        titre: "Rendez-vous",
        texte: "Vos créneaux libres, à réserver en ligne.",
      },
    ],
    conseils: [
      {
        titre: "Indiquez la durée des soins",
        texte: "Une cliente réserve plus vite quand elle sait combien de temps prévoir.",
      },
      {
        titre: "Publiez vos tarifs",
        texte: "La grille est la page la plus lue d'un institut.",
      },
      {
        titre: "Présentez vos marques",
        texte: "Si vous travaillez avec une marque connue, citez-la.",
      },
    ],
  },
  {
    id: "restaurant",
    nom: "restaurant",
    famille: "commerce",
    attentes:
      "Avant de venir, un client vérifie quatre choses sur son téléphone : êtes-vous ouvert, où êtes-vous, que servez-vous et à quel prix. Une carte en PDF illisible ou des horaires faux font perdre la table. Votre site donne ces réponses sur le premier écran.",
    outils: ["avis-google", "agents-ia", "identite-de-marque"],
    faq: [
      {
        q: "Peut-on réserver une table sur le site ?",
        a: "Le site affiche votre téléphone avec un bouton d'appel, et un formulaire pour les demandes de groupe. Sitaly n'a ni plan de salle ni gestion des couverts.",
      },
      {
        q: "Comment mettre ma carte à jour ?",
        a: "Écrivez le changement à l'IA : « remplace le plat du jour par une blanquette à 16 € ». Elle modifie la page, vous publiez d'un clic.",
      },
      {
        q: "Le site remplace-t-il ma fiche Google ?",
        a: "Non, il la complète. La fiche donne vos horaires et vos avis, le site donne votre carte et votre histoire. Pour répondre aux avis, Sitaly prépare une réponse que vous validez.",
      },
      {
        q: "Combien coûte un site de restaurant avec Sitaly ?",
        a: "La création est gratuite, sans carte bancaire. À 39 € par mois, sans engagement, la formule Essentiel ajoute un nom de domaine au nom de votre restaurant.",
      },
    ],
    intro:
      "Un site qui donne faim : votre carte, vos horaires, votre adresse et un moyen simple de vous joindre.",
    sections: [
      {
        titre: "Accueil",
        texte: "Votre salle, votre cuisine et votre adresse.",
      },
      {
        titre: "La carte",
        texte: "Entrées, plats, desserts, menu du midi.",
      },
      {
        titre: "Horaires et accès",
        texte: "Services, jours de fermeture, plan.",
      },
      {
        titre: "Groupes et événements",
        texte: "Repas d'équipe, anniversaires, privatisation.",
      },
      {
        titre: "Avis clients",
        texte: "Votre note et les mots de vos clients.",
      },
      {
        titre: "Contact",
        texte: "Téléphone et formulaire pour les demandes de groupe.",
      },
    ],
    conseils: [
      {
        titre: "La carte en texte",
        texte:
          "Une carte écrite se lit sur téléphone, et Google la comprend. Une photo de carte, non.",
      },
      {
        titre: "Horaires exacts",
        texte: "Service du midi, du soir, jour de fermeture : c'est la première recherche.",
      },
      {
        titre: "Changez le menu en une phrase",
        texte: "Écrivez le menu de la semaine à l'IA, elle met la page à jour.",
      },
    ],
  },
  {
    id: "vtc",
    nom: "chauffeur VTC",
    famille: "service",
    attentes:
      "Un client qui réserve en direct veut un prix connu à l'avance, un chauffeur ponctuel et un véhicule propre. Les entreprises et les hôtels cherchent un prestataire régulier, avec facture. Votre site présente vos forfaits et reçoit les réservations sans commission.",
    outils: ["devis-et-factures", "avis-google", "referencement-seo-geo"],
    faq: [
      {
        q: "Comment un client réserve-t-il une course ?",
        a: "Par le formulaire du site : la date, l'heure et les adresses arrivent dans votre boîte mail, et vous confirmez. Votre numéro reste affiché avec un bouton d'appel.",
      },
      {
        q: "Puis-je afficher des forfaits gare et aéroport ?",
        a: "Oui. Donnez vos prix à l'IA : elle crée une grille de forfaits. Elle n'affiche aucun tarif que vous n'avez pas fourni.",
      },
      {
        q: "Mes clients professionnels veulent une facture.",
        a: "Vous la créez dans Sitaly et vous l'envoyez par e-mail. Le client peut la payer par carte.",
      },
      {
        q: "Le site m'aide-t-il à moins dépendre des plateformes ?",
        a: "Il vous donne une adresse à vous, à mettre sur votre carte de visite et votre fiche Google. Les clients qui vous y trouvent réservent en direct. Le site ne remplace pas une application de mise en relation : il construit votre clientèle propre.",
      },
    ],
    intro:
      "Un site sobre qui donne confiance : vos trajets, vos tarifs et un moyen direct de réserver une course.",
    sections: [
      {
        titre: "Accueil",
        texte: "Votre secteur et votre numéro.",
      },
      {
        titre: "Transferts",
        texte: "Gares, aéroports, hôtels.",
      },
      {
        titre: "Mise à disposition",
        texte: "À l'heure ou à la journée.",
      },
      {
        titre: "Tarifs",
        texte: "Vos forfaits, annoncés à l'avance.",
      },
      {
        titre: "Le véhicule",
        texte: "Modèle, confort, nombre de places.",
      },
      {
        titre: "Réservation",
        texte: "Date, heure, adresses de départ et d'arrivée.",
      },
    ],
    conseils: [
      {
        titre: "Annoncez vos forfaits",
        texte: "Un prix fixe entre la gare et l'aéroport décide un client qui compare.",
      },
      {
        titre: "Montrez le véhicule",
        texte: "Remplacez l'image de l'IA par une photo de votre voiture.",
      },
      {
        titre: "Visez la clientèle directe",
        texte: "Entreprises, hôtels, habitués : dites pour qui vous roulez.",
      },
    ],
  },
  {
    id: "nettoyage",
    nom: "entreprise de nettoyage",
    famille: "service",
    attentes:
      "Un syndic, un gérant de bureaux ou un particulier confie ses clés avant de confier son ménage. Il veut savoir qui vient, à quelle fréquence, avec quels produits, et si vous êtes assuré. Il demande deux ou trois devis. Un site qui présente vos prestations, votre secteur et vos références lui donne une raison de vous appeler en premier.",
    outils: ["devis-et-factures", "avis-google", "referencement-seo-geo"],
    faq: [
      {
        q: "Comment un client demande-t-il un devis de nettoyage ?",
        a: "Par le formulaire du site : il indique le type de locaux, la surface et la fréquence souhaitée. La demande arrive dans votre boîte mail et dans votre espace Sitaly, où vous créez le devis qu'il accepte en ligne.",
      },
      {
        q: "Puis-je séparer mes offres pour les entreprises et pour les particuliers ?",
        a: "Oui. Demandez à l'IA une page pour les bureaux et les copropriétés, et une autre pour le ménage à domicile. Chaque public lit ce qui le concerne.",
      },
      {
        q: "Faut-il afficher mes tarifs ?",
        a: "Un prix à l'heure ou un forfait de départ rassure un particulier. Pour des bureaux, le devis après visite reste la règle : dites-le sur la page. L'IA n'écrit aucun prix que vous n'avez pas fourni.",
      },
      {
        q: "Combien coûte un site d'entreprise de nettoyage avec Sitaly ?",
        a: "La création est gratuite, sans carte bancaire, avec une adresse en .sitaly.fr. La formule Essentiel, à 39 € par mois sans engagement, ajoute votre nom de domaine en .fr ou en .com.",
      },
    ],
    intro:
      "Un site qui inspire confiance avant la première visite : vos prestations, votre secteur, vos garanties et une demande de devis en une minute.",
    sections: [
      {
        titre: "Accueil",
        texte: "Vos prestations et votre secteur, dès le premier écran.",
      },
      {
        titre: "Bureaux et commerces",
        texte: "Entretien régulier, vitres, remise en état.",
      },
      {
        titre: "Copropriétés",
        texte: "Parties communes, sorties de poubelles, contrats.",
      },
      {
        titre: "Particuliers",
        texte: "Ménage à domicile et fin de chantier.",
      },
      {
        titre: "Avis clients",
        texte: "Les retours de vos clients réguliers.",
      },
      {
        titre: "Demande de devis",
        texte: "Type de locaux, surface, fréquence.",
      },
    ],
    conseils: [
      {
        titre: "Dites qui vient",
        texte: "Une photo de l'équipe et quelques lignes rassurent un client qui remet ses clés.",
      },
      {
        titre: "Nommez votre secteur",
        texte: "Citez vos communes : Google montre d'abord les entreprises proches.",
      },
      {
        titre: "Affichez vos garanties",
        texte: "Assurance, produits utilisés, remplacement en cas d'absence : écrivez-le.",
      },
    ],
  },
  {
    id: "consultant",
    nom: "consultant",
    famille: "service",
    attentes:
      "Un dirigeant qui cherche un consultant tape votre nom après une recommandation ou une rencontre. Il veut comprendre en une minute quel problème vous réglez, pour quel type d'entreprise, et lire un résultat obtenu chez un client. Un site clair lui évite un premier appel pour rien et vous amène des demandes plus mûres.",
    outils: ["prise-de-rendez-vous", "blog-ia", "devis-et-factures"],
    faq: [
      {
        q: "Un profil LinkedIn ne suffit-il pas ?",
        a: "LinkedIn montre votre parcours. Un site présente votre offre, vos tarifs si vous les donnez et vos résultats, à une adresse qui vous appartient. Les deux se complètent : mettez le lien du site sur votre profil.",
      },
      {
        q: "Un prospect peut-il réserver un premier échange ?",
        a: "Oui, avec les formules Essentiel et Pro : il choisit un créneau depuis votre site et reçoit une confirmation par e-mail. Avec la formule gratuite, il vous écrit par le formulaire.",
      },
      {
        q: "Je n'ai pas le droit de citer mes clients.",
        a: "Décrivez la mission sans le nom : le secteur, la taille de l'entreprise, le problème et le résultat chiffré. L'IA rédige ces cas à partir de vos notes.",
      },
      {
        q: "Combien coûte un site de consultant avec Sitaly ?",
        a: "La création est gratuite, sans carte bancaire, avec une adresse en .sitaly.fr. La formule Essentiel, à 39 € par mois sans engagement, ajoute votre nom de domaine en .fr ou en .com.",
      },
    ],
    intro:
      "Un site qui dit en une phrase ce que vous réglez : votre offre, vos résultats et un premier échange à réserver.",
    sections: [
      {
        titre: "Accueil",
        texte: "Le problème que vous réglez, et pour qui.",
      },
      {
        titre: "Offres",
        texte: "Vos missions, du diagnostic à l'accompagnement.",
      },
      {
        titre: "Résultats",
        texte: "Deux ou trois cas clients, chiffres à l'appui.",
      },
      {
        titre: "À propos",
        texte: "Votre parcours, en quelques lignes.",
      },
      {
        titre: "Articles",
        texte: "Vos idées sur votre spécialité.",
      },
      {
        titre: "Contact",
        texte: "Formulaire ou rendez-vous en ligne.",
      },
    ],
    conseils: [
      {
        titre: "Une spécialité, pas dix",
        texte: "Un consultant qui annonce un seul sujet se retient mieux qu'un généraliste.",
      },
      {
        titre: "Donnez un chiffre",
        texte: "Un délai réduit, un coût évité : un résultat précis vaut un long discours.",
      },
      {
        titre: "Écrivez sur votre métier",
        texte: "Un article par mois montre votre méthode et aide Google à vous trouver.",
      },
    ],
  },
  {
    id: "formateur",
    nom: "formateur",
    famille: "service",
    attentes:
      "Un responsable de formation ou un particulier compare les programmes avant de vous écrire. Il cherche le contenu, la durée, le prix, les prochaines dates et les financements possibles. Il vérifie aussi votre numéro de déclaration d'activité et, pour un financement public, votre certification Qualiopi. Un site qui répond à ces points reçoit des demandes d'inscription, plus des demandes de renseignement.",
    outils: ["devis-et-factures", "prise-de-rendez-vous", "avis-google"],
    faq: [
      {
        q: "Puis-je présenter chaque formation sur sa page ?",
        a: "Oui. Donnez à l'IA le programme, la durée, le public et les prérequis : elle crée une page par formation, avec un formulaire d'inscription.",
      },
      {
        q: "Comment afficher mes prochaines sessions ?",
        a: "Écrivez à l'IA « ajoute une session le 12 mars à Lyon » : elle met la page à jour. Vous retirez une date passée de la même façon.",
      },
      {
        q: "Dois-je afficher Qualiopi et mon numéro de déclaration ?",
        a: "Si vous les détenez, oui : un financeur les cherche. Indiquez-les à l'IA, elle les place en pied de page et sur la page des formations. Elle n'affiche aucune certification que vous n'avez pas fournie.",
      },
      {
        q: "Combien coûte un site de formateur avec Sitaly ?",
        a: "La création est gratuite, sans carte bancaire, avec une adresse en .sitaly.fr. La formule Essentiel, à 39 € par mois sans engagement, ajoute votre nom de domaine en .fr ou en .com.",
      },
    ],
    intro:
      "Un site qui remplit vos sessions : vos programmes, vos dates, vos tarifs et une inscription simple.",
    sections: [
      {
        titre: "Accueil",
        texte: "Vos thèmes de formation et votre public.",
      },
      {
        titre: "Formations",
        texte: "Une page par programme : objectifs, durée, prix.",
      },
      {
        titre: "Prochaines sessions",
        texte: "Dates, lieux ou classes à distance.",
      },
      {
        titre: "Financement",
        texte: "Les prises en charge possibles, expliquées.",
      },
      {
        titre: "Avis des stagiaires",
        texte: "Les retours de vos sessions passées.",
      },
      {
        titre: "Inscription",
        texte: "Un formulaire par formation.",
      },
    ],
    conseils: [
      {
        titre: "Des objectifs concrets",
        texte: "Écrivez ce que le stagiaire sait faire à la fin de la formation.",
      },
      {
        titre: "Des dates à jour",
        texte: "Une session passée en première page fait douter de votre activité.",
      },
      {
        titre: "Montrez vos preuves",
        texte: "Certification, taux de satisfaction, avis : placez-les près du formulaire.",
      },
    ],
  },
  {
    id: "artisan",
    nom: "artisan",
    famille: "batiment",
    attentes:
      "Un client trouve un artisan par le bouche-à-oreille, puis il vérifie sur Google. Il tape votre nom, ou votre métier suivi de sa ville. S'il ne trouve rien, le doute s'installe. S'il trouve un site avec vos chantiers, vos garanties et votre numéro, la recommandation est confirmée.",
    outils: ["devis-et-factures", "avis-google", "agents-ia"],
    faq: [
      {
        q: "Je ne suis pas à l'aise avec l'informatique.",
        a: "Vous écrivez une phrase sur votre activité, comme vous la diriez à un client. L'IA crée le site. Pour changer quelque chose, vous lui écrivez une autre phrase.",
      },
      {
        q: "Mon métier n'est pas dans la liste des modèles.",
        a: "Les modèles sont des exemples. L'IA crée un site pour tout métier à partir de votre description : ramoneur, ferronnier, tapissier, plaquiste.",
      },
      {
        q: "Qu'est-ce qui est gratuit, et qu'est-ce qui est payant ?",
        a: "Gratuit : la création, la mise en ligne sur une adresse en .sitaly.fr et 50 crédits de retouche. Payant, à partir de 39 € par mois sans engagement : votre nom de domaine, la prise de rendez-vous en ligne et 500 crédits par mois.",
      },
      {
        q: "Le site m'apportera-t-il des chantiers ?",
        a: "Il vous rend trouvable et vérifiable : un client qui hésite voit vos chantiers et votre numéro. Personne ne peut garantir une place sur Google. Les avis récents et une fiche Google complète comptent autant que le site.",
      },
    ],
    intro:
      "Un site qui confirme une bonne recommandation : votre métier, vos chantiers, votre zone et votre numéro.",
    sections: [
      {
        titre: "Accueil",
        texte: "Votre métier, votre ville et votre numéro.",
      },
      {
        titre: "Prestations",
        texte: "Ce que vous faites, dans vos mots.",
      },
      {
        titre: "Réalisations",
        texte: "Vos chantiers en photos.",
      },
      {
        titre: "Zone d'intervention",
        texte: "Les communes où vous vous déplacez.",
      },
      {
        titre: "Garanties et avis",
        texte: "Vos assurances et les retours de vos clients.",
      },
      {
        titre: "Demande de devis",
        texte: "Un formulaire court, reçu par e-mail.",
      },
    ],
    conseils: [
      {
        titre: "Écrivez comme vous parlez",
        texte: "Décrivez votre activité en une phrase simple : l'IA garde vos mots.",
      },
      {
        titre: "Vos chantiers avant tout",
        texte: "Trois photos réelles valent mieux qu'une page de texte.",
      },
      {
        titre: "Un numéro, une zone",
        texte: "Ce sont les deux informations que cherche un client pressé.",
      },
    ],
  },
  {
    id: "auto-entrepreneur",
    nom: "auto-entrepreneur",
    famille: "service",
    attentes:
      "Quand on se lance, les premiers clients viennent de l'entourage, puis ils cherchent votre nom sur Google avant de s'engager. Un site, même d'une page, montre que l'activité est réelle : une offre claire, un prix, un moyen de vous joindre. Vous l'envoyez aussi par message, à la place d'un long discours.",
    outils: ["devis-et-factures", "identite-de-marque", "prise-de-rendez-vous"],
    faq: [
      {
        q: "Un site est-il obligatoire pour une micro-entreprise ?",
        a: "Non, aucune règle ne l'impose. Il devient utile dès que des inconnus doivent vous trouver ou vérifier votre sérieux avant de vous payer.",
      },
      {
        q: "Combien coûte un site quand on débute ?",
        a: "Avec Sitaly, rien : la création et la mise en ligne sont gratuites, sans carte bancaire. Vous passez à 39 € par mois, sans engagement, le jour où vous voulez votre nom de domaine.",
      },
      {
        q: "Je n'ai pas encore de nom d'entreprise ni de logo.",
        a: "Le générateur de noms de Sitaly en propose à partir de votre activité, et l'application crée un logo avec vos couleurs.",
      },
      {
        q: "Puis-je faire mes devis et mes factures au même endroit ?",
        a: "Oui. Sitaly crée vos devis et vos factures, que vos clients acceptent et paient en ligne.",
      },
    ],
    intro:
      "Un site simple pour démarrer : qui vous êtes, ce que vous proposez, vos tarifs et comment vous joindre.",
    sections: [
      {
        titre: "Accueil",
        texte: "Votre activité et votre ville, en une phrase.",
      },
      {
        titre: "Services",
        texte: "Ce que vous vendez, clairement.",
      },
      {
        titre: "Tarifs",
        texte: "Vos prix ou vos forfaits.",
      },
      {
        titre: "À propos",
        texte: "Votre parcours, en quelques lignes.",
      },
      {
        titre: "Avis",
        texte: "Les retours de vos premiers clients.",
      },
      {
        titre: "Contact",
        texte: "Formulaire, téléphone, zone.",
      },
    ],
    conseils: [
      {
        titre: "Commencez petit",
        texte: "Une page claire vaut mieux qu'un site jamais fini.",
      },
      {
        titre: "Une adresse à votre nom",
        texte: "Un domaine en .fr sur vos devis et vos cartes de visite inspire confiance.",
      },
      {
        titre: "Vos mentions légales",
        texte:
          "Un site professionnel affiche votre nom, votre SIRET et un contact : demandez à l'IA de les ajouter.",
      },
    ],
  },
];

export const getModele = (id: string) => MODELES.find((m) => m.id === id);

/** « de plombier », « d'électricien » : l'élision devant une voyelle ou un h muet. */
export const deMetier = (nom: string) =>
  /^[aeiouyhàâéèêîôûœ]/i.test(nom) ? `d'${nom}` : `de ${nom}`;

/**
 * La fiche d'aperçu des métiers ajoutés le 9 novembre 2026, à la forme de
 * `Metier` (Vitrine.tsx) : l'entreprise fictive du mini-site, ses couleurs et la
 * phrase qui ouvre l'application. Les deux pages générales (artisan,
 * auto-entrepreneur) n'ont pas de phrase : le visiteur écrit la sienne.
 */
export const METIERS_PLUS = [
  {
    id: "electricien",
    activite: "entreprise d'électricité",
    entreprise: "Morel Électricité",
    titre: "Votre électricien, du tableau à la borne",
    phrase: "Électricien à Rennes, mise aux normes et bornes de recharge",
    couleur: "#14213d",
    accent: "#fca311",
  },
  {
    id: "peintre",
    activite: "entreprise de peinture",
    entreprise: "Atelier Blanchard",
    titre: "Des murs nets, un chantier propre",
    phrase: "Peintre en bâtiment à Tours, intérieurs et façades",
    couleur: "#26333a",
    accent: "#8fd3c8",
  },
  {
    id: "menuisier",
    activite: "menuiserie",
    entreprise: "Menuiserie Lebrun",
    titre: "Du sur-mesure, fabriqué à l'atelier",
    phrase: "Menuisier à Annecy, dressings et escaliers sur mesure",
    couleur: "#3a2a1c",
    accent: "#e0b36a",
  },
  {
    id: "couvreur",
    activite: "entreprise de couverture",
    entreprise: "Toitures Marchand",
    titre: "Votre toiture, réparée avant l'hiver",
    phrase: "Couvreur à Angers, réparation de toiture et zinguerie",
    couleur: "#232b38",
    accent: "#e07a5f",
  },
  {
    id: "macon",
    activite: "entreprise de maçonnerie",
    entreprise: "Maçonnerie Ferrand",
    titre: "Extensions, murs et terrasses qui durent",
    phrase: "Maçon à Nîmes, extensions et terrasses",
    couleur: "#33302b",
    accent: "#e9c46a",
  },
  {
    id: "estheticienne",
    activite: "institut de beauté",
    entreprise: "Institut Opaline",
    titre: "Un moment pour vous, sur rendez-vous",
    phrase: "Esthéticienne à Toulouse, soins du visage et épilations",
    couleur: "#3b2a35",
    accent: "#f0b8c4",
  },
  {
    id: "restaurant",
    activite: "restaurant",
    entreprise: "Chez Margaux",
    titre: "Cuisine de marché, midi et soir",
    phrase: "Restaurant à Dijon, cuisine de marché et menu du midi",
    couleur: "#2d1f1a",
    accent: "#f2a65a",
  },
  {
    id: "vtc",
    activite: "activité de chauffeur VTC",
    entreprise: "Lenoir Chauffeur",
    titre: "Votre chauffeur, à l'heure à la gare",
    phrase: "Chauffeur VTC à Marseille, transferts gare et aéroport",
    couleur: "#15171c",
    accent: "#d4af37",
  },
  {
    id: "nettoyage",
    activite: "entreprise de nettoyage",
    entreprise: "Net & Clair",
    titre: "Des locaux propres, chaque matin",
    phrase: "Entreprise de nettoyage à Lille, bureaux et copropriétés",
    couleur: "#1d2f33",
    accent: "#8fd6c4",
  },
  {
    id: "consultant",
    activite: "activité de conseil",
    entreprise: "Durand Conseil",
    titre: "Des décisions claires pour votre entreprise",
    phrase: "Consultant en gestion à Lyon, accompagnement des dirigeants de PME",
    couleur: "#1c2536",
    accent: "#e6c27a",
  },
  {
    id: "formateur",
    activite: "organisme de formation",
    entreprise: "Cap Formation",
    titre: "Des formations qui servent dès le lundi",
    phrase: "Formateur à Bordeaux, management et prise de parole",
    couleur: "#2b2440",
    accent: "#f2b880",
  },
  {
    id: "artisan",
    activite: "entreprise artisanale",
    entreprise: "Girard Rénovation",
    titre: "Des travaux soignés, près de chez vous",
    phrase: "",
    couleur: "#1f2d3a",
    accent: "#f4a261",
  },
  {
    id: "auto-entrepreneur",
    activite: "activité d'indépendant",
    entreprise: "Clara Martin",
    titre: "Mon activité, présentée en une page",
    phrase: "",
    couleur: "#1f2937",
    accent: "#a5b4fc",
  },
];
