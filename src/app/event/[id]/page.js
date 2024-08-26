
import { eventQuery, getData } from "@/lib/utils";
import { Separator } from "@/components/ui/separator"
import ThemeLayout from "@/components/ThemeLayout";
import { StrapiImage } from "@/components/StrapiImage";
import EventQrCode from "@/components/EventQrCode";

async function Landing({ params }) {
    const event = await getData(`/api/events/${params.id}`, eventQuery);
    const theme = event.data.attributes.theme.data.attributes;

    const themeSettings = {
        backgroundColor: `bg-[#${theme.secondary_color_hex}]`,
        buttonColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#ff2020]' : 'bg-[#ffcd19]'}`,
        logoUrl: theme?.logo?.data?.attributes?.url,
        decoratorUrl: theme?.decorator?.data?.attributes?.url
    }

    console.log('event theme', event?.data?.attributes?.qr_logo?.data?.attributes?.url);

    return (
        <ThemeLayout themeSettings={themeSettings}>
            <div className={`w-100 min-h-[calc(100svh-20rem)] flex justify-center items-center`}>
                <div className="container mx-auto">
                    <div className="max-w-[40rem]">
                        <StrapiImage src={event?.data?.attributes?.full_logo?.data?.attributes?.url} width={200} height={50} />
                        <h1 className="text-white font-medium text-4xl mb-8 mt-4">Welcome to {event.data.attributes.title}</h1>
                        <Separator className="mt-4 mb-6 opacity-40" />
                        <h2 className="text-white text-2xl mb-5">{event.data.attributes.intro_text}</h2>
                        <EventQrCode url="https://google.com" color="" logoUrl={event?.data?.attributes?.qr_logo?.data?.attributes?.url} />
                    </div>
                </div>
            </div>
        </ThemeLayout>
    )
}

export default Landing