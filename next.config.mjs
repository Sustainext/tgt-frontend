/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        BACKEND_API_URL : 'https://udm-be.sustainext.ai',
        NEXT_APP_TRACK_URL: 'https://app.powerbi.com/view?r=eyJrIjoiMDEzNmRjMjEtMjI4My00NzY4LWEyMGEtNDRiMjNkMmFkNjU0IiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
        NEXT_PUBLIC_APP_CLIMATIQ_KEY: 'HE3SK2V2F04MTSG9210JSQXB2QCX',
        NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION: '8'
    }
};

export default nextConfig;
