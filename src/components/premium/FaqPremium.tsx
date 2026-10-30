import { Plus } from "lucide-react";
import { CONTENEUR, TITRE_SECTION } from "@/components/premium/communs";
import { FAQ_PREMIUM } from "@/data/premium";

/** Les questions, ouvertes sans script (`details`), comme sur les pages d'offre. */
export function FaqPremium() {
  return (
    <section aria-labelledby="faq-titre" className="py-20 sm:py-28">
      <div className={CONTENEUR}>
        <p className="rail-label text-brand-ink">Questions</p>
        <h2 id="faq-titre" className={TITRE_SECTION}>
          Questions fréquentes sur un site <span className="accent-word">sur mesure</span>
        </h2>
        <div className="mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
          {FAQ_PREMIUM.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <Plus className="h-4 w-4 shrink-0 transition group-open:rotate-45 motion-reduce:transition-none" />
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
