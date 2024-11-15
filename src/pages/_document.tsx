import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add preconnect for performance */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_WORDPRESS_URL} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_WORDPRESS_URL} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}