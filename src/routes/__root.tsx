import { PRIX_SITE_MIN } from "@/data/offres";
import { euros } from "@/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CookieConsent } from "../components/CookieConsent";
import { PageIntrouvable } from "../components/PageIntrouvable";
import { suivreClicsDeContact } from "../lib/mesure";
import {
  FICHE_GOOGLE_URL,
  SITALY_CODE_POSTAL,
  SITALY_EMAIL,
  SITALY_PHONE,
  SITALY_VILLE,
} from "../lib/config";

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
          La page ne s'est pas chargée
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur s'est produite de notre côté. Vous pouvez réessayer, ou revenir à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bouton px-5 py-2 text-sm"
          >
            Réessayer
          </button>
          <a href="/" className="bouton-secondaire px-5 py-2 text-sm">
            Revenir à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

const TITRE_PAR_DEFAUT = "Création de site internet et fiche Google | Sitaly";
const DESCRIPTION_PAR_DEFAUT = `Sitaly crée, héberge et entretient les sites des artisans, indépendants et petits commerces, fiche Google comprise. Dès ${euros(PRIX_SITE_MIN)} par mois, sans engagement.`;

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
      logo: {
        "@type": "ImageObject",
        url: "https://sitaly.fr/icon-512.png",
        width: 512,
        height: 512,
      },
      image: "https://sitaly.fr/og-image.png",
      description:
        "Sitaly est une micro-agence en abonnement qui crée, héberge et entretient les sites internet des artisans, indépendants, commerçants et TPE : site vitrine, boutique en ligne Shopify, refonte, maintenance de site existant et gestion de la fiche Google. Agents IA et campagnes publicitaires sur devis.",
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
      // Le centre de Brétigny-sur-Orge, pas une adresse : Sitaly ne reçoit
      // pas de public (DESIGN.md §9).
      geo: { "@type": "GeoCoordinates", latitude: 48.61056, longitude: 2.30889 },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "13:00",
        },
      ],
      priceRange: "€€",
      areaServed: [
        { "@type": "AdministrativeArea", name: "Essonne" },
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
        "ChatGPT Ads",
        "Google Ads",
        "Mise en relation entre particuliers et artisans",
        "CRM sur mesure",
        "Intégration d'API",
        "Création de site internet",
      ],
      // sameAs relie l'entreprise à ses profils et à son registre : c'est ce
      // qui permet aux moteurs de traiter ces pages comme une seule entité.
      // La fiche Google est désignée par son identifiant Maps (cid), stable
      // même si le nom ou la catégorie changent.
      // TODO(ted) : ajouter les profils d'annuaires (La Fabrique du Net,
      // Sortlist, Malt…) au fur et à mesure des inscriptions.
      hasMap: FICHE_GOOGLE_URL,
      sameAs: [
        FICHE_GOOGLE_URL,
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
      // L'ordre de l'offre depuis le 18 octobre 2026 : le site en tête.
      makesOffer: [
        ["Création de site internet", "https://sitaly.fr/creation-site-internet/"],
        ["Site vitrine", "https://sitaly.fr/site-vitrine/"],
        ["Boutique en ligne Shopify", "https://sitaly.fr/site-e-commerce/"],
        ["Refonte de site internet", "https://sitaly.fr/refonte-site-internet/"],
        ["Maintenance de site existant", "https://sitaly.fr/tarifs/#maintenance"],
        ["Agents IA pour PME", "https://sitaly.fr/agents-ia/"],
      ].map(([name, url]) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, url },
      })),
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
      alternateName: ["sitaly.fr", "Sitaly Agence"],
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
        content: "Sitaly — création de sites internet et fiche Google, en abonnement",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sitaly.fr/og-image.png" },
      { name: "google-site-verification", content: "Yk4vxjL9oYYQ2TOB095PmXc-hZfT_4g5AzHSIllMfSA" },
      { name: "google-site-verification", content: "zZ06krdPwgDK34kIDMFiPjqh3Sbpf8U1pEPxbTTiSag" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Polices auto-hébergées (voir src/fonts.css) : plus de requête bloquante vers Google.
      // Une seule préchargée : Plus Jakarta Sans, celle des grands titres et du
      // mot du hero (l'élément LCP). Inter, le texte courant, s'affiche d'abord
      // en police de repli (font-display: swap) et ne dispute plus la bande
      // passante au titre.
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/plus-jakarta-sans-latin.woff2",
        crossOrigin: "anonymous",
      },
    ],
    scripts: [
      /* GA4. Le stub `gtag` et le consentement par défaut partent tout de
         suite : les événements envoyés avant le script restent en file dans
         `dataLayer`. Le script lui-même attend la fin du chargement, puis un
         temps libre ou la première interaction, avec un secours à 4 s : il
         ne dispute plus la bande passante au premier affichage. */
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
          (function () {
            var fait = false;
            function charger() {
              if (fait) return;
              fait = true;
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=G-H4Z6HZLE3S';
              document.head.appendChild(s);
            }
            function apresChargement() {
              if ('requestIdleCallback' in window) requestIdleCallback(charger, { timeout: 4000 });
              setTimeout(charger, 4000);
            }
            ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (e) {
              window.addEventListener(e, charger, { once: true, passive: true });
            });
            if (document.readyState === 'complete') apresChargement();
            else window.addEventListener('load', apresChargement, { once: true });
          })();
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
  notFoundComponent: PageIntrouvable,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
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
