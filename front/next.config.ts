import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'localhost',
    //     port: '8000',
    //     pathname: '/storage/images/**',
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "postgrelaravel-production.up.railway.app",
    //     pathname: "/storage/images/**",
    //   }
    // ]
  }
};

export default nextConfig;
