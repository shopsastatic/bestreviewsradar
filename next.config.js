const { withFaust, getWpHostname } = require('@faustwp/core')
const { createSecureHeaders } = require('next-secure-headers')
const path = require('path')

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // Basic Config - giữ nguyên
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: true,

  // Performance Optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  swcMinify: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { 
      properties: ['^data-testid$', '^data-test$'] 
    } : false,
    styledComponents: true, // Thêm vào để tối ưu CSS-in-JS
  },

  // Tối ưu page loading
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  experimental: {
    typedRoutes: false,
    scrollRestoration: true,
    optimizeCss: true, // Thêm để tối ưu CSS
    legacyBrowsers: false, // Tắt support cho legacy browsers
    browsersListForSwc: true, // Sử dụng browserslist config
  },

  // Tối ưu images
  images: {
    // Giữ nguyên remotePatterns của bạn
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Thêm responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Thêm common sizes
    domains: [getWpHostname()], // Thêm domain chính
  },

  // Headers optimization
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
      // Giữ nguyên config sitemap của bạn
    ]
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Bundle Analyzer (giữ nguyên)
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

      // Tối ưu webpack config
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
              priority: 40,
              enforce: true,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
            lib: {
              test(module) {
                return module.size() > 50000 && /node_modules/.test(module.context)
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
              priority: 50,
              enforce: true,
            },
          },
        },
        minimize: true,
        minimizer: [
          '...',
        ],
      }
    }

    return config
  },

  // Output options
  distDir: '.next',
  output: 'standalone',
}

module.exports = withFaust(nextConfig)