
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22hsl(215, 39%, 29%)%22 /><text y=%22.9em%22 x=%2250%%22 text-anchor=%22middle%22 font-size=%2260%22 font-family=%22Arial%22 fill=%22hsl(210, 20%, 98%)%22>F</text></svg>',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
