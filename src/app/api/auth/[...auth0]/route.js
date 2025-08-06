// app/api/auth/[...keycloak]/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { pathname, searchParams } = new URL(request.url);

    // Login
    if (pathname.endsWith('/login')) {
        // First check if coming from logout
        const fromLogout = searchParams.get('from_logout');
        
        if (!fromLogout) {
            // Step 1: Redirect to logout first with post_logout_redirect_uri returning to this login step
            // After logout, Keycloak will redirect back to /api/auth/login?from_logout=true
            return NextResponse.redirect(
                `${process.env.KEYCLOAK_ISSUER_BASE_URL}/logout?` +
                `client_id=${process.env.KEYCLOAK_CLIENT_ID}&` +
                `post_logout_redirect_uri=${encodeURIComponent(`${process.env.KEYCLOAK_BASE_URL}/api/auth/login?from_logout=true`)}`
            );
        }

        // Step 2: Coming from logout, redirect to Keycloak /auth endpoint for login
        const authUrl = `${process.env.KEYCLOAK_ISSUER_BASE_URL}/auth?` +
            `client_id=${process.env.KEYCLOAK_CLIENT_ID}&` +
            `redirect_uri=${encodeURIComponent(`${process.env.KEYCLOAK_BASE_URL}/api/auth/callback`)}&` +
            `scope=openid profile email&` +
            `response_type=code&` +
            `prompt=login&` +   // Forces re-authentication
            `max_age=0`;        // Forces re-authentication by invalidating SSO session

        return NextResponse.redirect(authUrl);
    }

    // Callback
    if (pathname.includes('/callback')) {
        const code = searchParams.get('code');
        
        try {
            // Exchange code for token at Keycloak token endpoint (note: `application/x-www-form-urlencoded`!)
            const params = new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: process.env.KEYCLOAK_CLIENT_ID,
                client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
                code,
                redirect_uri: `${process.env.KEYCLOAK_BASE_URL}/api/auth/callback`
            });

            const tokenRes = await fetch(`${process.env.KEYCLOAK_ISSUER_BASE_URL}/token`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: params.toString()
            });

            if (!tokenRes.ok) {
                return NextResponse.redirect(new URL('/', request.url));
            }

            const data = await tokenRes.json();
            if (!data.access_token) {
                return NextResponse.redirect(new URL('/', request.url));
            }

            // Optionally: Set cookies, create session, etc. here

            return NextResponse.redirect(new URL('/', request.url));

        } catch (error) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Logout
    if (pathname.endsWith('/logout')) {
        // Redirect to Keycloak logout with post_logout_redirect_uri back to your app
        return NextResponse.redirect(
            `${process.env.KEYCLOAK_ISSUER_BASE_URL}/logout?` +
            `client_id=${process.env.KEYCLOAK_CLIENT_ID}&` +
            `post_logout_redirect_uri=${encodeURIComponent(`${process.env.KEYCLOAK_BASE_URL}/`)}`
        );
    }

    // Default response
    return NextResponse.redirect(new URL('/', request.url));
}

export const POST = GET;