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
        // FormSubmit requires x-www-form-urlencoded format for initial unverified submissions.
        const formData = new URLSearchParams();
        formData.append('_subject', 'New VIP Membership Claim Request!');
        formData.append('email', email);

        const response = await fetch('https://formsubmit.co/douchecoded@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Origin': 'https://sadlibs.online',
                'Referer': 'https://sadlibs.online/'
            },
            body: formData.toString()
        });

        const data = await response.json();

        if (!response.ok || data.success === 'false') {
            console.error("FormSubmit Rejected:", data.message);
            throw new Error(data.message || 'Failed to forward email to FormSubmit');
        }

        return res.status(200).json({ success: true, message: 'Access Granted' });

    } catch (error) {
        console.error("Save Email Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
