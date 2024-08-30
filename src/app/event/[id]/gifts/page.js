import EventGifts from "@/components/EventGifts";
import { StrapiImage } from "@/components/StrapiImage";
import { eventQuery, getData } from "@/lib/utils";

export async function generateStaticParams() {
    const eventsData = await getData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events`);

    return eventsData.data.map((event) => {
        return {
            params: {
                id: event.id.toString()
            }
        }
    });
}

export default async function EventGiftsPage({ params }) {
    const event = await getData(`/api/events/${params.id}`, eventQuery);
    const eventLogo = event?.data?.attributes?.full_logo?.data?.attributes?.url;
    console.log('event', event);

    return (
        <div>
            <div>
                <StrapiImage src={eventLogo} width={200} height={50} />
            </div>
            <div className="mt-20">
                <EventGifts event={event} headerColor={'text-slate-700'} />
            </div>
        </div >
    )
}