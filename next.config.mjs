const nextConfig = {
    env: {
        BACKEND_API_URL: 'https://udm-be.sustainext.ai',
        // BACKEND_API_URL: 'http://127.0.0.1:8000',
        NEXT_APP_TRACK_URL: 'https://app.powerbi.com/view?r=eyJrIjoiMmM0Yjk1ZGMtNGJjZS00N2E4LWJlM2UtZmRhMTQ1YjhkYjJiIiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
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
