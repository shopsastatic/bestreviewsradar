const { withFaust, getWpHostname } = require('@faustwp/core')
const { createSecureHeaders } = require('next-secure-headers')
const CompressionPlugin = require('compression-webpack-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
  optimizeServerReact: true,

  compiler: {
    swcMinify: true,
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$', '^data-test$'] } : false,
    styledComponents: true,
    relay: {
      src: './src',
      artifactDirectory: './__generated__',
    }
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  experimental: {
    typedRoutes: false,
    scrollRestoration: true,
    optimizeCss: true,
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
        source: '/static/:path*',
        headers: [
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
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, private, no-cache, must-revalidate'
          }
        ]
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
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        mangleExports: 'deterministic',
        concatenateModules: true,

        splitChunks: {
          chunks: 'all',
          minSize: 40000,
          maxSize: 244000,
          minChunks: 2,
          maxInitialRequests: 20,
          maxAsyncRequests: 20,
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(css|scss)$/,
              chunks: 'all',
              enforce: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 20,
              chunks: 'all',
              enforce: true,
              reuseExistingChunk: true,
            },
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true
            },
          }
        }
      }
      config.plugins.push(
        new CompressionPlugin({
          test: /\.(js|css|html|svg)$/,
          algorithm: 'gzip',
          // Thêm các options sau
          threshold: 10240, // Only compress files > 10kb
          minRatio: 0.8, // Only compress if compression ratio is better than 0.8
          compressionOptions: { level: 9 }, // Maximum compression
        })
      )
    }
    return config
  },
  distDir: '.next',
  output: 'standalone',
}

module.exports = withFaust(withBundleAnalyzer(nextConfig))