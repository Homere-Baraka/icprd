'use client';

import { redirect } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import LoadingSpinner from '@/components/ui/loading-spinner';
import MainLayout from '@/components/sections/admin-panel/main-layout';
import Dashboard from '@/components/sections/admin-panel/dashboard';

export default function DashboardPage() {
    // const { isLoading, isAuthenticated } = useUser();

    // if(isLoading){
    //     return (
    //         <div className="flex h-screen w-full items-center justify-center bg-background">
    //             <LoadingSpinner />
    //             <span className="ml-3 text-sm font-medium">Vérification de l'accès...</span>
    //         </div>
    //     )
    // }

    // if(!isAuthenticated) redirect('/accounts/login');

    return (
        <MainLayout>
            <Dashboard />
        </MainLayout>
    );
}
