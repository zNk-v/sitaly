import { euros, SITALY_PHONE_DISPLAY } from "@/lib/config";
import {
  CREATEUR_IA as IA,
  GARANTIE_JOURS,
  MENTION_TVA,
  PHRASE_APERCU,
  PHRASE_PRIX_APPEL,
} from "@/data/offres";

/**
 * Les questions fréquentes sur Sitaly App, affichées par l'accueil et par
 * /tarifs/ (composant Faq de components/produit/Produit.tsx), et reprises en
 * données structurées FAQPage sur les deux pages.
 *
 * Sorties du composant le 16 novembre 2026 (SITA-22) : le chat du site les lit
 * aussi, par scripts/chat-connaissance.mjs, et un script Node ne peut pas
 * importer un fichier qui embarque React.
 */
export const FAQ_PRODUIT = [
  {
    q: "Combien coûte un site créé avec Sitaly ?",
    a: `${PHRASE_APERCU} ${IA.essentiel.nom} coûte ${PHRASE_PRIX_APPEL} (premier abonnement, au mois), et ${IA.pro.nom} ${euros(IA.pro.mensuel)} par mois. À l'année : ${euros(IA.essentiel.annuel)} et ${euros(IA.pro.annuel)}, soit 15 % de moins. Satisfait ou remboursé pendant ${GARANTIE_JOURS} jours sur le premier paiement. ${MENTION_TVA}.`,
  },
  {
    q: "Faut-il savoir faire un site ?",
    a: "Non. Vous décrivez votre activité en une phrase, l'IA écrit le site, choisit la mise en page et crée la photo. Ensuite, vous le retouchez en écrivant ce que vous voulez changer, comme à une personne.",
  },
  {
    q: "Combien de temps faut-il pour avoir mon site ?",
    a: "Environ une minute pour la création. Vous le relisez, vous changez ce que vous voulez, puis vous le publiez en un clic avec Essentiel ou Pro.",
  },
  {
    q: "Comment modifier mon site ?",
    a: "Écrivez votre demande à l'IA : « ajoute mes horaires », « ton plus chaleureux », « une section tarifs ». Pour corriger un mot, double-cliquez dessus. Vous pouvez aussi déplacer les sections et changer de thème en un clic.",
  },
  {
    q: "À quoi servent les crédits IA ?",
    a: "Chaque demande à l'IA consomme des crédits : 1 pour retoucher une section, 2 pour une demande sur tout le site, 5 pour une photo créée par l'IA. La création du site elle-même ne coûte aucun crédit. Les crédits d'Essentiel et de Pro valent pour le mois en cours et repartent à zéro le mois suivant. Pour un mois chargé, des packs de crédits s'achètent en plus, sans date de fin.",
  },
  {
    q: "Et les photos ?",
    a: "Ajoutez les vôtres, y compris celles de votre iPhone, ou faites-en créer par l'IA. Une image créée par l'IA illustre votre métier : elle n'est jamais présentée comme une de vos réalisations.",
  },
  {
    q: "L'IA peut-elle écrire des choses fausses ?",
    a: "Une IA peut se tromper : relisez avant de publier. Ses consignes lui interdisent d'inventer des avis, des chiffres, des certifications ou des années d'expérience, et elle n'écrit des prix que si vous les donnez.",
  },
  {
    q: "Quelle sera l'adresse de mon site ?",
    a: "Votre site est publié sur votre-nom.sitaly.fr dès la mise en ligne. Avec Essentiel et Pro, Sitaly vous offre aussi un nom en .fr ou en .com, enregistré à votre nom et branché sur votre site en quelques heures.",
  },
  {
    q: "Que puis-je faire sans payer ?",
    a: `Voir votre site entier, écrit par l'IA, sans compte ni carte. Vous créez ensuite votre compte gratuitement et vous retouchez le site dans l'éditeur. Pour le mettre en ligne, choisissez ${IA.essentiel.nom} ou ${IA.pro.nom}.`,
  },
  {
    q: "Et si Sitaly ne me convient pas ?",
    a: `Satisfait ou remboursé pendant ${GARANTIE_JOURS} jours : sur le premier paiement d'un abonnement, une demande à contact@sitaly.fr suffit, sans justification.`,
  },
  {
    q: "Mon site sera-t-il trouvé sur Google ?",
    a: "Personne ne peut garantir une place. Chaque site part avec les bases : pages rapides et adaptées au téléphone, titre et description, fiche de votre entreprise lisible par Google, plan du site.",
  },
  {
    q: "Puis-je arrêter quand je veux ?",
    a: "Oui. L'abonnement mensuel se résilie chaque mois. L'abonnement annuel est payé pour l'année.",
  },
  {
    q: "Je préfère qu'on s'occupe de tout : c'est possible ?",
    a: `Oui, l'équipe Sitaly peut créer et suivre votre site pour vous. Appelez-nous au ${SITALY_PHONE_DISPLAY}, on en parle.`,
  },
];
