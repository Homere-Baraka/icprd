'use client';

import { useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';

export default function HandleVisiblity() {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleVisibility = () => {
            if (document.hidden) {
                timerRef.current = setTimeout(
                    () => {
                        signOut({ callbackUrl: '/accounts/login' });
                    },
                    5 * 60 * 1000,
                );
            } else {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return null;
}
