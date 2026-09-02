import type { ReactNode } from "react";

/**
 * En-tête de section, ancré à gauche, avec sa colonne de repères.
 *
 * La colonne porte le numéro de section en chiffres tabulaires, un filet et un
 * libellé court en capitales espacées. Elle passe à l'horizontale sous `sm`,
 * où la place manque pour une colonne. Voir DESIGN.md §5.
 *
 * `title` accepte un noeud pour permettre la bascule d'un fragment en serif
 * italique via la classe `accent-word` (DESIGN.md §4).
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  subtitle,
  tone = "paper",
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: "paper" | "ink";
  align?: "left" | "center";
}) {
  const dim = tone === "ink" ? "text-white/60" : "text-muted-foreground";
  const mark = tone === "ink" ? "text-brand" : "text-brand-ink";

  if (align === "center") {
    return (
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <div className={`rail-label ${mark}`}>{eyebrow}</div>
        <h2 className="display-section mt-3">{title}</h2>
        {subtitle && <p className={`mt-5 text-lg ${dim}`}>{subtitle}</p>}
      </div>
    );
  }

  return (
    <div data-reveal className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-10 lg:gap-14">
      <div className={`flex items-center gap-3 sm:flex-col sm:items-start sm:gap-4 ${mark}`}>
        {index && <span className="rail-num text-sm font-bold">{index}</span>}
        <span className="rail-line h-px w-10 shrink-0 sm:h-14 sm:w-px" aria-hidden="true" />
        <span className={`rail-label ${dim}`}>{eyebrow}</span>
      </div>
      <div>
        <h2 className="display-section">{title}</h2>
        {subtitle && <p className={`measure mt-5 text-lg ${dim}`}>{subtitle}</p>}
      </div>
    </div>
  );
}
