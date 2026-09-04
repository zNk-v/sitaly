import { Bell, Calendar, Check, Phone, Search, Sparkles } from "lucide-react";

/**
 * Maquettes des offres, construites en balisage plutôt que générées.
 *
 * Une image abstraite ne dit ni « Google Ads » ni « un agent qui répond au
 * téléphone ». Ces maquettes montrent le mécanisme, en français, et restent
 * nettes à toutes les densités d'écran pour quelques centaines d'octets.
 *
 * Parti pris volontaire : elles ne copient l'interface de personne. Ni Google,
 * ni OpenAI, ni un opérateur téléphonique. Ce sont des schémas dans la charte
 * Sitaly, pas de fausses captures d'écran d'un produit tiers.
 */

function Cadre({ children, legende }: { children: React.ReactNode; legende: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-[420px]">
        <div className="rounded-2xl border border-border bg-paper-sunk p-4 shadow-soft">
          {children}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">{legende}</p>
      </div>
    </div>
  );
}

/** Ce que voit quelqu'un qui cherche un artisan sur un moteur de recherche. */
export function MaquetteRecherche() {
  return (
    <Cadre legende="Schéma d'un résultat de recherche. Illustration, pas une capture.">
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
        <span className="truncate text-sm text-neutral-800">couvreur urgence essonne</span>
      </div>

      <div className="mt-3 rounded-xl border-2 border-brand/60 bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-ink">
            Annonce
          </span>
          <span className="text-[11px] text-neutral-500">votre-entreprise.fr</span>
        </div>
        <div className="mt-1.5 text-sm font-semibold text-neutral-900">
          Couvreur en Essonne — devis sous 24h
        </div>
        <div className="mt-1 text-xs leading-relaxed text-neutral-500">
          Intervention rapide, garantie décennale, artisan local.
        </div>
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-brand-ink px-2.5 py-1.5 text-[11px] font-semibold text-white">
          <Phone className="h-3 w-3" aria-hidden="true" />
          Appeler
        </div>
      </div>

      {/* Les concurrents, repoussés sous l'annonce. */}
      <div className="mt-2.5 space-y-2.5 opacity-40">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-xl bg-white/70 p-3">
            <div className="h-2 w-24 rounded bg-neutral-300" />
            <div className="mt-2 h-2 w-full rounded bg-neutral-200" />
            <div className="mt-1.5 h-2 w-2/3 rounded bg-neutral-200" />
          </div>
        ))}
      </div>
    </Cadre>
  );
}

/** Un futur client qui décrit son besoin à un assistant plutôt qu'à un moteur. */
export function MaquetteConversation() {
  return (
    <Cadre legende="Schéma d'une conversation assistée. Illustration, pas une capture.">
      <div className="space-y-3">
        <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-white px-3.5 py-2.5 text-sm text-neutral-800">
          Ma toiture fuit depuis l'orage, je cherche quelqu'un de sérieux vers Brétigny.
        </div>

        <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-white/90 px-3.5 py-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-ink">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Assistant
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">
            Voici un couvreur qui intervient en urgence dans ce secteur :
          </p>
          <div className="mt-2.5 rounded-xl border border-brand/40 bg-brand/5 p-2.5">
            <div className="text-sm font-semibold text-neutral-900">Votre entreprise</div>
            <div className="mt-0.5 text-xs text-neutral-500">
              Couverture · Essonne · Devis sous 24h
            </div>
          </div>
        </div>
      </div>
    </Cadre>
  );
}

/** L'appel manqué qui ne se perd plus. */
export function MaquetteAgent() {
  return (
    <Cadre legende="Schéma d'un enchaînement automatisé. Illustration, pas une capture.">
      <div className="space-y-2.5">
        <div className="flex items-center gap-3 rounded-xl bg-white/90 px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-100 text-red-600">
            <Phone className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-neutral-900">Appel manqué</div>
            <div className="text-xs text-neutral-500">Vous étiez sur un chantier</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-white/90 px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-ink">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-neutral-900">SMS envoyé sur-le-champ</div>
            <div className="text-xs leading-relaxed text-neutral-500">
              « Désolé, je suis en intervention. Quel est votre besoin ? »
            </div>
          </div>
        </div>

        {/* Fond clair comme les deux lignes précédentes : un fond teinté à 10 %
            sur l'encre laissait du texte quasi noir sur fond sombre. */}
        <div className="flex items-center gap-3 rounded-xl border border-signal-ink/40 bg-white px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-signal-ink text-white">
            <Calendar className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
              Rendez-vous posé
              <Check className="h-3.5 w-3.5 text-signal-ink" aria-hidden="true" />
            </div>
            <div className="text-xs text-neutral-500">Jeudi 14h, sans que vous décrochiez</div>
          </div>
        </div>
      </div>
    </Cadre>
  );
}

/**
 * Un site livré, vu comme un objet et non comme un texte à lire.
 *
 * Cette illustration remplace une vraie capture du site d'un client. La capture
 * était la meilleure preuve du site, mais la carte porte déjà un titre, un
 * paragraphe, trois pastilles et un bouton : une page pleine de texte à côté
 * mettait deux lectures en concurrence, et on ne faisait ni l'une ni l'autre.
 *
 * D'où le parti pris : la forme d'un site, aucune phrase. Les barres disent la
 * structure — un menu, un titre, une photo, trois blocs, un bouton — et l'œil
 * la reconnaît sans lire. Les vraies captures restent en réalisations, là où
 * elles servent de preuve et où on vient pour les regarder.
 */
export function MaquetteSite() {
  /* Le bleu de la famille « présence ». Voir COULEURS_FAMILLE. */
  const accent = "bg-[var(--blue)]";

  return (
    <Cadre legende="Schéma d'un site livré. Les vraies captures sont en réalisations.">
      <div>
        {/* L'écran, dans sa coque. */}
        <div className="rounded-t-xl bg-ink p-2 pb-0">
          <div className="overflow-hidden rounded-t-md bg-white">
            {/* La barre du navigateur. L'adresse est une barre, pas un texte :
                un nom de domaine se lit, et c'est ce qu'on cherche à éviter. */}
            <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-neutral-100 px-2.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
              <span className="ml-2 h-2.5 flex-1 rounded-full bg-white" />
            </div>

            <div className="space-y-3 p-3">
              {/* Le menu. */}
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-12 rounded ${accent}`} />
                <span className="ml-auto h-1.5 w-8 rounded bg-neutral-300" />
                <span className="h-1.5 w-8 rounded bg-neutral-300" />
                <span className="h-1.5 w-8 rounded bg-neutral-300" />
                <span className={`h-4 w-12 rounded-full ${accent}`} />
              </div>

              {/* Le hero : deux lignes de titre, une de texte, un bouton, une
                  photo. C'est la silhouette que reconnaît n'importe qui. */}
              <div className="flex gap-3">
                <div className="flex-1 space-y-1.5 pt-1">
                  <span className="block h-3 w-full rounded bg-neutral-800" />
                  <span className="block h-3 w-4/5 rounded bg-neutral-800" />
                  <span className="mt-2 block h-1.5 w-full rounded bg-neutral-300" />
                  <span className="block h-1.5 w-3/4 rounded bg-neutral-300" />
                  <span className={`mt-2.5 block h-5 w-20 rounded-full ${accent}`} />
                </div>
                <div className="h-24 w-[38%] shrink-0 rounded-lg bg-neutral-200" />
              </div>

              {/* Trois blocs de prestations. */}
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-1.5 rounded-lg bg-neutral-100 p-2">
                    <span className={`block h-3 w-3 rounded ${accent} opacity-70`} />
                    <span className="block h-1.5 w-full rounded bg-neutral-300" />
                    <span className="block h-1.5 w-2/3 rounded bg-neutral-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Le socle, plus large que l'écran : c'est lui qui fait lire un
            ordinateur plutôt qu'une fenêtre posée sur la page. */}
        <div className="relative left-1/2 h-2.5 w-[112%] -translate-x-1/2 rounded-b-lg bg-ink" />
        <div className="relative left-1/2 h-1 w-[38%] -translate-x-1/2 rounded-b-full bg-ink/40" />
      </div>
    </Cadre>
  );
}
