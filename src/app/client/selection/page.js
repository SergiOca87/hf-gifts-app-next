'use client'
import { ClientContext } from "@/app/client-provider";
import { columns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";
import Gift from "@/components/Gift";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
export default function ClientContextGiftSelection() {

    const { isNumericCodeValid } = useContext(ClientContext);
    const { clientGifts } = useContext(ClientContext);

    console.log(clientGifts);

    return (
        <div className="w-100 h-100">
            <div className={`container mt-12`}>
                {isNumericCodeValid ? (
                    <>
                        {clientGifts.length ? (
                            <>
                                <h2 className="text-3xl text-white font-medium mb-12">Your Selected Gifts:</h2>
                                <div className="max-w-[1080px] grid w-100 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0">
                                    <DataTable columns={columns} data={clientGifts} />
                                    {/* {clientGifts.map((gift) => {
                                        return (
                                            <Gift key={gift.id} gift={gift.data} canBeRemoved={true} />
                                        )
                                    })} */}
                                </div>

                                <p className="mt-8 mb-5">Please click the confirm button to process your order:</p>
                                <Button>Confirm Order</Button>
                            </>
                        ) : (
                            <h2 className="text-3xl text-white font-medium mb-12">Please Select Some Gifts.</h2>
                        )}
                    </>
                ) : (
                    <h2 className="text-3xl text-white font-medium mb-12">Sorry, you cannot visit this page.</h2>
                )}
            </div>
        </div>
    )
}

