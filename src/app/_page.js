import Gift from "@/components/Gift";
import { getData, giftsQuery } from "@/lib/utils";

export default async function Home() {
    const giftsData = await getData('/api/gifts', giftsQuery);
    const clientsData = await getData('http://127.0.0.1:1337/api/clients');

    return (
        <p>Homepage</p>
    );
}
