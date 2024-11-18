const { withFaust, getWpHostname } = require('@faustwp/core')
const { createSecureHeaders } = require('next-secure-headers')
const path = require('path')

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // Basic Config
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: true,

  // Performance
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$', '^data-test$'] } : false,
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  experimental: {
    typedRoutes: false,
    scrollRestoration: true,
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
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
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
            value: 'public, max-age=604800',
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 604800000).toUTCString(),
          }
        ],
      },
    ]
  },

  webpack: (config, { dev, isServer }) => {
    // Chỉ áp dụng khi build cho client-side trong production
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: {
          name: 'runtime', // Đổi thành object thay vì 'single'
        },
        splitChunks: {
          chunks: 'all',
          minSize: 5000,
          maxSize: 70000,
          cacheGroups: {
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
            lib: {
              test(module) {
                return module.size() > 20000
              },
              name(module) {
                const name = module.libIdent ? module.libIdent({ context: __dirname }) : ''
                return `chunk-${name?.split('/').pop()}`
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true,
            },
            media: {
              test: /\.(png|jpg|jpeg|gif|svg|webp|ico)$/,
              chunks: 'all',
              enforce: true,
              name(module) {
                return `media/[name].[hash]`
              }
            },
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1]
                return `vendor.${packageName.replace('@', '')}`
              },
              priority: 10,
            },
          },
        },
      }
    }

    return config
  },

  distDir: '.next',
  output: 'standalone',
}

module.exports = withFaust(nextConfig)