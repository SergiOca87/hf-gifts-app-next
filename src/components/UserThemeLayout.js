import Image from "next/image";
import Steps from "./Steps";
import UserBadge from "./UserBadge";
import Logo from '/public/giftbridge_logo.svg'

const UserThemeLayout = ({
    children,
    themeSettings,
    steps,
    currentStep
}) => {

    return (
        themeSettings && (

            <div style={{ 
                backgroundColor: themeSettings.backgroundColor,
                color: themeSettings.color,
            }} className="min-h-screen h-full">
                <UserBadge username={themeSettings.username} logo={themeSettings.logo} />

                <div className="container relative">
                    {steps && (
                        <div className="py-14 mb-24">
                            <Steps steps={steps} current={currentStep} />
                        </div>
                    )}

                    {children}
                </div>

                <div className='fixed bottom-0 left-0 w-full bg-white px-7 h-24 flex justify-center z-0 align-middle shadow-[0_-4px_4px_0_rgba(0,0,0,0.05)]'>
                    <Image src={Logo} alt="Giftbridge" width={173} height={45} />
                </div>
            </div>
        )
    );
};

export default UserThemeLayout;
