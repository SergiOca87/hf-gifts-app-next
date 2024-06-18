import QueryString from "qs";
import { getData, giftsQuery } from "@/lib/utils";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { StrapiImage } from "@/components/StrapiImage";
import CustomCarousel from "@/components/CustomCarousel";
import AddGiftToContext from "@/components/AddGiftToContext";
import AddGiftToCheckout from "@/components/AddGiftToCheckout";

export async function generateStaticParams() {
    const giftsData = await getData('http://127.0.0.1:1337/api/gifts');

    return giftsData.data.map((client) => {
        return {
            params: {
                id: client.id.toString()
            }
        }
    });
}

export default async function Gift({ params }) {
    const gift = await getData(`/api/gifts/${params.id}`, giftsQuery);

    return (
        <div className="container">
            <div className="p-8 bg-[#fcf8f2] z-20 relative">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-[5rem]">
                    <div>
                        <h1 className="text-3xl font-medium mb-12 lg:hidden text-black">{gift.data.attributes.title}</h1>
                        <CustomCarousel imageUrls={gift.data.attributes.image_gallery.data} />
                    </div>
                    <div className="text-black mx-auto my-5">
                        <h1 className="text-3xl font-medium mb-6 hidden lg:block">{gift.data.attributes.title}</h1>
                        <BlocksRenderer content={gift.data.attributes.description} />
                        <div className="mt-10">
                            <AddGiftToCheckout gift={gift} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
