import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ipfs.w3s.link',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'lilturtlenft.fun',
          },
        ],
        destination: 'https://www.lilturtlenft.fun/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
