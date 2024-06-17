import { Button } from "@/components/ui/button";
import CustomOtp from "@/components/CustomOtp";
import { clientQuery, getData } from "@/lib/utils";
import { Separator } from "@/components/ui/separator"

export async function generateStaticParams() {
    const clientsData = await getData('http://127.0.0.1:1337/api/clients');

    return clientsData.data.map((client) => {
        return {
            params: {
                id: client.id.toString()
            }
        }
    });
}

async function Landing({ params }) {
    const client = await getData(`/api/clients/${params.id}`, clientQuery);
    const theme = client.data.attributes.theme.data.attributes;
    const otpValue = client.data.attributes.numeric_code;
    // const [visibleOverlay, setVisibleOverlay] = useState(true);
    // const [validOtp, setValidOtp] = useState(false);
    // const [otpValue, setOtpValue] = useState("");

    //TODO: Extract this to a Layout component
    const themeSettings = {
        backgroundColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#212e2e]' : 'bg-[#748487]'}`,
        buttonColor: `${theme.Title === 'Hudson Fusion' ? 'bg-[#ff2020]' : 'bg-[#ffcd19]'}`,
        logoUrl: theme.logo.data.attributes.url,
        decoratorUrl: theme.decorator.data.attributes.url
    }

    return (
        <div className={`w-100 h-[calc(100svh-20rem)] flex justify-center items-center ${themeSettings.backgroundColor}`}>
            <div className="container mx-auto">
                <div className="max-w-[40rem]">
                    <h1 className="text-white font-medium text-4xl mb-8">Hello {client.data.attributes.name}, <br />There’s a gift waiting for you, a little something we think you’ll love.</h1>
                    <Separator className="mt-4 mb-6 opacity-40" />
                    <p className="text-white mb-5">Enter your code to claim your gift:</p>
                    <CustomOtp clientNumericCode={otpValue} themeSettings={themeSettings} clientId={params.id} />
                </div>
            </div>
        </div >

    )
}

export default Landing