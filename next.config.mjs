import fs from 'fs';
import path from 'path';

// Clean up deprecated [city] directory to prevent routing conflicts
const cityDir = path.join(process.cwd(), 'src', 'app', '[city]');
if (fs.existsSync(cityDir)) {
  try {
    fs.rmSync(cityDir, { recursive: true, force: true });
    console.log('Successfully deleted deprecated [city] directory');
  } catch (err) {
    console.error('Failed to delete deprecated [city] directory:', err);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'globalwebify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.globalwebify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    // Automatically strip all console.log statements in production builds to keep the console completely clean.
    // We exclude 'error' so that actual server crashes still get logged.
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
  async redirects() {
    return [
      {
        source: '/uk',
        destination: '/united-kingdom',
        permanent: true,
      },
      {
        source: '/uk/:path*',
        destination: '/united-kingdom/:path*',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/careers/:path*',
        destination: '/career/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
