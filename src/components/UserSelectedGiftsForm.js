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
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

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

            console.log(res);
            if (res.ok === true) {
                router.push(`user/${result.user.id}/success`);
                // toast("Your recipient will receive an e-mail with a link to your selection to choose from.");
            } else {
                toast("The form could not be submitted. Please try again.");
            }

        } catch (error) {
            toast("There was an error. Please try again.");
        }
    }

    return (
        <div className="max-w-[630px] mx-auto">
            {userGifts.length ? (
                <>
                    <div className="text-center">
                        <h1 className="text-3xl font-medium mb-3 tracking-tight">Who’s the gift for?</h1>
                        <p className="text-muted text-lg">Enter their contact details in the form below so they can choose their gift</p>

                        <Separator className="my-11 bg-border/30" />

                        <h2 className="mb-4 font-bold text-lg">Items they can choose from:</h2>
                        
                        <ul className="list-none flex justify-center">
                            {userGifts.map((gift) => (
                                <li key={gift.id}>
                                    <Badge variant="outline" className="text-sm mx-1 border-input/30">{gift.title}</Badge>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-80 mx-auto mt-20">    
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="space-y-1 mt-2">
                                                <FormLabel htmlFor="name">Their Name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" id="name" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-primary focus:border-primary focus-visible:ring-opacity-40 focus-visible:ring-1 rounded-lg" />
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
                                            <FormItem className="space-y-1 mt-2">
                                                <FormLabel htmlFor="email" className="text-black">Their email address</FormLabel>
                                                <FormControl>
                                                    <Input type="email" id="email" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-primary focus:border-primary focus-visible:ring-opacity-40 focus-visible:ring-1 rounded-lg" />
                                                </FormControl>
                                            </FormItem>
                                            <FormMessage />
                                        </>
                                    )}
                                />

                                <Button type="submit" className="bg-primary w-full mt-5">Send</Button>
                            </form>
                        </Form>
                    </div>

                </>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-medium mb-3 tracking-tight">No Gifts found</h1>
                    <p className="text-muted text-lg">Sorry we found no selected gifts. Please, try again.</p>
                </div>
            )}
        </div>
    )
}

export default UserSelectedGiftsForm