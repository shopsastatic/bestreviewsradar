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
    optimizeCss: true,
    legacyBrowsers: false,
    browsersListForSwc: true, 
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
          // Thêm cache control headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        source: '/sitemap-0.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-store'
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'no-store'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          },
          ...createSecureHeaders({
            xssProtection: false,
            frameGuard: [
              'allow-from',
              { uri: process.env.NEXT_PUBLIC_WORDPRESS_URL },
            ],
          })
        ]
      }
    ]
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true
          })
        )
      }

      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 40000,
          maxSize: 120000,
          cacheGroups: {
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 50000
              },
              name(module) {
                const name = module.libIdent ? module.libIdent({ context: __dirname }) : ''
                return `chunk-${name?.split('/').pop()}`
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
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