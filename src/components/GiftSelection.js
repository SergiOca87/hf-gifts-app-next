'use client'
import { useContext, useState } from 'react';
import SelectionGift from './SelectionGift';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ClientContext } from '@/app/client-provider';
import Link from 'next/link';


function GiftSelection({ user, giftSelection }) {
    console.log('giftSelection', giftSelection)

    return (
        <>
            <div className="max-w-[1080px] grid w-100 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0">
                {giftSelection.map((gift) => {
                    return (
                        <SelectionGift key={gift.id} gift={gift} user={user} />
                    )
                })}
            </div>
        </>
    )
}

export default GiftSelection