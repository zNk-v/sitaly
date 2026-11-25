import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  BoiteApp,
  Confiance,
  Faq,
  FAQ_PRODUIT,
  GrilleTarifs,
  TEXTE_GRIS,
  TitreSection,
} from "@/components/produit/Produit";
import {
  BarreCollante,
  Carrousel,
  Conversation,
  Familles,
  FamillesMosaique,
  GrilleFonctions,
  GrilleFonctionsBento,
} from "@/components/produit/Vitrine";
import { FilmLancement, GrilleActivite } from "@/components/produit/Activite";
import { GARANTIE, offresStructurees, PRIX_APPEL } from "@/data/offres";
import { HeroComposer } from "@/components/accueil/HeroComposer";
import { RetouchesDemo } from "@/components/produit/RetouchesDemo";
import { PanneauEffets, useEffets } from "@/components/accueil/EffetsAccueil";
import { TraitsFond } from "@/components/TraitsFond";

/**
 * L'accueil de sitaly.fr (30 octobre 2026) : la vitrine de Sitaly App.
 *
 * Deuxième version, le jour même, après l'étude de durable.com demandée par
 * Teddy : des métiers en action en grand (photos créées par l'IA, le site
 * généré en surimpression), la barre IA qui suit le visiteur, des fonctions
 * qui s'animent, une conversation avec l'IA qui retouche un site sous nos
 * yeux, et les outils qu'un abonnement remplace. Les blocs vivent dans
 * src/components/produit/ ; l'allure suit DESIGN.md §13.
 */

const TITRE = "Sitaly : créez votre site internet avec l'IA, en une minute";
const DESCRIPTION = `Décrivez votre activité en une phrase : l'IA de Sitaly écrit votre site et crée vos photos. Aperçu gratuit, en ligne à ${PRIX_APPEL.mensuel} €/mois les ${PRIX_APPEL.mois} premiers mois.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://sitaly.fr/" },
      // Pas d'og:image ici : celle de __root.tsx (og-image.png, le plombier,
      // validée le 14/11/2026) s'applique. Redéfinie ici, TanStack la place
      // après og:image:width/height/alt, et l'aperçu Apple (iMessage, Safari)
      // ne la lit plus : il prend la première grande photo, le fleuriste
      // (constaté le 21/11/2026 avec LinkPresentation).
    ],
    links: [
      { rel: "canonical", href: "https://sitaly.fr/" },
      {
        rel: "preload",
        as: "image",
        href: "/vitrine/metiers/fleuriste-1536.webp",
        media: "(min-width: 641px)",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://sitaly.fr/#webpage",
              url: "https://sitaly.fr/",
              name: TITRE,
              description: DESCRIPTION,
              isPartOf: { "@id": "https://sitaly.fr/#website" },
              about: { "@id": "https://sitaly.fr/#app" },
              inLanguage: "fr-FR",
            },
            {
              "@type": "SoftwareApplication",
              "@id": "https://sitaly.fr/#app",
              name: "Sitaly",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://app.sitaly.fr/",
              description: DESCRIPTION,
              publisher: { "@id": "https://sitaly.fr/#business" },
              offers: offresStructurees(),
            },
            {
              "@type": "FAQPage",
              "@id": "https://sitaly.fr/#faq",
              mainEntity: FAQ_PRODUIT.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Accueil,
});

function Accueil() {
  // Les effets du 25/11/2026 : en local, un panneau les allume un par un.
  const [effets, changerEffets] = useEffets();
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteHeader accueil />
      <div id="top" className="pt-[var(--entete-hauteur)]">
        <PanneauEffets effets={effets} changer={changerEffets} />
        <HeroComposer effets={effets} />
        {/* Les trois chiffres sous le hero (1 min, 5,0/5, 19 €) retirés le
            25/11/2026 à la demande de Teddy. */}

        <div id="exemples" className="scroll-mt-28">
          <Carrousel />
        </div>

        <section id="film" className="scroll-mt-28 px-4 pt-12 sm:px-6 sm:pt-28">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="En vidéo"
              titre="Voyez Sitaly travailler"
              sousTitre="Une phrase, un site en ligne, puis les devis, les rendez-vous et les réponses aux clients."
            />
            <div className="mt-8 sm:mt-12">
              <FilmLancement />
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Pour qui"
              titre="Pensé pour toutes les activités"
              sousTitre="Artisan, commerçant, soignant ou créatif : choisissez la vôtre, l'IA démarre avec."
            />
            <div className="mt-8 sm:mt-12">
              {effets.familles ? <FamillesMosaique /> : <Familles />}
            </div>
          </div>
        </section>

        <section id="fonctionnalites" className="scroll-mt-28 px-4 py-12 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Fonctionnalités"
              titre="Tout pour lancer votre activité en ligne"
              sousTitre="Un site complet, vos demandes de contact, Google, vos photos : l'IA s'occupe du travail."
            />
            <div className="mt-8 sm:mt-14">
              {effets.bento ? <GrilleFonctionsBento /> : <GrilleFonctions />}
            </div>
          </div>
        </section>

        <section
          id="retouches"
          className="scroll-mt-28 bg-[#0d0f14] px-4 py-12 text-white sm:px-6 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-sm font-medium text-white/50">Retouches</div>
              <h2 className="titre-produit mt-3 text-[2.15rem] text-white sm:text-5xl lg:text-6xl">
                Votre site change quand vous lui parlez
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-white/60">
                Écrivez ce que vous voulez, comme à une personne. L'IA modifie votre site en
                quelques secondes, et un clic annule.
              </p>
            </div>
            <div className="mt-8 sm:mt-14">
              {effets.retouches ? <RetouchesDemo /> : <Conversation />}
            </div>
          </div>
        </section>

        <section id="activite" className="scroll-mt-28 px-4 py-12 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Gérer votre activité"
              titre="Votre site, et tout le reste"
              sousTitre="Devis, rendez-vous, réponses aux clients : ce qui vous prenait vos soirées tient dans la même app."
            />
            <div className="mt-8 sm:mt-14">
              <GrilleActivite agentsDirect={effets.agents} />
            </div>
          </div>
        </section>

        {/* Accueil allégé le 25/11/2026 : « Moins d'outils à assembler » et
            « De l'aperçu à la mise en ligne » sont retirés. Leur prix et leur
            aperçu gratuit se trouvent déjà dans les tarifs juste en dessous. */}
        <section id="tarifs" className="scroll-mt-28 px-4 py-12 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Tarifs"
              titre="Deux formules, un aperçu gratuit"
              sousTitre={`Payez seulement si votre site vous plaît. Au mois ou à l'année, 15 % moins cher. ${GARANTIE}.`}
            />
            <div className="mt-8 sm:mt-14">
              <GrilleTarifs prixAnime={effets.prix} compact={effets.tarifs} />
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <TitreSection surtitre="Questions" titre="Questions fréquentes" />
            <div className="mt-8 sm:mt-12">
              <Faq />
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-x-clip px-4 pt-10 pb-32 sm:px-6">
          <TraitsFond sens="droite" />
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Votre site, dans une minute
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase. L'aperçu est gratuit.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <BoiteApp idees={false} />
          </div>
          <Confiance />
        </section>
      </div>
      <SiteFooter />
      <BarreCollante />
    </div>
  );
}
