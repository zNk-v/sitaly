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
 * Relais de formulaires (Worker Cloudflare `sitaly-forms`, dépôt ~/sitaly-forms).
 * Vide tant que l'URL du Worker n'est pas renseignée : les formulaires gardent
 * alors leur comportement d'avant (message pré-rempli dans la messagerie).
 */
export const FORM_ENDPOINT = "";
