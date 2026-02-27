const SB_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const sb = (path, opts = {}) => fetch(`${SB_URL}/rest/v1${path}`, {
    ...opts,
    headers: {
        'apikey': SB_KEY,
        'Authorization': `Bearer ${SB_KEY}`,
        'Content-Type': 'application/json',
        ...opts.headers,
    },
});

export default async function handler(req, res) {
    if (!SB_URL || !SB_KEY) return res.status(500).json({ error: 'not configured' });

    // POST — record an event
    if (req.method === 'POST') {
        const { event_type, referrer, metadata } = req.body || {};
        await sb('/analytics_events', {
            method: 'POST',
            headers: { 'Prefer': 'return=minimal' },
            body: JSON.stringify({ event_type, referrer: referrer || null, metadata: metadata || null }),
        });
        return res.status(201).json({ ok: true });
    }

    // GET — return dashboard stats
    if (req.method === 'GET') {
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

        const [pvRes, shareRes, activeRes, commentRes, emailRes] = await Promise.all([
            // All pageviews (for total + referrer breakdown)
            sb('/analytics_events?event_type=eq.pageview&select=referrer,created_at&order=created_at.desc&limit=500'),
            // All share events
            sb('/analytics_events?event_type=eq.share&select=metadata,created_at&order=created_at.desc&limit=1000'),
            // Active now — pageviews in last 5 min
            sb(`/analytics_events?event_type=eq.pageview&created_at=gte.${fiveMinAgo}&select=id`, {
                headers: { 'Prefer': 'count=exact', 'Range': '0-0' },
            }),
            // Comment count
            sb('/comments?select=id', { headers: { 'Prefer': 'count=exact', 'Range': '0-0' } }),
            // Email count
            sb('/emails?select=id', { headers: { 'Prefer': 'count=exact', 'Range': '0-0' } }),
        ]);

        const pageviews = pvRes.ok ? await pvRes.json() : [];
        const shares = shareRes.ok ? await shareRes.json() : [];
        const activeNow = parseInt(activeRes.headers?.get?.('content-range')?.split('/')?.[1] ?? '0', 10);
        const commentCount = parseInt(commentRes.headers?.get?.('content-range')?.split('/')?.[1] ?? '0', 10);
        const emailCount = parseInt(emailRes.headers?.get?.('content-range')?.split('/')?.[1] ?? '0', 10);

        // Referrer breakdown
        const referrers = {};
        pageviews.forEach(({ referrer }) => {
            const key = referrer ? new URL(referrer).hostname.replace('www.', '') : 'direct';
            referrers[key] = (referrers[key] || 0) + 1;
        });
        const topReferrers = Object.entries(referrers)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([source, count]) => ({ source, count }));

        // Share breakdown
        const shareBreakdown = {};
        let total4chan = 0;
        let totalNormal = 0;
        shares.forEach(({ metadata }) => {
            if (!metadata) return;
            const key = `${metadata.platform || '?'}:${metadata.image_type || '?'}`;
            shareBreakdown[key] = (shareBreakdown[key] || 0) + 1;
            if (metadata.is_4chan) total4chan++; else totalNormal++;
        });

        return res.status(200).json({
            total_hits: pageviews.length,
            active_now: isNaN(activeNow) ? 0 : activeNow,
            top_referrers: topReferrers,
            total_shares: shares.length,
            shares_4chan: total4chan,
            shares_normal: totalNormal,
            share_breakdown: Object.entries(shareBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([key, count]) => ({ key, count })),
            comments: commentCount,
            emails: emailCount,
        });
    }

    res.status(405).end();
}
