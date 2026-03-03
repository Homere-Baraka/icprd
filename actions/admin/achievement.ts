'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth/options';
import { getServerSession } from 'next-auth';
import { achievementSchema } from '@/lib/prisma-schema';

export async function createAchievementAction(
    data: unknown,
    actionType: 'draft' | 'publish',
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return { success: false, error: 'Vous devez être connecté.' };
    }

    const validation = achievementSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors,
        };
    }

    const { title, content, excerpt, date, category, imageUrl, status } =
        validation.data;

    const publishedAt = actionType === 'publish' ? new Date() : null;

    const teamMember = await prisma.team.findUnique({
        where: { userId: session.user.id },
    });

    if (!teamMember) {
        return {
            success: false,
            error: 'Profil membre introuvable.',
        };
    }

    try {
        const achievement = await prisma.achievement.create({
            data: {
                title,
                content,
                excerpt,
                date,
                category,
                imageUrl,
                publishedAt,
                status,
                teamId: teamMember.id,
            },
        });

        revalidatePath('/admin/achievements');
        revalidatePath('/achievements');

        return {
            success: true,
            message:
                actionType === 'publish'
                    ? 'Article publié !'
                    : 'Brouillon enregistré.',
        };
    } catch (error: any) {
        return {
            success: false,
            error: 'Une erreur est survenue lors de la création.',
        };
    }
}

export async function getAchievementsAction() {
    try {
        const achievements = await prisma.achievement.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                first_name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        return {
            success: true,
            data: achievements,
        };
    } catch (error) {
        console.error('[ACHIEVEMENT_ERROR]:', error);
        return {
            success: false,
            message: 'Eerror while fetching data',
        };
    }
}

export async function updateAchievementAction(
    achievementId: string,
    data: unknown,
    actionType: 'draft' | 'publish',
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return { success: false, error: 'Vous devez être connecté.' };
        }

        const validated = achievementSchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }

        const { title, content, excerpt, date, category, imageUrl, status } =
            validated.data;

        const publishedAt = actionType === 'publish' ? new Date() : null;

        const teamMember = await prisma.team.findUnique({
            where: { userId: session.user.id },
        });

        if (!teamMember) {
            return {
                success: false,
                error: 'Profil membre introuvable.',
            };
        }

        const updatedAchievement = await prisma.achievement.update({
            where: { id: achievementId },
            data: {
                title,
                content,
                excerpt,
                date,
                category,
                imageUrl,
                publishedAt,
                status,
                teamId: teamMember.id,
            },
        });

        revalidatePath(`/admin/achievements`);
        revalidatePath(`/admin/achievements/${achievementId}`);
        revalidatePath(`/achievements`);

        return { success: true, data: updatedAchievement };
    } catch (error: any) {
        console.error('[ACHIEVEMENT_PATCH_ACTION]', error);
        return {
            success: false,
            message: 'Erreur lors de la mise à jour.',
        };
    }
}

export async function getAchievementByIdAction(achievementId: string) {
    try {
        const achievement = await prisma.achievement.findUnique({
            where: { id: achievementId },
            include: {
                author: {
                    include: { user: true },
                },
            },
        });

        if (!achievement) {
            return { success: false, message: 'Achievement not found non.' };
        }

        return { success: true, data: achievement };
    } catch (error) {
        console.error('[ACHIEVEMENT_GET_ACTION]', error);
        return { success: false, message: 'Error while fetching data.' };
    }
}
