'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function VisitorTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname || pathname.includes('/admin')) return;

        const timer = setTimeout(() => {
            fetch('/api/status/visitor', {
                method: 'POST',
                headers: { 'x-target-path': pathname },
            }).catch(() => {});
        }, 1500);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}