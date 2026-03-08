'use client';

import { useQuery } from '@tanstack/react-query';
import { getBlogsAction, getBlogByIdAction } from '@/actions/admin/blog';
import {
    getAchievementsAction,
    getAchievementByIdAction,
} from '@/actions/admin/achievement';
import {
    getContactMessagesAction,
    getContactMessageByIdAction,
} from '@/actions/admin/contact';

/*====== BLOG QUERY =======*/
export function useBlogsQuery() {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: () => getBlogsAction(),
        retry: 3,
        staleTime: 0,
        refetchInterval: 1000 * 10,
        refetchIntervalInBackground: false,
    });
}

export function useBlogQuery(postId: string) {
    return useQuery({
        queryKey: ['post'],
        queryFn: () => getBlogByIdAction(postId),
        retry: 3,
        staleTime: 0,
        refetchInterval: 1000 * 10,
        refetchIntervalInBackground: false,
    });
}

/*====== ACHIEVEMENT QUERY =======*/
export function useAchievementsQuery() {
    return useQuery({
        queryKey: ['achievements'],
        queryFn: () => getAchievementsAction(),
        retry: 3,
        staleTime: 0,
        refetchInterval: 1000 * 10,
        refetchIntervalInBackground: false,
    });
}

export function useAchievementQuery(achievementId: string) {
    return useQuery({
        queryKey: ['achievement'],
        queryFn: () => getAchievementByIdAction(achievementId),
        retry: 3,
        staleTime: 0,
        refetchInterval: 1000 * 10,
        refetchIntervalInBackground: false,
    });
}

/*====== CONTACT MESSAGE QUERY ======*/
export function useContactMessagesQuery() {
    return useQuery({
        queryKey: ['contact_messages'],
        queryFn: () => getContactMessagesAction(),
        retry: 3,
        staleTime: 0,
        refetchInterval: 1000 * 10,
        refetchIntervalInBackground: false,
    });
}

export function useContactMessageQuery(messageId: string) {
    return useQuery({
        queryKey: ['contact_message'],
        queryFn: () => getContactMessageByIdAction(messageId),
        retry: 3,
        staleTime: 0,
        refetchInterval: 1000 * 10,
        refetchIntervalInBackground: false,
    });
}
