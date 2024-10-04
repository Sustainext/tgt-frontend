const { watch } = require("fs");

module.exports = {
  apps: [
    {
      name: 'sustainextv2_dev',
      script: 'npm',
      args: 'run start',
      interpreter: 'none', // use the system's default interpreter
      env: {
        NODE_ENV: 'production',
        PORT: 3012 // you can set the port here
      },
      max_memory_restart: '100M', // Restart the app if it exceeds 100 MB
      instances: 1, // Number of instances to run (1 for single-threaded)
      exec_mode: 'fork', // Use fork mode for better memory management
      watch: false // Disable watching for file changes
    },
  ],
};
