import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const locales = ['fr', 'en'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (!pathnameHasLocale) {
        const locale = 'fr';
        const url = request.nextUrl.clone();
        url.pathname =
            pathname === '/'
                ? `/${locale}`
                : `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;

        return NextResponse.redirect(url);
    }

    const response = NextResponse.next();

    if (!request.cookies.has('visitor_session_id')) {
        response.cookies.set('visitor_session_id', uuidv4(), {
            path: '/',
            httpOnly: true,
            maxAge: 1800,
            sameSite: 'lax',
        });
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|uploads|favicon.ico|public|robots.txt).*)',
    ],
};