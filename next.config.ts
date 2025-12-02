import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blaise-saman.netlify.app',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
