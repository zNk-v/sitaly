import { reponsePrix, type Secteur } from "@/data/secteurs";

/**
 * La page /agents-ia/agent-vocal/, ouverte le 28 septembre 2026 (plan SEO
 * d'octobre, annexe F6).
 *
 * Même gabarit que les pages secteurs (SecteurLanding) : le visiteur qui
 * cherche « agent vocal IA » ou « standard téléphonique IA » arrive sur une
 * page qui lui parle d'un usage, puis le maillage l'envoie vers son métier.
 * Elle reste hors de SECTEURS, qui alimente les cartes « Vos secteurs ».
 *
 * Règle de preuve : aucun chiffre. Les dates sont celles des textes.
 */
export const AGENT_VOCAL: Secteur = {
  offres: ["agent-ia-pro"],
  slug: "agent-vocal",
  label: "Agent vocal",
  carte: "Accueil téléphonique, qualification et rendez-vous, à toute heure.",
  titre: "Agent vocal IA pour PME : accueil téléphonique | Sitaly",
  description:
    "Un agent vocal IA qui décroche, se présente comme une IA, qualifie la demande et propose un rendez-vous. Mis en place et piloté par Sitaly.",
  h1: "Agent vocal IA pour PME",
  intro:
    "Un agent vocal IA décroche votre ligne quand votre équipe ne peut pas le faire. Il se présente comme une IA, comprend la demande, pose les questions utiles, propose un rendez-vous dans votre agenda ou transfère l'appel selon vos règles. Sitaly l'installe, le connecte à vos outils et le pilote chaque mois. Vous gardez la main sur les règles et sur chaque appel.",
  reperes: [
    "Diagnostic offert de 30 minutes",
    "Branché sur vos outils",
    "Reprise humaine à tout moment",
  ],
  pertesTitre: ["Où se perdent", "vos appels"],
  pertes: [
    {
      t: "Pendant les rendez-vous",
      d: "La personne qui décroche d'habitude est en réunion, en visite ou sur un chantier. L'appel tombe sur la messagerie. Sans message, vous ne saurez pas ce que voulait l'appelant.",
    },
    {
      t: "Le soir et le samedi",
      d: "Les demandes arrivent aussi après la fermeture. Le lendemain, l'appelant a parfois trouvé quelqu'un d'autre.",
    },
    {
      t: "Aux heures de pointe",
      d: "Deux appels en même temps : le second sonne dans le vide.",
    },
    {
      t: "Entre l'appel et le rappel",
      d: "Un message vocal à réécouter, un numéro mal noté, un rappel qui part trop tard : la demande se perd avant d'arriver à la bonne personne.",
    },
  ],
  actions: [
    {
      t: "Décroché et annonce",
      d: "Il décroche tout de suite ou après le délai que vous fixez, annonce votre entreprise et se présente comme une IA dès sa première phrase.",
    },
    {
      t: "Compréhension de la demande",
      d: "L'appelant parle normalement. L'agent identifie le motif : nouvelle demande, client existant, fournisseur, urgence.",
    },
    {
      t: "Réponses aux questions courantes",
      d: "Horaires, zones d'intervention, services, pièces à fournir : il répond à partir des informations que vous lui donnez, et seulement de celles-là.",
    },
    {
      t: "Qualification",
      d: "Trois à cinq questions choisies avec vous, selon votre métier. La personne qui rappelle reçoit une fiche qui se lit en quelques secondes.",
    },
    {
      t: "Prise de rendez-vous",
      d: "Il propose un créneau libre dans l'agenda de la bonne personne, le confirme, puis envoie un rappel par SMS.",
    },
    {
      t: "Transfert ou message",
      d: "Il transfère l'appel selon vos règles. Si personne n'est libre, il prend un message complet et l'envoie par SMS ou par e-mail.",
    },
  ],
  cadreTitre: ["Ce que l'agent", "ne fait pas"],
  cadre: [
    {
      t: "Se faire passer pour un humain",
      d: "Depuis le 2 août 2026, l'article 50 du règlement européen sur l'IA impose d'informer la personne qu'elle échange avec une IA. L'agent le dit dès sa première phrase, et l'appelant peut demander un humain à tout moment.",
    },
    {
      t: "Démarcher à froid",
      d: "Depuis le 11 août 2026, appeler un particulier sans son consentement préalable est interdit (loi du 30 juin 2025). L'agent traite les appels entrants et rappelle les personnes qui l'ont demandé ou vos clients.",
    },
    {
      t: "Conseiller à votre place",
      d: "Ni avis de valeur sur un bien, ni conseil en crédit ou en assurance, ni chiffrage de travaux. Il prépare le travail de votre équipe.",
    },
    {
      t: "Improviser",
      d: "S'il ne comprend pas, il reformule une fois, puis passe la main à votre équipe avec le résumé de l'échange.",
    },
  ],
  outils:
    "L'agent s'appuie sur des outils nommés : Vapi pour la voix, Twilio pour les appels et les SMS, Cal.com pour les rendez-vous, n8n pour les automatisations, Claude d'Anthropic comme modèle de langage, Supabase pour les données. Il se branche sur votre agenda et votre CRM quand ils exposent une API ou des webhooks, et passe par l'e-mail sinon. Votre numéro peut rester le même : un renvoi d'appel, réglé chez votre opérateur, envoie les appels vers l'agent en permanence, quand personne ne décroche, ou hors horaires. Chaque connexion est vérifiée pendant le diagnostic.",
  scenarios:
    "Script d'accueil, questions de qualification et règles de transfert écrits avec vous, puis testés sur vos vrais motifs d'appel avant la mise en service.",
  pourQui:
    "Les PME et TPE structurées qui reçoivent plus d'appels qu'elles ne peuvent en prendre : en priorité les agences immobilières, les courtiers en crédit et en assurance et les entreprises du bâtiment. L'approche reste ouverte aux autres secteurs.",
  faq: [
    {
      q: "L'appelant sait-il qu'il parle à une IA ?",
      a: "Oui, dès la première phrase. Depuis le 2 août 2026, l'article 50 du règlement européen sur l'IA l'impose. L'appelant peut demander un humain à tout moment.",
    },
    {
      q: "Que se passe-t-il quand l'agent ne comprend pas ?",
      a: "Il ne devine pas. Il reformule une fois, puis passe la main à votre équipe avec le résumé de l'échange. Ces appels sont relus pendant le pilotage pour corriger les règles.",
    },
    {
      q: "Faut-il changer de numéro ?",
      a: "En règle générale, non : un renvoi d'appel réglé chez votre opérateur envoie les appels vers l'agent, en permanence ou seulement quand personne ne décroche. C'est vérifié pendant le diagnostic.",
    },
    { q: "Combien coûte un agent vocal IA ?", a: reponsePrix() },
  ],
  ctaTitre: "Qui décroche quand vous êtes en rendez-vous ?",
  aLire: [
    "standard-telephonique-ia",
    "agent-ia-prise-de-rendez-vous",
    "ai-act-article-50-agent-vocal",
    "agent-ia-rgpd",
  ],
  audience: "PME et TPE",
  nomService: "Agent vocal IA",
  maillageTitre: ["L'agent vocal", "par secteur"],
};
