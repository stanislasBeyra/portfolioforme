import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blaise-saman.netlify.app',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeCss: false, // Désactiver l'optimisation CSS qui peut utiliser WebAssembly
  },
};

export default nextConfig;
