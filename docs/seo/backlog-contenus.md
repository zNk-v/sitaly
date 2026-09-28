# Backlog des contenus, à partir d'octobre 2026

Un article par semaine, dans cet ordre (annexe G du plan SEO). Ce qui doit se
classer en novembre part en octobre. Les contenus « site internet » se
préparent pour janvier à mars, leur pic. Rien d'important ne se lance en
juillet et août.

Chaque article suit `src/data/blog-posts-agents-ia.ts` : `metaTitle` de 60
caractères au plus, `metaDescription` de 120 à 160, auteur Teddy Vidal, champ
`cta`, un lien vers la page de vente dans l'introduction et deux liens internes
de plus. Faits de la section 3 du plan, ou sources ouvertes et datées. Le corps
va dans `src/data/articles/<slug>.ts`.

| Semaine du | # | Sujet | Page à soutenir | CTA |
|---|---|---|---|---|
| 5 octobre 2026 | 1 | Agent IA : définition simple, et ce qui le distingue d'un logiciel classique | /agents-ia/ | agents-ia |
| 12 octobre 2026 | 2 | 12 exemples d'agents IA en PME, classés par métier | /agents-ia/ et les trois pages secteurs | agents-ia |
| 19 octobre 2026 | 3 | Agent IA ou scénario n8n : comment savoir si vous avez vraiment besoin d'IA | /automatisation-taches/ | automatisation |
| 26 octobre 2026 | 4 | Quel agent IA choisir pour une PME en 2026 : comparatif par usage | /agents-ia/ | agents-ia |
| 2 novembre 2026 | 5 | Agent IA pour Gmail et Outlook : trier, répondre et relancer les e-mails d'une PME | /agents-ia/ | agents-ia |
| 9 novembre 2026 | 6 | Risques des agents IA en entreprise : erreurs, fuites de données, dérives, et comment les cadrer | /agents-ia/, /blog/agent-ia-rgpd/ | agents-ia |
| 16 novembre 2026 | 7 | Comment fonctionne un agent IA : mémoire, outils et règles expliqués aux dirigeants | /agents-ia/ | agents-ia |
| 23 novembre 2026 | 8 | Agent IA autonome : ce qu'il peut décider seul, ce qui doit rester humain | /agents-ia/ | agents-ia |
| 30 novembre 2026 | 9 | Agent IA et RAG : pourquoi votre agent doit s'appuyer sur vos propres documents | /agents-ia/ | agents-ia |
| 7 décembre 2026 | 10 | ChatGPT, Claude ou Mistral : sur quel modèle bâtir l'agent IA d'une entreprise française | /agents-ia/ | agents-ia |
| 14 décembre 2026 | 11 | Agent IA gratuit ou sur mesure : ce que le gratuit coûte vraiment en entreprise | /agents-ia/, /blog/prix-agent-ia/ | agents-ia |
| 21 décembre 2026 | 12 | Agent vocal IA en France : ce qu'il faut exiger (voix, RGPD, AI Act, hébergement) | /agents-ia/agent-vocal/ | agents-ia |
| 4 janvier 2027 | 13 | Mettre en place un agent IA dans une PME : étapes, délais et budget d'un projet | /agents-ia/ | agents-ia |
| 11 janvier 2027 | 14 | Agent IA pour agence immobilière : ce qu'il gère, ce qu'il coûte, comment le tester | /agents-ia/agences-immobilieres/ | agents-ia |
| 18 janvier 2027 | 15 | Les agents IA dont on parle (Claude Code, OpenClaw, Hermes agent, « skills ») expliqués à une PME | /agents-ia/ | agents-ia |
| Quand Ted l'aura complété | 16 | ChatGPT Ads Manager : créer une première campagne pas à pas (`docs/seo/brouillons/chatgpt-ads-manager.md`) | /chatgpt-ads/ | chatgpt-ads |
| Seulement avec une source officielle datée (D6) | 17 | Gemini Ads | à définir | chatgpt-ads |

Semaine du 21 décembre : publication possible, mais l'article n° 12 peut glisser
au 4 janvier si la semaine est creuse ; décalez alors toute la suite d'une
semaine plutôt que de doubler une semaine.

## Points d'attention par article

- **n° 3** : lien vers /automatisation-taches/ dans l'introduction. C'est le
  seul du lot qui pousse le CTA « automatisation ».
- **n° 6 et n° 12** : s'appuyer sur la checklist RGPD et les articles AI Act et
  démarchage déjà publiés ; mêmes sources, pas de nouvelle affirmation
  juridique sans texte ouvert.
- **n° 10** : aucun comparatif chiffré entre modèles sans source datée. Claude
  d'Anthropic est le modèle utilisé par Sitaly (fait autorisé).
- **n° 11 et n° 13** : montants lus dans `PRIX_AGENTS_IA` ; si `afficher` passe
  à false, aucun montant.
- **n° 14** : soutien de /agents-ia/agences-immobilieres/ ; pas d'avis de
  valeur, pas de résultat chiffré.
- **n° 15** : vérifier chaque nom de produit sur une source ouverte avant
  d'écrire.
