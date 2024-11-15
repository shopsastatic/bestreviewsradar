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
				headers: createSecureHeaders({
					xssProtection: false,
					frameGuard: [
						'allow-from',
						{ uri: process.env.NEXT_PUBLIC_WORDPRESS_URL },
					],
				}),
			},
		]
	},
	compress: true,
	webpack: (config, { dev, isServer }) => {
		// Chỉ áp dụng cho production build
		if (!dev && !isServer) {
		  config.optimization = {
			...config.optimization,
			splitChunks: {
			  chunks: 'all',
			  minSize: 20000,
			  maxSize: 70000,
			  cacheGroups: {
				framework: {
				  name: 'framework',
				  chunks: 'all',
				  test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
				  priority: 40,
				  enforce: true
				},
				commons: {
				  name: 'commons',
				  chunks: 'all', 
				  minChunks: 2,
				  reuseExistingChunk: true,
				  priority: 20
				},
				lib: {
				  test(module) {
					return module.size() > 50000
				  },
				  name(module) {
					return `chunk-${module.libIdent({context: __dirname})}`
				  },
				  priority: 15,
				  minChunks: 1,
				  reuseExistingChunk: true
				}
			  }
			}
		  }
		}
		return config
	}
})
