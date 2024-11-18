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
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 5000,
        maxSize: 70000,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          default: false,
          defaultVendors: false,
          
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next|@next|@babel\/runtime)[\\/]/,
            priority: 50,
            enforce: true,
            chunks: 'all',
            reuseExistingChunk: true,
          },

          // Commons cho code dùng chung
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 40,
            enforce: true,
            chunks: 'all',
            reuseExistingChunk: true,
          },

          // Library chunks
          lib: {
            test(module) {
              return module.size() > 20000 && /node_modules/.test(module.context || '')
            },
            name(module) {
              const name = module.libIdent ? module.libIdent({ context: __dirname }) : ''
              return `chunk-${name?.split('/').pop()}`
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true,
          },

          // Styles
          styles: {
            name: 'styles',
            test: /\.(css|scss|sass)$/,
            chunks: 'all',
            minSize: 3000, // Giảm để bắt file CSS nhỏ
            priority: 20,
            enforce: true,
            reuseExistingChunk: true,
          },

          // Media files
          media: {
            name: 'media',
            test: /\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/,
            minSize: 3000,
            maxSize: 70000,
            chunks: 'all',
            priority: 20,
            enforce: true,
            reuseExistingChunk: true,
          },

          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            enforce: true,
            chunks: 'all',
            minSize: 5000,
            reuseExistingChunk: true,
          }
        },
      },
    }

    if (!dev) {
      config.plugins.push(
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin()
      )
    }

    return config
  },
  distDir: '.next',
  output: 'standalone',
}

module.exports = withFaust(nextConfig)