'use client'

import { createContext, useState } from 'react'

// Create the context with an initial value
export const ClientContext = createContext({
    isNumericCodeValid: false,
    setIsNumericCodeValid: () => { }
})

export default function ClientProvider({ children }) {
    // State to hold the value of isNumericCodeValid
    const [isNumericCodeValid, setIsNumericCodeValid] = useState(false);

    // Value object to pass down the context
    const value = {
        isNumericCodeValid,
        setIsNumericCodeValid,
    }

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    )
}