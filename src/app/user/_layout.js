"use client"
import { useContext } from "react";
import { ClientContext } from "@/app/client-provider";
import { Toaster } from "@/components/ui/sonner"

export default function ClientLayout({ children }) {


    return (
        <>
            {children}
        </>
    )

}
