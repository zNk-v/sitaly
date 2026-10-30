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
 * - marque : rubrique Identité de marque (src/site/logo.ts), sans crédit.
 */

export type ProduitId = "prise-de-rendez-vous" | "blog-ia" | "referencement-seo-geo" | "identite-de-marque";

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
  faq: { q: string; a: string }[];
}

export const PRODUITS: Produit[] = [
  {
    id: "prise-de-rendez-vous",
    nom: "Prise de rendez-vous",
    menuDesc: "Vos clients réservent depuis votre site.",
    titre: "Vos clients réservent seuls",
    intro:
      "Une page de réservation sur votre site : vos prestations, vos horaires, les créneaux libres. Le client choisit, vous recevez le rendez-vous par e-mail et dans votre liste de clients.",
    seoTitre: "Prise de rendez-vous en ligne pour votre site",
    description:
      "Ajoutez la prise de rendez-vous en ligne à votre site : prestations, horaires, créneaux libres, e-mails de confirmation et lien d'annulation. Inclus dans les formules Essentiel et Pro.",
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
        texte: "Le client reçoit sa confirmation avec un lien pour annuler. Vous recevez le nom, le téléphone et le message.",
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
    id: "blog-ia",
    nom: "Blog écrit par l'IA",
    menuDesc: "Des articles qui vous amènent des visites.",
    titre: "Un blog qui s'écrit pour vous",
    intro:
      "L'IA lit votre site, propose des sujets que vos clients cherchent sur Google, puis écrit l'article. Vous relisez, vous corrigez, vous publiez sur votre site.",
    seoTitre: "Générateur d'articles de blog par l'IA",
    description:
      "Le blog de votre site écrit par l'IA : des idées d'articles tirées de votre activité, un article complet en vingt secondes, relu et publié par vous. Pour être trouvé sur Google.",
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
    nom: "Référencement SEO et GEO",
    menuDesc: "Trouvé sur Google et par les IA.",
    titre: "Trouvé sur Google et par les IA",
    intro:
      "Votre site sort prêt pour Google et pour ChatGPT, Gemini ou Perplexity. Un score sur 100 vous dit ce qui manque, et comment l'ajouter.",
    seoTitre: "Référencement SEO et GEO automatique pour votre site",
    description:
      "SEO et GEO compris dans votre site : titres, descriptions, plan du site, données structurées, fichier llms.txt pour les IA et un score de visibilité sur 100 avec la liste de ce qui manque.",
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
