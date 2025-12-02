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
  webpack: (config, { isServer }) => {
    // Désactiver les optimisations WebAssembly qui consomment trop de mémoire
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: false,
      layers: false,
    };
    return config;
  },
};

export default nextConfig;
