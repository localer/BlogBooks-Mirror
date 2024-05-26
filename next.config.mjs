/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blogbooks.net',
      },
    ],
  }
};

export default nextConfig;
