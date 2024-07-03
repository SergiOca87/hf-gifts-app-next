
'use client'

import { ClientContext } from '@/app/client-provider';
import Link from 'next/link';
import React, { useContext } from 'react'
import { Button } from "@/components/ui/button";

function AddGiftToCheckout({ gift, client, themeSettings }) {
    const { setClientGifts } = useContext(ClientContext);

    const setClientGiftsToContext = () => {
        setClientGifts(gift)
        localStorage.setItem('clientGift', JSON.stringify(gift));
    }

    return (
        <Button onClick={setClientGiftsToContext} className={`${themeSettings?.buttonColor}`}>
            <Link href={`/client/checkout/${client.data.id}`}> Select This Gift</Link>
        </Button >
    )
}

export default AddGiftToCheckout