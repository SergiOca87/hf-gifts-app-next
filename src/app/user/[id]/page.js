import { userQuery, getData } from "@/lib/utils";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { StrapiImage } from "@/components/StrapiImage";
import ClientGifts from "@/components/ClientGifts";
import UserGifts from "@/components/UserGifts";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

async function UserPage({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/signin');
    }

    const user = await getData(`/api/users/${params.id}`, userQuery, token);

    //TODO: Here we set the user to context.

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code,
        logo: user?.user_logo.url
    }

    return (

        user && (
            <div style={{ backgroundColor: userTheme.backgroundColor, color: userTheme.color }} className="py-5 min-h-screen h-full">

                <div className="container">
                    <StrapiImage className="mb-16" src={userTheme.logo} width={200} height={50} />

                    <h1 className="text-2xl mt-12 text-white font-medium mb-12 mt-12">
                        <span className="block mb-6 text-4xl">Welcome, {user.username}.</span>
                        <Separator className="mt-8 mb-8 opacity-10" />
                        Please select the gifts that you would like <br />to send to your recipient:
                    </h1>
                    <UserGifts user={user} />

                    {/* TODO: Disabled button if no selections is made, tailwind disabled:, etc */}
                    {/* TODO: Disabled button if no selections is made, tailwind disabled:, etc */}

                </div>

            </div >
        )
    )
}

export default UserPage