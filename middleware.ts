import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

let locales = ['fr', 'en'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/uploads')) {
        return NextResponse.next();
    }

    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (!pathnameHasLocale) {
        const locale = 'fr';

        const url = request.nextUrl.clone();
        url.pathname = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;

        if (pathname === '/') {
            url.pathname = `/${locale}`;
        }

        return NextResponse.redirect(url);
    }

    if (pathnameHasLocale) {

        const cleanPath = pathname.replace(/^\/(fr|en)/, '') || '/';

        let sessionId =
                request.cookies.get('visitor_session_id')?.value || uuidv4();
        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0] ||
            '127.0.0.1';

        if(!cleanPath.includes("admin") && !cleanPath.includes("api")){
            fetch(`${request.nextUrl.origin}/api/status/visitor`, {
                method: 'POST',
                headers: {
                    cookie: request.headers.get('cookie') || '',
                    'x-forwarded-for': ip,
                    'user-agent': request.headers.get('user-agent') || '',
                    'x-target-path': pathname,
                },
            }).catch((err) => console.error('Tracking fetch error:', err));
        }

        const response = NextResponse.next();

        if (!request.cookies.has('visitor_session_id')) {
            response.cookies.set('visitor_session_id', sessionId, {
                path: '/',
                httpOnly: true,
                maxAge: 1800,
                sameSite: 'lax',
            });
        }

        return response;
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|favicon.ico|public|robots.txt).*)',
    ],
};
