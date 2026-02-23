import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // เพิ่มส่วน images ตรงนี้ครับ
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;