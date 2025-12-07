/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tüm siteyi statik export edeceğiz
  output: 'export',
  trailingSlash: true,

  // 🔥 Build sırasında ESLint'i tamamen devre dışı bırak
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
