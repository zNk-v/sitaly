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
    author: "Teddy Vidal",
    keyword: "démarchage téléphonique agent IA",
    content: [
      {
        type: "p",
        text: "Depuis le 11 août 2026, la prospection par téléphone auprès des particuliers repose sur une règle simple : pas d'appel sans accord préalable. La loi n° 2025-594 du 30 juin 2025 contre toutes les fraudes aux aides publiques a renversé la logique qui prévalait jusque-là, où c'était au particulier de s'inscrire sur une liste pour ne plus être appelé.",
      },
      {
        type: "p",
        text: "Pour une entreprise qui envisage un agent IA au téléphone, la question arrive vite : ce que fait l'agent, est-ce du démarchage ? La réponse dépend de qui appelle qui, et pourquoi. Cet article fait le point à partir des sources officielles. Il ne remplace pas l'avis d'un juriste sur votre situation.",
      },
      { type: "h2", text: "Ce que dit le texte depuis le 11 août 2026" },
      {
        type: "ul",
        items: [
          "Démarcher un consommateur par téléphone est interdit dans tous les secteurs, sauf s'il y a consenti au préalable.",
          "Le consentement doit être libre, spécifique, éclairé et univoque, donné par un geste actif. Il vaut au plus un an, et sa preuve se conserve trois ans.",
          "Même avec consentement, les appels de prospection ne se passent que du lundi au vendredi, de 10 h à 13 h et de 14 h à 20 h.",
          "Trois cas échappent à l'exigence de consentement : l'appel qui porte sur un contrat en cours, la vente de journaux et magazines, et les sollicitations non commerciales.",
          "Certains secteurs restent fermés au démarchage téléphonique des particuliers, consentement ou non : la rénovation énergétique, l'adaptation du logement à la perte d'autonomie et le compte personnel de formation.",
          "Les règles figurent aux articles L. 221-16 et L. 221-17 du Code de la consommation, précisés par le décret n° 2026-662 du 23 juillet 2026. Les amendes administratives vont jusqu'à 75 000 € pour une personne physique et 375 000 € pour une personne morale.",
        ],
      },
      {
        type: "p",
        text: "Le texte protège le consommateur. La prospection téléphonique entre professionnels n'exige pas de consentement préalable : elle reste possible quand elle porte sur l'activité de la personne appelée, à condition de se présenter et de lui laisser un moyen simple de refuser.",
      },
      { type: "h2", text: "Ce qu'un agent IA peut faire" },
      {
        type: "p",
        text: "La frontière ne passe pas entre l'humain et la machine. Elle passe entre l'appel que la personne attend et celui qu'elle n'a pas demandé.",
      },
      {
        type: "ul",
        items: [
          "Décrocher les appels entrants, à toute heure. Répondre à quelqu'un qui appelle n'est pas du démarchage.",
          "Rappeler une personne qui l'a demandé : un message laissé, un formulaire avec la case « être rappelé » cochée, un rendez-vous réservé.",
          "Appeler un client au sujet de son contrat en cours : échéance, renouvellement, suivi de dossier, intervention programmée.",
          "Relancer une demande de devis dans le cadre de la demande du client, par SMS ou e-mail, et par téléphone quand il a accepté d'être rappelé.",
          "Appeler des professionnels sur un sujet lié à leur activité, en se présentant et en respectant leur refus.",
        ],
      },
      { type: "h2", text: "Ce qu'il ne doit pas faire" },
      {
        type: "ul",
        items: [
          "Appeler à froid des particuliers qui n'ont rien demandé, pour vendre un service ou rentrer un mandat.",
          "Appeler des contacts achetés dont le consentement ne couvre pas votre entreprise : le consentement doit être spécifique.",
          "Appeler en dehors des plages autorisées, même un contact consentant.",
          "Prospecter par téléphone un particulier pour de la rénovation énergétique, même s'il a donné son accord, hors contrat en cours.",
        ],
      },
      {
        type: "p",
        text: "Un point de prudence de plus : un agent vocal qui passe seul des appels de prospection peut aussi être assimilé à un automate d'appel. L'article L. 34-5 du Code des postes et des communications électroniques soumettait déjà ce type d'appel au consentement préalable des personnes physiques, bien avant 2026.",
      },
      { type: "h2", text: "Le consentement, en pratique" },
      {
        type: "p",
        text: "Quand le consentement est nécessaire, il se recueille au moment où la personne vous contacte, et il se prouve.",
      },
      {
        type: "ul",
        items: [
          "Une case à cocher, jamais précochée, qui nomme votre entreprise et l'objet de l'appel.",
          "La date et l'heure du consentement enregistrées avec le contact, conservées trois ans.",
          "Une durée de validité suivie : au-delà d'un an, le consentement est à redemander.",
          "Un moyen simple de le retirer, et le retrait appliqué partout, y compris dans les règles de l'agent.",
        ],
      },
      {
        type: "table",
        caption: "Ce que l'agent peut faire, situation par situation",
        headers: ["Situation", "L'agent peut appeler ?", "À quelle condition"],
        rows: [
          ["Un prospect appelle l'entreprise", "Il décroche", "Aucune"],
          ["Un prospect a demandé à être rappelé", "Oui", "Rappel lié à sa demande"],
          ["Un client, au sujet de son contrat", "Oui", "Contrat en cours"],
          ["Un devis envoyé, sans réponse", "Par SMS ou e-mail ; par téléphone si accepté", "Dans le cadre de la demande"],
          ["Un particulier qui n'a rien demandé", "Non", "Consentement préalable et spécifique"],
          ["Rénovation énergétique, particulier", "Non", "Hors contrat en cours, interdit"],
          ["Un professionnel, sur son activité", "Oui", "Se présenter, respecter le refus"],
        ],
      },
      { type: "h2", text: "Ce que ça change pour les secteurs qui prospectaient au téléphone" },
      {
        type: "p",
        text: "Agences immobilières en recherche de mandats, courtiers qui rappelaient des listes de contacts, entreprises de rénovation : pour ces métiers, le téléphone sortant perd une grande partie de son usage auprès des particuliers. Ce qui reste, c'est l'entrant : les appels reçus, les formulaires, les demandes de rappel.",
      },
      {
        type: "p",
        text: "C'est précisément là qu'un agent IA a sa place. Il ne sert plus à multiplier les appels sortants ; il sert à ne perdre aucune des demandes qui arrivent, à les qualifier et à les rappeler dans le cadre qu'elles ont fixé. Une demande entrante traitée tard vaut désormais plus cher, parce qu'on ne la remplacera pas par un appel à froid.",
      },
      { type: "h2", text: "Et le règlement européen sur l'IA ?" },
      {
        type: "p",
        text: "Une autre règle s'applique depuis le 2 août 2026, quel que soit le sens de l'appel : l'article 50 du règlement européen sur l'IA impose qu'une personne qui échange avec une IA en soit informée, au plus tard au début de l'échange. Un agent vocal doit donc se présenter comme tel dès sa première phrase.",
      },
      {
        type: "faq",
        items: [
          {
            q: "Un agent IA qui rappelle un formulaire de contact fait-il du démarchage ?",
            a: "Non, s'il rappelle la personne au sujet de la demande qu'elle a faite et qu'elle a accepté d'être rappelée. Ce rappel répond à une sollicitation ; il n'en crée pas une.",
          },
          {
            q: "Les appels entre entreprises sont-ils concernés ?",
            a: "L'interdiction sans consentement vise les consommateurs. Entre professionnels, la prospection téléphonique reste possible quand elle porte sur l'activité de la personne appelée, avec l'obligation de se présenter et de respecter son refus.",
          },
          {
            q: "Combien de temps un consentement reste-t-il valable ?",
            a: "Un an au plus. La preuve du consentement se conserve trois ans.",
          },
          {
            q: "Peut-on relancer un devis par téléphone ?",
            a: "Oui quand le client a accepté d'être recontacté par téléphone au sujet de sa demande. Sinon, la relance passe par SMS ou e-mail. En rénovation énergétique, la prospection téléphonique des particuliers est interdite hors contrat en cours.",
          },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Ministère de l'Économie, « Professionnels : comment respecter la réglementation sur le démarchage téléphonique ? », economie.gouv.fr",
          "CNIL, « Prospection commerciale par téléphone (hors automate d'appel) : quelles sont les règles ? », cnil.fr",
          "Loi n° 2025-594 du 30 juin 2025 contre toutes les fraudes aux aides publiques, Légifrance",
          "Décret n° 2026-662 du 23 juillet 2026, Légifrance",
        ],
      },
    ],
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
    author: "Teddy Vidal",
    keyword: "AI Act article 50 agent vocal",
    content: [
      {
        type: "p",
        text: "Le règlement européen sur l'intelligence artificielle, l'AI Act, s'applique par étapes. Celle du 2 août 2026 concerne directement les entreprises qui utilisent un agent vocal, un chatbot ou un assistant de messagerie : ses obligations de transparence, réunies à l'article 50, sont entrées en application.",
      },
      {
        type: "p",
        text: "Pour un accueil téléphonique confié à une IA, l'essentiel tient en une règle : la personne doit savoir qu'elle parle à une machine, et le savoir tout de suite. Voici ce que dit le texte, qui est concerné, et comment vérifier qu'un agent est en règle.",
      },
      { type: "h2", text: "Ce que dit l'article 50" },
      {
        type: "ul",
        items: [
          "Un système d'IA destiné à interagir directement avec des personnes doit être conçu pour qu'elles soient informées qu'elles échangent avec une IA.",
          "L'information doit être donnée de façon claire et reconnaissable, au plus tard au moment de la première interaction.",
          "Une seule exception : quand c'est évident pour une personne raisonnablement attentive. On ne s'y fie pas pour un agent vocal, dont la voix peut passer pour humaine.",
          "L'article traite aussi du marquage des contenus générés, des systèmes de reconnaissance des émotions et des hypertrucages. Pour un accueil téléphonique, c'est l'obligation d'information qui compte.",
        ],
      },
      { type: "h2", text: "Qui est concerné" },
      {
        type: "p",
        text: "Le texte place l'obligation de conception sur le fournisseur du système : c'est à lui de faire en sorte que l'agent s'annonce. Dans les faits, l'entreprise qui déploie un agent vocal pour son accueil a tout intérêt à le vérifier elle-même, parce que c'est son numéro, sa marque et ses clients qui sont en jeu.",
      },
      {
        type: "p",
        text: "Les échéances plus lointaines de l'AI Act, celles des systèmes dits à haut risque (recrutement, notation de crédit, éducation, biométrie), ont été repoussées. L'obligation de transparence de l'article 50, elle, s'applique depuis le 2 août 2026.",
      },
      { type: "h2", text: "Ce que l'agent doit dire, concrètement" },
      {
        type: "p",
        text: "La première phrase de l'agent fait le travail. Elle nomme l'entreprise, dit la nature de l'interlocuteur et laisse une porte vers un humain :",
      },
      {
        type: "quote",
        text: "Bonjour, vous êtes bien chez [entreprise]. Je suis l'assistant virtuel de l'agence, une intelligence artificielle. Je peux prendre votre demande ou vous passer un conseiller.",
      },
      {
        type: "ul",
        items: [
          "Au début de l'appel, pas après une minute d'échange ni en fin de conversation.",
          "Dans des mots courants : « assistant virtuel », « intelligence artificielle ». Pas de formule qui laisse croire à une personne.",
          "La même règle sur tous les canaux : SMS, messagerie, chat du site.",
          "Si l'appel est enregistré ou transcrit, l'information prévue par le RGPD s'ajoute à celle de l'AI Act.",
        ],
      },
      { type: "h2", text: "Comment vérifier un agent" },
      {
        type: "ul",
        items: [
          "Appelez-le vous-même depuis un numéro inconnu, à différentes heures, et écoutez la première phrase.",
          "Demandez-lui directement « Je parle à un robot ? » : il doit répondre oui sans détour.",
          "Demandez un humain : le transfert ou la prise de message doit être proposé.",
          "Relisez les messages écrits qu'il envoie : la mention doit y figurer aussi.",
        ],
      },
      { type: "h2", text: "Ce que la transparence change pour vos clients" },
      {
        type: "p",
        text: "Annoncer l'IA dès le départ ne fait pas raccrocher, à condition que l'agent soit utile tout de suite : répondre à la question, proposer un créneau, prendre un message complet. Ce qui agace, c'est de découvrir au bout de deux minutes qu'on parlait à une machine, ou de ne pas pouvoir joindre un humain quand la demande le justifie. La règle de l'article 50 rejoint ici une règle de bon sens commercial.",
      },
      {
        type: "faq",
        items: [
          {
            q: "Depuis quand l'article 50 s'applique-t-il ?",
            a: "Depuis le 2 août 2026. Les obligations des systèmes à haut risque ont été repoussées, pas celle-ci.",
          },
          {
            q: "Un standard téléphonique à touches est-il concerné ?",
            a: "Le texte vise les systèmes d'IA qui interagissent avec des personnes. Un menu à touches classique n'est pas un système d'IA ; un agent qui comprend et répond en langage naturel l'est.",
          },
          {
            q: "Faut-il répéter l'information à chaque appel ?",
            a: "C'est la pratique la plus sûre. Le texte exige l'information au plus tard lors de la première interaction, et rien ne garantit que la personne qui rappelle se souvienne de l'appel précédent.",
          },
          {
            q: "L'agent peut-il avoir un prénom ?",
            a: "Oui, à condition de dire clairement qu'il s'agit d'une IA. Le prénom ne doit pas servir à laisser croire à une personne.",
          },
        ],
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Règlement (UE) 2024/1689 sur l'intelligence artificielle, article 50, EUR-Lex",
          "« The EU AI Act's Transparency Rules: A Practical Guide to Article 50 », artificialintelligenceact.eu",
          "IT Social, « AI Act, les obligations de transparence de l'article 50 sont entrées en application », août 2026",
        ],
      },
    ],
  },
];
