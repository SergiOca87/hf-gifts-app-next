import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { StrapiImage } from './StrapiImage'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'

function UserGift({ gift, user, selectedGifts, addOrRemoveGiftFromSelection }) {
    const { title, featured_image } = gift

    console.log(gift);
    return (
        <Card className="overflow-hidden max-w-[350px] shadow-xl group relative z-0">
            <CardHeader className="p-0 relative h-[300px] overflow-hidden" >
                {featured_image && (
                    <StrapiImage src={featured_image.url} alt={title} height={300} width={'100%'} layout="fill" objectFit="cover" className="transition duration-700 group-hover:scale-105" />
                )}
            </CardHeader>
            <CardContent className="p-6 bg-[#fcf8f2]">
                <CardTitle className="text-[1.2rem] mb-5">{title}</CardTitle>

                {/* <Link href={`/user/gift/${user.id}/${gift.id}`}>
                    <Button>More Details</Button>
                </Link> */}
                <div className='flex items-center gap-2'>
                    <Button onClick={() => addOrRemoveGiftFromSelection(gift)}>{!selectedGifts.includes(gift) ? 'Add to Selection' : 'Remove from Selection'}</Button>
                    <Link href={`/user/${user.id}/${gift.id}`}>
                        <Button>More Details</Button>
                    </Link>
                </div>

            </CardContent>
        </Card >
    )
}

export default UserGift

