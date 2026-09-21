import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

const STORAGE_KEY = "sitaly_cookie_consent";

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
      <div className="mx-auto flex max-w-md items-center gap-3 text-xs text-muted-foreground">
        <p className="flex-1 leading-snug">
          Mesure d'audience (Google Analytics).{" "}
          <Link to="/politique-confidentialite/" className="underline">
            En savoir plus
          </Link>
        </p>
        <button
          type="button"
          onClick={() => handle("denied")}
          className="bouton-secondaire h-8 shrink-0 px-3 text-xs"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => handle("granted")}
          className="bouton h-8 shrink-0 px-3 text-xs"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}

export function CookieConsent() {
  const { visible, handle } = useCookieConsent();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // /carte porte son propre bandeau, dans le flux (voir CookieConsentBandeau).
  if (pathname.startsWith("/carte")) return null;
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-foreground">
            <p className="font-semibold">Cookies & mesure d'audience</p>
            <p className="mt-1 text-muted-foreground">
              Nous utilisons des cookies pour analyser l'audience du site (Google Analytics). Vous
              pouvez accepter ou refuser. Voir notre{" "}
              <Link to="/politique-confidentialite/" className="underline hover:text-primary">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => handle("denied")}
              className="bouton-secondaire h-11 px-5 text-sm"
            >
              Refuser
            </button>
            <button
              type="button"
              onClick={() => handle("granted")}
              className="bouton h-11 px-5 text-sm"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
