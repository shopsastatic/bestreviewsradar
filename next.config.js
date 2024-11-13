const { withFaust, getWpHostname } = require('@faustwp/core')
const { createSecureHeaders } = require('next-secure-headers')

const gravatarHosts = [
  '0.gravatar.com',
  '1.gravatar.com', 
  '2.gravatar.com',
  '3.gravatar.com',
  'secure.gravatar.com'
].map(hostname => ({
  protocol: 'https',
  hostname,
  port: '',
  pathname: '/**'
}))

const developmentHosts = [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '',
    pathname: '/**'
  },
  {
    protocol: 'http', 
    hostname: 'temp5.local',
    port: '',
    pathname: '/**'
  }
]

const imageHosts = [
  {
    protocol: 'https',
    hostname: getWpHostname(),
    port: '',
    pathname: '/**'
  },
  {
    protocol: 'https',
    hostname: 'images.pexels.com',
    port: '',
    pathname: '/**'
  },
  {
    protocol: 'https',
    hostname: 'images.unsplash.com', 
    port: '',
    pathname: '/**'
  },
  {
    protocol: 'https',
    hostname: process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_1 || '1.gravatar.com',
    port: '',
    pathname: '/**'
  },
  {
    protocol: 'https',
    hostname: process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_2 || '1.gravatar.com',
    port: '',
    pathname: '/**'
  }
]

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    typedRoutes: false
  },
  images: {
    remotePatterns: [
      ...developmentHosts,
      ...gravatarHosts,
      ...imageHosts
    ]
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: createSecureHeaders({
        xssProtection: false,
        frameGuard: [
          'allow-from',
          { uri: process.env.NEXT_PUBLIC_WORDPRESS_URL }
        ]
      })
    }]
  }
}

if (process.env.NODE_ENV === 'production') {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ['error'],
    },
  }
  nextConfig.images.minimumCacheTTL = 60
}

module.exports = withFaust(nextConfig)