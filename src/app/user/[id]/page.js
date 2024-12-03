
import { userQuery, getData } from "@/lib/utils";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { StrapiImage } from "@/components/StrapiImage";
import ClientGifts from "@/components/ClientGifts";
import UserGifts from "@/components/UserGifts";

import { Separator } from "@/components/ui/separator";

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
        logo: user?.user_logo.url
    }

    return (

        user && (
            <div style={{ backgroundColor: userTheme.backgroundColor, color: userTheme.color }} className="py-5 min-h-screen h-full">
                <div className="px-9 flex flex-row mb-24">
                    <div className="flex flex-row gap-4">
                        <div className="w-12 h-12 rounded-full bg-stone-200">
                            {userTheme.logo ? 
                                <StrapiImage src={userTheme.logo} width={200} height={50} alt="" objectFit="contain" className="aspect-square" /> :
                                ''
                            }
                        </div>
                        
                        <div>
                            Welcome!
                            <strong className="block text-lg">{user.username}</strong>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="text-center mb-20">
                        <h1 className="text-3xl font-medium mb-3 tracking-tight">Pick Your Gifts</h1>
                        <p className="text-muted text-lg">We recommend choosing at least 5 gifts for your recipient to choose from.</p>
                    </div>
                    
                    <UserGifts user={user} />

                    {/* TODO: Disabled button if no selections is made, tailwind disabled:, etc */}
                    {/* TODO: Disabled button if no selections is made, tailwind disabled:, etc */}

                </div>

            </div >
        )
    )
}

export default UserPage