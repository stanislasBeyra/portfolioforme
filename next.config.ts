import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Désactiver les source maps pour réduire l'utilisation mémoire
  productionBrowserSourceMaps: false,
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
    webpackMemoryOptimizations: true, // Optimiser l'utilisation mémoire de Webpack
    webpackBuildWorker: false, // Désactiver les workers pour éviter WebAssembly
    serverSourceMaps: false, // Désactiver les source maps serveur
  },
  // Désactiver l'analyse TypeScript pendant le build pour économiser la mémoire
  typescript: {
    ignoreBuildErrors: false, // Garder à false pour la sécurité, mais peut être mis à true temporairement
  },
  webpack: (config, { isServer }) => {
    // Désactiver complètement WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: false,
      syncWebAssembly: false,
      layers: false,
    };
    // Réduire l'utilisation mémoire de webpack
    config.optimization = {
      ...config.optimization,
      minimize: !isServer, // Désactiver la minification côté serveur
    };
    // Limiter le parallélisme pour réduire l'utilisation mémoire
    config.parallelism = 1;
    // Désactiver les optimisations qui utilisent WebAssembly
    if (config.optimization.minimizer) {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (plugin: any) => {
          const name = plugin?.constructor?.name || '';
          return !name.includes('WebAssembly') && !name.includes('Lightning');
        }
      );
    }
    // Désactiver les loaders qui utilisent WebAssembly
    config.module.rules.forEach((rule: any) => {
      if (rule.use) {
        rule.use = rule.use.map((loader: any) => {
          if (typeof loader === 'string' && loader.includes('wasm')) {
            return null;
          }
          if (loader?.loader?.includes('wasm')) {
            return null;
          }
          return loader;
        }).filter(Boolean);
      }
    });
    return config;
  },
};

export default nextConfig;
