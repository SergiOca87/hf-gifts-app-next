"use client";
import { useQRCode } from 'next-qrcode';

function EventQrCode({ mainColor, secondaryColor, logoUrl, url }) {
    const { Canvas } = useQRCode();

    return (
        <Canvas
            text={url}
            options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 210,
                color: {
                    dark: secondaryColor,
                    light: mainColor,
                },
            }}
            logo={{
                src: logoUrl,
                options: {
                    width: 45,
                    x: undefined,
                    y: undefined,
                }
            }}
        />
    );
}

export default EventQrCode;