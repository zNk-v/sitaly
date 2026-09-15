import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { CALENDLY_URL } from "@/lib/config";

const URL = "https://sitaly.fr/outils/budget-google-ads-artisan/";
const TITLE = "Calculateur de budget Google Ads pour artisan (gratuit) | Sitaly";
const DESCRIPTION =
  "Calculez un budget Google Ads réaliste selon votre métier et votre zone : clics, appels, chantiers signés et coût par demande. Gratuit, sans inscription.";

/**
 * CPC moyens par métier. Mêmes valeurs que le tableau de l'article
 * « Combien coûte une campagne Google Ads pour un artisan en 2026 ? »
 * (src/data/blog-posts.ts) : l'outil et l'article ne doivent pas se contredire.
 * Valeurs hors grandes métropoles, en euros.
 */
const METIERS_CPC: { id: string; label: string; cpc: number }[] = [
  { id: "plombier", label: "Plombier", cpc: 2.4 },
  { id: "electricien", label: "Électricien", cpc: 2.1 },
  { id: "couvreur", label: "Couvreur", cpc: 2.8 },
  { id: "menuisier", label: "Menuisier", cpc: 1.6 },
  { id: "macon", label: "Maçon", cpc: 1.8 },
  { id: "chauffagiste", label: "Chauffagiste", cpc: 2.5 },
  { id: "peintre", label: "Peintre", cpc: 1.4 },
  { id: "serrurier", label: "Serrurier", cpc: 4.5 },
];

/** L'article indique « multiplier par 1,5 à 2 » dans les grandes métropoles. */
const ZONES = [
  { id: "rurale", label: "Zone rurale ou petite ville", coef: 0.85 },
  { id: "moyenne", label: "Ville moyenne", coef: 1 },
  { id: "metropole", label: "Grande métropole (Paris, Lyon, Marseille…)", coef: 1.75 },
];

const SITES = [
  { id: "faible", label: "Site ancien ou peu clair", taux: 0.015 },
  { id: "correct", label: "Site correct", taux: 0.035 },
  { id: "optimise", label: "Site pensé pour l'appel", taux: 0.06 },
];

const euros = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const arrondi = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

export const Route = createFileRoute("/outils/budget-google-ads-artisan")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Calculateur de budget Google Ads pour artisan",
          description: DESCRIPTION,
          url: URL,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Tous navigateurs",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          provider: { "@type": "Organization", name: "Sitaly", url: "https://sitaly.fr" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sitaly.fr/" },
            { "@type": "ListItem", position: 2, name: "Outils", item: "https://sitaly.fr/outils/" },
            { "@type": "ListItem", position: 3, name: "Calculateur budget Google Ads", item: URL },
          ],
        }),
      },
    ],
  }),
  component: BudgetGoogleAds,
});

function Champ({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const selectClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-accent/40";

function BudgetGoogleAds() {
  const [metier, setMetier] = useState("couvreur");
  const [zone, setZone] = useState("moyenne");
  const [site, setSite] = useState("correct");
  const [budget, setBudget] = useState(500);
  const [signature, setSignature] = useState(30);
  const [marge, setMarge] = useState(800);

  const cpc =
    (METIERS_CPC.find((m) => m.id === metier)?.cpc ?? 2) *
    (ZONES.find((z) => z.id === zone)?.coef ?? 1);
  const taux = SITES.find((s) => s.id === site)?.taux ?? 0.035;
  const clics = budget / cpc;
  const demandes = clics * taux;
  const chantiers = demandes * (signature / 100);
  const coutDemande = demandes > 0 ? budget / demandes : 0;
  const margeGeneree = chantiers * marge;
  const demandesSiteOptimise = clics * 0.06;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteChrome>
        <section className="hero-bg relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="rail-label text-brand-ink">
              <Link to="/outils/" className="hover:underline">
                Outils gratuits
              </Link>
            </div>
            <h1 className="display-hero mt-4 max-w-4xl">
              Calculateur de <span className="accent-word text-brand-ink">budget Google Ads</span>
            </h1>
            <p className="measure mt-6 text-lg text-muted-foreground">
              Combien de clics, d'appels et de chantiers pour un budget donné ? Réglez votre métier,
              votre zone et votre site : le calcul se met à jour.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <Champ label="Votre métier">
                <select
                  value={metier}
                  onChange={(e) => setMetier(e.target.value)}
                  className={selectClass}
                >
                  {METIERS_CPC.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </Champ>
              <Champ label="Votre zone">
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className={selectClass}
                >
                  {ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.label}
                    </option>
                  ))}
                </select>
              </Champ>
              <Champ label="Votre site actuel">
                <select
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  className={selectClass}
                >
                  {SITES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label} ({arrondi(s.taux * 100)} % des visiteurs appellent)
                    </option>
                  ))}
                </select>
              </Champ>
              <Champ label={`Budget publicitaire mensuel : ${euros(budget)}`}>
                <input
                  type="range"
                  min={150}
                  max={3000}
                  step={50}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-[var(--blue)]"
                />
              </Champ>
              <Champ label={`Demandes transformées en chantier : ${signature} %`}>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={signature}
                  onChange={(e) => setSignature(Number(e.target.value))}
                  className="w-full accent-[var(--blue)]"
                />
              </Champ>
              <Champ label={`Marge moyenne par chantier : ${euros(marge)}`}>
                <input
                  type="range"
                  min={200}
                  max={5000}
                  step={100}
                  value={marge}
                  onChange={(e) => setMarge(Number(e.target.value))}
                  className="w-full accent-[var(--blue)]"
                />
              </Champ>
            </div>

            <div aria-live="polite">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: `${arrondi(cpc)} €`, l: "coût moyen d'un clic" },
                  { v: Math.round(clics).toLocaleString("fr-FR"), l: "clics par mois" },
                  { v: arrondi(demandes), l: "appels ou demandes" },
                  { v: arrondi(chantiers), l: "chantiers signés" },
                  { v: euros(coutDemande), l: "par demande reçue" },
                  { v: euros(margeGeneree), l: "de marge générée" },
                ].map((k) => (
                  <div
                    key={k.l}
                    className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                  >
                    <div className="font-display text-3xl font-extrabold tabular-nums tracking-tight">
                      {k.v}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{k.l}</div>
                  </div>
                ))}
              </div>

              {site !== "optimise" && (
                <p className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-5 text-[15px] text-foreground/90">
                  Avec les mêmes {Math.round(clics).toLocaleString("fr-FR")} clics, un site pensé
                  pour l'appel produirait environ{" "}
                  <strong>{arrondi(demandesSiteOptimise)} demandes</strong> au lieu de{" "}
                  {arrondi(demandes)}. Le budget publicitaire ne change pas : c'est le site qui fait
                  l'écart.
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bouton px-6 py-3 text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  Chiffrer ma zone précisément
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-paper-sunk py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Les hypothèses du calcul
            </h2>
            <div className="mt-4 space-y-4 text-foreground/85">
              <p>
                Les coûts par clic sont des moyennes observées en France hors grandes métropoles,
                reprises de notre article sur le{" "}
                <Link
                  to="/blog/$slug/"
                  params={{ slug: "cout-google-ads-artisan-vrais-chiffres" }}
                  className="font-semibold text-accent hover:underline"
                >
                  coût réel de Google Ads pour un artisan
                </Link>
                . Le coût d'un clic varie en temps réel selon la concurrence, la saison et la
                qualité des annonces : le résultat donne un ordre de grandeur, pas un devis.
              </p>
              <p>
                Le budget saisi est le budget versé à Google, hors frais de gestion éventuels et
                hors TVA. Les quatre à huit premières semaines d'une campagne rendent en général
                moins, le temps que Google apprenne.
              </p>
            </div>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
