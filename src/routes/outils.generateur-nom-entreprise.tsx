import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";
import { ArrowRight, Check, Copy, HelpCircle, Loader2, RefreshCw, Sparkles, X } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import {
  BOUTON_CLAIR,
  BOUTON_NOIR,
  CARTE,
  Confiance,
  TEXTE_GRIS,
  TitreSection,
  lienCreation,
} from "@/components/produit/Produit";
import { disponibilite, nomDeDomaine, type Disponibilite } from "@/lib/domaine";
import { NOMS_ENTREPRISE_URL } from "@/lib/config";
import { BASE_URL } from "@/lib/sitemap";

/**
 * Le générateur de noms d'entreprise (31 octobre 2026), outil gratuit sur le
 * modèle de celui de durable.com. Le visiteur décrit son activité et choisit
 * un style ; la fonction noms-entreprise (Haiku, sans compte, limitée par
 * visiteur) renvoie douze noms. La page vérifie aussitôt le .fr de chacun
 * auprès de l'Afnic (src/lib/domaine.ts), et « Créer le site » ouvre
 * l'application avec l'activité et le nom.
 */

const URL = `${BASE_URL}/outils/generateur-nom-entreprise/`;
const TITRE = "Générateur de nom d'entreprise gratuit, avec l'IA | Sitaly";
const DESCRIPTION =
  "Décrivez votre activité : l'IA propose 12 noms d'entreprise, et vérifie si le nom de domaine en .fr est libre. Gratuit, sans inscription.";

const STYLES = [
  { id: "simple", label: "Simple" },
  { id: "moderne", label: "Moderne" },
  { id: "chaleureux", label: "Chaleureux" },
  { id: "haut_de_gamme", label: "Haut de gamme" },
  { id: "ludique", label: "Ludique" },
] as const;
type StyleId = (typeof STYLES)[number]["id"];

const EXEMPLES = [
  "Fleuriste, bouquets de mariage et livraison",
  "Coach sportive à domicile",
  "Boulangerie artisanale au levain",
];

const FAQ = [
  {
    q: "Le générateur est-il gratuit ?",
    a: "Oui, sans inscription. Vous pouvez lancer plusieurs recherches par jour et changer de style autant que vous voulez.",
  },
  {
    q: "Puis-je utiliser librement un nom proposé ?",
    a: "Les noms sont créés par l'IA et ne sont réservés pour personne. Avant de vous lancer, vérifiez qu'aucune entreprise proche ne l'utilise déjà : cherchez-le sur Google, sur l'annuaire des entreprises (annuaire-entreprises.data.gouv.fr) et dans la base des marques de l'INPI.",
  },
  {
    q: "Comment savoir si le nom de domaine est libre ?",
    a: "La page interroge l'Afnic, le registre officiel du .fr, pour chaque nom proposé. « Libre » veut dire que personne ne l'a réservé à cet instant. Réservez-le vite si un nom vous plaît.",
  },
  {
    q: "Et après avoir trouvé un nom ?",
    a: "« Créer le site avec ce nom » ouvre Sitaly : l'IA écrit votre site internet à partir de votre activité et de votre nom, et le met en ligne en une minute, gratuitement.",
  },
];

const CONSEILS = [
  { titre: "Court", texte: "Deux ou trois mots, faciles à dire au téléphone et à écrire." },
  { titre: "Clair", texte: "On devine votre métier, ou au moins votre univers." },
  { titre: "Libre", texte: "Pas déjà pris par un concurrent, une marque ou une adresse web." },
  { titre: "Durable", texte: "Pas lié à une mode ni à un seul produit, pour pouvoir grandir." },
];

export const Route = createFileRoute("/outils/generateur-nom-entreprise")({
  head: () => ({
    meta: [
      { title: TITRE },
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
              "@type": "WebApplication",
              name: "Générateur de nom d'entreprise",
              url: URL,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
              provider: { "@type": "Organization", name: "Sitaly", url: BASE_URL },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({
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
  component: Generateur,
});

interface Nom {
  nom: string;
  idee: string;
  fr?: Disponibilite | "verification";
}

function Generateur() {
  const id = useId();
  const [activite, setActivite] = useState("");
  const [ville, setVille] = useState("");
  const [style, setStyle] = useState<StyleId>("simple");
  const [noms, setNoms] = useState<Nom[]>([]);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");

  async function chercher() {
    if (activite.trim().length < 3) {
      setErreur("Décrivez votre activité en quelques mots.");
      return;
    }
    setErreur("");
    setEnCours(true);
    try {
      const reponse = await fetch(NOMS_ENTREPRISE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activite, style, ville: ville.trim() || undefined }),
      });
      const corps = await reponse.json().catch(() => ({}));
      if (!reponse.ok) throw new Error(corps.error ?? "La recherche n'a pas abouti.");
      const liste: Nom[] = (corps.noms ?? []).map((n: Nom) => ({ ...n, fr: "verification" }));
      setNoms(liste);
      // Le .fr de chaque nom, vérifié auprès de l'Afnic l'un après l'autre :
      // douze requêtes à la fois en voyaient plusieurs refusées.
      void (async () => {
        for (const n of liste) {
          const domaine = nomDeDomaine(n.nom);
          let d = await disponibilite(domaine, "fr");
          if (d === "inconnu") {
            await new Promise((r) => setTimeout(r, 700));
            d = await disponibilite(domaine, "fr");
          }
          setNoms((actuels) => actuels.map((x) => (x.nom === n.nom ? { ...x, fr: d } : x)));
        }
      })();
      document.getElementById("resultats")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "La recherche n'a pas abouti. Réessayez.");
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium text-brand-ink">Outil gratuit</div>
            <h1 className="titre-produit mt-3 text-[2.4rem] sm:text-6xl lg:text-7xl">
              Générateur de nom d'entreprise
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Décrivez votre activité : l'IA propose douze noms, et vérifie si le nom de domaine en
              .fr est libre. Gratuit, sans inscription.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void chercher();
            }}
            className="mx-auto mt-10 max-w-3xl rounded-3xl border border-black/[0.08] bg-white p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] sm:p-6"
          >
            <label htmlFor={`${id}-activite`} className="text-sm font-semibold">
              Votre activité
            </label>
            <input
              id={`${id}-activite`}
              value={activite}
              onChange={(e) => setActivite(e.target.value)}
              maxLength={300}
              placeholder="Ex. : fleuriste, bouquets de mariage et livraison"
              className="mt-2 h-12 w-full rounded-2xl bg-black/[0.04] px-4 text-base outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/15"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {EXEMPLES.map((x) => (
                <button
                  key={x}
                  type="button"
                  onClick={() => setActivite(x)}
                  className="rounded-full bg-black/[0.04] px-3 py-1 text-[13px] text-black/60 transition hover:bg-black/[0.08]"
                >
                  {x}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_14rem]">
              <fieldset>
                <legend className="text-sm font-semibold">Style</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={style === s.id}
                      onClick={() => setStyle(s.id)}
                      className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                        style === s.id
                          ? "bg-black/85 text-white"
                          : "bg-black/[0.04] text-black/70 hover:bg-black/[0.08]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor={`${id}-ville`} className="text-sm font-semibold">
                  Ville <span className="font-normal text-black/50">(facultatif)</span>
                </label>
                <input
                  id={`${id}-ville`}
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  maxLength={60}
                  placeholder="Ex. : Nantes"
                  className="mt-2 h-11 w-full rounded-2xl bg-black/[0.04] px-4 outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/15"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={enCours}
              className={`${BOUTON_NOIR} mt-6 h-12 w-full text-base`}
            >
              {enCours ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> L'IA cherche des noms…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Trouver des noms
                </>
              )}
            </button>
            {erreur && (
              <p role="alert" className="mt-3 text-center text-sm text-red-700">
                {erreur}
              </p>
            )}
          </form>
        </section>

        <section id="resultats" className="scroll-mt-28 px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            {enCours && noms.length === 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
                {Array.from({ length: 6 }, (_, k) => (
                  <div key={k} className={`${CARTE} h-44 animate-pulse`} />
                ))}
              </div>
            )}
            {noms.length > 0 && (
              <>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <h2 className="titre-produit text-3xl sm:text-4xl">Vos idées de noms</h2>
                  <button
                    type="button"
                    onClick={() => void chercher()}
                    disabled={enCours}
                    className={BOUTON_CLAIR}
                  >
                    <RefreshCw className={`h-4 w-4 ${enCours ? "animate-spin" : ""}`} />
                    D'autres idées
                  </button>
                </div>
                <ul
                  className={`mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${enCours ? "opacity-50" : ""}`}
                >
                  {noms.map((n) => (
                    <li key={n.nom}>
                      <CarteNom n={n} activite={activite} />
                    </li>
                  ))}
                </ul>
                <p className={`mt-6 text-center text-sm ${TEXTE_GRIS}`}>
                  Avant de choisir, vérifiez qu'aucune entreprise proche n'utilise déjà le nom
                  (Google, annuaire des entreprises, base des marques de l'INPI).
                </p>
              </>
            )}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Conseils"
              titre="Un bon nom d'entreprise"
              sousTitre="Quatre questions à vous poser avant de vous décider."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CONSEILS.map((c, k) => (
                <div key={c.titre} className={`${CARTE} p-6`}>
                  <div className="text-sm font-semibold text-brand-ink">
                    {String(k + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-3 text-xl font-semibold">{c.titre}</div>
                  <p className={`mt-1 ${TEXTE_GRIS}`}>{c.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <TitreSection surtitre="Questions" titre="Questions fréquentes" />
            <div className="mt-10 space-y-3">
              {FAQ.map((f) => (
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
          <div className={`${CARTE} mx-auto max-w-4xl px-6 py-14 text-center`}>
            <h2 className="titre-produit text-[2rem] sm:text-5xl">Votre nom est trouvé ?</h2>
            <p className={`mx-auto mt-4 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Sitaly crée le site internet qui va avec, en une minute, gratuitement.
            </p>
            <a
              href={lienCreation(activite || undefined)}
              className={`${BOUTON_NOIR} mt-8 px-6 py-3.5 text-base`}
            >
              Créer mon site <ArrowRight className="h-4 w-4" />
            </a>
            <Confiance />
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}

const PASTILLES: Record<
  NonNullable<Nom["fr"]>,
  { label: string; classe: string; icone: typeof Check }
> = {
  libre: { label: "libre", classe: "bg-[#16a34a]/10 text-[#15803d]", icone: Check },
  pris: { label: "déjà pris", classe: "bg-black/[0.05] text-black/50", icone: X },
  inconnu: { label: "non vérifié", classe: "bg-black/[0.05] text-black/50", icone: HelpCircle },
  verification: { label: "vérification…", classe: "bg-black/[0.05] text-black/50", icone: Loader2 },
};

function CarteNom({ n, activite }: { n: Nom; activite: string }) {
  const [copie, setCopie] = useState(false);
  const domaine = `${nomDeDomaine(n.nom)}.fr`;
  const p = PASTILLES[n.fr ?? "inconnu"];
  return (
    <div className={`${CARTE} flex h-full flex-col p-6`}>
      <div className="flex items-start justify-between gap-3">
        <div className="text-2xl font-semibold tracking-tight">{n.nom}</div>
        <button
          type="button"
          aria-label={`Copier « ${n.nom} »`}
          onClick={() => {
            void navigator.clipboard?.writeText(n.nom);
            setCopie(true);
            setTimeout(() => setCopie(false), 1500);
          }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black/60 transition hover:text-black"
        >
          {copie ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <p className={`mt-2 flex-1 text-[15px] ${TEXTE_GRIS}`}>{n.idee}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium ${p.classe}`}
        >
          <p.icone className={`h-3.5 w-3.5 ${n.fr === "verification" ? "animate-spin" : ""}`} />
          {domaine} {p.label}
        </span>
        <a
          href={lienCreation(`${activite.trim()}. Nom de l'entreprise : ${n.nom}`)}
          className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
        >
          Créer le site <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
