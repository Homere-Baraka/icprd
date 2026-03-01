'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth/options';
import { getServerSession } from 'next-auth';
import { postSchema } from '@/lib/prisma-schema';

export async function createPostAction(
    data: unknown,
    actionType: 'draft' | 'publish',
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return { success: false, error: 'Vous devez être connecté.' };
    }

    const validation = postSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors,
        };
    }

    const { title, content, excerpt, category, imageUrl, views } =
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
        const course = await prisma.post.create({
            data: {
                title,
                content,
                excerpt,
                category,
                imageUrl,
                publishedAt,
                views,
                teamId: teamMember.id,
            },
        });

        revalidatePath('/admin/posts');
        revalidatePath('/blogs');

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

export async function getPostsAction() {
    try {
        const courses = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                team: {
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
            data: courses,
        };
    } catch (error) {
        console.error('Erreur Fetch:', error);
        return {
            success: false,
            message: 'Erreur lors de la récupération',
        };
    }
}

export async function updatePostAction(
    postId: string,
    data: unknown,
    actionType: 'draft' | 'publish',
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return { success: false, error: 'Vous devez être connecté.' };
        }

        const validated = postSchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }

        const { title, content, excerpt, category, imageUrl, views } =
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

        const updatedCourse = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                content,
                excerpt,
                category,
                imageUrl,
                publishedAt,
                views,
                teamId: teamMember.id,
            },
        });

        revalidatePath(`/admin/posts`);
        revalidatePath(`/admin/posts/${postId}`);
        revalidatePath(`/blog`);

        return { success: true, data: updatedCourse };
    } catch (error: any) {
        console.error('[COURSE_PATCH_ACTION]', error);
        return {
            success: false,
            message: 'Erreur lors de la mise à jour.',
        };
    }
}

export async function getPostByIdAction(postId: string) {
    try {
        const course = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                team: {
                    include: { user: true },
                },
            },
        });

        if (!course) {
            return { success: false, message: 'Cours non trouvé' };
        }

        return { success: true, data: course };
    } catch (error) {
        console.error('[POST_GET_ACTION]', error);
        return { success: false, message: 'Erreur lors de la récupération.' };
    }
}
