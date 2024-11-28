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
    // Thêm optimize module
    optimizeCss: true,
    // Tối ưu chunks
    granularChunks: true,
  },
  // Cấu hình webpack
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Tối ưu chunk size
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      maxSize: 60000,
      cacheGroups: {
        default: false,
        vendors: false,
        // Bundle core và framework
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true
        },
        // Bundle các lib từ node_modules
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
        // Bundle commons cho app
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20
        },
        // Bundle shared cho components
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

    // Tối ưu bundle size
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

  // Cache và headers
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
          // Thêm cache headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Cache cho static files
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

  // Tối ưu production build
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
})