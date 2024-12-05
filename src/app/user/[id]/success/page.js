import UserThemeLayout from "@/components/UserThemeLayout";
import { getData, userQuery } from "@/lib/utils";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import SuccessIcon from '/public/success.svg'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

async function userSuccessPage({ params }) {
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
        <UserThemeLayout themeSettings={userTheme} steps={steps} currentStep="3">
            <div className="container">
                <div className="max-w-[400px] mx-auto text-center">
                    <Image src={SuccessIcon} alt="Success" width={104} height={104} className="mx-auto" />

                    <h1 className="text-3xl font-medium mb-3 tracking-tight mt-12">It&apos;s on its way</h1>
                    <p className="text-muted text-lg">Why not send another gift to someone?</p>

                    <Button asChild className="max-w-80 w-full mt-14 mx-auto">
                        <Link href={`/user/${user.id}`}>Send another gift</Link>
                    </Button>
                </div>
            </div>

            <div className="fixed left-7 bottom-8 z-10 flex align-middle">
                <ChevronLeft />
                <Link className="underline" href={`/user/${user.id}/checkout`}>Previous Step</Link>
            </div>
        </UserThemeLayout>
    )


}

export default userSuccessPage