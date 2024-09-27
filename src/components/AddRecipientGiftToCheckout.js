

import { ClientContext } from '@/app/client-provider';
import Link from 'next/link';
import React, { useContext } from 'react'
import { Button } from "@/components/ui/button";

function AddRecipientGiftToCheckout({ gift, user }) {

    console.log('AddRecipientGiftToCheckout', gift, user);

    return (
        user && gift &&
        <Link href={`/user/${user.id}/recipient-checkout/${gift.data.id}`}>
            <Button>Select This Gift</Button >
        </Link>
    )
}

export default AddRecipientGiftToCheckout