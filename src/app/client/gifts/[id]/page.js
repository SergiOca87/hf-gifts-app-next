//TODO: Important, this route should be protected by the OTP token, so that only the client can access it

import { clientQuery, getData } from "@/lib/utils";
import Gift from "@/components/Gift";

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
        <div className={`w-100 h-100 ${themeSettings.backgroundColor}`}>
            <div className={`container mt-12`}>

                <h2 className="text-3xl text-white font-medium mb-12">Please choose from the following:</h2>
                <div className="max-w-[1080px] grid w-100 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0">
                    {client.data.attributes.gifts.data.map((gift) => {
                        return (
                            <Gift key={gift.id} gift={gift} themeSettings={themeSettings} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}