'use client'

import { useEffect, useContext, useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ClientContext } from '@/app/client-provider'; // Ensure this path is correct
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function CustomOtp({ clientId, clientNumericCode, themeSettings }) {
    const { isNumericCodeValid, setIsNumericCodeValid } = useContext(ClientContext);
    const [otpValue, setOtpValue] = useState("");

    useEffect(() => {
        console.log(otpValue, clientNumericCode);
        if (otpValue.length === 6) {
            otpValue === clientNumericCode ? setIsNumericCodeValid(true) : setIsNumericCodeValid(false);
        }
    }, [otpValue, setIsNumericCodeValid, clientNumericCode]);

    return (
        <>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={otpValue} onChange={(otpValue) => setOtpValue(otpValue)}>
                <InputOTPGroup className="text-white">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            {otpValue.length === 6 && !isNumericCodeValid && (
                <p className="text-white mt-5">Invalid code, please try again.</p>
            )}
            <Button
                disabled={!isNumericCodeValid}
                className={`mt-7 ${themeSettings.buttonColor}`}
            >
                <Link href={`/client/gifts/${clientId}`}>
                    Get My Gift
                </Link>
            </Button>
        </>
    );
}

export default CustomOtp;
