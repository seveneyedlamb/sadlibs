export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const text = req.body?.text;

        if (!text) {
            return res.status(400).json({ error: 'Text required' });
        }

        const cartesiaApiKey = process.env.CARTESIA_API_KEY;

        if (!cartesiaApiKey) {
            console.error("Missing CARTESIA_API_KEY environment variable.");
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const cartesiaRes = await fetch('https://api.cartesia.ai/tts/bytes', {
            method: 'POST',
            headers: {
                'Cartesia-Version': '2024-06-10',
                'X-API-Key': cartesiaApiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model_id: 'sonic-english',
                transcript: text,
                voice: {
                    mode: 'id',
                    id: '694f9389-aac1-45b6-b726-9d9369183238', // Trump voice
                },
                output_format: {
                    container: 'mp3',
                    encoding: 'pcm_f32le', // Cartesia PCM format identifier
                    sample_rate: 44100,
                },
            }),
        });

        if (!cartesiaRes.ok) {
            const errorText = await cartesiaRes.text();
            console.error("Cartesia API Error:", cartesiaRes.status, errorText);
            return res.status(cartesiaRes.status).json({ error: 'TTS Request Failed' });
        }

        // Convert the API response ArrayBuffer to a Node Buffer to send properly
        const arrayBuffer = await cartesiaRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.status(200);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.send(buffer);

    } catch (error) {
        console.error("TTS Node Function Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
