import { CREATEUR_IA as IA } from "@/data/offres";

/**
 * Les pages produits de Sitaly App (31 octobre 2026), sur le modèle des pages
 * /bookings, /ai-blog-generator, /seo-geo et /ai-brand-builder de
 * durable.com : une page par fonction de l'application, servie par
 * src/routes/produits.$id.tsx.
 *
 * Tout ce qui est écrit ici existe dans l'application (~/sitaly-saas) :
 * - rendez-vous : rubrique Rendez-vous, page /rendez-vous/ des sites,
 *   formules Essentiel et Pro (fonction rdv_compte) ;
 * - blog : rubrique Blog, fonction ecrire-article (1 crédit les idées,
 *   6 crédits l'article), pages /blog/ des sites ;
 * - visibilite : rubrique Visibilité (score sur 100), llms.txt, plan du site
 *   et données structurées produits par le programme sitaly-sites ;
 * - marque : rubrique Identité de marque (src/site/logo.ts), sans crédit ;
 * - factures (1er novembre 2026) : rubrique Devis et factures, page client
 *   /d/<jeton>, paiement Stripe Connect sans commission, relances en
 *   Essentiel et Pro, 3 factures par mois en Découverte.
 * - agents-ia (4 novembre 2026) : rubriques Réponse aux demandes (fonction
 *   agent-demandes, 1 crédit par réponse), Avis Google (agent-avis et
 *   google-fiche : fiche connectée depuis le 5 novembre, avis relevés chaque
 *   matin, réponse publiée sur Google après le clic de l'artisan, demandes
 *   d'avis par e-mail, QR code ou envoi automatique, avis sur le site), Blog et
 *   Assistant IA (bilan de la semaine chaque lundi par e-mail). Rien ne
 *   part sans l'accord de l'entrepreneur.
 * - avis-google (5 novembre 2026) : rubrique Avis Google (fonctions
 *   google-fiche et agent-avis) : fiche connectée en Essentiel et Pro, avis
 *   relevés chaque matin, réponse préparée et publiée après un clic, demandes
 *   d'avis par e-mail, SMS, QR code ou envoi automatique, avis sur le site.
 *   Jamais « partenaire de Google » (règle de Google).
 */

export type ProduitId = "devis-et-factures" | "prise-de-rendez-vous" | "agents-ia" | "avis-google" | "blog-ia" | "referencement-seo-geo" | "identite-de-marque";

export interface Produit {
  id: ProduitId;
  /** Le nom dans le menu, le pied de page et le fil d'Ariane. */
  nom: string;
  menuDesc: string;
  /** Le titre de la page : 32 signes environ, deux lignes au plus. */
  titre: string;
  /** La phrase sous le titre : ce que fait le produit, en clair. */
  intro: string;
  seoTitre: string;
  description: string;
  etapes: { titre: string; texte: string }[];
  points: { titre: string; texte: string }[];
  /** Ce que chaque formule (Découverte, Essentiel, Pro) en donne. */
  inclus: [string | false, string | false, string | false];
  noteInclus: string;
  /** Le bouton de la page : il reprend la promesse du titre, pas « Créer mon site ». */
  cta: string;
  faq: { q: string; a: string }[];
}

export const PRODUITS: Produit[] = [
  {
    id: "devis-et-factures",
    cta: "Faire mon premier devis",
    nom: "Devis et factures",
    menuDesc: "Devis acceptés en ligne, factures payées par carte.",
    titre: "Facturez, soyez payé",
    intro:
      "Un devis que votre client accepte en ligne, une facture conforme qu'il règle par carte ou par virement, des relances qui partent seules. Depuis la fiche de votre client, en deux minutes.",
    seoTitre: "Devis et factures pour artisans et indépendants",
    description:
      "Devis et factures conformes, acceptés en ligne et payés par carte sans commission. Les impayés sont relancés pour vous. Inclus dans Sitaly.",
    etapes: [
      {
        titre: "Préparez le devis",
        texte: "Choisissez le client dans votre liste, ajoutez vos lignes, quantités et TVA. La feuille se dessine à côté, telle que votre client la verra.",
      },
      {
        titre: "Votre client l'accepte en ligne",
        texte: "Il reçoit un lien par e-mail, ou par SMS si vous le copiez. Il lit, écrit son nom, et c'est un bon pour accord. Vous êtes prévenu aussitôt.",
      },
      {
        titre: "Facturez et encaissez",
        texte: "Le devis devient une facture en un clic. Votre client la paie par carte ou par virement ; elle passe en « payée » et votre suivi se met à jour.",
      },
    ],
    points: [
      {
        titre: "Conforme au droit français",
        texte: "Numérotation sans trou, facture figée une fois envoyée, avoir pour corriger, SIRET, pénalités de retard, mention 293 B en franchise, assurance décennale.",
      },
      {
        titre: "Payé par carte, sans commission",
        texte: "Reliez votre compte Stripe en cinq minutes : l'argent arrive chez vous. Sitaly ne prend rien, seuls les frais Stripe s'appliquent.",
      },
      {
        titre: "Les impayés relancés pour vous",
        texte: "Un rappel part au client le lendemain de l'échéance, puis à huit et quinze jours. Vous voyez d'un coup d'œil ce qui reste à encaisser.",
      },
      {
        titre: "Relié à vos clients",
        texte: "Chaque devis, facture et paiement entre dans l'historique du client. Un devis accepté fait passer la fiche en « client ».",
      },
    ],
    inclus: ["3 factures par mois", "Illimité", "Illimité"],
    noteInclus:
      "Devis illimités dans toutes les formules. Relances automatiques en Essentiel et Pro. Paiement par carte : frais Stripe seulement, aucune commission Sitaly.",
    faq: [
      {
        q: "Mes factures sont-elles conformes ?",
        a: "Oui. Elles portent les mentions obligatoires, se numérotent sans trou et ne se modifient plus une fois envoyées ; une erreur se corrige par un avoir, comme l'exige la loi.",
      },
      {
        q: "Et la facture électronique obligatoire ?",
        a: "Pour vos clients particuliers, la facture PDF reste valable. Entre professionnels, l'émission électronique devient obligatoire pour les petites entreprises le 1er septembre 2027 : Sitaly s'y prépare et vous préviendra avant.",
      },
      {
        q: "Combien coûte le paiement par carte ?",
        a: "Sitaly ne prend aucune commission. Stripe facture ses propres frais par paiement, prélevés sur la somme reçue. Le virement reste gratuit.",
      },
      {
        q: "Mon client doit-il créer un compte ?",
        a: "Non. Il ouvre le lien, lit le document, accepte le devis ou paie la facture. Il peut aussi l'imprimer ou l'enregistrer en PDF.",
      },
    ],
  },
  {
    id: "prise-de-rendez-vous",
    cta: "Ouvrir mes réservations",
    nom: "Prise de rendez-vous",
    menuDesc: "Vos clients réservent depuis votre site.",
    titre: "Vos clients réservent seuls",
    intro:
      "Une page de réservation sur votre site : vos prestations, vos horaires, les créneaux libres. Le client choisit, vous recevez le rendez-vous par e-mail et dans votre liste de clients.",
    seoTitre: "Prise de rendez-vous en ligne pour votre site",
    description:
      "Vos clients réservent en ligne depuis votre site : prestations, horaires, confirmation par e-mail, annulation en un clic. Formules Essentiel et Pro.",
    etapes: [
      {
        titre: "Décrivez vos prestations",
        texte: "Un nom, une durée, un prix si vous voulez l'afficher. Coupe femme, 45 minutes, 38 €.",
      },
      {
        titre: "Posez vos horaires",
        texte: "Jour par jour, avec la pause de midi, le délai avant un rendez-vous et le temps de battement entre deux clients.",
      },
      {
        titre: "Ouvrez la réservation",
        texte: "Le bouton « Prendre rendez-vous » s'ajoute à l'en-tête de votre site. Vos clients réservent à toute heure.",
      },
    ],
    points: [
      {
        titre: "Deux clients ne prennent jamais le même créneau",
        texte: "La base de données refuse un rendez-vous qui en chevauche un autre, même quand deux personnes cliquent à la même seconde.",
      },
      {
        titre: "Un e-mail pour vous, un pour le client",
        texte: "Le client reçoit sa confirmation avec un lien pour annuler, puis un rappel la veille. Vous recevez le nom, le téléphone et le message.",
      },
      {
        titre: "Chaque réservation entre dans vos clients",
        texte: "La fiche se crée ou se complète d'elle-même, avec l'origine « rendez-vous » et l'historique de ses visites.",
      },
      {
        titre: "Sans application à installer",
        texte: "La page de réservation marche sur tous les téléphones, sans compte à créer pour votre client.",
      },
    ],
    inclus: [false, "Compris", "Compris"],
    noteInclus: "La réservation en ligne fait partie des formules payantes, sans supplément ni commission par rendez-vous.",
    faq: [
      {
        q: "Mes clients doivent-ils créer un compte ?",
        a: "Non. Ils choisissent la prestation et le créneau, puis laissent leur nom, leur téléphone et, s'ils le souhaitent, leur e-mail.",
      },
      {
        q: "Comment un client annule-t-il ?",
        a: "Le lien d'annulation figure dans son e-mail de confirmation. Le créneau se libère aussitôt et vous en êtes prévenu.",
      },
      {
        q: "Puis-je fermer la réservation pendant mes congés ?",
        a: "Oui. Un interrupteur dans la rubrique Rendez-vous ferme la réservation : le bouton disparaît de votre site jusqu'à votre retour.",
      },
      {
        q: "Combien de prestations puis-je proposer ?",
        a: "Autant que vous voulez, chacune avec sa durée et son prix. Vous les masquez ou les réordonnez quand vous voulez.",
      },
    ],
  },
  {
    id: "agents-ia",
    cta: "Activer mes agents IA",
    nom: "Agents IA",
    menuDesc: "Ils répondent à vos clients pendant que vous travaillez.",
    titre: "Vos agents répondent pour vous",
    intro:
      "Une demande arrive sur votre site, un avis tombe sur votre fiche Google, le blog attend son article : vos agents IA préparent la réponse dans votre ton. Vous relisez, vous envoyez. Rien ne part sans vous.",
    seoTitre: "Agents IA pour répondre à vos clients et à vos avis",
    description:
      "Les agents IA de Sitaly répondent aux demandes de votre site, relèvent vos avis Google et publient la réponse que vous validez, demandent des avis à vos clients et écrivent votre blog.",
    etapes: [
      {
        titre: "Activez un agent",
        texte: "Réponse aux demandes, Avis Google, Blog : chaque agent s'allume d'un clic dans la rubrique Agents de l'app.",
      },
      {
        titre: "Réglez son ton",
        texte: "Tutoiement ou vouvoiement, signature, informations à rappeler : l'agent écrit comme vous, avec ce que dit votre site.",
      },
      {
        titre: "Relisez et envoyez",
        texte: "La réponse vous attend, prête. Vous la corrigez si besoin et vous l'envoyez en un clic, depuis votre téléphone.",
      },
    ],
    points: [
      {
        titre: "Les urgences d'abord",
        texte: "L'agent repère une fuite, une panne ou un rendez-vous du jour et vous prévient aussitôt par e-mail, même sur un chantier.",
      },
      {
        titre: "Vos avis Google, réglés d'un clic",
        texte: "Connectez votre fiche : chaque nouvel avis arrive le matin avec sa réponse prête, et vous la publiez sous l'avis d'un clic. Les avis délicats passent en premier.",
      },
      {
        titre: "Plus d'avis, sans relancer",
        texte: "Le lendemain d'une facture payée ou d'un rendez-vous, votre client reçoit la demande d'avis à votre nom. Un QR code à imprimer complète, pour le comptoir ou la camionnette.",
      },
      {
        titre: "Vos avis sur votre site",
        texte: "Votre note et vos meilleurs avis récents s'affichent sur votre site, à jour chaque matin, sans rien recopier.",
      },
      {
        titre: "Votre blog, sans y passer vos soirées",
        texte: "Six idées d'articles pour votre métier et votre ville, puis l'article complet, publié sur votre site.",
      },
      {
        titre: "Votre bilan du lundi",
        texte: "L'Assistant IA vous envoie chaque lundi les chiffres de la semaine : demandes, devis, factures, visites de votre site.",
      },
    ],
    inclus: ["Avec vos 50 crédits offerts", "500 crédits par mois", "2 500 crédits par mois"],
    noteInclus: "Une réponse rédigée coûte 1 crédit, un article de blog 6. Les réponses aux avis Google sont comprises dans Essentiel et Pro.",
    faq: [
      {
        q: "L'agent envoie-t-il des messages sans moi ?",
        a: "Non. Chaque réponse attend votre accord : vous la lisez, vous la corrigez si besoin, puis vous l'envoyez.",
      },
      {
        q: "Comment l'agent connaît-il mon entreprise ?",
        a: "Il lit votre site Sitaly : vos prestations, vos horaires, votre secteur et vos tarifs. Vous pouvez lui ajouter des consignes.",
      },
      {
        q: "Les réponses aux avis sont-elles publiées sur Google ?",
        a: "Oui, si vous connectez votre fiche Google : vos avis arrivent chaque matin dans Sitaly, et la réponse que vous validez part sous l'avis d'un clic. Sans fiche connectée, vous collez l'avis et vous publiez la réponse vous-même.",
      },
      {
        q: "Comment obtenir plus d'avis ?",
        a: "Sitaly récupère le lien « Laisser un avis » de votre fiche. Vous l'envoyez par e-mail, SMS ou WhatsApp, vous imprimez l'affichette avec son QR code, ou vous laissez Sitaly l'envoyer le lendemain de chaque facture payée et de chaque rendez-vous. Un client ne reçoit jamais plus d'une demande tous les six mois.",
      },
      {
        q: "Mes avis peuvent-ils apparaître sur mon site ?",
        a: "Oui. Une case suffit : votre note et vos meilleurs avis récents s'affichent sur votre site Sitaly et se mettent à jour chaque matin.",
      },
      {
        q: "Est-ce la même chose que les agents IA sur mesure ?",
        a: "Non. Les agents de l'app sont prêts à l'emploi et compris dans votre abonnement. Pour un agent conçu pour votre entreprise, voyez l'offre Agents IA sur mesure.",
      },
    ],
  },
  {
    id: "avis-google",
    cta: "Recevoir plus d'avis",
    nom: "Avis Google",
    menuDesc: "Plus d'avis, et une réponse à chacun.",
    titre: "Plus d'avis Google, sans y penser",
    intro:
      "Connectez votre fiche : chaque nouvel avis arrive le matin avec sa réponse prête, que vous publiez d'un clic. Après chaque chantier, votre client reçoit la demande d'avis à votre nom.",
    seoTitre: "Avis Google pour artisans : répondre et en obtenir plus",
    description:
      "Répondez à chaque avis Google d'un clic et récoltez-en plus : réponse préparée par l'IA, demande d'avis envoyée après chaque facture, QR code à imprimer, avis affichés sur votre site.",
    etapes: [
      {
        titre: "Connectez votre fiche",
        texte: "Un bouton, puis l'autorisation de Google avec votre compte. Sitaly retrouve votre fiche et vos avis en quelques secondes.",
      },
      {
        titre: "Répondez d'un clic",
        texte: "Chaque matin, les nouveaux avis arrivent avec une réponse dans votre ton. Vous la relisez, puis « Publier sur Google ».",
      },
      {
        titre: "Récoltez des avis",
        texte: "Le lendemain d'une facture payée ou d'un rendez-vous, votre client reçoit le lien pour laisser son avis, à votre nom.",
      },
    ],
    points: [
      {
        titre: "Prévenu sur votre téléphone",
        texte: "Un avis tombe ? Une notification vous le dit, avec la réponse déjà prête. Vous publiez entre deux chantiers.",
      },
      {
        titre: "Les avis délicats d'abord",
        texte: "Une note basse, un reproche, un litige : l'agent le signale et propose une réponse posée, sans reconnaître de faute.",
      },
      {
        titre: "Un QR code pour le comptoir",
        texte: "Une affichette A5 « Votre avis compte » à imprimer, pour la vitrine, le comptoir ou la camionnette.",
      },
      {
        titre: "Vos avis sur votre site",
        texte: "Votre note et vos meilleurs avis récents s'affichent sur votre site Sitaly, à jour chaque matin.",
      },
    ],
    inclus: ["Avis collés à la main", "Fiche connectée", "Fiche connectée"],
    noteInclus: "Fiche connectée, envoi par e-mail et demandes automatiques en Essentiel et Pro. Une réponse préparée coûte 1 crédit.",
    faq: [
      {
        q: "Une réponse peut-elle partir sans moi ?",
        a: "Non. L'agent prépare la réponse ; elle ne part sur Google qu'après votre clic sur « Publier sur Google ».",
      },
      {
        q: "Comment Sitaly accède-t-il à ma fiche ?",
        a: "Par l'API Google Business Profile, avec votre autorisation donnée sur l'écran de Google. Vous pouvez la retirer à tout moment : la déconnexion efface aussi vos avis de Sitaly.",
      },
      {
        q: "Puis-je demander des avis seulement aux clients contents ?",
        a: "Non, et Google l'interdit. Sitaly envoie la même demande à chaque client, au plus une fois tous les six mois, sans contrepartie.",
      },
      {
        q: "Et si je n'ai pas encore de fiche Google ?",
        a: "Créez-la gratuitement sur Google Business Profile, puis connectez-la. En attendant, vous pouvez coller un avis dans Sitaly pour recevoir une réponse préparée.",
      },
      {
        q: "Combien d'avis faut-il viser ?",
        a: "Des avis réguliers comptent plus qu'un gros chiffre ancien. Un avis par mois et des réponses à chacun suffisent à faire la différence face à un concurrent silencieux.",
      },
    ],
  },
  {
    id: "blog-ia",
    cta: "Lancer mon blog",
    nom: "Blog écrit par l'IA",
    menuDesc: "Des articles qui vous amènent des visites.",
    titre: "Un blog qui s'écrit pour vous",
    intro:
      "L'IA lit votre site, propose des sujets que vos clients cherchent sur Google, puis écrit l'article. Vous relisez, vous corrigez, vous publiez sur votre site.",
    seoTitre: "Générateur d'articles de blog par l'IA",
    description:
      "Le blog de votre site écrit par l'IA : des idées tirées de votre activité, un article complet en vingt secondes, relu et publié par vous.",
    etapes: [
      {
        titre: "Trouvez un sujet",
        texte: "L'IA propose six sujets tirés de vos services et de votre ville, ou vous écrivez le vôtre.",
      },
      {
        titre: "L'IA écrit l'article",
        texte: "Intertitres, listes, réponses concrètes : un article complet en une vingtaine de secondes, à votre nom.",
      },
      {
        titre: "Relisez et publiez",
        texte: "Corrigez ce que vous voulez dans l'éditeur, regardez l'aperçu, puis publiez sur /blog/ de votre site.",
      },
    ],
    points: [
      {
        titre: "Écrit pour votre métier et votre ville",
        texte: "L'IA part de votre site : vos services, vos tarifs, votre zone. L'article parle de votre activité, pas d'un métier en général.",
      },
      {
        titre: "Rien ne part sans vous",
        texte: "Chaque article arrive en brouillon. Il ne paraît sur votre site qu'au moment où vous cliquez sur « Publier ».",
      },
      {
        titre: "Prêt pour Google et les IA",
        texte: "Chaque article reçoit son adresse, son titre, sa description, sa place dans le plan du site et dans llms.txt.",
      },
      {
        titre: "À la couleur de votre site",
        texte: "Le blog reprend la police, les couleurs et l'en-tête de votre site, avec un bouton pour vous contacter.",
      },
    ],
    inclus: ["6 crédits par article", "6 crédits par article", "6 crédits par article"],
    noteInclus: `Les idées coûtent 1 crédit, l'article 6. Découverte offre ${IA.decouverte.credits} crédits, Essentiel en donne ${IA.essentiel.credits.toLocaleString("fr-FR")} par mois et Pro ${IA.pro.credits.toLocaleString("fr-FR")}, avec notre IA la plus avancée pour écrire.`,
    faq: [
      {
        q: "Google pénalise-t-il les articles écrits par l'IA ?",
        a: "Google juge l'utilité d'un article, pas son outil. Un article qui répond à une vraie question de vos clients, relu par vous, a sa place.",
      },
      {
        q: "Puis-je modifier l'article avant de le publier ?",
        a: "Oui, tout le texte : le titre, le résumé qui paraît dans Google et le corps de l'article, avec un aperçu avant publication.",
      },
      {
        q: "Combien d'articles faut-il publier ?",
        a: "Un ou deux par mois suffisent pour un artisan ou un commerce. Mieux vaut un article utile qu'une série de textes creux.",
      },
      {
        q: "Puis-je retirer un article ?",
        a: "Oui. « Retirer » le remet en brouillon et l'enlève du site ; « Supprimer » l'efface.",
      },
    ],
  },
  {
    id: "referencement-seo-geo",
    cta: "Améliorer mon référencement",
    nom: "Référencement SEO et GEO",
    menuDesc: "Trouvé sur Google et par les IA.",
    titre: "Trouvé sur Google et par les IA",
    intro:
      "Votre site sort prêt pour Google et pour ChatGPT, Gemini ou Perplexity. Un score sur 100 vous dit ce qui manque, et comment l'ajouter.",
    seoTitre: "SEO et GEO automatiques pour votre site",
    description:
      "Titres, descriptions, plan du site, données structurées, fichier llms.txt et score de visibilité sur 100 : le SEO et le GEO compris dans votre site.",
    etapes: [
      {
        titre: "Votre site sort prêt",
        texte: "Titres, descriptions, plan du site, données d'entreprise et questions fréquentes balisées dès la publication.",
      },
      {
        titre: "Lisez votre score",
        texte: "La rubrique Visibilité note votre site sur 100 et liste ce qui manque : note Google, coordonnées, articles, nom de domaine.",
      },
      {
        titre: "Comblez les manques",
        texte: "Chaque point renvoie au bon endroit de l'application. Demander un avis Google prend deux clics.",
      },
    ],
    points: [
      {
        titre: "Le SEO fait à votre place",
        texte: "Chaque page reçoit un titre et une description écrits pour votre métier et votre ville, et une adresse lisible.",
      },
      {
        titre: "Le GEO, pour les réponses des IA",
        texte: "Un fichier llms.txt résume votre activité, vos services, vos questions fréquentes et vos articles pour les assistants IA.",
      },
      {
        titre: "Les données que Google lit",
        texte: "Votre entreprise, votre note Google et vos questions fréquentes en données structurées schema.org, sur chaque page.",
      },
      {
        titre: "Les avis, premier levier local",
        texte: "Envoyez à un client le lien vers votre fiche Google par SMS ou WhatsApp, depuis l'application.",
      },
    ],
    inclus: ["Compris", "Compris", "Compris"],
    noteInclus: "Le référencement est compris dans toutes les formules. Le blog, qui nourrit votre score, se paie en crédits IA.",
    faq: [
      {
        q: "Qu'est-ce que le GEO ?",
        a: "Le Generative Engine Optimization : rendre votre site lisible et citable par les assistants IA comme ChatGPT, Gemini ou Perplexity, en plus de Google.",
      },
      {
        q: "Serai-je premier sur Google ?",
        a: "Personne ne peut le promettre. Sitaly vous donne une base technique propre et vous dit quoi ajouter ; la concurrence de votre ville fait le reste.",
      },
      {
        q: "Qu'est-ce que le fichier llms.txt ?",
        a: "Un résumé de votre site en texte simple, à l'adresse /llms.txt, que les IA peuvent lire d'un coup. Sitaly le tient à jour à chaque publication.",
      },
      {
        q: "Dois-je régler quelque chose ?",
        a: "Non. Tout se fait à la publication. Le score vous montre seulement ce que vous pouvez ajouter pour aller plus loin.",
      },
    ],
  },
  {
    id: "identite-de-marque",
    cta: "Créer mon logo",
    nom: "Identité de marque",
    menuDesc: "Votre logo, vos couleurs, votre police.",
    titre: "Votre logo en une minute",
    intro:
      "Sitaly dessine votre logo à partir de votre site : votre nom, votre métier, vos couleurs. Choisissez une proposition, réglez-la, elle s'applique à tout votre site.",
    seoTitre: "Créateur de logo et identité de marque",
    description:
      "Créez le logo de votre entreprise : symbole, forme, police et couleurs, appliqués à votre site et téléchargeables en PNG pour vos devis, Google et vos réseaux.",
    etapes: [
      {
        titre: "Parcourez les propositions",
        texte: "Votre initiale, les icônes de vos services, les polices de votre thème : neuf logos prêts à choisir.",
      },
      {
        titre: "Réglez le détail",
        texte: "Changez le symbole parmi une quarantaine d'icônes, la forme, la police et les couleurs. L'aperçu suit.",
      },
      {
        titre: "Appliquez et téléchargez",
        texte: "Un clic le pose sur votre site. Le logo et l'icône carrée se téléchargent en PNG.",
      },
    ],
    points: [
      {
        titre: "Le même partout",
        texte: "En-tête et pied de page du site, icône de l'onglet, page de réservation et blog reprennent le même logo.",
      },
      {
        titre: "Une icône carrée pour vos profils",
        texte: "Le symbole seul, prêt pour votre fiche Google, votre page Facebook ou votre compte Instagram.",
      },
      {
        titre: "Vos vraies coordonnées",
        texte: "L'aperçu de carte de visite reprend votre métier, votre ville, votre téléphone et votre e-mail.",
      },
      {
        titre: "Sans crédit",
        texte: "Les propositions et les réglages ne consomment rien. Changez de logo autant de fois que vous voulez.",
      },
    ],
    inclus: ["Compris", "Compris", "Compris"],
    noteInclus: "L'identité de marque est comprise dans toutes les formules, sans crédit.",
    faq: [
      {
        q: "Le logo m'appartient-il ?",
        a: "Oui, vous l'utilisez comme vous voulez : devis, factures, véhicule, réseaux. Les icônes viennent de la bibliothèque libre Lucide.",
      },
      {
        q: "Puis-je importer un logo existant ?",
        a: "Pas encore. Si vous avez déjà un logo, gardez-le pour vos imprimés ; le site affiche le symbole et le nom choisis dans Sitaly.",
      },
      {
        q: "Changer de logo modifie-t-il mon site en ligne ?",
        a: "Le logo s'applique à votre site, puis un bouton met la version en ligne à jour. Vos textes ne bougent pas.",
      },
      {
        q: "Dans quels formats puis-je le télécharger ?",
        a: "En PNG à fond transparent : le logo complet avec votre nom, et l'icône carrée.",
      },
    ],
  },
];

export const getProduit = (id: string) => PRODUITS.find((p) => p.id === id);
