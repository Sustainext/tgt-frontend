const nextConfig = {
  env: {
    BACKEND_API_URL: "https://tgt-be.sustainext.ai",
    // BACKEND_API_URL: 'http://127.0.0.1:8000',
    NEXT_APP_ZOHO_URL_EMISSIONS:
      "https://analytics.zoho.in/open-view/283231000002209106",
    NEXT_APP_SUPERSET_URL_ENV_EMISSIONS:
      "https://superset-dev.sustainext.ai/superset/dashboard/11/?standalone=3&refreshTime=120",
    NEXT_APP_SUPERSET_URL_ENV_WASTE:
      "https://superset-dev.sustainext.ai/superset/dashboard/12/?standalone=3&refreshTime=120",
    CLIMATIQ_KEY: "JWFSEW69S10SF32N68F084YJP0",
    NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION: "23",
    REDIS_HOST: "127.0.0.1",
    REDIS_PORT: "6379",
    NEXT_PUBLIC_AZURE_SAS_TOKEN:"sp=racwdli&st=2024-12-31T06:36:00Z&se=2027-03-31T14:36:00Z&sv=2022-11-02&sr=c&sig=6B3bYVNsiIht4IyV9qk8izJNI2xXazgsTHPRERsVpuk%3D",
    NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT:"sustainextudm",
    NEXT_PUBLIC_AZURE_STORAGE_CONTAINER:"nextbucket",
    // SSO
    AUTH0_SECRET: "LONG RANDOM VALsUE",
    AUTH0_BASE_URL: "https://tgt-platform.sustainext.ai",
    // AUTH0_BASE_URL: "http://localhost:3000",
    AUTH0_ISSUER_BASE_URL: "https://dev-0biozzwskqs6o65f.us.auth0.com",
    AUTH0_CLIENT_ID: "Jr9m3MSh0oJr6h2a876tPN5h44OU4Bo8",
    AUTH0_CLIENT_SECRET:
      "VcLShjMepGqKoT5t9MwsuyGPHbWwwEN6zBl62XsXPSlkdHlVXeZFeRjpi6qX7t-q",
    AUTH0_REDIRECT_URL: "https://tgt-platform.sustainext.ai/callback",
    // AUTH0_REDIRECT_URL: "http://localhost:3000/callback",
    FERNET_SECRET_KEY: "BH0chZyXBgnhLGmTIeTCI4BSpdnJNn5vYbcPMKP2i1I=",

    KEYCLOAK_ISSUER_Auth_URL:
      "https://keycloak.sustainext.ai/realms/Sustainext/protocol/openid-connect",
    KEYCLOAK_ISSUER_BASE_URL:
      "https://keycloak.sustainext.ai/realms/Sustainext/protocol/openid-connect",
    KEYCLOAK_CLIENT_ID: "Sustainext_Test",
    KEYCLOAK_CLIENT_SECRET: "GUZ9XkSU4kYfM29ZQg1bhtMTIl6ElJ9u",
    KEYCLOAK_BASE_URL: "https://tgt-platform.sustainext.ai",
    KEYCLOAK_LOGOUT_URl:
      "https://keycloak.sustainext.ai/realms/Sustainext/protocol/openid-connect/logout",
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Or "SAMEORIGIN"
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "tgt-platform.sustainext.ai",
      "sustainextstorage1.blob.core.windows.net",
    ],
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
  //  distDir: "custom_build",
  experimental: {
    missingSuspenseWithCSRBailout: false,
    swcMinify: true,
  },
  reactStrictMode: true,
  output: "standalone",
};

export default nextConfig;
