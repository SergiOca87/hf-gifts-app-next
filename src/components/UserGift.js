import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from './ui/button'
import { StrapiImage } from './StrapiImage'
import { Check } from 'lucide-react';
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

function UserGift({ gift, user, userGifts, addOrRemoveGiftFromSelection }) {
    const { title, featured_image, description } = gift;

    return (
        <Card className="overflow-hidden max-w-[500px] mx-auto w-full group relative z-0 border-none shadow-none rounded-none">
            <CardHeader className="p-0 relative h-[300px] overflow-hidden" >
                {featured_image && (
                    <StrapiImage src={featured_image.url} alt={title} height={266} width={290} layout="fill" objectFit="cover" className="transition duration-700 group-hover:scale-105 rounded-lg aspect-1" />
                )}
            </CardHeader>
            
            <CardContent className="p-0 pt-4">
                <CardTitle className="text-lg mb-3">{title}</CardTitle>

                <div className='flex items-center gap-2'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="border-[#C5C5C5] basis-1/2 bg-[#DADADA]/10 justify-start">More Details</Button>
                        </PopoverTrigger>
                        
                        <PopoverContent className="border-none p-0">
                            <ScrollArea className="h-72">
                                <div className="px-6 py-5 space-y-2">
                                    <BlocksRenderer content={description} />
                                </div>
                            </ScrollArea>
                        </PopoverContent>
                    </Popover>

                    <Button variant="secondary" className={`basis-1/2 justify-between hover:bg-blue/10 ${userGifts.includes(gift) ? "bg-blue/10" : "" }`} onClick={() => addOrRemoveGiftFromSelection(gift)}>
                        {!userGifts.includes(gift) ? 'Include Gift' : 'Included'}
                        <div className={`w-6 h-6 rounded ${userGifts.includes(gift) ? "bg-primary text-white" : "border border-slate-400" }`}>
                            {userGifts.includes(gift) && <Check />}
                        </div>
                    </Button>
                </div>

            </CardContent>
        </Card >
    )
}

export default UserGift

