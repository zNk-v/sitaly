import type { BlogPost } from "@/data/blog-posts";
import { PRIX_AGENTS_IA } from "@/lib/config";

/**
 * Articles de la ligne Agents IA / PME, ouverte le 26 septembre 2026 (audit
 * SEO/GEO).
 *
 * Ligne éditoriale : chaque article apporte un fait que les autres pages
 * n'ont pas. Les deux premiers s'appuient sur les règles entrées en
 * application à l'été 2026, sources officielles citées en fin d'article.
 * Les cinq du 28 septembre 2026 (plan SEO d'octobre, docs/seo/) visent les
 * requêtes d'achat : agence, prise de rendez-vous, standard, RGPD, prix.
 * Aucun chiffre qui ne vienne d'un texte ou d'une autorité ; les exemples et
 * les simulations sont annoncés comme tels.
 *
 * Fichier séparé de blog-posts.ts pour garder la liste historique lisible ;
 * les articles rejoignent ALL_BLOG_POSTS et suivent exactement les mêmes règles
 * (publication à la date, sitemap, blog, articles liés).
 */
/**
 * L'article sur le prix n'est publié que si les montants plancher le sont
 * (PRIX_AGENTS_IA.afficher, décision D1 du 28 septembre 2026). Sans montant,
 * il resterait un article sur le prix qui n'en donne aucun.
 */
const ARTICLE_PRIX: BlogPost = {
  slug: "prix-agent-ia",
  title: "Prix d'un agent IA en 2026 : mise en place, abonnement, coût à la minute",
  metaTitle: "Prix d'un agent IA en 2026 : mise en place et abonnement",
  metaDescription:
    "Combien coûte un agent IA pour une PME en 2026 : mise en place, abonnement mensuel, coût des minutes de voix, et comment savoir s'il sera rentable.",
  excerpt:
    "Le prix d'un agent IA se lit sur trois lignes : la mise en place, le pilotage mensuel et les coûts variables des minutes de voix et des SMS. Ce qui fait varier chacune, les montants plancher de Sitaly, et un calcul de rentabilité à faire avec vos propres chiffres.",
  category: "Automatisation",
  readingTime: "7 min",
  publishedAt: "2026-09-28",
  author: "Teddy Vidal",
  keyword: "prix agent IA",
  cta: "agents-ia",
};

export const ARTICLES_AGENTS_IA: BlogPost[] = [
  {
    slug: "agence-agents-ia-questions",
    title: "Agence agents IA : 10 questions à poser avant de signer",
    metaTitle: "Agence agents IA : 10 questions à poser avant de signer",
    metaDescription:
      "Avant de confier un agent IA à une agence : 10 questions sur la conception, les données, la reprise humaine, la facturation et la sortie du contrat.",
    excerpt:
      "Une démonstration réussie dit peu de choses sur ce que fera l'agent au troisième mois. Dix questions à poser à une agence avant de signer : qui maintient l'agent, ce qu'il fait quand il ne sait pas, où vont les données, ce qui est facturé, et comment on arrête.",
    category: "Automatisation",
    readingTime: "7 min",
    publishedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "agence agent IA",
    cta: "agents-ia",
  },
  {
    slug: "agent-ia-prise-de-rendez-vous",
    title: "Prise de rendez-vous par agent IA : le brancher sur votre agenda en 5 étapes",
    metaTitle: "Prise de rendez-vous par agent IA : 5 étapes | Sitaly",
    metaDescription:
      "Un agent IA qui propose des créneaux et confirme les rendez-vous : règles, connexion à l'agenda, qualification, rappels et reprise humaine, en 5 étapes.",
    excerpt:
      "Un agent IA de prise de rendez-vous répond à ceux qui appellent ou écrivent, pose les bonnes questions et cale le créneau dans votre agenda. Les cinq étapes pour le brancher sans doublons ni déplacements inutiles : règles, agenda, qualification, rappels, reprise humaine.",
    category: "Automatisation",
    readingTime: "7 min",
    publishedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "agent IA prise de rendez-vous",
    cta: "agents-ia",
  },
  {
    slug: "standard-telephonique-ia",
    title: "Standard téléphonique IA : ce qu'il remplace dans une PME",
    metaTitle: "Standard téléphonique IA : ce qu'il remplace en PME",
    metaDescription:
      "Standard téléphonique IA : ce qu'il remplace dans une PME, ce qu'il ne doit pas faire, les obligations en vigueur depuis août 2026 et comment le tester.",
    excerpt:
      "Un standard décroche, filtre, transfère et prend des messages. Ce qu'un agent vocal IA reprend de ces tâches, ce qu'il doit laisser à votre équipe, les obligations en vigueur depuis août 2026, et la façon de le tester sur vos vrais appels.",
    category: "Automatisation",
    readingTime: "7 min",
    publishedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "standard téléphonique IA",
    cta: "agents-ia",
  },
  {
    slug: "agent-ia-rgpd",
    title: "Agent IA et RGPD : la checklist avant de connecter un agent à vos données clients",
    metaTitle: "Agent IA et RGPD : la checklist avant de le connecter",
    metaDescription:
      "Base légale, information des appelants, sous-traitants, durée de conservation, transferts hors UE : la checklist RGPD avant de connecter un agent IA.",
    excerpt:
      "Un agent IA traite des données personnelles dès la première seconde d'un appel. Dix points à vérifier par écrit avant de le brancher sur votre agenda ou votre CRM, avec les références de la CNIL : base légale, information, conservation, sous-traitants, transferts, registre.",
    category: "Automatisation",
    readingTime: "9 min",
    publishedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "agent IA RGPD",
    cta: "agents-ia",
  },
  ...(PRIX_AGENTS_IA.afficher ? [ARTICLE_PRIX] : []),
  {
    slug: "demarchage-telephonique-agent-ia-2026",
    title:
      "Démarchage téléphonique interdit sans consentement : ce qu'un agent IA a encore le droit de faire",
    metaTitle: "Démarchage téléphonique 2026 : ce qu'un agent IA peut faire",
    metaDescription:
      "Depuis le 11 août 2026, appeler un particulier sans son accord est interdit. Ce qu'un agent IA peut encore faire : appels entrants, rappels, clients.",
    excerpt:
      "Depuis le 11 août 2026, démarcher un particulier par téléphone sans son consentement préalable est interdit. Un agent IA qui appelle à froid tombe sous le coup de la loi. Un agent qui décroche, rappelle ceux qui l'ont demandé et suit vos clients, non. Voici où passe la frontière.",
    category: "Automatisation",
    readingTime: "8 min",
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "démarchage téléphonique agent IA",
    cta: "agents-ia",
  },
  {
    slug: "ai-act-article-50-agent-vocal",
    title: "AI Act, article 50 : ce que votre agent vocal doit dire dès la première phrase",
    metaTitle: "AI Act article 50 : ce qu'un agent vocal doit annoncer",
    metaDescription:
      "Depuis le 2 août 2026, un agent vocal ou un chatbot doit dire qu'il est une IA dès le premier échange. Qui est concerné, quoi dire, et comment le vérifier.",
    excerpt:
      "Depuis le 2 août 2026, une personne qui parle à une IA doit le savoir dès le début de l'échange. Pour une entreprise qui confie son accueil téléphonique à un agent vocal, la règle tient en une phrase, à condition de la placer au bon endroit. Ce que dit l'article 50, et ce qu'il change concrètement.",
    category: "Automatisation",
    readingTime: "6 min",
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-28",
    author: "Teddy Vidal",
    keyword: "AI Act article 50 agent vocal",
    cta: "agents-ia",
  },
];
