import { NextResponse } from 'next/server';
import SparkPost from 'sparkpost';

const sparky = new SparkPost(process.env.SPARKPOST_API_KEY);

export async function POST(request) {
    try {
        const { name, giftIds, email, user } = await request.json();

        const selectionUrl = `https://giftbridge.app/user/${user.id}/selection?giftIds=${giftIds.join('&giftIds=')}`;

        const emailToUser = {
            options: { sandbox: false },
            content: {
                from: 'info@hudsonfusion.com',
                subject: `Dear ${name}, ${user.username} has a selection of gifts for you!`,
                text: `You have received a new gift selection from ${user.username}.\n\nTo claim your selection, please visit the following link:\n${selectionUrl}\n\nBest regards.`,
                html: `
                    <p>Dear ${name},</p>
                    <p>${user.username} has a selection of gifts for you!</p>
                    <p>You have received a new gift selection from ${user.username}. To claim your selection, please visit the link below:</p>
                    <p><a href="${selectionUrl}" style="color: #007bff;">${selectionUrl}</a></p>
                    <p>Best regards.</p>
                `,
            },
            recipients: [{ address: email }]
        };

        const emailToOwner = {
            options: { sandbox: false },
            content: {
                from: 'info@hudsonfusion.com',
                subject: `New Gift App form submission from ${name}`,
                text: `You have received a new submission from the Gifting App.\n\nName: ${name}\nGift Choice: Gift Choice: ${giftIds.join(', ')}\n`,
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
