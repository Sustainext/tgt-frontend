// app/api/auth/validate-callback/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    try {
        // Get token
        const tokenRes = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                code,
                redirect_uri: `${process.env.AUTH0_BASE_URL}/callback`
            })
        });

        const tokens = await tokenRes.json();

        if (!tokenRes.ok || !tokens.access_token) {
            return NextResponse.json({ error: 'Token validation failed' }, { status: 401 });
        }

        // Get user info
        const userInfoRes = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`
            }
        });

        const userInfo = await userInfoRes.json();

        if (!userInfoRes.ok) {
            return NextResponse.json({ error: 'Failed to get user info' }, { status: 401 });
        }

        return NextResponse.json({
            user: userInfo,
            tokens: {
                access_token: tokens.access_token,
                id_token: tokens.id_token
            }
        });

    } catch (error) {
        console.error('Validation error:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}