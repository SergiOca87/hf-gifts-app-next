'use client'

import { useContext } from "react";
import { ClientContext } from '@/app/client-provider';
import { CustomForm } from '@/components/CustomForm';

function Checkout() {
    const { clientGifts } = useContext(ClientContext);

    console.log(clientGifts);

    return (
        clientGifts !== null ? (
            <div className="container" >
                <div className="p-8 bg-[#fcf8f2] z-20 relative">
                    <div>
                        <p className="text-2xl font-medium mb-12 text-black">Please provide the following information to receive:</p>

                        <div className="bg-white px-8 py-5">
                            <p className="text-black">1&times; - {clientGifts.data.attributes.title}</p>
                        </div>

                        <div className="mt-10">
                            <CustomForm />
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <h2 className="text-3xl text-white font-medium mb-12">Please Select Some Gifts First.</h2>
        )
    )
}

export default Checkout