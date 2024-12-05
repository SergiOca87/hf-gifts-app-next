'use client'
import { useContext } from 'react';
import UserGift from './UserGift';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ClientContext } from '@/app/client-provider';
import Link from 'next/link';

function UserGifts({ user }) {
    const { userGifts, setUserGifts } = useContext(ClientContext);

    const addOrRemoveGiftFromSelection = (gift) => {
        let addedOrRemoved = '';

        if (userGifts.includes(gift)) {
            setUserGifts(userGifts.filter((selectedGift) => selectedGift !== gift));
            addedOrRemoved = 'removed from';
        } else {
            setUserGifts([...userGifts, gift]);
            addedOrRemoved = 'added to';
        }

        toast(`A gift has been ${addedOrRemoved} your selection`, {
            position: 'bottom-center'
        });
    };

    return (
        <>
            <div className="container">
                <div className="max-w-[1080px] mx-auto grid w-100 gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0">
                    {user.gifts.map((gift) => {
                        return (
                            <UserGift key={gift.id} gift={gift} user={user} userGifts={userGifts} addOrRemoveGiftFromSelection={addOrRemoveGiftFromSelection} />
                        )
                    })}
                </div>
            </div>

            {userGifts.length > 0 &&
                <Button asChild className="fixed right-7 bottom-6 z-10">
                    <Link href={`/user/${user.id}/checkout`}>Confirm Selection</Link>
                </Button>
            }
        </>
    )
}

export default UserGifts