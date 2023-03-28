/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    baseURL: 'https://api.github.com/',
  },
  domains: ['avatars.githubusercontent.com'],
}

module.exports = nextConfig
