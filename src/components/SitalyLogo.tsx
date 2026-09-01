import { ChevronsRight } from "lucide-react";

/* Logo Sitaly — double chevron + nom dans la typographie du hero (font-display, dégradé). */
export function SitalyLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-1 ${className}`}>
      <ChevronsRight className="h-7 w-7 text-accent" strokeWidth={3} aria-hidden />
      <span className="font-display text-2xl font-extrabold tracking-tight gradient-text">
        Sitaly
      </span>
    </span>
  );
}
