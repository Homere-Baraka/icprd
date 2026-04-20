'use server';

import { prisma } from '@/lib/prisma';
import { getVisitorInfos } from '@/utils/get-visitor-infos';

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


export async function getGlobalStatisticsVisitor() {
    try {
        const [
            totalVisitors,
            totalSessions,
            totalPageViews,
            topCountries,
            topPages,
            recentVisits
        ] = await Promise.all([
            prisma.visitor.count(),

            prisma.visitorSession.count(),

            prisma.pageView.count(),

            prisma.visitor.groupBy({
                by: ['country'],
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } },
                take: 5
            }),

            prisma.pageView.groupBy({
                by: ['url'],
                _count: { id: true },
                orderBy: { _count: { id: 'asc' } },
                take: 10
            }),

            prisma.visitorSession.findMany({
                take: 10,
                orderBy: { lastActivity: 'desc' },
                include: {
                    visitor: {
                        select: { ip: true, country: true, city: true }
                    }
                }
            })
        ]);

        return {
            summary: {
                visitors: totalVisitors,
                sessions: totalSessions,
                views: totalPageViews,
            },
            charts: {
                countries: topCountries.map(c => ({
                    name: c.country || "Inconnu",
                    value: c._count.id
                })),
                pages: topPages.map(p => ({
                    path: p.url,
                    count: p._count.id
                }))
            },
            recentVisits
        };

    } catch (error) {
        console.error("Erreur récupération stats:", error);
        throw new Error("Impossible de charger les statistiques.");
    }
}