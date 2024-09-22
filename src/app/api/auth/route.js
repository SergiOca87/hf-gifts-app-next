import { NextRequest, NextResponse } from "next/server";
import cookie from 'cookie';

export async function POST(request) {

    const { email, password } = await request.json();

    try {
        const response = await fetch('https://infinite-stream-64309-36de2b4471ee.herokuapp.com/api/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: email,
                password: password
            })
        });
        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: 'Failed to sign in' }, { status: 401 });
        } else {

            const response = NextResponse.json({ user: data.user });

            response.cookies.set('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week expiry
                sameSite: 'strict',
                path: '/',
            });

            return response;
        }
    } catch (error) {
        console.log(error);
    }
}