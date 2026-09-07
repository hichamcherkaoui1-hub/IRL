# Schéma Notion — Base "IRL Assessment"

Base indépendante (recommandation retenue), reliée au Registre Projets TRL existant via `ID projet CIO`
(et optionnellement une relation Notion si `NOTION_TESP_DB_ID` est fourni au script de création).

## Créer la base

Option A — script (recommandé, crée les 28 propriétés d'un coup) :

```bash
cd scripts
NOTION_TOKEN=secret_xxx NOTION_PARENT_PAGE_ID=xxxxxxxxxxxx node create-notion-db.js
# optionnel, pour lier au Registre Projets TRL :
NOTION_TOKEN=secret_xxx NOTION_PARENT_PAGE_ID=xxxxxxxxxxxx NOTION_TESP_DB_ID=xxxxxxxxxxxx node create-notion-db.js
```

La page parent (`NOTION_PARENT_PAGE_ID`) doit être partagée avec l'intégration Notion au préalable
(Notion > page > ••• > Connexions > ajouter l'intégration).

Option B — création manuelle : reproduire les propriétés ci-dessous à l'identique (orthographe exacte,
l'app s'appuie dessus pour le push).

## Propriétés (28)

| Propriété | Type | Valeurs / format |
|---|---|---|
| Nom du projet | Title | — |
| ID projet CIO | Text | tel que défini par l'équipe CIO |
| Entite | Text | ex. UM6P |
| SBU sponsor | Text | ex. Nutricrops, Mining, SBU SPS... |
| IRL - Batch | Select | Batch 1 / Batch 2 / Batch 3 / Batch 4 |
| IRL - Date limite | Date | 15/10/2026 par défaut |
| IRL - Statut transmission | Select | Brouillon / Pret a transmettre / Transmis / Valide LaunchX |
| IRL - Valide par Head Innovation | Checkbox | — |
| IRL - Team - Statut | Select | Oui / Partiel / Non |
| IRL - Team - Confiance | Select | Elevee / Moyenne / Faible |
| IRL - Team - Preuve | Text | preuves citées, une ligne par sous-critère |
| IRL - Business - Statut | Select | Oui / Partiel / Non |
| IRL - Business - Confiance | Select | Elevee / Moyenne / Faible |
| IRL - Business - Preuve | Text | — |
| IRL - IP - Statut | Select | Oui / Partiel / Non |
| IRL - IP - Confiance | Select | Elevee / Moyenne / Faible |
| IRL - IP - Preuve | Text | — |
| IRL - Financement - Statut | Select | Oui / Partiel / Non |
| IRL - Financement - Confiance | Select | Elevee / Moyenne / Faible |
| IRL - Financement - Preuve | Text | — |
| IRL - Commercial - Statut | Select | Oui / Partiel / Non |
| IRL - Commercial - Confiance | Select | Elevee / Moyenne / Faible |
| IRL - Commercial - Preuve | Text | — |
| IRL - CRL | Number | 1 à 9 (échelle CRL officielle) |
| IRL - Score global | Number | 0 à 5 (nb de dimensions à "Oui") |
| IRL - Recommandation transmission | Select | Pret / A completer / Non pret |
| IRL - Synthese | Text | note de synthèse du Head Innovation |
| IRL - Date generation | Date | date du dernier passage de l'app |
| Projet lie (TESP) | Relation | vers le Registre Projets TRL — seulement si NOTION_TESP_DB_ID fourni |

## Pourquoi une base indépendante plutôt que des propriétés sur le Registre TRL existant

- Ne pollue pas le Registre Projets TRL avec ~24 propriétés supplémentaires spécifiques à un exercice
  ponctuel (batches de 15 jours, échéance 15/10/2026).
- Permet un cycle de vie propre : une ligne par (projet × batch) si un projet repasse plusieurs fois.
- La relation `Projet lie (TESP)` garde le lien avec le Registre existant pour les vues croisées côté
  dashboard TI² (module 4, "Alertes croisées", déjà en roadmap dans `ti2-portal`).

## Import initial depuis la BDD Innovation UM6P (0109)

Les colonnes `ID projet CIO`, `Entite`, `SBU sponsor` et `Nom du projet` de cette base peuvent être
pré-remplies directement depuis les colonnes F, G, H, S de la BDD Innovation UM6P (`0109_BDD_Innovation
_UM6P...xlsx`, onglet `UM6P_0109`) pour éviter une ressaisie — un script d'import CSV → Notion est un
prochain pas naturel une fois le mapping Notion (`Mapping_BDD_IRL_vs_Notion.xlsx` déjà transmis) validé.
