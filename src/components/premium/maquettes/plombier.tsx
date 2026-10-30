import type { Maquette } from "@/components/premium/registre";

/**
 * 01 · Plombier · Clapet (marque inventée).
 *
 * Pour un dépanneur, le numéro passe avant le logo : le client appelle
 * d'abord et lit ensuite. Le numéro est géant, le tuyau passe derrière.
 *
 * Le numéro appartient à la plage 01 99 00 xx xx, que l'Arcep réserve aux
 * œuvres de fiction. Les boutons sont des `span` : l'écran est inerte.
 *
 * Gestes (styles dans plombier.css) : le tuyau glisse pendant la pose du
 * premier site, les tuiles montent à l'entrée.
 */
function Contenu() {
  return (
    <div className="clapet">
      <div className="clapet-bandeau">Intervention sous 2 h, 7 j/7</div>

      <header className="clapet-entete">
        <span className="clapet-logo logo-marque">Clapet</span>
        <nav className="clapet-nav">
          <span>Dépannage</span>
          <span>Chauffage</span>
          <span>Salle de bains</span>
        </nav>
        <span className="clapet-devis">Devis</span>
      </header>

      <svg className="clapet-tuyau" data-g="" viewBox="0 0 640 110" preserveAspectRatio="none">
        <path d="M-10 70 H520 Q560 70 560 30 V-10" />
        <path d="M-10 84 H520 Q574 84 574 30 V-10" />
        <polygon points="422,62 430,56 438,62 438,92 430,98 422,92" />
      </svg>

      <div className="clapet-corps">
        <p className="clapet-accroche">Une fuite à 22 h ? On décroche.</p>
        <p className="clapet-numero">
          <span>01 99 00</span> <span>12 34</span>
        </p>
        <span className="clapet-appeler">Appeler</span>
        <p className="clapet-sous">Et quand tout est sec, on refait la salle de bains.</p>
      </div>

      <ul className="clapet-tuiles">
        {[
          ["Fuite", "sous 2 h"],
          ["Chauffe-eau", "sous 24 h"],
          ["Salle de bains", "devis sous 5 jours"],
        ].map(([t, d], j) => (
          <li key={t} data-g="" style={{ "--j": j } as React.CSSProperties}>
            <span className="clapet-tuile-titre">{t}</span>
            <span className="clapet-tuile-delai">{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const maquette: Maquette = { id: "plombier", Contenu };
