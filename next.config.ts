import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Server Action ডাটা সাইজ ৫ মেগাবাইট করা হলো
    },
  },
};

export default nextConfig;