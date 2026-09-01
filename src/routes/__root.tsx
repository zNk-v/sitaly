import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CookieConsent } from "../components/CookieConsent";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sitaly | Sites web, Google Ads et automatisation pour générer plus de clients" },
      { name: "description", content: "Sitaly aide les artisans, indépendants et PME à obtenir plus de clients grâce à des sites internet performants, Google Ads et des automatisations simples. Développez votre activité avec un système conçu pour générer des appels et des demandes de devis." },
      { property: "og:title", content: "Sitaly | Sites web, Google Ads et automatisation pour générer plus de clients" },
      { property: "og:description", content: "Sitaly aide les artisans, indépendants et PME à obtenir plus de clients grâce à des sites internet performants, Google Ads et des automatisations simples. Développez votre activité avec un système conçu pour générer des appels et des demandes de devis." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sitaly" },
      { property: "og:url", content: "https://sitaly.fr" },
      { property: "og:image", content: "https://sitaly.fr/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Sitaly — sites internet pour artisans et TPE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sitaly.fr/og-image.png" },
      { name: "google-site-verification", content: "Yk4vxjL9oYYQ2TOB095PmXc-hZfT_4g5AzHSIllMfSA" },
      { name: "google-site-verification", content: "zZ06krdPwgDK34kIDMFiPjqh3Sbpf8U1pEPxbTTiSag" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-H4Z6HZLE3S",
        async: true,
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500,
          });
          gtag('js', new Date());
          gtag('config', 'G-H4Z6HZLE3S', { anonymize_ip: true });
        `,
      },
      {
        // Google Tag Manager — chargé après le Consent Mode ci-dessus
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5LZDMNC5');`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "@id": "https://sitaly.fr/#business",
              name: "Sitaly",
              url: "https://sitaly.fr",
              image: "https://sitaly.fr/og-image.png",
              description:
                "Sitaly crée des sites internet professionnels pour artisans et TPE en Essonne et en Île-de-France. Site sur mesure livré en 48h, en location à partir de 149€/mois tout inclus (hébergement, maintenance, modifications), sans engagement et sans frais d'installation.",
              telephone: "+33658683372",
              email: "contact@sitaly.fr",
              priceRange: "€€",
              currenciesAccepted: "EUR",
              identifier: { "@type": "PropertyValue", propertyID: "SIRET", value: "83384883100032" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Brétigny-sur-Orge",
                postalCode: "91220",
                addressRegion: "Île-de-France",
                addressCountry: "FR",
              },
              areaServed: [
                { "@type": "City", name: "Brétigny-sur-Orge" },
                { "@type": "AdministrativeArea", name: "Essonne" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
                { "@type": "Country", name: "France" },
              ],
              knowsLanguage: "fr",
              makesOffer: [
                {
                  "@type": "Offer",
                  name: "Sitaly Présence",
                  description:
                    "Site internet professionnel sur mesure livré en 48h, avec hébergement, maintenance, modifications, fiche Google Business et référencement local inclus. En location, sans engagement et sans frais d'installation.",
                  price: "149",
                  priceCurrency: "EUR",
                  category: "Site internet avec maintenance",
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "149",
                    priceCurrency: "EUR",
                    unitCode: "MON",
                  },
                },
                {
                  "@type": "Offer",
                  name: "Sitaly Acquisition",
                  description:
                    "Création et gestion complète de vos campagnes Google Ads pour générer des appels et des devis, avec ou sans site. Budget publicitaire non inclus. Sans engagement.",
                  price: "299",
                  priceCurrency: "EUR",
                  category: "Publicité Google Ads",
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "299",
                    priceCurrency: "EUR",
                    unitCode: "MON",
                  },
                },
                {
                  "@type": "Offer",
                  name: "Sitaly Agents IA",
                  description:
                    "Des agents IA installés clé en main pour votre activité : standardiste qui ne rate plus un appel, prise de rendez-vous, relance des devis et réponse aux messages. Sans engagement.",
                  category: "Automatisation par intelligence artificielle",
                },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33658683372",
                email: "contact@sitaly.fr",
                contactType: "sales",
                areaServed: "FR",
                availableLanguage: "French",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://sitaly.fr/#website",
              name: "Sitaly",
              url: "https://sitaly.fr",
              publisher: { "@id": "https://sitaly.fr/#business" },
              inLanguage: "fr",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Favicons en dur : les <link> du head TanStack ne sont pas sérialisés au prerender */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LZDMNC5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieConsent />
    </QueryClientProvider>
  );
}
