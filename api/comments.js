export default async function handler(req, res) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Supabase not configured' });
    }

    const base = `${supabaseUrl}/rest/v1/comments`;
    const headers = {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
    };

    if (req.method === 'GET') {
        const r = await fetch(`${base}?select=id,comment,created_at&order=created_at.desc&limit=20`, { headers });
        const data = await r.json();
        return res.status(r.status).json(data);
    }

    if (req.method === 'POST') {
        const { email, comment } = req.body || {};
        if (!email || !comment) return res.status(400).json({ error: 'email and comment required' });

        const r = await fetch(base, {
            method: 'POST',
            headers: { ...headers, 'Prefer': 'return=minimal' },
            body: JSON.stringify({ email, comment }),
        });
        return res.status(r.ok ? 201 : 500).json(r.ok ? { ok: true } : { error: 'Insert failed' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
