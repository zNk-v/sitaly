import type { BlogSection } from "@/data/blog-posts";

/**
 * Charge le corps d'un article à la demande. Vite fait de chaque fichier de
 * ce dossier un morceau à part : la page d'un article ne télécharge que le
 * sien, et les autres pages aucun.
 *
 * Nouvel article : ses métadonnées dans blog-posts.ts (ou
 * blog-posts-agents-ia.ts), son corps dans un fichier `<slug>.ts` ici, qui
 * exporte `contenu`.
 */
const CORPS = import.meta.glob<{ contenu: BlogSection[] }>(["./*.ts", "!./charger.ts"]);

export async function chargerContenu(slug: string): Promise<BlogSection[] | undefined> {
  const charger = CORPS[`./${slug}.ts`];
  if (!charger) return undefined;
  return (await charger()).contenu;
}
