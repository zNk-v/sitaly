// Lien de prise de rendez-vous (Calendly) utilisé par tous les CTA "Parler de votre projet".
export const CALENDLY_URL = "https://calendly.com/contact-sitaly/decouverte-de-votre-projet-web";

// URL de l'application SaaS (espace client artisans).
export const APP_URL = "https://app.sitaly.fr";

// Téléphone Sitaly : format E.164 pour les liens tel:/sms:, format lisible pour l'affichage.
export const SITALY_PHONE = "+33658683372";
export const SITALY_PHONE_DISPLAY = "06 58 68 33 72";

export const SITALY_EMAIL = "contact@sitaly.fr";

/**
 * Ancrage géographique, au niveau de la ville seulement. Sitaly n'a pas de
 * local à recevoir du public : l'adresse complète reste dans les mentions
 * légales. La ville suffit à relier l'entreprise à son registre (Pappers,
 * Annuaire des entreprises) et à dire aux PME d'Île-de-France que le
 * prestataire est proche.
 */
export const SITALY_VILLE = "Brétigny-sur-Orge";
export const SITALY_CODE_POSTAL = "91220";
export const SITALY_DEPARTEMENT = "Essonne";

/**
 * Fiche d'établissement Google de Sitaly, par son identifiant Maps (cid).
 * Le cid ne change pas quand le nom, la catégorie ou la description changent.
 */
export const FICHE_GOOGLE_URL = "https://maps.google.com/?cid=13829169604349736835";

/**
 * Prix plancher des agents IA.
 *
 * DESIGN.md §8 a retiré les prix des pages commerciales le 2 septembre 2026.
 * L'audit SEO/GEO du 25 septembre recommande d'afficher un prix plancher sur
 * les pages Agents IA : c'est ce que les assistants IA reprennent quand on
 * leur demande combien coûte un agent IA. La décision revient au client ; cet
 * interrupteur l'applique partout d'un coup (FAQ, pages sectorielles,
 * données structurées), sans qu'aucun montant ne reste ailleurs dans le code.
 */
export const PRIX_AGENTS_IA = {
  afficher: false,
  miseEnPlaceMin: 1500,
  mensuelMin: 900,
} as const;

/**
 * Prix de la gestion ChatGPT Ads : un forfait mensuel plus une part du budget
 * publicitaire, ce budget restant payé à part (décision du 28 septembre 2026,
 * DESIGN.md §8).
 *
 * La page /chatgpt-ads/ est un fichier statique de public/ : elle n'importe
 * pas ce module. Ses montants sont recopiés à la main, et doivent suivre
 * toute modification faite ici (public/chatgpt-ads/index.html, en-tête).
 * `afficher: false` retire aussi la grille Sitaly de l'article
 * /blog/cout-chatgpt-ads/ ; les données de marché y restent.
 */
export const PRIX_CHATGPT_ADS = {
  afficher: true,
  mensuelMin: 890,
  partBudget: 10,
} as const;

/**
 * Relais de formulaires (Worker Cloudflare `sitaly-forms`, dépôt ~/sitaly-forms).
 * Vide tant que l'URL du Worker n'est pas renseignée : les formulaires gardent
 * alors leur comportement d'avant (message pré-rempli dans la messagerie).
 */
export const FORM_ENDPOINT = "https://sitaly-forms.sitaly-forms.workers.dev";
