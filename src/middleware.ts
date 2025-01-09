import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const sitemapFiles = [
        '/post-sitemap.xml',
        '/post-sitemap2.xml',
        '/post-sitemap3.xml',
        '/post-sitemap4.xml',
        '/page-sitemap.xml'
    ]

    if (sitemapFiles.includes(pathname)) {
        const url = request.nextUrl.clone()
        url.hostname = 'content.bestreviewsradar.com'
        return NextResponse.redirect(url, 301)
    }
    
    const normalizedPath = pathname.replace(/\/$/, '')
    
    if (normalizedPath === '/reports') {
        return NextResponse.rewrite(new URL('/404', request.url), {
            status: 404,
            headers: {
                'X-Robots-Tag': 'noindex'
            }
        });
    }

    if (pathname.includes('_next') ||
        pathname.includes('api') ||
        pathname === '/' ||
        pathname.includes('favicon') ||
        pathname.startsWith('/images/') ||
        pathname.startsWith('/author/') ||
        pathname.startsWith('/search/') ||
        pathname.startsWith('/public/')) {
        return NextResponse.next()
    }

    const segments = pathname.split('/').filter(Boolean)

    if (segments.length >= 2) {
        return NextResponse.rewrite(new URL('/404', request.url), {
            status: 404,
            headers: {
                'X-Robots-Tag': 'noindex'
            }
        });
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|public|author|search).*)',
        '/:path*'
    ]
}