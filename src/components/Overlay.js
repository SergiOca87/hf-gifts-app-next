
'use client';

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { StrapiImage } from "./StrapiImage";
import CustomOtp from "@/components/CustomOtp";

function Overlay({ theme, client }) {
    const [visibleOverlay, setVisibleOverlay] = useState(true);
    const [validOtp, setValidOtp] = useState(false);
    const [otpValue, setOtpValue] = useState("");

    //TODO: Extract this to a Layout component
    const themeSettings = {
        backgroundColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#212e2e]' : 'bg-[#748487]'}`,
        buttonColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#ff2020]' : 'bg-[#ffcd19]'}`,
        logoUrl: theme.logo.data.attributes.url,
        decoratorUrl: theme.decorator.data.attributes.url
    }

    useEffect(() => {
        otpValue.length === 6 && otpValue === client.data.attributes.numeric_code ? setValidOtp(true) : setValidOtp(false);
    }, [otpValue]);

    return (
        visibleOverlay && (
            <div className={`fixed w-screen z-10 h-screen left-0 flex justify-center items-center overflow-hidden top-0 left-0 ${themeSettings.backgroundColor}`}>
                {/* <div className="absolute top-[2rem] left-[2rem]">
                    <StrapiImage src={themeSettings.logoUrl} alt="Logo" height={100} width={100} />
                </div>
                <div className="absolute top-[-2rem] right-[-2rem]">
                    <StrapiImage src={themeSettings.decoratorUrl} alt="Logo" height={400} width={400} />
                </div> */}
                <div className="container mx-auto">
                    <h1 className="text-white max-w-[40rem] font-medium text-4xl mb-8">Hello {client.data.attributes.name}, <br />There’s a gift waiting for you, a little something we think you’ll love.</h1>
                    <p className="text-white mb-5">Enter your code to claim your gift:</p>
                    <CustomOtp otpValue={otpValue} setOtpValue={setOtpValue} />
                    {otpValue.length === 6 && !validOtp && <p className="text-white">Invalid code, please try again.</p>}
                    <Button disabled={!validOtp} className={`mt-7 ${themeSettings.buttonColor}`} onClick={() => setVisibleOverlay(false)}>Get My Gift</Button>
                </div>
            </div >
        )
    )
}

export default Overlay