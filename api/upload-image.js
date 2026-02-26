export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Image required' });
        }

        const imgbbApiKey = 'fafd3d5c821e506d3fb8fee519ecbbfb';

        const formData = new URLSearchParams();
        formData.append('key', imgbbApiKey);
        formData.append('image', image); // base64 string

        const uploadRes = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });

        const data = await uploadRes.json();

        if (!data.success) {
            console.error('ImgBB upload failed:', data);
            return res.status(500).json({ error: 'ImgBB upload failed', detail: data });
        }

        return res.status(200).json({ url: data.data.url });

    } catch (error) {
        console.error('Upload Image Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
