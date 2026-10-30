import type { CSSProperties } from "react";
import type { Logo } from "@/data/premium";

const POLICES: Record<Logo["police"], string> = {
  display: "var(--font-display)",
  sans: "var(--font-sans)",
  serif: "var(--font-accent)",
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
};

/** Les variables du logotype en lettres, lues par la classe `.logo-marque`. */
export function styleLogo(l: Logo): CSSProperties {
  return {
    "--logo-police": POLICES[l.police],
    "--logo-graisse": l.graisse,
    "--logo-style": l.police === "serif" ? "italic" : "normal",
    "--logo-casse":
      l.casse === "capitales" ? "uppercase" : l.casse === "minuscules" ? "lowercase" : "none",
    "--logo-approche": `${l.approche}em`,
  } as CSSProperties;
}
