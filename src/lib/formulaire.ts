import { FORM_ENDPOINT } from "@/lib/config";
import { suivreEvenement } from "@/lib/mesure";

/**
 * Envoi des formulaires au relais `sitaly-forms` (Worker Cloudflare, dépôt
 * ~/sitaly-forms), qui transmet la demande par e-mail via Brevo.
 *
 * Trois issues :
 * - `envoye` : le relais a accepté la demande, l'événement GA4 part ;
 * - `indisponible` : aucun relais configuré, le formulaire garde son
 *   comportement d'avant (message pré-rempli dans la messagerie) ;
 * - `erreur` : le relais a refusé ou n'a pas répondu, le formulaire propose
 *   le téléphone et la messagerie plutôt que de perdre la demande.
 *
 * Le champ `website` est le pot de miel attendu par le relais : il reste vide
 * pour un humain.
 */
export type ResultatEnvoi = "envoye" | "indisponible" | "erreur";

export async function envoyerDemande(
  champs: Record<string, string>,
  formId: string,
): Promise<ResultatEnvoi> {
  if (!FORM_ENDPOINT) return "indisponible";
  try {
    const reponse = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(champs),
    });
    if (!reponse.ok) return "erreur";
    suivreEvenement("generate_lead", { form_id: formId });
    return "envoye";
  } catch {
    return "erreur";
  }
}
