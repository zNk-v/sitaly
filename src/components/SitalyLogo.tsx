import logoCouleur from "@/assets/sitaly-logo.png";
import logoBlanc from "@/assets/sitaly-logo-blanc.png";

/**
 * Logo Sitaly (double chevron + nom).
 * variant "blanc" pour les fonds sombres (footers en bg-primary).
 * Les dimensions intrinsèques évitent tout décalage de mise en page au chargement.
 */
export function SitalyLogo({
  className = "",
  variant = "couleur",
}: {
  className?: string;
  variant?: "couleur" | "blanc";
}) {
  return (
    <img
      src={variant === "blanc" ? logoBlanc : logoCouleur}
      alt="Sitaly"
      width={414}
      height={108}
      className={`h-8 w-auto ${className}`}
    />
  );
}
