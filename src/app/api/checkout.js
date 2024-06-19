// pages/api/contact.js
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

export default async function POST(req, res) {

    const { name, email, message } = req.body;

    const dataToUser = {
        from: 'your-email@example.com', // Your Mailgun verified email
        to: email,
        subject: 'Thank you for contacting us',
        text: `Dear ${name},\n\nThank you for your message. We will get back to you shortly.\n\nBest regards,\nYour Company`,
    };

    const dataToOwner = {
        from: 'your-email@example.com',
        to: 'your-email@example.com',
        subject: `New contact form submission from ${name}`,
        text: `You have received a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    try {
        await mg.messages.create('your-domain.com', dataToUser);
        await mg.messages.create('your-domain.com', dataToOwner);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Mailgun Error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }

}
