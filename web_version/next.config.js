/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [],
  },
  // Temporarily disable standalone for cloud builds
  // output: 'standalone',
};

module.exports = nextConfig;