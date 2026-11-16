/**
 * Le chat de sitaly.fr, côté navigateur (16 novembre 2026, SITA-22).
 *
 * sitaly.fr est un site prérendu publié sur GitHub Pages : il n'a pas de
 * serveur. Tout passe donc par la fonction Supabase chat-vitrine (dépôt
 * sitaly-saas), appelée en direct, comme le générateur de noms d'entreprise.
 *
 * L'identité du visiteur tient dans `sessionStorage` : l'identifiant de la
 * conversation et son jeton, rendus par le serveur à l'ouverture. Ni cookie,
 * ni `localStorage`, ni empreinte publicitaire. L'onglet fermé, la
 * conversation n'est plus rattachée au navigateur ; elle survit côté serveur
 * pour que Ted puisse répondre par e-mail.
 */
import { CHAT_VITRINE_URL } from "@/lib/config";

const CLE = "sitaly_chat";

export type Message = { id: number; auteur: "visiteur" | "ia" | "ted"; texte: string; le: string };
export type Envoi = { reponse: string; sait: boolean; hors_sujet: boolean; proposer_ted: boolean };
/** Un code que la bulle sait traduire en phrase : plafond atteint, ou panne. */
export type CodeChat = "LIMITE" | "CLOSE" | "PANNE";

export class ErreurChat extends Error {
  constructor(readonly code: CodeChat) {
    super(code);
  }
}

type Identite = { id: string; jeton: string };

function lireIdentite(): Identite | null {
  try {
    const brut = sessionStorage.getItem(CLE);
    if (!brut) return null;
    const lu = JSON.parse(brut) as Partial<Identite>;
    return lu.id && lu.jeton ? { id: lu.id, jeton: lu.jeton } : null;
  } catch {
    return null;
  }
}

function garderIdentite(identite: Identite): void {
  try {
    sessionStorage.setItem(CLE, JSON.stringify(identite));
  } catch {
    // Navigation privée ou stockage refusé : la conversation marche quand même,
    // elle ne survivra pas à un rechargement de page.
  }
}

async function appeler<T>(corps: Record<string, unknown>): Promise<T> {
  const r = await fetch(CHAT_VITRINE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corps),
  }).catch(() => null);
  if (!r) throw new ErreurChat("PANNE");
  const lu = (await r.json().catch(() => null)) as Record<string, unknown> | null;
  if (!r.ok) {
    const code = String(lu?.code ?? "");
    throw new ErreurChat(code === "LIMITE" || code === "CLOSE" ? code : "PANNE");
  }
  return lu as T;
}

/** La conversation du visiteur, ouverte à sa première question seulement. */
let enCours: Promise<Identite> | null = null;

async function identite(chemin: string): Promise<Identite> {
  const gardee = lireIdentite();
  if (gardee) return gardee;
  // Une seule ouverture, même si deux envois partent en même temps.
  enCours ??= appeler<Identite>({ action: "ouvrir", chemin }).then((lu) => {
    garderIdentite(lu);
    return lu;
  });
  try {
    return await enCours;
  } catch (e) {
    enCours = null;
    throw e;
  }
}

export async function envoyer(texte: string, chemin: string): Promise<Envoi> {
  const { id, jeton } = await identite(chemin);
  return await appeler<Envoi>({ action: "envoyer", id, jeton, texte });
}

/** Les messages arrivés depuis le dernier vu : c'est ainsi que la réponse de Ted s'affiche. */
export async function suivre(apres: number): Promise<{ messages: Message[]; statut: string }> {
  const gardee = lireIdentite();
  if (!gardee) return { messages: [], statut: "ia" };
  return await appeler({ action: "suivre", ...gardee, apres });
}

export async function parlerATed(): Promise<void> {
  const gardee = lireIdentite();
  if (!gardee) throw new ErreurChat("PANNE");
  await appeler({ action: "ted", ...gardee });
}

export async function laisserEmail(email: string): Promise<void> {
  const gardee = lireIdentite();
  if (!gardee) throw new ErreurChat("PANNE");
  await appeler({ action: "email", ...gardee, email });
}

export const conversationOuverte = (): boolean => lireIdentite() !== null;
