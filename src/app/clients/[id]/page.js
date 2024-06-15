import { clientQuery, getData } from "@/lib/utils";
import Gift from "@/components/Gift";
import Layout from "@/components/Layout";

export async function generateStaticParams() {
    const clientsData = await getData('http://127.0.0.1:1337/api/clients');

    return clientsData.data.map((client) => {
        return {
            params: {
                id: client.id.toString()
            }
        }
    });
}

export default async function Client({ params }) {
    const client = await getData(`/api/clients/${params.id}`, clientQuery);
    const theme = client.data.attributes.theme.data.attributes.Title;

    return (
        <Layout theme={theme}>
            <div className="prose mx-auto my-5">
                <p>Test</p>
                <div>Client ID {client.data.id}</div>
                <p>Client Name, {client.data.attributes.name}</p>
                <p>Client Gifts:</p>
                {client.data.attributes.gifts.data.map((gift) => {
                    return (
                        <Gift key={gift.id} gift={gift} />
                    )
                })}
            </div>
        </Layout>
    )
}