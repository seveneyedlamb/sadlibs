export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, source = 'modal' } = req.body || {};
    if (!email) return res.status(400).json({ error: 'email required' });

    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase env vars');
        return res.status(500).json({ error: 'not configured' });
    }

    const r = await fetch(`${supabaseUrl}/rest/v1/emails`, {
        method: 'POST',
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ email, source }),
    });

    if (!r.ok) {
        const body = await r.text();
        console.error('Supabase email insert failed:', r.status, body);
        return res.status(500).json({ error: 'insert failed' });
    }

    return res.status(201).json({ ok: true });
}
