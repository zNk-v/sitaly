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

export type SecteurSlug =
  | "agences-immobilieres"
  | "courtiers"
  | "btp"
  | "restauration"
  | "sante"
  | "beaute"
  | "automobile"
  | "professions-liberales";

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
  /* Cinq secteurs ajoutés le 5 octobre 2026, sur la liste de futurdigital.fr
     (DESIGN.md §11). Même règle que les trois premiers : aucun chiffre, un
     texte propre à chaque page, les seules dates citées sont celles des
     textes de loi. */
  {
    slug: "restauration",
    label: "Restauration et hôtellerie",
    carte: "Réservations pendant le service, commandes à emporter, avis à remercier.",
    titre: "Agent IA pour restaurant et hôtel : réservations | Sitaly",
    description:
      "Un agent IA qui prend les réservations pendant le service, répond aux questions courantes et confirme par SMS. Installé et piloté par Sitaly.",
    h1: "Agent IA pour restaurant et hôtel : les réservations prises, même en plein service",
    intro:
      "Un agent IA pour restaurant ou hôtel décroche quand la salle est pleine et que personne n'a les mains libres. Il prend la réservation, note le nombre de couverts et les demandes particulières, répond aux questions courantes (horaires, accès, terrasse, privatisation) et envoie la confirmation par SMS. Sitaly l'installe, le branche sur votre outil de réservation et le pilote chaque mois.",
    reperes: [
      "Diagnostic offert de 30 minutes",
      "Branché sur votre outil de réservation",
      "Reprise humaine à tout moment",
    ],
    pertesTitre: ["Où un restaurant perd", "ses couverts"],
    pertes: [
      {
        t: "Pendant le coup de feu",
        d: "Le téléphone sonne à 20 h 30. Personne ne décroche, et la table de six part chez le voisin.",
      },
      {
        t: "Les tables vides du no-show",
        d: "Une réservation sans confirmation reste une table bloquée pour quelqu'un qui ne viendra peut-être pas.",
      },
      {
        t: "Les mêmes questions, en boucle",
        d: "Horaires, parking, menu enfant, chiens acceptés : chaque appel coupe un serveur dans son service.",
      },
      {
        t: "Les demandes de groupe oubliées",
        d: "Un repas d'entreprise ou un anniversaire se négocie au téléphone. Noté sur un coin de carnet, il se perd.",
      },
    ],
    actions: [
      {
        t: "Réservations par téléphone",
        d: "Date, heure, nombre de couverts, nom, demandes particulières. Il vérifie la disponibilité dans votre outil de réservation et confirme sur le champ.",
      },
      {
        t: "Confirmations et rappels",
        d: "Un SMS de confirmation, puis un rappel le jour même avec un lien pour annuler. La table se libère au lieu de rester vide.",
      },
      {
        t: "Questions pratiques",
        d: "Horaires, accès, terrasse, formules du midi : il répond à partir des informations que vous lui donnez, et seulement celles-là.",
      },
      {
        t: "Groupes et privatisations",
        d: "Il recueille la date, le nombre de personnes, le budget et l'occasion, puis transmet une fiche complète au responsable.",
      },
      {
        t: "Hôtels : questions avant séjour",
        d: "Arrivée tardive, parking, petit-déjeuner, lit bébé : il répond et note la demande dans la réservation quand votre outil le permet.",
      },
      {
        t: "Avis clients",
        d: "Il propose des réponses aux avis Google que vous validez avant publication.",
      },
    ],
    cadreTitre: ["Ce que l'agent", "ne fait pas"],
    cadre: [
      {
        t: "Il ne s'engage pas sur les allergènes",
        d: "L'information sur les allergènes reste la vôtre (règlement européen INCO). L'agent lit la fiche que vous lui fournissez et passe la main à l'équipe au moindre doute.",
      },
      {
        t: "Il ne surréserve pas",
        d: "Il ne propose que les créneaux libres dans votre outil. Les exceptions restent décidées par vous.",
      },
      { t: "Il ne se fait pas passer pour un humain", d: RAPPEL_AI_ACT },
    ],
    outils:
      "L'agent travaille avec votre outil de réservation, votre ligne téléphonique (par renvoi d'appel pendant le service ou en permanence) et votre fiche Google. La connexion passe par API ou par e-mail selon ce que l'outil permet. On le vérifie pendant le diagnostic, avant tout chiffrage.",
    scenarios:
      "Des scénarios réels sont joués avant la mise en service : une réservation un samedi soir complet, une demande de groupe, une question sur un allergène.",
    pourQui:
      "Restaurants qui servent midi et soir et ratent des appels pendant le service, brasseries, restaurants de groupe, hôtels indépendants. Si vos réservations passent déjà presque toutes en ligne, une automatisation simple des confirmations peut suffire : on vous le dit pendant le diagnostic.",
    faq: [
      {
        q: "Les clients savent-ils qu'ils parlent à une IA ?",
        a: "Oui, dès la première phrase, comme l'exige l'article 50 du règlement européen sur l'IA, applicable depuis le 2 août 2026. Ils peuvent demander quelqu'un de l'équipe à tout moment.",
      },
      {
        q: "Peut-il prendre une réservation quand nous sommes complets ?",
        a: "Non. Il propose un autre créneau ou une liste d'attente si vous en tenez une. Il ne réserve que ce que votre outil affiche comme libre.",
      },
      {
        q: "Et les questions sur les allergènes ?",
        a: "Il lit la fiche allergènes que vous lui fournissez. S'il y a le moindre doute, il passe la main à l'équipe plutôt que de répondre.",
      },
      {
        q: "Peut-il prendre des commandes à emporter ?",
        a: "Oui, à partir de votre carte et de vos horaires, si votre caisse ou votre outil de commande peut les recevoir. C'est vérifié pendant le diagnostic.",
      },
      {
        q: "Faut-il changer d'outil de réservation ?",
        a: "Non. L'agent se branche sur l'outil que vous utilisez quand il le permet (API ou e-mail).",
      },
      { q: "Combien ça coûte ?", a: reponsePrix() },
    ],
    ctaTitre: "Combien d'appels avez-vous laissés sonner samedi soir ?",
    aLire: [
      "agent-ia-prise-de-rendez-vous",
      "standard-telephonique-ia",
      "chatbot-entreprise-tpe-guide",
      "prise-rendez-vous-en-ligne-guide",
    ],
    audience: "Restaurants et hôtels",
  },
  {
    slug: "sante",
    label: "Santé et bien-être",
    carte: "Secrétariat débordé, rendez-vous à déplacer, patients qui ne viennent pas.",
    titre: "Agent IA pour cabinet de santé : secrétariat | Sitaly",
    description:
      "Un agent IA qui décroche pour le cabinet, prend et déplace les rendez-vous et envoie les rappels, sans jamais donner d'avis médical. Piloté par Sitaly.",
    h1: "Agent IA pour cabinet de santé et de bien-être : le secrétariat qui décroche toujours",
    intro:
      "Un agent IA pour cabinet de santé ou de bien-être répond aux appels pendant les séances, prend, déplace ou annule les rendez-vous dans votre agenda, répond aux questions pratiques et envoie les rappels. Il ne donne aucun avis médical et oriente toute urgence vers le 15. Sitaly l'installe, vérifie avec vous le traitement des données et le pilote chaque mois.",
    reperes: [
      "Diagnostic offert de 30 minutes",
      "Aucun avis médical",
      "Reprise humaine à tout moment",
    ],
    pertesTitre: ["Où un cabinet perd", "ses rendez-vous"],
    pertes: [
      {
        t: "Pendant la séance",
        d: "Vous ne décrochez pas en pleine consultation. Le patient qui appelait pour un premier rendez-vous en prend un ailleurs.",
      },
      {
        t: "Les rendez-vous non honorés",
        d: "Un créneau oublié par le patient est un créneau perdu, que personne n'a pu reprendre.",
      },
      {
        t: "Les déplacements de rendez-vous",
        d: "Décaler, annuler, reprogrammer : ces appels occupent le secrétariat plus que les nouvelles demandes.",
      },
      {
        t: "Les questions pratiques",
        d: "Adresse, accès, pièces à apporter, remboursement : toujours les mêmes, toujours au mauvais moment.",
      },
    ],
    actions: [
      {
        t: "Prise de rendez-vous",
        d: "Il identifie le motif (premier rendez-vous, suivi, bilan), propose les créneaux adaptés à la durée de la séance et réserve dans votre agenda.",
      },
      {
        t: "Déplacements et annulations",
        d: "Le patient décale lui-même son rendez-vous par téléphone. Le créneau libéré redevient disponible.",
      },
      {
        t: "Rappels",
        d: "Un SMS la veille avec l'adresse et un lien pour annuler. Moins de créneaux vides, sans appel de votre part.",
      },
      {
        t: "Questions pratiques",
        d: "Accès, parking, documents à apporter, modalités de paiement : il répond à partir des informations que vous lui fournissez.",
      },
      {
        t: "Urgences",
        d: "Au moindre signe d'urgence, il oriente vers le 15 ou le 112 et ne cherche pas à évaluer la situation.",
      },
      {
        t: "Messages pour le praticien",
        d: "Ce qui ne relève pas de l'agenda est noté et transmis, avec un résumé, au praticien concerné.",
      },
    ],
    cadreTitre: ["Ce que l'agent", "ne fait pas"],
    cadre: [
      {
        t: "Il ne donne aucun avis médical",
        d: "Ni diagnostic, ni conseil de traitement, ni tri de la gravité. Il prend le rendez-vous et oriente toute urgence vers le 15.",
      },
      {
        t: "Il ne stocke pas de dossier patient",
        d: "Les données de santé relèvent de l'article 9 du RGPD. L'agent ne recueille que ce qu'exige la prise de rendez-vous, et l'hébergement est vérifié avec vous (hébergeur certifié HDS dès que des données de santé sont conservées).",
      },
      { t: "Il ne se fait pas passer pour un humain", d: RAPPEL_AI_ACT },
    ],
    outils:
      "L'agent se branche sur votre agenda en ligne et votre ligne téléphonique, quand l'agenda le permet (API ou synchronisation). La conformité du traitement des données est vérifiée pendant le diagnostic, avant tout chiffrage. Vous ne changez pas d'agenda.",
    scenarios:
      "Des scénarios réels sont joués avant la mise en service : un premier rendez-vous, un patient qui veut décaler, un appel qui évoque une urgence.",
    pourQui:
      "Kinésithérapeutes, ostéopathes, cabinets pluridisciplinaires, centres de bien-être et praticiens qui travaillent sans secrétariat ou avec un secrétariat débordé. Si votre agenda en ligne absorbe déjà l'essentiel des demandes, l'agent ne se justifie que pour les appels : on vous le dit pendant le diagnostic.",
    faq: [
      {
        q: "L'agent peut-il conseiller un patient ?",
        a: "Non. Il ne donne aucun avis médical. Il prend le rendez-vous, répond aux questions pratiques et oriente toute urgence vers le 15 ou le 112.",
      },
      {
        q: "Et les données de santé ?",
        a: "L'agent ne recueille que ce qu'exige la prise de rendez-vous. Le traitement est encadré par l'article 9 du RGPD, et l'hébergement est vérifié avec vous pendant le diagnostic.",
      },
      {
        q: "Les patients savent-ils qu'ils parlent à une IA ?",
        a: "Oui, dès la première phrase (article 50 du règlement européen sur l'IA). Ils peuvent demander à laisser un message au praticien à tout moment.",
      },
      {
        q: "Fonctionne-t-il avec notre agenda en ligne ?",
        a: "Avec la plupart des agendas qui exposent une interface ou une synchronisation. C'est vérifié avant tout chiffrage.",
      },
      {
        q: "Peut-il gérer plusieurs praticiens ?",
        a: "Oui. Chaque praticien a ses motifs, ses durées de séance et ses créneaux, et l'agent réserve dans le bon agenda.",
      },
      { q: "Combien ça coûte ?", a: reponsePrix() },
    ],
    ctaTitre: "Combien d'appels sont tombés sur la messagerie pendant vos séances ?",
    aLire: [
      "agent-ia-prise-de-rendez-vous",
      "agent-ia-rgpd",
      "prise-rendez-vous-en-ligne-guide",
      "ai-act-article-50-agent-vocal",
    ],
    audience: "Cabinets de santé et de bien-être",
    nomService: "Agent IA pour cabinet de santé et de bien-être",
  },
  {
    slug: "beaute",
    label: "Beauté et esthétique",
    carte: "Rendez-vous pris en pleine prestation, rappels oubliés, créneaux vides.",
    titre: "Agent IA pour salon de beauté et institut | Sitaly",
    description:
      "Un agent IA qui décroche pendant les prestations, réserve le bon soin avec la bonne personne et envoie les rappels. Installé et piloté par Sitaly.",
    h1: "Agent IA pour salon de coiffure et institut de beauté : l'agenda rempli sans lâcher les ciseaux",
    intro:
      "Un agent IA pour salon de coiffure, institut ou spa répond aux appels quand toute l'équipe est en prestation. Il identifie le soin demandé, en connaît la durée, réserve le créneau avec la bonne personne dans votre agenda et envoie la confirmation puis le rappel. Sitaly l'installe sur votre logiciel de réservation et le pilote chaque mois.",
    reperes: [
      "Diagnostic offert de 30 minutes",
      "Branché sur votre agenda",
      "Reprise humaine à tout moment",
    ],
    pertesTitre: ["Où un salon perd", "ses clientes"],
    pertes: [
      {
        t: "Les mains occupées",
        d: "Une coloration en cours, un soin du visage : personne ne peut décrocher. La cliente réserve ailleurs en ligne.",
      },
      {
        t: "Les rendez-vous oubliés",
        d: "Sans rappel, une cliente oublie. Le créneau d'une heure reste vide.",
      },
      {
        t: "Le mauvais créneau",
        d: "Un balayage réservé sur un créneau de trente minutes désorganise toute l'après-midi.",
      },
      {
        t: "Les questions de prix",
        d: "Combien coûte une coupe, un soin, un forfait : la réponse existe, mais il faut décrocher pour la donner.",
      },
    ],
    actions: [
      {
        t: "Réservation de la bonne prestation",
        d: "Il identifie le soin, applique sa durée et réserve avec la personne qui le pratique.",
      },
      {
        t: "Confirmations et rappels",
        d: "Un SMS de confirmation, un rappel la veille, un lien pour annuler. Le créneau libéré peut être repris.",
      },
      {
        t: "Tarifs et prestations",
        d: "Il répond à partir de votre carte de prestations, sans arrondir ni improviser.",
      },
      {
        t: "Acomptes",
        d: "Si vous demandez un acompte pour les prestations longues, il envoie le lien de paiement de votre prestataire.",
      },
      {
        t: "Liste d'attente",
        d: "Quand une cliente annule, il peut proposer le créneau aux personnes qui l'attendaient.",
      },
      {
        t: "Messages et avis",
        d: "Il transmet les demandes particulières à l'équipe et propose des réponses aux avis Google, que vous validez.",
      },
    ],
    cadreTitre: ["Ce que l'agent", "ne fait pas"],
    cadre: [
      {
        t: "Il ne donne pas de conseil de soin",
        d: "Contre-indications, allergies, type de peau : ces questions vont à l'esthéticienne ou au coiffeur.",
      },
      {
        t: "Il ne relance pas sans accord",
        d: "Les messages promotionnels ne partent qu'aux clientes qui ont accepté de les recevoir. Les rappels de rendez-vous, eux, accompagnent une réservation existante.",
      },
      { t: "Il ne se fait pas passer pour un humain", d: RAPPEL_AI_ACT },
    ],
    outils:
      "L'agent se branche sur votre logiciel de réservation et votre ligne téléphonique quand le logiciel le permet (API ou e-mail). Votre carte de prestations, vos durées et vos tarifs sont repris tels quels. On vérifie la compatibilité pendant le diagnostic.",
    scenarios:
      "Des scénarios réels sont joués avant la mise en service : une réservation de coloration, une cliente qui veut décaler, une question sur une allergie.",
    pourQui:
      "Salons de coiffure, instituts de beauté, spas et barbiers où toute l'équipe travaille en cabine ou au fauteuil. Si vos clientes réservent déjà presque toutes en ligne, des rappels automatiques suffisent peut-être : on vous le dit pendant le diagnostic.",
    faq: [
      {
        q: "L'agent sait-il quelle durée prévoir pour chaque soin ?",
        a: "Oui. Il applique les durées de votre carte de prestations, et chaque personne de l'équipe garde ses propres créneaux.",
      },
      {
        q: "Peut-il répondre sur une allergie ou une contre-indication ?",
        a: "Non. Ces questions sont transmises à l'équipe. L'agent ne donne aucun conseil de soin.",
      },
      {
        q: "Les clientes savent-elles qu'elles parlent à une IA ?",
        a: "Oui, dès la première phrase (article 50 du règlement européen sur l'IA). Elles peuvent demander quelqu'un du salon à tout moment.",
      },
      {
        q: "Peut-il demander un acompte ?",
        a: "Il envoie le lien de paiement de votre prestataire quand vous le décidez. Les fonds vont directement sur votre compte.",
      },
      {
        q: "Faut-il changer de logiciel de réservation ?",
        a: "Non. L'agent se branche sur votre logiciel quand il le permet. C'est vérifié pendant le diagnostic.",
      },
      { q: "Combien ça coûte ?", a: reponsePrix() },
    ],
    ctaTitre: "Combien de créneaux sont restés vides ce mois-ci ?",
    aLire: [
      "agent-ia-prise-de-rendez-vous",
      "prise-rendez-vous-en-ligne-guide",
      "automatiser-suivi-client-tpe",
      "standard-telephonique-ia",
    ],
    audience: "Salons de coiffure et instituts de beauté",
  },
  {
    slug: "automobile",
    label: "Garages et automobile",
    carte: "Appels pendant l'atelier, rendez-vous d'entretien, « ma voiture est prête ? ».",
    titre: "Agent IA pour garage automobile : atelier et RDV | Sitaly",
    description:
      "Un agent IA qui décroche quand l'atelier tourne, réserve les entretiens, répond à « ma voiture est prête ? » et relance les devis. Piloté par Sitaly.",
    h1: "Agent IA pour garage automobile : l'atelier tourne, le téléphone est décroché",
    intro:
      "Un agent IA pour garage décroche quand les mécaniciens ont les mains dans le moteur. Il réserve les rendez-vous d'entretien et de réparation selon la capacité de l'atelier, répond aux clients qui demandent où en est leur véhicule, recueille les informations utiles avant un devis et relance les devis en attente. Sitaly l'installe sur vos outils et le pilote chaque mois.",
    reperes: [
      "Diagnostic offert de 30 minutes",
      "Branché sur votre logiciel de garage",
      "Reprise humaine à tout moment",
    ],
    pertesTitre: ["Où un garage perd", "ses clients"],
    pertes: [
      {
        t: "À l'atelier",
        d: "Le chef d'atelier est sous un pont. Le client qui voulait sa révision appelle le centre auto d'à côté.",
      },
      {
        t: "« Ma voiture est prête ? »",
        d: "Ces appels interrompent l'atelier dix fois par jour, pour une information que le logiciel connaît déjà.",
      },
      {
        t: "Les devis sans réponse",
        d: "Une distribution, un embrayage : le client hésite, compare, et personne ne le rappelle.",
      },
      {
        t: "Les rendez-vous mal calibrés",
        d: "Une réparation longue posée sur un créneau court décale toute la journée.",
      },
    ],
    actions: [
      {
        t: "Rendez-vous d'atelier",
        d: "Immatriculation, kilométrage, intervention demandée. Il réserve selon la durée de l'opération et la capacité de l'atelier.",
      },
      {
        t: "Suivi du véhicule",
        d: "Il répond à « ma voiture est prête ? » à partir de l'état saisi dans votre logiciel, et prévient le client quand elle l'est.",
      },
      {
        t: "Préparation des devis",
        d: "Symptômes, voyants, photos par SMS : le réceptionnaire reçoit une demande complète.",
      },
      {
        t: "Relance des devis",
        d: "Il reprend contact avec les clients qui ont demandé un devis, répond aux questions simples et vous remonte leurs objections.",
      },
      {
        t: "Véhicule de prêt",
        d: "Il vérifie la disponibilité d'un véhicule de courtoisie et le réserve avec le rendez-vous.",
      },
      {
        t: "Transfert à l'atelier",
        d: "Panne sur la route, client mécontent, question technique : l'appel passe directement à la bonne personne.",
      },
    ],
    cadreTitre: ["Ce que l'agent", "ne fait pas"],
    cadre: [
      {
        t: "Il ne diagnostique pas de panne",
        d: "Il recueille les symptômes pour le mécanicien. Le diagnostic et le chiffrage restent ceux de l'atelier.",
      },
      {
        t: "Il ne démarche pas",
        d: "La prospection téléphonique d'un particulier sans consentement préalable est interdite depuis le 11 août 2026. Les rappels d'entretien partent par SMS aux clients qui ont accepté de les recevoir.",
      },
      { t: "Il ne se fait pas passer pour un humain", d: RAPPEL_AI_ACT },
    ],
    outils:
      "L'agent se branche sur votre logiciel de gestion de garage, votre agenda d'atelier et votre ligne téléphonique, par API ou par e-mail selon ce que vos outils permettent. On le vérifie pendant le diagnostic, avant tout chiffrage.",
    scenarios:
      "Des scénarios réels sont joués avant la mise en service : une prise de rendez-vous de révision, un client qui demande où en est son véhicule, une panne sur la route.",
    pourQui:
      "Garages indépendants, concessions, carrosseries et centres de contrôle où l'atelier ne peut pas décrocher. Si vous recevez peu d'appels, un simple SMS automatique « votre véhicule est prêt » suffit peut-être : on vous le dit pendant le diagnostic.",
    faq: [
      {
        q: "L'agent peut-il faire un devis ?",
        a: "Non. Il recueille les informations et les photos pour que le réceptionnaire chiffre vite. Le prix reste celui de l'atelier.",
      },
      {
        q: "Comment sait-il si la voiture est prête ?",
        a: "Il lit l'état du dossier dans votre logiciel de garage, quand celui-ci le permet. Sinon, il prend le message et prévient l'atelier.",
      },
      {
        q: "Peut-il envoyer des rappels d'entretien ?",
        a: "Par SMS, aux clients qui ont accepté de les recevoir. Il ne démarche pas par téléphone.",
      },
      {
        q: "Les clients savent-ils qu'ils parlent à une IA ?",
        a: "Oui, dès la première phrase (article 50 du règlement européen sur l'IA). Ils peuvent demander quelqu'un de l'atelier à tout moment.",
      },
      {
        q: "Faut-il changer de logiciel de garage ?",
        a: "Non. L'agent se branche sur vos outils quand ils le permettent. C'est vérifié pendant le diagnostic.",
      },
      { q: "Combien ça coûte ?", a: reponsePrix() },
    ],
    ctaTitre:
      "Combien de fois l'atelier a-t-il décroché pour « ma voiture est prête ? » aujourd'hui ?",
    aLire: [
      "relance-automatique-devis",
      "standard-telephonique-ia",
      "agent-ia-prise-de-rendez-vous",
      "demarchage-telephonique-agent-ia-2026",
    ],
    audience: "Garages et professionnels de l'automobile",
  },
  {
    slug: "professions-liberales",
    label: "Professions libérales",
    carte: "Premiers contacts à qualifier, rendez-vous à poser, pièces à réclamer.",
    titre: "Agent IA pour avocat et expert-comptable | Sitaly",
    description:
      "Un agent IA qui accueille les premiers contacts, qualifie la demande, pose le rendez-vous et réclame les pièces, sans jamais donner de conseil. Par Sitaly.",
    h1: "Agent IA pour professions libérales : chaque premier contact accueilli et qualifié",
    intro:
      "Un agent IA pour cabinet d'avocat, d'expertise comptable, d'architecte ou de conseil accueille les nouveaux contacts par téléphone et sur le site, identifie la nature de la demande, réserve le premier rendez-vous avec le bon associé et envoie la liste des pièces à préparer. Il ne donne aucun conseil juridique, fiscal ou technique. Sitaly l'installe et le pilote chaque mois.",
    reperes: [
      "Diagnostic offert de 30 minutes",
      "Aucun conseil donné",
      "Reprise humaine à tout moment",
    ],
    pertesTitre: ["Où un cabinet perd", "ses dossiers"],
    pertes: [
      {
        t: "En rendez-vous ou en audience",
        d: "Le nouveau client appelle au moment où personne ne peut répondre, et contacte le cabinet suivant.",
      },
      {
        t: "Les demandes hors périmètre",
        d: "Un premier rendez-vous pour une matière que le cabinet ne traite pas coûte une heure à tout le monde.",
      },
      {
        t: "Les pièces qui n'arrivent pas",
        d: "Le dossier attend un document, et personne n'a le temps de le réclamer une troisième fois.",
      },
      {
        t: "Les questions récurrentes",
        d: "Honoraires, délais, adresse, documents : le secrétariat répète, au lieu de traiter.",
      },
    ],
    actions: [
      {
        t: "Accueil des nouveaux contacts",
        d: "Il identifie la nature de la demande et son urgence, à partir des matières et des missions que vous définissez.",
      },
      {
        t: "Orientation",
        d: "Il réserve le premier rendez-vous avec l'associé ou le collaborateur compétent, ou indique poliment que le cabinet ne traite pas la demande.",
      },
      {
        t: "Pièces à préparer",
        d: "Il envoie la liste des documents utiles avant le rendez-vous, puis relance jusqu'à ce que le dossier soit complet.",
      },
      {
        t: "Questions pratiques",
        d: "Adresse, accès, modalités de rendez-vous, principe de la convention d'honoraires : il répond à partir de vos informations.",
      },
      {
        t: "Clients existants",
        d: "Il reconnaît un client en cours et transmet son message au collaborateur qui suit le dossier.",
      },
      {
        t: "Rappels",
        d: "Confirmation et rappel du rendez-vous par SMS ou par e-mail.",
      },
    ],
    cadreTitre: ["Ce que l'agent", "ne fait pas"],
    cadre: [
      {
        t: "Il ne donne aucun conseil",
        d: "Ni juridique, ni fiscal, ni technique. Il recueille ce qu'il faut pour préparer le premier rendez-vous, rien de plus.",
      },
      {
        t: "Il ne recueille que le nécessaire",
        d: "Le secret professionnel s'impose au cabinet. L'agent ne demande pas le détail d'une affaire et ne conserve que ce que vous décidez.",
      },
      { t: "Il ne se fait pas passer pour un humain", d: RAPPEL_AI_ACT },
    ],
    outils:
      "L'agent se branche sur votre agenda, votre logiciel de cabinet et votre ligne téléphonique quand ils le permettent (API, webhooks ou e-mail). On le vérifie pendant le diagnostic, avant tout chiffrage. Vous ne changez pas d'outil.",
    scenarios:
      "Des scénarios réels sont joués avant la mise en service : un nouveau client pressé, une demande hors de vos matières, un client existant qui veut joindre son avocat.",
    pourQui:
      "Cabinets d'avocats, d'expertise comptable, d'architectes, de géomètres et de conseil qui reçoivent des premiers contacts chaque semaine et n'ont pas de secrétariat disponible en permanence. Si vos nouveaux clients viennent presque tous par recommandation directe, l'agent ne se justifie peut-être pas : on vous le dit pendant le diagnostic.",
    faq: [
      {
        q: "L'agent peut-il répondre à une question juridique ou fiscale ?",
        a: "Non. Il ne donne aucun conseil. Il qualifie la demande et réserve le rendez-vous avec la bonne personne.",
      },
      {
        q: "Et le secret professionnel ?",
        a: "L'agent ne recueille que ce qu'il faut pour orienter la demande. Vous décidez de ce qui est conservé et de la durée de conservation.",
      },
      {
        q: "Peut-il vérifier les conflits d'intérêts ?",
        a: "Non. Il recueille le nom des parties si vous le souhaitez, et la vérification reste faite par le cabinet avant le rendez-vous.",
      },
      {
        q: "Les clients savent-ils qu'ils parlent à une IA ?",
        a: "Oui, dès la première phrase (article 50 du règlement européen sur l'IA). Ils peuvent demander à laisser un message à tout moment.",
      },
      {
        q: "Faut-il changer de logiciel de cabinet ?",
        a: "Non. L'agent se branche sur vos outils quand ils le permettent. C'est vérifié pendant le diagnostic.",
      },
      { q: "Combien ça coûte ?", a: reponsePrix() },
    ],
    ctaTitre: "Combien de premiers contacts ont laissé un message sans rappel ?",
    aLire: [
      "standard-telephonique-ia",
      "agence-agents-ia-questions",
      "agent-ia-rgpd",
      "agent-ia-prise-de-rendez-vous",
    ],
    audience: "Professions libérales",
    nomService: "Agent IA pour cabinet d'avocat, d'expertise comptable et de conseil",
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
