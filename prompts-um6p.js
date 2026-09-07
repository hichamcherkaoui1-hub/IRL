// prompts-um6p.js — v1 (16 juin 2026)
// ============================================================================
// Module PARTAGÉ de fragments de prompt — source unique de vérité pour les
// blocs d'instruction répétés à travers les agents TESP / ValorIQ / Portail.
//
// PÉRIMÈTRE : ce module porte UNIQUEMENT les fragments qui NE sont PAS dans
// memoire-um6p.js. Le GLOSSAIRE des acronymes et le CATALOGUE plateformes
// restent la propriété exclusive de memoire-um6p.js (injectés via MEM_UM6P).
// Ne jamais redupliquer le glossaire ici — ce serait une 3e copie divergente.
//
// Contenu :
//   - cadreInstitutionnel() : titre framework (ancré par titre, sans n° de
//     version) + comités + phases + décisions de gate. Source : TESP —
//     Technology Maturation Governance Framework (réf. 22 mai 2026).
//   - echelleTRL()          : échelle TRL 1-9 (Horizon Europe / DOE / NASA).
//   - gardeAntiHallu()      : garde anti-hallucination commune.
//   - dateISO()             : date du jour (remplace les date_iso figées).
//   - dateDirective()       : directive d'emploi de dateISO pour meta_evaluation.
//
// Déploiement : charger en <script src="prompts-um6p.js"> AVANT le script
// principal, comme memoire-um6p.js. Expose window.PROMPTS_UM6P.
// ============================================================================
(function () {
  "use strict";

  function dateISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function cadreInstitutionnel() {
    return "\n\n=== CADRE INSTITUTIONNEL (référentiel maître) ===\n" +
      "Cette analyse s'inscrit dans le TESP \u2014 Technology Maturation Governance Framework (réf. 22 mai 2026), " +
      "cadre de gouvernance de la maturation technologique des entités UM6P, agnostique au domaine " +
      "(Hardware / Procédés / Digital / Software / IA).\n" +
      "PÉRIMÈTRE TRL : cœur TRL 4\u21927. Phase 0 = TRL 3 (origination / éligibilité, point d'entrée). " +
      "Phase 4B = TRL 7\u21928 (Gate Stratégique, sortie / qualification). Hors de 4\u21927, ne pas étendre le scope sans le signaler.\n" +
      "PHASES DU PIPELINE :\n" +
      "- Phase 0 Origination (TRL 3) : éligibilité, pré-qualification (fiche 2 pages).\n" +
      "- Phase 1 Foundation (TRL 3\u21924) : \u25B6 Gate 1 \u2014 confirmation TRL + plan de maturation.\n" +
      "- Phase 2 Structuring (TRL 4 consolidé) : SANS gate (\u22648 semaines) \u2014 design, cadre IP, accord d'exécution.\n" +
      "- Phase 3A Validation (TRL 4\u21925) : \u25B6 Gate 2.\n" +
      "- Phase 3B Engagement (TRL 5\u21926) : \u25B6 Gate 3.\n" +
      "- Phase 4A Robustness (TRL 6\u21927) : \u25B6 Gate 4 \u2014 répétabilité, package TRL 7.\n" +
      "- Phase 4B Qualification (TRL 7\u21928) : \u25B6 Gate Stratégique (obligatoire) \u2014 voie de valorisation.\n" +
      "DÉCISIONS DE GATE : GO (critères atteints) · HOLD (\u226460 jours pour compléter ; 30 jours en digital) · " +
      "NO GO (arrêt + archivage avec clause de réactivation) · REDIRECT (réorientation sans abandon, nouvelle feuille de route \u226430 jours).\n" +
      "TRACKS : Standard / Accéléré (assignés par le Comité Opérationnel ; procédure digitale accélérée \u226410 jours possible).\n" +
      "COMITÉS (noms officiels) :\n" +
      "- Comité Stratégique & Scale-Up (SSC) \u2014 trimestriel : capacités, santé portefeuille, arbitrage, qualification TRL 7.\n" +
      "- Comité Opérationnel Scale-Up (OSC) \u2014 bimestriel : pertinence/maturité, plateformes, structuration dossier, décisions GO/HOLD/NO GO.\n" +
      "- Comité de Gestion TESP \u2014 mensuel : défis opérationnels, reporting, template commun.\n";
  }

  function echelleTRL() {
    return "\n\n=== ÉCHELLE TRL OFFICIELLE (Horizon Europe / DOE / NASA) ===\n" +
      "TRL 1 : Principes de base observés\n" +
      "TRL 2 : Concept formulé\n" +
      "TRL 3 : Preuve de concept expérimentale (échantillon labo)\n" +
      "TRL 4 : Validation labo (composants intégrés)\n" +
      "TRL 5 : Validation en environnement représentatif (échelle pilote)\n" +
      "TRL 6 : Démonstration prototype échelle représentative\n" +
      "TRL 7 : Démonstration en environnement opérationnel\n" +
      "TRL 8 : Système qualifié pré-commercial\n" +
      "TRL 9 : Opérations commerciales\n";
  }

  function gardeAntiHallu() {
    return "\n\n=== GARDE ANTI-HALLUCINATION (impérative) ===\n" +
      "- N'invente JAMAIS la signification d'un acronyme ni une capacité de plateforme : utilise UNIQUEMENT le glossaire et le catalogue injectés (MEM_UM6P). En cas de doute : écris l'acronyme sans le développer, ou 'pertinence à vérifier'.\n" +
      "- N'extrais que ce qui est EXPLICITEMENT présent dans la source. Information absente \u2192 champ null. Ne complète pas par des valeurs par défaut.\n" +
      "- Ne fabrique pas de chiffre (budget, TRL, marché, partenaire) non documenté. Signale le manque explicitement plutôt que de l'inventer.\n" +
      "- Toute sortie est une aide à la décision préparatoire, soumise à validation humaine (PI / coordination TESP / comité).\n";
  }

  function dateDirective() {
    return "\n\n=== DATE D'ÉVALUATION ===\n" +
      "Pour meta_evaluation.date_iso, utilise EXACTEMENT la date du jour : " + dateISO() +
      " (ignore toute date d'exemple figée dans le schéma).\n";
  }

  window.PROMPTS_UM6P = {
    version: "prompts-um6p v1 (2026-06-16)",
    dateISO: dateISO,
    cadreInstitutionnel: cadreInstitutionnel,
    echelleTRL: echelleTRL,
    gardeAntiHallu: gardeAntiHallu,
    dateDirective: dateDirective
  };
})();
