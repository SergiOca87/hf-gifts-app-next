import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { StrapiImage } from './StrapiImage'
import Link from 'next/link'
import RemoveGiftFromContext from './RemoveGiftFromContext'

function Gift({ gift, themeSettings, canBeRemoved = false }) {
    const { title, description, gift_categories, featured_image } = gift.attributes
    return (
        <Card className="overflow-hidden max-w-[350px] shadow-2xl group relative z-0">
            {canBeRemoved && <RemoveGiftFromContext gift={gift} />}
            <CardHeader className="p-0 relative h-[300px] overflow-hidden" >
                {featured_image && (
                    <StrapiImage src={featured_image.data.attributes.url} alt={title} height={300} width={'100%'} layout="fill" objectFit="cover" className="transition duration-700 group-hover:scale-105" />
                )
                }

                <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-[#fcf8f2]">
                <CardTitle className="text-2xl mb-5">{title}</CardTitle>
                {!canBeRemoved && (
                    <Link href={`/gifts/${gift.id}`}>
                        <Button className={`${themeSettings?.buttonColor}`}>More Details</Button>
                    </Link>
                )}

            </CardContent>
            {/* {
                gift_categories && (
                    <CardFooter>
                        <p>Category:</p>
                        <ul>
                            {gift_categories.data.map((category) => (
                                <li key={category.id}>{category.attributes.name}</li>
                            ))}
                        </ul>
                    </CardFooter>
                )
            } */}
        </Card >
    )
}

export default Gift

