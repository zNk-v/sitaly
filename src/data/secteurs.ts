import { PRIX_AGENTS_IA, euros } from "@/lib/config";

export { euros };

/**
 * Les pages Agents IA par secteur.
 *
 * Décision du 26 septembre 2026 (audit SEO/GEO) : « agent IA PME » et
 * « standard téléphonique IA » sont saturés par des éditeurs installés. Un
 * domaine jeune a sa chance sur la requête longue qui croise un secteur et un
 * problème, et ce sont précisément les secteurs que Sitaly prospecte :
 * l'immobilier et le courtage sur LinkedIn, le BTP structuré au téléphone.
 * Chaque page sert donc deux fois : elle se positionne sur sa requête, et elle
 * sert de page d'atterrissage aux prospects contactés.
 *
 * Règle de preuve : aucun chiffre ici. Les seules dates citées sont celles
 * des textes (loi du 30 juin 2025 sur le démarchage, applicable le 11 août
 * 2026 ; article 50 du règlement européen sur l'IA, applicable le 2 août
 * 2026). Chaque page porte son propre texte : même gabarit, contenus
 * distincts.
 */

export type SecteurSlug = "agences-immobilieres" | "courtiers" | "btp";

/**
 * Une page du même gabarit sous /agents-ia/. Les secteurs en sont, et aussi
 * la page d'un agent (/agents-ia/agent-vocal/, src/data/agent-vocal.ts), qui
 * croise un usage plutôt qu'un métier et reste hors de SECTEURS.
 */
export interface Secteur {
  slug: SecteurSlug | "agent-vocal";
  /** Libellé court : menu, pied de page, cartes. */
  label: string;
  /** Une ligne sous le libellé dans les cartes. */
  carte: string;
  titre: string;
  description: string;
  h1: string;
  intro: string;
  reperes: [string, string, string];
  /** Titre de section : partie droite, puis fragment en italique (DESIGN.md §4). */
  pertesTitre: [string, string];
  pertes: { t: string; d: string }[];
  actions: { t: string; d: string }[];
  cadreTitre: [string, string];
  cadre: { t: string; d: string }[];
  outils: string;
  scenarios: string;
  pourQui?: string;
  faq: { q: string; a: string }[];
  ctaTitre: string;
  /** Les articles du blog proposés en bas de page (slugs). */
  aLire: string[];
  /** Public visé, pour les données structurées. */
  audience: string;
  /** Nom du service balisé. Par défaut : « Agent IA pour » + le public. */
  nomService?: string;
  /** Titre du bloc de maillage. Par défaut : « Les autres secteurs ». */
  maillageTitre?: [string, string];
}

/** Chemin de la page, slash final compris. */
export function cheminSecteur(s: Pick<Secteur, "slug">): string {
  return `/agents-ia/${s.slug}/`;
}

/** Le bloc tarif, avec ou sans montant selon PRIX_AGENTS_IA.afficher. */
export function texteTarif(): string {
  if (PRIX_AGENTS_IA.afficher) {
    return `La mise en place démarre à ${euros(PRIX_AGENTS_IA.miseEnPlaceMin)}, le pilotage mensuel à ${euros(PRIX_AGENTS_IA.mensuelMin)}. Le montant exact dépend du nombre de processus, de canaux et d'outils à connecter : il vous est remis par écrit après le diagnostic offert. Le pilotage mensuel couvre les coûts variables : minutes de voix et SMS.`;
  }
  return "Deux montants, donnés par écrit après le diagnostic offert : la mise en place, puis le pilotage mensuel. Ils dépendent du nombre de processus, de canaux et d'outils à connecter. Le pilotage mensuel couvre les coûts variables : minutes de voix et SMS.";
}

/** La réponse FAQ « Combien ça coûte ? », avec ou sans montant. */
export function reponsePrix(): string {
  if (PRIX_AGENTS_IA.afficher) {
    return `Mise en place à partir de ${euros(PRIX_AGENTS_IA.miseEnPlaceMin)}, puis pilotage à partir de ${euros(PRIX_AGENTS_IA.mensuelMin)} par mois. Le prix exact est écrit après le diagnostic offert, selon le périmètre et les outils à connecter.`;
  }
  return "Deux montants, la mise en place puis le pilotage mensuel, chiffrés par écrit après le diagnostic offert. Ils dépendent du périmètre et des outils à connecter. Rien n'est facturé avant votre accord.";
}

const RAPPEL_AI_ACT =
  "Depuis le 2 août 2026, l'article 50 du règlement européen sur l'IA impose d'informer la personne qu'elle échange avec une IA. L'agent l'annonce dès sa première phrase.";

export const SECTEURS: Secteur[] = [
  {
    slug: "agences-immobilieres",
    label: "Agences immobilières",
    carte:
      "Appels pendant les visites, leads des portails le soir, estimations restées sans suite.",
    titre: "Agent IA pour agence immobilière : leads et visites | Sitaly",
    description:
      "Un agent IA qui décroche, qualifie acquéreurs et vendeurs, planifie visites et estimations et relance les dossiers. Installé et piloté par Sitaly.",
    h1: "Agent IA pour agence immobilière : chaque appel décroché, chaque contact qualifié",
    intro:
      "Un agent IA pour agence immobilière répond aux appels et aux demandes reçues des portails, qualifie le projet de la personne (achat, vente, location), propose un créneau de visite ou d'estimation dans l'agenda du bon négociateur et transmet une fiche complète à votre équipe. Sitaly l'installe, le connecte à vos outils et le pilote chaque mois. Vos négociateurs gardent la main sur les règles et sur chaque dossier.",
    reperes: [
      "Diagnostic offert de 30 minutes",
      "Branché sur vos outils",
      "Reprise humaine à tout moment",
    ],
    pertesTitre: ["Où une agence perd", "ses contacts"],
    pertes: [
      {
        t: "Pendant les visites",
        d: "Un négociateur en rendez-vous ne décroche pas. Le vendeur qui appelait pour une estimation compose le numéro de l'agence suivante.",
      },
      {
        t: "Le soir et le week-end",
        d: "Les demandes des portails arrivent quand l'agence est fermée. L'acquéreur qui a écrit à trois agences retient souvent celle qui répond la première.",
      },
      {
        t: "Après l'estimation",
        d: "Un propriétaire estimé au printemps vend parfois à l'automne. Sans nouvelles de votre part, il signe avec l'agence qui a pris des siennes.",
      },
      {
        t: "À l'accueil",
        d: "Horaires, pièces à fournir, avancement d'un dossier : les mêmes questions occupent la personne qui devrait traiter les nouveaux contacts.",
      },
    ],
    actions: [
      {
        t: "Accueil téléphonique, y compris hors horaires",
        d: "Il décroche, se présente comme l'assistant virtuel de l'agence, identifie le motif de l'appel et répond aux questions courantes à partir des informations que vous lui fournissez.",
      },
      {
        t: "Qualification des acquéreurs",
        d: "Bien concerné, budget, financement (accord de principe, apport), critères, délai. Le négociateur reçoit une fiche qui se lit en quelques secondes.",
      },
      {
        t: "Qualification des vendeurs",
        d: "Adresse, type de bien, surface, motif et délai de vente. Il propose ensuite un rendez-vous d'estimation.",
      },
      {
        t: "Visites et estimations",
        d: "Il réserve le créneau dans l'agenda du négociateur concerné, envoie la confirmation puis un rappel par SMS.",
      },
      {
        t: "Relances",
        d: "Estimations restées sans suite, acquéreurs sans visite, dossiers incomplets : uniquement auprès de personnes qui ont déjà sollicité l'agence.",
      },
      {
        t: "Transfert à un humain",
        d: "Vous décidez des cas qui passent directement à l'équipe : client existant, vendeur pressé, demande sensible, ou simple demande de l'appelant.",
      },
    ],
    cadreTitre: ["Ce que l'agent", "ne fait pas"],
    cadre: [
      {
        t: "Il ne donne pas d'avis de valeur",
        d: "L'estimation reste le travail du négociateur. L'agent recueille les informations et réserve le rendez-vous.",
      },
      {
        t: "Il ne démarche pas de propriétaires",
        d: "Depuis le 11 août 2026, la prospection téléphonique d'un particulier sans son consentement préalable est interdite (loi du 30 juin 2025, articles L. 221-16 et suivants du Code de la consommation). L'agent traite les demandes entrantes et rappelle les personnes qui l'ont demandé.",
      },
      { t: "Il ne se fait pas passer pour un humain", d: RAPPEL_AI_ACT },
    ],
    outils:
      "L'agent travaille avec ce que l'agence utilise déjà : logiciel de transaction, agendas des négociateurs, e-mails de leads des portails, ligne téléphonique (par renvoi d'appel) et formulaire du site. La connexion dépend de ce que votre logiciel permet : API, webhooks ou import par e-mail. On le vérifie pendant le diagnostic, avant tout chiffrage. Vous ne changez pas d'outil.",
    scenarios:
      "Des scénarios réels sont joués avant la mise en service : l'appel d'un vendeur, la demande d'un acquéreur, une question hors périmètre.",
    pourQui:
      "Agences indépendantes et réseaux de plusieurs agences qui reçoivent chaque semaine plus d'appels et de demandes qu'ils n'arrivent à en traiter à temps. Si votre volume d'appels est faible, un agent ne se justifie pas : une automatisation simple, accusé de réception et rappel programmé, suffit et coûte beaucoup moins cher. On vous le dit pendant le diagnostic.",
    faq: [
      {
        q: "Les appelants savent-ils qu'ils parlent à une IA ?",
        a: "Oui. L'agent se présente comme l'assistant virtuel de l'agence dès le début de l'échange, comme l'exige l'article 50 du règlement européen sur l'IA, applicable depuis le 2 août 2026. L'appelant peut demander un humain à tout moment.",
      },
      {
        q: "L'agent peut-il estimer un bien ?",
        a: "Non. Il recueille les informations utiles et réserve le rendez-vous d'estimation. L'avis de valeur reste celui du négociateur.",
      },
      {
        q: "Peut-il appeler des propriétaires pour rentrer des mandats ?",
        a: "Non. Depuis le 11 août 2026, démarcher un particulier par téléphone sans son consentement préalable est interdit. L'agent traite les demandes entrantes et ne recontacte que les personnes qui l'ont demandé.",
      },
      {
        q: "Que se passe-t-il quand il ne sait pas répondre ?",
        a: "Il ne devine pas. Il reformule une fois, puis transfère l'appel ou prend un message avec le résumé de l'échange.",
      },
      {
        q: "Faut-il changer de logiciel de transaction ?",
        a: "Non. L'agent se branche sur vos outils quand ils le permettent (API, webhooks, e-mail). La compatibilité est vérifiée pendant le diagnostic.",
      },
      {
        q: "Combien de temps pour le mettre en place ?",
        a: "Cela dépend du périmètre et des connexions. Un premier processus, par exemple l'accueil téléphonique hors horaires, se met en place plus vite qu'un système complet. Le délai est écrit dans la proposition.",
      },
    ],
    ctaTitre: "Où votre agence perd-elle des contacts ?",
    aLire: [
      "trouver-clients-agent-immobilier",
      "demarchage-telephonique-agent-ia-2026",
      "chatbot-entreprise-tpe-guide",
      "agent-ia-prise-de-rendez-vous",
    ],
    audience: "Agences immobilières",
  },
  {
    slug: "courtiers",
    label: "Courtiers en crédit et en assurance",
    carte: "Demandes à rappeler vite, pièces justificatives à relancer, rendez-vous à confirmer.",
    titre: "Agent IA pour courtier en crédit et en assurance | Sitaly",
    description:
      "Un agent IA qui rappelle vos demandes entrantes, prend les rendez-vous et relance les pièces manquantes. Aucun conseil : il prépare le travail du courtier.",
    h1: "Agent IA pour courtier : chaque demande rappelée, chaque dossier complété",
    intro:
      "Un agent IA pour courtier en crédit ou en assurance rappelle les demandes entrantes dès leur arrivée, recueille les informations de base du projet, réserve un rendez-vous avec le bon conseiller et relance les pièces manquantes jusqu'à ce que le dossier soit complet. Il ne donne aucun conseil : le conseil et les obligations liées à votre statut restent assurés par vos conseillers. Sitaly l'installe, le connecte à vos outils et le pilote chaque mois.",
    reperes: [
      "Diagnostic offert de 30 minutes",
      "Aucun conseil donné par l'agent",
      "Reprise humaine à tout moment",
    ],
    pertesTitre: ["Où un cabinet de courtage perd", "du temps et des dossiers"],
    pertes: [
      {
        t: "Le délai de rappel",
        d: "Une demande reçue d'un site, d'un comparateur ou d'un partenaire perd de sa valeur à chaque heure sans réponse. Le client a souvent sollicité d'autres cabinets.",
      },
      {
        t: "Les pièces justificatives",
        d: "Relancer plusieurs fois pour un avis d'imposition ou un relevé de compte occupe des heures de conseiller.",
      },
      {
        t: "Les appels de suivi",
        d: "« Où en est mon dossier ? » : une question utile pour le client, coûteuse pour l'équipe.",
      },
      {
        t: "Les rendez-vous manqués",
        d: "Sans confirmation ni rappel, une partie des créneaux reste vide.",
      },
    ],
    actions: [
      {
        t: "Rappel des demandes entrantes",
        d: "Il rappelle, pendant les plages que vous fixez, les personnes qui ont demandé à être contactées par votre cabinet.",
      },
      {
        t: "Premier recueil d'informations",
        d: "Nature du projet (achat, investissement locatif, renégociation, assurance emprunteur), montant approximatif, situation, délai. Sans conseil ni recommandation.",
      },
      {
        t: "Rendez-vous",
        d: "Il réserve le créneau dans l'agenda du conseiller adapté, confirme, puis rappelle la veille.",
      },
      {
        t: "Liste de pièces et relances",
        d: "Il envoie la liste des documents à fournir selon le projet et relance par SMS ou e-mail jusqu'à ce que le dossier soit complet, puis prévient le conseiller.",
      },
      {
        t: "Suivi de dossier",
        d: "Si votre outil le permet, il répond aux questions d'avancement à partir du statut enregistré.",
      },
      {
        t: "Clients existants",
        d: "Rappels d'échéances et de renouvellements, dans le cadre des contrats en cours.",
      },
    ],
    cadreTitre: ["Le cadre que", "l'agent respecte"],
    cadre: [
      {
        t: "Pas de conseil",
        d: "L'agent ne compare pas d'offres, ne fait pas de simulation et n'oriente pas le choix du client. Il prépare le rendez-vous.",
      },
      {
        t: "Pas de démarchage à froid",
        d: "Depuis le 11 août 2026, la prospection téléphonique d'un particulier exige son consentement préalable, explicite et limité dans le temps (loi du 30 juin 2025, décret n° 2026-662 du 23 juillet 2026). L'agent n'appelle que les personnes qui ont demandé à être contactées par votre cabinet, ou vos clients au sujet d'un contrat en cours.",
      },
      {
        t: "Pas de données de santé",
        d: "Pour l'assurance emprunteur, l'agent ne pose aucune question médicale. Le questionnaire de santé reste hors de son périmètre.",
      },
      { t: "Transparence", d: RAPPEL_AI_ACT },
    ],
    outils:
      "Logiciel de courtage ou CRM, agendas, boîte e-mail des demandes, téléphonie : la connexion passe par API, webhooks ou e-mail selon ce que vos outils permettent. On le vérifie pendant le diagnostic, avant tout chiffrage. Vous ne changez pas d'outil.",
    scenarios:
      "Des scénarios réels sont joués avant la mise en service : le rappel d'une demande de crédit, la relance d'une pièce manquante, une question de conseil renvoyée vers un conseiller.",
    faq: [
      {
        q: "L'agent peut-il faire une simulation de prêt ?",
        a: "Non. Il recueille les éléments du projet et réserve un rendez-vous. La simulation et le conseil sont faits par un conseiller.",
      },
      {
        q: "Peut-il rappeler des leads achetés ?",
        a: "Seulement si la personne a consenti à être appelée par votre cabinet. Depuis le 11 août 2026, ce consentement doit être explicite, spécifique et limité dans le temps : vérifiez-le auprès de votre fournisseur de leads avant de lui confier ces contacts.",
      },
      {
        q: "Pose-t-il des questions de santé pour l'assurance emprunteur ?",
        a: "Non, jamais. Le questionnaire de santé reste entre le client, le conseiller et l'assureur.",
      },
      {
        q: "Les clients savent-ils qu'ils parlent à une IA ?",
        a: "Oui, dès la première phrase, et ils peuvent demander un conseiller à tout moment.",
      },
      {
        q: "Peut-il se connecter à notre logiciel de courtage ?",
        a: "Si votre logiciel expose une API ou des webhooks, oui. Sinon, on passe par l'e-mail ou un fichier partagé. C'est vérifié pendant le diagnostic.",
      },
      {
        q: "Que devient l'historique des échanges ?",
        a: "Chaque échange est résumé et rattaché au contact dans votre outil, ou envoyé par e-mail au conseiller concerné.",
      },
    ],
    ctaTitre: "Combien de demandes attendent un rappel ce soir ?",
    aLire: [
      "demarchage-telephonique-agent-ia-2026",
      "ai-act-article-50-agent-vocal",
      "agent-ia-rgpd",
      "chatbot-entreprise-tpe-guide",
    ],
    audience: "Courtiers en crédit et en assurance",
  },
  {
    slug: "btp",
    label: "Entreprises du BTP",
    carte: "Appels manqués sur chantier, visites techniques à caler, devis à relancer.",
    titre: "Agent IA pour entreprise du BTP : appels et devis | Sitaly",
    description:
      "Un agent IA qui décroche quand l'équipe est sur chantier, qualifie les demandes, planifie les visites techniques et relance les devis sans réponse.",
    h1: "Agent IA pour entreprise du BTP : les appels décrochés, les devis relancés",
    intro:
      "Un agent IA pour entreprise du BTP répond aux appels quand l'équipe est sur chantier, trie les demandes (nouveau projet, chantier en cours, SAV), qualifie les travaux, réserve la visite technique dans l'agenda du bon interlocuteur et relance les devis restés sans réponse. Sitaly l'installe, le connecte à vos outils et le pilote chaque mois.",
    reperes: [
      "Diagnostic offert de 30 minutes",
      "Branché sur vos outils",
      "Reprise humaine à tout moment",
    ],
    pertesTitre: ["Où une entreprise du bâtiment perd", "des chantiers"],
    pertes: [
      {
        t: "Sur le chantier",
        d: "Personne ne décroche depuis un échafaudage. Le client qui appelait pour sa toiture compose le numéro suivant.",
      },
      {
        t: "Les demandes mal qualifiées",
        d: "Un déplacement pour un chantier hors zone ou hors budget coûte une demi-journée.",
      },
      {
        t: "Les devis envoyés, jamais relancés",
        d: "Le client compare, hésite, puis signe avec l'entreprise qui l'a rappelé.",
      },
      {
        t: "Le SAV mélangé aux nouvelles demandes",
        d: "Urgences et garanties se perdent dans le flux des appels.",
      },
    ],
    actions: [
      {
        t: "Accueil et tri des appels",
        d: "Nouveau projet, chantier en cours, SAV ou fournisseur : chaque appel va au bon interlocuteur, avec un résumé.",
      },
      {
        t: "Qualification des demandes",
        d: "Type de travaux, adresse (dans votre zone ou non), dimensions ou surface, délai, budget indicatif. Il envoie un lien pour recevoir des photos par SMS.",
      },
      {
        t: "Visites techniques",
        d: "Il réserve le créneau dans l'agenda du commercial ou du conducteur de travaux, confirme, puis rappelle la veille.",
      },
      {
        t: "Relance des devis",
        d: "À l'intervalle que vous fixez après l'envoi, il reprend contact, répond aux questions simples et vous remonte les objections : prix, délai, financement.",
      },
      {
        t: "Aides et financement",
        d: "Il ne promet aucune aide. Il note si le client envisage MaPrimeRénov' ou un financement, et le signale au commercial.",
      },
      {
        t: "SAV et garanties",
        d: "Il enregistre la demande, qualifie l'urgence et prévient la bonne personne.",
      },
    ],
    cadreTitre: ["Ce que l'agent", "ne fait pas"],
    cadre: [
      {
        t: "Il ne chiffre pas",
        d: "Il prépare la demande, informations et photos comprises, pour que le chiffrage soit rapide.",
      },
      {
        t: "Il ne démarche pas de particuliers",
        d: "La prospection téléphonique sans consentement préalable est interdite depuis le 11 août 2026. Les relances concernent des personnes qui vous ont demandé un devis, et le consentement à être recontacté par téléphone est recueilli au moment de la demande.",
      },
      { t: "Il ne se fait pas passer pour un humain", d: RAPPEL_AI_ACT },
    ],
    outils:
      "Logiciel de devis et de facturation, agendas, téléphonie, formulaire du site : la connexion passe par API, webhooks ou e-mail selon ce que vos outils permettent. On le vérifie pendant le diagnostic, avant tout chiffrage. Vous ne changez pas de logiciel.",
    scenarios:
      "Des scénarios réels sont joués avant la mise en service : l'appel d'un particulier pendant un chantier, une demande hors zone, la relance d'un devis envoyé.",
    pourQui:
      "Entreprises du bâtiment structurées, en général à partir d'une dizaine de salariés : couverture, rénovation énergétique, menuiseries extérieures, rénovation globale, piscines. Ce sont les métiers où un chantier gagné ou perdu se compte en milliers d'euros, et où une demande non traitée pèse le plus lourd.",
    faq: [
      {
        q: "L'agent peut-il faire un devis ?",
        a: "Non. Il recueille les informations et les photos, puis réserve la visite technique si elle est nécessaire.",
      },
      {
        q: "Et si le chantier est hors de notre zone ?",
        a: "L'agent le vérifie à partir de l'adresse, l'indique poliment et ne réserve pas de visite. C'est vous qui définissez la zone.",
      },
      {
        q: "Certains clients veulent parler à quelqu'un. Comment ça se passe ?",
        a: "Ils le peuvent à tout moment. Vous choisissez aussi les appels transférés directement : chantier en cours, urgence, client existant.",
      },
      {
        q: "Peut-il relancer nos devis en attente ?",
        a: "Oui, ceux envoyés à des personnes qui vous ont sollicité. Pour les relances téléphoniques de particuliers, le consentement à être recontacté est recueilli au moment de la demande de devis.",
      },
      {
        q: "Faut-il changer de logiciel de devis ?",
        a: "Non. L'agent se branche sur vos outils quand ils le permettent (API, webhooks, e-mail). C'est vérifié pendant le diagnostic.",
      },
      { q: "Combien ça coûte ?", a: reponsePrix() },
    ],
    ctaTitre: "Combien d'appels sont restés sans réponse cette semaine ?",
    aLire: [
      "relance-automatique-devis",
      "standard-telephonique-ia",
      "demarchage-telephonique-agent-ia-2026",
      "prise-rendez-vous-en-ligne-guide",
    ],
    audience: "Entreprises du bâtiment et des travaux publics",
  },
];

export function secteur(slug: SecteurSlug): Secteur {
  const s = SECTEURS.find((x) => x.slug === slug);
  if (!s) throw new Error(`Secteur inconnu : ${slug}`);
  return s;
}

/** Les autres secteurs (les trois, depuis une page d'agent), pour le maillage en bas de page. */
export function autresSecteurs(s: Secteur): Secteur[] {
  return SECTEURS.filter((x) => x.slug !== s.slug);
}
