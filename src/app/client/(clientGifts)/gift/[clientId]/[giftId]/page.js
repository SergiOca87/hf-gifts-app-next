
import { getData, giftsQuery, clientQuery } from "@/lib/utils";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { StrapiImage } from "@/components/StrapiImage";
import CustomCarousel from "@/components/CustomCarousel";
import AddGiftToCheckout from "@/components/AddGiftToCheckout";
import ThemeLayout from "@/components/ThemeLayout";

export async function generateStaticParams() {
    const giftsData = await getData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/gifts`);

    return giftsData.data.map((gift) => {
        return {
            params: {
                id: gift.id.toString()
            }
        }
    });
}
export default async function GiftPage({ params }) {
    const gift = await getData(`/api/gifts/${params.giftId}`, giftsQuery);
    const clientData = await getData(`/api/clients/${params.clientId}`, clientQuery);

    return (

        <div className="container">
            <div className="p-8 bg-[#fcf8f2] z-20 relative">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-[5rem]">
                    <div>
                        <h1 className="text-3xl font-medium mb-12 lg:hidden text-black">{gift.data.attributes.title}</h1>
                        <CustomCarousel images={gift.data.attributes.image_gallery.data} />
                    </div>
                    <div className="text-black mx-auto my-5">
                        <h1 className="text-3xl font-medium mb-6 hidden lg:block">{gift.data.attributes.title}</h1>
                        <BlocksRenderer content={gift.data.attributes.description} />
                        <div className="mt-10">
                            <AddGiftToCheckout gift={gift} client={clientData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
