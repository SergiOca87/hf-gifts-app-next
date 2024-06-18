"use client"

import { Button } from "@/components/ui/button";
import { ClientContext } from '@/app/client-provider';
import { useContext } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function RemoveGiftFromContext({ gift }) {
    const { clientGifts, setClientGifts } = useContext(ClientContext);

    const removeGift = () => {
        setClientGifts(clientGifts.filter(clientGift => clientGift !== gift));

        console.log('gift removed?', gift, clientGifts);
    }

    return (

        <div className="absolute top-0 right-0 z-20 ">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button className="text-1xl" onClick={removeGift}>&times;</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Remove From Selection</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    )
}

export default RemoveGiftFromContext

