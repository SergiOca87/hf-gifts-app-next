'use client'

import { useContext } from "react";
import { ClientContext } from "@/app/client-provider";
import { StrapiImage } from "@/components/StrapiImage";

export default function ClientLayout({ children }) {
    const { userTheme } = useContext(ClientContext);

    return (
        userTheme ? (
            <>
                <div className={`${userTheme.backgroundColor} w-full h-full min-h-svh py-20`}>
                    <div className="absolute top-[1rem] left-[2rem]">
                        <StrapiImage src={`${userTheme.logoUrl}`} alt="Logo" height={100} width={150} />
                    </div>
                    <div className="absolute top-[-2rem] right-[-3rem]">
                        <StrapiImage src={`${userTheme.decoratorUrl}`} alt="" height={400} width={400} />
                    </div>

                    <div className="container mt-12 relative">
                        {children}
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className="bg-[#212e2e] w-full h-full min-h-svh py-20">
                    {children}
                </div>
            </>
        )
    );
}
