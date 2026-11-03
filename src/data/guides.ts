/**
 * Les guides pas à pas de Sitaly App (3 novembre 2026), publiés sur
 * sitaly.fr/guides/. Les textes viennent de l'application
 * (sitaly-saas/src/aide/guides.ts) et les vidéos y sont servies
 * (app.sitaly.fr/tutos/) : quand un guide change dans l'app, on recopie
 * ses textes ici.
 */
export interface EtapeGuide {
  titre: string;
  /** Markdown simple : **gras** et paragraphes. */
  texte: string;
  video?: false;
}

export interface Guide {
  id: string;
  titre: string;
  resume: string;
  duree: string;
  seoTitre: string;
  description: string;
  etapes: EtapeGuide[];
}

export const APP_TUTOS = "https://app.sitaly.fr/tutos";
export const clipGuide = (id: string, n: number) => `${APP_TUTOS}/${id}-${n + 1}.mp4`;
export const imageGuide = (id: string, n: number) => `${APP_TUTOS}/${id}-${n + 1}.jpg`;

export const GUIDES: Guide[] = [
  {
    id: "publier",
    titre: "Publier votre site",
    resume: "Choisir son adresse, mettre en ligne, puis mettre à jour.",
    duree: "2 min",
    seoTitre: "Publier son site internet avec Sitaly, pas à pas",
    description:
      "Choisir l'adresse de votre site, le mettre en ligne, le mettre à jour et prendre votre nom de domaine : le guide en vidéo.",
    etapes: [
      {
        titre: "Choisissez l'adresse de votre site",
        texte:
          "Dans l'éditeur, cliquez sur **Publier**, en haut à droite. Sitaly propose une adresse tirée de votre nom : gardez-la ou changez-la.\n\nS'il reste des textes d'exemple, Sitaly les liste : remplacez-les avant de publier.",
      },
      {
        titre: "Mettez votre site en ligne",
        texte:
          "Cliquez sur **Publier sur …sitaly.fr**. Votre site est en ligne en quelques secondes, et le lien s'affiche pour l'ouvrir ou le partager.",
      },
      {
        titre: "Mettez-le à jour après vos retouches",
        texte:
          "Vos modifications restent dans l'éditeur tant que vous ne les publiez pas. Quand vous êtes prêt, cliquez sur **Mettre à jour** : vos visiteurs voient la nouvelle version.",
      },
      {
        titre: "Prenez votre nom de domaine",
        texte:
          "Avec Essentiel et Pro, ouvrez **Mon site** : la carte **Votre nom de domaine** cherche le nom que vous voulez. Sitaly l'achète et le branche pour vous, comptez quelques heures avant qu'il réponde.",
        video: false,
      },
    ],
  },
  {
    id: "site",
    titre: "Modifier votre site",
    resume: "Changer un texte, réorganiser les sections, publier.",
    duree: "2 min",
    seoTitre: "Modifier son site internet sans compétence technique",
    description:
      "Changer un texte, réorganiser les sections et demander une modification à l'IA : le guide en vidéo de l'éditeur Sitaly.",
    etapes: [
      {
        titre: "Changez un texte",
        texte:
          "Ouvrez **Mon site** puis l'éditeur. **Double-cliquez** sur un texte, écrivez, puis cliquez ailleurs. Tout s'enregistre seul.",
      },
      {
        titre: "Réorganisez les sections",
        texte:
          "Ouvrez le menu **Page** en haut. Sous la page en cours, ses sections s'affichent : glissez-les pour changer l'ordre, ou ajoutez-en une.",
      },
      {
        titre: "Demandez à l'IA",
        texte:
          "Cliquez sur **Demander à l'IA**, en bas de l'éditeur, et écrivez ce que vous voulez changer en français courant : « ajoute une section avec mes tarifs ». L'IA s'en charge en quelques secondes.\n\nPour une seule section, survolez-la et cliquez sur **IA** : la demande ne touche qu'elle.",
      },
    ],
  },
  {
    id: "theme",
    titre: "Changer de thème et de couleurs",
    resume: "Une autre allure en un clic, vos textes restent.",
    duree: "1 min",
    seoTitre: "Changer le thème et les couleurs de son site",
    description:
      "Une autre allure en un clic, sans perdre vos textes ni vos photos : le guide en vidéo.",
    etapes: [
      {
        titre: "Ouvrez les thèmes",
        texte:
          "Dans l'éditeur, cliquez sur **Thèmes**. Chaque carte montre l'allure du thème et ses deux couleurs.",
      },
      {
        titre: "Choisissez vos couleurs, puis le thème",
        texte:
          "En haut, gardez **Les miennes** pour vos couleurs actuelles, ou prenez **Celles du thème**. Cliquez ensuite sur un thème : le site change aussitôt, vos textes et vos photos restent.",
      },
    ],
  },
  {
    id: "logo",
    titre: "Créer votre logo avec l'IA",
    resume: "Un style choisi par duels, deux logos à votre nom, le meilleur sur votre site.",
    duree: "2 min",
    seoTitre: "Créer son logo avec l'IA, pas à pas",
    description:
      "Choisir un style par duels, faire dessiner deux logos à votre nom et l'appliquer à votre site : le guide en vidéo.",
    etapes: [
      {
        titre: "Choisissez un style par duels",
        texte:
          "Ouvrez **Identité de marque**. Deux styles s'affichent : cliquez sur celui qui vous ressemble le plus. Après cinq duels, votre style est choisi.",
      },
      {
        titre: "Faites dessiner deux logos",
        texte:
          "Ajoutez une idée si vous voulez (« une goutte d'eau »), puis cliquez sur **Dessiner mes deux logos**. L'IA les dessine à votre nom, aux couleurs de votre site, en une trentaine de secondes.",
      },
      {
        titre: "Gardez le meilleur et appliquez-le",
        texte:
          "Cliquez sur votre préféré. Vérifiez l'orthographe du nom, regardez-le sur la camionnette, la carte de visite ou l'enseigne, puis cliquez sur **Appliquer à mon site**.",
      },
    ],
  },
  {
    id: "facture",
    titre: "Envoyer une facture",
    resume: "De vos informations légales à la facture émise et payée.",
    duree: "3 min",
    seoTitre: "Faire une facture d'artisan en ligne, pas à pas",
    description:
      "Mentions obligatoires, numérotation, envoi et paiement : comment envoyer une facture conforme avec Sitaly, en vidéo.",
    etapes: [
      {
        titre: "Remplissez vos informations, une seule fois",
        texte:
          "Ouvrez **Paramètres** dans le menu. Indiquez l'adresse de l'entreprise et votre **SIRET**, puis choisissez votre régime de TVA. Cliquez sur **Enregistrer**.\n\nCes mentions sont obligatoires : Sitaly les reprend sur chaque devis et chaque facture.",
      },
      {
        titre: "Créez la facture",
        texte:
          "Ouvrez **Devis et factures**, puis cliquez sur **Nouvelle facture**. Un brouillon s'ouvre : rien n'est envoyé tant que vous ne l'avez pas décidé.",
      },
      {
        titre: "Indiquez le client et la prestation",
        texte:
          "Choisissez un client existant ou tapez son **nom**. Ajoutez son e-mail si vous voulez lui envoyer la facture par Sitaly.\n\nDécrivez la prestation sur la ligne, puis le **prix unitaire HT**. Le total se calcule seul. **Ajouter une ligne** pour une autre prestation.",
      },
      {
        titre: "Émettez-la",
        texte:
          "Cliquez sur **Envoyer** (ou **Émettre** sans e-mail). La facture reçoit son numéro, qui se suit d'une facture à l'autre comme l'exige la loi. Elle ne se modifie plus : pour la corriger, faites un avoir.\n\nVous pouvez ensuite l'imprimer ou l'enregistrer en PDF.",
      },
      {
        titre: "Notez le paiement",
        texte:
          "Quand le client a payé, choisissez le mode de paiement et cliquez sur **Marquer payée**. La facture sort de la liste « En retard ».",
      },
    ],
  },
  {
    id: "devis",
    titre: "Faire un devis, puis la facture",
    resume: "Un devis accepté devient une facture en un clic.",
    duree: "2 min",
    seoTitre: "Faire un devis en ligne et le transformer en facture",
    description:
      "Préparer un devis, le faire accepter en ligne, puis créer la facture en un clic : le guide en vidéo.",
    etapes: [
      {
        titre: "Préparez le devis",
        texte:
          "Dans **Devis et factures**, cliquez sur **Nouveau devis**. Tapez le nom du client, décrivez la prestation et son prix.",
      },
      {
        titre: "Envoyez-le",
        texte:
          "Cliquez sur **Envoyer** : le devis reçoit son numéro. Envoyé par e-mail, votre client l'ouvre en ligne et peut l'accepter en écrivant son nom.",
      },
      {
        titre: "Transformez-le en facture",
        texte:
          "Devis accepté ? Cliquez sur **Créer la facture** : elle reprend le client et les lignes du devis. Relisez-la, puis émettez-la.",
      },
    ],
  },
  {
    id: "clients",
    titre: "Suivre vos demandes et vos clients",
    resume: "Une fiche par client, son statut, son historique et ses devis.",
    duree: "2 min",
    seoTitre: "Suivre ses demandes et ses clients, sans tableur",
    description:
      "Une fiche par client, son statut, son historique et ses devis : le guide en vidéo du carnet de clients Sitaly.",
    etapes: [
      {
        titre: "Ajoutez une fiche",
        texte:
          "Ouvrez **Demandes et clients**, puis cliquez sur **Ajouter**. Tapez le nom et le téléphone, puis cliquez sur **Ajouter** en bas de la fenêtre.\n\nLes messages de votre site et les rendez-vous créent leur fiche tout seuls.",
      },
      {
        titre: "Notez où vous en êtes",
        texte:
          "Cliquez sur le crayon d'une fiche. Changez son **statut** (Contacté, Devis envoyé, Client) et ajoutez une ligne à l'**historique** : un appel, une visite.",
      },
      {
        titre: "Faites-lui un devis",
        texte:
          "Dans la même fenêtre, **Nouveau devis** ouvre un devis déjà rempli avec son nom et ses coordonnées. Il ne reste que la prestation et le prix.",
      },
    ],
  },
  {
    id: "rendez-vous",
    titre: "Proposer la prise de rendez-vous",
    resume: "Vos prestations, vos horaires, et un bouton de réservation sur votre site.",
    duree: "2 min",
    seoTitre: "Proposer la prise de rendez-vous en ligne sur son site",
    description:
      "Vos prestations, vos horaires et un bouton de réservation sur votre site : le guide en vidéo.",
    etapes: [
      {
        titre: "Ajoutez vos prestations",
        texte:
          "Ouvrez **Rendez-vous**. Tapez le nom d'une prestation, choisissez sa durée et son prix, puis cliquez sur **Ajouter**. Recommencez pour chacune.",
      },
      {
        titre: "Réglez vos horaires",
        texte:
          "Changez les heures des créneaux de chaque jour. Décochez un jour pour le fermer. Cliquez ensuite sur **Enregistrer les horaires**.",
      },
      {
        titre: "Ouvrez la réservation",
        texte:
          "Cliquez sur **Ouvrir la réservation** : un bouton « Prendre rendez-vous » s'ajoute à votre site. Chaque réservation arrive dans **Prochains rendez-vous**, dans vos clients et par e-mail.\n\nLa prise de rendez-vous est comprise dans Essentiel et Pro.",
      },
    ],
  },
  {
    id: "agents",
    titre: "Laisser l'IA préparer vos réponses",
    resume: "L'agent rédige la réponse à chaque demande, vous relisez et envoyez.",
    duree: "2 min",
    seoTitre: "Répondre aux demandes de ses clients avec l'IA",
    description:
      "L'agent rédige la réponse à chaque message de votre site, vous relisez et envoyez : le guide en vidéo.",
    etapes: [
      {
        titre: "Activez l'agent",
        texte:
          "Dans le menu, sous **Agents**, ouvrez **Réponse aux demandes**, puis cliquez sur l'interrupteur. Chaque message reçu sur votre site arrive avec une réponse déjà rédigée.",
      },
      {
        titre: "Relisez, puis envoyez",
        texte:
          "Les urgences passent en tête de **À traiter**. Corrigez le texte si besoin, puis cliquez sur **Envoyer**. L'agent n'envoie jamais rien sans vous.",
      },
      {
        titre: "Donnez-lui votre ton",
        texte:
          "Cliquez sur **Régler** : tutoiement ou vouvoiement, votre signature, et vos consignes, par exemple « je n'interviens pas le dimanche ».",
      },
    ],
  },
  {
    id: "visibilite",
    titre: "Être trouvé sur Google et les IA",
    resume: "Annuaires, recherches de vos clients, présence dans ChatGPT.",
    duree: "3 min",
    seoTitre: "Être trouvé sur Google et dans ChatGPT : le guide",
    description:
      "Annuaires, recherches de vos clients, présence dans les IA : les trois gestes qui comptent, en vidéo.",
    etapes: [
      {
        titre: "Inscrivez-vous dans les annuaires",
        texte:
          "Dans **SEO et IA**, ouvrez **Annuaires**. Inscrivez-vous sur chacun avec **S'inscrire**, puis cochez **J'y suis**. Votre score monte aussitôt.",
      },
      {
        titre: "Couvrez les recherches de vos clients",
        texte:
          "Ouvrez **Recherches**. Pour chaque recherche que votre site ne couvre pas, **Créer la page** prépare la demande à l'IA de l'éditeur, **Écrire l'article** ouvre le blog avec le sujet.",
      },
      {
        titre: "Testez-vous dans les IA",
        texte:
          "Ouvrez **Présence dans les IA**. Chaque question s'ouvre dans ChatGPT, Perplexity, Claude ou Google en un clic. Lisez la réponse, puis notez **Cité** ou non.",
      },
    ],
  },
  {
    id: "parrainage",
    titre: "Parrainer une entreprise",
    resume: "Partager votre lien et suivre vos gains.",
    duree: "1 min",
    seoTitre: "Parrainer une entreprise et toucher une commission",
    description: "Partager votre lien Sitaly et suivre vos gains : le guide en vidéo.",
    etapes: [
      {
        titre: "Copiez votre lien",
        texte:
          "Ouvrez **Parrainage**, en bas du menu, puis cliquez sur **Copier**. Envoyez le lien par WhatsApp, SMS ou e-mail.",
      },
      {
        titre: "Prenez un texte tout prêt",
        texte:
          "L'onglet **Textes à partager** propose un SMS, un e-mail et un post, avec votre lien dedans. Copiez, collez, envoyez.",
      },
    ],
  },
  {
    id: "abonnement",
    titre: "Changer de formule ou résilier",
    resume: "Changer d'offre, résilier en deux clics, ou revenir sur sa décision.",
    duree: "1 min",
    seoTitre: "Changer de formule ou résilier son abonnement Sitaly",
    description:
      "Changer d'offre, résilier en deux clics ou revenir sur sa décision : le guide en vidéo.",
    etapes: [
      {
        titre: "Choisissez votre formule",
        texte:
          "Ouvrez **Abonnement** dans le menu. Choisissez une formule, au mois ou à l'année. Déjà abonné ? Le changement passe par l'espace de paiement, sans second abonnement.",
      },
      {
        titre: "Résiliez en deux clics",
        texte:
          "Cliquez sur **Résilier**, donnez une raison si vous le souhaitez, puis **Confirmer la résiliation**. Vous gardez tout jusqu'à la fin de la période payée.",
      },
      {
        titre: "Changez d'avis",
        texte:
          "Tant que la date n'est pas passée, **Reprendre mon abonnement** annule la résiliation. **Carte et factures** ouvre vos factures et votre moyen de paiement.",
      },
    ],
  },
];

export const getGuide = (id: string) => GUIDES.find((g) => g.id === id);
