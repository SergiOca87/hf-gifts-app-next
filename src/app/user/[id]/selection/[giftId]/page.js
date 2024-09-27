
import { getData, giftsQuery, userQuery } from "@/lib/utils";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { StrapiImage } from "@/components/StrapiImage";
import CustomCarousel from "@/components/CustomCarousel";
import AddGiftToContext from "@/components/AddGiftToContext";
import AddGiftToCheckout from "@/components/AddGiftToCheckout";
import ThemeLayout from "@/components/ThemeLayout";
import AddRecipientGiftToCheckout from "@/components/AddRecipientGiftToCheckout";

export default async function GiftPage({ params }) {
    const gift = await getData(`/api/gifts/${params.giftId}`, giftsQuery);
    // const clientData = await getData(`/api/clients/${params.clientId}`, clientQuery);
    const user = await getData(`/api/users/${params.id}`, userQuery);

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code,
        logo: user?.user_logo.url
    }


    return (

        <div style={{ backgroundColor: userTheme.backgroundColor, color: userTheme.color }} className="py-5 min-h-screen h-full">

            <div className="container">
                <StrapiImage className="mb-16" src={userTheme.logo} width={200} height={50} />
                <div className="p-8 bg-[#fcf8f2] z-20 relative rounded-lg">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-[5rem]">
                        <div>
                            <h1 className="text-3xl font-medium mb-12 lg:hidden text-black">{gift.data.attributes.title}</h1>

                            {gift.data.attributes?.image_gallery?.data ? (
                                <CustomCarousel imageUrls={gift.data.attributes.image_gallery.data} />
                            ) : (
                                <StrapiImage src={gift.data.attributes.featured_image.data.attributes.url} alt={gift.data.attributes.title} width={800} height={500} />
                            )}
                            {/* <CustomCarousel imageUrls={gift.data.attributes.image_gallery.data} /> */}
                        </div>
                        <div className="text-black mx-auto my-5">
                            <h1 className="text-3xl font-medium mb-6 hidden lg:block">{gift.data.attributes.title}</h1>
                            <BlocksRenderer content={gift.data.attributes.description} />
                            <div className="mt-10">
                                <AddRecipientGiftToCheckout gift={gift} user={user} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
