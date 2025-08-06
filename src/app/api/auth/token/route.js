// app/api/auth/token/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { code } = await request.json(); // remove code_verifier unless you use PKCE

        console.log('Token exchange parameters:', {
            hasCode: !!code
        });

        const tokenParams = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            code: code,
            redirect_uri: `${process.env.KEYCLOAK_BASE_URL}/callback`
        });

        console.log(tokenParams.toString(), ' is the tokenParams');

        const response = await fetch(`${process.env.KEYCLOAK_ISSUER_BASE_URL}/token`, {
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
            console.error('Keycloak error:', data);
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