"use client"

import { Button } from "@/components/ui/button";

function AddGiftToContext({ gift }) {


    return (
        <>
            <Button onClick={setClientGifts(gift)}>Select This Gift</Button>
        </>
    )
}

export default AddGiftToContext

