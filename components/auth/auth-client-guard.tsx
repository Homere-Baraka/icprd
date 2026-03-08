'use client';

import { redirect } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import LoadingSpinner from '@/components/ui/loading-spinner';

export function AuthClientGuard({ children }: { children: React.ReactNode }) {
    const { isLoading, isAuthenticated } = useUser();

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <LoadingSpinner />
                <span className="ml-3 text-sm font-medium">
                    Vérification...
                </span>
            </div>
        );
    }

    if (!isAuthenticated) {
        redirect('/accounts/login');
    }

    return <>{children}</>;
}
