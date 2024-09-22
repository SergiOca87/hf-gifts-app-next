'use client'

import { useState } from 'react';
import UserGift from './UserGift';

function UserGifts({ user }) {
    const [selectedGifts, setSelectedGifts] = useState([]);

    const addOrRemoveGiftFromSelection = (gift) => {
        if (selectedGifts.includes(gift)) {
            setSelectedGifts(selectedGifts.filter((selectedGift) => selectedGift !== gift));
        } else {
            setSelectedGifts([...selectedGifts, gift]);
        }
    };

    console.log(selectedGifts);

    return (
        <div className="max-w-[1080px] grid w-100 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0">
            {user.gifts.map((gift) => {
                return (
                    <UserGift key={gift.id} gift={gift} user={user} selectedGifts={selectedGifts} addOrRemoveGiftFromSelection={addOrRemoveGiftFromSelection} />
                )
            })}
        </div>
    )
}

export default UserGifts