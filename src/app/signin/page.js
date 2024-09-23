"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ClientContext } from '@/app/client-provider'
import hfLogo from '/public/hf-logo.svg'
import hfDecorator from '/public/hf-decorator.svg'
import { StrapiImage } from '@/components/StrapiImage'
import Image from 'next/image'

function SignInPage() {
    const router = useRouter();
    const { setUser, setUserTheme } = useContext(ClientContext);

    const formSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password is required" })
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data) => {

        try {
            const res = await (fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            }));

            const result = await res.json();

            if (res.ok) {

                if (result.user) {
                    router.push(`user/${result.user.id}`);
                }
            } else {
                // Handle any errors (e.g., incorrect credentials)
                alert('Login failed: ' + result.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="bg-[#212e2e] w-full h-full min-h-svh relative flex justify-center items-center py-12 px-4">
            <div className="absolute top-[1rem] left-[2rem]">
                <Image src={hfLogo} alt="Logo" height={100} width={150} />
            </div>

            <div className="absolute top-[-2rem] right-[-3rem]">
                <Image src={hfDecorator} alt="" height={400} width={400} />
            </div>

            <div className="container relative">

                <Card className="w-full max-w-lg m-auto p-6 bg-[#f4f4f4] border-none ">
                    <CardHeader className="mb-4">
                        <CardTitle>Log in to start sending gifts.</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel htmlFor="email">Email Address</FormLabel>
                                                <FormControl>
                                                    <Input type="email" id="email" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-[#4a6d6d] focus:border-[#4a6d6d] focus-visible:ring-opacity-40 focus-visible:ring-4" />
                                                </FormControl>
                                            </FormItem>
                                            <FormMessage />
                                        </>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel htmlFor="password">Password</FormLabel>
                                                <FormControl>
                                                    <Input id="password" type="password" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-[#4a6d6d] focus:border-[#4a6d6d] focus-visible:ring-opacity-40 focus-visible:ring-4" />
                                                </FormControl>
                                            </FormItem>
                                            <FormMessage />
                                        </>
                                    )}
                                />
                                <Button type="submit" className="bg-[#ff2020] uppercase">Login</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}

export default SignInPage