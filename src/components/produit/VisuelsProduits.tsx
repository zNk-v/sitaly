import { useState } from "react";
import {
  Bath,
  CalendarCheck,
  Check,
  Droplet,
  Flame,
  Hammer,
  Leaf,
  Lightbulb,
  PawPrint,
  Scissors,
  Sparkles,
  Utensils,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ProduitId } from "@/data/produits";

/**
 * Les visuels des pages produits (31 octobre 2026) : des morceaux de
 * l'application et des sites clients refaits en HTML, avec des données
 * d'exemple. La page Identité de marque porte un créateur de logo à essayer.
 */

const PANNEAU = "rounded-3xl bg-[#0d0f14] p-4 sm:p-8";

function Reservation() {
  const [jour, setJour] = useState(1);
  const [heure, setHeure] = useState("14:30");
  const jours = ["Mar. 3", "Mer. 4", "Jeu. 5", "Ven. 6", "Sam. 7"];
  const heures = ["09:00", "09:45", "10:30", "14:30", "15:15", "16:00"];
  return (
    <div className={`${PANNEAU} grid gap-4 md:grid-cols-[1.25fr_1fr] md:items-center`}>
      <div className="rounded-2xl bg-white p-5 sm:p-6">
        <div className="text-xs font-medium text-black/50">Atelier Lina · Coiffure à Nantes</div>
        <div className="mt-1 text-lg font-bold">Coupe femme</div>
        <div className="text-sm text-black/55">45 min · 38 €</div>
        <div className="mt-5 text-sm font-semibold">Choisissez un jour</div>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {jours.map((j, i) => (
            <button
              key={j}
              type="button"
              onClick={() => setJour(i)}
              aria-pressed={jour === i}
              className={`min-h-11 shrink-0 rounded-xl px-3 text-sm font-medium transition ${jour === i ? "bg-[#7c3aed] text-white" : "bg-black/[0.04] hover:bg-black/[0.08]"}`}
            >
              {j}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm font-semibold">Créneaux libres</div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {heures.map((h, i) => {
            const pris = (i + jour) % 4 === 0;
            return (
              <button
                key={h}
                type="button"
                disabled={pris}
                onClick={() => setHeure(h)}
                aria-pressed={heure === h}
                className={`min-h-11 rounded-xl text-sm font-medium transition disabled:text-black/25 disabled:line-through ${heure === h && !pris ? "bg-black/85 text-white" : "bg-black/[0.04] hover:bg-black/[0.08]"}`}
              >
                {h}
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-2xl bg-white/[0.06] p-5 text-white">
          <div className="flex items-center gap-2 text-sm text-[#c4b5fd]">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Nouveau rendez-vous
          </div>
          <div className="mt-2 font-semibold">
            Coupe femme · {jours[jour]} à {heure.replace(":", " h ")}
          </div>
          <div className="mt-1 text-sm text-white/60">Julie M. · 06 12 34 56 78</div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] p-5 text-white">
          <div className="text-sm text-white/60">Envoyé à Julie</div>
          <div className="mt-1 font-semibold">Votre rendez-vous est confirmé</div>
          <div className="mt-1 text-sm text-white/60">Un empêchement ? Annulez en un clic.</div>
        </div>
      </div>
    </div>
  );
}

function Blog() {
  const idees = [
    "Fuite sous l'évier : les gestes avant l'arrivée du plombier",
    "Chaudière gaz ou pompe à chaleur à Rennes",
    "Combien coûte un débouchage de canalisation ?",
  ];
  const [choisie, setChoisie] = useState(0);
  return (
    <div className={`${PANNEAU} grid gap-4 md:grid-cols-[1fr_1.3fr]`}>
      <div className="rounded-2xl bg-white/[0.06] p-5 text-white">
        <div className="flex items-center gap-2 text-sm text-[#c4b5fd]">
          <Lightbulb className="h-4 w-4" aria-hidden="true" /> Idées tirées de votre site
        </div>
        <div className="mt-4 space-y-2">
          {idees.map((i, k) => (
            <button
              key={i}
              type="button"
              onClick={() => setChoisie(k)}
              aria-pressed={choisie === k}
              className={`block w-full rounded-xl px-3.5 py-2.5 text-left text-sm transition ${choisie === k ? "bg-white text-black" : "bg-white/[0.06] text-white/80 hover:bg-white/[0.12]"}`}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#7c3aed] px-4 py-2.5 text-sm font-medium">
          <Sparkles className="h-4 w-4" aria-hidden="true" /> Écrire l'article
        </div>
      </div>
      <article className="rounded-2xl bg-white p-5 sm:p-7">
        <div className="text-xs font-medium text-black/45">plomberie-garnier.fr/blog/ · Brouillon</div>
        <h3 className="mt-2 text-xl leading-snug font-bold sm:text-2xl">{idees[choisie]}</h3>
        <p className="mt-3 text-[15px] leading-6 text-black/60">
          Les bons réflexes, ce qu'ils coûtent et le moment où appeler un professionnel.
        </p>
        <h4 className="mt-5 font-bold">Les trois premiers gestes</h4>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] text-black/75">
          <li>
            <strong>Couper l'eau</strong> au robinet d'arrivée, souvent sous l'évier ou près du compteur.
          </li>
          <li>Éponger et protéger le sol pour limiter les dégâts.</li>
          <li>Photographier la fuite pour votre assurance.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-xl bg-black/85 px-4 py-2 text-sm font-medium text-white">Publier sur mon site</span>
          <span className="rounded-xl border border-black/10 px-4 py-2 text-sm font-medium">Modifier le texte</span>
        </div>
      </article>
    </div>
  );
}

function Visibilite() {
  const points: [string, boolean][] = [
    ["Titre et description pour Google", true],
    ["Coordonnées complètes", true],
    ["Questions fréquentes sur le site", true],
    ["Note Google affichée sur le site", true],
    ["Au moins deux articles de blog", false],
    ["Votre propre nom de domaine", false],
  ];
  const score = 74;
  return (
    <div className={`${PANNEAU} grid gap-4 md:grid-cols-[1fr_1.2fr]`}>
      <div className="rounded-2xl bg-white p-5 sm:p-6">
        <div className="flex items-center gap-5">
          <svg viewBox="0 0 120 120" className="h-28 w-28 shrink-0" role="img" aria-label={`Score de visibilité : ${score} sur 100`}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#0000000f" strokeWidth="12" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 314} 314`}
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="68" textAnchor="middle" className="fill-black text-[28px] font-bold">
              {score}
            </text>
          </svg>
          <div>
            <div className="text-lg font-bold">Votre visibilité</div>
            <div className="text-sm text-black/55">Deux points pour passer au-dessus de 90.</div>
          </div>
        </div>
        <ul className="mt-5 space-y-2 text-[15px]">
          {points.map(([t, ok]) => (
            <li key={t} className="flex items-center gap-2.5">
              <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${ok ? "bg-[#16a34a] text-white" : "border border-black/20"}`}>
                {ok && <Check className="h-3 w-3" aria-hidden="true" />}
              </span>
              <span className={ok ? "" : "text-black/55"}>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 rounded-2xl bg-white/[0.06] p-5 text-white">
        <div className="text-sm text-[#c4b5fd]">plomberie-garnier.fr/llms.txt</div>
        <pre className="mt-3 overflow-x-auto font-mono text-[12.5px] leading-6 whitespace-pre-wrap text-white/80">
{`# Plomberie Garnier

> Plombier chauffagiste à Rennes. Dépannage
> sous 2 h, devis gratuit, du lundi au samedi.

## Services
- Dépannage de fuite : intervention sous 2 h
- Remplacement de chauffe-eau : dès 890 €
- Entretien de chaudière : 120 €

## Questions fréquentes
- Intervenez-vous le samedi ? Oui, de 8 h à 19 h.`}
        </pre>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Le créateur de logo : le visiteur tape son nom et règle son logo.
   --------------------------------------------------------------------------- */

const SYMBOLES: [string, LucideIcon][] = [
  ["Clé", Wrench],
  ["Goutte", Droplet],
  ["Flamme", Flame],
  ["Marteau", Hammer],
  ["Feuille", Leaf],
  ["Ciseaux", Scissors],
  ["Couverts", Utensils],
  ["Patte", PawPrint],
  ["Bain", Bath],
];
const COULEURS = ["#0a2540", "#1f3d2b", "#7a4b57", "#1f3dff", "#6a3b2a", "#141414"];
const POLICES: [string, string, number][] = [
  ["Moderne", "'Plus Jakarta Sans', sans-serif", 800],
  ["Élégante", "'Instrument Serif', Georgia, serif", 400],
  ["Sobre", "'Inter', sans-serif", 700],
];

function Marque() {
  const [nom, setNom] = useState("Atelier Lina");
  const [symbole, setSymbole] = useState(-1);
  const [rond, setRond] = useState(false);
  const [couleur, setCouleur] = useState(COULEURS[2]);
  const [police, setPolice] = useState(0);
  const affiche = nom.trim() || "Votre entreprise";
  const Icone = symbole >= 0 ? SYMBOLES[symbole][1] : null;
  const [, famille, graisse] = POLICES[police];
  const pastille = (taille: string, inverse?: boolean) => (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center font-bold ${rond ? "rounded-full" : "rounded-[22%]"}`}
      style={{ width: taille, height: taille, background: inverse ? "#fff" : couleur, color: inverse ? couleur : "#fff", fontFamily: famille }}
    >
      {Icone ? <Icone className="h-[52%] w-[52%]" /> : <span style={{ fontSize: `calc(${taille} * 0.5)` }}>{affiche.charAt(0).toUpperCase()}</span>}
    </span>
  );
  const ecrit = (taille: string, clair?: boolean) => (
    <span className="min-w-0 truncate leading-none tracking-[-0.02em]" style={{ fontFamily: famille, fontWeight: graisse, fontSize: taille, color: clair ? "#fff" : "#111" }}>
      {affiche}
    </span>
  );
  return (
    <div className={`${PANNEAU} grid gap-4 lg:grid-cols-[1fr_1.15fr]`}>
      <div className="space-y-5 rounded-2xl bg-white p-5 sm:p-6">
        <label className="block">
          <span className="text-sm font-semibold">Le nom de votre entreprise</span>
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            maxLength={32}
            className="mt-2 block min-h-12 w-full rounded-xl border border-black/15 px-4 text-base outline-none focus:border-black/50"
          />
        </label>
        <div>
          <div className="text-sm font-semibold">Symbole</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSymbole(-1)}
              aria-pressed={symbole === -1}
              aria-label="Initiale"
              className={`h-11 w-11 rounded-xl border text-sm font-bold ${symbole === -1 ? "border-black bg-black text-white" : "border-black/10 hover:bg-black/[0.04]"}`}
            >
              {affiche.charAt(0).toUpperCase()}
            </button>
            {SYMBOLES.map(([n, I], k) => (
              <button
                key={n}
                type="button"
                onClick={() => setSymbole(k)}
                aria-pressed={symbole === k}
                aria-label={n}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${symbole === k ? "border-black bg-black text-white" : "border-black/10 hover:bg-black/[0.04]"}`}
              >
                <I className="h-4 w-4" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-5">
          <div>
            <div className="text-sm font-semibold">Forme</div>
            <div className="mt-2 inline-flex rounded-xl bg-black/[0.05] p-1 text-sm">
              {[
                [false, "Carré"],
                [true, "Rond"],
              ].map(([v, l]) => (
                <button
                  key={String(l)}
                  type="button"
                  onClick={() => setRond(v as boolean)}
                  aria-pressed={rond === v}
                  className={`min-h-9 rounded-lg px-3 font-medium ${rond === v ? "bg-white shadow-sm" : "text-black/55"}`}
                >
                  {l as string}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Police</div>
            <div className="mt-2 inline-flex rounded-xl bg-black/[0.05] p-1 text-sm">
              {POLICES.map(([l], k) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setPolice(k)}
                  aria-pressed={police === k}
                  className={`min-h-9 rounded-lg px-3 font-medium ${police === k ? "bg-white shadow-sm" : "text-black/55"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold">Couleur</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {COULEURS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCouleur(c)}
                aria-pressed={couleur === c}
                aria-label={`Couleur ${c}`}
                className={`h-10 w-10 rounded-full ring-offset-2 ${couleur === c ? "ring-2 ring-black" : ""}`}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="grid min-w-0 gap-3">
        <div className="flex min-h-36 min-w-0 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-5 sm:gap-4">
          {pastille("3.4rem")}
          {ecrit("clamp(1.6rem, 4vw, 2.2rem)")}
        </div>
        <div className="flex min-h-24 min-w-0 items-center justify-center gap-3 overflow-hidden rounded-2xl px-5" style={{ background: couleur }}>
          {pastille("2.4rem", true)}
          {ecrit("1.4rem", true)}
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div className="min-w-0 rounded-2xl bg-white p-4">
            <div className="flex min-w-0 items-center gap-2">
              {pastille("1.8rem")}
              {ecrit("1.05rem")}
            </div>
            <div className="mt-4 text-xs leading-5 text-black/55">
              Coiffure à Nantes
              <br />
              02 40 00 00 00
            </div>
          </div>
          <div className="flex w-24 items-center justify-center rounded-2xl bg-white/[0.08]">{pastille("3.5rem")}</div>
        </div>
      </div>
    </div>
  );
}

export function VisuelProduit({ id }: { id: ProduitId }) {
  switch (id) {
    case "prise-de-rendez-vous":
      return <Reservation />;
    case "blog-ia":
      return <Blog />;
    case "referencement-seo-geo":
      return <Visibilite />;
    case "identite-de-marque":
      return <Marque />;
  }
}
