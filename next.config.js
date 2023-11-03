/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      // Reverse proxy to the docker hub
      source: '/api/docker',
      destination: 'https://hub.docker.com/api/content/v1/products/search',
    },
  ],
};

module.exports = nextConfig;
