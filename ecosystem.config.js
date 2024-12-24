module.exports = {
  apps: [
    {
      name: "poc-sgs",
      script: "npm",
      args: "run start",
      // watch: false,
      // exec_mode: 'fork', // optional, defaults to 'fork'
      interpreter: "none", // use the system's default interpreter
      env: {
        NODE_ENV: "production",
        PORT: 3008, // you can set the port here
      },
    },
  ],
};
