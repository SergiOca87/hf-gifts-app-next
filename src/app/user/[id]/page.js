
import { userQuery, getData } from "@/lib/utils";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { StrapiImage } from "@/components/StrapiImage";
import ClientGifts from "@/components/ClientGifts";
import UserGifts from "@/components/UserGifts";

async function UserPage({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        console.log('No token found');
        redirect('/signin');
    }

    const user = await getData(`/api/users/${params.id}`, userQuery, token);

    console.log('user', user.logo);

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code,
        logo: user?.user_logo.url
    }

    return (

        <div style={{ backgroundColor: userTheme.backgroundColor, color: userTheme.color }}>
            <div className="container h-screen">
                <StrapiImage src={userTheme.logo} width={200} height={50} />
                <h1>Welcome, {user.username}</h1>

                <div className={`container mt-12`}>
                    <h2 className="text-3xl text-white font-medium mb-12 mt-12">Please select the gifts that you would like <br />to send to your recipient:</h2>
                    <UserGifts user={user} />
                </div>
            </div>
        </div >
    )
}

export default UserPage