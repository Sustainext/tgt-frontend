// app/api/auth/[...auth0]/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { pathname, searchParams } = new URL(request.url);

    // Login
    if (pathname.endsWith('/login')) {
        // First check if coming from logout
        const fromLogout = searchParams.get('from_logout');
        
        if (!fromLogout) {
            // First step: Redirect to logout with a special return URL
            return NextResponse.redirect(
                `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` +
                `client_id=${process.env.AUTH0_CLIENT_ID}&` +
                `returnTo=${encodeURIComponent(`${process.env.AUTH0_BASE_URL}/api/auth/login?from_logout=true`)}`
            );
        }

        // Second step: Coming from logout, now do the actual login
        const authUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?` +
            `client_id=${process.env.AUTH0_CLIENT_ID}&` +
            `redirect_uri=${encodeURIComponent(`${process.env.AUTH0_BASE_URL}/callback`)}&` +
            `scope=openid profile email&` +
            `response_type=code&` +
            `prompt=login&` +  // Forces re-authentication
            `max_age=0`;       // Forces re-authentication by invalidating SSO session

        return NextResponse.redirect(authUrl);
    }

    // Callback
    if (pathname.includes('/callback')) {
        const code = searchParams.get('code');
        
        try {
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
                    redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`
                })
            });

            if (!tokenRes.ok) {
                return NextResponse.redirect(new URL('/', request.url));
            }

            const data = await tokenRes.json();
            if (!data.access_token) {
                return NextResponse.redirect(new URL('/', request.url));
            }

            return NextResponse.redirect(new URL('/', request.url));

        } catch (error) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Logout
    if (pathname.endsWith('/logout')) {
        return NextResponse.redirect(
            `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` +
            `client_id=${process.env.AUTH0_CLIENT_ID}&` +
            `returnTo=${encodeURIComponent(`${process.env.AUTH0_BASE_URL}/`)}`
        );
    }

    // Default response
    return NextResponse.redirect(new URL('/', request.url));
}

export const POST = GET;