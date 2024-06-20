// app/api/contact/route.js
import { NextResponse } from 'next/server';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';

const mailgun = new Mailgun(FormData);
const mailgunClient = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});

export async function POST(request) {
    try {
        const { name, email, street, city, state, zip, details } = await request.json();

        const dataToUser = {
            from: 'sergi@hudsonfusion.com',
            to: email,
            subject: 'Thank you for contacting us',
            text: `Dear ${name},\n\nThank you for your message. We will get back to you shortly.\n\nBest regards,\nThe Hudson Fusion team`,
        };

        const dataToOwner = {
            from: 'info@hudsonfusion.com',
            to: 'sergi@hudsonfusion.com',
            subject: `New contact form submission from ${name}`,
            text: `You have received a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\nStreet: ${street}\nCity: ${city}\nState: ${state}\nZip: ${zip}\nDetails: ${details}`,
        };

        // Ensure Mailgun domain is correctly set in environment variables
        const domain = process.env.MAILGUN_DOMAIN;
        if (!domain) {
            throw new Error('MAILGUN_DOMAIN environment variable is not set');
        }

        await mailgunClient.messages.create(domain, dataToUser);
        await mailgunClient.messages.create(domain, dataToOwner);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Mailgun Error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
