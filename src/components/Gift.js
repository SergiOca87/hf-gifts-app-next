import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { StrapiImage } from './StrapiImage'
import Link from 'next/link'

function Gift({ gift }) {
    const { title, description, gift_categories, featured_image } = gift.attributes
    return (
        <Card>
            <CardHeader>
                {featured_image && (
                    <StrapiImage src={featured_image.data.attributes.url} alt={title} height={200} width={200} />
                )}
                <CardTitle>{title}</CardTitle>
                <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={`/gifts/${gift.id}`}>
                    <Button>More Details</Button>
                </Link>
            </CardContent>
            {
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
            }
        </Card >
    )
}

export default Gift