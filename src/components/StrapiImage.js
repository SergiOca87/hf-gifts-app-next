import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";


export function StrapiImage({
    src,
    alt,
    height,
    width,
    className,
    layout,
    objectFit
}) {
    if (!src) return null;
    const imageUrl = getStrapiMedia(src);
    const imageFallback = `https://placehold.co/${width}x${height}`;

    return (
        <Image
            src={imageUrl ?? imageFallback}
            alt={alt}
            height={!layout && height}
            width={!layout && width}
            className={className}
            layout={layout}
            objectFit={objectFit}
        />
    );
}