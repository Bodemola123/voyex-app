/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EMAIL_KEY: process.env.EMAIL_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // matches any domain (wildcard), but not officially recommended
      },
    ],
  },  
};

export default nextConfig;
