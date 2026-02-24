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
                req.on('end', () => {
                    try {
                        const { email } = JSON.parse(body);
                        if (email) {
                            const filePath = path.join(process.cwd(), 'emails.txt');
                            const entry = `${new Date().toISOString()} - ${email}\n`;
                            fs.appendFileSync(filePath, entry);

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: true, message: 'Access Granted' }));
                        } else {
                            res.statusCode = 400;
                            res.end(JSON.stringify({ error: 'Email required' }));
                        }
                    } catch (e) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: 'Server error' }));
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
