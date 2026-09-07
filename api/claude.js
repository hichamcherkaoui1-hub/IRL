// /api/claude.js — Proxy Anthropic pour TESP Orchestrateur
// Sécurité : clé API serveur + mot de passe partagé côté navigateur
//
// Vars d'env requis dans Vercel (projet tesp-orchestrateur) :
//   ANTHROPIC_API_KEY        → clé sk-ant-... (obligatoire)
//   TESP_ACCESS_PASSWORD     → mot de passe partagé (recommandé)
//
// PALIER 25 v3.17 — STREAMING SSE pour résoudre définitivement les 504 Gateway Timeout
//
// CHANGEMENT MAJEUR : le proxy supporte maintenant le streaming Server-Sent Events.
// - Si le client envoie {stream: true} dans le body → réponse en streaming SSE
// - Sinon → réponse classique JSON (rétro-compatible)
//
// Bénéfice : tant que des chunks arrivent d'Anthropic, Vercel ne coupe jamais la connexion.
// Permet de générer 5000+ tokens même quand Anthropic est lent (>15s) sans timeout 504.

export const config = {
  runtime: 'edge',
  maxDuration: 60
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-tesp-password',
  'Access-Control-Max-Age': '86400'
};

function jsonError(status, message, errorType) {
  return new Response(JSON.stringify({
    error: errorType || 'Error',
    message: message
  }), {
    status: status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
  });
}

export default async function handler(req) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return jsonError(405, 'Method not allowed', 'Method not allowed');
  }

  // ── Vérification mot de passe partagé (optionnel) ─────────────
  const expectedPassword = process.env.TESP_ACCESS_PASSWORD || process.env.TESP_ACCESS_PWD || '';
  if (expectedPassword) {
    const providedPassword = req.headers.get('x-tesp-password') || '';
    if (providedPassword !== expectedPassword) {
      return jsonError(401, 'Accès refusé : mot de passe TESP invalide ou manquant', 'Unauthorized');
    }
  }

  // ── Clé API Anthropic ─────────────────────────────
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonError(500, "ANTHROPIC_API_KEY non défini dans les variables d'environnement Vercel", 'Server misconfigured');
  }

  // ── Lire le body ─────────────────────────────────
  let bodyText;
  try {
    bodyText = await req.text();
  } catch (e) {
    return jsonError(400, 'Invalid request body', 'Invalid body');
  }

  // Validation minimale du payload
  let parsedBody;
  try {
    parsedBody = JSON.parse(bodyText);
    if (!parsedBody.model || !parsedBody.messages) {
      return jsonError(400, 'Corps de requête invalide : model et messages requis', 'Invalid payload');
    }
  } catch (e) {
    return jsonError(400, 'Body JSON invalide', 'Invalid JSON');
  }

  // ── Détection mode streaming ──────────────────────
  const isStreaming = parsedBody.stream === true;

  // ── Forward vers Anthropic ─────────────────────────
  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': apiKey
      },
      body: bodyText
    });

    // ── Mode STREAMING : on transmet le stream tel quel ──
    if (isStreaming) {
      // Si Anthropic retourne une erreur (400, 401, etc.) → renvoyer JSON, pas SSE
      const upstreamContentType = upstream.headers.get('content-type') || '';
      if (!upstream.ok || !upstreamContentType.includes('event-stream')) {
        const errorText = await upstream.text();
        return new Response(errorText, {
          status: upstream.status,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
        });
      }

      // Stream OK : transmettre le ReadableStream directement au client
      // Vercel ne coupe pas tant que des chunks arrivent → résout les 504
      return new Response(upstream.body, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no',
          ...CORS_HEADERS
        }
      });
    }

    // ── Mode CLASSIQUE (rétro-compatible avec ancien client) ──
    const responseText = await upstream.text();
    return new Response(responseText, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
        ...CORS_HEADERS
      }
    });
  } catch (e) {
    return jsonError(502, 'Erreur proxy: ' + (e.message || String(e)), 'Upstream error');
  }
}
