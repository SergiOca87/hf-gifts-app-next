import UserThemeLayout from "@/components/UserThemeLayout";
import UserSelectedGiftsForm from "@/components/UserSelectedGiftsForm";
import { getData, userQuery } from "@/lib/utils";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

async function userCheckoutPage({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    const user = await getData(`/api/users/${params.id}`, userQuery, token);

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code,
        logo: user?.user_logo.url
    }

    if (!token) {
        redirect('/signin');
    }

    console.log(userTheme);

    return (
        <div>
            <UserThemeLayout themeSettings={userTheme}>
                <UserSelectedGiftsForm />
            </UserThemeLayout>
        </div>
    )
}

export default userCheckoutPage