import ClientGifts from "@/components/ClientGifts";
import ThemeLayout from "@/components/ThemeLayout";
import { clientQuery, getData } from "@/lib/utils";

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
    const theme = client.data.attributes.theme.data.attributes;

    //TODO: Extract this to a Layout component
    const themeSettings = {
        backgroundColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#212e2e]' : 'bg-[#748487]'}`,
        buttonColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#ff2020]' : 'bg-[#ffcd19]'}`,
        logoUrl: theme.logo.data.attributes.url,
        decoratorUrl: theme.decorator.data.attributes.url
    }

    return (
        <div>
            <ThemeLayout themeSettings={themeSettings}>
                <div className={`container mt-12`}>
                    <ClientGifts client={client} themeSettings={themeSettings} />
                </div>
            </ThemeLayout>
        </div >
    )
}