import type { ReactNode } from "react";
import { useVisible } from "@/components/produit/Vitrine";

/**
 * Les couvertures animées des articles (30 octobre 2026). Le blog de
 * durable.com illustre chaque article ; ici, pas de photo de banque
 * (DESIGN.md §7) mais une scène dessinée en SVG dans l'allure de Sitaly,
 * qui s'anime quand elle entre à l'écran (classes couv-* de styles.css,
 * immobiles si le visiteur réduit les animations).
 *
 * Chaque scène tient dans un cadre de 600 × 315, la proportion des images de
 * partage : elle se redimensionne sans perdre en netteté. Un article sans
 * scène propre prend celle de sa rubrique.
 */

const VIOLET = "#7c3aed";
const LAVANDE = "#c4b5fd";
const ENCRE = "#0d0f14";
const VERT = "#16a34a";

type Fond = "lavande" | "encre" | "gris";
const FONDS: Record<Fond, string> = { lavande: "#f1edff", encre: ENCRE, gris: "#f4f4f5" };

/** Une fenêtre de navigateur : la brique de la plupart des scènes. */
function Fenetre({
  x,
  y,
  l,
  h,
  adresse,
  children,
  sombre = false,
  className = "",
  style,
}: {
  x: number;
  y: number;
  l: number;
  h: number;
  adresse?: string;
  children?: ReactNode;
  sombre?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <g className={className} style={style}>
      <rect x={x} y={y} width={l} height={h} rx="14" fill={sombre ? "#1b1e26" : "#fff"} />
      <rect
        x={x}
        y={y}
        width={l}
        height={h}
        rx="14"
        fill="none"
        stroke="#000"
        strokeOpacity=".06"
      />
      {[0, 1, 2].map((k) => (
        <circle
          key={k}
          cx={x + 16 + k * 11}
          cy={y + 15}
          r="3.2"
          fill={sombre ? "#ffffff30" : "#00000020"}
        />
      ))}
      {adresse && (
        <text
          x={x + 56}
          y={y + 19}
          fontSize="10"
          fill={sombre ? "#ffffff80" : "#00000070"}
          fontFamily="inherit"
        >
          {adresse}
        </text>
      )}
      {children}
    </g>
  );
}

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/* ---------------------------------------------------------------------------
   Les scènes
   --------------------------------------------------------------------------- */

function SceneGratuit() {
  return (
    <>
      <Fenetre
        x={150}
        y={52}
        l={300}
        h={210}
        adresse="votre-nom.sitaly.fr"
        className="couv-monte"
        style={d(0)}
      >
        <rect x={150} y={80} width={300} height={74} fill={ENCRE} />
        <rect
          x={170}
          y={100}
          width={150}
          height={10}
          rx="5"
          fill="#fff"
          className="couv-trait"
          style={d(0.5)}
        />
        <rect
          x={170}
          y={118}
          width={100}
          height={8}
          rx="4"
          fill="#ffffff70"
          className="couv-trait"
          style={d(0.7)}
        />
        <rect
          x={170}
          y={134}
          width={60}
          height={12}
          rx="6"
          fill={LAVANDE}
          className="couv-trait"
          style={d(0.9)}
        />
        {[0, 1, 2].map((k) => (
          <rect
            key={k}
            x={170 + k * 90}
            y={170}
            width={80}
            height={56}
            rx="8"
            fill="#f4f4f5"
            className="couv-monte"
            style={d(1.1 + k * 0.15)}
          />
        ))}
      </Fenetre>
      <g className="couv-tombe" style={d(1.6)}>
        <rect x={392} y={30} width={96} height={52} rx="26" fill={VIOLET} />
        <text
          x={440}
          y={64}
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill="#fff"
          fontFamily="inherit"
        >
          0 €
        </text>
      </g>
    </>
  );
}

function SceneSansCoder() {
  return (
    <>
      <g className="couv-monte" style={d(0)}>
        <rect x={60} y={70} width={210} height={58} rx="18" fill="#fff" />
        <text x={80} y={96} fontSize="11" fill="#00000060" fontFamily="inherit">
          Votre activité
        </text>
        <rect x={80} y={106} width={150} height={8} rx="4" fill={ENCRE} className="couv-saisie" />
      </g>
      <g className="couv-pulse" style={d(1.2)}>
        <circle cx={300} cy={160} r="22" fill={VIOLET} />
        <path d="M300 148 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3z" fill="#fff" />
      </g>
      <Fenetre x={340} y={60} l={210} h={200} className="couv-monte" style={d(1.6)}>
        <rect x={340} y={88} width={210} height={60} fill={ENCRE} />
        <rect
          x={356}
          y={106}
          width={110}
          height={9}
          rx="4.5"
          fill="#fff"
          className="couv-trait"
          style={d(2)}
        />
        <rect
          x={356}
          y={122}
          width={70}
          height={8}
          rx="4"
          fill={LAVANDE}
          className="couv-trait"
          style={d(2.2)}
        />
        {[0, 1].map((k) => (
          <rect
            key={k}
            x={356 + k * 92}
            y={162}
            width={84}
            height={44}
            rx="8"
            fill="#f4f4f5"
            className="couv-monte"
            style={d(2.4 + k * 0.15)}
          />
        ))}
        <rect
          x={356}
          y={216}
          width={176}
          height={28}
          rx="8"
          fill="#f4f4f5"
          className="couv-monte"
          style={d(2.8)}
        />
      </Fenetre>
    </>
  );
}

function ScenePrix() {
  const barres = [
    { h: 70, label: "IA", couleur: VIOLET },
    { h: 120, label: "Éditeur", couleur: LAVANDE },
    { h: 160, label: "WordPress", couleur: "#ffffff40" },
    { h: 215, label: "Agence", couleur: "#ffffff25" },
  ];
  return (
    <>
      {barres.map((b, k) => (
        <g key={b.label}>
          <rect
            x={130 + k * 92}
            y={270 - b.h}
            width={64}
            height={b.h}
            rx="12"
            fill={b.couleur}
            className="couv-barre"
            style={d(0.2 + k * 0.2)}
          />
          <text
            x={162 + k * 92}
            y={290}
            textAnchor="middle"
            fontSize="11"
            fill="#ffffffa0"
            fontFamily="inherit"
          >
            {b.label}
          </text>
        </g>
      ))}
      <g className="couv-tombe" style={d(1.3)}>
        <rect x={98} y={150} width={92} height={34} rx="17" fill="#fff" />
        <text
          x={144}
          y={172}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={ENCRE}
          fontFamily="inherit"
        >
          dès 0 €
        </text>
      </g>
    </>
  );
}

function SceneNom() {
  const noms = ["Le Fournil Voisin", "Mie & Croûte", "Pain du Coin", "Le Bon Levain"];
  return (
    <>
      <rect
        x={130}
        y={62}
        width={340}
        height={190}
        rx="22"
        fill="#fff"
        className="couv-monte"
        style={d(0)}
      />
      <text
        x={154}
        y={92}
        fontSize="11"
        fill="#00000060"
        fontFamily="inherit"
        className="couv-monte"
        style={d(0.2)}
      >
        Idées de noms
      </text>
      <svg x={150} y={102} width={300} height={130} overflow="hidden">
        <g className="couv-defile">
          {[...noms, noms[0]].map((n, k) => (
            <g key={k} transform={`translate(0 ${k * 130})`}>
              <text
                x={0}
                y={52}
                fontSize="30"
                fontWeight="700"
                fill={ENCRE}
                fontFamily="inherit"
                letterSpacing="-0.5"
              >
                {n}
              </text>
              <rect x={0} y={74} width={140} height={28} rx="14" fill={`${VERT}18`} />
              <text x={14} y={93} fontSize="12" fontWeight="600" fill={VERT} fontFamily="inherit">
                ✓ .fr libre
              </text>
            </g>
          ))}
        </g>
      </svg>
      <g className="couv-pulse" style={d(0.6)}>
        <circle cx={470} cy={70} r="20" fill={VIOLET} />
        <path d="M470 59 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#fff" />
      </g>
    </>
  );
}

function SceneDomaine() {
  return (
    <>
      <g className="couv-monte" style={d(0)}>
        <rect x={90} y={118} width={420} height={64} rx="32" fill="#fff" />
        <rect
          x={90}
          y={118}
          width={420}
          height={64}
          rx="32"
          fill="none"
          stroke="#000"
          strokeOpacity=".08"
        />
        <path d="M128 146 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke={VERT} strokeWidth="2.6" />
        <rect x={124} y={145} width={24} height={18} rx="4" fill={VERT} />
        <svg x={166} y={130} width={262} height={40} overflow="hidden">
          <text x={0} y={28} fontSize="24" fontWeight="600" fill={ENCRE} fontFamily="inherit">
            mon-entreprise.fr
          </text>
          {/* Un voile blanc qui glisse vers la droite : le nom s'écrit lettre à lettre. */}
          <rect x={0} y={0} width={262} height={40} fill="#fff" className="couv-voile" />
        </svg>
      </g>
      <g className="couv-tombe" style={d(2.2)}>
        <rect x={392} y={62} width={110} height={36} rx="18" fill={VIOLET} />
        <text
          x={447}
          y={85}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#fff"
          fontFamily="inherit"
        >
          ✓ À votre nom
        </text>
      </g>
      <g className="couv-monte" style={d(1)}>
        <rect x={130} y={210} width={84} height={30} rx="15" fill="#fff" />
        <text
          x={172}
          y={230}
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={ENCRE}
          fontFamily="inherit"
        >
          .fr
        </text>
        <rect x={224} y={210} width={84} height={30} rx="15" fill="#ffffff80" />
        <text
          x={266}
          y={230}
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill="#00000070"
          fontFamily="inherit"
        >
          .com
        </text>
      </g>
    </>
  );
}

function SceneMentions() {
  return (
    <>
      <g className="couv-monte" style={d(0)}>
        <rect x={190} y={36} width={220} height={250} rx="16" fill="#fff" />
        <rect x={214} y={62} width={120} height={12} rx="6" fill={ENCRE} />
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k}>
            <rect x={214} y={98 + k * 34} width={18} height={18} rx="5" fill={`${VERT}20`} />
            <path
              d={`M218 ${107 + k * 34} l4 4 7 -8`}
              fill="none"
              stroke={VERT}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="couv-coche"
              style={d(0.6 + k * 0.35)}
            />
            <rect
              x={242}
              y={102 + k * 34}
              width={[130, 100, 140, 90, 120][k]}
              height={9}
              rx="4.5"
              fill="#00000018"
            />
          </g>
        ))}
      </g>
      <g className="couv-tombe" style={d(2.5)}>
        <rect x={360} y={232} width={118} height={36} rx="18" fill={ENCRE} />
        <text
          x={419}
          y={255}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#fff"
          fontFamily="inherit"
        >
          En règle
        </text>
      </g>
    </>
  );
}

function ScenePages() {
  const pages = ["Accueil", "Prestations", "Tarifs", "Avis", "Contact"];
  return (
    <>
      {pages.map((p, k) => (
        <g
          key={p}
          className="couv-eventail"
          style={
            {
              ...d(0.15 * k),
              "--r": `${(k - 2) * 7}deg`,
              "--x": `${(k - 2) * 62}px`,
            } as React.CSSProperties
          }
        >
          <rect
            x={250}
            y={70}
            width={100}
            height={150}
            rx="12"
            fill={k === 2 ? VIOLET : "#fff"}
            stroke="#000"
            strokeOpacity=".06"
          />
          <rect x={264} y={88} width={56} height={8} rx="4" fill={k === 2 ? "#ffffff" : ENCRE} />
          <rect
            x={264}
            y={104}
            width={72}
            height={6}
            rx="3"
            fill={k === 2 ? "#ffffff70" : "#00000018"}
          />
          <rect
            x={264}
            y={116}
            width={60}
            height={6}
            rx="3"
            fill={k === 2 ? "#ffffff70" : "#00000018"}
          />
          <text
            x={300}
            y={204}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={k === 2 ? "#fff" : "#00000080"}
            fontFamily="inherit"
          >
            {p}
          </text>
        </g>
      ))}
    </>
  );
}

function SceneGoogle() {
  return (
    <>
      <g className="couv-monte" style={d(0)}>
        <rect x={110} y={40} width={380} height={40} rx="20" fill="#fff" />
        <circle cx={134} cy={60} r="7" fill="none" stroke="#00000060" strokeWidth="2" />
        <text x={152} y={65} fontSize="14" fill={ENCRE} fontFamily="inherit">
          fleuriste nantes
        </text>
      </g>
      <svg x={110} y={92} width={380} height={190} overflow="visible">
        {[1, 2].map((k) => (
          // La position sur le groupe, l'animation sur l'enfant : une animation CSS
          // remplacerait l'attribut transform.
          <g key={k} transform={`translate(0 ${k * 62})`}>
            <g className="couv-monte" style={d(0.3 + k * 0.1)}>
              <rect width={380} height={52} rx="12" fill="#ffffff90" />
              <rect x={16} y={14} width={150} height={9} rx="4.5" fill="#00000025" />
              <rect x={16} y={30} width={230} height={7} rx="3.5" fill="#00000015" />
            </g>
          </g>
        ))}
        <g className="couv-remonte" style={d(0.9)}>
          <rect
            width={380}
            height={52}
            rx="12"
            fill="#fff"
            stroke={VIOLET}
            strokeOpacity=".5"
            strokeWidth="1.5"
          />
          <text x={16} y={23} fontSize="13" fontWeight="700" fill={VIOLET} fontFamily="inherit">
            Atelier Pivoine
          </text>
          {[0, 1, 2, 3, 4].map((s) => (
            <path
              key={s}
              d={`M${20 + s * 14} 32 l2.4 5 5.4 .6 -4 3.7 1.1 5.3 -4.9 -2.7 -4.9 2.7 1.1 -5.3 -4 -3.7 5.4 -.6z`}
              fill="#f59e0b"
              className="couv-etoile"
              style={d(1.8 + s * 0.12)}
            />
          ))}
          <text x={96} y={43} fontSize="10" fill="#00000070" fontFamily="inherit">
            Ouvert · Nantes
          </text>
        </g>
      </svg>
      <g className="couv-flotte">
        <path
          d="M520 104 a18 18 0 0 1 18 18 c0 13 -18 30 -18 30 s-18 -17 -18 -30 a18 18 0 0 1 18 -18z"
          fill={VIOLET}
        />
        <circle cx={520} cy={122} r="6.5" fill="#fff" />
      </g>
    </>
  );
}

/** La scène de repli, pour les rubriques : un site, une conversation et une étincelle. */
function SceneRubrique({ libelle }: { libelle: string }) {
  return (
    <>
      <Fenetre x={110} y={60} l={260} h={190} sombre className="couv-monte" style={d(0)}>
        <rect
          x={130}
          y={96}
          width={140}
          height={10}
          rx="5"
          fill="#fff"
          className="couv-trait"
          style={d(0.4)}
        />
        <rect
          x={130}
          y={114}
          width={190}
          height={7}
          rx="3.5"
          fill="#ffffff50"
          className="couv-trait"
          style={d(0.6)}
        />
        <rect
          x={130}
          y={128}
          width={160}
          height={7}
          rx="3.5"
          fill="#ffffff50"
          className="couv-trait"
          style={d(0.8)}
        />
        {[0, 1, 2].map((k) => (
          <rect key={k} x={130 + k * 76} y={156} width={68} height={70} rx="10" fill="#ffffff12" />
        ))}
      </Fenetre>
      <g className="couv-tombe" style={d(1)}>
        <rect x={330} y={190} width={170} height={44} rx="22" fill={LAVANDE} />
        <text
          x={415}
          y={218}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={ENCRE}
          fontFamily="inherit"
        >
          {libelle.length > 22 ? `${libelle.slice(0, 21)}…` : libelle}
        </text>
      </g>
      <g className="couv-pulse" style={d(0.6)}>
        <circle cx={420} cy={92} r="24" fill={VIOLET} />
        <path
          d="M420 79 l3.4 9.6 9.6 3.4 -9.6 3.4 -3.4 9.6 -3.4 -9.6 -9.6 -3.4 9.6 -3.4z"
          fill="#fff"
        />
      </g>
    </>
  );
}

const SCENES: Record<string, { fond: Fond; scene: () => ReactNode }> = {
  "creer-site-internet-gratuit": { fond: "lavande", scene: SceneGratuit },
  "creer-site-internet-sans-coder": { fond: "gris", scene: SceneSansCoder },
  "prix-site-internet": { fond: "encre", scene: ScenePrix },
  "trouver-nom-entreprise": { fond: "lavande", scene: SceneNom },
  "choisir-nom-de-domaine": { fond: "gris", scene: SceneDomaine },
  "mentions-legales-site-internet": { fond: "lavande", scene: SceneMentions },
  "pages-indispensables-site-vitrine": { fond: "gris", scene: ScenePages },
  "apparaitre-sur-google": { fond: "lavande", scene: SceneGoogle },
};

export function Couverture({
  slug,
  rubrique,
  className = "",
}: {
  slug: string;
  rubrique: string;
  className?: string;
}) {
  const { ref, classe } = useVisible<HTMLDivElement>(0.3);
  const propre = SCENES[slug];
  const fond = propre?.fond ?? "gris";
  return (
    <div
      ref={ref}
      className={`${classe} overflow-hidden ${className}`}
      style={{ background: FONDS[fond] }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 315"
        className="block h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {propre ? <propre.scene /> : <SceneRubrique libelle={rubrique} />}
      </svg>
    </div>
  );
}
