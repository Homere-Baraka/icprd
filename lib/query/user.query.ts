import { useQuery } from '@tanstack/react-query';
import {
    getTeamsAction,
    getTeamByIdAction,
    getUserByIdAction,
    getUsersAction,
} from '@/actions/admin/user';
import { useSession } from 'next-auth/react';

export function useUserByIdQuery(userId: string) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserByIdAction(userId),
        retry: 3,
        staleTime: 100 * 60 * 5,
    });
}

// Team
export function useTeamsQuery() {
    return useQuery({
        queryKey: ['teams'],
        queryFn: () => getTeamsAction(),
        retry: 3,
        staleTime: 100 * 60 * 5,
    });
}

export function useTeamQuery(postId: string) {
    return useQuery({
        queryKey: ['team', postId],
        queryFn: () => getTeamByIdAction(postId),
        retry: 3,
        staleTime: 1000 * 60 * 5,
        enabled: !!postId,
    });
}
