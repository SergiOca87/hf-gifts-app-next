
"use client"

import { eventQuery, getData } from "@/lib/utils";
import { Separator } from "@/components/ui/separator"
import ThemeLayout from "@/components/ThemeLayout";
import { StrapiImage } from "@/components/StrapiImage";
import EventQrCode from "@/components/EventQrCode";
import ReactDOM from 'react-dom';
import Tilt from 'react-parallax-tilt';
import styles from './styles.module.css'

async function Landing({ params }) {
    const event = await getData(`/api/events/${params.id}`, eventQuery);
    // const theme = event.data.attributes.theme.data.attributes;

    const themeSettings = {
        backgroundColor: 'bg-[#f9f4ed]',
        mainColor: event.data.attributes.event_qr_main_color_hex,
        secondaryColor: event.data.attributes.event_qr_secondary_color_hex,
        buttonColor: 'bg-[#ff2020]',
        // logoUrl: theme?.logo?.data?.attributes?.url,
        // decoratorUrl: theme?.decorator?.data?.attributes?.url
    }

    console.log(event);


    return (

        <ThemeLayout themeSettings={themeSettings}>
            <Tilt
                className="track-on-window"
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={800}
                transitionSpeed={1500}
                scale={1.05}
            // glareEnable={true} glareMaxOpacity={0.6} glareColor="#fff" glarePosition="all" glareBorderRadius="20px"
            >
                <div className={`${styles.inner_element} w-100 min-h-[calc(100svh-20rem)] flex justify-center items-center`}>
                    <div className="max-w-[50rem] w-full mx-auto rounded-xl bg-[#ede7dc] shadow-md overflow-hidden relative">
                        <div className="absolute w-full h-full bg-[url('/farmer.webp')] z-0 grayscale opacity-80"></div>
                        <div className="relative z-10">
                            <div className="bg-slate-900 p-2"></div>
                            <div className="px-8">
                                <div className="mx-auto ">
                                    <div class="py-8 flex justify-between align-center">
                                        <h1 className="text-slate-700 font-medium text-3xl mb-8 mt-4">Welcome to {event.data.attributes.title}</h1>
                                        <StrapiImage src={event?.data?.attributes?.full_logo?.data?.attributes?.url} width={200} height={50} />
                                    </div>
                                    <Separator className="mt-4 mb-6 opacity-40 bg-slate-300" />
                                    <div class="py-8 flex justify-between align-center mt-12 gap-8">
                                        <h2 className="text-slate-700 text-[1.2rem] mt-10 mb-12 max-w-[30rem]">{event.data.attributes.intro_text}</h2>
                                        <div >
                                            <EventQrCode url="https://google.com" mainColor={themeSettings.mainColor} secondaryColor={themeSettings.secondaryColor} logoUrl={event?.data?.attributes?.qr_logo?.data?.attributes?.url} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div class="p-12 relative">
                            <svg width="125%" height="300%" id="svg" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" class="absolute top-[-7rem] left-[-5rem]"><path d="M 0,500 L 0,262 C 167.7333333333333,220.53333333333333 335.4666666666666,179.06666666666666 476,194 C 616.5333333333334,208.93333333333334 729.8666666666668,280.26666666666665 886,276 C 1042.1333333333332,271.73333333333335 1241.0666666666666,191.86666666666667 1440,112 L 1440,500 L 0,500 Z" stroke="none" stroke-width="0" fill="#0f172a" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
                        </div> */}
                        </div>
                    </div>
                </div >
            </Tilt>

        </ThemeLayout >
    )
}

export default Landing