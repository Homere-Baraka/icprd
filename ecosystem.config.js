module.exports = {
  apps: [
    {
      name: "icprd_app",
      script: "npm",
      args: "start -- -p 4000",
      max_memory_restart: "300M",
      watch: false,
      env: {
	NODE_ENV: "production",
        PORT: 4000
      },
    },
  ],
};
