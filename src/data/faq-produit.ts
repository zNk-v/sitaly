import { euros, SITALY_PHONE_DISPLAY } from "@/lib/config";
import { CREATEUR_IA as IA, MENTION_TVA } from "@/data/offres";

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
    a: `La formule ${IA.decouverte.nom} est gratuite, sans carte bancaire. ${IA.essentiel.nom} coûte ${euros(IA.essentiel.mensuel)} par mois et ${IA.pro.nom} ${euros(IA.pro.mensuel)} par mois, ou ${euros(IA.essentiel.annuel)} et ${euros(IA.pro.annuel)} à l'année, soit 15 % de moins. ${MENTION_TVA}.`,
  },
  {
    q: "Faut-il savoir faire un site ?",
    a: "Non. Vous décrivez votre activité en une phrase, l'IA écrit le site, choisit la mise en page et crée la photo. Ensuite, vous le retouchez en écrivant ce que vous voulez changer, comme à une personne.",
  },
  {
    q: "Combien de temps faut-il pour avoir mon site ?",
    a: "Environ une minute pour la création. Vous le relisez, vous changez ce que vous voulez, puis vous le publiez en un clic.",
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
    a: "Votre site est publié sur votre-nom.sitaly.fr. Avec Essentiel et Pro, Sitaly vous offre un nom en .fr ou en .com, enregistré à votre nom et branché sur votre site en quelques heures.",
  },
  {
    q: `Que ne permet pas la formule ${IA.decouverte.nom} ?`,
    a: `Vous créez votre site et vous le publiez sans payer, sur une adresse en .sitaly.fr. Quatre choses restent fermées : votre nom de domaine, la mention « Site créé avec Sitaly » qui reste au pied de votre site, le carnet de clients au-delà de ${IA.decouverte.contactsMax} contacts, et les factures au-delà de trois par mois. ${IA.essentiel.nom}, à ${euros(IA.essentiel.mensuel)} par mois, lève les quatre et ajoute la prise de rendez-vous, vos avis Google et les relances d'impayés.`,
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
