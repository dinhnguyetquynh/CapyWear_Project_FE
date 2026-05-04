import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
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

// export default nextConfig;
export default withNextIntl(nextConfig);
