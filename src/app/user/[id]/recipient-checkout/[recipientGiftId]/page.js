"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from 'sonner';
import { useEffect, useState } from 'react'
import { getData, giftsQuery, userQuery } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import UserThemeLayout from '@/components/UserThemeLayout'
import { Separator } from '@/components/ui/separator'
import { StrapiImage } from '@/components/StrapiImage'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

function RecipientCheckout({ params }) {
    const [selectedGift, setSelectedGift] = useState({});
    const [user, setUser] = useState({});
    const [userTheme, setUserTheme] = useState({});

    useEffect(() => {
        const fetchGift = async () => {
            const gift = await getData(`/api/gifts/${params.recipientGiftId}`, giftsQuery);

            console.log('gift',gift.data);
            setSelectedGift(gift.data);
        }

        fetchGift();

        const fetchUser = async () => {
            const userData = await getData(`/api/users/${params.id}`, userQuery);

            setUser(userData);
        }

        fetchUser();
    }, [params.id, params.recipientGiftId]);

    useEffect(() => {
        if (user) {
            setUserTheme({
                backgroundColor: user?.hex_bg_code,
                color: user?.hex_text_code
            })
        }
    }, [user]);

    const formSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        address: z.string().min(1, "Street address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        zip: z.string().min(1, "ZIP code is required"),
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

    const steps = [
        'Choose Gift',
        'Shipping',
        'Success'
    ];

    return (
        user && (
            <UserThemeLayout themeSettings={userTheme} steps={steps} currentStep="2">
                <div className="max-w-2xl mx-auto">
                    {selectedGift && (
                        <>
                            <div className="flex justify-center items-start space-x-4 text-lg mb-14">
                                {selectedGift?.attributes?.featured_image && (
                                    <StrapiImage src={selectedGift?.attributes?.featured_image?.data?.attributes?.url} alt="" height={64} width={70} className="object-cover rounded-lg" />
                                )}
                                <div className="space-y-1">
                                    <p className="font-semibold">{selectedGift?.attributes?.title}</p>
                                    <p className="">&times;1</p>
                                </div>
                            </div>
                            
                            <h1 className="text-3xl font-medium mb-3 tracking-tight text-center">Great Choice, Where should we send it?</h1>

                            <Separator className="my-11 bg-border/30" />

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                                    <p className="font-semibold tracking-tight">Name</p>

                                    <div className="flex -mx-3 mb-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="basis-1/2 px-3 space-y-1 mt-2">
                                                    <FormLabel className="text-neutral-600" htmlFor="name">Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" id="name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="basis-1/2 px-3 space-y-1 mt-2">
                                                    <FormLabel className="text-neutral-600" htmlFor="email">Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" id="email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <p className="font-semibold tracking-tight">Address</p>

                                    <div className="flex -mx-3 flex-wrap mb-6">    
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem className="basis-1/2 px-3 space-y-1 mt-2">
                                                    <FormLabel className="text-neutral-600" htmlFor="address">Street Address</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" id="address" {...field}  />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem className="basis-1/2 px-3 space-y-1 mt-2">
                                                    <FormLabel className="text-neutral-600" htmlFor="city">City</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" id="city" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem className="basis-1/2 px-3 space-y-1 mt-2">
                                                    <FormLabel className="text-neutral-600" htmlFor="state">State / Territory</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}  // Update form state manually
                                                            defaultValue={field.value}      // Sync the default value with the form state
                                                            className="focus-visible:ring-offset-0 focus-visible:ring-primary focus:border-primary focus-visible:ring-opacity-40 focus-visible:ring-1 rounded-lg"
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
                                                <FormItem className="basis-1/2 px-3 space-y-1 mt-2">
                                                    <FormLabel className="text-neutral-600" htmlFor="zip">Zip Code</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" id="zip" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        
                                        <div className="basis-1/2 ml-auto mt-6 px-3">
                                            <Button className="w-full" type="submit">Send</Button>
                                        </div>
                                    </div>

                                </form>
                            </Form>
                        </>
                    )}
                </div>
                
                <div className="fixed left-7 bottom-8 z-10 flex align-middle">
                    <ChevronLeft />
                    <Link className="underline" href={`/user/${user.id}/selection`}>Previous Step</Link>
                </div>
            </UserThemeLayout>
        )
    )
}

export default RecipientCheckout