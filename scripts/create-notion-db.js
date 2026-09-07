#!/usr/bin/env node
// scripts/create-notion-db.js
// ──────────────────────────────────────────────────────────────────
// Crée la base Notion "IRL Assessment" avec les ~27 propriétés attendues
// par index.html (convention "IRL - <Dimension> - <Champ>", identique à
// la convention "BC Projet - <Champ>" déjà utilisée dans TESP Orchestrateur).
//
// Usage :
//   NOTION_TOKEN=secret_xxx NOTION_PARENT_PAGE_ID=xxxxxxxx node scripts/create-notion-db.js
//
// NOTION_TOKEN            : token d'intégration Notion (le même que celui
//                            saisi dans l'app, section Accès).
// NOTION_PARENT_PAGE_ID    : ID de la page Notion sous laquelle créer la base
//                            (32 caractères, depuis l'URL de la page — la
//                            page doit être partagée avec l'intégration).
//
// Ne crée PAS de relation automatique vers la base TESP "Registre Projets
// TRL" — Notion ne permet pas d'ajouter une propriété relation par API sans
// connaître l'ID de la base cible. Si tu veux la relation, passe aussi
// NOTION_TESP_DB_ID (ID de la base Registre Projets TRL) et le script
// l'ajoutera automatiquement.
// ──────────────────────────────────────────────────────────────────

const TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = process.env.NOTION_PARENT_PAGE_ID;
const TESP_DB_ID = process.env.NOTION_TESP_DB_ID || null;

if (!TOKEN || !PARENT_PAGE_ID) {
  console.error("Usage : NOTION_TOKEN=secret_xxx NOTION_PARENT_PAGE_ID=xxxxxxxx node scripts/create-notion-db.js");
  console.error("(optionnel) NOTION_TESP_DB_ID=xxxxxxxx pour ajouter une relation vers le Registre Projets TRL");
  process.exit(1);
}

function selectProp(options) {
  return { select: { options: options.map(function (name) { return { name: name }; }) } };
}

function buildProperties() {
  var props = {
    "Nom du projet": { title: {} },
    "ID projet CIO": { rich_text: {} },
    "Entite": { rich_text: {} },
    "SBU sponsor": { rich_text: {} },
    "IRL - Batch": selectProp(["Batch 1", "Batch 2", "Batch 3", "Batch 4"]),
    "IRL - Date limite": { date: {} },
    "IRL - Statut transmission": selectProp(["Brouillon", "Pret a transmettre", "Transmis", "Valide LaunchX"]),
    "IRL - Valide par Head Innovation": { checkbox: {} }
  };

  ["Team", "Business", "IP", "Financement", "Commercial"].forEach(function (dim) {
    props["IRL - " + dim + " - Statut"] = selectProp(["Oui", "Partiel", "Non"]);
    props["IRL - " + dim + " - Confiance"] = selectProp(["Elevee", "Moyenne", "Faible"]);
    props["IRL - " + dim + " - Preuve"] = { rich_text: {} };
  });

  props["IRL - CRL"] = { number: { format: "number" } };
  props["IRL - Score global"] = { number: { format: "number" } };
  props["IRL - Recommandation transmission"] = selectProp(["Pret", "A completer", "Non pret"]);
  props["IRL - Synthese"] = { rich_text: {} };
  props["IRL - Date generation"] = { date: {} };

  if (TESP_DB_ID) {
    props["Projet lie (TESP)"] = { relation: { database_id: TESP_DB_ID, single_property: {} } };
  }

  return props;
}

async function main() {
  var body = {
    parent: { type: "page_id", page_id: PARENT_PAGE_ID },
    icon: { type: "emoji", emoji: "✅" },
    title: [{ type: "text", text: { content: "IRL Assessment — TESP/UM6P" } }],
    properties: buildProperties()
  };

  var resp = await fetch("https://api.notion.com/v1/databases", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + TOKEN,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  var data = await resp.json();

  if (!resp.ok) {
    console.error("Échec création base Notion :", resp.status);
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log("✓ Base « IRL Assessment » créée.");
  console.log("  ID base (à coller dans l'app, section Accès) :", data.id.replace(/-/g, ""));
  console.log("  URL :", data.url);
  if (!TESP_DB_ID) {
    console.log("");
    console.log("  Note : relation vers le Registre Projets TRL non créée (NOTION_TESP_DB_ID non fourni).");
    console.log("  Tu peux l'ajouter manuellement dans Notion, ou relancer avec NOTION_TESP_DB_ID=...");
  }
}

main().catch(function (e) {
  console.error("Erreur :", e.message || e);
  process.exit(1);
});
