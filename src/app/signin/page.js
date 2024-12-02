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
import Logo from '/public/giftbridge_logo.svg'
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

                    localStorage.setItem('userTheme', JSON.stringify({
                        backgroundColor: result.user.hex_bg_code,
                        color: result.user.hex_text_code,
                    }));

                    setUser(result.user);
                    setUserTheme({
                        backgroundColor: result.user.hex_bg_code,
                        color: result.user.hex_text_code,
                    });
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

        <div className="w-full h-full min-h-svh relative flex justify-center items-center py-12 px-4">
            <div className="absolute top-[10vh]">
                <Image src={Logo} alt="Giftbridge" width={173} height={45} />
            </div>

            <div className="container relative">

                <Card className="w-full max-w-80 m-auto border-none shadow-none">
                    <CardHeader className="text-center pt-0">
                        <CardTitle className="text-xl font-medium">Log in to Send your Gifts</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel htmlFor="email">Your email address</FormLabel>
                                                <FormControl>
                                                    <Input type="email" id="email" {...field} className="focus-visible:ring-offset-0 focus:border-[#0051FF] focus-visible:ring-0" />
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
                                                    <Input id="password" type="password" {...field} className="focus-visible:ring-offset-0 focus:border-[#0051FF] focus-visible:ring-0" />
                                                </FormControl>
                                            </FormItem>
                                            <FormMessage />
                                        </>
                                    )}
                                />
                                <div>
                                    <Button type="submit" className="bg-[#1B63FF] w-full mt-4">Login</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}

export default SignInPage