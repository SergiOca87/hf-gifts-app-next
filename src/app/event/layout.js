import ThemeLayout from "@/components/ThemeLayout";

const themeSettings = {
    // backgroundColor: 'bg-[#f9f4ed]',
    backgroundColor: 'bg-[#f9f4ed]',
    // mainColor: event.data.attributes.event_qr_main_color_hex,
    // secondaryColor: event.data.attributes.event_qr_secondary_color_hex,
    buttonColor: 'bg-[#ff2020]',

    // buttonColor: 'bg-[#ff2020]',
    // logoUrl: theme?.logo?.data?.attributes?.url,
    // decoratorUrl: theme?.decorator?.data?.attributes?.url
}

export default function Template({ children }) {
    return (
        <ThemeLayout themeSettings={themeSettings}>
            <div className="py-8">
                {children}
            </div>
        </ThemeLayout>
    )
}