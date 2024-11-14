import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    if (pathname.includes('_next') ||
        pathname.includes('api') ||
        pathname === '/' ||
        pathname.includes('favicon') ||
        pathname.startsWith('/images/') ||
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
        // Match tất cả ngoại trừ
        '/((?!api|_next/static|_next/image|favicon.ico|images|public).*)',
        '/:path*'
    ]
}