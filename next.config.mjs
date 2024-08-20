const nextConfig = {
    env: {
        BACKEND_API_URL: 'https://udm-be-dev.sustainext.ai',
        // BACKEND_API_URL: 'http://127.0.0.1:8000',
        NEXT_APP_TRACK_URL: 'https://analytics.zoho.in/open-view/283231000002209106',
        NEXT_APP_POWERBI_URL: 'https://app.powerbi.com/view?r=eyJrIjoiMmM0Yjk1ZGMtNGJjZS00N2E4LWJlM2UtZmRhMTQ1YjhkYjJiIiwidCI6ImIwZjhlODRjLWU0YTgtNDc5OS04MWIwLWRmMTUwMDY0MDM3ZCJ9',
        NEXT_PUBLIC_APP_CLIMATIQ_KEY: 'HE3SK2V2F04MTSG9210JSQXB2QCX',
        NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION: '8',

    },
    images: {
        domains: ['udm-be-dev.sustainext.ai'],
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
