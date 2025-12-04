import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'nfts2me.com',
      },
      {
        protocol: 'https',
        hostname: 'app.nfts2me.com',
      },
    ],
  },
};

export default nextConfig;
