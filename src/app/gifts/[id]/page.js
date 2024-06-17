import QueryString from "qs";
import { getData, giftsQuery } from "@/lib/utils";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { StrapiImage } from "@/components/StrapiImage";
import { Button } from "@/components/ui/button";
import CustomCarousel from "@/components/CustomCarousel";

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
    console.log(gift.data.attributes.image_gallery.data);

    return (
        <div className="container">
            <div className="p-8 bg-[#fcf8f2]">
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div>
                        <StrapiImage src={gift.data.attributes.featured_image.data.attributes.url} alt={gift.data.attributes.title} height={300} width={500} className="transition duration-700 group-hover:scale-105" />
                        <CustomCarousel imageUrls={gift.data.attributes.image_gallery.data} />
                    </div>
                    <div className="prose mx-auto my-5">
                        <div>Gift ID {gift.data.id}</div>
                        <p>{gift.data.attributes.title}</p>
                        <BlocksRenderer content={gift.data.attributes.description} />

                        <Button>Add to Selection</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
