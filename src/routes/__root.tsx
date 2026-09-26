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
import { suivreClicsDeContact } from "../lib/mesure";
import {
  SITALY_CODE_POSTAL,
  SITALY_EMAIL,
  SITALY_PHONE,
  SITALY_VILLE,
} from "../lib/config";

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
          <Link to="/" className="bouton px-5 py-2 text-sm">
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
            className="bouton px-5 py-2 text-sm"
          >
            Try again
          </button>
          <a href="/" className="bouton-secondaire px-5 py-2 text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const TITRE_PAR_DEFAUT = "Agents IA et automatisation pour PME | Sitaly";
const DESCRIPTION_PAR_DEFAUT =
  "Sitaly installe et pilote des agents IA pour PME : accueil téléphonique, qualification, rendez-vous, relance des devis. Diagnostic offert de 30 min.";

/**
 * L'entité Sitaly, telle que Google et les assistants IA doivent la comprendre.
 *
 * Révision du 26 septembre 2026 (audit SEO/GEO). Le graphe relie trois choses
 * qui étaient éparses : l'entreprise (nom commercial, SIREN, ville), la
 * personne qui la fait (Teddy Vidal, auteur des articles) et le site. La ville
 * y figure désormais, sans l'adresse : c'est elle qui rattache « Sitaly » au
 * registre, où l'entreprise porte le nom de son dirigeant. Les pages de
 * service et les articles s'y rattachent par leurs `@id`.
 */
const GRAPHE_ENTITE = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://sitaly.fr/#business",
      name: "Sitaly",
      url: "https://sitaly.fr/",
      logo: { "@type": "ImageObject", url: "https://sitaly.fr/icon-512.png" },
      image: "https://sitaly.fr/og-image.png",
      description:
        "Sitaly installe et pilote des agents IA et des automatisations pour les PME : accueil téléphonique, qualification des demandes, prise de rendez-vous, relance des devis, outils métier sur mesure. Sites internet et campagnes publicitaires en complément.",
      slogan: "Une seule personne au bout du fil, celle qui construit.",
      founder: { "@id": "https://sitaly.fr/#teddy-vidal" },
      telephone: SITALY_PHONE,
      email: SITALY_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITALY_VILLE,
        postalCode: SITALY_CODE_POSTAL,
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Île-de-France" },
        { "@type": "Country", name: "France" },
      ],
      identifier: [
        { "@type": "PropertyValue", propertyID: "SIREN", value: "833848831" },
        { "@type": "PropertyValue", propertyID: "SIRET", value: "83384883100032" },
      ],
      currenciesAccepted: "EUR",
      knowsLanguage: "fr",
      knowsAbout: [
        "Agents IA",
        "Agent vocal IA",
        "Accueil téléphonique automatisé",
        "Qualification de leads",
        "Relance de devis",
        "Automatisation de processus",
        "CRM sur mesure",
        "Intégration d'API",
        "Création de site internet",
      ],
      // sameAs relie l'entreprise à ses profils et à son registre : c'est ce
      // qui permet aux moteurs de traiter ces pages comme une seule entité.
      // TODO(ted) : ajouter l'URL Google Maps de la fiche Sitaly, puis les
      // profils d'annuaires (La Fabrique du Net, Sortlist, Malt…).
      sameAs: [
        "https://www.linkedin.com/company/sitaly-fr",
        "https://instagram.com/sitaly.fr",
        "https://annuaire-entreprises.data.gouv.fr/entreprise/833848831",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITALY_PHONE,
        email: SITALY_EMAIL,
        contactType: "sales",
        areaServed: "FR",
        availableLanguage: "French",
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Agents IA pour PME",
            url: "https://sitaly.fr/agents-ia/",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automatisation des tâches",
            url: "https://sitaly.fr/automatisation-taches/",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Création de site internet",
            url: "https://sitaly.fr/creation-site-internet/",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Ads",
            url: "https://sitaly.fr/acquisition/",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ChatGPT Ads",
            url: "https://sitaly.fr/chatgpt-ads/",
          },
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://sitaly.fr/#teddy-vidal",
      name: "Teddy Vidal",
      jobTitle: "Fondateur de Sitaly",
      worksFor: { "@id": "https://sitaly.fr/#business" },
      url: "https://sitaly.fr/a-propos/",
      sameAs: ["https://www.linkedin.com/in/vidalozzi"],
    },
    {
      "@type": "WebSite",
      "@id": "https://sitaly.fr/#website",
      name: "Sitaly",
      url: "https://sitaly.fr/",
      publisher: { "@id": "https://sitaly.fr/#business" },
      inLanguage: "fr-FR",
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITRE_PAR_DEFAUT },
      { name: "description", content: DESCRIPTION_PAR_DEFAUT },
      { property: "og:title", content: TITRE_PAR_DEFAUT },
      { property: "og:description", content: DESCRIPTION_PAR_DEFAUT },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sitaly" },
      { property: "og:url", content: "https://sitaly.fr" },
      { property: "og:image", content: "https://sitaly.fr/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Sitaly — agents IA, automatisation et sites pour les PME",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sitaly.fr/og-image.png" },
      { name: "google-site-verification", content: "Yk4vxjL9oYYQ2TOB095PmXc-hZfT_4g5AzHSIllMfSA" },
      { name: "google-site-verification", content: "zZ06krdPwgDK34kIDMFiPjqh3Sbpf8U1pEPxbTTiSag" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Polices auto-hébergées (voir src/fonts.css) : plus de requête bloquante vers Google.
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/inter-latin.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/plus-jakarta-sans-latin.woff2",
        crossOrigin: "anonymous",
      },
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
        type: "application/ld+json",
        children: JSON.stringify(GRAPHE_ENTITE),
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
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#fbfaf7" />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Clics sur le téléphone et le Calendly, comptés dans GA4 (src/lib/mesure.ts).
  useEffect(() => suivreClicsDeContact(), []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieConsent />
    </QueryClientProvider>
  );
}
