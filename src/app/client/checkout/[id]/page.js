'use client'

import { useContext, useEffect, useState } from "react";
import { ClientContext } from '@/app/client-provider';
import { clientQuery, getData } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import ThemeLayout from "@/components/ThemeLayout";

function Checkout({ params }) {
    const [themeSettings, setThemeSettings] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const { clientGifts } = useContext(ClientContext);

    useEffect(() => {
        async function fetchData() {
            const clientData = await getData(`/api/clients/${params.id}`, clientQuery);
            const theme = clientData.data.attributes.theme.data.attributes;

            const themeSettings = {
                backgroundColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#212e2e]' : 'bg-[#748487]'}`,
                buttonColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#ff2020]' : 'bg-[#ffcd19]'}`,
                logoUrl: theme.logo.data.attributes.url,
                decoratorUrl: theme.decorator.data.attributes.url
            }

            setThemeSettings(themeSettings);
        }
        fetchData();
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        gift: clientGifts,
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        details: '',
    });

    const { toast } = useToast()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('sending...', formData);
            const res = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setFormData({
                    name: '',
                    email: '',
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    details: '',
                });

                toast({
                    title: "Form Sent",
                    description: "Your form has been successfully sent. We'll be in touch shortly.",
                });
            } else {
                toast({
                    title: "Submission Failed",
                    description: "The form could not be submitted. Please try again.",
                })
            }

        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "The form could not be submitted. Please try again.",
            })
        }
    }

    return (

        <ThemeLayout themeSettings={themeSettings}>
            <div className="container">
                {clientGifts !== null ? (
                    <div className="p-8 pb-20 bg-[#fcf8f2] z-20 relative">
                        <div>
                            <p className="text-2xl font-medium mb-12 text-black">Please provide the following information to receive:</p>

                            <div className="bg-white px-8 py-5 mb-3 mx-auto max-w-[700px]">
                                <p className="text-black font-medium">1&times; - {clientGifts.data.attributes.title}</p>
                            </div>
                            <div className="mt-7 p-8 bg-white mx-auto max-w-[700px]">

                                <form onSubmit={handleSubmit}>
                                    <div class="mt-8 max-w-md mx-auto">
                                        <div class="grid grid-cols-1 gap-6">
                                            <label class="block">
                                                <span class="text-gray-700">Full name</span>
                                                <input onChange={handleChange} name="name" value={formData.name} required type="text" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black" placeholder="" />
                                            </label>
                                            <label class="block">
                                                <span class="text-gray-700">Email address</span>
                                                <input onChange={handleChange} name="email" value={formData.email} required type="email" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black" placeholder="" />
                                            </label>
                                            <label class="block">
                                                <span class="text-gray-700">Street address</span>
                                                <input onChange={handleChange} name="street" value={formData.street} required type="text" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black" />
                                            </label>
                                            <label class="block">
                                                <span class="text-gray-700">City</span>
                                                <input onChange={handleChange} name="city" value={formData.city} required type="text" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black" />
                                            </label>
                                            <label class="block">
                                                <span class="text-gray-700">State / Territory</span>
                                                <select onChange={handleChange} name="state" value={formData.state} required class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black">
                                                    <option value="">- Select -</option>
                                                    <option value="AL">AL - Alabama</option>
                                                    <option value="AK">AK - Alaska</option>
                                                    <option value="AS">AS - American Samoa</option>
                                                    <option value="AZ">AZ - Arizona</option>
                                                    <option value="AR">AR - Arkansas</option>
                                                    <option value="CA">CA - California</option>
                                                    <option value="CO">CO - Colorado</option>
                                                    <option value="CT">CT - Connecticut</option>
                                                    <option value="DE">DE - Delaware</option>
                                                    <option value="DC">DC - District of Columbia</option>
                                                    <option value="FL">FL - Florida</option>
                                                    <option value="GA">GA - Georgia</option>
                                                    <option value="GU">GU - Guam</option>
                                                    <option value="HI">HI - Hawaii</option>
                                                    <option value="ID">ID - Idaho</option>
                                                    <option value="IL">IL - Illinois</option>
                                                    <option value="IN">IN - Indiana</option>
                                                    <option value="IA">IA - Iowa</option>
                                                    <option value="KS">KS - Kansas</option>
                                                    <option value="KY">KY - Kentucky</option>
                                                    <option value="LA">LA - Louisiana</option>
                                                    <option value="ME">ME - Maine</option>
                                                    <option value="MD">MD - Maryland</option>
                                                    <option value="MA">MA - Massachusetts</option>
                                                    <option value="MI">MI - Michigan</option>
                                                    <option value="MN">MN - Minnesota</option>
                                                    <option value="MS">MS - Mississippi</option>
                                                    <option value="MO">MO - Missouri</option>
                                                    <option value="MT">MT - Montana</option>
                                                    <option value="NE">NE - Nebraska</option>
                                                    <option value="NV">NV - Nevada</option>
                                                    <option value="NH">NH - New Hampshire</option>
                                                    <option value="NJ">NJ - New Jersey</option>
                                                    <option value="NM">NM - New Mexico</option>
                                                    <option value="NY">NY - New York</option>
                                                    <option value="NC">NC - North Carolina</option>
                                                    <option value="ND">ND - North Dakota</option>
                                                    <option value="MP">MP - Northern Mariana Islands</option>
                                                    <option value="OH">OH - Ohio</option>
                                                    <option value="OK">OK - Oklahoma</option>
                                                    <option value="OR">OR - Oregon</option>
                                                    <option value="PA">PA - Pennsylvania</option>
                                                    <option value="PR">PR - Puerto Rico</option>
                                                    <option value="RI">RI - Rhode Island</option>
                                                    <option value="SC">SC - South Carolina</option>
                                                    <option value="SD">SD - South Dakota</option>
                                                    <option value="TN">TN - Tennessee</option>
                                                    <option value="TX">TX - Texas</option>
                                                    <option value="UM">UM - United States Minor Outlying Islands</option>
                                                    <option value="UT">UT - Utah</option>
                                                    <option value="VT">VT - Vermont</option>
                                                    <option value="VI">VI - Virgin Islands</option>
                                                    <option value="VA">VA - Virginia</option>
                                                    <option value="WA">WA - Washington</option>
                                                    <option value="WV">WV - West Virginia</option>
                                                    <option value="WI">WI - Wisconsin</option>
                                                    <option value="WY">WY - Wyoming</option>
                                                </select>
                                            </label>
                                            <label class="block">
                                                <span class="text-gray-700">ZIP code</span>
                                                <input onChange={handleChange} name="zip" value={formData.zip} required type="text" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black" />
                                            </label>
                                            <label class="block">
                                                <span class="text-gray-700">Additional details</span>
                                                <textarea onChange={handleChange} name="details" value={formData.details} class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black" rows="2"></textarea>
                                            </label>
                                            <div className="mx-auto mt-2">
                                                <Button type="submit" className="px-10">Send</Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (<h2 className="text-3xl text-white font-medium mb-12">Sorry, you cannot visit this page.</h2>)}
            </div>
        </ThemeLayout>

    )
}

export default Checkout

