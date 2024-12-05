
import { userQuery, getData } from "@/lib/utils";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UserGifts from "@/components/UserGifts";
import Steps from "@/components/Steps";
import Logo from '/public/giftbridge_logo.svg'
import Image from 'next/image'
import UserBadge from "@/components/UserBadge";

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

    const steps = [
        'Choose Gifts',
        'Recipient',
        'Success'
    ];

    return (

        user && (
            <div style={{ backgroundColor: userTheme.backgroundColor, color: userTheme.color }} className="min-h-screen h-full">
                <UserBadge username={user.username} logo={userTheme.logo} />
                

                <div className="container text-center">
                    <div className="py-14 mb-24">
                        <Steps steps={steps} current={1} />
                    </div>

                    <div className="mb-20">
                        <h1 className="text-3xl font-medium mb-3 tracking-tight">Pick Your Gifts</h1>
                        <p className="text-muted text-lg">We recommend choosing at least 5 gifts for your recipient to choose from.</p>
                    </div>
                </div>
                    
                <UserGifts user={user} />

                <div className='fixed bottom-0 left-0 w-full bg-white px-7 h-24 flex justify-center z-0 align-middle shadow-[0_-4px_4px_0_rgba(0,0,0,0.05)]'>
                    <Image src={Logo} alt="Giftbridge" width={173} height={45} />
                </div>

            </div >
        )
    )
}

export default UserPage