import { StrapiImage } from "./StrapiImage";

const UserThemeLayout = ({ children, themeSettings }) => {

    return (
        themeSettings && (

            <div style={{ backgroundColor: themeSettings.backgroundColor }} className="py-5 min-h-screen h-full">

                {themeSettings.logo && (
                    <div className="container">
                        <StrapiImage className="mb-16" src={`${themeSettings.logo}`} alt="Logo" width={200} height={50} />
                    </div>
                )}
                {/* {themeSettings.decoratorUrl && (
                        <div className="absolute top-[-2rem] right-[-3rem]">
                            <StrapiImage src={`${themeSettings.decoratorUrl}`} alt="" height={400} width={400} />
                        </div>
                    )} */}
                <div className="container relative">
                    {children}
                </div>

            </div>
        )
    );
};

export default UserThemeLayout;
