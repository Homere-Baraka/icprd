import { useSession } from 'next-auth/react';

export const useUser = () => {
    const { data: session, status } = useSession();

    const user = session?.user;
    const isLoading = status === 'loading';
    const isAuthenticated = status === 'authenticated';

    return {
        user,
        id: user?.id,
        name: user?.name,
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
        image: user?.image,
        role: user?.role,
        isLoading,
        isAuthenticated,
    };
};
