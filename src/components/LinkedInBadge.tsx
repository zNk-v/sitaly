import { Linkedin } from "lucide-react";

export const LINKEDIN_URL = "https://www.linkedin.com/in/vidalozzi";

/**
 * Pastille LinkedIn des pieds de page. `tone` suit le fond : "dark" sur le
 * pied violet de l'accueil, "light" sur les pieds clairs (articles, pages
 * légales). Les deux jeux de classes sont écrits en entier — Tailwind ne
 * compile que les classes littérales présentes dans les sources.
 */
export function LinkedInBadge({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const ring =
    tone === "dark"
      ? "border-white/20 text-primary-foreground/80 hover:border-white/50 hover:text-primary-foreground"
      : "border-border text-muted-foreground hover:border-accent hover:text-accent";
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Sitaly sur LinkedIn"
      title="Sitaly sur LinkedIn"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${ring} ${className}`}
    >
      <Linkedin className="h-[18px] w-[18px]" />
    </a>
  );
}
