module.exports = {
  apps: [
    {
      name: 'nextjs-app',           // Name of the application
      script: 'node_modules/next/dist/bin/next', // Path to the Next.js start script
      args: 'start -p 3000',        // Arguments for the start script
      env: {
        NODE_ENV: 'production',     // Set the environment to production
      },
    },
  ],
};
