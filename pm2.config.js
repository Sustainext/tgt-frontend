module.exports = {
  apps: [
    {
      name: 'sustainext_v2_staging_main',           // Name of the application
      script: 'node_modules/next/dist/bin/next', // Path to the Next.js start script
      args: 'start -p 3011',        // Arguments for the start script
      env: {
        NODE_ENV: 'production',     // Set the environment to production
      },
    },
  ],
};
