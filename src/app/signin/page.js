"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password is required" })
});

const onSubmit = () => {
    console.log("submitted");
};

function SignInPage() {

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

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