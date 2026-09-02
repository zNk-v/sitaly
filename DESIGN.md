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
| Fond | Lavande froid uniforme sur toute la page | Papier chaud, voile violet dissous en haut de hero |
| Accent des mots | Surlignage violet dans le texte | Bascule en serif italique |
| Couleur secondaire | Aucune, tout est dans le violet-bleu-magenta | Vert signal, réservé à la preuve |
| Grille | Centrée, plaquette d'agence | Ancrée à gauche, colonne de repères |

**Révision du 2 septembre 2026.** La première version de cette note faisait de
l'alternance encre / papier le levier principal. Le client a tranché contre :
trop sombre. Le site passe en clair, et la distinction chromatique repose
désormais sur la température du fond. Linov baigne dans un lavande froid et
uniforme ; Sitaly pose un blanc cassé chaud, avec un voile violet qui se
dissout avant le milieu du hero. Les trois autres leviers, eux, ne bougent pas :
ce sont eux qui portent la différence.

Aucun de ces quatre leviers ne coûte en crédibilité. Ils rendent le site non
superposable au sien, capture d'écran contre capture d'écran.

---

## 3. Palette

Valeurs en OKLCH, cohérentes avec le fichier de tokens existant.

### Fonds

| Token | Valeur | Usage |
|---|---|---|
| `--paper` | `oklch(0.985 0.004 85)` | Fond par défaut. Blanc cassé légèrement chaud, jamais lavande. |
| `--paper-sunk` | `oklch(0.965 0.008 302)` | Sections en léger retrait, qui donnent le rythme vertical. |
| `--ink` | `oklch(0.165 0.045 302)` | Pied de page uniquement. Violet profond, pas un gris neutre. |
| `--ink-deep` | `oklch(0.115 0.032 302)` | Réserve, pour les fonds de carte sur surface sombre. |

| `--wash-from` / `--wash-to` | `oklch(0.945 0.045 305)` → `oklch(0.935 0.052 344)` | Voile de section, sur l'axe du logo |

Le rythme vient de l'alternance papier / papier en retrait / voile, jamais d'un
basculement en sombre. L'encre ne subsiste qu'au pied de page, où elle sert
d'ancre en fin de parcours.

**Le voile plutôt que l'aplat.** Une première tentative posait des sections en
aplat violet saturé. Refusée : trop péremptoire. Le voile la remplace, sur le
même axe que le logo, du violet au rose. Il est assez clair pour porter du texte
encre à 15:1, donc il colore la page sans jamais crier. La saturation qu'il perd
est reportée sur les très grandes tailles, via `brand-gradient-text` : les
chiffres et les numéros d'étape reçoivent le dégradé profond du même axe, à 8:1
sur blanc. La couleur passe du fond vers le texte.

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
| `--signal` | `oklch(0.72 0.17 165)` | Sur surface sombre : pied de page, badges sur capture |
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
Elle tient sans réglage sur toutes les surfaces du site.

Un fragment accentué par titre, jamais deux côte à côte.

### Échelle

Le display suit un `clamp()` continu plutôt que des paliers par point de rupture :
`clamp(2rem, 4.6vw, 3.75rem)` pour les titres de section, `clamp(2.5rem, 5.2vw, 4.75rem)`
pour le hero, qui n'occupe qu'une colonne de moitié de largeur à partir de `lg`.
Mesure de lecture plafonnée à 68 caractères.

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
| Cascade de mots | Découpe par mot des titres, 42 ms de décalage, transition CSS pure |
| Parallaxe, montée, filets | `animation-timeline: view()`, sur le fil de composition |
| Progression de lecture | `animation-timeline: scroll(root)`, aucun écouteur |
| Empilement des offres | `position: sticky` à décalages croissants, bande de titre de même hauteur |
| Halo du hero | Deux variables CSS écrites au rythme de l'écran, pointeur fin |
| Compteur de métiers | Marquee CSS existant, conservé |

Règles fermes : `transform` et `opacity` uniquement, 150 à 300 ms sur les
micro-interactions, `prefers-reduced-motion` respecté partout. Les hooks qui
masquent avant de révéler renoncent à l'animation si la hauteur de viewport est
nulle — onglet en arrière-plan, prérendu — plutôt que de laisser du contenu
définitivement invisible.

---

## 7. Visuels

Les illustrations d'offre sont construites en balisage. Les captures de sites
clients sont réelles, prises en headless sur les sites en ligne.

Frontière à ne pas franchir : rien de généré ne représente un chantier, un client,
un local ou une équipe. Les captures des trois sites clients sont réelles et le
restent. Le générateur habille, il ne témoigne pas.

**Révision du 2 septembre 2026.** Les visuels abstraits générés ont été retirés
du site, ainsi que la boucle vidéo du hero. Motif : trop vagues, ils ne disaient
ni « Google Ads » ni « un agent qui répond au téléphone ». Les illustrations
d'offre sont désormais des maquettes construites en balisage, qui montrent le
mécanisme annoncé par le titre en face. Elles ne copient l'interface d'aucun
produit tiers et portent une légende qui dit qu'il s'agit d'un schéma. Là où la
preuve existe, c'est une vraie capture d'un site livré qui sert d'illustration.

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

- Le papier chaud, quand le secteur entier travaille en blanc froid ou en lavande.
- Les mots en serif italique à l'intérieur des titres.
- Le vert réservé au vérifiable.
- Les trois réalisations réelles, ouvrables, avec leurs vraies captures.
- Le visage du fondateur à un endroit où les concurrents mettent une photo d'équipe.
