# Sitaly — note de direction artistique

Refonte 2026. Document de référence : toute décision visuelle du site s'y rattache.

---

## 1. Le problème à résoudre

Sitaly et Linov vendent la même chose au même marché français. Les deux marques sont
violettes. Reprendre la grammaire éditoriale de Linov sans travailler la différenciation
produirait un clone reconnaissable par n'importe qui ayant vu les deux sites.

La grammaire se reprend. La signature chromatique et le rythme, non.

**Ce qu'on emprunte à Linov**
- Titres de section géants, en minuscules, sur deux ou trois lignes cassées.
- Mots-clés accentués à l'intérieur du texte courant.
- Révélations au scroll, section par section.
- Carrousel de réalisations, bloc témoignages nominatifs, blog en page d'accueil.

**Ce qu'on refuse**
- Le bleu. Linov s'identifie par son `#0033FF`. Aucune valeur du site ne descend
  sous la teinte 300 en OKLCH. Sitaly vit entre 300 et 345, du violet au rose.
- Le fond lavande uniforme. Voir §3.
- Le surlignage coloré des mots-clés. Voir §4.

---

## 2. Les quatre leviers de différenciation

| Levier | Linov | Sitaly |
|---|---|---|
| Fond | Lavande froid uniforme sur toute la page | Alternance encre / papier chaud |
| Accent des mots | Surlignage violet dans le texte | Bascule en serif italique |
| Couleur secondaire | Aucune, tout est dans le violet-bleu-magenta | Vert signal, réservé à la preuve |
| Grille | Centrée, plaquette d'agence | Ancrée à gauche, colonne de repères |

Aucun de ces quatre leviers ne coûte en crédibilité. Ils rendent le site non
superposable au sien, capture d'écran contre capture d'écran.

---

## 3. Palette

Valeurs en OKLCH, cohérentes avec le fichier de tokens existant.

### Fonds

| Token | Valeur | Usage |
|---|---|---|
| `--paper` | `oklch(0.985 0.004 85)` | Fond par défaut. Blanc cassé légèrement chaud, jamais lavande. |
| `--paper-sunk` | `oklch(0.965 0.008 300)` | Sections en léger retrait, alternance de rythme. |
| `--ink` | `oklch(0.165 0.045 302)` | Sections sombres. Violet profond, pas un gris neutre. |
| `--ink-deep` | `oklch(0.115 0.032 302)` | Pied de page, fonds de carte sur section sombre. |

L'alternance encre / papier est la signature. Sur la page d'accueil, elle suit
un rythme de trois : deux sections claires, une sombre. Le hero est sombre, le
pied de page est sombre, et les deux se répondent.

### Marque

| Token | Valeur | Origine |
|---|---|---|
| `--brand` | `oklch(0.722 0.177 305)` | Chevron clair du logo, `#c084fc` |
| `--brand-deep` | `oklch(0.631 0.208 344)` | Chevron foncé du logo, `#d946a8` |
| `--brand-ink` | `oklch(0.34 0.13 305)` | Version texte du violet, contraste AA sur papier |

Le dégradé de marque va du violet au rose, jamais vers le bleu. C'est exactement
l'axe du logo, et c'est précisément l'axe que Linov n'occupe pas.

### Signal

| Token | Valeur | Usage |
|---|---|---|
| `--signal` | `oklch(0.72 0.17 165)` | Sur fond encre : preuves, validations, chiffres vérifiables |
| `--signal-ink` | `oklch(0.48 0.13 165)` | Sur fond papier, pour les libellés sous 14 px |

Le vert ne décore pas. Il marque ce qui est vérifiable : un site réellement en
ligne, un délai tenu, un client nommé. Cette discipline est ce qui empêche la
palette de virer au dégradé SaaS.

### Interdits

- Toute teinte OKLCH entre 240 et 300. C'est le territoire de Linov.
- Le dégradé violet posé en fond de section pleine largeur. Le dégradé sert au
  texte, aux filets et aux bordures, jamais de nappe.
- Le glassmorphism. Coût GPU réel, aucun gain, et le code actuel s'en passe déjà
  avec un commentaire explicite qui a raison.

---

## 4. Typographie

| Rôle | Police | Note |
|---|---|---|
| Display | Plus Jakarta Sans 800, `letter-spacing: -0.04em` | Déjà auto-hébergée. Resserrée pour les grandes tailles. |
| Courant | Inter 400 / 500 / 600 | Déjà auto-hébergée. Aucun changement. |
| Accent | Instrument Serif Italic | À ajouter. SIL OFL, sous-ensemble latin, un seul fichier. |

### La règle des mots accentués

Linov surligne ses mots-clés en violet. Sitaly les fait basculer en serif italique,
à la même taille optique, sans changement de couleur.

> Plus de clients pour votre activité, *quel que soit votre métier*

L'italique haute-contraste dans un titre en grotesque très gras produit une
tension immédiate, coûte un seul fichier de police, et ne dépend d'aucune couleur.
Sur fond encre comme sur fond papier, elle tient sans réglage.

Un mot accentué par titre. Deux au maximum, jamais côte à côte.

### Échelle

Le display suit un `clamp()` continu plutôt que des paliers par point de rupture :
`clamp(2.5rem, 7vw, 6.5rem)` pour les titres de section, `clamp(3rem, 9vw, 8rem)`
pour le hero. Mesure de lecture plafonnée à 68 caractères.

---

## 5. Grille et rythme

Ancrage à gauche, jamais de section entièrement centrée hors CTA final.

Chaque section porte une colonne de repères sur sa gauche : numéro de section en
tabulaire (`01`, `02`, `03`), filet vertical d'un pixel, libellé court en capitales
espacées. Le contenu occupe la colonne large. Cette structure vient du rapport
imprimé, pas de la plaquette commerciale, et elle éloigne visuellement du centrage
systématique de Linov.

Rythme vertical : `py-20` sur mobile, `py-28` à partir de `sm`. Une seule valeur,
aucune section qui respire deux fois plus que sa voisine.

---

## 6. Mouvement

Budget assumé : riche à l'œil, léger en octets. Aucune bibliothèque d'animation
n'entre dans le bundle.

| Effet | Implémentation |
|---|---|
| Révélation au scroll | `IntersectionObserver` déjà présent dans `use-reveal-on-scroll.ts`, décalage de 40 ms par enfant |
| Titres en cascade | Découpe par ligne, translation et opacité, transition CSS pure |
| Carrousel réalisations | Embla, déjà dans les dépendances |
| Fond animé du hero | Vidéo Higgsfield, `poster` obligatoire, `preload="none"`, coupée sous 768 px |
| Compteur de métiers | Marquee CSS existant, conservé |

Règles fermes : `transform` et `opacity` uniquement, 150 à 300 ms sur les
micro-interactions, `prefers-reduced-motion` respecté partout, et la vidéo de hero
ne doit jamais porter le LCP. Le texte du hero est le LCP, la vidéo arrive après.

---

## 7. Visuels générés

Higgsfield produit le fond animé du hero, les illustrations abstraites de section,
le film de marque court et l'écrin des réalisations.

Frontière à ne pas franchir : rien de généré ne représente un chantier, un client,
un local ou une équipe. Les captures des trois sites clients sont réelles et le
restent. Le générateur habille, il ne témoigne pas.

---

## 8. Ce que le site ne dit plus

Décision du 2 septembre 2026 : aucun prix sur les pages commerciales.

Sections à démonter sur la page d'accueil : `Pricing`, `BlogOption`, `Options`,
et la mention « Dès 149€ par mois » de la `TrustBar`. La FAQ « Quel est le tarif ? »
est réécrite sans chiffre. La page `/acquisition` perd sa grille.

Les articles de blog conservent leurs chiffres de marché : ce sont des données
sectorielles, pas la grille de Sitaly.

Ce que le prix affiché faisait, il faut le remplacer. Il portait la clarté et
l'absence d'engagement. Ces deux promesses restent, formulées sans montant :
sans engagement, sans frais d'installation, réponse sous 24 heures.

---

## 9. Identité

Sitaly est une entreprise individuelle sans local. Le site parle au nom de la
marque, pas d'un effectif.

**Affiché** : le « nous » de marque, une section fondateur avec la photo et le
prénom de Teddy Vidal, les trois clients nommés avec leurs sites en ligne,
la couverture nationale.

**Jamais affiché** : un effectif, une page équipe, une adresse de rue, une photo
de bureau, une invitation à se rencontrer. Linov peut écrire « rencontrons-nous ».
Sitaly écrit « on s'appelle 20 minutes ».

L'avantage se retourne : chez Sitaly, l'interlocuteur est celui qui construit le
site. Aucune agence à effectif ne peut le promettre.

---

## 10. Test de non-transposabilité

Si on remplace le nom et le numéro, ce site pourrait-il servir à une autre agence
web ? Ce qui doit l'en empêcher :

- L'alternance encre / papier, quand tout le secteur travaille en fond clair uniforme.
- Les mots en serif italique à l'intérieur des titres.
- Le vert réservé au vérifiable.
- Les trois réalisations réelles, ouvrables, avec leurs vraies captures.
- Le visage du fondateur à un endroit où les concurrents mettent une photo d'équipe.
