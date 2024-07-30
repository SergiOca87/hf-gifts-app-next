'use client'

import { ClientContext } from '@/app/client-provider';
import Gift from '@/components/Gift';
import { useContext } from 'react';

function ClientGifts({ client, themeSettings }) {
    const { isNumericCodeValid } = useContext(ClientContext);
    const { clientTheme } = useContext(ClientContext);

    return (
        <div>
            {isNumericCodeValid ? (
                <>
                    <h2 className="text-3xl text-white font-medium mb-12 mt-12">Please choose one of the following:</h2>
                    <div className="max-w-[1080px] grid w-100 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0">
                        {client.data.attributes.gifts.data.map((gift) => {
                            return (
                                <Gift key={gift.id} gift={gift} themeSettings={clientTheme} client={client} />
                            )
                        })}
                    </div>
                </>
            ) : (
                <h2 className="text-3xl text-white font-medium mb-12">Sorry, you cannot visit this page.</h2>
            )}
        </div>
    )
}

export default ClientGifts