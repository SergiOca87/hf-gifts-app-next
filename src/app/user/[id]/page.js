
import { userQuery, getData } from "@/lib/utils";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UserGifts from "@/components/UserGifts";
import UserThemeLayout from "@/components/UserThemeLayout";

async function UserPage({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    // user context
    if (!token) {
        redirect('/signin');
    }

    const user = await getData(`/api/users/${params.id}`, userQuery, token);

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code,
        logo: user?.user_logo.url,
        username: user?.username
    }

    const steps = [
        'Choose Gifts',
        'Recipient',
        'Success'
    ];

    return (

        user && (
            <UserThemeLayout themeSettings={userTheme} steps={steps} currentStep="1">
                <div className="mb-20 text-center">
                    <h1 className="text-3xl font-medium mb-3 tracking-tight">Pick Your Gifts</h1>
                    <p className="text-muted text-lg">We recommend choosing at least 5 gifts for your recipient to choose from.</p>
                </div>

                    
                <UserGifts user={user} />

            </UserThemeLayout>
        )
    )
}

export default UserPage