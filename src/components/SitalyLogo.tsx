import logoForme from "@/assets/sitaly-logo.png";

/**
 * Logo Sitaly : double chevron et nom.
 *
 * L'image ne sert plus que de forme. C'était un PNG en dur, avec ses propres
 * violets, qui ne pouvait donc pas suivre la palette : le site a changé de
 * couleurs plusieurs fois autour d'un logo resté figé. Son canal alpha porte
 * la forme — 55 % de l'image est transparente — il sert donc de masque, et la
 * couleur vient d'une peinture posée derrière.
 *
 * Trois peintures. Le violet des mots accentués du hero par défaut, le dégradé
 * porteur, et le blanc pour les fonds sombres — ce dernier remplace le second
 * fichier PNG.
 *
 * Le violet plutôt que le dégradé : le logo fait une centaine de pixels de
 * large dans le bandeau, et le balayage bleu-rouge s'y comprime au point que
 * « aly » vire au rouge. Le dégradé reste là où il a la place de se déployer,
 * le ruban et les boutons.
 *
 * Repli : sans `mask-image`, l'image d'origine est affichée telle quelle. Le
 * logo perd sa nouvelle couleur mais reste un logo.
 */
const PEINTURES = {
  degrade: "var(--gradient-ruban)",
  violet: "var(--violet-ink)",
  blanc: "#fff",
} as const;

export function SitalyLogo({
  className = "",
  variant = "violet",
}: {
  className?: string;
  /** `blanc` pour les fonds sombres. */
  variant?: keyof typeof PEINTURES | "couleur";
}) {
  const peinture = PEINTURES[variant === "couleur" ? "degrade" : variant];
  return (
    <span
      role="img"
      aria-label="Sitaly"
      className={`logo-sitaly h-6 w-auto sm:h-7 ${className}`}
      style={
        {
          "--logo-forme": `url(${logoForme})`,
          "--logo-peinture": peinture,
        } as React.CSSProperties
      }
    />
  );
}
