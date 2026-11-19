'use client';

import { useQuery } from '@tanstack/react-query';
import {
    getBlogsAction,
    getBlogByIdAction,
    getBlogHeadlineAction,
} from '@/actions/admin/blog';
import {
    getAchievementsAction,
    getAchievementByIdAction,
    getAchievementHeadlineAction,
} from '@/actions/admin/achievement';
import {
    getContactMessagesAction,
    getContactMessageByIdAction,
} from '@/actions/admin/contact';
import { getGalleriesAction } from '@/actions/admin/gallery';

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

export function useBlogHeadlineQuery() {
    return useQuery({
        queryKey: ['blog_headline'],
        queryFn: async () => {
            const response = await getBlogHeadlineAction();

            if (!response.success) {
                throw new Error(response.error || 'Erreur lors du chargement');
            }

            return response.data;
        },
        retry: 2,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}

export function useBlogQuery(blogId?: string) {
    return useQuery({
        queryKey: ['blog', blogId],
        queryFn: async () => {
            const res = await fetch(`/api/blog/${blogId}`);
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Failed to fetch blog');
            }

            return data;
        },
        enabled: Boolean(blogId),
        retry: 2,
        staleTime: 1000 * 60,
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

export function useAchievementHeadlineQuery() {
    return useQuery({
        queryKey: ['achievement_headlines'],
        queryFn: () => getAchievementHeadlineAction(),
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

// GALLERY QUERY
export function useGalleriesQuery() {
    return useQuery({
        queryKey: ['galleries'],
        queryFn: () => getGalleriesAction(),
        retry: 3,
        staleTime: 0,
        refetchInterval: 1000 * 10,
        refetchIntervalInBackground: false,
    });
}
