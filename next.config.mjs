const nextConfig = {
    env: {
        BACKEND_API_URL: 'https://udm-be.sustainext.ai',
        // BACKEND_API_URL: 'http://127.0.0.1:8000',
        NEXT_APP_TRACK_URL: 'https://analytics.zoho.in/open-view/283231000002209106',
        NEXT_PUBLIC_APP_CLIMATIQ_KEY: 'HE3SK2V2F04MTSG9210JSQXB2QCX',
        NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION: '8',

    },
    images: {
        domains: ['udm-be.sustainext.ai'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
