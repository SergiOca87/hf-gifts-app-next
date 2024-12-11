import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { StrapiImage } from './StrapiImage'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import GiftDetailDialog from './GiftDetailDialog'

function SelectionGift({ gift, user }) {
    const { title, featured_image, description } = gift.attributes;

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code
    }

    return (
        <Card className="overflow-hidden max-w-[500px] mx-auto w-full group relative z-0 border-none shadow-none rounded-none">
            <CardHeader className="p-0 relative overflow-hidden" >
                {featured_image && (
                    <StrapiImage src={featured_image.data.attributes.url} alt={title} height={266} width={290} className="transition duration-700 group-hover:scale-105 rounded-lg aspect-square w-full object-cover" />
                )}
            </CardHeader>

            <CardContent className="p-0 pt-4">
                <CardTitle className="text-lg mb-3">{title}</CardTitle>

                <GiftDetailDialog gift={gift} user={user} />

            </CardContent>
        </Card >
    )
}

export default SelectionGift

