const nextConfig = {
  env: {
      BACKEND_API_URL: 'https://udm-enerpac-be.sustainext.ai',
      // BACKEND_API_URL: 'http://127.0.0.1:8000',
      NEXT_APP_ZOHO_URL_EMISSIONS: 'https://analytics.zoho.in/open-view/283231000002209106',
      NEXT_APP_SUPERSET_URL_ENV_EMISSIONS: 'https://superset-dev.sustainext.ai/superset/dashboard/11/?standalone=3&refreshTime=120',
      NEXT_APP_SUPERSET_URL_ENV_WASTE: 'https://superset-dev.sustainext.ai/superset/dashboard/12/?standalone=3&refreshTime=120',
      NEXT_PUBLIC_APP_CLIMATIQ_KEY: '98YJN6V0VC4M5KPQNSVHWCVEM8NT',
      NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION: '16',
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"], // Add all the supported languages
  },

  images: {
      domains: ['udm-enerpac-be.sustainext.ai'],
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
        "process.env.IGNORE_BUILD_ERRORS": JSON.stringify("true"),
      })
    );
    // if (!dev) {
    // In production, you may want to handle errors differently
    // For example, ignore certain types of errors or warnings
    // Modify webpack config as needed

    // }
    return config;
  },
  distDir: "custom_build",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Match all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // or 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
