// PM2 process config for self-hosting the Next.js server (e.g. a classic
// Cloudways server behind Nginx/Apache). Not needed if you use Cloudways'
// native Managed Node.js hosting, which runs `npm start` for you.
//
// Usage on the server:
//   npm ci && npm run build
//   pm2 start ecosystem.config.js && pm2 save
module.exports = {
  apps: [
    {
      name: "chinook-overlander",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
