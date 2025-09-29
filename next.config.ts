import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  
  output: "standalone",
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'washint.s3.amazonaws.com',
        port: '',
        pathname: '/media/images/**',
      },
    ],
  },
};

export default nextConfig;
