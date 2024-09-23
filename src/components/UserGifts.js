'use client'
import { useContext, useState } from 'react';
import UserGift from './UserGift';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ClientContext } from '@/app/client-provider';


function UserGifts({ user }) {
    const { userTheme } = useContext(ClientContext);
    const [selectedGifts, setSelectedGifts] = useState([]);

    const addOrRemoveGiftFromSelection = (gift) => {
        console.log('changing');
        let addedOrRemoved = '';

        if (selectedGifts.includes(gift)) {
            setSelectedGifts(selectedGifts.filter((selectedGift) => selectedGift !== gift));
            addedOrRemoved = 'removed from';
        } else {
            setSelectedGifts([...selectedGifts, gift]);
            addedOrRemoved = 'added to';
        }

        toast(`A gift has been ${addedOrRemoved} your selection`);
    };

    console.log('userTheme from UserGifts', userTheme);

    return (
        <>
            <div className="max-w-[1080px] grid w-100 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0">
                {user.gifts.map((gift) => {
                    return (
                        <UserGift key={gift.id} gift={gift} user={user} selectedGifts={selectedGifts} addOrRemoveGiftFromSelection={addOrRemoveGiftFromSelection} inSelection={selectedGifts.includes(gift)} />
                    )
                })}
            </div>

            <Button className="mt-12 disabled:hover:cursor-not-allowed disabled:hover:pointer-events-all" variant="secondary" disabled={selectedGifts.length === 0}>Confirm Selection</Button>
        </>
    )
}

export default UserGifts