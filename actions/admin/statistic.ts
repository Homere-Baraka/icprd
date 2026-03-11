'use server';

import { prisma } from '@/lib/prisma';

export async function getDashboardStatsAction() {
    try {
        const [
            blogsCount,
            achievementsCount,
            galleryCount,
            partnersCount,
            teamsCount,
        ] = await Promise.all([
            prisma.blog.count(),
            prisma.achievement.count(),
            prisma.gallery.count(),
            prisma.partner.count(),
            prisma.team.count(),
        ]);

        return {
            success: true,
            data: {
                blogs: blogsCount,
                achievements: achievementsCount,
                gallery: galleryCount,
                partners: partnersCount,
                members: teamsCount,
            },
        };
    } catch (error) {
        console.error('Stats Fetch Error:', error);
        return {
            success: false,
            error: 'Error while fetching statistics data',
        };
    }
}
