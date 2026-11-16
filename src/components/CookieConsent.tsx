import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { activerPixelTiktok, couperPixelTiktok } from "@/lib/pixel-tiktok";

// « _2 » depuis le pixel TikTok (8 novembre 2026) : un accord donné avant ne couvrait pas la publicité.
const STORAGE_KEY = "sitaly_cookie_consent_2";

type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function updateGtagConsent(value: Consent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Ensure gtag exists even if the GA snippet hasn't run yet
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  window.gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

/** État du consentement, partagé par la bannière flottante et le bandeau de /carte. */
export function useCookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
      if (stored === "granted" || stored === "denied") {
        updateGtagConsent(stored);
        if (stored === "granted") activerPixelTiktok();
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handle = (value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    updateGtagConsent(value);
    if (value === "granted") activerPixelTiktok();
    else couperPixelTiktok();
    setVisible(false);
  };

  return { visible, handle };
}

/**
 * Version compacte, posée dans le flux en tête de /carte. La bannière flottante
 * y recouvrait les deux boutons d'appel, sur un écran que chaque visiteur voit
 * pour la première fois : elle s'affichait donc à tous les coups.
 */
export function CookieConsentBandeau() {
  const { visible, handle } = useCookieConsent();
  if (!visible) return null;
  return (
    <div
      role="region"
      aria-label="Consentement aux cookies"
      className="border-b border-border bg-card px-4 py-2.5"
    >
      <div className="mx-auto flex max-w-md items-center gap-3 text-sm text-muted-foreground sm:text-xs">
        <p className="flex-1 leading-snug">
          Audience (Google Analytics) et publicité (TikTok).{" "}
          <Link to="/politique-confidentialite/" className="underline">
            En savoir plus
          </Link>
        </p>
        <button
          type="button"
          onClick={() => handle("denied")}
          className="bouton-secondaire h-11 shrink-0 px-3 text-sm sm:h-8 sm:text-xs"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => handle("granted")}
          className="bouton h-11 shrink-0 px-3 text-sm sm:h-8 sm:text-xs"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}

/**
 * Le bandeau flottant (7 novembre 2026) : une ligne fine en bas de l'écran.
 * L'ancienne carte couvrait un tiers de l'écran d'un téléphone, et la barre
 * « Créer mon site » avec. Sa hauteur passe dans --bandeau-cookies, pour que
 * les boutons collants se posent au-dessus.
 */
export function CookieConsent() {
  const { visible, handle } = useCookieConsent();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const surCarte = pathname.startsWith("/carte");
  const montre = visible && !surCarte;
  const bandeau = useRef<HTMLDivElement | null>(null);

  /**
   * `--bandeau-cookies` porte la hauteur réelle du bandeau, mesurée, et non une
   * constante.
   *
   * Elle valait 3.25rem en dur. Depuis que la phrase passe à la ligne sur
   * téléphone, le bandeau fait près du double, et tout ce qui se pose au-dessus
   * — la bulle de chat, son panneau ouvert, le bouton collant des pages produit
   * — se retrouvait par-dessus (SITA-28). Un `ResizeObserver` suit la hauteur :
   * elle change avec la largeur de l'écran et avec la langue du texte.
   */
  useEffect(() => {
    const racine = document.documentElement;
    const el = bandeau.current;
    if (!montre || !el) {
      racine.style.removeProperty("--bandeau-cookies");
      return;
    }
    const suivre = () => racine.style.setProperty("--bandeau-cookies", `${el.offsetHeight}px`);
    suivre();
    const observateur = new ResizeObserver(suivre);
    observateur.observe(el);
    return () => {
      observateur.disconnect();
      racine.style.removeProperty("--bandeau-cookies");
    };
  }, [montre]);

  // /carte porte son propre bandeau, dans le flux (voir CookieConsentBandeau).
  if (!montre) return null;

  return (
    <div
      ref={bandeau}
      role="region"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/95 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/85"
    >
      {/* Sur téléphone, la rangée passe à la ligne : le texte garde sa phrase
          entière au-dessus des deux boutons, au lieu d'être coupé par
          `truncate` dans une rangée de 36 px (SITA-28). */}
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 text-sm text-muted-foreground sm:h-9 sm:flex-nowrap sm:text-xs">
        <p className="min-w-0 basis-full sm:flex-1 sm:basis-auto sm:truncate">
          Cookies d'audience et de pub.{" "}
          <Link to="/politique-confidentialite/" className="underline hover:text-primary">
            Détails
          </Link>
        </p>
        <button
          type="button"
          onClick={() => handle("denied")}
          className="bouton-secondaire h-11 shrink-0 px-3 text-sm sm:h-8 sm:text-xs"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => handle("granted")}
          className="bouton h-11 shrink-0 px-3 text-sm sm:h-8 sm:text-xs"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
