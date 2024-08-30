"use client";
import { useQRCode } from 'next-qrcode';
import { useEffect, useState } from 'react';

function EventQrCode({ mainColor, secondaryColor, logoUrl, eventId }) {
    const { Canvas } = useQRCode();
    const [rootUrl, setRootUrl] = useState('');

    useEffect(() => {
        if (window.location.origin) {
            setRootUrl(window.location.origin);
        }
    }, [])

    return (
        <Canvas
            text={`${rootUrl}/event/${eventId}/gifts`}
            options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 150,
                color: {
                    dark: secondaryColor,
                    light: mainColor,
                },
            }}
            logo={{
                src: logoUrl,
                options: {
                    width: 35,
                    x: undefined,
                    y: undefined,
                }
            }}
        />
    );
}

export default EventQrCode;