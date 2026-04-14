import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bizweb.dktcdn.net',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'content.pancake.vn',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;
