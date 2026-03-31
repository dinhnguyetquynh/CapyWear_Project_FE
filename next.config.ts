import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bizweb.dktcdn.net',
        port: '',
        pathname: '/**', // Cho phép tất cả các đường dẫn từ domain này
      },
    ],
  },
};

export default nextConfig;
