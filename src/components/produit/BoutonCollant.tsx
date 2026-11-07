import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Le bouton d'une page produit qui descend avec le visiteur (7 novembre 2026) :
 * caché sur le premier écran, où le bouton du titre suffit, puis figé en bas
 * de l'écran. Il se pose au-dessus du bandeau des cookies tant que celui-ci est
 * affiché (variable --bandeau-cookies, voir CookieConsent).
 */
export function BoutonCollant({ libelle, href }: { libelle: string; href: string }) {
  const [montre, setMontre] = useState(false);
  useEffect(() => {
    const maj = () => setMontre(window.scrollY > 500);
    maj();
    window.addEventListener("scroll", maj, { passive: true });
    return () => window.removeEventListener("scroll", maj);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 z-40 flex justify-center px-3 transition-all duration-500 ${montre ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      style={{ bottom: "calc(var(--bandeau-cookies, 0px) + 1rem)" }}
      aria-hidden={!montre}
    >
      <a
        href={href}
        tabIndex={montre ? 0 : -1}
        className="inline-flex min-h-12 w-full max-w-sm items-center justify-center gap-2 rounded-full bg-black/90 px-6 text-base font-medium text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] backdrop-blur hover:bg-black"
      >
        {libelle} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
