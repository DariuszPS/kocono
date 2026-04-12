import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore sql.js on server-side
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('sql.js');
    }
    
    // Add fallback for fs module
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    return config;
  },
};

export default nextConfig;
