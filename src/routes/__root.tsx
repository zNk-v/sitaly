import { CREATEUR_IA, PRIX_APPEL } from "@/data/offres";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { CookieConsent } from "../components/CookieConsent";
import { PageIntrouvable } from "../components/PageIntrouvable";

/**
 * La bulle de discussion (SITA-22) : son lot de JavaScript est à part, et il
 * ne part qu'à un moment de repos, après le premier affichage. Rien d'elle
 * n'est dans le chemin critique : le LCP ne bouge pas.
 */
const BulleChat = lazy(() => import("../components/chat/BulleChat"));
import { battreMesure, compterVue, prolongerCampagne, suivreClicsDeContact } from "../lib/mesure";
import { pageTiktok, suivreDepartsVersApp } from "../lib/pixel-tiktok";
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

const TITRE_PAR_DEFAUT = "Sitaly : créez votre site internet avec l'IA";
const DESCRIPTION_PAR_DEFAUT = `Décrivez votre activité en une phrase : l'IA de Sitaly écrit votre site. Aperçu gratuit, puis en ligne à ${PRIX_APPEL.mensuel} €/mois les ${PRIX_APPEL.mois} premiers mois.`;

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
      // Le nom au registre : Sitaly est le nom commercial de l'entreprise
      // individuelle de Teddy Vidal (SIREN 833 848 831).
      legalName: "Teddy Vidal (Sitaly)",
      url: "https://sitaly.fr/",
      logo: {
        "@type": "ImageObject",
        url: "https://sitaly.fr/icon-512.png",
        width: 512,
        height: 512,
      },
      image: "https://sitaly.fr/og-image.png",
      // Depuis le 30 octobre 2026, sitaly.fr vend l'application. Les assistants
      // IA reprennent cette description : elle doit dire ce que Sitaly vend.
      description: `Sitaly est une application française qui crée le site internet d'un artisan, d'un indépendant ou d'une TPE à partir d'une phrase, avec l'IA, en une minute. L'aperçu est gratuit ; la mise en ligne coûte ${PRIX_APPEL.mensuel} € par mois les ${PRIX_APPEL.mois} premiers mois avec Essentiel, puis ${CREATEUR_IA.essentiel.mensuel} €. Elle réunit aussi les devis et factures, la prise de rendez-vous, les avis Google, le blog et le référencement.`,
      slogan: "Créez votre site internet avec l'IA, en une minute.",
      founder: { "@id": "https://sitaly.fr/#teddy-vidal" },
      telephone: SITALY_PHONE,
      email: SITALY_EMAIL,
      // La ville et le code postal du registre (décision du 16 novembre 2026,
      // point 1.1 de l'audit) : c'est ici que Google recoupe l'entité avec le
      // SIREN ci-dessous, et l'écart lui faisait voir deux entreprises. Ni rue
      // ni numéro : Sitaly ne reçoit pas de public, et l'adresse complète
      // reste dans les mentions légales. La ville de présentation
      // (SITALY_VILLE_PUBLIQUE) n'apparaît que dans les textes visibles.
      address: {
        "@type": "PostalAddress",
        addressLocality: SITALY_VILLE,
        postalCode: SITALY_CODE_POSTAL,
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
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
      areaServed: [{ "@type": "Country", name: "France" }],
      identifier: [
        { "@type": "PropertyValue", propertyID: "SIREN", value: "833848831" },
        { "@type": "PropertyValue", propertyID: "SIRET", value: "83384883100032" },
      ],
      currenciesAccepted: "EUR",
      knowsLanguage: "fr",
      knowsAbout: [
        "Création de site internet par IA",
        "Générateur de site internet",
        "Référencement SEO et GEO",
        "Devis et factures",
        "Prise de rendez-vous en ligne",
        "Avis Google",
        "Agents IA",
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
        "https://www.instagram.com/sitaly.fr/",
        "https://www.youtube.com/@sitaly-fr",
        "https://annuaire-entreprises.data.gouv.fr/entreprise/833848831",
        "https://www.lafabriquedunet.fr/logiciel/sitaly",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITALY_PHONE,
        email: SITALY_EMAIL,
        contactType: "sales",
        areaServed: "FR",
        availableLanguage: "French",
      },
      // L'offre depuis le 30 octobre 2026 : l'application et ses fonctions.
      makesOffer: [
        ["Créateur de site internet par IA", "https://sitaly.fr/"],
        ["Devis et factures", "https://sitaly.fr/produits/devis-et-factures/"],
        ["Prise de rendez-vous en ligne", "https://sitaly.fr/produits/prise-de-rendez-vous/"],
        ["Agents IA", "https://sitaly.fr/produits/agents-ia/"],
        ["Avis Google", "https://sitaly.fr/produits/avis-google/"],
        ["Blog écrit par l'IA", "https://sitaly.fr/produits/blog-ia/"],
        ["Référencement SEO et GEO", "https://sitaly.fr/produits/referencement-seo-geo/"],
        ["Identité de marque", "https://sitaly.fr/produits/identite-de-marque/"],
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
      description:
        "Teddy Vidal a fondé Sitaly, l'application française qui crée le site internet des artisans, des indépendants et des TPE avec l'IA. Avant l'application, il a créé des sites à la main pour des artisans et des petites entreprises.",
      // Pas de photo : Teddy a demandé qu'elle n'apparaisse pas (8 novembre 2026).
      knowsAbout: [
        "Création de site internet",
        "Référencement local",
        "Fiche Google Business Profile",
        "Devis et factures pour artisans",
      ],
      // Même ville que l'entreprise ci-dessus : le fondateur travaille là où
      // elle est immatriculée, et deux villes dans un même graphe se
      // contrediraient.
      workLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: SITALY_VILLE,
          postalCode: SITALY_CODE_POSTAL,
          addressCountry: "FR",
        },
      },
      worksFor: { "@id": "https://sitaly.fr/#business" },
      url: "https://sitaly.fr/a-propos/",
      sameAs: ["https://www.linkedin.com/in/vidalozzi"],
    },
    {
      "@type": "WebSite",
      "@id": "https://sitaly.fr/#website",
      name: "Sitaly",
      alternateName: ["sitaly.fr"],
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
      // GitHub Pages n'envoie aucun en-tête de sécurité. La politique de
      // référent, elle, passe par une balise (audit SEO du 14 novembre 2026).
      { name: "referrer", content: "strict-origin-when-cross-origin" },
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
        content: "Sitaly : créez votre site internet avec l'IA",
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
  useEffect(() => prolongerCampagne(), []);
  useEffect(() => suivreDepartsVersApp(), []);

  // Les visites, sans cookie (src/lib/mesure.ts) : une page vue à chaque changement d'adresse.
  const chemin = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => compterVue(chemin), [chemin]);
  useEffect(() => pageTiktok(chemin), [chemin]);
  useEffect(() => battreMesure(), []);

  // La bulle attend un temps libre, avec un secours à 2 s.
  const [bulle, setBulle] = useState(false);
  useEffect(() => {
    const charger = () => setBulle(true);
    const libre = window.requestIdleCallback?.(charger, { timeout: 2000 });
    const secours = window.setTimeout(charger, 2000);
    return () => {
      if (libre != null) window.cancelIdleCallback?.(libre);
      window.clearTimeout(secours);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieConsent />
      {bulle && (
        <Suspense fallback={null}>
          <BulleChat />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}
