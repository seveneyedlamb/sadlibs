import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to handle local email saving and proxying TTS
const customApiPlugin = () => ({
    name: 'custom-api',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            if (req.url === '/api/save-email' && req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    try {
                        const { email } = JSON.parse(body);
                        if (email) {
                            console.log(`[LOCAL] Saving ${email} to local emails.txt`);
                            fs.appendFileSync(path.join(process.cwd(), 'emails.txt'), `${email}\n`);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: true, message: 'Access Granted' }));
                        } else {
                            res.statusCode = 400;
                            res.end(JSON.stringify({ error: 'Email required' }));
                        }
                    } catch (e) {
                        console.error("[LOCAL TEST] Save email error:", e);
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: 'Server error' }));
                    }
                });
            } else if (req.url && req.url.startsWith('/api/share') && req.method === 'GET') {
                const urlObj = new URL(req.url, 'http://localhost');
                const img = urlObj.searchParams.get('img') || '';
                const imageUrl = decodeURIComponent(img);
                const appUrl = 'http://localhost:5173';
                const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>SadLibs Share</title>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:image" content="${imageUrl}"/>
<meta property="og:image" content="${imageUrl}"/>
<meta http-equiv="refresh" content="0; url=${appUrl}"/>
</head><body><p>Redirecting...</p></body></html>`;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            } else if (req.url === '/api/upload-image' && req.method === 'POST') {
                let body = '';
                req.on('data', chunk => { body += chunk.toString(); });
                req.on('end', async () => {
                    try {
                        const { image } = JSON.parse(body);
                        if (!image) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({ error: 'Image required' }));
                        }
                        const formData = new URLSearchParams();
                        formData.append('key', 'fafd3d5c821e506d3fb8fee519ecbbfb');
                        formData.append('image', image);
                        const uploadRes = await fetch('https://api.imgbb.com/1/upload', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: formData.toString()
                        });
                        const data = await uploadRes.json();
                        if (!data.success) {
                            res.statusCode = 500;
                            return res.end(JSON.stringify({ error: 'ImgBB upload failed', detail: data }));
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ url: data.data.url }));
                    } catch (e) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: 'Server error: ' + e.message }));
                    }
                });
            } else if (req.url === '/api/tts' && req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    try {
                        const { text } = JSON.parse(body);
                        if (!text) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({ error: 'Text required' }));
                        }

                        const response = await fetch('https://api.cartesia.ai/tts/bytes', {
                            method: 'POST',
                            headers: {
                                'Cartesia-Version': '2024-06-10',
                                'X-API-Key': 'sk_car_YFxYb7sqCStgRenjS2tKsv',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                model_id: "sonic-english",
                                transcript: text,
                                voice: {
                                    mode: "id",
                                    id: "2212a363-0f3a-42a1-8ffa-2a0e468b3454"
                                },
                                output_format: {
                                    container: "mp3",
                                    encoding: "mp3",
                                    sample_rate: 44100
                                }
                            })
                        });

                        if (!response.ok) {
                            const errText = await response.text();
                            res.statusCode = response.status;
                            return res.end(JSON.stringify({ error: errText }));
                        }

                        const arrayBuffer = await response.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);

                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'audio/mpeg');
                        res.end(buffer);
                    } catch (e) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: 'Server error: ' + e.message }));
                    }
                });
            } else if (req.url === '/api/analytics' && req.method === 'GET') {
                (async () => {
                    try {
                        const proxyRes = await fetch('https://sadlibs.vercel.app/api/analytics');
                        const data = await proxyRes.json();
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(data));
                    } catch (e) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: e.message }));
                    }
                })();
            } else if (req.url === '/api/analytics' && req.method === 'POST') {
                // Silently succeed locally — don't spam production analytics with dev traffic
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: true }));
            } else {
                next();
            }
        });
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), customApiPlugin()],
})
