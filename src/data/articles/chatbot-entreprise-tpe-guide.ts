import type { BlogSection } from "@/data/blog-posts";

/** Le corps de l'article « chatbot-entreprise-tpe-guide ». Ses métadonnées vivent dans
    src/data/blog-posts.ts ; ce fichier n'est chargé que sur sa page. */
export const contenu: BlogSection[] = [
  {
    type: "p",
    text: "Vous avez sûrement déjà pesté contre une petite bulle en bas à droite d'un site, qui vous répond « je n'ai pas compris votre demande » pour la troisième fois. C'est l'image que beaucoup de dirigeants ont du chatbot, et elle explique pourquoi ils n'en veulent pas. Elle est en partie datée : les outils de 2026 n'ont plus grand-chose à voir avec les arbres de décision d'il y a cinq ans. Reste que le mauvais chatbot existe toujours, et qu'il coûte des clients. Cet article sépare les cas où l'outil rapporte de ceux où il nuit.",
  },

  { type: "h2", text: "Chatbot, agent IA : ce n'est plus la même chose" },
  {
    type: "p",
    text: "Le mot chatbot recouvre aujourd'hui deux technologies très différentes, et c'est la source de la plupart des déceptions.",
  },
  {
    type: "p",
    text: "Le chatbot classique fonctionne par scénarios. Un humain a prévu à l'avance une liste de questions et les réponses correspondantes. Tant que le visiteur reste dans le cadre, ça marche. Dès qu'il formule sa demande autrement, l'outil bloque et répète qu'il n'a pas compris.",
  },
  {
    type: "p",
    text: "L'agent conversationnel adossé à un modèle de langage comprend une demande formulée librement, s'appuie sur vos informations réelles pour répondre, et poursuit un objectif, comme obtenir un numéro de téléphone ou caler un rendez-vous. Il ne suit pas un script, il mène une conversation.",
  },
  {
    type: "table",
    caption: "Chatbot scénarisé et agent conversationnel",
    headers: ["", "Chatbot scénarisé", "Agent conversationnel IA"],
    rows: [
      ["Fonctionnement", "Arbre de questions prévues", "Comprend et reformule librement"],
      ["Hors sujet", "Bloque", "S'adapte ou transfère"],
      ["Mise en place", "Rapide, mais à maintenir", "Nécessite de fournir vos informations"],
      ["Effet sur l'image", "Souvent négatif", "Neutre à positif si bien réglé"],
      ["Coût", "Faible", "Abonnement plus élevé"],
    ],
  },

  { type: "h2", text: "Les trois cas où un chatbot rapporte vraiment" },
  { type: "h3", text: "1. Vous recevez beaucoup de questions identiques" },
  {
    type: "p",
    text: "Délais, zone d'intervention, tarifs d'un déplacement, prestations couvertes, modalités de paiement. Si vous répondez dix fois par semaine à la même chose, un agent qui traite ces demandes vous rend des heures et donne au visiteur une réponse immédiate à minuit un dimanche.",
  },
  { type: "h3", text: "2. Vos visiteurs partent sans laisser de trace" },
  {
    type: "p",
    text: "Beaucoup de visiteurs repartent sans remplir le formulaire de contact et sans téléphoner. Un agent qui engage la conversation au bon moment capte une partie de ces départs, avec un numéro de téléphone à la clé. Vos statistiques de visite et vos demandes reçues vous disent quelle part de visiteurs repart sans rien laisser.",
  },
  { type: "h3", text: "3. Vos demandes arrivent hors des heures ouvrées" },
  {
    type: "p",
    text: "Regardez vos statistiques : si une part de vos visites arrive le soir et le week-end, personne ne leur répond à ce moment-là. Un agent qui prend le relais transforme ces visites en demandes qualifiées, prêtes le lendemain matin.",
  },

  { type: "h2", text: "Les trois cas où il vous coûte des clients" },
  {
    type: "p",
    text: "Il faut le dire aussi franchement : dans certaines situations, un chatbot fait du mal.",
  },
  {
    type: "ul",
    items: [
      "Quand il s'ouvre de force au bout de deux secondes et masque le contenu de la page sur un téléphone. Le visiteur ferme le site, pas la bulle.",
      "Quand il remplace un numéro de téléphone visible. Sur une urgence de plomberie ou de toiture, le client veut appeler, pas taper.",
      "Quand il ne sait pas passer la main. Un visiteur agacé qui ne trouve aucun moyen de joindre un humain devient un avis négatif.",
    ],
  },
  {
    type: "p",
    text: "La règle est simple : l'agent doit être une porte de plus, jamais une porte à la place d'une autre. Le téléphone reste en haut de page, cliquable, quoi qu'il arrive.",
  },

  { type: "h2", text: "Ce qu'il faut lui donner pour qu'il soit bon" },
  {
    type: "p",
    text: "La qualité d'un agent conversationnel dépend moins de la technologie que de ce qu'on lui fournit. Un agent branché sans préparation invente ou reste vague, et c'est exactement l'effet redouté.",
  },
  {
    type: "ul",
    items: [
      "Vos informations concrètes : prestations, zone d'intervention, délais habituels, horaires, ce que vous ne faites pas.",
      "Vos ordres de grandeur tarifaires, même approximatifs. C'est la première question posée, et l'esquiver fait fuir.",
      "L'objectif à atteindre : obtenir un numéro, proposer un créneau, ou faire décrire le besoin.",
      "La limite claire à partir de laquelle il transfère à un humain, urgence comprise.",
    ],
  },

  { type: "h2", text: "Chatbot écrit ou agent au téléphone ?" },
  {
    type: "p",
    text: "Pour une entreprise de services locale, la question mérite d'être posée dans cet ordre. Vos prospects vous joignent-ils davantage par téléphone ou par le site ? Dans le bâtiment et les services à domicile, le téléphone domine largement, et un agent vocal qui décroche à votre place produit plus qu'un chatbot écrit.",
  },
  {
    type: "p",
    text: "Dans les services aux entreprises, le conseil ou les métiers où le projet se prépare longtemps à l'avance, le rapport s'inverse : le prospect préfère écrire, en dehors des heures, sans engager de conversation. Le chatbot y prend tout son sens. Le versant téléphonique, lui, relève d'un [agent vocal](/agents-ia/) qui décroche et se présente comme une IA.",
  },

  { type: "h2", text: "Combien ça coûte" },
  {
    type: "p",
    text: "Trois postes composent la facture, et seul le premier est affiché sur les sites des éditeurs. Il y a l'abonnement à l'outil, le paramétrage initial, et l'entretien. Le deuxième est celui qu'on sous-estime : c'est là que se joue la différence entre un agent qui convertit et un agent qui répète qu'il n'a pas compris.",
  },
  {
    type: "p",
    text: "Beaucoup de solutions se vendent en libre-service. Vous payez un abonnement modeste, puis vous passez des heures à écrire les réponses, tester et corriger. Pour un dirigeant de TPE qui n'a pas ce temps, le risque est un outil installé, mal réglé, puis désactivé. Le mode clé en main coûte plus cher à l'abonnement et retire ce risque.",
  },

  { type: "h2", text: "Comment savoir s'il sert à quelque chose" },
  {
    type: "p",
    text: "Un seul indicateur compte : le nombre de conversations qui débouchent sur un contact exploitable, numéro de téléphone ou rendez-vous. Ni le nombre de conversations ouvertes, ni le nombre de messages échangés. Si sur cent conversations aucune n'a produit de contact, l'agent occupe le visiteur au lieu de le convertir.",
  },
  {
    type: "p",
    text: "Fixez-vous un point de contrôle à un mois. Relisez une trentaine de conversations réelles. Vous verrez les questions auxquelles l'agent répond mal : ce sont elles qu'il faut corriger en premier.",
  },

  {
    type: "quote",
    text: "Un chatbot ne remplace pas un commercial. Il remplace le silence, qui est ce qui vous coûte le plus.",
  },

  {
    type: "faq",
    items: [
      {
        q: "Un chatbot est-il utile pour une petite entreprise ?",
        a: "Il l'est dans trois situations : quand vous répondez sans cesse aux mêmes questions, quand vos visiteurs quittent le site sans laisser de coordonnées, et quand vos demandes arrivent le soir et le week-end. En dehors de ces cas, l'effort de paramétrage dépasse souvent le gain.",
      },
      {
        q: "Quelle différence entre un chatbot et un agent IA ?",
        a: "Un chatbot scénarisé suit un arbre de questions prévues à l'avance et bloque dès qu'on en sort. Un agent IA comprend une demande formulée librement, s'appuie sur vos informations réelles et poursuit un objectif concret, comme obtenir un numéro ou proposer un créneau.",
      },
      {
        q: "Un chatbot peut-il faire fuir des clients ?",
        a: "Oui, dans trois cas : s'il s'ouvre de force et masque la page sur mobile, s'il remplace un numéro de téléphone visible alors que le client a une urgence, ou s'il ne sait pas transférer à un humain. Il doit rester une porte supplémentaire, jamais un remplacement.",
      },
      {
        q: "Combien coûte un chatbot pour une entreprise ?",
        a: "La facture comprend l'abonnement, le paramétrage initial et l'entretien. Seul l'abonnement est affiché par les éditeurs. Le paramétrage est le poste décisif : c'est lui qui sépare un agent qui convertit d'un agent qui répète qu'il n'a pas compris.",
      },
      {
        q: "Faut-il un chatbot écrit ou un agent vocal au téléphone ?",
        a: "Cela dépend du canal par lequel vos prospects vous joignent. Dans le bâtiment et les services à domicile, le téléphone domine et un agent vocal produit davantage. Dans les services aux entreprises et le conseil, le prospect préfère écrire, souvent hors des heures ouvrées.",
      },
      {
        q: "Comment mesurer si un chatbot est rentable ?",
        a: "En comptant les conversations qui débouchent sur un contact exploitable, numéro ou rendez-vous, et rien d'autre. Le nombre de conversations ouvertes ne veut rien dire. Prévoyez un point à un mois et relisez une trentaine d'échanges réels pour corriger les réponses faibles.",
      },
    ],
  },

  { type: "h2", text: "Un agent réglé pour votre métier, pas un gadget" },
  {
    type: "p",
    text: "Sitaly installe et pilote des [agents IA pour PME](/agents-ia/), écrits et vocaux, nourris de vos vraies informations : prestations, zone, délais, tarifs indicatifs. Ils se présentent comme une IA, qualifient la demande, obtiennent un numéro et passent la main quand il le faut. Vous ne paramétrez rien. Réservez un diagnostic offert de 30 minutes.",
  },
];
