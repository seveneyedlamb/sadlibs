export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { text } = await req.json();

        if (!text) {
            return new Response(JSON.stringify({ error: 'Text required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const cartesiaApiKey = process.env.CARTESIA_API_KEY;

        if (!cartesiaApiKey) {
            console.error("Missing CARTESIA_API_KEY environment variable.");
            return new Response(JSON.stringify({ error: 'Server configuration error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const response = await fetch('https://api.cartesia.ai/tts/bytes', {
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
                    id: '694f9389-aac1-45b6-b726-9d9369183238',
                },
                output_format: {
                    container: 'mp3',
                    encoding: 'pcm_f32le',
                    sample_rate: 44100,
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Cartesia API Error:", response.status, errorText);
            return new Response(JSON.stringify({ error: 'TTS Request Failed' }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const audioBuffer = await response.arrayBuffer();

        return new Response(audioBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'public, max-age=3600'
            }
        });

    } catch (error) {
        console.error("Serverless Function Error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
