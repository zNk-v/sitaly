import { articleIndexable } from "@/lib/indexation";
import { DATE_DU_BUILD } from "@/lib/date-du-build";
import { ARTICLES_AGENTS_IA } from "@/data/blog-posts-agents-ia";

export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "faq"; items: { q: string; a: string }[] };

export { LIEN_DANS_LE_TEXTE, texteBrut } from "@/lib/liens-texte";

/**
 * L'étape suivante proposée en fin d'article. Chaque article pousse vers la
 * page de vente de son sujet, pas vers le catalogue entier.
 */
export type CtaArticle = "agents-ia" | "chatgpt-ads" | "automatisation" | "site" | "app";

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishedAt: string; // ISO
  updatedAt?: string;
  author: string;
  keyword: string;
  /** L'appel de fin d'article. Sans valeur, le CTA site d'origine. */
  cta?: CtaArticle;
  /**
   * Illustration propre à l'article, au format 1200×630. Elle s'affiche sous le
   * titre et sert d'aperçu au partage. Jamais d'image de banque (DESIGN.md §7) :
   * un article sans visuel dessiné pour lui n'en a pas.
   */
  image?: {
    /** Chemin sans extension ni largeur : `-1200.webp`, `-2400.webp` et `-og.jpg` existent. */
    src: string;
    alt: string;
  };
}

/**
 * Un article avec son corps. Le corps vit dans src/data/articles/<slug>.ts et
 * n'est chargé que sur la page de l'article (src/data/articles/charger.ts) :
 * le reste du site ne transporte que les métadonnées ci-dessus, et le blog
 * entier ne part plus avec chaque page.
 */
export interface ArticleComplet extends BlogPost {
  content: BlogSection[];
}

/**
 * Tous les articles rédigés, y compris ceux dont la date de publication est à venir.
 * Ne pas consommer directement : utiliser BLOG_POSTS, qui filtre les articles programmés.
 */
const ALL_BLOG_POSTS: BlogPost[] = [
  {
    slug: "creer-site-internet-gratuit",
    title: "Créer un site internet gratuit : ce qui est vraiment gratuit, et ce qui ne l'est pas",
    metaTitle: "Créer un site internet gratuit en 2026 : le guide honnête",
    metaDescription:
      "Ce que donnent vraiment les formules gratuites (Sitaly, Wix, WordPress.com), ce qui reste payant, et comment créer votre site gratuit en 4 étapes.",
    excerpt:
      "Un site sans frais existe bel et bien. Voici ce que vous obtenez sans payer, ce qui reste payant, et comment démarrer sans regretter votre choix six mois plus tard.",
    category: "Créer son site",
    readingTime: "5 min",
    publishedAt: "2026-10-30",
    author: "Teddy Vidal",
    keyword: "créer un site internet gratuit",
    cta: "app",
  },
  {
    slug: "creer-site-internet-sans-coder",
    title: "Créer un site internet sans savoir coder : la méthode en 5 étapes",
    metaTitle: "Créer un site internet sans coder : la méthode en 5 étapes",
    metaDescription:
      "Pas besoin de savoir coder pour avoir un site professionnel. La méthode en cinq étapes, le bon type d'outil pour vous, et les pièges qui font perdre des semaines.",
    excerpt:
      "Vous n'avez pas besoin de savoir coder. Vous avez besoin de savoir ce que vous vendez, à qui et où : le reste, un outil s'en charge.",
    category: "Créer son site",
    readingTime: "5 min",
    publishedAt: "2026-10-30",
    author: "Teddy Vidal",
    keyword: "créer un site internet sans coder",
    cta: "app",
  },
  {
    slug: "prix-site-internet",
    title: "Combien coûte un site internet en 2026 ? Les vrais prix, poste par poste",
    metaTitle: "Prix d'un site internet en 2026 : les vrais coûts poste par poste",
    metaDescription:
      "Créateur par IA, Wix, WordPress ou agence : ce que coûte vraiment un site internet, les frais qu'on oublie, et le calcul sur trois ans pour comparer.",
    excerpt:
      "De zéro à plusieurs milliers d'euros : pour comparer, il faut séparer ce que vous payez une fois, chaque année, et en temps.",
    category: "Créer son site",
    readingTime: "6 min",
    publishedAt: "2026-10-30",
    author: "Teddy Vidal",
    keyword: "prix site internet",
    cta: "app",
  },
  {
    slug: "trouver-nom-entreprise",
    title: "Trouver un nom d'entreprise : 7 méthodes et les vérifications à faire",
    metaTitle: "Trouver un nom d'entreprise : 7 méthodes et les vérifications",
    metaDescription:
      "Sept méthodes pour trouver le nom de votre entreprise, puis les vérifications indispensables : marques INPI, entreprises existantes, nom de domaine.",
    excerpt:
      "Le nom de votre entreprise vous suivra partout. Il mérite une heure de réflexion, pas une semaine d'hésitation.",
    category: "Lancer son activité",
    readingTime: "6 min",
    publishedAt: "2026-10-30",
    author: "Teddy Vidal",
    keyword: "trouver un nom d'entreprise",
    cta: "app",
  },
  {
    slug: "choisir-nom-de-domaine",
    title: "Choisir son nom de domaine : .fr ou .com, et 8 règles simples",
    metaTitle: "Choisir son nom de domaine : .fr ou .com et 8 règles simples",
    metaDescription:
      "Comment choisir le nom de domaine de votre site : .fr ou .com, huit règles pour un nom qui se retient, et pourquoi il doit être à votre nom.",
    excerpt:
      "Un bon nom de domaine se retient du premier coup. Voici comment le choisir, et pourquoi le .fr est souvent le meilleur choix en France.",
    category: "Créer son site",
    readingTime: "5 min",
    publishedAt: "2026-10-30",
    author: "Teddy Vidal",
    keyword: "choisir nom de domaine",
    cta: "app",
  },
  {
    slug: "mentions-legales-site-internet",
    title: "Mentions légales d'un site professionnel : ce qui est obligatoire",
    metaTitle: "Mentions légales d'un site internet professionnel : la liste",
    metaDescription:
      "Ce que doit contenir la page de mentions légales d'un site professionnel selon votre statut, les sanctions prévues, et les textes qui l'accompagnent (RGPD, cookies).",
    excerpt:
      "Tout site professionnel doit dire qui l'édite et qui l'héberge. Voici ce que la page doit contenir selon votre statut.",
    category: "Créer son site",
    readingTime: "6 min",
    publishedAt: "2026-10-30",
    author: "Teddy Vidal",
    keyword: "mentions légales site internet",
    cta: "app",
  },
  {
    slug: "pages-indispensables-site-vitrine",
    title: "Les pages indispensables d'un site vitrine, et ce qu'on met dans chacune",
    metaTitle: "Les pages indispensables d'un site vitrine (et quoi y mettre)",
    metaDescription:
      "Accueil, prestations, tarifs, avis, à propos, FAQ, contact, mentions légales : les pages d'un site vitrine efficace et ce que chacune doit contenir.",
    excerpt:
      "Un site vitrine n'a pas besoin d'être grand. Il doit répondre, dans l'ordre, aux questions que se pose un client.",
    category: "Créer son site",
    readingTime: "5 min",
    publishedAt: "2026-10-30",
    author: "Teddy Vidal",
    keyword: "pages site vitrine",
    cta: "app",
  },
  {
    slug: "apparaitre-sur-google",
    title: "Apparaître sur Google quand on lance son activité : le plan en 6 étapes",
    metaTitle: "Apparaître sur Google quand on lance son activité : 6 étapes",
    metaDescription:
      "Fiche Google, site, avis, Search Console : les six étapes pour être trouvé sur Google quand on lance son activité, dans l'ordre où elles rapportent.",
    excerpt:
      "Être trouvé par les gens du coin ne se fait pas en un jour, mais ne demande pas d'expert. Voici les six étapes, dans l'ordre où elles rapportent.",
    category: "Lancer son activité",
    readingTime: "6 min",
    publishedAt: "2026-10-30",
    author: "Teddy Vidal",
    keyword: "apparaître sur Google",
    cta: "app",
  },
  {
    slug: "publicite-chatgpt-ads-guide",
    title: "Publicité ChatGPT Ads : faut-il y investir votre budget ?",
    metaTitle: "Publicité ChatGPT Ads : faut-il y investir votre budget ?",
    metaDescription:
      "Comment fonctionne la publicité dans ChatGPT, ce qu'elle change par rapport à Google Ads, et cinq critères pour décider si ce canal mérite votre budget.",
    excerpt:
      "La publicité arrive dans ChatGPT. Voici ce qu'on sait de son fonctionnement, ce que ça change vraiment par rapport à Google Ads, et cinq critères pour décider si ce canal mérite une ligne dans votre budget — ou pas encore.",
    category: "Publicité IA",
    readingTime: "9 min",
    publishedAt: "2026-08-23",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "publicité ChatGPT Ads",
    cta: "chatgpt-ads",
  },
  {
    slug: "cout-chatgpt-ads",
    title: "Combien coûte ChatGPT Ads ? Ce qu'on peut dire honnêtement",
    metaTitle: "Combien coûte ChatGPT Ads ? Prix, budget et calcul du seuil",
    metaDescription:
      "Prix de ChatGPT Ads en France : ce qui compose le coût, quel budget de test prévoir et comment calculer le coût par lead acceptable pour votre marge.",
    excerpt:
      "Aucun tarif de référence n'existe encore sur ce canal en France. Plutôt qu'inventer un chiffre, voici comment se décompose le coût et comment calculer le seuil qui a du sens pour votre entreprise.",
    category: "Publicité IA",
    readingTime: "8 min",
    publishedAt: "2026-08-23",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "coût ChatGPT Ads",
    cta: "chatgpt-ads",
  },
  {
    slug: "chatgpt-ads-secteurs-pme",
    title: "ChatGPT Ads : quels secteurs en tirent réellement quelque chose",
    metaTitle: "ChatGPT Ads : quels secteurs et quelles PME en tirent parti",
    metaDescription:
      "SaaS, B2B, immobilier, assurance, formation : les secteurs où la publicité dans ChatGPT a du sens, ceux où elle n'apporte rien, et comment le vérifier.",
    excerpt:
      "Le secteur compte moins que la façon dont vos prospects formulent leur besoin. Voici les activités structurellement avantagées, celles à manier avec prudence, et un test simple pour trancher votre cas.",
    category: "Publicité IA",
    readingTime: "9 min",
    publishedAt: "2026-08-23",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "ChatGPT Ads secteurs",
    cta: "chatgpt-ads",
  },
  {
    slug: "logiciel-gestion-artisan-choisir",
    title:
      "Logiciel de gestion pour artisan : lequel choisir pour vraiment développer votre activité ?",
    metaTitle: "Logiciel de gestion pour artisan : lequel choisir en 2026",
    metaDescription:
      "Facturation, clients, avis Google, visibilité : tous les logiciels pour artisan ne servent pas à la même chose. Le guide pour choisir le bon outil et remplir votre planning.",
    excerpt:
      "Vous avez un logiciel de devis, mais le planning ne se remplit pas tout seul. C'est normal : il n'a jamais été conçu pour ça. Voici comment choisir l'outil qui développe votre activité au lieu de seulement l'administrer.",
    category: "Développement commercial",
    readingTime: "10 min",
    publishedAt: "2026-07-10",
    author: "Teddy Vidal",
    keyword: "logiciel de gestion pour artisan",
  },
  {
    slug: "recolter-avis-google-artisan",
    title: "Récolter des avis Google quand on est artisan : la méthode complète",
    metaTitle: "Avis Google artisan : comment en obtenir plus (méthode 2026)",
    metaDescription:
      "Peu ou pas d'avis Google ? La méthode concrète pour passer de 2 à 30 avis 5★ en quelques mois, avec les scripts SMS prêts à copier et l'astuce du lien direct.",
    excerpt:
      "Les avis Google décident souvent qui décroche le chantier. Voici la méthode pas à pas pour en récolter régulièrement, sans harceler vos clients ni enfreindre les règles de Google.",
    category: "Référencement",
    readingTime: "11 min",
    publishedAt: "2026-07-08",
    author: "Teddy Vidal",
    keyword: "avis google artisan",
  },
  {
    slug: "creation-site-internet-artisan-guide",
    title: "Création de site internet pour artisan : le guide complet 2026",
    metaTitle: "Création site internet artisan : guide 2026 (prix, délais)",
    metaDescription:
      "Combien coûte vraiment un site d'artisan en 2026 ? Délais, fonctionnalités, pièges. Le guide complet pour faire le bon choix dès le 1er devis.",
    excerpt:
      "Vous êtes plombier, électricien, menuisier ou maçon et vous voulez enfin un site internet qui vous ramène des clients ? Ce guide vous explique tout : prix réels, fonctionnalités indispensables, pièges à éviter.",
    category: "Site internet",
    readingTime: "12 min",
    publishedAt: "2026-06-18",
    author: "Teddy Vidal",
    keyword: "création site internet artisan",
  },
  {
    slug: "comment-attirer-clients-artisan",
    title: "Comment attirer plus de clients quand on est artisan en 2026",
    metaTitle: "Attirer des clients artisan : 9 leviers qui marchent (2026)",
    metaDescription:
      "Téléphone qui ne sonne plus assez ? 9 leviers concrets, testés par des artisans, pour remplir votre planning en 2 à 4 mois sans passer par les plateformes.",
    excerpt:
      "Vous êtes bon dans votre métier mais le téléphone ne sonne pas assez ? Ce guide rassemble les 9 leviers concrets que les meilleurs artisans utilisent pour remplir leur planning sans dépendre du hasard.",
    category: "Développement commercial",
    readingTime: "13 min",
    publishedAt: "2026-06-18",
    author: "Teddy Vidal",
    keyword: "attirer clients artisan",
  },
  {
    slug: "referencement-local-google-artisan",
    title: "Référencement local sur Google pour artisan : le guide pratique",
    metaTitle: "Référencement local artisan : top 3 Google en 6 mois",
    metaDescription:
      "Apparaître dans le top 3 Google sur 'plombier + ville' peut tripler vos appels. La méthode étape par étape : fiche, avis, pages locales, citations.",
    excerpt:
      "Apparaître dans les 3 premiers résultats Google quand un client tape 'plombier Avignon' ou 'menuisier Nîmes' peut tripler votre nombre d'appels. Voici comment y arriver, étape par étape.",
    category: "Référencement",
    readingTime: "11 min",
    publishedAt: "2026-06-18",
    author: "Teddy Vidal",
    keyword: "référencement local artisan",
  },
  {
    slug: "combien-coute-site-internet-artisan",
    title: "Combien coûte un site internet pour artisan en 2026 ?",
    metaTitle: "Prix site internet artisan : de 99€ à 4 000€ ? (guide 2026)",
    metaDescription:
      "Pourquoi 99€, 800€ ou 4 000€ pour le même site ? Tarifs réels 2026, comparatif freelance vs agence, achat vs location, et ce qui doit toujours être inclus dans un devis.",
    excerpt:
      "Site à 99€, à 800€, à 4 000€ ou à 10 000€ : pourquoi un tel écart, et qu'est-ce qui justifie réellement le prix d'un site internet d'artisan ? On vous explique tout, sans langue de bois.",
    category: "Tarifs",
    readingTime: "10 min",
    publishedAt: "2026-06-18",
    author: "Teddy Vidal",
    keyword: "prix site internet artisan",
  },
  {
    slug: "fiche-google-business-profile-artisan",
    title: "Fiche Google Business Profile pour artisan : le guide d'optimisation",
    metaTitle: "Google Business Profile artisan : +5x d'appels en 6 mois",
    metaDescription:
      "Multipliez vos appels par 5 en 6 mois avec une fiche Google bien optimisée. Photos, avis, posts, attributs : la méthode complète, exemples chiffrés.",
    excerpt:
      "Votre fiche Google est souvent le 1er contact avec un client. Bien optimisée, elle peut générer plus d'appels que votre site. Voici la méthode complète.",
    category: "Référencement",
    readingTime: "12 min",
    publishedAt: "2026-07-02",
    author: "Teddy Vidal",
    keyword: "google business profile artisan",
  },
  {
    slug: "site-internet-plombier-electricien",
    title: "Site internet pour plombier ou électricien : ce qui fait la différence",
    metaTitle: "Site internet plombier / électricien : +4x d'appels (2026)",
    metaDescription:
      "Plombier ou électricien : ce qui fait passer un site de 9 à 41 appels/mois. Téléphone, formulaire, pages ville et vitesse, avec exemples chiffrés.",
    excerpt:
      "Les artisans du bâtiment urgentiste (plombier, électricien, chauffagiste) ont des besoins très spécifiques en matière de site internet. Voici ce qui change vraiment.",
    category: "Site internet",
    readingTime: "11 min",
    publishedAt: "2026-06-25",
    author: "Teddy Vidal",
    keyword: "site internet plombier",
  },
  {
    slug: "seo-local-villes-pages-artisan",
    title: "Pages 'ville' pour artisan : booster son SEO local intelligemment",
    metaTitle: "Pages ville artisan : ×3 de trafic SEO local sans pénalité",
    metaDescription:
      "Une page par ville desservie peut tripler votre trafic SEO local… ou vous faire pénaliser. La méthode propre pour éviter le piège 'doorway' Google.",
    excerpt:
      "Créer une page par ville desservie peut multiplier votre trafic SEO local par 3 ou 4 — à condition de bien le faire. Voici la méthode propre.",
    category: "Référencement",
    readingTime: "10 min",
    publishedAt: "2026-06-27",
    author: "Teddy Vidal",
    keyword: "seo local artisan villes",
  },
  {
    slug: "site-internet-artisan-rentabilite-roi",
    title: "Site internet d'artisan : quelle rentabilité réelle attendre ?",
    metaTitle: "Rentabilité site internet artisan : ROI réel chiffré 2026",
    metaDescription:
      "Combien rapporte un site d'artisan en location à 149€/mois ? ROI par métier, exemples chiffrés et formule de calcul. La rentabilité réelle, sans baratin.",
    excerpt:
      "Investir 149€/mois dans un site, c'est combien d'appels en retour ? Combien de chantiers ? Voici les chiffres et la méthode pour calculer votre ROI réel.",
    category: "Tarifs",
    readingTime: "10 min",
    publishedAt: "2026-06-30",
    author: "Teddy Vidal",
    keyword: "rentabilité site internet artisan",
  },
  {
    slug: "google-ads-artisan-quand-utiliser",
    title: "Google Ads pour artisan : quand l'utiliser et comment éviter de cramer son budget",
    metaTitle: "Google Ads artisan : guide pour ne pas cramer 500€ (2026)",
    metaDescription:
      "Google Ads peut ramener des appels en 24h… ou cramer 500€. Coût par appel par métier, configuration efficace et erreurs à éviter en 2026.",
    excerpt:
      "Google Ads peut ramener des appels en 24h... ou cramer 500€ pour zéro chantier si c'est mal configuré. Voici le guide honnête pour les artisans.",
    category: "Développement commercial",
    readingTime: "11 min",
    publishedAt: "2026-07-04",
    author: "Teddy Vidal",
    keyword: "google ads artisan",
  },
  {
    slug: "refonte-site-artisan-quand-comment",
    title: "Refonte de site internet d'artisan : quand et comment s'y prendre ?",
    metaTitle: "Refonte site artisan : 8 signes + méthode SEO 2026",
    metaDescription:
      "Site daté, trafic en baisse ? 8 signes qu'il faut refondre + méthode pour préserver votre référencement Google. Prix, délais et checklist incluse.",
    excerpt:
      "Votre site a 4 ans, ne convertit plus, et vous perdez des appels ? Voici comment savoir s'il faut refondre, et la méthode pour le faire sans perdre Google.",
    category: "Site internet",
    readingTime: "11 min",
    publishedAt: "2026-07-07",
    author: "Teddy Vidal",
    keyword: "refonte site internet artisan",
  },
  {
    slug: "google-ads-artisan-pourquoi-investir",
    title: "Google Ads pour artisan : est-ce vraiment rentable en 2026 ?",
    metaTitle: "Google Ads artisan rentable ? Le ROI réel en 2026",
    metaDescription:
      "Google Ads est-il rentable pour un artisan en 2026 ? ROI réel, exemples chiffrés, coût par appel et le piège qui ruine la rentabilité avant le 1er euro.",
    excerpt:
      "Investir dans Google Ads quand on est artisan : est-ce que ça vaut vraiment le coup ? ROI réel, coût par appel et la condition n°1 pour que ce soit rentable.",
    category: "Acquisition payante",
    readingTime: "11 min",
    publishedAt: "2026-06-18",
    author: "Teddy Vidal",
    keyword: "google ads artisan rentable",
  },
  {
    slug: "google-ads-vs-seo-artisan",
    title: "Google Ads vs SEO pour un artisan : que choisir en 2026 ?",
    metaTitle: "Google Ads vs SEO artisan : que choisir ? (guide 2026)",
    metaDescription:
      "Google Ads ou SEO pour un artisan ? Comparatif coûts, délais, ROI et la stratégie qui combine les deux pour un maximum d'appels sans exploser le budget.",
    excerpt:
      "Faut-il investir dans le référencement naturel ou payer Google ? La réponse honnête : ça dépend de votre situation — et bien souvent, les deux sont complémentaires.",
    category: "Acquisition payante",
    readingTime: "12 min",
    publishedAt: "2026-06-18",
    author: "Teddy Vidal",
    keyword: "google ads vs seo",
  },
  {
    slug: "cout-google-ads-artisan-vrais-chiffres",
    title: "Combien coûte une campagne Google Ads pour un artisan en 2026 ?",
    metaTitle: "Coût Google Ads artisan 2026 : vrais chiffres (CPC, ROI)",
    metaDescription:
      "Coût réel d'une campagne Google Ads pour un artisan en 2026 : CPC par métier, budget mensuel conseillé, coût par appel et ROI mesuré. Sans baratin.",
    excerpt:
      "300€, 500€, 2 000€/mois ? Voici les vrais chiffres d'une campagne Google Ads d'artisan en 2026 : coût par clic par métier, budget conseillé, ROI mesuré et frais cachés.",
    category: "Tarifs",
    readingTime: "11 min",
    publishedAt: "2026-06-18",
    author: "Teddy Vidal",
    keyword: "coût google ads artisan",
  },
  {
    slug: "relance-automatique-devis",
    title: "Relancer ses devis automatiquement : la méthode pour signer plus en 2026",
    metaTitle: "Relance de devis automatique : méthode et modèles (2026)",
    metaDescription:
      "Quand et comment relancer un devis automatiquement : le bon timing, des modèles de SMS et d'email, et ce qu'un agent IA peut prendre en charge.",
    excerpt:
      "La plupart des devis sans réponse ne sont pas refusés : ils sont oubliés. Voici quand relancer, avec quels messages, et comment automatiser la relance sans perdre le ton d'un échange humain.",
    category: "Automatisation",
    readingTime: "8 min",
    publishedAt: "2026-06-22",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "relance devis automatique",
    cta: "agents-ia",
  },
  {
    slug: "prise-rendez-vous-en-ligne-guide",
    title: "Prise de rendez-vous en ligne : le guide complet pour PME, TPE et indépendants",
    metaTitle: "Prise de rendez-vous en ligne : le guide 2026",
    metaDescription:
      "Pourquoi et comment mettre en place la prise de rendez-vous en ligne quand on est indépendant : moins d'appels manqués, moins de rendez-vous oubliés.",
    excerpt:
      "Un appel manqué pendant un rendez-vous, et le prospect appelle ailleurs. La prise de rendez-vous en ligne laisse vos clients réserver seuls, à toute heure. Voici comment la mettre en place.",
    category: "Automatisation",
    readingTime: "8 min",
    publishedAt: "2026-06-22",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "prise de rendez-vous en ligne",
    cta: "agents-ia",
  },
  {
    slug: "automatiser-suivi-client-tpe",
    title:
      "Automatiser son suivi client quand on est seul : 7 automatisations qui font gagner des heures",
    metaTitle: "Automatiser son suivi client en TPE : 7 idées concrètes",
    metaDescription:
      "7 automatisations simples pour une TPE : relances, rappels, réponses automatiques, demandes d'avis. Par où commencer et quoi éviter.",
    excerpt:
      "Quand on gère tout seul, le suivi client passe toujours après. Voici 7 automatisations simples qui travaillent à votre place et vous évitent de laisser filer des clients.",
    category: "Automatisation",
    readingTime: "9 min",
    publishedAt: "2026-06-22",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "automatisation TPE suivi client",
    cta: "automatisation",
  },
  {
    slug: "trouver-patients-osteopathe",
    title: "Comment trouver plus de patients quand on est ostéopathe en 2026",
    metaTitle: "Trouver des patients ostéopathe : le guide complet 2026",
    metaDescription:
      "Cabinet trop calme ? 7 leviers concrets pour trouver plus de patients en ostéopathie : Google, avis, site internet, prise de rendez-vous en ligne et Google Ads.",
    excerpt:
      "Diplôme en poche mais agenda à moitié vide ? Trouver des patients en ostéopathie ne dépend pas du hasard. Voici les 7 leviers qui remplissent un cabinet en quelques mois.",
    category: "Acquisition de clients",
    readingTime: "10 min",
    publishedAt: "2026-06-22",
    author: "Teddy Vidal",
    keyword: "trouver des patients ostéopathe",
  },
  {
    slug: "site-internet-kinesitherapeute-patients",
    title: "Site internet pour kinésithérapeute : attirer plus de patients en 2026",
    metaTitle: "Site internet kinésithérapeute : attirer des patients 2026",
    metaDescription:
      "Cabinet de kiné qui veut se développer ? Site internet, fiche Google, avis et réservation en ligne : le guide pour attirer plus de patients sans bouche-à-oreille.",
    excerpt:
      "Beaucoup de kinés croient que leur agenda se remplit tout seul. Jusqu'au jour où un nouveau cabinet ouvre à côté. Voici comment sécuriser et développer sa patientèle en ligne.",
    category: "Acquisition de clients",
    readingTime: "9 min",
    publishedAt: "2026-06-22",
    author: "Teddy Vidal",
    keyword: "site internet kinésithérapeute",
  },
  {
    slug: "trouver-clients-coach-sportif",
    title: "Comment trouver des clients quand on est coach sportif en 2026",
    metaTitle: "Trouver des clients coach sportif : le guide 2026",
    metaDescription:
      "Coach sportif qui veut remplir son planning ? 7 leviers pour trouver des clients sans dépendre uniquement d'Instagram : site, Google, avis et prise de rendez-vous.",
    excerpt:
      "Dépendre uniquement d'Instagram pour trouver des clients, c'est fragile. Voici comment un coach sportif construit un vrai système d'acquisition qui remplit son planning.",
    category: "Acquisition de clients",
    readingTime: "10 min",
    publishedAt: "2026-06-22",
    author: "Teddy Vidal",
    keyword: "trouver des clients coach sportif",
  },
  {
    slug: "trouver-clients-consultant-independant",
    title: "Trouver des clients en tant que consultant ou indépendant : le système complet",
    metaTitle: "Trouver des clients consultant indépendant (guide 2026)",
    metaDescription:
      "Consultant ou indépendant qui veut un flux régulier de clients ? Le système complet : positionnement, site, Google, contenu et automatisation. Sans démarchage à froid.",
    excerpt:
      "Le talent ne suffit pas à remplir un carnet de commandes. Voici le système complet qu'un consultant indépendant met en place pour attirer des clients sans démarcher à froid.",
    category: "Acquisition de clients",
    readingTime: "10 min",
    publishedAt: "2026-06-22",
    author: "Teddy Vidal",
    keyword: "trouver des clients consultant",
  },
  {
    slug: "trouver-clients-avocat",
    title: "Comment un avocat trouve de nouveaux clients en ligne en 2026",
    metaTitle: "Trouver des clients avocat : le guide en ligne 2026",
    metaDescription:
      "Développer sa clientèle d'avocat dans le respect de la déontologie : site internet, référencement, Google et avis. Le guide pour attirer des clients qualifiés en 2026.",
    excerpt:
      "Un client qui a un problème juridique commence par Google. Voici comment un avocat développe sa clientèle en ligne, dans le respect de la déontologie, sans démarchage.",
    category: "Acquisition de clients",
    readingTime: "10 min",
    publishedAt: "2026-06-22",
    author: "Teddy Vidal",
    keyword: "trouver des clients avocat",
  },
  {
    slug: "trouver-clients-expert-comptable",
    title: "Trouver des clients quand on est expert-comptable : l'acquisition digitale en 2026",
    metaTitle: "Trouver des clients expert-comptable (guide 2026)",
    metaDescription:
      "Développer son cabinet d'expertise comptable : site internet, référencement local, Google Ads et automatisation pour attirer des dirigeants et des créateurs d'entreprise.",
    excerpt:
      "Les créateurs d'entreprise cherchent leur expert-comptable sur Google. Voici comment un cabinet attire des clients qualifiés et automatise son acquisition en 2026.",
    category: "Acquisition de clients",
    readingTime: "9 min",
    publishedAt: "2026-06-22",
    author: "Teddy Vidal",
    keyword: "trouver des clients expert-comptable",
  },
  {
    slug: "trouver-clients-agent-immobilier",
    title: "Agent immobilier : générer des mandats et des acheteurs en ligne en 2026",
    metaTitle: "Trouver des clients agent immobilier (mandats 2026)",
    metaDescription:
      "Plus de mandats, plus d'acheteurs : le guide acquisition pour agent immobilier indépendant. Site, estimation en ligne, Google Ads, avis et relance automatique.",
    excerpt:
      "Le nerf de la guerre en immobilier, ce sont les mandats. Voici comment un agent indépendant génère des estimations, des mandats et des acheteurs grâce à une présence en ligne efficace.",
    category: "Acquisition de clients",
    readingTime: "10 min",
    publishedAt: "2026-06-22",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "trouver des clients agent immobilier",
    cta: "agents-ia",
  },
  {
    slug: "trouver-des-chantiers-artisan",
    title: "Trouver des chantiers : les 7 canaux qui remplissent vraiment un planning",
    metaTitle: "Trouver des chantiers : 7 canaux classés par rentabilité",
    metaDescription:
      "Fiche Google, site internet, plateformes, Ads, bouche-à-oreille : ce que chaque canal rapporte vraiment à un artisan, ce qu'il coûte, et par lequel commencer selon votre situation.",
    excerpt:
      "Tous les canaux ne se valent pas. Certains vous coûtent 20 % du chantier à vie, d'autres vous appartiennent pour toujours. Voici les sept façons de trouver des chantiers, classées par ce qu'elles rapportent réellement.",
    category: "Trouver des chantiers",
    readingTime: "11 min",
    publishedAt: "2026-08-13",
    author: "Teddy Vidal",
    keyword: "trouver des chantiers",
  },

  {
    slug: "plateformes-mise-en-relation-artisan-avis",
    title: "Travaux.com, Ootravaux, Habitatpresto : ce que ces plateformes coûtent vraiment",
    metaTitle: "Avis Travaux.com et plateformes artisans : le vrai coût",
    metaDescription:
      "Combien coûtent réellement les plateformes de mise en relation pour un artisan, comment fonctionne la revente de leads, et à partir de quand il devient rentable de s'en passer.",
    excerpt:
      "Les plateformes livrent de vraies demandes, personne ne le conteste. La question est ailleurs : combien vous coûte un chantier obtenu ainsi, et que vous reste-t-il le jour où vous arrêtez de payer ?",
    category: "Trouver des chantiers",
    readingTime: "10 min",
    publishedAt: "2026-08-13",
    author: "Teddy Vidal",
    keyword: "travaux.com avis",
  },

  {
    slug: "appels-manques-artisan-permanence-telephonique",
    title: "Appels manqués : combien ça vous coûte, et les quatre façons d'y remédier",
    metaTitle: "Appels manqués artisan : permanence téléphonique ou agent IA ?",
    metaDescription:
      "Un artisan rate 20 à 30 % de ses appels. Répondeur, secrétariat externalisé, permanence téléphonique, agent IA : ce que chaque solution coûte et laquelle choisir.",
    excerpt:
      "Six appels manqués par jour, deux qui ne rappelleront jamais, et un client parti chez le concurrent. Voici le calcul exact de ce que ça représente sur une année, et les quatre solutions possibles.",
    category: "Trouver des chantiers",
    readingTime: "10 min",
    publishedAt: "2026-08-13",
    author: "Teddy Vidal",
    keyword: "permanence téléphonique",
  },

  {
    slug: "crm-artisan-guide",
    title: "CRM pour artisan : à quoi ça sert vraiment quand on est seul sur les chantiers",
    metaTitle: "CRM artisan : lequel choisir et comment s'en servir",
    metaDescription:
      "Un CRM pour artisan ne sert pas à faire des tableaux. Il sert à ne perdre aucun devis en attente. Ce qu'il faut suivre, les outils possibles, et par quoi commencer.",
    excerpt:
      "La plupart des artisans pilotent leur suivi client avec un carnet et leur mémoire. Ça tient jusqu'à quinze devis en cours. Au-delà, les oublis coûtent plus cher que n'importe quel logiciel.",
    category: "Outils & logiciels",
    readingTime: "10 min",
    publishedAt: "2026-08-18",
    author: "Teddy Vidal",
    keyword: "crm artisan",
  },

  {
    slug: "chatbot-entreprise-tpe-guide",
    title: "Chatbot pour une entreprise : utile, gadget, ou piège à clients ?",
    metaTitle: "Chatbot entreprise : quand ça sert, quand ça fait fuir",
    metaDescription:
      "Ce qu'un chatbot apporte réellement à une TPE, la différence avec un agent IA, les cas où il fait fuir les clients, et combien ça coûte à mettre en place.",
    excerpt:
      "Un chatbot mal réglé fait plus de dégâts que pas de chatbot du tout. Voici les trois situations où il rapporte vraiment, celles où il vous coûte des clients, et ce qui a changé avec l'IA.",
    category: "Outils & logiciels",
    readingTime: "12 min",
    publishedAt: "2026-08-25",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "chatbot entreprise",
    cta: "agents-ia",
  },

  {
    slug: "logiciel-devis-artisan-choisir",
    title: "Logiciel de devis pour artisan : ce qui compte vraiment avant de choisir",
    metaTitle: "Logiciel de devis artisan : comment choisir sans se tromper",
    metaDescription:
      "Bibliothèque d'ouvrages, devis sur mobile, signature en ligne, relance automatique : les critères qui font gagner du temps et ceux qui n'en font perdre.",
    excerpt:
      "Le meilleur logiciel de devis n'est pas celui qui a le plus de fonctions. C'est celui qui vous fait envoyer le devis le jour même plutôt que trois semaines plus tard.",
    category: "Outils & logiciels",
    readingTime: "11 min",
    publishedAt: "2026-09-01",
    author: "Teddy Vidal",
    keyword: "logiciel devis artisan",
  },
  {
    slug: "agent-ia-entreprise-guide",
    title: "Agent IA en entreprise : ce que ça fait, ce que ça coûte, et quand s'en passer",
    metaTitle: "Agent IA en entreprise : ce que ça fait et ce que ça coûte",
    metaDescription:
      "Ce qu'un agent IA fait dans une PME, les tâches où il est rentable, ce qu'il coûte et les cas où une automatisation simple suffit.",
    excerpt:
      "Tout le monde vend des agents IA aux entreprises. Peu de gens disent dans quels cas ils ne servent à rien. Voici les quatre tâches où un agent tient ses promesses dans une petite structure, comment calculer son retour avant de signer, et les trois situations où une automatisation simple fait le même travail.",
    category: "Automatisation",
    readingTime: "10 min",
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "agent IA entreprise",
    cta: "agents-ia",
  },
  {
    slug: "comparatif-solutions-site-internet-artisan",
    title:
      "Site internet d'artisan : éditeur, abonnement, agence ou freelance ? Le comparatif 2026",
    metaTitle: "Comparatif site internet artisan 2026 : quelle solution choisir ?",
    metaDescription:
      "Éditeur automatique, abonnement d'agence spécialisée, offre tout compris ou création à l'achat : ce que coûte et rapporte chaque solution de site internet pour un artisan en 2026.",
    excerpt:
      "De 15 € à 400 € par mois, ou 2 500 € à l'achat : les offres de site internet pour artisans n'ont plus rien de comparable à première vue. Voici comment les ranger, ce que chaque famille inclut, et les questions qui départagent.",
    category: "Site internet",
    readingTime: "9 min",
    publishedAt: "2026-09-14",
    author: "Teddy Vidal",
    keyword: "comparatif site internet artisan",
  },
  {
    slug: "resilier-contrat-site-internet-location-financiere",
    title: "Résilier un contrat de site internet en location financière : les recours d'un artisan",
    metaTitle: "Résilier un contrat de site internet (location financière) : recours",
    metaDescription:
      "Contrat de site internet sur 48 mois avec un organisme de financement : comment le lire, quand la loi protège un artisan, et les étapes pour tenter d'en sortir.",
    excerpt:
      "Un site vendu lors d'un démarchage, un contrat de 48 mois, un loyer prélevé par une société de financement que vous ne connaissiez pas. Voici comment ces contrats fonctionnent et les pistes pour en sortir.",
    category: "Site internet",
    readingTime: "10 min",
    publishedAt: "2026-09-14",
    author: "Teddy Vidal",
    keyword: "résilier contrat site internet location financière",
  },
  {
    slug: "iphone-duo-site-internet-ecran-pliable",
    title: "iPhone Duo : votre site internet est-il prêt pour l'écran pliable d'Apple ?",
    metaTitle: "iPhone Duo : adapter votre site internet à l'écran pliable",
    metaDescription:
      "L'iPhone Duo, premier iPhone pliable, sort le 23 octobre 2026. Trois largeurs d'écran, Split View, Safari en double fenêtre : la checklist pour adapter votre site.",
    excerpt:
      "Apple a présenté l'iPhone Duo le 9 septembre 2026. Un écran de 5,4 pouces fermé, 7,6 pouces ouvert, deux applications côte à côte. Votre site va s'afficher dans trois formats qu'il n'a jamais rencontrés. Voici ce qui casse, ce qui compte pour le SEO et comment vous préparer avant la sortie du 23 octobre.",
    category: "Site internet",
    readingTime: "9 min",
    publishedAt: "2026-09-21",
    author: "Teddy Vidal",
    keyword: "iPhone Duo site internet",
    image: {
      src: "/blog-img/iphone-duo-avant-apres",
      alt: "Le même site sur l'écran déplié de l'iPhone Duo. Avant : une colonne étroite au centre, une photo floue et un numéro coupé. Après : une mise en page pleine largeur, une photo nette et un numéro visible.",
    },
  },
  // Ligne Agents IA / PME (26 septembre 2026) : src/data/blog-posts-agents-ia.ts
  ...ARTICLES_AGENTS_IA,
];

/**
 * Publication différée. Un article dont `publishedAt` est dans le futur reste dans le
 * dépôt mais disparaît du blog, du sitemap et du prérendu : il n'existe pas en ligne.
 * Il apparaît au premier déploiement effectué à partir de sa date.
 *
 * Le filtre s'évalue au moment du build. Sans nouveau déploiement, rien ne se publie
 * tout seul : les dates de publication sont doublées de déploiements programmés.
 */
function isPublished(post: BlogPost, today: string): boolean {
  return post.publishedAt <= today;
}

/* La date du build, pas celle du navigateur : sinon un article publié après
   le déploiement apparaîtrait côté client sans exister dans le HTML. */
export const BLOG_POSTS: BlogPost[] = ALL_BLOG_POSTS.filter((p) => isPublished(p, DATE_DU_BUILD));

/** Articles rédigés mais pas encore publiés, pour vérification en local. */
export const SCHEDULED_POSTS: BlogPost[] = ALL_BLOG_POSTS.filter((p) => !BLOG_POSTS.includes(p));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/**
 * Mots trop courants pour dire quoi que ce soit de la proximité entre deux articles.
 */
const MOTS_VIDES = new Set(
  (
    "le la les un une des du de au aux et ou en pour par sur dans avec sans que qui quoi " +
    "comment pourquoi quand ce cet cette ces son sa ses leur leurs votre vos notre nos " +
    "est sont etre avoir fait faut plus moins tout tous toute toutes vraiment mais donc " +
    "chez vers entre selon apres avant depuis pas ne on se il elle ils elles"
  ).split(" "),
);

/** Les mots retenus d'un article : son mot-clé et son titre, réduits à leur forme nue. */
function motsDArticle(post: BlogPost): Set<string> {
  return new Set(
    `${post.keyword} ${post.title}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((mot) => mot.length > 2 && !MOTS_VIDES.has(mot)),
  );
}

const MOTS_PAR_ARTICLE = new Map(BLOG_POSTS.map((p) => [p.slug, motsDArticle(p)]));

/**
 * Au-delà de deux mots partagés, deux articles sont considérés comme aussi proches l'un
 * que l'autre. Ce plafond est ce qui laisse le nombre de liens déjà reçus départager les
 * candidats : sans lui, la pertinence seule décide et les articles d'une même famille se
 * renvoient la balle en boucle pendant que le reste du blog n'est lié par personne.
 */
const PROXIMITE_MAX = 2;

function proximite(a: BlogPost, b: BlogPost): number {
  const motsB = MOTS_PAR_ARTICLE.get(b.slug);
  const motsA = MOTS_PAR_ARTICLE.get(a.slug);
  if (!motsA || !motsB) return 0;
  let communs = 0;
  for (const mot of motsA) if (motsB.has(mot)) communs++;
  return Math.min(communs, PROXIMITE_MAX);
}

const cartesArticlesLies = new Map<number, Map<string, BlogPost[]>>();

/**
 * Répartit les suggestions sur l'ensemble du blog, une fois pour toutes.
 *
 * La version précédente prenait les premiers articles du tableau. Les liens internes se
 * concentraient donc sur une poignée d'articles — « Publicité ChatGPT Ads » en recevait 22
 * à lui seul — pendant que quatre articles n'en recevaient aucun. Google a lu ce signal
 * comme il fallait s'y attendre et a laissé plusieurs articles hors de son index.
 *
 * Le tri se fait ici en quatre temps : la même rubrique, puis la proximité de sujet, puis
 * le nombre de liens déjà reçus, puis le rang pour rester déterministe d'un build à
 * l'autre. Chaque article reçoit entre deux et quatre liens internes.
 */
function carteArticlesLies(limit: number): Map<string, BlogPost[]> {
  const dejaCalculee = cartesArticlesLies.get(limit);
  if (dejaCalculee) return dejaCalculee;

  const liensRecus = new Map(BLOG_POSTS.map((p) => [p.slug, 0]));
  const carte = new Map<string, BlogPost[]>();

  for (const post of BLOG_POSTS) {
    const choisis = BLOG_POSTS.map((p, rang) => ({ p, rang }))
      // Un article indexé ne renvoie que vers des articles indexés : les liens
      // internes vont aux pages qui doivent se classer (src/lib/indexation.ts).
      .filter(
        (c) => c.p.slug !== post.slug && articleIndexable(c.p.slug) === articleIndexable(post.slug),
      )
      .sort((a, b) => {
        const rubrique =
          Number(b.p.category === post.category) - Number(a.p.category === post.category);
        if (rubrique !== 0) return rubrique;
        const sujet = proximite(post, b.p) - proximite(post, a.p);
        if (sujet !== 0) return sujet;
        const liens = (liensRecus.get(a.p.slug) ?? 0) - (liensRecus.get(b.p.slug) ?? 0);
        if (liens !== 0) return liens;
        return a.rang - b.rang;
      })
      .slice(0, limit)
      .map((c) => c.p);

    for (const choisi of choisis) {
      liensRecus.set(choisi.slug, (liensRecus.get(choisi.slug) ?? 0) + 1);
    }
    carte.set(post.slug, choisis);
  }

  cartesArticlesLies.set(limit, carte);
  return carte;
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  if (!getPostBySlug(slug)) return BLOG_POSTS.slice(0, limit);
  return carteArticlesLies(limit).get(slug) ?? [];
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function formatDate(iso: string): string {
  // En UTC : « 2026-09-04 » est minuit UTC, qu'un fuseau américain
  // afficherait « 3 septembre » et React refuserait d'hydrater.
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Les articles mis en avant, sur l'accueil comme en tête du blog.
 *
 * Choix éditorial et non chronologique : le plus récent n'est pas forcément
 * celui qui intéresse le plus de monde. Depuis le 30 octobre 2026, la
 * sélection suit Sitaly App : créer son site et lancer son activité.
 * Modifier cette liste suffit à changer la mise en avant partout.
 */
export const A_LA_UNE = [
  "creer-site-internet-gratuit",
  "prix-site-internet",
  "trouver-nom-entreprise",
] as const;

/** Du plus récent au plus ancien. L'ordre du fichier est celui de la rédaction. */
export const POSTS_RECENTS: BlogPost[] = [...BLOG_POSTS].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

/**
 * La sélection mise en avant, complétée par les articles les plus récents si
 * un slug de `A_LA_UNE` a disparu ou n'est pas encore publié.
 */
export function postsALaUne(limite = 3): BlogPost[] {
  const choisis = A_LA_UNE.map((s) => getPostBySlug(s)).filter((p): p is BlogPost => Boolean(p));
  const complement = POSTS_RECENTS.filter((p) => !choisis.includes(p) && articleIndexable(p.slug));
  return [...choisis, ...complement].slice(0, limite);
}
