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
        image: user?.image,
        role: user?.role,
        isLoading,
        isAuthenticated,
    };
};
