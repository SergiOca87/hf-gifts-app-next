import { StrapiImage } from "./StrapiImage";

const ThemeLayout = ({ children, themeSettings }) => {

    return (
        themeSettings && (
            <>
                <div className={`${themeSettings.backgroundColor} w-full h-full min-h-svh py-20`}>
                    {themeSettings.logoUrl && (
                        <div className="absolute top-[1rem] left-[2rem]">
                            <StrapiImage src={`${themeSettings.logoUrl}`} alt="Logo" height={100} width={150} />
                        </div>
                    )}
                    {themeSettings.decoratorUrl && (
                        <div className="absolute top-[-2rem] right-[-3rem]">
                            <StrapiImage src={`${themeSettings.decoratorUrl}`} alt="" height={400} width={400} />
                        </div>
                    )}
                    <div className="container mt-12 relative">
                        {children}
                    </div>
                </div>
            </>
        )
    );
};

export default ThemeLayout;
