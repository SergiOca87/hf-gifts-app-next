
import { eventQuery, getData } from "@/lib/utils";
import { Separator } from "@/components/ui/separator"
import ThemeLayout from "@/components/ThemeLayout";

async function Landing({ params }) {
    const event = await getData(`/api/events/${params.id}`, eventQuery);
    const theme = event.data.attributes.theme.data.attributes;

    const themeSettings = {
        backgroundColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#212e2e]' : 'bg-[#748487]'}`,
        buttonColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#ff2020]' : 'bg-[#ffcd19]'}`,
        logoUrl: theme.logo.data.attributes.url,
        decoratorUrl: theme.decorator.data.attributes.url
    }

    return (
        <ThemeLayout themeSettings={themeSettings}>
            <div className={`w-100 min-h-[calc(100svh-20rem)] flex justify-center items-center`}>
                <div className="container mx-auto">
                    <div className="max-w-[40rem]">
                        <h1 className="text-white font-medium text-4xl mb-8">Hello {event.data.attributes.name}, <br />There’s a gift waiting for you, a little something we think you’ll love.</h1>
                        <Separator className="mt-4 mb-6 opacity-40" />
                        <p className="text-white mb-5">Enter your code to claim your gift:</p>
                    </div>
                </div>
            </div>
        </ThemeLayout>
    )
}

export default Landing