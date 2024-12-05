const nextConfig = {
  env: {
      BACKEND_API_URL: 'https://udm-be.sustainext.ai',
      // BACKEND_API_URL: 'http://127.0.0.1:8000',
      NEXT_APP_ZOHO_URL_EMISSIONS: 'https://analytics.zoho.in/open-view/283231000002209106',
      NEXT_APP_SUPERSET_URL_ENV_EMISSIONS: 'https://superset-dev.sustainext.ai/superset/dashboard/11/?standalone=3&refreshTime=120',
      NEXT_APP_SUPERSET_URL_ENV_WASTE: 'https://superset-dev.sustainext.ai/superset/dashboard/12/?standalone=3&refreshTime=120',
      NEXT_PUBLIC_APP_CLIMATIQ_KEY: '98YJN6V0VC4M5KPQNSVHWCVEM8NT',
      NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION: '16',
  },

  images: {
      domains: ['udm-be.sustainext.ai','sustainextstorage1.blob.core.windows.net'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.IGNORE_BUILD_ERRORS": JSON.stringify("true"),
      })
    );

    return config;
  },
  distDir: "custom_build",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

};

export default nextConfig;
