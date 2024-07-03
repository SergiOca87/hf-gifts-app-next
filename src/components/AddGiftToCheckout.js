
'use client'

import { ClientContext } from '@/app/client-provider';
import Link from 'next/link';
import React, { useContext } from 'react'
import { Button } from "@/components/ui/button";

function AddGiftToCheckout({ gift, client, themeSettings }) {
    console.log(gift, client);
    const { setClientGifts } = useContext(ClientContext);

    return (
        <Button onClick={setClientGifts(gift)} className={`${themeSettings?.buttonColor}`}>
            <Link href={`/client/checkout/${client.data.id}`}> Select This Gift</Link>
        </Button >
    )
}

export default AddGiftToCheckout