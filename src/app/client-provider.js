'use client'

import { createContext, useState, useEffect } from 'react'

export const ClientContext = createContext({
    isNumericCodeValid: false,
    setIsNumericCodeValid: () => { },
    clientGifts: null,
    setClientGifts: () => { },
    clientTheme: "",
    setClientTheme: () => { }
})

export default function ClientProvider({ children }) {
    const [isNumericCodeValid, setIsNumericCodeValid] = useState(false);
    const [clientGifts, setClientGifts] = useState(null);
    const [clientTheme, setClientTheme] = useState("");

    useEffect(() => {
        const storedIsNumericCodeValid = localStorage.getItem('isNumericCodeValid');
        const storedClientGift = localStorage.getItem('clientGift');

        if (storedIsNumericCodeValid !== null) {
            setIsNumericCodeValid(JSON.parse(storedIsNumericCodeValid));
        }

        if (storedClientGift !== null) {
            setClientGifts(JSON.parse(storedClientGift));
        }

        // localStorage.setItem('isNumericCodeValid', JSON.stringify(isValid));
    }, []);

    const value = {
        isNumericCodeValid,
        setIsNumericCodeValid,
        clientGifts,
        setClientGifts,
        clientTheme,
        setClientTheme
    }

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    )
}