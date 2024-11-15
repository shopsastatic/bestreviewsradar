import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

const FAVICON_VERSION = 4

function v(href: string) {
	return `${href}?v=${FAVICON_VERSION}`
}

export default class Document extends NextDocument {
	// @ts-ignore
	static async getInitialProps(ctx) {
		const initialProps = await NextDocument.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html
				lang="en"
				className="[--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]"
				dir={process.env.NEXT_PUBLIC_SITE_DIRECTION}
			>
				<Head>
					<link rel="shortcut icon" href={v('/favicon.ico')} />
					<meta name="theme-color" content="#172A53" />

					<link rel="preconnect" href={process.env.NEXT_PUBLIC_WORDPRESS_URL} />
					<link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_WORDPRESS_URL} />
				</Head>
				<body
					className={
						'relative'
					}
				>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
