import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * En-tête et pied de page communs aux pages secondaires.
 *
 * L'en-tête était recopié à l'identique dans plusieurs routes, chacune ayant
 * dérivé de son côté. Il vit ici une seule fois, et le pied de page avec lui :
 * c'est `SiteFooter`, le même sur toutes les pages du site. Il en existait six
 * versions, une par route, dont trois ne renvoyaient nulle part.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />

      <div className="pt-[var(--entete-hauteur)]">{children}</div>

      <SiteFooter />
    </>
  );
}
