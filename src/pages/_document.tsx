import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

const FAVICON_VERSION = 4
const SITE_URL = process.env.NEXT_PUBLIC_URL
const SITE_TITLE = NC_SITE_SETTINGS.site_info?.site_title

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
					<link rel="shortcut icon" href={v('/favicons.ico')} />
					<meta name="theme-color" content="#172A53" />
					<script
						dangerouslySetInnerHTML={{
							__html: `
                  try {
                    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                      document.documentElement.classList.add('dark')
                    } else {
                      document.documentElement.classList.remove('dark')
                    }
                  } catch (_) {}
                `,
						}}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
                  try {
                    if (localStorage.dismiss_top_banner === 'true' ) {
                      document.documentElement.classList.add('dismiss_top_banner')
                    } else {
                      document.documentElement.classList.remove('dismiss_top_banner')
                    }
                  } catch (_) {}
                `,
						}}
					/>
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
