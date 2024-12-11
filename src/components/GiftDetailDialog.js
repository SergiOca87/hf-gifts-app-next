import React from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import CustomCarousel from "@/components/CustomCarousel";
import { StrapiImage } from './StrapiImage';

function GiftDetailDialog({ gift, user }) {
    const { title, description, image_gallery, featured_image } = gift.attributes;

    const userTheme = {
        backgroundColor: user?.hex_bg_code,
        color: user?.hex_text_code
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-[#C5C5C5] basis-1/2 bg-[#DADADA]/10 justify-start">More Details</Button>
            </DialogTrigger>

            <DialogContent style={userTheme} className="max-w-4xl p-5 rounded-3xl">
                <div className="flex gap-6">
                    <div className="basis-1/2">
                        <div className="max-w-[360px]">
                            {image_gallery.data ? (
                                <CustomCarousel images={image_gallery.data} arrows={true} />
                            ) : (
                                <StrapiImage src={featured_image.data.attributes.url} alt={title} height={360} width={360} className="rounded-lg aspect-square w-full object-cover" />
                            )}
                        </div>
                    </div>

                    <div className="basis-1/2 py-4">
                        <DialogTitle className="font-medium text-4xl tracking-tight mb-10">{title}</DialogTitle>

                        <DialogDescription className="text-lg text-black/80 mb-20">
                            <BlocksRenderer content={description} />
                        </DialogDescription>

                        <Button className="w-full max-w-60">Get this Gift for Free</Button>

                        <p className="text-muted font-semibold mt-6">Courtesy of {user.username} & Giftbridge</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GiftDetailDialog

