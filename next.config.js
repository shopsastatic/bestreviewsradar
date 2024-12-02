const { withFaust, getWpHostname } = require('@faustwp/core')
const { createSecureHeaders } = require('next-secure-headers')

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
    optimizeCss: true,
    granularChunks: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 15,
      minSize: 20000,
      maxSize: 60000,
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true
        },
        lib: {
          test(module) {
            return module.size() > 160000 &&
              /node_modules[/\\]/.test(module.identifier())
          },
          // name(module) {
          //   const hash = crypto.createHash('sha1')
          //   hash.update(module.identifier())
          //   return 'lib-' + hash.digest('hex').substring(0, 8)
          // },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20
        },
        shared: {
          name(module, chunks) {
            return 'shared-' +
              chunks.map(chunk => chunk.name).join('-')
          },
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    }

    config.optimization.minimize = true

    return config
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'temp5.local',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: getWpHostname(),
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '0.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '1.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '2.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '3.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // from env
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_1 || '1.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_2 || '1.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...createSecureHeaders({
            xssProtection: false,
            frameGuard: [
              'allow-from',
              { uri: process.env.NEXT_PUBLIC_WORDPRESS_URL },
            ],
          }),
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  poweredByHeader: false,
  generateEtags: true,
  compress: true,
})