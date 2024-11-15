import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

const FAVICON_VERSION = 4
const SITE_URL = process.env.NEXT_PUBLIC_URL
const SITE_TITLE = NC_SITE_SETTINGS.site_info?.site_title

const v = (href: string) => `${href}?v=${FAVICON_VERSION}`

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
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
          {/* Meta tags */}
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#172A53" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Preload critical assets */}
          <link 
            rel="preload" 
            href="/_next/static/css/critical.css" 
            as="style" 
          />
          <link rel="shortcut icon" href={v('/favicon.ico')} />

          {/* Preconnect to important origins */}
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_WORDPRESS_URL} />
          <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_WORDPRESS_URL} />

          {/* Inline critical scripts */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (() => {
                  try {
                    // Theme handling
                    const theme = localStorage.theme === 'dark' || 
                      (!('theme' in localStorage) && 
                      window.matchMedia('(prefers-color-scheme: dark)').matches)
                      ? 'dark' : 'light';
                    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');

                    // Banner handling
                    const dismissBanner = localStorage.dismiss_top_banner === 'true';
                    document.documentElement.classList[dismissBanner ? 'add' : 'remove']('dismiss_top_banner');
                  } catch (e) {}
                })();
              `,
            }}
          />
        </Head>

        <body className="relative">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}