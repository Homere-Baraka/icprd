import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let locales = ['fr', 'en'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/uploads')) {
        return NextResponse.next();
    }

    // Vérifier si l'URL contient déjà une langue
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (pathnameHasLocale) return;

    const locale = 'fr';

    // Construire la nouvelle URL proprement
    // Si pathname est '/', on ne veut pas '//fr', donc on gère le slash
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;

    // Correction pour éviter le double slash si pathname est déjà '/'
    if (pathname === '/') {
        url.pathname = `/${locale}`;
    }

    return NextResponse.redirect(url);
}

export const config = {
    // On ajoute 'public' et 'favicon' pour être sûr de ne pas intercepter les assets
    matcher: [
        '/((?!api|_next/static|_next/image|images|favicon.ico|public|robots.txt).*)',
    ],
};
