import { Link } from "@tanstack/react-router";
import { Check, PhoneIncoming, Sparkles } from "lucide-react";
import { LEVIERS, type Levier } from "@/components/StackedOffers";
import { FlecheRonde } from "@/components/accueil/communs";

import photoAgents800 from "@/assets/photos/service-agents-800.webp";
import photoAgents1400 from "@/assets/photos/service-agents-1400.webp";
import photoChatgpt800 from "@/assets/photos/service-chatgpt-800.webp";
import photoChatgpt1400 from "@/assets/photos/service-chatgpt-1400.webp";
import photoGoogle800 from "@/assets/photos/service-google-800.webp";
import photoGoogle1400 from "@/assets/photos/service-google-1400.webp";
import photoSite800 from "@/assets/photos/service-site-800.webp";
import photoSite1400 from "@/assets/photos/service-site-1400.webp";

/**
 * Les services en rangées alternées, en deux temps, comme chez la
 * référence : « Les fondations » sur le papier, puis « Là où vos clients
 * vous trouvent » sur l'encre. Chaque rangée pose une photo de banque
 * d'images (Unsplash) et, à cheval sur son coin, une carte d'interface qui
 * montre le mécanisme. Le texte vient de LEVIERS (StackedOffers), source
 * unique des offres.
 *
 * Mouvement : la photo glisse depuis son côté, la carte monte un temps plus
 * tard (`.rangee-photo`, `.rangee-carte`, déclenchés par `data-reveal`).
 */

type Habillage = { photo: [string, string]; position: string; alt: string; carte: React.ReactNode };

const HABILLAGE: Record<string, Habillage> = {
  site: {
    photo: [photoSite800, photoSite1400],
    position: "50% 30%",
    alt: "Un artisan souriant dans son atelier",
    carte: <CarteSite />,
  },
  ads: {
    photo: [photoGoogle800, photoGoogle1400],
    position: "50% 40%",
    alt: "Une particulière cherche un artisan sur son téléphone",
    carte: <CarteDemande />,
  },
  chatgpt: {
    photo: [photoChatgpt800, photoChatgpt1400],
    position: "50% 35%",
    alt: "Un client souriant, ordinateur portable en main",
    carte: <CarteChatgpt />,
  },
  agents: {
    photo: [photoAgents800, photoAgents1400],
    position: "50% 30%",
    alt: "Un client lit sur son téléphone la confirmation de son rendez-vous",
    carte: <CarteAgent />,
  },
};

export function Services() {
  const par = (cle: string) => LEVIERS.find((l) => l.cle === cle)!;
  return (
    <div id="offre">
      <section className="overflow-x-clip bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <EnTete
            titre={
              <>
                Les fondations <span className="accent-word">de vos demandes</span>
              </>
            }
            texte="On commence par le socle : un site qui transforme la visite en appel, et, pour les artisans, des demandes de chantier livrées sans pub à gérer."
          />
          <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
            <Rangee levier={par("site")} rang={0} />
            <Rangee levier={par("ads")} rang={1} />
          </div>
        </div>
      </section>

      <section className="on-ink fond-rayures relative overflow-x-clip bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <EnTete
            sombre
            titre={
              <>
                Là où vos clients vous cherchent,{" "}
                <span className="accent-word">et où on leur répond</span>
              </>
            }
            texte="Une fois la base posée, on ouvre ce qui fait la différence : la publicité dans ChatGPT, et des agents IA qui traitent chaque demande."
          />
          <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
            <Rangee levier={par("chatgpt")} rang={0} sombre />
            <Rangee levier={par("agents")} rang={1} sombre />
          </div>
        </div>
      </section>
    </div>
  );
}

function EnTete({
  titre,
  texte,
  sombre = false,
}: {
  titre: React.ReactNode;
  texte: string;
  sombre?: boolean;
}) {
  return (
    <div data-reveal className="max-w-2xl">
      <h2 data-split className="display-section">
        {titre}
      </h2>
      <p className={`mt-5 text-lg ${sombre ? "text-white/70" : "text-muted-foreground"}`}>
        {texte}
      </p>
    </div>
  );
}

function Rangee({
  levier: l,
  rang,
  sombre = false,
}: {
  levier: Levier;
  rang: number;
  sombre?: boolean;
}) {
  const h = HABILLAGE[l.cle];
  const inverse = rang % 2 === 1;
  const lien = l.cta.to ? (
    <Link to={l.cta.to} className="lien-service">
      Découvrir le service
      <FlecheRonde />
    </Link>
  ) : (
    <a href={l.cta.href} className="lien-service">
      Découvrir le service
      <FlecheRonde />
    </a>
  );

  return (
    <article className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      <div
        data-reveal
        className={`rangee relative ${inverse ? "rangee--droite lg:order-2" : "rangee--gauche"}`}
      >
        <img
          src={h.photo[1]}
          srcSet={`${h.photo[0]} 800w, ${h.photo[1]} 1400w`}
          sizes="(min-width: 1024px) 600px, 100vw"
          width={1400}
          height={934}
          loading="lazy"
          alt={h.alt}
          className="rangee-photo aspect-[4/3] w-full rounded-[1.75rem] object-cover"
          style={{ objectPosition: h.position }}
        />
        <div
          className={`rangee-carte sur-papier absolute -bottom-8 w-[min(20rem,80%)] ${
            inverse ? "-left-3 sm:-left-8" : "-right-3 sm:-right-8"
          }`}
        >
          {h.carte}
        </div>
      </div>

      <div data-reveal className={inverse ? "lg:order-1" : ""}>
        <p className={`rail-label ${sombre ? "text-white/55" : "text-brand-ink"}`}>{l.categorie}</p>
        <h3 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.035em]">
          {l.titre}
        </h3>
        <p
          className={`measure mt-5 text-lg leading-relaxed ${sombre ? "text-white/70" : "text-muted-foreground"}`}
        >
          {l.texte}
        </p>
        <ul className="mt-7 space-y-3">
          {l.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signal/20 text-signal-ink">
                <Check className={`h-3 w-3 ${sombre ? "text-signal" : ""}`} />
              </span>
              <span className={sombre ? "text-white/90" : ""}>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-9">{lien}</div>
      </div>
    </article>
  );
}

/* ---- Cartes d'interface, construites en balisage (DESIGN.md §7) ---- */

function Cadre({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-left text-foreground shadow-elevated">
      {children}
    </div>
  );
}

function CarteSite() {
  return (
    <Cadre>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-2 flex-1 truncate rounded-md bg-paper-sunk px-2 py-0.5 text-[11px] text-muted-foreground">
          votre-entreprise.fr
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-2.5 w-4/5 rounded bg-foreground/80" />
        <div className="h-2.5 w-3/5 rounded bg-foreground/80" />
        <div className="h-2 w-full rounded bg-border" />
      </div>
      <div className="mt-3 flex gap-2">
        <span className="rounded-full bg-[image:var(--gradient-ruban)] px-3 py-1 text-[11px] font-semibold text-white">
          Appeler
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold">
          Devis gratuit
        </span>
      </div>
      <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-signal/15 px-2.5 py-1.5 text-[12px] font-semibold text-signal-ink">
        <Check className="h-3.5 w-3.5" />
        Nouvelle demande reçue
      </p>
    </Cadre>
  );
}

/* Une demande de chantier transmise à l'artisan partenaire (offre du
   5 octobre 2026). Schéma, sans chiffre de résultat. */
function CarteDemande() {
  return (
    <Cadre>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <PhoneIncoming className="h-3.5 w-3.5" />
          Nouvelle demande · 9 h 42
        </span>
        <span>Exemple</span>
      </div>
      <p className="mt-2 text-sm font-semibold">Élagage d'un chêne, Brétigny-sur-Orge</p>
      <p className="mt-0.5 text-[12px] text-muted-foreground">
        Appel de 3 min 12, enregistré et horodaté
      </p>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 text-[12px] font-semibold text-signal-ink">
        <Check className="h-3.5 w-3.5" />
        Transmise à une seule entreprise
      </p>
    </Cadre>
  );
}

function CarteChatgpt() {
  return (
    <Cadre>
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-paper-sunk px-3 py-2 text-[13px]">
        Ma toiture fuit depuis l'orage, un couvreur sérieux vers Brétigny ?
      </p>
      <div className="mt-3 rounded-xl border border-border p-3">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Sponsorisé
        </p>
        <p className="mt-1 text-sm font-semibold">Votre entreprise</p>
        <p className="text-[12px] text-muted-foreground">Couverture · Essonne · devis sous 24 h</p>
      </div>
      <p className="mt-2 text-right text-[11px] text-muted-foreground">Exemple</p>
    </Cadre>
  );
}

function CarteAgent() {
  return (
    <Cadre>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <PhoneIncoming className="h-3.5 w-3.5" />
          Appel entrant · 18:47
        </span>
        <span>Exemple</span>
      </div>
      <p className="mt-2 text-sm font-semibold">Fuite sous l'évier, Brétigny</p>
      <ul className="mt-2 space-y-1 text-[12px] text-muted-foreground">
        <li>Urgence confirmée</li>
        <li>Adresse et photo reçues</li>
      </ul>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 text-[12px] font-semibold text-signal-ink">
        <Check className="h-3.5 w-3.5" />
        Mardi 10 h, confirmé par SMS
      </p>
    </Cadre>
  );
}
