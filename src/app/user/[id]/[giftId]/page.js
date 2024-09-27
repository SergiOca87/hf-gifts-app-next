"use client";

import { useContext, useEffect, useState } from "react";
import { getData, giftsQuery, userQuery } from "@/lib/utils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { StrapiImage } from "@/components/StrapiImage";
import CustomCarousel from "@/components/CustomCarousel";
import { ClientContext } from "@/app/client-provider";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GiftPage({ params }) {
    const [gift, setGift] = useState(null);
    const [user, setUser] = useState(null);
    const { userGifts, setUserGifts } = useContext(ClientContext);

    const addOrRemoveGiftFromSelection = (gift) => {
        let addedOrRemoved = '';

        if (userGifts.includes(gift)) {
            setUserGifts(userGifts.filter((selectedGift) => selectedGift !== gift));
            addedOrRemoved = 'removed from';
        } else {
            setUserGifts([...userGifts, gift]);
            addedOrRemoved = 'added to';
        }

        toast(`A gift has been ${addedOrRemoved} your selection`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch gift data
                const giftData = await getData(`/api/gifts/${params.giftId}`, giftsQuery);
                setGift(giftData);

                // Fetch user data
                const userData = await getData(`/api/users/${params.id}`, userQuery);
                setUser(userData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [params.giftId, params.id]); // Dependencies for useEffect

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code,
        logo: user?.user_logo?.url,
    };

    // Check if gift data is loaded and valid
    const giftAttributes = gift?.data?.attributes;

    return (
        <div style={{ backgroundColor: userTheme.backgroundColor, color: userTheme.color }} className="py-5 min-h-screen h-full">
            <div className="container">
                <StrapiImage className="mb-16" src={userTheme.logo} width={200} height={50} />

                <div className="p-8 bg-[#fcf8f2] z-20 relative rounded-lg">

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-[5rem]">
                        <div>
                            <h1 className="text-3xl font-medium mb-12 lg:hidden text-black">{giftAttributes?.title}</h1>
                            {giftAttributes?.image_gallery?.data ? (
                                <CustomCarousel imageUrls={giftAttributes.image_gallery.data} />
                            ) : (
                                <StrapiImage src={giftAttributes?.featured_image?.data?.attributes?.url} alt={giftAttributes?.title} width={800} height={500} />
                            )}
                        </div>
                        <div className="text-black mx-auto my-5">
                            <Link className="text-black mb-4 block flex items-center gap-2 font-semibold text-sm" href={`/user/${user?.id}`}><ArrowLeft width={16} /><span>Back To Gift Selection</span></Link>
                            <h1 className="text-3xl font-medium mb-6 hidden lg:block">{giftAttributes?.title}</h1>
                            {giftAttributes?.description ? (
                                <BlocksRenderer content={giftAttributes.description} />
                            ) : (
                                <div>No description available.</div> // Fallback if description is not present
                            )}
                            <div className="mt-10">
                                {/* <Button onClick={() => addOrRemoveGiftFromSelection(gift)}>
                                    {!userGifts.includes(gift) ? 'Add to Selection' : 'Remove from Selection'}
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
