import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, ExternalLink, Plus } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { PictoRubrique } from "@/components/PictoRubrique";
import {
  APP_URL,
  BASE_URL,
  SITALY_EMAIL,
  SITALY_PHONE,
  SITALY_PHONE_DISPLAY,
  euros,
} from "@/lib/config";
import { envoyerDemande } from "@/lib/formulaire";
import { directiveRobots } from "@/lib/indexation";
import { FAQ_TARIFS } from "@/data/faq-tarifs";
import { pageOffre, type PageOffre } from "@/data/pages-offres";
import { REALISATIONS, srcSetCapture } from "@/data/realisations";
import {
  A_LA_CARTE,
  GRILLES,
  GROUPES,
  MENTION_TVA,
  RACHAT_SITE,
  offre,
  offresDu,
  prixCourt,
  type Offre,
} from "@/data/offres";

/**
 * Page d'une offre (23 octobre 2026), sur le modèle des pages d'offre de
 * devmiweb.com : chaque entrée du menu mène à la page de l'offre cliquée.
 *
 * Dans l'ordre : l'accroche et le prix, pour qui, ce qui est compris (les
 * rubriques de la grille), l'écart avec les offres voisines, le déroulé, le
 * prix ligne par ligne, les réalisations, les questions, puis le
 * questionnaire avec l'offre déjà choisie.
 *
 * Prix et contenu : src/data/offres.ts. Texte propre à l'offre :
 * src/data/pages-offres.ts. Questions communes : src/data/faq-tarifs.ts.
 */

/** Les questions de /tarifs/ reprises sur une page d'offre de site. */
const FAQ_SITE = [
  "Est-ce vraiment sans engagement ?",
  "À qui appartient mon site ?",
  "Que se passe-t-il si j'arrête ?",
  "Pourquoi des frais de mise en service ?",
];
const FAQ_MAINTENANCE = ["Est-ce vraiment sans engagement ?", "Je garde mon nom de domaine ?"];

function questions(p: PageOffre, o: Offre) {
  const communes = o.groupe === "site" ? FAQ_SITE : FAQ_MAINTENANCE;
  return [...p.faq, ...FAQ_TARIFS.filter((f) => communes.includes(f.q))];
}

/** Ce que `o` a de plus que `autre` : lignes absentes chez l'autre, ou avec une autre valeur. */
function ecart(o: Offre, autre: Offre): string[] {
  return GRILLES[o.groupe].flatMap((r) =>
    r.lignes.flatMap((l) => {
      const v = l.valeurs[o.id];
      if (!v || v === l.valeurs[autre.id]) return [];
      return [v === true ? l.libelle : `${l.libelle} : ${v}`];
    }),
  );
}

export const Route = createFileRoute("/offres/$id")({
  loader: ({ params }) => {
    const page = pageOffre(params.id);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.page;
    if (!p) return {};
    const o = offre(p.id);
    const url = `${BASE_URL}/offres/${o.id}/`;
    const titre = `${o.nom} : ${p.sujet}, ${prixCourt(o)}`;
    const description = `${o.pour} ${prixCourt(o)} + ${euros(o.depart)} ${o.departLibelle}, sans engagement.`;
    return {
      meta: [
        { title: titre },
        { name: "description", content: description },
        { name: "robots", content: directiveRobots(`/offres/${o.id}`) },
        { property: "og:title", content: titre },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: o.nom,
            description: o.pour,
            url,
            provider: { "@type": "Organization", name: "Sitaly", url: BASE_URL },
            areaServed: "FR",
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: o.mensuel ?? o.depart,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: o.mensuel ?? o.depart,
                priceCurrency: "EUR",
                ...(o.mensuel !== undefined ? { unitText: "MONTH" } : {}),
              },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: questions(p, o).map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Tarifs", item: `${BASE_URL}/tarifs/` },
              { "@type": "ListItem", position: 3, name: o.nom, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PageDOffre,
});

function PageDOffre() {
  const { page: p } = Route.useLoaderData();
  const o = offre(p.id);
  const groupe = offresDu(o.groupe);
  const rang = groupe.findIndex((x) => x.id === o.id);
  const avant = groupe[rang - 1];
  // Présence Pro et Présence Expert ne figurent pas sur /offres/presence/ :
  // pas de comparaison qui les ferait apparaître sur cette page précise.
  const apres = o.id === "presence" ? undefined : groupe[rang + 1];
  const site = o.groupe === "site";
  const faq = questions(p, o);

  return (
    <div
      className={`${o.groupe === "agents-ia" ? "ambiance-automatisation" : "ambiance-site"} min-h-screen bg-background text-foreground`}
    >
      <SiteChrome>
        {/* ---------- Accroche et prix ---------- */}
        <section className="hero-bg relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_24rem] lg:items-center">
            <div>
              <div className="rail-label text-brand-ink">
                <Link
                  to="/tarifs/"
                  hash={GROUPES[o.groupe].ancre}
                  className="inline-flex min-h-11 items-center hover:underline sm:min-h-0"
                >
                  {GROUPES[o.groupe].titre}
                </Link>
              </div>
              <h1 className="display-hero mt-4 max-w-4xl">{p.h1}</h1>
              <p className="measure mt-6 text-lg text-muted-foreground">{p.intro}</p>
            </div>

            <aside className="on-ink relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-elevated sm:p-8">
              <span
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-[image:var(--gradient-ruban)]"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-2xl font-extrabold tracking-[-0.03em]">{o.nom}</p>
                {o.recommandee && (
                  <span className="rounded-full bg-[image:var(--gradient-ruban)] px-3 py-1 text-[12px] font-semibold text-white">
                    Recommandée
                  </span>
                )}
              </div>
              <p className="mt-5 flex items-baseline gap-1.5">
                {o.aPartirDe && <span className="font-medium text-white/70">dès</span>}
                <span className="font-display text-[3.25rem] font-extrabold leading-none tracking-[-0.045em] tabular-nums">
                  {euros(o.mensuel ?? o.depart)}
                </span>
                {o.mensuel !== undefined && (
                  <span className="font-medium text-white/70">/mois</span>
                )}
              </p>
              <p className="mt-2 text-base sm:text-[15px] font-medium text-white/85">
                + {o.aPartirDe ? "dès " : ""}
                {euros(o.depart)} {o.departLibelle}
              </p>
              <p className="mt-1 text-sm text-white/55">Sans engagement. {MENTION_TVA}.</p>
              <Link
                to="/mon-projet/"
                search={{ offre: o.id }}
                className="bouton mt-7 w-full px-6 py-3.5"
              >
                Choisir cette offre
                <ArrowRight className="bouton-fleche h-4 w-4" />
              </Link>
              {groupe.length > 1 && o.id !== "presence" && (
                <Link
                  to="/tarifs/"
                  hash={GROUPES[o.groupe].ancre}
                  className="mt-4 flex min-h-11 items-center justify-center text-center text-base font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white sm:min-h-0 sm:text-sm"
                >
                  Comparer les {groupe.length} offres
                </Link>
              )}
              {o.id === "presence" && (
                <a
                  href={`${APP_URL}/creer`}
                  className="mt-4 flex min-h-11 items-center justify-center text-center text-base font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white sm:min-h-0 sm:text-sm"
                >
                  Vous préférez créer votre site vous-même ?
                </a>
              )}
            </aside>
          </div>
        </section>

        {/* ---------- Pour qui ---------- */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Cette offre est pour vous si
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {p.pourQui.map((t) => (
                <li
                  key={t}
                  className="flex gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-signal/20 text-signal-ink">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[16px] leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Ce qui est compris ---------- */}
        <section className="border-t border-border bg-paper-sunk py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">Ce qui est compris</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {GRILLES[o.groupe].map((r) => {
                const lignes = r.lignes.filter((l) => l.valeurs[o.id]);
                if (!lignes.length) return null;
                return (
                  <div
                    key={r.titre}
                    className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                  >
                    <p className="flex items-center gap-3 font-display text-lg font-bold">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-ink/10 text-brand-ink">
                        <PictoRubrique icone={r.icone} className="h-4.5 w-4.5" />
                      </span>
                      {r.titre}
                    </p>
                    <ul className="mt-4 space-y-2.5 text-base sm:text-[15px]">
                      {lignes.map((l) => {
                        const v = l.valeurs[o.id];
                        return (
                          <li key={l.libelle} className="flex gap-3">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-ink" />
                            <span>
                              {l.libelle}
                              {typeof v === "string" && (
                                <strong className="font-semibold"> : {v}</strong>
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- L'écart avec les offres voisines ---------- */}
        {(avant || apres) && (
          <section className="py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <h2 className="font-display text-3xl font-bold tracking-tight">
                {avant && apres
                  ? "Ce qui change d'une offre à l'autre"
                  : avant
                    ? `L'écart avec ${avant.nom}`
                    : "Et si vous voulez plus ?"}
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {avant && (
                  <Ecart
                    titre={`Ce que ${o.nom} ajoute à ${avant.nom}`}
                    prix={`${prixCourt(o)} au lieu de ${prixCourt(avant)}`}
                    lignes={ecart(o, avant)}
                    lien={{ label: `Voir ${avant.nom}`, offre: avant }}
                  />
                )}
                {apres && (
                  <Ecart
                    titre={`Ce que ${apres.nom} ajoute`}
                    prix={`${prixCourt(apres)}, ${euros(apres.depart)} ${apres.departLibelle}`}
                    lignes={ecart(apres, o)}
                    lien={{ label: `Voir ${apres.nom}`, offre: apres }}
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {/* ---------- Le déroulé ---------- */}
        <section className="border-t border-border bg-paper-sunk py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">Comment ça se passe</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {p.etapes.map((e, i) => (
                <li
                  key={e.titre}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <span className="font-display text-sm font-bold text-brand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold">{e.titre}</h3>
                  <p className="mt-2 text-base sm:text-[15px] leading-relaxed text-muted-foreground">
                    {e.texte}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Le prix, ligne par ligne ---------- */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              {euros(o.depart)} puis {euros(o.mensuel ?? 0)} par mois : le détail
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              <BlocPrix titre={`${euros(o.depart)} ${o.departLibelle}, une fois`}>
                {site
                  ? "Payés à la signature : l'appel de départ, la rédaction des pages, la conception du site, sa mise en ligne et la remise en ordre de votre fiche Google. Non remboursables une fois le travail lancé."
                  : "Payés à la signature : l'état des lieux du site, de ses versions, de ses extensions et de ses sauvegardes. Si une remise en état s'impose, vous recevez un devis séparé avant tout travail."}
              </BlocPrix>
              <BlocPrix titre={`${euros(o.mensuel ?? 0)} par mois, sans engagement`}>
                {site
                  ? "L'hébergement, le nom de domaine, la maintenance et tout ce que la liste ci-dessus prévoit chaque mois. Vous arrêtez quand vous voulez, sans frais."
                  : "Les sauvegardes, les mises à jour et les corrections mineures. Vous arrêtez quand vous voulez, sans frais."}
              </BlocPrix>
              <BlocPrix titre="À prévoir à part">
                {site ? (
                  <ul className="space-y-1.5">
                    {A_LA_CARTE.filter(
                      (a) =>
                        a.libelle.startsWith("Page supplémentaire") ||
                        (o.id === "presence" && a.libelle.startsWith("Passage")),
                    ).map((a) => (
                      <li key={a.libelle} className="flex justify-between gap-3">
                        <span>{a.libelle}</span>
                        <span className="shrink-0 font-semibold text-foreground tabular-nums">
                          {euros(a.prix)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  (o.notes?.[0] ?? "Rien d'autre que ce qui est annoncé dans l'audit.")
                )}
              </BlocPrix>
            </div>
            {site && (
              <p className="mt-6 max-w-3xl text-base sm:text-[15px] leading-relaxed text-muted-foreground">
                Le site reste la propriété de Sitaly tant que dure l'abonnement : c'est ce qui
                permet d'inclure la création dans la mensualité. Si vous partez, vous pouvez le
                racheter (
                {RACHAT_SITE.map((r) => `${euros(r.prix)} ${r.periode.toLowerCase()}`).join(", ")}
                ). Votre nom de domaine vous est transféré gratuitement, et votre fiche Google reste
                la vôtre. {MENTION_TVA}.
              </p>
            )}
          </div>
        </section>

        {/* ---------- Réalisations ---------- */}
        {site && (
          <section className="border-t border-border bg-paper-sunk py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-3xl font-bold tracking-tight">Des sites livrés</h2>
                <Link
                  to="/realisations/"
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-ink sm:min-h-0"
                >
                  Toutes les réalisations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {REALISATIONS.slice(0, 3).map((r) => (
                  <div
                    key={r.slug}
                    className="lift group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
                  >
                    <Link to="/realisations/$slug/" params={{ slug: r.slug }}>
                      <img
                        src={r.capture.webp.w560}
                        srcSet={srcSetCapture(r)}
                        sizes="(min-width: 1024px) 400px, 100vw"
                        alt={`Le site de ${r.client}`}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover object-top"
                      />
                      <div className="p-5 pb-0">
                        <p className="font-display text-lg font-bold">{r.client}</p>
                        <p className="mt-1 text-base text-muted-foreground sm:text-sm">
                          {r.metier}, {r.zone}
                        </p>
                      </div>
                    </Link>
                    <div className="p-5 pt-3">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-brand-ink hover:underline sm:min-h-0 sm:text-sm"
                      >
                        {r.domaine}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------- Questions ---------- */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">Vos questions</h2>
            <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
              {faq.map((f) => (
                <details key={f.q} className="group p-5 sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <Plus className="h-4 w-4 shrink-0 transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Le questionnaire ---------- */}
        <section id="rappel" className="border-t border-border bg-paper-sunk py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">On démarre ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Deux écrans : votre activité, puis vos coordonnées. Vous recevez l'offre par e-mail,
              avec le lien pour réserver un appel de 30 minutes.
            </p>
            <Link to="/mon-projet/" search={{ offre: o.id }} className="bouton mt-8 px-7 py-3.5">
              Choisir cette offre
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </Link>
            {o.id === "presence" && (
              <div className="mt-10 border-t border-border pt-10 text-left">
                <FormulaireRappel />
              </div>
            )}
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}

function Ecart({
  titre,
  prix,
  lignes,
  lien,
}: {
  titre: string;
  prix: string;
  lignes: string[];
  lien: { label: string; offre: Offre };
}) {
  const page = pageOffre(lien.offre.id);
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-lg font-bold">{titre}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-ink">{prix}</p>
      <ul className="mt-4 flex-1 space-y-2.5 text-base sm:text-[15px]">
        {lignes.map((l) => (
          <li key={l} className="flex gap-3">
            <Plus className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
            <span>{l}</span>
          </li>
        ))}
      </ul>
      {page ? (
        <Link
          to="/offres/$id/"
          params={{ id: lien.offre.id }}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-ink"
        >
          {lien.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <Link
          to="/tarifs/"
          hash={lien.offre.id}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-ink"
        >
          {lien.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/* ---------------- Être rappelé ---------------- */

/** Un numéro exploitable par Ted : 10 chiffres à partir de 0, ou +33 et 9 chiffres. */
function telValide(brut: string) {
  const chiffres = brut.replace(/[\s.()-]/g, "");
  return /^0\d{9}$/.test(chiffres) || /^\+33\d{9}$/.test(chiffres);
}

/**
 * Bloc « Être rappelé », bas de /offres/presence/ seulement (SITA-46, section 1
 * du document `rappel-et-relance` de SITA-45).
 *
 * Trois champs, pas de champ e-mail : la page promet un rappel téléphonique, et
 * un champ de moins est un abandon de moins. L'envoi passe par le relais
 * `sitaly-forms` déjà en place (src/lib/formulaire.ts), qui écrit à Ted et
 * déclenche `generate_lead` avec `form_id: "rappel-presence"`. Rien d'autre :
 * aucun compte dans l'app, aucune session Stripe, aucun contact Brevo.
 */
function FormulaireRappel() {
  const [etat, setEtat] = useState<"saisie" | "envoi" | "envoye" | "erreur">("saisie");
  const [telFaux, setTelFaux] = useState(false);
  const champTel = useRef<HTMLInputElement>(null);

  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (etat === "envoi") return;
    const data = new FormData(event.currentTarget);
    const lire = (cle: string) => String(data.get(cle) || "").trim();
    const nom = lire("nom");
    const metier = lire("metier");
    const tel = lire("tel");

    if (!telValide(tel)) {
      setTelFaux(true);
      champTel.current?.focus();
      return;
    }
    setTelFaux(false);
    setEtat("envoi");

    /* Le relais exige `message` et recopie le métier depuis `profile`. Pas de
       nom de domaine suivi d'une barre oblique dans le texte : depuis le
       11 novembre, un message qui en contient part marqué « À vérifier ». */
    const resultat = await envoyerDemande(
      {
        name: nom,
        phone: tel,
        profile: metier,
        subject: "Être rappelé — page Présence",
        message:
          `Demande de rappel laissée en bas de la page Présence.\n` +
          `Métier : ${metier}\n` +
          `Pas d'e-mail laissé : rappeler au numéro ci-dessus.`,
        website: lire("website"),
      },
      "rappel-presence",
    );
    /* `indisponible` mène au même message que `erreur` : la demande est perdue
       dans les deux cas, et qui n'a pas laissé d'e-mail n'a pas envie d'en
       écrire un. */
    setEtat(resultat === "envoye" ? "envoye" : "erreur");
  }

  if (etat === "envoye") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
      >
        <h3 className="font-display text-xl font-bold">C'est noté.</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Je vous rappelle sous 24 heures ouvrées, au numéro que vous venez de laisser. Si c'est
          urgent, appelez le{" "}
          <a
            href={`tel:${SITALY_PHONE}`}
            className="font-semibold text-brand-ink underline-offset-4 hover:underline"
          >
            {SITALY_PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    );
  }

  if (etat === "erreur") {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-ink bg-card p-6 shadow-soft sm:p-8"
      >
        <h3 className="font-display text-xl font-bold">Votre demande n'est pas partie.</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Appelez le{" "}
          <a
            href={`tel:${SITALY_PHONE}`}
            className="font-semibold text-brand-ink underline-offset-4 hover:underline"
          >
            {SITALY_PHONE_DISPLAY}
          </a>
          , ou écrivez à{" "}
          <a
            href={`mailto:${SITALY_EMAIL}`}
            className="font-semibold text-brand-ink underline-offset-4 hover:underline"
          >
            {SITALY_EMAIL}
          </a>
          . Votre numéro n'a pas été enregistré : ne restez pas à attendre un rappel.
        </p>
      </div>
    );
  }

  const champ =
    "mt-2 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-[16px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <form
      onSubmit={envoyer}
      className="relative rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
    >
      <h3 className="font-display text-xl font-bold">Ou laissez votre numéro, je vous rappelle.</h3>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        Trois champs, pas de compte à créer. Je rappelle sous 24 heures ouvrées.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-3 sm:gap-4">
        <div>
          <label htmlFor="rappel-nom" className="font-semibold">
            Votre nom <span className="text-red-ink">*</span>
          </label>
          <input
            id="rappel-nom"
            name="nom"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Marie Dupont"
            className={champ}
          />
        </div>
        <div>
          <label htmlFor="rappel-metier" className="font-semibold">
            Votre métier <span className="text-red-ink">*</span>
          </label>
          <input
            id="rappel-metier"
            name="metier"
            type="text"
            required
            maxLength={120}
            autoComplete="organization-title"
            placeholder="Plombière, couvreur, carreleur…"
            className={champ}
          />
        </div>
        <div>
          <label htmlFor="rappel-tel" className="font-semibold">
            Votre téléphone <span className="text-red-ink">*</span>
          </label>
          <input
            ref={champTel}
            id="rappel-tel"
            name="tel"
            type="tel"
            required
            maxLength={30}
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            aria-invalid={telFaux}
            aria-describedby={telFaux ? "rappel-tel-erreur" : undefined}
            onChange={() => telFaux && setTelFaux(false)}
            className={telFaux ? champ.replace("border-input", "border-red-ink") : champ}
          />
          {telFaux && (
            <p id="rappel-tel-erreur" className="mt-1.5 text-sm text-red-ink">
              Ce numéro n'a pas le bon nombre de chiffres. Exemple : 06 12 34 56 78.
            </p>
          )}
        </div>
      </div>

      {/* Pot de miel : invisible pour un humain, rempli par les robots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="rappel-website">Ne pas remplir</label>
        <input id="rappel-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={etat === "envoi"}
        className="bouton mt-7 w-full px-6 py-3.5 disabled:opacity-70"
      >
        {etat === "envoi" ? "Envoi…" : "Être rappelé"}
        <ArrowRight className="bouton-fleche h-4 w-4" />
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        Votre numéro sert à vous rappeler, rien d'autre.{" "}
        <Link to="/politique-confidentialite/" className="underline underline-offset-2">
          Comment vos données sont traitées
        </Link>
      </p>
    </form>
  );
}

function BlocPrix({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-lg font-bold">{titre}</h3>
      <div className="mt-3 text-base sm:text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
