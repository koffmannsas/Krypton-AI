/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/tarifs',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/fonctionnalites',
        permanent: true,
      },
      {
        source: '/blog-post/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/article/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
