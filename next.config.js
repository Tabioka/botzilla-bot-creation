// next.config.js
module.exports = {
  reactStrictMode: true,
  target: 'serverless', // Vercel runs serverless functions by default
  env: {
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID, // Store Discord bot credentials as environment variables
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  },
  // Enable webpack 5 support (which Vercel recommends)
  webpack(config, { isServer }) {
    if (!isServer) {
      // Workaround for certain Node modules that can conflict with the client-side code
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
  // Add any custom Vercel-specific optimizations here, such as redirects or rewrites
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
  // API Routes for serverless functions
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://discord.com/api/v10/:path*', // Proxy requests to the Discord API if needed
      },
    ];
  },
}
