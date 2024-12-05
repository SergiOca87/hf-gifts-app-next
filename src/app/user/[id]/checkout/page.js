import UserThemeLayout from "@/components/UserThemeLayout";
import UserSelectedGiftsForm from "@/components/UserSelectedGiftsForm";
import { getData, userQuery } from "@/lib/utils";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

async function userCheckoutPage({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/signin');
    }

    const user = await getData(`/api/users/${params.id}`, userQuery, token);

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code,
        logo: user?.user_logo.url,
        username: user?.username,
    }

    const steps = [
        'Choose Gifts',
        'Recipient',
        'Success'
    ];

    return (
        <UserThemeLayout themeSettings={userTheme} steps={steps} currentStep="2">
            <UserSelectedGiftsForm />


            <div className="fixed left-7 bottom-8 z-10 flex align-middle">
                <ChevronLeft />
                <Link className="underline" href={`/user/${user.id}`}>Previous Step</Link>
            </div>

        </UserThemeLayout>
    )
}

export default userCheckoutPage