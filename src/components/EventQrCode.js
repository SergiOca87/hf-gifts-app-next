"use client";
import { useQRCode } from 'next-qrcode';

function EventQrCode({ color, logoUrl, url }) {
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
                    dark: color,
                    light: '#fff',
                },
            }}
            logo={{
                src: "https://res.cloudinary.com/hgevg3mjs/image/upload/v1724671109/New_Project_867dd7bc8c.jpg",
                options: {
                    width: 55,
                    x: undefined,
                    y: undefined,
                }
            }}
        />
    );
}

export default EventQrCode;