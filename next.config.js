/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  nextConfig, env: {
    SECRET: process.env.SECRET,
    MONGODB_URL: process.env.MONGODB_URL
  },
}
