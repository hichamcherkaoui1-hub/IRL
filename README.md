# IRL Assessment — TESP/UM6P

App autonome pour préparer l'IRL Assessment (Innovation Readiness Level) lancé par le Corporate
Innovation Office le 07/09/2026 — 5 dimensions non-technologiques (Équipe, Business, Propriété
intellectuelle, Financement, Commercial), pré-remplies par IA avec preuve citée, avant validation par
le Head Innovation et transmission à LaunchX. Le TRL fait l'objet d'un exercice séparé (ITX
Techcell-engineering / TTO UM6P) — non couvert par cette app.

Même architecture technique que `tesp-orchestrateur` et `valoriq-TI` (proxy Vercel + Notion), pour
rester maintenable avec le même réflexe : `api/claude.js` et `api/notion.js` sont copiés à
l'identique depuis `tesp-orchestrateur-main`, `prompts-um6p.js` et `memoire-um6p.js` sont les modules
partagés (ne pas les dupliquer/modifier ici — source unique de vérité dans le repo TESP).

## 🧠 Agents

- `SYS_IRL_TEAM` — maturité équipe (6 sous-critères)
- `SYS_IRL_BIZ` — maturité business model (5 sous-critères)
- `SYS_IRL_IP` — maturité propriété intellectuelle (5 sous-critères)
- `SYS_IRL_FIN` — maturité financement (5 sous-critères)
- `SYS_IRL_COM` — maturité commerciale, alignée sur l'échelle CRL officielle de la BDD Innovation UM6P
  (colonne AG, onglet `UM6P_0109`)
- `SYS_IRL_GATE` — agrège les 5 verdicts (sans les réévaluer), liste les gaps ("Non"), les points à
  clarifier ("Partiel"), calcule un score global /5 et une recommandation de transmission

Tous suivent le protocole anti-hallucination de la note du 07/09/2026 : un statut "Oui" exige une
preuve citable (test, livrable, résultat documenté, validation technique, prototype, rapport, retour
client formalisé) ; à défaut, "Non" par défaut. C'est la même logique que `SYS_SEI` dans
`tesp-orchestrateur` (documenté=true/false, fiabilité Élevée/Moyenne/Faible), adaptée au format
oui/partiel/non + preuve au lieu d'un score /100.

## ⚠️ Statut du questionnaire

Le questionnaire IRL exact (LaunchX) n'était pas encore communiqué à la date de rédaction de cette
app — l'email du 07/09/2026 annonce "une communication dédiée" à venir. Les sous-critères par
dimension sont donc construits sur des référentiels de maturité standards (due-diligence VC /
stage-gate), pas sur les questions officielles telles quelles. Dès réception du questionnaire réel :
remplacer les listes de sous-critères dans `agents-irl.js` (un objet par agent, structure identique)
sans toucher au reste de l'app — les prompts, le rendu et le push Notion s'adaptent automatiquement
tant que le schéma JSON `{dimension, criteres:{...}, statut_dimension, fiabilite_globale, ...}` est
respecté.

## 🗄️ Notion

Voir `NOTION_SCHEMA.md`. Base indépendante "IRL Assessment" (recommandé), reliée au Registre Projets
TRL existant via `ID projet CIO`. Créer la base avec `scripts/create-notion-db.js` avant le premier
push.

## 🚀 Déploiement (identique à tesp-orchestrateur / valoriq-TI)

### Variables d'environnement Vercel

- `ANTHROPIC_API_KEY` — clé `sk-ant-...` (obligatoire, côté serveur uniquement)
- `TESP_ACCESS_PASSWORD` — mot de passe partagé pour le proxy (recommandé, même mécanisme que les
  autres apps — peut être un mot de passe dédié différent de celui de TESP)

### Option A — Glisser-déposer Vercel

1. [vercel.com/new](https://vercel.com/new) → Browse → sélectionner le dossier `irl-assessment/`
2. Vercel détecte automatiquement `index.html`
3. Déployer, puis renseigner les variables d'environnement ci-dessus dans Settings

### Option B — Via GitHub (recommandé pour suivi versions)

1. Pousser ce dossier sur un repo `irl-assessment`
2. Connecter le repo dans Vercel → redéploiement automatique à chaque push

## 🎨 Personnalisation

- Couleurs : variables CSS dans `:root` (`index.html`) — palette navy/gold, distincte de TESP
  (terracotta) et ValorIQ (rouge brique), pour rester visuellement identifiable dans le portail TI².
- Sous-critères par dimension : `agents-irl.js`
- Contexte institutionnel IRL (calendrier, principes) : `prompts-irl.js` (`cadreIRL()`, `gardeIRL()`)

## 📂 Structure des fichiers

```
irl-assessment/
├── index.html              ← UI + orchestration des 6 agents + push Notion
├── agents-irl.js            ← les 6 prompts SYS_IRL_* (à ajuster dès réception du questionnaire LaunchX)
├── prompts-irl.js           ← fragments partagés IRL (cadre, garde anti-hallucination, échelle CRL)
├── prompts-um6p.js          ← copié tel quel depuis tesp-orchestrateur-main (ne pas dupliquer/diverger)
├── memoire-um6p.js          ← copié tel quel depuis tesp-orchestrateur-main (mémoire institutionnelle)
├── api/
│   ├── claude.js            ← copié tel quel (proxy Anthropic, streaming SSE)
│   └── notion.js             ← copié tel quel (proxy Notion, CORS)
├── scripts/
│   └── create-notion-db.js  ← crée la base Notion "IRL Assessment" via l'API
├── NOTION_SCHEMA.md
├── vercel.json
├── package.json
└── README.md
```

## 📎 Fichiers en entrée

Zone de dépôt (glisser-déposer ou clic) dans la section "Projet à évaluer", en plus du texte collé —
même logique que `tesp-orchestrateur` :

- **XLSX/XLS** → SheetJS, converti en texte tabulaire (Bilan et Plan d'action, BDD Innovation UM6P…)
- **DOCX** → Mammoth, texte brut extrait
- **PPTX** → JSZip, texte des slides + notes du présentateur + jusqu'à 8 images extraites
- **PDF** → envoyé nativement à Claude en base64 (≤3 MB) ; au-delà, texte extrait côté navigateur via
  pdf.js pour éviter les timeouts proxy (jusqu'à 200 pages)
- **Images** (PNG/JPG/GIF/WEBP) → envoyées nativement à Claude
- **.doc/.ppt** (anciens formats binaires) → rejetés explicitement, convertir en .docx/.pptx ou PDF

Les fichiers convertis en texte sont ajoutés au contexte de TOUS les agents (comme le texte collé) ;
les fichiers PDF/image natifs et les images extraites de PPTX sont envoyés en pièces jointes
multimodales à Claude. Bibliothèques chargées à la demande depuis cdnjs/jsdelivr (mêmes CDN que
`tesp-orchestrateur`) — nécessite un accès réseau sortant depuis le navigateur de l'utilisateur.

## 🔜 Limites connues de cette v1 (MVP)

- Pas de recherche automatique de la page Notion par `ID projet CIO` — l'ID de page se colle
  manuellement avant le push. Ajout naturel : requêter `/api/notion?path=/databases/{id}/query` avec
  un filtre sur la propriété `ID projet CIO`, comme le fait déjà `tesp-orchestrateur` pour son import.
- Sous-critères génériques en attendant le questionnaire LaunchX (voir plus haut).
- Pas de mot de passe dédié pré-provisionné — réutilise le même mécanisme `x-tesp-password` que les
  autres apps ; possibilité de définir un mot de passe distinct via `TESP_ACCESS_PASSWORD` sur ce
  projet Vercel spécifiquement (les projets Vercel ont chacun leurs propres variables d'env).

---

Made for UM6P TI² Division — IRL Assessment 2026.
