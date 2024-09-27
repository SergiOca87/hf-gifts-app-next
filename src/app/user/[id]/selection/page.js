"use client"
import React, { useState, useEffect } from 'react';
import { getData, giftsQuery, userQuery } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { StrapiImage } from '@/components/StrapiImage';
import GiftSelection from '@/components/GiftSelection';
import qs from 'qs';

function RecipientGiftSelection({ params }) {
    const searchParams = useSearchParams(); // Get query parameters

    // Get user ID directly from passed params
    const userId = params?.id;

    // State to hold giftIds and other data
    const [giftIds, setGiftIds] = useState([]);
    const [user, setUser] = useState(null);
    const [giftSelection, setGiftSelection] = useState([]);

    // Update giftIds when searchParams change
    useEffect(() => {
        const ids = searchParams.getAll('giftIds');
        setGiftIds(ids);
    }, [searchParams]);

    // Fetch data on component mount or when userId or giftIds change
    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedUser = await getData(`/api/users/${userId}`, userQuery);

                // Build query string for gifts
                const queryString = giftIds
                    .map((id, index) => `filters[id][$in][${index}]=${id}`)
                    .join('&');


                const giftsQueryString = giftsQuery;

                const fetchGiftsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/gifts?${queryString}&${giftsQueryString}`;

                // Fetch gift data
                const giftsResponse = await fetch(fetchGiftsUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include token if necessary
                    }
                });
                if (!giftsResponse.ok) {
                    throw new Error(`Failed to fetch gifts: ${giftsResponse.status} ${giftsResponse.statusText}`);
                }
                const fetchedGifts = await giftsResponse.json();

                console.log('fetchGiftsUrl', fetchGiftsUrl);
                console.log('fetched gifts', fetchedGifts);

                setUser(fetchedUser);
                setGiftSelection(fetchedGifts.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        if (userId && giftIds.length > 0) {
            fetchData();
        }
    }, [userId, giftIds]);


    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code,
        logo: user?.user_logo.url
    }

    return (
        user && (
            <div style={{ backgroundColor: userTheme.backgroundColor, color: userTheme.color }} className="py-5 min-h-screen h-full">
                <div className="container">
                    <StrapiImage className="mb-16" src={userTheme.logo} width={200} height={50} />
                    <h1 className="text-2xl mt-12 text-white font-medium mb-12 mt-12">
                        Please select a gift from the selection:
                    </h1>
                    <GiftSelection giftSelection={giftSelection} user={user} userTheme={userTheme} />
                </div>
            </div >
        )
    )
}

export default RecipientGiftSelection;
