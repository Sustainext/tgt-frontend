const { watch } = require("fs");

module.exports = {
  apps: [
    {
      name: "alfharon_fe_2",
      script: "npm",
      args: "run start",
      // watch: false,
      // exec_mode: 'fork', // optional, defaults to 'fork'
      interpreter: "none", // use the system's default interpreter
      env: {
        NODE_ENV: "production",
        PORT: 3002, // you can set the port here
      },
    },
  ],
};
