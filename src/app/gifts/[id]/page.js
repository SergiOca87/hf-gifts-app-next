import QueryString from "qs";
import { getData, giftsQuery } from "@/lib/utils";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

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
    console.log('gift', gift.data.attributes.description);

    return (
        <div className="prose mx-auto my-5">
            <div>Gift ID {gift.data.id}</div>
            <p>{gift.data.attributes.title}</p>
            <BlocksRenderer content={gift.data.attributes.description} />
        </div>
    )
}
