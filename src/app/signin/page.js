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

function SignInPage() {
    const router = useRouter();
    const { setClient, setClientTheme } = useContext(ClientContext);

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

                setClient(result.user);
                setClientTheme({
                    backgroundColor: result.user.hex_bg_code,
                    textColor: result.user.hex_text_code,
                    logo: result.user.logo,
                });

                router.push(`user/${result.user.id}`);
            } else {
                // Handle any errors (e.g., incorrect credentials)
                alert('Login failed: ' + result.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login</CardTitle>
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
                                            <Input type="email" id="email" {...field} />
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
                                            <Input id="password" type="password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage />
                                </>
                            )}
                        />
                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignInPage