import type { NextConfig } from 'next';

const basePrefix = process.env.BASE_PREFIX;
const isBasePrefixAvailable = basePrefix !== undefined && basePrefix.trim().length > 0;

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true, // optional, depends on your server/CDN setup
    basePath: isBasePrefixAvailable ? `/${basePrefix}` : undefined,
    assetPrefix: isBasePrefixAvailable ? `/${basePrefix}/` : undefined,
    //images: {
    //    domains: ['',],
    //    deviceSizes: [640, 960, 1280, 1600, 1920],
    //},
};

export default nextConfig;
