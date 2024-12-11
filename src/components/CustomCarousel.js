import { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel"
import { StrapiImage } from "./StrapiImage"

function CustomCarousel({ images, arrows, thumbnails }) {
    const [api, setApi] = useState();

    useEffect(() => {
        if (!api) {
            return
        }
        
        /* api.on("select", () => {
            // Do something on select.
        }) */
    }, [api])

    return (
        images && (
            <>
                <Carousel setApi={setApi}>
                    <CarouselContent>
                        {images.map((imageUrl) => (
                            <CarouselItem key={imageUrl.id} className="cursor-grab">
                                <StrapiImage src={imageUrl.attributes.url} height={612} width={612} className="mx-auto object-cover rounded-lg aspect-square w-full" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {arrows && (
                        <>
                            <CarouselPrevious variant="outline" className="left-3" />
                            <CarouselNext variant="outline" className="right-3" />
                        </>
                    )}
                </Carousel>
                
                {thumbnails && (
                    <Carousel className="mt-5">
                        <CarouselContent>
                            {images.map((imageUrl) => (
                                <CarouselItem key={imageUrl.id} className="basis-[70px] p-0 ml-4">
                                    <StrapiImage src={imageUrl.attributes.url} height={70} width={70} className="object-cover rounded-md aspect-square" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}
            </>
        )
    )
}

export default CustomCarousel

