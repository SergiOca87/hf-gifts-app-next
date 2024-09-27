"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from 'sonner';
import { use, useEffect, useState } from 'react'
import { getData, giftsQuery, userQuery } from '@/lib/utils'
import { StrapiImage } from '@/components/StrapiImage'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

function RecipientCheckout({ params }) {
    const [selectedGift, setSelectedGift] = useState({});
    const [user, setUser] = useState({});
    const [userTheme, setUserTheme] = useState({});

    useEffect(() => {
        const fetchGift = async () => {
            const gift = await getData(`/api/gifts/${params.recipientGiftId}`, giftsQuery);

            setSelectedGift(gift.data);
        }

        fetchGift();

        const fetchUser = async () => {
            console.log('fetching user...');
            const userData = await getData(`/api/users/${params.id}`, userQuery);

            setUser(userData);
        }

        fetchUser();
    }, [params.id, params.recipientGiftId]);

    useEffect(() => {

        if (user) {
            setUserTheme({
                backgroundColor: user?.hex_bg_code,
                color: user?.hex_text_code,
                logo: user?.user_logo?.url
            })
        }

    }, [user]);

    // const userTheme = {
    //     backgroundColor: user?.hex_bg_code,
    //     color: user?.hex_text_code,
    //     logo: user?.user_logo.url
    // }



    const formSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        address: z.string().min(1, "Street address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        zip: z.string().min(1, "ZIP code is required"),
        message: z.string().optional(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data) => {

        const formData = {
            ...data,
            selectedGift,
            user
        };

        try {
            const res = await fetch('/api/recipient-selection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                // setFormData({
                //     name: '',
                //     email: '',
                //     street: '',
                //     city: '',
                //     state: '',
                //     zip: '',
                //     details: '',
                // });

                toast("Your form has been successfully sent. We'll be in touch shortly.");
            } else {
                toast("The form could not be submitted. Please try again.")
            }

        } catch (error) {
            toast("The form could not be submitted. Please try again.")
        }
    }

    const onError = (errors) => {
        console.log(errors);
    }

    return (
        <div style={{ backgroundColor: userTheme.backgroundColor, color: userTheme.color }} className="py-5 min-h-screen h-full">

            <div className="container">
                <StrapiImage className="mb-16" src={userTheme.logo} width={200} height={50} />
                <div className="w-full h-full relative flex justify-center items-center py-12 px-4">
                    <div className="px-8 py-12 bg-[#fcf8f2] z-20 relative rounded-lg w-full max-w-[700px]">
                        <p className="text-2xl font-medium mb-12 text-black">Please provide the following information to receive:</p>
                        <p className="text-black font-medium">1&times; - {selectedGift?.attributes?.title}</p>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8 mt-12 text-black">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel className="text-black" htmlFor="name">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" id="name" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-[#4a6d6d] focus:border-[#4a6d6d] focus-visible:ring-opacity-40 focus-visible:ring-4" />
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
                                                <FormLabel className="text-black" htmlFor="email">Email Address</FormLabel>
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
                                    name="address"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel className="text-black" htmlFor="address">Street Address</FormLabel>
                                                <FormControl>
                                                    <Input type="text" id="address" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-[#4a6d6d] focus:border-[#4a6d6d] focus-visible:ring-opacity-40 focus-visible:ring-4" />
                                                </FormControl>
                                            </FormItem>
                                            <FormMessage />
                                        </>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel className="text-black" htmlFor="city">City</FormLabel>
                                                <FormControl>
                                                    <Input type="text" id="city" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-[#4a6d6d] focus:border-[#4a6d6d] focus-visible:ring-opacity-40 focus-visible:ring-4" />
                                                </FormControl>
                                            </FormItem>
                                            <FormMessage />
                                        </>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-black" htmlFor="state">State / Territory</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}  // Update form state manually
                                                    defaultValue={field.value}      // Sync the default value with the form state
                                                    className="w-full text-black"
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select State" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="placeholder" disabled>- Select -</SelectItem>
                                                        <SelectItem value="AL">AL - Alabama</SelectItem>
                                                        <SelectItem value="AK">AK - Alaska</SelectItem>
                                                        <SelectItem value="AS">AS - American Samoa</SelectItem>
                                                        <SelectItem value="AZ">AZ - Arizona</SelectItem>
                                                        <SelectItem value="AR">AR - Arkansas</SelectItem>
                                                        <SelectItem value="CA">CA - California</SelectItem>
                                                        <SelectItem value="CO">CO - Colorado</SelectItem>
                                                        <SelectItem value="CT">CT - Connecticut</SelectItem>
                                                        <SelectItem value="DE">DE - Delaware</SelectItem>
                                                        <SelectItem value="DC">DC - District of Columbia</SelectItem>
                                                        <SelectItem value="FL">FL - Florida</SelectItem>
                                                        <SelectItem value="GA">GA - Georgia</SelectItem>
                                                        <SelectItem value="GU">GU - Guam</SelectItem>
                                                        <SelectItem value="HI">HI - Hawaii</SelectItem>
                                                        <SelectItem value="ID">ID - Idaho</SelectItem>
                                                        <SelectItem value="IL">IL - Illinois</SelectItem>
                                                        <SelectItem value="IN">IN - Indiana</SelectItem>
                                                        <SelectItem value="IA">IA - Iowa</SelectItem>
                                                        <SelectItem value="KS">KS - Kansas</SelectItem>
                                                        <SelectItem value="KY">KY - Kentucky</SelectItem>
                                                        <SelectItem value="LA">LA - Louisiana</SelectItem>
                                                        <SelectItem value="ME">ME - Maine</SelectItem>
                                                        <SelectItem value="MD">MD - Maryland</SelectItem>
                                                        <SelectItem value="MA">MA - Massachusetts</SelectItem>
                                                        <SelectItem value="MI">MI - Michigan</SelectItem>
                                                        <SelectItem value="MN">MN - Minnesota</SelectItem>
                                                        <SelectItem value="MS">MS - Mississippi</SelectItem>
                                                        <SelectItem value="MO">MO - Missouri</SelectItem>
                                                        <SelectItem value="MT">MT - Montana</SelectItem>
                                                        <SelectItem value="NE">NE - Nebraska</SelectItem>
                                                        <SelectItem value="NV">NV - Nevada</SelectItem>
                                                        <SelectItem value="NH">NH - New Hampshire</SelectItem>
                                                        <SelectItem value="NJ">NJ - New Jersey</SelectItem>
                                                        <SelectItem value="NM">NM - New Mexico</SelectItem>
                                                        <SelectItem value="NY">NY - New York</SelectItem>
                                                        <SelectItem value="NC">NC - North Carolina</SelectItem>
                                                        <SelectItem value="ND">ND - North Dakota</SelectItem>
                                                        <SelectItem value="MP">MP - Northern Mariana Islands</SelectItem>
                                                        <SelectItem value="OH">OH - Ohio</SelectItem>
                                                        <SelectItem value="OK">OK - Oklahoma</SelectItem>
                                                        <SelectItem value="OR">OR - Oregon</SelectItem>
                                                        <SelectItem value="PA">PA - Pennsylvania</SelectItem>
                                                        <SelectItem value="PR">PR - Puerto Rico</SelectItem>
                                                        <SelectItem value="RI">RI - Rhode Island</SelectItem>
                                                        <SelectItem value="SC">SC - South Carolina</SelectItem>
                                                        <SelectItem value="SD">SD - South Dakota</SelectItem>
                                                        <SelectItem value="TN">TN - Tennessee</SelectItem>
                                                        <SelectItem value="TX">TX - Texas</SelectItem>
                                                        <SelectItem value="UM">UM - United States Minor Outlying Islands</SelectItem>
                                                        <SelectItem value="UT">UT - Utah</SelectItem>
                                                        <SelectItem value="VT">VT - Vermont</SelectItem>
                                                        <SelectItem value="VI">VI - Virgin Islands</SelectItem>
                                                        <SelectItem value="VA">VA - Virginia</SelectItem>
                                                        <SelectItem value="WA">WA - Washington</SelectItem>
                                                        <SelectItem value="WV">WV - West Virginia</SelectItem>
                                                        <SelectItem value="WI">WI - Wisconsin</SelectItem>
                                                        <SelectItem value="WY">WY - Wyoming</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="zip"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel className="text-black" htmlFor="zip">Zip Code</FormLabel>
                                                <FormControl>
                                                    <Input type="text" id="zip" {...field} className="focus-visible:ring-offset-0 focus-visible:ring-[#4a6d6d] focus:border-[#4a6d6d] focus-visible:ring-opacity-40 focus-visible:ring-4" />
                                                </FormControl>
                                            </FormItem>
                                            <FormMessage />
                                        </>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <>
                                            <FormItem>
                                                <FormLabel className="text-black" htmlFor="message">Additional Details</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        id="message"
                                                        {...field}
                                                        className="focus-visible:ring-offset-0 focus-visible:ring-[#4a6d6d] focus:border-[#4a6d6d] focus-visible:ring-opacity-40 focus-visible:ring-4 w-full"
                                                    />
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
            </div>
        </div>
    )
}

export default RecipientCheckout