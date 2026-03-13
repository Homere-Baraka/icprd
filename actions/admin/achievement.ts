'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth/options';
import { getServerSession } from 'next-auth';
import { achievementSchema } from '@/lib/prisma-schema';
import { cleanupBlogFiles } from '@/utils/clean-file';

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

    const {
        title,
        contents,
        date,
        category,
        imageUrl,
        revenue,
        countries,
        province,
        status,
    } = validation.data;

    const publishedAt = actionType === 'publish' ? new Date() : null;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    if (!user) {
        return {
            success: false,
            error: 'Profil membre introuvable.',
        };
    }

    const lastAchievement = await prisma.achievement.findFirst({
        orderBy: { order: 'desc' },
        select: { order: true },
    });
    const nextOrder = lastAchievement ? lastAchievement.order + 1 : 1;

    try {
        await prisma.achievement.create({
            data: {
                title,
                date,
                category,
                imageUrl,
                publishedAt,
                status,
                revenue,
                countries,
                province,
                order: nextOrder,
                userId: user.id,

                contents: {
                    create: [
                        {
                            type: 'PARAGRAPH',
                            value: contents,
                            order: 1,
                        },
                    ],
                },
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
                    select: {
                        username: true,
                        first_name: true,
                        email: true,
                    },
                },
                contents: true,
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

        const {
            title,
            contents,
            date,
            category,
            imageUrl,
            revenue,
            province,
            countries,
            status,
        } = validated.data;

        const publishedAt = actionType === 'publish' ? new Date() : null;

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return {
                success: false,
                error: 'Profil membre introuvable.',
            };
        }

        const updatedAchievement = await prisma.achievement.update({
            where: { id: achievementId },
            data: {
                title,
                date,
                category,
                imageUrl,
                publishedAt,
                status,
                revenue,
                province,
                countries,
                userId: user.id,

                contents: {
                    deleteMany: {},
                    create: [
                        {
                            type: 'PARAGRAPH',
                            value: contents,
                            order: 1,
                        },
                    ],
                },
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
                author: true,
                contents: true,
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

export async function deleteAchievementAction(achievementId: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return { success: false, error: 'Non authentifié' };

        const achievement = await prisma.achievement.findUnique({
            where: { id: achievementId },
            include: { contents: true },
        });

        if (!achievement) return { success: false, error: 'Blog non trouvé' };

        const htmlStrings = achievement.contents.map((c) => c.value as string);
        await cleanupBlogFiles(achievement.imageUrl, htmlStrings);

        await prisma.achievement.delete({
            where: { id: achievementId },
        });

        revalidatePath('/admin/achivements');
        return { success: true, message: 'Achievement deleted successfully.' };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'Erreur technique lors de la suppression.',
        };
    }
}
