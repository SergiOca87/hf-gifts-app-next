import EventGifts from "@/components/EventGifts";
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

    return (
        <div>
            <div className={`container mt-12`}>
                <EventGifts event={event} />
            </div>
        </div >
    )
}