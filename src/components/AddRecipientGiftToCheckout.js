

import { ClientContext } from '@/app/client-provider';
import Link from 'next/link';
import React, { useContext } from 'react'
import { Button } from "@/components/ui/button";

function AddRecipientGiftToCheckout({ gift, user, text, className }) {

    console.log('AddRecipientGiftToCheckout', gift, user);

    return (
        user && gift &&
        <Button asChild className={className}>
            <Link href={`/user/${user.id}/recipient-checkout/${gift.id}`}>{text}</Link>
        </Button>
    )
}

export default AddRecipientGiftToCheckout