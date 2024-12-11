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

                {/* <Link href={`/user/gift/${user.id}/${gift.id}`}>
                    <Button>More Details</Button>
                </Link> */}
                <div className='flex items-center gap-2'>
                    <GiftDetailDialog gift={gift} user={user} />

                    {/*<Button variant="secondary" className={`basis-1/2 justify-between hover:bg-blue/10 ${userGifts.includes(gift) ? "bg-blue/10" : "" }`} onClick={() => addOrRemoveGiftFromSelection(gift)}>
                        {!userGifts.includes(gift) ? 'Include Gift' : 'Included'}
                        <div className={`w-6 h-6 rounded ${userGifts.includes(gift) ? "bg-primary text-white" : "border border-slate-400" }`}>
                            {userGifts.includes(gift) && <Check />}
                        </div>
                    </Button>*/}
                </div>

            </CardContent>
        </Card >
    )
}

export default SelectionGift

