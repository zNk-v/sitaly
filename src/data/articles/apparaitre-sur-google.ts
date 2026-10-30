import type { BlogSection } from "@/data/blog-posts";

/** Le corps de l'article « apparaitre-sur-google ». Ses métadonnées vivent dans
    src/data/blog-posts.ts ; ce fichier n'est chargé que sur sa page. */
export const contenu: BlogSection[] = [
  {
    type: "p",
    text: "Quand on lance son activité, on veut que les gens du coin vous trouvent en tapant votre métier et votre ville. Ça ne se fait pas en un jour, mais ça ne demande pas d'expert non plus. Voici les six étapes, dans l'ordre où elles rapportent.",
  },
  { type: "h2", text: "1. Créer votre fiche Google" },
  {
    type: "p",
    text: "La fiche d'établissement Google (Google Business Profile) est gratuite. C'est elle qui vous fait apparaître dans Google Maps et dans le bloc de résultats locaux. Remplissez tout : catégorie exacte, horaires, zone d'intervention, description, photos. Google vous demandera de confirmer que vous êtes bien l'établissement, en général par une courte vidéo ou par courrier.",
  },
  { type: "h2", text: "2. Avoir un site, et le relier à la fiche" },
  {
    type: "p",
    text: "La fiche dit que vous existez. Le site dit pourquoi vous choisir. Indiquez l'adresse du site sur la fiche, et le même nom, la même adresse et le même téléphone sur les deux : Google se fie à cette cohérence.",
  },
  { type: "h2", text: "3. Dire clairement votre métier et votre ville" },
  {
    type: "p",
    text: "Google ne devine pas : écrivez-le. Le titre de votre page d'accueil, son premier paragraphe et vos pages de prestation doivent contenir votre métier et votre ville ou votre zone, comme vos clients les écrivent. « Plombier à Arpajon » plutôt que « solutions hydrauliques ».",
  },
  { type: "h2", text: "4. Recueillir des avis" },
  {
    type: "p",
    text: "Les avis comptent pour le classement local et, surtout, pour le choix du client. Demandez-les juste après une prestation réussie, avec un lien direct vers votre fiche. Répondez à chaque avis, les bons comme les moins bons. N'achetez jamais d'avis : Google les détecte et peut suspendre la fiche.",
  },
  { type: "h2", text: "5. Déclarer le site à Google" },
  {
    type: "p",
    text: "Google Search Console, gratuite, vous permet d'envoyer le plan de votre site (le fichier sitemap.xml) et de voir sur quelles recherches vous apparaissez. Un site Sitaly prépare ce plan automatiquement : il reste à le déclarer.",
  },
  { type: "h2", text: "6. Faire vivre le tout" },
  {
    type: "ul",
    items: [
      "Ajoutez une photo de réalisation sur votre fiche chaque mois.",
      "Mettez à jour vos horaires avant chaque fermeture.",
      "Ajoutez une page ou une question de FAQ quand un client vous pose une nouvelle question.",
      "Inscrivez-vous dans les annuaires sérieux de votre métier, avec les mêmes coordonnées partout.",
    ],
  },
  {
    type: "quote",
    text: "Google récompense ce que vos clients récompensent : une information juste, à jour, et des avis réels.",
  },
  { type: "h2", text: "Combien de temps faut-il ?" },
  {
    type: "p",
    text: "La fiche Google peut apparaître en quelques jours une fois validée. Le site, lui, prend en général quelques semaines à quelques mois pour grimper sur les recherches locales, selon la concurrence dans votre métier et votre ville. Personne ne peut honnêtement vous garantir une première place.",
  },
  {
    type: "faq",
    items: [
      {
        q: "Faut-il payer Google pour apparaître ?",
        a: "Non. La fiche et le référencement naturel sont gratuits. La publicité Google Ads permet d'apparaître tout de suite en haut des résultats, contre un budget par clic.",
      },
      {
        q: "Mon site doit-il être grand pour être bien classé ?",
        a: "Non. Un petit site clair, rapide sur téléphone, qui dit votre métier et votre ville et répond aux questions de vos clients, fait mieux qu'un grand site vague.",
      },
    ],
  },
];
