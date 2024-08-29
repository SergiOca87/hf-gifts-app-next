
import { getData, giftsQuery, eventQuery } from "@/lib/utils";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import CustomCarousel from "@/components/CustomCarousel";
import AddGiftToCheckout from "@/components/AddGiftToCheckout";
import { StrapiImage } from "@/components/StrapiImage";

export async function generateStaticParams() {
    const giftsData = await getData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/gifts`);

    return giftsData.data.map((gift) => {
        console.log('giftData', gift);
        return {
            params: {
                id: gift.id.toString()
            }
        }
    });
}

export default async function GiftPage({ params }) {
    const gift = await getData(`/api/gifts/${params.giftId}`, giftsQuery);
    const { title, description, gift_categories, featured_image } = gift.data.attributes;
    const eventData = await getData(`/api/events/${params.eventId}`, eventQuery);
    const eventLogo = eventData?.data?.attributes?.full_logo?.data?.attributes?.url;

    return (
        <>


            <div className="container">
                <StrapiImage src={eventLogo} width={200} height={50} />
                <div className="p-8 bg-[#fcf8f2] z-20 relative shadow-xl  mt-20">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-[5rem]">
                        <div>
                            <h1 className="text-3xl font-medium mb-12 lg:hidden text-black">{gift.data.attributes.title}</h1>
                            {gift.data.attributes?.image_gallery?.data &&
                                <CustomCarousel imageUrls={gift.data.attributes.image_gallery.data} />
                            }

                            {!gift.data.attributes?.image_gallery?.data &&

                                gift.data.attributes.featured_image && (
                                    <div className="relative h-full">
                                        <StrapiImage src={gift.data.attributes.featured_image.data.attributes.url} alt={title} height={400} width={500} />
                                    </div>
                                )

                            }
                        </div>
                        <div className="text-black mx-auto my-5">
                            <h1 className="text-3xl font-medium mb-6 hidden lg:block">{gift.data.attributes.title}</h1>
                            <BlocksRenderer content={gift.data.attributes.description} />
                            <div className="mt-10">
                                <AddGiftToCheckout gift={gift} event={eventData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
