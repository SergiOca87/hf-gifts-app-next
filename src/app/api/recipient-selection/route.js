import { NextResponse } from 'next/server';
import SparkPost from 'sparkpost';

const sparky = new SparkPost(process.env.SPARKPOST_API_KEY);

export async function POST(request) {
    try {
        const { name, selectedGift, user, email, address, city, state, zip, message } = await request.json();

        console.log('form data', name, selectedGift, user, email, address, city, state, zip, message);

        const emailToUser = {
            options: { sandbox: false },
            content: {
                from: 'info@hudsonfusion.com',
                subject: 'Thank you for your gift choice',
                text: `Dear ${name},\n\nThank you for your gift choice. We will get back to you shortly.\n\nBest regards.\n`,
            },
            recipients: [{ address: email }]
        };

        const emailToOwner = {
            options: { sandbox: false },
            content: {
                from: 'info@hudsonfusion.com',
                subject: `New Gift App form submission from ${name}`,
                text: `You have received a new submission from the Gifting App.\n\nName: ${name}\nGift Choice: ${selectedGift.attributes.title}\nEmail: ${email}\nAddress: ${address}\nCity: ${city}\nState: ${state}\nZip: ${zip}\nDetails: ${message}\nUser: ${user.username}`,
            },
            recipients: [{ address: 'sergi@hudsonfusion.com' }]
        };

        await sparky.transmissions.send(emailToUser);
        await sparky.transmissions.send(emailToOwner);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('SparkPost Error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
