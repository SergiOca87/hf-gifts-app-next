import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { StrapiImage } from "./StrapiImage"

function CustomCarousel({ imageUrls }) {
    return (
        <Carousel>
            <CarouselContent>
                {imageUrls.map((imageUrl) => (
                    <CarouselItem key={imageUrl}>
                        <StrapiImage src={imageUrl.attributes.url} height={612} width={612} className="mx-auto" />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CustomCarousel

