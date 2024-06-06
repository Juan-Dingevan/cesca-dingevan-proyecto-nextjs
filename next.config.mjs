/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i.imgur.com',
            port: '',
            pathname: '/**',
          },
        ],
    },
};

export default nextConfig;
