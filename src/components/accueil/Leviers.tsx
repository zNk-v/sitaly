import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * La rubrique Services, sur le modèle de « Sept leviers, un seul
 * interlocuteur » : une ligne par service, le nom à gauche, ce qu'il fait à
 * droite, un filet entre chaque. La liste complète des dix-huit pages reste
 * dans le menu et le pied de page ; ici, les huit portes d'entrée.
 */
const LEVIERS_LISTE: { label: string; desc: string; to?: string; href?: string }[] = [
  {
    label: "Agents IA",
    desc: "répondre, qualifier, prendre les rendez-vous et relancer, sans vous.",
    to: "/agents-ia/",
  },
  {
    label: "Agent vocal",
    desc: "un standard qui décroche à chaque appel, même à 22 h.",
    to: "/agents-ia/agent-vocal/",
  },
  {
    label: "Automatisation des tâches",
    desc: "les saisies et les relances répétitives faites à votre place.",
    to: "/automatisation-taches/",
  },
  {
    label: "ChatGPT Ads",
    desc: "exister quand un client décrit son besoin à une IA.",
    href: "/chatgpt-ads/",
  },
  {
    label: "Google Ads",
    desc: "être en haut des recherches dès aujourd'hui, dans votre zone.",
    to: "/acquisition/",
  },
  {
    label: "Référencement local",
    desc: "être trouvé dans votre ville, sur Google et sur Maps.",
    to: "/referencement-local/",
  },
  {
    label: "Référencement IA",
    desc: "être cité par ChatGPT, Gemini et Perplexity quand ils répondent.",
    to: "/referencement-ia/",
  },
  {
    label: "Création de site internet",
    desc: "un site rapide, qui vous ressemble et transforme la visite en appel.",
    to: "/creation-site-internet/",
  },
];

export function Leviers() {
  return (
    <section id="services" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div data-reveal>
          <h2 data-split className="display-section">
            Huit leviers, <span className="accent-word">un seul interlocuteur</span>
          </h2>
          <p className="measure mt-5 text-lg text-muted-foreground">
            Commencez par ce qui vous coûte le plus aujourd'hui, ajoutez le reste quand il rapporte.
            Chaque périmètre est chiffré après le diagnostic offert.
          </p>
        </div>

        <ul className="stagger mt-12 border-t border-border">
          {LEVIERS_LISTE.map((l, i) => {
            const contenu = (
              <>
                <span className="flex items-center gap-2 font-semibold transition-colors group-hover:text-brand-ink">
                  {l.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-muted-foreground">{l.desc}</span>
              </>
            );
            const classe =
              "group grid gap-1 py-5 sm:grid-cols-[17rem_1fr] sm:items-center sm:gap-8";
            return (
              <li
                key={l.label}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className="border-b border-border"
              >
                {l.to ? (
                  <Link to={l.to} className={classe}>
                    {contenu}
                  </Link>
                ) : (
                  <a href={l.href} className={classe}>
                    {contenu}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
