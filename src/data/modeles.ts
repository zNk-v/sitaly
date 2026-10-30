/**
 * Les modèles de sites (31 octobre 2026), comme les « templates » de
 * durable.com : une page par métier, /modeles/<id>/, qui montre le site que
 * l'IA prépare et ouvre l'application avec le métier déjà écrit.
 *
 * Les identifiants, les photos et les couleurs sont ceux des métiers de
 * l'accueil (METIERS, src/components/produit/Vitrine.tsx) ; ce fichier n'ajoute
 * que le texte propre à chaque page.
 */

export interface Modele {
  id: string;
  /** Le métier en minuscules, pour les phrases : « site internet pour fleuriste ». */
  nom: string;
  intro: string;
  /** Les sections du site que l'IA prépare pour ce métier. */
  sections: { titre: string; texte: string }[];
  conseils: { titre: string; texte: string }[];
}

export const MODELES: Modele[] = [
  {
    id: "fleuriste",
    nom: "fleuriste",
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
    intro:
      "Un site à l'image de votre salon : vos prestations, vos prix et la prise de rendez-vous en avant.",
    sections: [
      { titre: "Accueil", texte: "L'ambiance du salon et votre adresse." },
      { titre: "Prestations", texte: "Coupe, couleur, soins, chignons." },
      { titre: "Tarifs", texte: "Femme, homme, enfant : une grille lisible." },
      { titre: "L'équipe", texte: "Vos coiffeuses et leurs spécialités." },
      { titre: "Avis clients", texte: "Les retours qui donnent confiance." },
      { titre: "Rendez-vous", texte: "Téléphone, formulaire et réservation en ligne des créneaux libres." },
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
];

export const getModele = (id: string) => MODELES.find((m) => m.id === id);
