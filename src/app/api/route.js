// pages/api/contact.js
import Mailgun from 'mailgun.js';


const mailgunClient = Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

export async function POST(req) {

    const data = await req.json();
    console.log(data);

    console.log('api route', process.env.MAILGUN_API_KEY);

    const { name, email, street, city, state, zip, details } = request.body;

    const dataToUser = {
        from: 'sergi@hudsonfusion.com',
        to: email,
        subject: 'Thank you for contacting us',
        text: `Dear ${name},\n\nThank you for your message. We will get back to you shortly.\n\nBest regards,\n the Hudson Fusion team`,
    };

    const dataToOwner = {
        from: 'info@hudsonfusion.com',
        to: 'sergi@hudsonfusion.com',
        subject: `New contact form submission from ${name}`,
        text: `You have received a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n`,
    };

    try {
        await mailgunClient.messages.create('127.0.0.1', dataToUser);
        await mailgunClient.messages.create('127.0.0.1', dataToOwner);
        return response.status(200).json({ success: true });
    } catch (error) {
        console.error('Mailgun Error:', error);
        return response.status(500).json({ error: 'Failed to send email' });
    }

}
