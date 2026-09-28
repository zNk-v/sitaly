import type { BlogPost } from "@/data/blog-posts";

/**
 * Articles de la ligne Agents IA / PME, ouverte le 26 septembre 2026 (audit
 * SEO/GEO).
 *
 * Ligne éditoriale : deux articles par mois au plus, chacun avec un fait que
 * les autres pages n'ont pas. Ces deux-là s'appuient sur les règles entrées en
 * application à l'été 2026, sources officielles citées en fin d'article.
 * Aucun chiffre qui ne vienne d'un texte ou d'une autorité.
 *
 * Fichier séparé de blog-posts.ts pour garder la liste historique lisible ;
 * les articles rejoignent ALL_BLOG_POSTS et suivent exactement les mêmes règles
 * (publication à la date, sitemap, blog, articles liés).
 */
export const ARTICLES_AGENTS_IA: BlogPost[] = [
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
