/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_ALLOWED_HOSTS: process.env.NEXT_PUBLIC_ALLOWED_HOSTS,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.3.54',
        port: '8080',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.visualstudio.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'react.dev',
        pathname: '/**',
      }
    ],
    domains: [
      'localhost',
      '192.168.3.54',
      'civitai.com',
      'images.unsplash.com',
      'i.imgur.com',
      'picsum.photos',
      'via.placeholder.com',
      'raw.githubusercontent.com',
      'code.visualstudio.com',
      'github.com',
      'avatars.githubusercontent.com',
      'react.dev'
    ],
  },

  // 添加 CORS 配置
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 