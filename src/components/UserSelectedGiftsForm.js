'use client'
import { ClientContext } from '@/app/client-provider';
import React, { useContext, useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

function UserSelectedGiftsForm() {
    const { userGifts, user } = useContext(ClientContext);


    if (!userGifts.length) {
        redirect('/signin');
    }

    const formSchema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().email({ message: "Invalid email address" }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            giftIds: userGifts.map(gift => gift.id),
            user
        };

        try {
            const res = await fetch('/api/gift-selection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            console.log(res.ok);
            if (res.ok === true) {
                toast("Your recipient will receive an e-mail with a link to your selection to choose from.");
            } else {
                toast("The form could not be submitted. Please try again.");
            }

        } catch (error) {
            toast("The form could not be submitted. Please try again.");
        }
    }

    return (
        <div className="w-full h-full relative flex justify-center items-center py-12 px-4">
            <div className="px-8 py-12 bg-[#fcf8f2] z-20 relative rounded-lg w-full max-w-[700px]">
                {userGifts.length ? (
                    <>
                        <h1 className="text-2xl font-medium mb-12 text-black">Choose a recipient to send your gift selection so that they can choose from</h1>

                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[5rem]"></div>
                        <ul className="list-disc pl-4">
                            {userGifts.map((gift) => <li key={gift.id} className="text-black">{gift.title}</li>)}
                        </ul>
                    </>
                ) : (
                    <p>No gifts found</p>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel htmlFor="name" className="text-black">Recipient Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="name" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-[#4a6d6d] focus:border-[#4a6d6d] focus-visible:ring-opacity-40 focus-visible:ring-4 text-black max-w-md" />
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage />
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel htmlFor="email" className="text-black">Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" id="email" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-[#4a6d6d] focus:border-[#4a6d6d] focus-visible:ring-opacity-40 focus-visible:ring-4 text-black max-w-md" />
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage />
                                </>
                            )}
                        />

                        <Button type="submit" className="bg-[#ff2020] uppercase">Send</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default UserSelectedGiftsForm