'use client'

import { createContext, useState } from 'react'

export const ClientContext = createContext({
    isNumericCodeValid: false,
    setIsNumericCodeValid: () => { },
    clientGifts: null,
    setClientGifts: () => { },
})

export default function ClientProvider({ children }) {
    const [isNumericCodeValid, setIsNumericCodeValid] = useState(false);
    const [clientGifts, setClientGifts] = useState(null);
    const [clientTheme, setClientTheme] = useState("");

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