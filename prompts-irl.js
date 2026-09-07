// prompts-irl.js — v1 (07 septembre 2026)
// ============================================================================
// Module PARTAGÉ de fragments de prompt — spécifique à l'IRL Assessment
// (Innovation Readiness Level), lancé par le Corporate Innovation Office le
// 07/09/2026. Complète prompts-um6p.js SANS le redupliquer : le glossaire et
// le catalogue plateformes restent la propriété exclusive de memoire-um6p.js
// (injectés via MEM_UM6P), l'échelle TRL et la garde anti-hallucination
// générique restent la propriété de prompts-um6p.js (PROMPTS_UM6P).
//
// Contenu propre à ce module :
//   - cadreIRL()     : contexte institutionnel de l'exercice IRL (principes,
//     calendrier, séparation avec l'exercice TRL séparé ITX/TTO).
//   - gardeIRL()     : garde anti-hallucination SPÉCIFIQUE au protocole IRL —
//     "oui" uniquement si objectivable par une preuve concrète, sinon "non"
//     par défaut. Reprend le libellé exact de la note du 07/09/2026 pour ne
//     laisser aucune place à l'interprétation.
//   - echelleCRL()   : échelle CRL 1-9 (Commercial Readiness Level), reprise
//     à l'identique de l'onglet "Data" de la BDD Innovation UM6P (0109) —
//     source unique, ne pas la redéfinir ailleurs.
//   - formatSortieIRL(nomAgent) : rappel de format de sortie JSON compact,
//     avec le nom d'agent injecté dans meta_evaluation.
//
// Déploiement : charger en <script src="prompts-irl.js"> APRÈS
// memoire-um6p.js et prompts-um6p.js, AVANT le script principal.
// Expose window.PROMPTS_IRL.
// ============================================================================
(function () {
  "use strict";

  function cadreIRL() {
    return "\n\n=== CADRE INSTITUTIONNEL — IRL ASSESSMENT (Corporate Innovation Office, 07/09/2026) ===\n" +
      "Cette évaluation s'inscrit dans l'exercice IRL Assessment (Innovation Readiness Level) lancé par le " +
      "Corporate Innovation Office le 07 septembre 2026, dans le cadre de la curation des budgets d'innovation " +
      "du Groupe OCP pour les arbitrages 2026. Objectif : une vision 360°, factuelle, homogène et fiable de la " +
      "maturité réelle des projets de recherche et d'innovation.\n" +
      "PÉRIMÈTRE : l'IRL couvre 5 dimensions non-technologiques — maturité commerciale, équipe, business, " +
      "propriété intellectuelle, financement. La maturité technologique globale (TRL) fait l'objet d'un exercice " +
      "SÉPARÉ, conduit avec les équipes Techcell-engineering d'ITX et la TTO de l'UM6P — ne pas la mélanger " +
      "avec l'évaluation IRL courante, sauf si explicitement demandé.\n" +
      "ACCOMPAGNEMENT : l'IRL Assessment est accompagné par LaunchX, qui revoit les réponses transmises.\n" +
      "CALENDRIER : batches de 15 jours, premier batch lancé le 07/09/2026. Échéance incontournable : 15 " +
      "octobre 2026 — tout projet non complété, non qualifié ou insuffisamment documenté à cette date n'est " +
      "pas éligible au budget annuel.\n" +
      "RESPONSABILITÉ : les Heads Innovation et managers sont garants de la qualité, l'exactitude et la " +
      "complétude des données remontées ; ils valident les réponses avant transmission à LaunchX.\n";
  }

  function gardeIRL() {
    return "\n\n=== GARDE ANTI-HALLUCINATION — PROTOCOLE IRL (impérative, ne jamais assouplir) ===\n" +
      "Les 4 principes ci-dessous sont ceux de la note officielle du 07/09/2026 — applique-les à la lettre, " +
      "critère par critère, sans exception :\n" +
      "1. SINCÉRITÉ ET RIGUEUR : chaque réponse doit refléter l'état RÉEL du projet, jamais un niveau de " +
      "maturité supérieur à la réalité documentée.\n" +
      "2. \"OUI\" UNIQUEMENT SI OBJECTIVABLE : un statut 'Oui' doit être justifié par un élément concret et " +
      "vérifiable — test réalisé, livrable disponible, résultat documenté, validation technique, prototype, " +
      "rapport, retour client formalisé, ou tout autre élément de preuve équivalent. Cite TOUJOURS cette preuve " +
      "dans le champ 'preuve' (document + passage ou donnée précise). À DÉFAUT D'ÉLÉMENT DE PREUVE CITABLE, LA " +
      "RÉPONSE ATTENDUE EST 'Non' — jamais 'Oui' par extrapolation, intention déclarée ou plausibilité générique. " +
      "Un statut 'Partiel' n'est autorisé que si une preuve PARTIELLE et documentée existe (ex: démarche engagée " +
      "mais non finalisée, preuve datée mais incomplète) — jamais comme échappatoire par défaut.\n" +
      "3. MATURITÉ ACTUELLE, PAS POTENTIEL FUTUR : évalue exclusivement ce qui est effectivement réalisé, " +
      "testé, démontré ou documenté À CE STADE. Ce qui est envisagé, en cours de discussion ou considéré comme " +
      "possible n'est PAS une preuve — signale-le comme tel dans 'limites_analyse' plutôt que de le compter " +
      "comme acquis.\n" +
      "4. TRAÇABILITÉ POUR REVUE EXPERTS : les réponses seront revues par les experts mandatés (LaunchX) et le " +
      "porteur de projet devra pouvoir justifier chaque 'Oui'. Une preuve vague ('nous y travaillons', 'c'est " +
      "prévu') n'est pas une preuve — rétrograde le statut à 'Non' ou 'Partiel' selon le cas.\n" +
      "RAPPEL GÉNÉRAL : n'invente jamais un chiffre, un nom, une date ou un document non présent dans la source. " +
      "Information absente → 'Non' + champ 'preuve' vide ou explicitant l'absence, jamais une valeur par défaut " +
      "optimiste.\n";
  }

  function echelleCRL() {
    return "\n\n=== ÉCHELLE CRL OFFICIELLE — Commercial Readiness Level (BDD Innovation UM6P, onglet Data) ===\n" +
      "CRL 1 : Market and customer needs identified\n" +
      "CRL 2 : Preliminary value proposition and commercial assumptions defined\n" +
      "CRL 3 : Initial assessment of market opportunity and customer relevance completed\n" +
      "CRL 4 : Commercialization strategy and business model under development\n" +
      "CRL 5 : Validation of customer interest and preliminary market engagement\n" +
      "CRL 6 : Commercial viability tested through pilots or operational demonstrations\n" +
      "CRL 7 : Initial commercialization pathway validated in operational conditions\n" +
      "CRL 8 : Commercial deployment readiness demonstrated and scaling approach defined\n" +
      "CRL 9 : Commercial deployment achieved with demonstrated market adoption\n" +
      "Cette échelle est celle utilisée dans la BDD Innovation UM6P (colonne AG, onglet UM6P_0109) — reste " +
      "cohérent avec elle plutôt que d'inventer une échelle parallèle.\n";
  }

  function formatSortieIRL(nomAgent) {
    return "\n\n=== RAPPEL DE FORMAT ===\nRéponds UNIQUEMENT en JSON valide compact, sans markdown, sans backticks. " +
      "Le champ meta_evaluation.agent doit valoir exactement \"" + nomAgent + "\", et meta_evaluation.date_iso " +
      "doit reprendre la date du jour fournie plus haut.\n";
  }

  window.PROMPTS_IRL = {
    version: "prompts-irl v1 (2026-09-07)",
    cadreIRL: cadreIRL,
    gardeIRL: gardeIRL,
    echelleCRL: echelleCRL,
    formatSortieIRL: formatSortieIRL
  };
})();
