import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Plus, Printer, Trash2 } from "lucide-react";
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
import { BASE_URL } from "@/lib/sitemap";

/**
 * Le générateur de devis (9 novembre 2026), outil gratuit pour les
 * auto-entrepreneurs et les artisans. Tout se passe dans le navigateur : la
 * page n'envoie rien et ne garde rien. « Imprimer » copie la feuille à la
 * racine du document et masque le reste le temps de l'impression, ce qui
 * marche aussi sur iPhone. Les styles de la feuille (.dv…) vivent dans
 * src/styles.css : dans un <style> de la page, le CSS critique du build
 * retirait les règles d'impression. Les mentions suivent la liste de la section
 * « Les mentions obligatoires » plus bas : la revoir si la règle change.
 */

const URL = `${BASE_URL}/outils/generateur-devis-gratuit/`;
const TITRE = "Générateur de devis gratuit en ligne, PDF sans inscription | Sitaly";
const DESCRIPTION =
  "Remplissez vos lignes : le devis se met en page, avec les mentions obligatoires, prêt à imprimer ou à enregistrer en PDF. Pour auto-entrepreneurs et artisans. Gratuit, sans inscription.";

const TAUX = [
  { valeur: 20, label: "20 %" },
  { valeur: 10, label: "10 %" },
  { valeur: 5.5, label: "5,5 %" },
] as const;

const MENTIONS = [
  ["La date et le numéro", "La date du devis et sa durée de validité."],
  ["Votre identité", "Nom, adresse, SIREN ou SIRET, et « EI » pour un entrepreneur individuel."],
  ["Votre client", "Son nom et son adresse."],
  ["Le détail", "Chaque prestation avec sa quantité et son prix unitaire."],
  ["Les totaux", "Le total hors taxes, la TVA et le total à payer, ou la mention de franchise."],
  ["Les délais", "La date de début et la durée estimée des travaux ou de la prestation."],
  ["Le paiement", "L'acompte demandé et les conditions de règlement."],
  ["Dans le bâtiment", "Votre assurance décennale : l'assureur et la zone couverte."],
] as const;

const FAQ = [
  {
    q: "Le devis est-il obligatoire ?",
    a: "Il l'est pour les travaux et les dépannages dans le bâtiment au-delà de 150 € TTC, pour un déménagement, et pour les services à la personne au-delà de 100 € TTC par mois. Pour les autres prestations, il reste la meilleure preuve de ce que vous avez convenu avec votre client.",
  },
  {
    q: "Un auto-entrepreneur doit-il faire apparaître la TVA ?",
    a: "Non, tant qu'il reste sous les seuils de la franchise en base. Le devis affiche alors un seul total et la mention « TVA non applicable, article 293 B du CGI ». Cochez la case « Je ne facture pas la TVA » : l'outil l'écrit pour vous.",
  },
  {
    q: "Un devis signé vaut-il contrat ?",
    a: "Oui. Une fois daté et signé par votre client, il vous engage tous les deux : vous sur le prix et le contenu, lui sur le paiement.",
  },
  {
    q: "Peut-on faire payer un devis ?",
    a: "Un devis est gratuit par défaut. Vous pouvez le facturer si vous prévenez votre client avant de l'établir, par exemple quand il demande un déplacement ou une étude.",
  },
  {
    q: "Combien de temps un devis reste-t-il valable ?",
    a: "Vous fixez la durée. Trente jours conviennent à la plupart des prestations ; trois mois se voient dans le bâtiment. Passé ce délai, vous pouvez revoir vos prix.",
  },
  {
    q: "Mes informations sont-elles enregistrées ?",
    a: "Non. Le devis se construit dans votre navigateur : la page n'envoie rien à Sitaly et ne garde rien après fermeture.",
  },
];

const CHAMP =
  "mt-2 h-11 w-full rounded-2xl bg-black/[0.04] px-4 outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/15";

export const Route = createFileRoute("/outils/generateur-devis-gratuit")({
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
              name: "Générateur de devis gratuit",
              description: DESCRIPTION,
              url: URL,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
              provider: { "@type": "Organization", name: "Sitaly", url: BASE_URL },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Outils", item: `${BASE_URL}/outils/` },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Générateur de devis gratuit",
                  item: URL,
                },
              ],
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
  component: GenerateurDevis,
});

interface Ligne {
  cle: number;
  designation: string;
  quantite: string;
  unite: string;
  prix: string;
}

interface Saisie {
  nom: string;
  adresse: string;
  siret: string;
  telephone: string;
  email: string;
  client: string;
  clientAdresse: string;
  numero: string;
  date: string;
  validite: string;
  objet: string;
  debut: string;
  duree: string;
  acompte: string;
  paiement: string;
  assureur: string;
}

const DEPART: Saisie = {
  nom: "",
  adresse: "",
  siret: "",
  telephone: "",
  email: "",
  client: "",
  clientAdresse: "",
  numero: "D-001",
  date: "",
  validite: "30",
  objet: "",
  debut: "",
  duree: "",
  acompte: "30",
  paiement: "Solde à la fin de la prestation, par virement.",
  assureur: "",
};

const nombre = (texte: string) => {
  const n = Number.parseFloat(texte.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
const dateFr = (iso: string) => {
  const [a, m, j] = iso.split("-").map(Number);
  if (!a || !m || !j) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(a, m - 1, j));
};

function GenerateurDevis() {
  const id = useId();
  const feuille = useRef<HTMLDivElement>(null);
  const prochaineCle = useRef(2);
  const [s, setS] = useState<Saisie>(DEPART);
  const [franchise, setFranchise] = useState(true);
  const [taux, setTaux] = useState<number>(20);
  const [lignes, setLignes] = useState<Ligne[]>([
    { cle: 1, designation: "", quantite: "1", unite: "", prix: "" },
  ]);

  // La date du jour se pose dans le navigateur : la page est prérendue.
  useEffect(() => {
    const d = new Date();
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setS((avant) => (avant.date ? avant : { ...avant, date: iso }));
  }, []);

  const maj = (cle: keyof Saisie, valeur: string) => setS((avant) => ({ ...avant, [cle]: valeur }));
  const majLigne = (cle: number, champ: keyof Omit<Ligne, "cle">, valeur: string) =>
    setLignes((avant) => avant.map((l) => (l.cle === cle ? { ...l, [champ]: valeur } : l)));

  const ht = lignes.reduce((somme, l) => somme + nombre(l.quantite) * nombre(l.prix), 0);
  const tva = franchise ? 0 : (ht * taux) / 100;
  const total = ht + tva;
  const acompte = Math.min(nombre(s.acompte), 100);
  const remplies = lignes.filter((l) => l.designation.trim() || nombre(l.prix) > 0);

  function imprimer() {
    if (!feuille.current) return;
    document.getElementById("devis-impression")?.remove();
    const copie = feuille.current.cloneNode(true) as HTMLElement;
    copie.id = "devis-impression";
    copie.removeAttribute("style");
    document.body.appendChild(copie);
    document.body.classList.add("impression-devis");
    const titre = document.title;
    document.title = `Devis ${s.numero.replace(/[^\w-]/g, "") || "sans-numero"}`;
    const ranger = () => {
      document.body.classList.remove("impression-devis");
      copie.remove();
      document.title = titre;
      window.removeEventListener("afterprint", ranger);
    };
    window.addEventListener("afterprint", ranger);
    window.print();
  }

  const champ = (
    cle: keyof Saisie,
    label: string,
    placeholder: string,
    extra?: { type?: string; facultatif?: boolean; autoComplete?: string },
  ) => (
    <div>
      <label htmlFor={`${id}-${cle}`} className="text-sm font-semibold">
        {label}
        {extra?.facultatif && <span className="font-normal text-black/50"> (facultatif)</span>}
      </label>
      <input
        id={`${id}-${cle}`}
        type={extra?.type ?? "text"}
        autoComplete={extra?.autoComplete ?? "off"}
        value={s[cle]}
        onChange={(e) => maj(cle, e.target.value)}
        maxLength={200}
        placeholder={placeholder}
        className={CHAMP}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium text-brand-ink">
              <Link to="/outils/" className="hover:underline">
                Outil gratuit
              </Link>
            </div>
            <h1 className="titre-produit mt-3 text-[2.4rem] sm:text-6xl lg:text-7xl">
              Générateur de devis gratuit
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Remplissez vos lignes : le devis se met en page avec les mentions obligatoires, prêt à
              imprimer ou à enregistrer en PDF. Sans inscription. Rien ne quitte votre navigateur.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-8 rounded-3xl border border-black/[0.08] bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] sm:p-7"
            >
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Votre entreprise</h2>
                {champ("nom", "Nom", "Ex. : Julie Dupont EI, ou Dupont Plomberie SARL", {
                  autoComplete: "organization",
                })}
                {champ("adresse", "Adresse", "Ex. : 12 rue des Lilas, 44000 Nantes")}
                <div className="grid gap-4 sm:grid-cols-2">
                  {champ("siret", "SIRET", "14 chiffres")}
                  {champ("telephone", "Téléphone", "Ex. : 06 12 34 56 78", {
                    type: "tel",
                    autoComplete: "tel",
                  })}
                </div>
                {champ("email", "E-mail", "Ex. : contact@dupont-plomberie.fr", {
                  type: "email",
                  autoComplete: "email",
                  facultatif: true,
                })}
                <label className="flex cursor-pointer items-start gap-3 text-[15px]">
                  <input
                    type="checkbox"
                    checked={franchise}
                    onChange={(e) => setFranchise(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-black"
                  />
                  <span>Je ne facture pas la TVA (auto-entrepreneur en franchise en base)</span>
                </label>
                {!franchise && (
                  <fieldset>
                    <legend className="text-sm font-semibold">Taux de TVA</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {TAUX.map((t) => (
                        <button
                          key={t.valeur}
                          type="button"
                          aria-pressed={taux === t.valeur}
                          onClick={() => setTaux(t.valeur)}
                          className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                            taux === t.valeur
                              ? "bg-black/85 text-white"
                              : "bg-black/[0.04] text-black/70 hover:bg-black/[0.08]"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Votre client</h2>
                {champ("client", "Nom du client", "Ex. : M. et Mme Martin")}
                {champ(
                  "clientAdresse",
                  "Adresse du client",
                  "Ex. : 5 avenue du Parc, 44300 Nantes",
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Le devis</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {champ("numero", "Numéro", "Ex. : D-001")}
                  {champ("date", "Date", "", { type: "date" })}
                  {champ("validite", "Validité, en jours", "30")}
                </div>
                {champ("objet", "Objet", "Ex. : Remplacement d'un chauffe-eau", {
                  facultatif: true,
                })}

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Les prestations</div>
                  {lignes.map((l, k) => (
                    <div key={l.cle} className="rounded-2xl bg-black/[0.03] p-3">
                      <div className="flex items-center gap-2">
                        <input
                          aria-label={`Désignation de la ligne ${k + 1}`}
                          value={l.designation}
                          onChange={(e) => majLigne(l.cle, "designation", e.target.value)}
                          maxLength={240}
                          placeholder="Désignation. Ex. : Pose d'un chauffe-eau 200 L"
                          className="h-10 w-full rounded-xl bg-white px-3 outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/15"
                        />
                        <button
                          type="button"
                          aria-label={`Supprimer la ligne ${k + 1}`}
                          disabled={lignes.length === 1}
                          onClick={() => setLignes((avant) => avant.filter((x) => x.cle !== l.cle))}
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-black/50 transition hover:text-black disabled:opacity-30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <input
                          aria-label={`Quantité de la ligne ${k + 1}`}
                          inputMode="decimal"
                          value={l.quantite}
                          onChange={(e) => majLigne(l.cle, "quantite", e.target.value)}
                          placeholder="Quantité"
                          className="h-10 w-full rounded-xl bg-white px-3 outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/15"
                        />
                        <input
                          aria-label={`Unité de la ligne ${k + 1}`}
                          value={l.unite}
                          onChange={(e) => majLigne(l.cle, "unite", e.target.value)}
                          maxLength={16}
                          placeholder="Unité (h, m², forfait)"
                          className="h-10 w-full rounded-xl bg-white px-3 outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/15"
                        />
                        <input
                          aria-label={`Prix unitaire hors taxes de la ligne ${k + 1}`}
                          inputMode="decimal"
                          value={l.prix}
                          onChange={(e) => majLigne(l.cle, "prix", e.target.value)}
                          placeholder="Prix unitaire HT"
                          className="h-10 w-full rounded-xl bg-white px-3 outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/15"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const cle = prochaineCle.current;
                      prochaineCle.current += 1;
                      setLignes((avant) => [
                        ...avant,
                        { cle, designation: "", quantite: "1", unite: "", prix: "" },
                      ]);
                    }}
                    className={`${BOUTON_CLAIR} w-full`}
                  >
                    <Plus className="h-4 w-4" /> Ajouter une ligne
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Délais et paiement</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {champ("debut", "Début prévu", "Ex. : semaine du 23 novembre", {
                    facultatif: true,
                  })}
                  {champ("duree", "Durée estimée", "Ex. : 2 jours", { facultatif: true })}
                </div>
                <div className="grid gap-4 sm:grid-cols-[9rem_1fr]">
                  {champ("acompte", "Acompte, en %", "30")}
                  {champ("paiement", "Conditions de paiement", "Ex. : solde à la fin du chantier")}
                </div>
                {champ(
                  "assureur",
                  "Assurance décennale",
                  "Bâtiment : assureur, numéro de contrat, zone couverte",
                  { facultatif: true },
                )}
              </div>
            </form>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className={`${CARTE} p-3 sm:p-5`}>
                <div
                  ref={feuille}
                  className="dv rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08)] sm:p-8"
                >
                  <div className="dv-haut">
                    <div>
                      <div className="dv-nom">{s.nom.trim() || "Votre entreprise"}</div>
                      <div className="dv-petit">
                        {s.adresse.trim() && <div>{s.adresse.trim()}</div>}
                        {s.siret.trim() && <div>SIRET : {s.siret.trim()}</div>}
                        {s.telephone.trim() && <div>{s.telephone.trim()}</div>}
                        {s.email.trim() && <div>{s.email.trim()}</div>}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className="dv-titre">Devis</p>
                      <div className="dv-petit">
                        <div>N° {s.numero.trim() || "…"}</div>
                        {s.date && <div>Le {dateFr(s.date)}</div>}
                        {nombre(s.validite) > 0 && <div>Valable {nombre(s.validite)} jours</div>}
                      </div>
                    </div>
                  </div>

                  <div className="dv-blocs">
                    <div />
                    <div>
                      <div className="dv-etiquette">Client</div>
                      <div className="dv-nom">{s.client.trim() || "Nom du client"}</div>
                      {s.clientAdresse.trim() && (
                        <div className="dv-petit">{s.clientAdresse.trim()}</div>
                      )}
                    </div>
                  </div>

                  {s.objet.trim() && <div className="dv-objet">Objet : {s.objet.trim()}</div>}

                  <table>
                    <thead>
                      <tr>
                        <th>Désignation</th>
                        <th className="dv-d">Qté</th>
                        <th className="dv-d">Prix unitaire HT</th>
                        <th className="dv-d">Total HT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(remplies.length ? remplies : lignes.slice(0, 1)).map((l) => (
                        <tr key={l.cle}>
                          <td>{l.designation.trim() || "Votre première prestation"}</td>
                          <td className="dv-d">
                            {nombre(l.quantite).toLocaleString("fr-FR")}
                            {l.unite.trim() ? ` ${l.unite.trim()}` : ""}
                          </td>
                          <td className="dv-d">{euros(nombre(l.prix))}</td>
                          <td className="dv-d">{euros(nombre(l.quantite) * nombre(l.prix))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="dv-totaux">
                    {!franchise && (
                      <>
                        <div className="dv-ligne">
                          <span>Total HT</span>
                          <span>{euros(ht)}</span>
                        </div>
                        <div className="dv-ligne">
                          <span>TVA {taux.toLocaleString("fr-FR")} %</span>
                          <span>{euros(tva)}</span>
                        </div>
                      </>
                    )}
                    <div className="dv-ligne dv-total">
                      <span>{franchise ? "Total à payer" : "Total TTC"}</span>
                      <span>{euros(total)}</span>
                    </div>
                    {franchise && (
                      <div className="dv-petit" style={{ textAlign: "right", marginTop: 4 }}>
                        TVA non applicable, art. 293 B du CGI
                      </div>
                    )}
                  </div>

                  <div className="dv-notes">
                    {(s.debut.trim() || s.duree.trim()) && (
                      <p>
                        {s.debut.trim() && `Début prévu : ${s.debut.trim()}. `}
                        {s.duree.trim() && `Durée estimée : ${s.duree.trim()}.`}
                      </p>
                    )}
                    {acompte > 0 && (
                      <p>
                        Acompte de {acompte.toLocaleString("fr-FR")} % à la commande, soit{" "}
                        {euros((total * acompte) / 100)}.
                      </p>
                    )}
                    {s.paiement.trim() && <p>{s.paiement.trim()}</p>}
                    {s.assureur.trim() && <p>Assurance décennale : {s.assureur.trim()}</p>}
                    <p>Devis gratuit.</p>
                  </div>

                  <div className="dv-signature">
                    Date et signature du client, précédées de la mention « Bon pour accord »
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 px-2 pb-2">
                  <button type="button" onClick={imprimer} className={BOUTON_NOIR}>
                    <Printer className="h-4 w-4" /> Imprimer ou enregistrer en PDF
                  </button>
                  <span className={`text-sm ${TEXTE_GRIS}`}>
                    Dans la fenêtre d'impression, choisissez « Enregistrer au format PDF ».
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Repères"
              titre="Les mentions obligatoires d'un devis"
              sousTitre="Le formulaire les demande dans cet ordre. Un devis complet vous protège autant que votre client."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MENTIONS.map(([titre, texte], k) => (
                <div key={titre} className={`${CARTE} p-6`}>
                  <div className="text-sm font-semibold text-brand-ink">
                    {String(k + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-3 text-lg font-semibold">{titre}</div>
                  <p className={`mt-1 ${TEXTE_GRIS}`}>{texte}</p>
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
            <h2 className="titre-produit text-[2rem] sm:text-5xl">
              Un devis par semaine, ou dix ?
            </h2>
            <p className={`mx-auto mt-4 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Dans Sitaly, vos coordonnées et vos clients sont déjà là. Votre client accepte le
              devis en ligne, et le devis devient une facture en un clic. Devis illimités, gratuit
              pour commencer.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={lienCreation()} className={`${BOUTON_NOIR} px-6 py-3.5 text-base`}>
                Essayer Sitaly <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/produits/$id/"
                params={{ id: "devis-et-factures" }}
                className={`${BOUTON_CLAIR} px-6 py-3.5 text-base`}
              >
                Voir les devis et factures
              </Link>
            </div>
            <Confiance />
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
