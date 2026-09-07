// api/notion.js
// ──────────────────────────────────────────────────────────────────
// Proxy serverless Vercel pour contourner les restrictions CORS
// de l'API Notion. Le navigateur appelle /api/notion au lieu de
// api.notion.com directement.
//
// Le token Notion arrive depuis le navigateur via le header
// 'x-notion-token' ou via le header 'Authorization' (Bearer ...).
// La fonction relaie l'appel à Notion sans rien stocker.
// ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-notion-token, Authorization, Notion-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // ── Récupère le path Notion à appeler (?path=/databases/xxx ou ?path=/databases/xxx/query) ──
    var path = req.query.path;
    if (!path) {
      return res.status(400).json({ error: 'Missing query param: path' });
    }
    if (!path.startsWith('/')) path = '/' + path;

    // ── Récupère le token depuis x-notion-token ou Authorization ──
    var token = req.headers['x-notion-token'];
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace(/^Bearer\s+/i, '');
    }
    if (!token) {
      return res.status(401).json({ error: 'Missing Notion token (header x-notion-token or Authorization)' });
    }

    // ── URL Notion finale ──
    var notionUrl = 'https://api.notion.com/v1' + path;

    var headers = {
      'Authorization': 'Bearer ' + token,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    };

    var fetchOptions = {
      method: req.method,
      headers: headers
    };

    if (req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT') {
      fetchOptions.body = JSON.stringify(req.body || {});
    }

    var notionResp = await fetch(notionUrl, fetchOptions);
    var data = await notionResp.json();

    return res.status(notionResp.status).json(data);

  } catch (err) {
    console.error('[/api/notion] Error:', err);
    return res.status(500).json({
      error: 'Proxy error',
      message: err.message || String(err)
    });
  }
}
