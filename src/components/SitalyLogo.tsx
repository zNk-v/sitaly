import logoCouleur from "@/assets/sitaly-logo.svg";
import logoBlanc from "@/assets/sitaly-logo-blanc.svg";

/**
 * Logo Sitaly : double chevron et nom, refait en vecteur sur la DA 2026.
 *
 * Le chevron porte la triade bleu → violet → rouge, interpolée dans oklch
 * comme le reste du site. Le nom est en Plus Jakarta Sans 800 vectorisée, à
 * la chasse du mot du hero : il ne dépend d'aucune police chargée.
 *
 * Deux fichiers plutôt qu'un masque peint : le masque ne donnait qu'une
 * couleur à tout le logo, or le chevron garde son dégradé et le nom reste à
 * l'encre. Sur fond sombre, `blanc` passe le nom en blanc et le chevron sur
 * les teintes `*-on-ink`.
 *
 * Le kit complet et son générateur : `public/brand/`, `scripts/generate-brand.py`.
 */
const FICHIERS = {
  couleur: logoCouleur,
  blanc: logoBlanc,
} as const;

export function SitalyLogo({
  className = "",
  variant = "couleur",
}: {
  className?: string;
  /** `blanc` pour les fonds sombres. */
  variant?: keyof typeof FICHIERS;
}) {
  return (
    <img
      src={FICHIERS[variant]}
      alt="Sitaly"
      width={398}
      height={108}
      className={`block h-6 w-auto sm:h-7 ${className}`}
    />
  );
}
