"use client"
import { useContext } from "react";
import { ClientContext } from "@/app/client-provider";
import { Toaster } from "@/components/ui/sonner"

export default function ClientLayout({ children }) {

    const { userTheme } = useContext(ClientContext);

    console.log('userTheme from layout', userTheme);
    return (
        <>
            {children}

        </>
    )

}
