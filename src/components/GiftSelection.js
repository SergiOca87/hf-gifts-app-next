'use client'
import { useContext, useState } from 'react';
import SelectionGift from './SelectionGift';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ClientContext } from '@/app/client-provider';
import Link from 'next/link';


function GiftSelection({ user, giftSelection }) {
    return (
        <>
            <div className="container">
                <div className="max-w-[1080px] mx-auto grid w-100 gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0">
                    {giftSelection.map((gift) => {
                        return (
                            <SelectionGift key={gift.id} gift={gift} user={user} />
                        )
                    })}
                </div>
            </div>

            { /* <Button asChild className="fixed right-7 bottom-6 z-10">
                <Link href={`/user/${user.id}/checkout`}>Confirm Selection</Link>
            </Button> */ }
        </>
    )
}

export default GiftSelection