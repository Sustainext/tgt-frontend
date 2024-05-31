/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        BACKEND_API_URL : 'https://udm-be.sustainext.ai',
        // BACKEND_API_URL : 'http://127.0.0.1:8000',
        NEXT_APP_TRACK_URL: 'https://app.powerbi.com/view?r=eyJrIjoiMDEzNmRjMjEtMjI4My00NzY4LWEyMGEtNDRiMjNkMmFkNjU0IiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9'
    }
};

export default nextConfig;
