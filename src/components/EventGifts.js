import Gift from '@/components/Gift';
import { StrapiImage } from './StrapiImage';

async function EventGifts({ event, headerColor = false, logoUrl }) {

    return (
        <div>
            <h2 className={`${headerColor ? headerColor : 'text-white'} text-3xl font-medium mb-12 mt-12`}>Please choose one of the following:</h2>
            <div className="max-w-[1080px] grid w-100 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0">
                {event.data.attributes.gifts.data.map((gift) => {
                    return (
                        <Gift key={gift.id} gift={gift} event={event} logoUrl={logoUrl} />
                    )
                })}
            </div>

        </div>
    )
}

export default EventGifts