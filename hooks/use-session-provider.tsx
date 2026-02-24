'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export function NextSessionProvider({ children }: { children: ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
