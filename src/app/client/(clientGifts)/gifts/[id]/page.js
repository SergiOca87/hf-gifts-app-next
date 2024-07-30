import ClientGifts from "@/components/ClientGifts";
import { clientQuery, getData } from "@/lib/utils";

export async function generateStaticParams() {
    const clientsData = await getData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/clients`);

    return clientsData.data.map((client) => {
        return {
            params: {
                id: client.id.toString()
            }
        }
    });
}

export default async function ClientGiftsPage({ params }) {
    const client = await getData(`/api/clients/${params.id}`, clientQuery);

    return (
        <div>
            <div className={`container mt-12`}>
                <ClientGifts client={client} />
            </div>

        </div >
    )
}