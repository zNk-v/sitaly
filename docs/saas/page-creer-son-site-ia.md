# Page « Créer son site avec l'IA » : plan avant code

Rédigé le 29 octobre 2026. Ce plan reprend l'architecture de durable.com
(relevée le même jour) et l'adapte aux règles de DESIGN.md. On reprend la
structure, pas les textes ni le design.

---

## 1. Ce que Durable fait, relevé le 29/10/2026

### Le menu

Deux entrées : « Créateur de sites Web IA » et « Tarifs ». À droite :
« S'inscrire » et un bouton « Commencez gratuitement ». Rien d'autre.

### La page d'accueil (durable.com/fr)

1. Hero : promesse, et un **champ de saisie** « Quel type d'entreprise
   développez-vous ? ». Le visiteur commence le parcours sur la page même.
   Dessous : note Trustpilot et nombre d'entreprises.
2. Bandeau de métiers qui défile.
3. « Conçu pour votre entreprise » : six familles de métiers.
4. La plateforme : onglets (design, rédaction, mobile, SEO, domaine,
   statistiques), puis les modules (images, SEO, avis, réservations, CRM).
5. L'assistant IA, montré comme une conversation.
6. « Moins d'outils à mélanger ».
7. FAQ, liste « Ce qui est inclus », appel final.

### La page produit (durable.com/fr/ai-website-builder)

1. Hero : promesse, bouton, preuve sociale.
2. Trois étapes : répondre à trois questions, le site est généré, on
   l'édite.
3. Preuve sociale (créateurs de contenu).
4. **Tableau comparatif** contre huit concurrents nommés.
5. Quatre blocs « tout est fait pour vous » : rédaction, SEO, modèles,
   sécurité.
6. Long texte pour le référencement.
7. FAQ de douze questions, prix compris.
8. Appel final.

### Les tarifs (durable.com/fr/pricing)

| Plan | Prix | Ce qu'il donne |
|---|---|---|
| Gratuit | 0 $ | **Aperçu privé** sur `*.durable.site`, 300 crédits IA au total, CRM limité à 10 clients |
| Launch | 22 $/mois en annuel, 25 $ en mensuel | Domaine perso, domaine offert jusqu'à 20 $, 1 000 crédits IA/mois, réservations |
| Grow | 41 $/mois | Équipe illimitée, 5 000 crédits, traduction, accompagnement à l'installation |

- Remise annuelle de 15 %.
- Tableau comparatif par rubriques.
- L'usage de l'IA se compte en crédits.
- Les sites sont hébergés chez Cloudflare (dit dans leur FAQ).
- Pour récupérer son domaine en partant, il faut les contacter. Le transfert
  prend « quelques semaines », avec une durée minimale d'abonnement.

### Ce qu'on en retient

1. **On essaie gratuitement, on paie pour publier.** Le visiteur voit son site
   avant de payer, et l'aperçu gratuit ne coûte presque rien à héberger.
2. **Le parcours commence dans le premier écran,** par un champ et non par un
   bouton.
3. **Le menu est court.** Le produit a sa page et ses tarifs, sans
   arborescence.
4. **Trois colonnes de prix,** dont une gratuite.

---

## 2. Les adaptations Sitaly

| Durable | Sitaly | Raison |
|---|---|---|
| Comparatif avec concurrents nommés | Comparatif par catégorie : agence classique, éditeur à faire soi-même, Sitaly | DESIGN.md §8 : aucun concurrent nommé |
| Note Trustpilot, « 3 millions » | Note Google réelle (`avis-google.ts`), trois sites livrés réels | Aucun chiffre qu'on ne peut pas prouver |
| Troisième plan « Grow » | Troisième colonne : **Présence, l'accompagnement humain** à 149 €/mois | L'humain est notre différence. Durable ne le vend pas. |
| Domaine récupérable en quelques semaines | **Le domaine est à votre nom, vous partez avec quand vous voulez** | Argument concret, à condition de l'appliquer à l'achat (titulaire = le client) |
| Images générées par IA | Photos du client, banque libre, maquettes en balisage | DESIGN.md §7 : rien de généré ne représente un chantier ou un client |
| Six familles généralistes | Bâtiment et extérieur d'abord, avec liens vers les pages métiers existantes | Notre public et notre maillage interne |
| Crédits IA | Limites dites en clair : « 30 réécritures par mois » | Un artisan ne raisonne pas en crédits |

---

## 3. La page `/creer-son-site-ia/`

Adresse à confirmer après une recherche de volume (créer site internet ia,
créateur site ia, site internet ia gratuit).

Une règle propre à cette page : le bouton principal devient « Voir mon site ».
« Trouver mon offre » descend au rang de lien, dans la colonne Présence. C'est
la seule page où l'ordre des appels change (DESIGN.md §8).

### Section 1 : hero

- Titre, à choisir (minuscules, un mot en serif italique, DESIGN.md §4) :
  - « votre site *écrit* pour votre métier, en ligne aujourd'hui »
  - « décrivez votre activité, l'IA *écrit* votre site »
- Sous-titre : « Vous donnez votre métier et votre ville. Sitaly écrit les
  pages, vous relisez, vous publiez sur votre nom de domaine. »
- Champ unique : « Votre métier et votre ville » (ex. couvreur à Arpajon),
  bouton **Voir mon site**.
- Sous le bouton : « Aperçu gratuit, sans carte bancaire ».
- Preuve : note Google réelle, « Entreprise française, Brétigny-sur-Orge ».

### Section 2 : la démonstration

Une maquette en balisage montre la phrase saisie qui devient un site. La
marque est inventée, son adresse finit en `.exemple`, et une légende dit
« exemple » (même règle que la page Premium, DESIGN.md §12).

### Section 3 : trois étapes

1. **Décrivez.** Métier, ville, services, coordonnées. Deux minutes.
2. **Relisez.** Vous changez un texte, une photo, une couleur. L'IA réécrit
   une section si vous le demandez, sans toucher au reste.
3. **Publiez.** Sur votre nom de domaine, avec le certificat HTTPS.

### Section 4 : pour quels métiers

Six familles, chacune reliée aux pages existantes :

- Bâtiment (couvreur, plombier, électricien, maçon, menuisier, peintre)
- Extérieur (paysagiste, élagueur)
- Services à domicile
- Beauté et bien-être
- Commerces
- Professions libérales

### Section 5 : ce qui est inclus

Quatre blocs :

- **Des textes écrits pour votre métier et votre ville,** pas un modèle
  générique. Vous gardez la main sur chaque phrase.
- **Les bases du référencement local** : titres, descriptions, données
  structurées, plan du site, fichier pour les assistants IA. Aucune promesse
  de place sur Google.
- **Vos demandes de devis dans votre espace,** et par e-mail.
- **L'hébergement, le HTTPS, la connexion de votre domaine.**

### Section 6 : votre domaine vous appartient

Section courte et dédiée : c'est l'argument que Durable ne peut pas porter.
Le domaine est déclaré au nom du client. Il part avec quand il veut, sans
durée minimale.

### Section 7 : le comparatif

| | Agence classique | Éditeur à faire soi-même | Sitaly |
|---|---|---|---|
| Délai | Semaines | Des heures de travail | Minutes, puis relecture |
| Textes | Écrits pour vous | À écrire vous-même | Écrits pour votre métier |
| Prix | Création facturée + mensuel | Abonnement | Abonnement, aperçu gratuit |
| Domaine à votre nom | Selon le contrat | Oui | Oui |
| Un humain si besoin | Oui | Non | Oui, avec Présence |

### Section 8 : les tarifs

| Aperçu | Sitaly Solo (nom à choisir) | Présence |
|---|---|---|
| Gratuit | **XX €/mois**, sans engagement | **149 €/mois**, l'équipe le fait pour vous |
| Site généré, aperçu privé non indexé | Publication, domaine perso, demandes reçues, réécritures IA | Création, contenus, suivi, modifications (périmètre du contrat Présence) |
| Bouton : Voir mon site | Bouton : Voir mon site | Lien : Trouver mon offre |

- Les montants viennent de `src/data/offres.ts` : nouvelle offre dans `OFFRES`
  et nouvelle grille dans `GRILLES`.
- Mention « TVA non applicable, art. 293 B du CGI » tant que Sitaly reste en
  franchise : le « HT » du prompt maître ne s'affiche donc pas.

### Section 9 : la preuve

Les trois réalisations réelles, présentées pour ce qu'elles sont : « des sites
livrés par l'équipe Sitaly ». Ces sites n'ont pas été générés par l'IA, et la
page ne le laisse pas croire.

### Section 10 : FAQ

1. Combien coûte un site créé avec l'IA de Sitaly ?
2. L'aperçu est-il vraiment gratuit ?
3. J'ai déjà un nom de domaine, je le garde ?
4. À qui appartient mon nom de domaine ?
5. Puis-je arrêter quand je veux ?
6. Puis-je tout modifier après la génération ?
7. L'IA peut-elle écrire des choses fausses sur mon entreprise ? (Réponse :
   oui, d'où la relecture avant publication.)
8. Mon site sera-t-il bien placé sur Google ? (Réponse : aucune garantie, et
   ce qu'on fait pour aider.)
9. Mon site fonctionne-t-il sur téléphone ?
10. Je préfère qu'on s'en occupe pour moi : c'est possible ?

### Section 11 : appel final

Le même champ que le hero.

### Données structurées

`SoftwareApplication` avec `Offer` pour chaque prix, `FAQPage`,
`BreadcrumbList`.

---

## 4. Le menu

**Phase 1 (maintenant).** On garde Site web, Visibilité et Agents IA, et on
ajoute :

- une entrée **« Créer avec l'IA »** marquée « Nouveau », en tête de l'onglet
  Site web et visible à côté des onglets ;
- un lien **« Se connecter »** à droite, le jour où app.sitaly.fr ouvre.

**Phase 2 (la bascule, seulement si les clients payants suivent).** On passe
au menu Durable : « Créateur de site IA », « Tarifs », « On s'en occupe pour
vous » (Présence, agents IA, visibilité), « Se connecter », bouton « Voir mon
site ». La page d'accueil devient la page produit.

---

## 5. Lancer la page avant que l'application existe

L'application prend plusieurs semaines. La page peut servir dès maintenant de
test de demande :

1. Le champ du hero ouvre trois questions et demande un e-mail : « Recevez
   l'aperçu de votre site sous 48 h ».
2. La demande passe par un nouveau circuit `pilote` du relais `~/sitaly-forms`.
3. Tu produis l'aperçu avec Claude et un modèle, puis tu envoies le lien.
4. Tu proposes le premier mois payant.

Ce qu'on mesure : champs remplis, aperçus envoyés, **paiements**. Une
inscription gratuite ne prouve rien. Dix paiements valident le prix avant la
première ligne de l'application.

Limite : cette étape te coûte du temps par demande. On fixe un plafond, par
exemple vingt aperçus par semaine.

---

## 6. Décisions à prendre

1. **Le prix de l'offre libre-service.** Durable : 25 $ en mensuel, 22 $ en
   annuel. Je recommande 29 €/mois : au-dessus de Durable par l'humain
   disponible et le domaine à votre nom, très loin des 149 € de Présence.
2. **Le nom de l'offre.** Sitaly Solo, Présence Solo, Sitaly Express. Je
   recommande Sitaly Solo : il dit « vous le faites seul » sans brouiller
   Présence.
3. **Le domaine des aperçus.** `sitaly.site` répondait libre au registre le
   29/10/2026 (RDAP 404). Prix à vérifier chez un registrar : certaines
   extensions classent des noms en « premium ».
4. **Lancer en mode pilote (§5) ou attendre l'application.** Je recommande le
   pilote.
5. **L'adresse de la page,** après une recherche de volume de mots-clés.

---

## 7. Décisions du 29 octobre 2026 (après le plan)

- Pilote lancé. Allure de la page : celle de durable.com (DESIGN.md §13),
  titres en Plus Jakarta Sans.
- Grille calquée sur Durable (Gratuit, Launch, Grow), noms choisis par Teddy :
  **Découverte** (0 €, aperçu privé), **Essentiel** (39 €/mois),
  **Pro** (79 €/mois, « Tout Essentiel, plus : »). Mêmes familles de
  fonctions que Durable, écrites par nous. Ce que le pilote ne livre pas encore
  (carnet de clients, rendez-vous en ligne, agents IA, crédits IA, équipe)
  s'affiche grisé avec « Bientôt ». Présence reste dans un bandeau sous la
  grille.
- Engagements du pilote écrits dans les cartes, à tenir à la main :
  retouches sur l'aperçu, accusé de réception automatique des demandes,
  domaine offert (20 €/an en Essentiel, crédit de 40 € en Pro), 2 ou 5
  modifications par mois, photos libres de droits, assistance sous 24 h
  (Essentiel) ou 48 h (Découverte), rendez-vous d'une heure et deuxième
  langue (Pro).
- Noms et montants dans `CREATEUR_IA` (`src/data/offres.ts`), contenu des
  cartes dans `FORMULES` (`src/routes/creer-son-site-ia.tsx`).
- Pro coûte le même prix que la Maintenance de site existant
  (79 €/mois) : deux offres différentes au même montant, à surveiller.
