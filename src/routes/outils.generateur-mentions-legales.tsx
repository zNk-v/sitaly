import { createFileRoute, Link } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { ArrowRight, Check, Copy, Download } from "lucide-react";
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
 * Le générateur de mentions légales (9 novembre 2026), outil gratuit pour ceux
 * qui lancent leur site. Tout se passe dans le navigateur : la page n'envoie
 * rien, ni à Sitaly ni ailleurs. Le texte suit la liste de l'article
 * /blog/mentions-legales-site-internet/ (LCEN) ; les adresses des hébergeurs
 * proposés sont à revoir si l'un d'eux déménage.
 */

const URL = `${BASE_URL}/outils/generateur-mentions-legales/`;
const TITRE = "Générateur de mentions légales gratuit pour site internet | Sitaly";
const DESCRIPTION =
  "Remplissez le formulaire : vos mentions légales s'écrivent sous vos yeux, prêtes à copier sur votre site. Auto-entrepreneur, entreprise individuelle ou société. Gratuit, sans inscription.";

type Statut = "ei" | "societe";

const FORMES = ["SARL", "EURL", "SAS", "SASU", "SA", "SCI", "Association"] as const;

const HEBERGEURS = [
  {
    id: "ovh",
    label: "OVHcloud",
    nom: "OVH SAS",
    adresse: "2 rue Kellermann, 59100 Roubaix, France",
    contact: "Téléphone : 1007",
  },
  {
    id: "ionos",
    label: "IONOS",
    nom: "IONOS SARL",
    adresse: "7 place de la Gare, BP 70109, 57200 Sarreguemines, France",
    contact: "Site : ionos.fr",
  },
  {
    id: "wix",
    label: "Wix",
    nom: "Wix.com Ltd.",
    adresse: "40 Namal Tel Aviv St., Tel Aviv 6350671, Israël",
    contact: "Site : wix.com",
  },
  { id: "autre", label: "Un autre", nom: "", adresse: "", contact: "" },
] as const;
type HebergeurId = (typeof HEBERGEURS)[number]["id"];

const FAQ = [
  {
    q: "Les mentions légales sont-elles obligatoires ?",
    a: "Oui, pour tout site professionnel, même une seule page. La loi pour la confiance dans l'économie numérique (LCEN) demande de dire qui édite le site et qui l'héberge. Elle prévoit jusqu'à un an d'emprisonnement et 75 000 € d'amende pour une personne physique, 375 000 € pour une société.",
  },
  {
    q: "Je travaille chez moi : dois-je afficher mon adresse personnelle ?",
    a: "La loi demande l'adresse où votre entreprise est établie. Si c'est votre domicile et que vous ne voulez pas le publier, une société de domiciliation vous fournit une adresse professionnelle à déclarer puis à afficher.",
  },
  {
    q: "Qui est le directeur de la publication ?",
    a: "La personne responsable de ce que le site publie. Pour un entrepreneur individuel, c'est vous. Pour une société, c'est son représentant légal : le gérant ou le président.",
  },
  {
    q: "Comment trouver l'hébergeur de mon site ?",
    a: "C'est l'entreprise qui stocke votre site et le rend accessible : celle à qui vous payez l'hébergement, ou l'éditeur de l'outil avec lequel vous avez créé le site. Son nom, son adresse et son téléphone figurent dans ses propres mentions légales.",
  },
  {
    q: "Où placer les mentions légales sur mon site ?",
    a: "Sur une page à part, avec un lien visible depuis toutes les pages. Le pied de page est l'endroit où vos visiteurs le cherchent.",
  },
  {
    q: "Ce texte suffit-il pour être en règle ?",
    a: "Il couvre l'identité de l'éditeur et de l'hébergeur. Un site qui recueille des données personnelles a aussi besoin d'une politique de confidentialité, et une boutique en ligne de conditions générales de vente. Pour une activité réglementée, faites relire le texte par un professionnel du droit.",
  },
];

const CHAMP =
  "mt-2 h-11 w-full rounded-2xl bg-black/[0.04] px-4 outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/15";
const VIDE = "[à compléter]";

export const Route = createFileRoute("/outils/generateur-mentions-legales")({
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
              name: "Générateur de mentions légales",
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
                  name: "Générateur de mentions légales",
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
  component: GenerateurMentions,
});

interface Saisie {
  statut: Statut;
  site: string;
  nom: string;
  nomCommercial: string;
  forme: string;
  capital: string;
  adresse: string;
  telephone: string;
  email: string;
  siren: string;
  rcs: string;
  franchise: boolean;
  tva: string;
  directeur: string;
  hebergeur: HebergeurId;
  hebNom: string;
  hebAdresse: string;
  hebContact: string;
  reglementee: boolean;
  titre: string;
  ordre: string;
  decennale: boolean;
  assureur: string;
  zone: string;
  mediation: boolean;
  mediateur: string;
  formulaire: boolean;
}

const DEPART: Saisie = {
  statut: "ei",
  site: "",
  nom: "",
  nomCommercial: "",
  forme: "SARL",
  capital: "",
  adresse: "",
  telephone: "",
  email: "",
  siren: "",
  rcs: "",
  franchise: true,
  tva: "",
  directeur: "",
  hebergeur: "ovh",
  hebNom: "",
  hebAdresse: "",
  hebContact: "",
  reglementee: false,
  titre: "",
  ordre: "",
  decennale: false,
  assureur: "",
  zone: "France métropolitaine",
  mediation: false,
  mediateur: "",
  formulaire: true,
};

/** Le texte des mentions, section par section, et le nombre de champs encore vides. */
function ecrireMentions(s: Saisie): { texte: string; manquants: number } {
  let manquants = 0;
  const v = (valeur: string) => {
    const net = valeur.trim();
    if (net) return net;
    manquants += 1;
    return VIDE;
  };
  const site = s.site.trim() || "ce site";
  const sujet = s.site.trim() ? `Le site ${s.site.trim()}` : "Ce site";
  const blocs: string[] = [];

  const editeur: string[] = [];
  if (s.statut === "ei") {
    editeur.push(`${sujet} est édité par ${v(s.nom)}, entrepreneur individuel (EI).`);
    if (s.nomCommercial.trim()) editeur.push(`Nom commercial : ${s.nomCommercial.trim()}`);
    editeur.push(`Adresse : ${v(s.adresse)}`);
    editeur.push(`SIREN : ${v(s.siren)}`);
    if (s.rcs.trim()) editeur.push(`Immatriculation : RCS ${s.rcs.trim()}`);
  } else {
    const capital = s.forme === "Association" ? "" : ` au capital de ${v(s.capital)} €`;
    editeur.push(`${sujet} est édité par ${v(s.nom)}, ${s.forme}${capital}.`);
    editeur.push(`Siège social : ${v(s.adresse)}`);
    editeur.push(
      s.forme === "Association"
        ? `SIREN : ${v(s.siren)}`
        : `Immatriculation : RCS ${v(s.rcs)} ${v(s.siren)}`,
    );
  }
  editeur.push(
    s.franchise
      ? "TVA non applicable, article 293 B du Code général des impôts."
      : `Numéro de TVA intracommunautaire : ${v(s.tva)}`,
  );
  editeur.push(`Téléphone : ${v(s.telephone)}`);
  editeur.push(`E-mail : ${v(s.email)}`);
  blocs.push(`ÉDITEUR DU SITE\n${editeur.join("\n")}`);

  const directeur = s.statut === "ei" ? s.directeur.trim() || s.nom : s.directeur;
  blocs.push(`DIRECTEUR DE LA PUBLICATION\n${v(directeur)}`);

  const preset = HEBERGEURS.find((h) => h.id === s.hebergeur);
  const heb =
    preset && preset.id !== "autre"
      ? [preset.nom, preset.adresse, preset.contact]
      : [v(s.hebNom), v(s.hebAdresse), s.hebContact.trim()].filter(Boolean);
  blocs.push(`HÉBERGEMENT\nLe site est hébergé par :\n${heb.join("\n")}`);

  if (s.reglementee) {
    blocs.push(
      `PROFESSION RÉGLEMENTÉE\nTitre professionnel : ${v(s.titre)}, obtenu en France.\nOrdre ou organisme professionnel : ${v(s.ordre)}`,
    );
  }
  if (s.decennale) {
    blocs.push(
      `ASSURANCE PROFESSIONNELLE\nAssurance de responsabilité décennale souscrite auprès de ${v(s.assureur)}.\nCouverture géographique : ${v(s.zone)}`,
    );
  }
  if (s.mediation) {
    blocs.push(
      `MÉDIATION DE LA CONSOMMATION\nEn cas de litige, le client particulier peut recourir gratuitement au médiateur de la consommation : ${v(s.mediateur)}`,
    );
  }

  blocs.push(
    `PROPRIÉTÉ INTELLECTUELLE\nLes textes, les images et le logo de ${site} appartiennent à leur éditeur ou sont utilisés avec l'accord de leurs auteurs. Toute reproduction sans autorisation écrite est interdite.`,
  );

  if (s.formulaire) {
    const email = s.email.trim() || VIDE;
    blocs.push(
      `DONNÉES PERSONNELLES\nLes informations envoyées par le formulaire de contact servent à répondre à votre demande. Elles ne sont ni vendues ni cédées. Vous pouvez demander à les consulter, les corriger ou les effacer en écrivant à ${email}. Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).`,
    );
  }

  blocs.push("DROIT APPLICABLE\nLe site est soumis au droit français.");

  return { texte: `MENTIONS LÉGALES\n\n${blocs.join("\n\n")}`, manquants };
}

function GenerateurMentions() {
  const id = useId();
  const [s, setS] = useState<Saisie>(DEPART);
  const [copie, setCopie] = useState(false);
  const maj = <K extends keyof Saisie>(cle: K, valeur: Saisie[K]) =>
    setS((avant) => ({ ...avant, [cle]: valeur }));
  const { texte, manquants } = useMemo(() => ecrireMentions(s), [s]);

  function telecharger() {
    const lien = document.createElement("a");
    lien.href = globalThis.URL.createObjectURL(
      new Blob([texte], { type: "text/plain;charset=utf-8" }),
    );
    lien.download = "mentions-legales.txt";
    lien.click();
    globalThis.URL.revokeObjectURL(lien.href);
  }

  const texteChamp = (
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
        value={s[cle] as string}
        onChange={(e) => maj(cle, e.target.value as never)}
        maxLength={160}
        placeholder={placeholder}
        className={CHAMP}
      />
    </div>
  );

  const caseACocher = (cle: keyof Saisie, label: string) => (
    <label className="flex cursor-pointer items-start gap-3 text-[15px]">
      <input
        type="checkbox"
        checked={s[cle] as boolean}
        onChange={(e) => maj(cle, e.target.checked as never)}
        className="mt-1 h-4 w-4 shrink-0 accent-black"
      />
      <span>{label}</span>
    </label>
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
              Générateur de mentions légales
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Remplissez le formulaire : le texte s'écrit à droite, prêt à copier sur votre site.
              Gratuit, sans inscription. Rien ne quitte votre navigateur.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-8 rounded-3xl border border-black/[0.08] bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] sm:p-7"
            >
              <fieldset>
                <legend className="text-sm font-semibold">Votre statut</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      ["ei", "Auto-entrepreneur ou entreprise individuelle"],
                      ["societe", "Société ou association"],
                    ] as const
                  ).map(([valeur, label]) => (
                    <button
                      key={valeur}
                      type="button"
                      aria-pressed={s.statut === valeur}
                      onClick={() => maj("statut", valeur)}
                      className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                        s.statut === valeur
                          ? "bg-black/85 text-white"
                          : "bg-black/[0.04] text-black/70 hover:bg-black/[0.08]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">L'éditeur du site</h2>
                {texteChamp("site", "Adresse du site", "Ex. : dupont-plomberie.fr", {
                  facultatif: true,
                })}
                {s.statut === "ei" ? (
                  <>
                    {texteChamp("nom", "Prénom et nom", "Ex. : Julie Dupont", {
                      autoComplete: "name",
                    })}
                    {texteChamp("nomCommercial", "Nom commercial", "Ex. : Dupont Plomberie", {
                      facultatif: true,
                    })}
                  </>
                ) : (
                  <>
                    {texteChamp("nom", "Dénomination", "Ex. : Dupont Plomberie")}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor={`${id}-forme`} className="text-sm font-semibold">
                          Forme juridique
                        </label>
                        <select
                          id={`${id}-forme`}
                          value={s.forme}
                          onChange={(e) => maj("forme", e.target.value)}
                          className={CHAMP}
                        >
                          {FORMES.map((f) => (
                            <option key={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                      {s.forme !== "Association" &&
                        texteChamp("capital", "Capital social, en euros", "Ex. : 1 000")}
                    </div>
                  </>
                )}
                {texteChamp(
                  "adresse",
                  s.statut === "ei" ? "Adresse de l'entreprise" : "Adresse du siège social",
                  "Ex. : 12 rue des Lilas, 44000 Nantes",
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  {texteChamp("siren", "Numéro SIREN", "9 chiffres")}
                  {s.forme !== "Association" || s.statut === "ei"
                    ? texteChamp("rcs", "Ville du RCS", "Ex. : Nantes", {
                        facultatif: s.statut === "ei",
                      })
                    : null}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {texteChamp("telephone", "Téléphone", "Ex. : 06 12 34 56 78", {
                    type: "tel",
                    autoComplete: "tel",
                  })}
                  {texteChamp("email", "E-mail", "Ex. : contact@dupont-plomberie.fr", {
                    type: "email",
                    autoComplete: "email",
                  })}
                </div>
                {caseACocher("franchise", "Je ne facture pas la TVA (franchise en base)")}
                {!s.franchise &&
                  texteChamp("tva", "Numéro de TVA intracommunautaire", "Ex. : FR 12 345678901")}
                {s.statut === "societe" &&
                  texteChamp(
                    "directeur",
                    "Directeur de la publication",
                    "Le gérant ou le président. Ex. : Julie Dupont, gérante",
                  )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">L'hébergeur du site</h2>
                <div className="flex flex-wrap gap-2">
                  {HEBERGEURS.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      aria-pressed={s.hebergeur === h.id}
                      onClick={() => maj("hebergeur", h.id)}
                      className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                        s.hebergeur === h.id
                          ? "bg-black/85 text-white"
                          : "bg-black/[0.04] text-black/70 hover:bg-black/[0.08]"
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
                {s.hebergeur === "autre" ? (
                  <>
                    {texteChamp("hebNom", "Nom de l'hébergeur", "Sa raison sociale")}
                    {texteChamp(
                      "hebAdresse",
                      "Adresse de l'hébergeur",
                      "Rue, code postal, ville, pays",
                    )}
                    {texteChamp(
                      "hebContact",
                      "Téléphone ou site de l'hébergeur",
                      "Ex. : Téléphone : 09 …",
                      {
                        facultatif: true,
                      },
                    )}
                  </>
                ) : (
                  <p className={`text-sm ${TEXTE_GRIS}`}>
                    Adresse relevée dans les mentions légales de l'hébergeur. Vérifiez-la sur son
                    site avant de publier.
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Votre activité</h2>
                {caseACocher("formulaire", "Mon site a un formulaire de contact")}
                {caseACocher(
                  "mediation",
                  "Je vends à des particuliers (un médiateur de la consommation est obligatoire)",
                )}
                {s.mediation &&
                  texteChamp("mediateur", "Votre médiateur", "Son nom et l'adresse de son site")}
                {caseACocher("decennale", "Je travaille dans le bâtiment (assurance décennale)")}
                {s.decennale && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {texteChamp("assureur", "Assureur", "Nom et adresse de l'assureur")}
                    {texteChamp("zone", "Zone couverte", "Ex. : France métropolitaine")}
                  </div>
                )}
                {caseACocher(
                  "reglementee",
                  "J'exerce une profession réglementée (avocat, ostéopathe, architecte…)",
                )}
                {s.reglementee && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {texteChamp("titre", "Titre professionnel", "Ex. : Ostéopathe D.O.")}
                    {texteChamp("ordre", "Ordre ou organisme", "Ex. : ARS Pays de la Loire")}
                  </div>
                )}
              </div>
            </form>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className={`${CARTE} p-5 sm:p-7`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Vos mentions légales</h2>
                  <span
                    aria-live="polite"
                    className={`rounded-full px-2.5 py-1 text-[13px] font-medium ${
                      manquants === 0
                        ? "bg-[#16a34a]/10 text-[#15803d]"
                        : "bg-black/[0.05] text-black/60"
                    }`}
                  >
                    {manquants === 0
                      ? "Texte complet"
                      : `${manquants} champ${manquants > 1 ? "s" : ""} à compléter`}
                  </span>
                </div>
                <pre
                  id="texte-mentions"
                  className="mt-4 max-h-[32rem] overflow-y-auto rounded-2xl bg-white p-5 font-sans text-[15px] leading-6 whitespace-pre-wrap text-black/80"
                >
                  {texte}
                </pre>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard?.writeText(texte);
                      setCopie(true);
                      setTimeout(() => setCopie(false), 1800);
                    }}
                    className={BOUTON_NOIR}
                  >
                    {copie ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copie ? "Texte copié" : "Copier le texte"}
                  </button>
                  <button type="button" onClick={telecharger} className={BOUTON_CLAIR}>
                    <Download className="h-4 w-4" /> Télécharger
                  </button>
                </div>
                <p className={`mt-4 text-sm ${TEXTE_GRIS}`}>
                  Ce modèle donne une base à relire. Pour une activité réglementée ou un cas
                  particulier, demandez conseil à un professionnel du droit.
                </p>
              </div>
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
            <p className={`mt-8 text-center ${TEXTE_GRIS}`}>
              La liste complète, statut par statut :{" "}
              <Link
                to="/blog/$slug/"
                params={{ slug: "mentions-legales-site-internet" }}
                className="font-semibold text-black/85 underline-offset-4 hover:underline"
              >
                les mentions légales d'un site professionnel
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-4 pt-8 pb-28 sm:px-6">
          <div className={`${CARTE} mx-auto max-w-4xl px-6 py-14 text-center`}>
            <h2 className="titre-produit text-[2rem] sm:text-5xl">Pas encore de site ?</h2>
            <p className={`mx-auto mt-4 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase. Sitaly écrit votre site et vous le montre en
              une minute, avant même de créer un compte.
            </p>
            <a href={lienCreation()} className={`${BOUTON_NOIR} mt-8 px-6 py-3.5 text-base`}>
              Créer mon site <ArrowRight className="h-4 w-4" />
            </a>
            <Confiance />
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
