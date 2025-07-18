/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  webpack: config => {
    config.resolve.fallback = { fs: false }
    return config
  },
}

export default nextConfig
