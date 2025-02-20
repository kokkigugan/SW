import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  }),
  webpack: (config, { isServer, dev, webpack }) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false
    };

    config.externals.push(
      'pino-pretty',
      'lokijs',
      'encoding'
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/events',
        permanent: false
      }
    ];
  },
  images: {
    domains: ['avatars.azuro.org'],
  },
};

export default nextConfig;
