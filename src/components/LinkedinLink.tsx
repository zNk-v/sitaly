import { Linkedin } from "lucide-react";

export const LINKEDIN_URL = "https://www.linkedin.com/in/vidalozzi";

/**
 * Logo LinkedIn cliquable (profil Teddy Vidal).
 * variant "clair" pour les fonds sombres (footer en bg-primary).
 */
export function LinkedinLink({
  className = "",
  variant = "sombre",
}: {
  className?: string;
  variant?: "sombre" | "clair";
}) {
  const couleurs =
    variant === "clair"
      ? "border-white/20 text-primary-foreground/80 hover:border-white/50 hover:text-primary-foreground"
      : "border-border text-muted-foreground hover:border-accent hover:text-accent";

  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Sitaly sur LinkedIn"
      title="Sitaly sur LinkedIn"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${couleurs} ${className}`}
    >
      <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
    </a>
  );
}
