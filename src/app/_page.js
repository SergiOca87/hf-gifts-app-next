import Gift from "@/components/Gift";
import { getData, giftsQuery } from "@/lib/utils";

export default async function Home() {
    const giftsData = await getData('/api/gifts', giftsQuery);
    const clientsData = await getData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/clients`);



    return (
        <p>Homepage</p>
    );
}
