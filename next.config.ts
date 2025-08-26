import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'washint-file-erver-234sdfghh34.s3.amazonaws.com',
        port: '',
        pathname: '/media/images/**', // The `/**` allows for any sub-path
      },
    ],
  },
};

export default nextConfig;
