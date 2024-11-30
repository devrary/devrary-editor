/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_WAGMI_PROJECT_ID: process.env.PROJECT_ID,
    NEXT_PUBLIC_BERACHAIN_RPC_URL: process.env.BERACHAIN_RPC_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default nextConfig;
