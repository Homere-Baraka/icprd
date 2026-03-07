'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostsAction, getPostByIdAction } from '@/actions/admin/post';
import {
    getAchievementsAction,
    getAchievementByIdAction,
} from '@/actions/admin/achievement';
import {
    getContactMessagesAction,
    getContactMessageByIdAction,
} from '@/actions/admin/contact';

/*====== BLOG QUERY =======*/
export function usePostsQuery() {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => getPostsAction(),
        retry: 3,
        staleTime: 100 * 60 * 5,
    });
}

export function usePostQuery(postId: string) {
    return useQuery({
        queryKey: ['post'],
        queryFn: () => getPostByIdAction(postId),
        retry: 3,
        staleTime: 100 * 60 * 5,
    });
}

/*====== ACHIEVEMENT QUERY =======*/
export function useAchievementsQuery() {
    return useQuery({
        queryKey: ['achievements'],
        queryFn: () => getAchievementsAction(),
        retry: 3,
        staleTime: 100 * 60 * 5,
    });
}

export function useAchievementQuery(achievementId: string) {
    return useQuery({
        queryKey: ['achievement'],
        queryFn: () => getPostByIdAction(achievementId),
        retry: 3,
        staleTime: 100 * 60 * 5,
    });
}

/*====== CONTACT MESSAGE QUERY ======*/
export function useContactMessagesQuery() {
    return useQuery({
        queryKey: ['contact_messages'],
        queryFn: () => getContactMessagesAction(),
        retry: 3,
        staleTime: 100 * 60 * 5,
    });
}

export function useContactMessageQuery(contactId: string) {
    return useQuery({
        queryKey: ['contact_message'],
        queryFn: () => getContactMessageByIdAction(contactId),
        retry: 3,
        staleTime: 100 * 60 * 5,
    });
}
