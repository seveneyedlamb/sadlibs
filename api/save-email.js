export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email required' });
        }

        console.log(`Forwarding new lead to FormSubmit: ${email}`);

        // Forward the captured email directly to FormSubmit
        // The first time someone submits an email on the live site, FormSubmit will send 
        // a verification email to douchecoded@gmail.com which you MUST click to activate the form.
        const response = await fetch('https://formsubmit.co/ajax/douchecoded@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: 'New VIP Membership Claim Request!',
                email: email
            })
        });

        if (!response.ok) {
            throw new Error('Failed to forward email to FormSubmit');
        }

        return res.status(200).json({ success: true, message: 'Access Granted' });

    } catch (error) {
        console.error("Save Email Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
