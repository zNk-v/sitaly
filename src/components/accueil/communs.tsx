import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { AVIS_GOOGLE, NOTE_GOOGLE } from "@/data/avis-google";

/**
 * Pièces partagées par les sections de l'accueil (refonte du 5 octobre 2026,
 * DESIGN.md §11).
 */

/** Pastille de contexte au-dessus d'un titre ou d'un chiffre. */
export function Pastille({
  icone: Icone,
  children,
  className = "",
}: {
  icone?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[13px] font-medium text-muted-foreground ${className}`}
    >
      {Icone && <Icone className="h-3.5 w-3.5 shrink-0" />}
      {children}
    </span>
  );
}

/** Le « G » de Google, dans ses quatre couleurs : c'est lui qui dit « avis
    Google » avant qu'on ait lu le mot. */
export function LogoGoogle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

/** Cinq étoiles, dans le jaune de Google. */
export function Etoiles({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-[#FBBC04]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

/** La ligne de preuve : logo, étoiles, note et nombre d'avis réels. */
export function NoteGoogle({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-sm ${className}`}>
      <LogoGoogle />
      <Etoiles className="h-3.5 w-3.5" />
      <span className="opacity-60">|</span>
      <span>
        <strong className="font-semibold">{NOTE_GOOGLE.note}/5</strong> · {AVIS_GOOGLE.length} avis
        Google
      </span>
    </span>
  );
}

/**
 * Un nombre qui compte jusqu'à sa valeur quand il entre à l'écran.
 *
 * Le rendu serveur porte la valeur finale : sans script, ou pour un moteur,
 * le chiffre est juste. Le compteur ne repart de zéro que s'il est encore
 * sous la fenêtre au chargement, sans quoi on verrait le chiffre clignoter.
 */
export function Compteur({
  valeur,
  decimales = 0,
  className,
}: {
  valeur: number;
  decimales?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const formater = (n: number) => n.toFixed(decimales).replace(".", ",");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const fmt = (n: number) => n.toFixed(decimales).replace(".", ",");
    el.textContent = fmt(0);
    const obs = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        obs.disconnect();
        const depart = performance.now();
        const duree = 1400;
        const pas = (t: number) => {
          const k = Math.min(1, (t - depart) / duree);
          el.textContent = fmt(valeur * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(pas);
        };
        requestAnimationFrame(pas);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [valeur, decimales]);

  return (
    <span ref={ref} className={className}>
      {formater(valeur)}
    </span>
  );
}

/** Lien « Découvrir le service » : le libellé, puis une flèche dans un rond. */
export function FlecheRonde() {
  return (
    <span className="lien-service-rond">
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}
