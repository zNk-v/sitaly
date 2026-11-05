import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { BOUTON_CLAIR, BOUTON_NOIR, CARTE, TEXTE_GRIS, TitreSection, lienCreation } from "@/components/produit/Produit";
import { CREATEUR_IA as IA } from "@/data/offres";
import { APP_URL } from "@/lib/config";
import { BASE_URL } from "@/lib/sitemap";

/**
 * Le parrainage, page publique (5 novembre 2026). Le programme tourne dans
 * l'app depuis le 2 novembre (rubrique Parrainage) ; le pied de page
 * l'annonçait encore « Bientôt ». Les règles sont celles de
 * ~/sitaly-saas/src/lib/parrainage.ts : à changer aux deux endroits.
 */
const REGLES = {
  commission: 15,
  moisCommission: 12,
  remiseFilleul: 15,
  moisRemise: 6,
  joursAttente: 30,
  minimumVirement: 50,
} as const;

const centimes = (n: number) => `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ /g, " ")} €`;

// Un filleul en Essentiel au mois : remisé ses six premiers mois, plein tarif ensuite.
const MOIS = IA.essentiel.mensuel;
const PAYE_REMISE = MOIS * (1 - REGLES.remiseFilleul / 100);
const PAR_MOIS_REMISE = (PAYE_REMISE * REGLES.commission) / 100;
const PAR_MOIS_PLEIN = (MOIS * REGLES.commission) / 100;
const SUR_UN_AN = PAR_MOIS_REMISE * REGLES.moisRemise + PAR_MOIS_PLEIN * (REGLES.moisCommission - REGLES.moisRemise);

const LIEN_APP = `${APP_URL}/app/parrainage`;
const TITRE = `Parrainage Sitaly : ${REGLES.commission} % pendant ${REGLES.moisCommission} mois`;
const DESCRIPTION = `Recommandez Sitaly à une entreprise : vous touchez ${REGLES.commission} % de ses paiements pendant ${REGLES.moisCommission} mois, elle paie ${REGLES.remiseFilleul} % de moins pendant ${REGLES.moisRemise} mois.`;
const URL = `${BASE_URL}/parrainage/`;

const ETAPES = [
  {
    titre: "Prenez votre lien",
    texte: "Créez votre compte Sitaly, gratuit, puis ouvrez la rubrique Parrainage. Votre lien personnel vous attend, avec des messages prêts à envoyer.",
  },
  {
    titre: "Partagez-le",
    texte: "Par SMS, WhatsApp, e-mail ou sur vos réseaux. L'entreprise qui crée son compte en le suivant devient votre filleule.",
  },
  {
    titre: "Touchez vos commissions",
    texte: `Dès qu'elle s'abonne, ${REGLES.commission} % de chacun de ses paiements vous reviennent, pendant ${REGLES.moisCommission} mois. Vous suivez tout depuis l'app.`,
  },
];

const QUESTIONS = [
  {
    q: "Faut-il être abonné pour parrainer ?",
    a: "Non. Un compte gratuit suffit pour avoir votre lien. Les commissions se versent par virement, ou en avoir sur votre abonnement si vous en avez un.",
  },
  {
    q: "Que gagne l'entreprise que je recommande ?",
    a: `${REGLES.remiseFilleul} % de remise sur son abonnement Essentiel ou Pro pendant ses ${REGLES.moisRemise} premiers mois, appliquée d'office au paiement.`,
  },
  {
    q: "Quand une commission devient-elle disponible ?",
    a: `${REGLES.joursAttente} jours après le paiement du filleul. Ce délai couvre la rétractation : un paiement remboursé annule sa commission.`,
  },
  {
    q: "Comment suis-je payé ?",
    a: `En avoir sur votre propre abonnement Sitaly, tout de suite et sans minimum, ou par virement à partir de ${REGLES.minimumVirement} €. Les virements partent sous 10 jours ouvrés.`,
  },
  {
    q: "Combien de temps le lien reste-t-il valable ?",
    a: "Le code suit le visiteur pendant 30 jours. Il doit créer son compte dans ce délai, en passant par votre lien.",
  },
  {
    q: "Puis-je me parrainer moi-même ?",
    a: "Non. Un compte ne peut pas suivre son propre lien, ni changer de parrain après coup. Les comptes créés pour toucher une commission sont annulés.",
  },
  {
    q: "Dois-je déclarer ces gains ?",
    a: "Oui. Les commissions sont des revenus : déclarez-les avec ceux de votre activité. Votre comptable vous dira dans quelle case.",
  },
];

export const Route = createFileRoute("/parrainage")({
  head: () => ({
    meta: [
      { title: `${TITRE} | Sitaly` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              mainEntity: QUESTIONS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Parrainage", item: URL },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Parrainage,
});

function Parrainage() {
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-10 pb-12 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <nav aria-label="Fil d'Ariane" className={`flex items-center justify-center gap-1.5 text-sm ${TEXTE_GRIS}`}>
              <Link to="/" className="hover:text-black">
                Sitaly
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-black">Parrainage</span>
            </nav>
            <h1 className="titre-produit mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Recommandez Sitaly, touchez {REGLES.commission} %
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Vous connaissez un artisan, un commerçant ou un indépendant qui a besoin d'un site ? Avec votre lien, il paie {REGLES.remiseFilleul} % de moins
              pendant {REGLES.moisRemise} mois, et vous touchez {REGLES.commission} % de ses paiements pendant {REGLES.moisCommission} mois.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={LIEN_APP} className={`${BOUTON_NOIR} min-h-12 px-6 text-base`}>
                Obtenir mon lien <ArrowRight className="h-4 w-4" />
              </a>
              <a href={lienCreation()} className={`${BOUTON_CLAIR} min-h-12 px-6 text-base`}>
                Créer mon compte gratuit
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-3">
            <div className="rounded-3xl bg-[#0d0f14] p-7 text-white">
              <div className="text-sm text-white/60">Un filleul en {IA.essentiel.nom}</div>
              <div className="titre-produit mt-3 text-5xl tabular-nums text-white">{centimes(SUR_UN_AN)}</div>
              <p className="mt-3 text-sm leading-6 text-white/70">pour vous sur un an, versés au fil de ses paiements.</p>
            </div>
            <div className={`${CARTE} p-7`}>
              <div className={`text-sm ${TEXTE_GRIS}`}>Ses {REGLES.moisRemise} premiers mois</div>
              <div className="titre-produit mt-3 text-4xl tabular-nums">{centimes(PAR_MOIS_REMISE)}</div>
              <p className={`mt-3 text-sm leading-6 ${TEXTE_GRIS}`}>
                par mois pour vous. Lui paie {centimes(PAYE_REMISE)} au lieu de {centimes(MOIS)}.
              </p>
            </div>
            <div className={`${CARTE} p-7`}>
              <div className={`text-sm ${TEXTE_GRIS}`}>Les {REGLES.moisCommission - REGLES.moisRemise} mois suivants</div>
              <div className="titre-produit mt-3 text-4xl tabular-nums">{centimes(PAR_MOIS_PLEIN)}</div>
              <p className={`mt-3 text-sm leading-6 ${TEXTE_GRIS}`}>par mois pour vous, sur son abonnement à {centimes(MOIS)}.</p>
            </div>
          </div>
          <p className={`mx-auto mt-4 max-w-5xl text-center text-sm ${TEXTE_GRIS}`}>
            Exemple pour un abonnement {IA.essentiel.nom} payé au mois. Un filleul en {IA.pro.nom} vous rapporte deux fois plus.
          </p>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <TitreSection surtitre="Comment ça marche" titre="Un lien, et c'est parti" />
            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {ETAPES.map((e, k) => (
                <li key={e.titre} className={`${CARTE} p-7`}>
                  <span className="titre-produit text-5xl text-[#7c3aed]">{k + 1}</span>
                  <h3 className="mt-5 text-xl font-semibold">{e.titre}</h3>
                  <p className={`mt-2 leading-7 ${TEXTE_GRIS}`}>{e.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="text-sm font-medium text-brand-ink">Pour qui</div>
              <h2 className="titre-produit mt-3 text-[2.15rem] sm:text-5xl">Ceux qui conseillent des entrepreneurs</h2>
            </div>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {[
                ["Les clients de Sitaly", "Votre site plaît à un confrère ou à un voisin de boutique : envoyez-lui le lien, la remise l'aide à se lancer."],
                ["Les comptables et les conseillers", "Vos clients qui créent leur entreprise ont besoin d'un site, de devis et de factures conformes. Sitaly fait les trois."],
                ["Les formateurs et les réseaux", "Chambres de métiers, couveuses, groupements : un lien à glisser dans votre support de formation."],
                ["Les créateurs de contenu", "Vous parlez aux artisans et aux indépendants ? Le lien se met dans une vidéo, un article ou une lettre."],
              ].map(([titre, texte]) => (
                <div key={titre} className="border-t border-black/10 pt-5">
                  <h3 className="text-lg font-semibold">{titre}</h3>
                  <p className={`mt-2 leading-7 ${TEXTE_GRIS}`}>{texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <TitreSection surtitre="Questions" titre="Questions fréquentes" />
            <div className="mt-10 space-y-3">
              {QUESTIONS.map((f) => (
                <details key={f.q} className={`${CARTE} group p-5`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                    {f.q}
                    <span className="text-xl leading-none transition group-open:rotate-45">+</span>
                  </summary>
                  <p className={`mt-3 ${TEXTE_GRIS}`}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-8 pb-28 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">Votre lien vous attend</h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Connectez-vous à Sitaly, ouvrez la rubrique Parrainage et copiez votre lien. Sans compte, la création prend une minute.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={LIEN_APP} className={`${BOUTON_NOIR} min-h-12 px-6 text-base`}>
                Obtenir mon lien <ArrowRight className="h-4 w-4" />
              </a>
              <a href={lienCreation()} className={`${BOUTON_CLAIR} min-h-12 px-6 text-base`}>
                Créer mon compte gratuit
              </a>
            </div>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
