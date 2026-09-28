import { Link } from "@tanstack/react-router";
import { LIEN_DANS_LE_TEXTE } from "@/lib/liens-texte";

/**
 * Pages servies depuis public/, hors du routeur : un `Link` les chercherait
 * dans le routeur et tomberait sur la page introuvable.
 */
const PAGES_STATIQUES = ["/chatgpt-ads", "/agents-ia/chatgpt"];

const CLASSE_PAR_DEFAUT =
  "font-medium text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent";

/**
 * Un texte dont les liens `[ancre](/chemin/)` deviennent cliquables. Les pages
 * du routeur passent par `Link`, les pages statiques et les adresses externes
 * par un lien classique.
 */
export function TexteAvecLiens({
  texte,
  classeLien = CLASSE_PAR_DEFAUT,
}: {
  texte: string;
  classeLien?: string;
}) {
  const morceaux: React.ReactNode[] = [];
  let depuis = 0;
  for (const m of texte.matchAll(LIEN_DANS_LE_TEXTE)) {
    const [tout, ancre, href] = m;
    const debut = m.index ?? 0;
    if (debut > depuis) morceaux.push(texte.slice(depuis, debut));
    const statique = PAGES_STATIQUES.some((p) => href.startsWith(p)) || !href.startsWith("/");
    // L'ancre de page passe à part : dans `to`, le routeur la traiterait
    // comme un segment de chemin et lui ajouterait un slash final.
    const [chemin, ancreDePage] = href.split("#");
    morceaux.push(
      statique ? (
        <a key={debut} href={href} className={classeLien}>
          {ancre}
        </a>
      ) : (
        <Link key={debut} to={chemin} hash={ancreDePage} className={classeLien}>
          {ancre}
        </Link>
      ),
    );
    depuis = debut + tout.length;
  }
  if (depuis < texte.length) morceaux.push(texte.slice(depuis));
  return <>{morceaux}</>;
}
