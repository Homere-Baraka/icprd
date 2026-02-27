import { useQuery } from '@tanstack/react-query';
import { getUserByIdAction, getUsersAction } from '@/actions/admin/user';

export function useUsersQuery() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getUsersAction(),
        retry: 3,
        staleTime: 100 * 60 * 5,
    });
}

export function useUserQuery(userId: string) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserByIdAction(userId),
        retry: 3,
        staleTime: 1000 * 60 * 5,
    });
}
