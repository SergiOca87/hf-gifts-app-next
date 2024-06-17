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
                        <StrapiImage src={imageUrl.attributes.url} width={100} height={100} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CustomCarousel

