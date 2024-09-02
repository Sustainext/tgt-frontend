const nextConfig = {
  env: {
      BACKEND_API_URL: 'https://udm-be.sustainext.ai',
      // BACKEND_API_URL: 'http://127.0.0.1:8000',
      NEXT_APP_ZOHO_URL_EMISSIONS: 'https://analytics.zoho.in/open-view/283231000002209106',
      NEXT_APP_POWERBI_URL_ENV_EMISSIONS: 'https://app.powerbi.com/view?r=eyJrIjoiODY4ZTc0ODAtNDlmZC00YTQ2LTgyNTMtNmI3YjFlZGM1OTdiIiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
      NEXT_APP_POWERBI_URL_ENV_ENERGY: 'https://app.powerbi.com/view?r=eyJrIjoiZmIzMTc5NWQtOTgyZS00NmQyLWE3ZjYtNmQxZTUxOGI2NWFmIiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
      NEXT_APP_POWERBI_URL_ENV_WASTE: 'https://app.powerbi.com/view?r=eyJrIjoiZGMwZTgzNzMtNjM0My00NWQ4LWEzMTEtMjVjZTM3MGUyZmU3IiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
      NEXT_APP_POWERBI_URL_SOCIAL_EMPLOYMENT: 'https://app.powerbi.com/view?r=eyJrIjoiNmQyNjhlN2YtMzNiZi00Y2ZjLTk2MGEtYzQyMGM4ODZiYjYxIiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
      NEXT_APP_POWERBI_URL_SOCIAL_OHS: 'https://app.powerbi.com/view?r=eyJrIjoiZDhlNzgxMTItMjk5NC00OGRiLTk4OTYtNWVlYmI2NzZiZDU4IiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
      NEXT_APP_POWERBI_URL_SOCIAL_DIVERSITYINCLUSION: 'https://app.powerbi.com/view?r=eyJrIjoiYTg0NzMzYTAtMjM1Ni00MGEwLTlkYTUtMjM4Y2M1MDlkYmFmIiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
      NEXT_APP_POWERBI_URL_SOCIAL_COMMUNITYDEVELOPMENT: 'https://app.powerbi.com/view?r=eyJrIjoiMzE0ZjgzNjgtYzhmMS00MmVhLWEzNmQtZTRmYzViZTg5MjI1IiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
      NEXT_PUBLIC_APP_CLIMATIQ_KEY: 'HE3SK2V2F04MTSG9210JSQXB2QCX',
      NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION: '8',

  },
  images: {
      domains: ['udm-be.sustainext.ai'],
  },
  eslint: {
      ignoreDuringBuilds: true,
  },
  typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Handling build errors
      config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.IGNORE_BUILD_ERRORS': JSON.stringify('true'),
          })
        );
      // if (!dev) {
        // In production, you may want to handle errors differently
        // For example, ignore certain types of errors or warnings
        // Modify webpack config as needed

      // }
      return config;
  },
  distDir: 'custom_build',
  experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  async headers() {
    return [
      {
        source: '/(.*)', // Match all routes
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // or 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
