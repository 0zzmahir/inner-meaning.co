/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // ← GZIP + Brotli sıkıştırmayı açık ilan ettik

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: { 
    unoptimized: true 
  },
};

module.exports = nextConfig;
