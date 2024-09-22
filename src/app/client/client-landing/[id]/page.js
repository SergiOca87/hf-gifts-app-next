
import { userQuery, getData } from "@/lib/utils";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { StrapiImage } from "@/components/StrapiImage";

async function ClientLanding({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        console.log('No token found');
        redirect('/signin');
    }

    const user = await getData(`/api/users/${params.id}`, userQuery, token);

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code,
        logo: user?.user_logo.url
    }

    return (

        <div style={{ backgroundColor: userTheme.backgroundColor, color: userTheme.color }}>
            <div className="container h-screen">
                <StrapiImage src={user.logo} width={200} height={50} />
                <h1>Welcome, {user.username}</h1>
            </div>
        </div>
    )
}

export default ClientLanding