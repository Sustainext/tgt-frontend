// app/api/auth/token/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { code, code_verifier } = await request.json();

        console.log('Token exchange parameters:', {
            hasCode: !!code,
            hasVerifier: !!code_verifier
        });

        const tokenParams = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: code,
            code_verifier: code_verifier,
            redirect_uri: `${process.env.AUTH0_BASE_URL}/callback`
        });

        console.log(tokenParams, ' is the tokenParams')

        const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: tokenParams.toString()
        });

        const data = await response.json();
        console.log(data)
        if (!response.ok) {
            console.error('Auth0 error:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'server_error', error_description: error.message },
            { status: 500 }
        );
    }
}