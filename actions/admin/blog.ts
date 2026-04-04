'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth/options';
import { getServerSession } from 'next-auth';
import { blogSchema } from '@/lib/prisma-schema';
import { cleanupBlogFiles } from '@/utils/clean-file';
import { getFingerprint } from '@/utils/fingerprint';

export async function createBlogAction(
    data: unknown,
    actionType: 'draft' | 'publish',
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return { success: false, error: 'Vous devez être connecté.' };
    }

    const validation = blogSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors,
        };
    }

    const { title, contents, category, imageUrl, views } = validation.data;
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

    const lastBlog = await prisma.blog.findFirst({
        orderBy: { order: 'desc' },
        select: { order: true },
    });
    const nextOrder = lastBlog ? lastBlog.order + 1 : 1;

    try {
        await prisma.blog.create({
            data: {
                title,
                category,
                imageUrl,
                publishedAt,
                order: nextOrder,
                views,
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
            error: 'An error was encountered during the creation process.',
        };
    }
}

export async function getBlogsAction() {
    try {
        const posts = await prisma.blog.findMany({
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
            data: posts,
        };
    } catch (error) {
        console.error('[POSTS_ERROR]:', error);
        return {
            success: false,
            message: 'Error while fetching data.',
        };
    }
}

export async function getBlogHeadlineAction() {
    try {
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

        const post = await prisma.blog.findFirst({
            orderBy: [{ views: 'desc' }, { createdAt: 'desc' }],
            where: {
                views: { gt: 0 },
                createdAt: { gte: fifteenDaysAgo },
            },
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
            data: post,
        };
    } catch (error) {
        console.error('[POST_HEADLINE_ERROR]:', error);
        return {
            success: false,
            error: 'Error while fetching data.',
        };
    }
}

export async function updateBlogAction(
    blogId: string,
    data: unknown,
    actionType: 'draft' | 'publish',
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return { success: false, error: 'Connexion is required.' };
        }

        const validated = blogSchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }

        const { title, contents, category, imageUrl, views } = validated.data;
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

        const updatedPost = await prisma.blog.update({
            where: { id: blogId },
            data: {
                title,
                category,
                imageUrl,
                publishedAt,
                views,
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

        revalidatePath(`/admin/blogs`);
        revalidatePath(`/admin/blogs/${blogId}`);
        revalidatePath(`/blog`);

        return { success: true, data: updatedPost };
    } catch (error: any) {
        console.error('[BLOGS_ACTION]', error);
        return {
            success: false,
            message: 'Erreur lors de la mise à jour.',
        };
    }
}

export async function getBlogByIdAction(req: Request, blogId: string) {
    try {
        const fingerprint = getFingerprint(req);

        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            include: {
                author: true,
                contents: true,
            },
        });

        if (!blog) {
            return { success: false, message: 'Post not found' };
        }

        let fingerprints: string[] = [];

        if (Array.isArray(blog.fingerprint)) {
            fingerprints = blog.fingerprint as any;
        } else if (typeof blog.fingerprint === 'string') {
            try {
                fingerprints = JSON.parse(blog.fingerprint);
            } catch {
                fingerprints = [];
            }
        }

        const alreadyViewed = fingerprints.includes(fingerprint);

        console.log('BlogViewd fingerprint : ', blog.fingerprint);
        console.log('alreadyViewed : ', alreadyViewed);

        if (!alreadyViewed) {
            await prisma.blog.update({
                where: { id: blogId },
                data: {
                    views: { increment: 1 },
                    fingerprint: JSON.stringify([...fingerprints, fingerprint]),
                },
            });
        }

        return { success: true, data: blog };
    } catch (error) {
        console.error('[POST_GET_ACTION]', error);
        return { success: false, message: 'Error while fetching data.' };
    }
}

export async function deleteBlogAction(blogId: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return { success: false, error: 'Forbiden' };

        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            include: { contents: true },
        });

        if (!blog) return { success: false, error: 'Blog not found' };

        const htmlStrings = blog.contents.map((c) => c.value as string);
        await cleanupBlogFiles(blog.imageUrl, htmlStrings);

        await prisma.blog.delete({
            where: { id: blogId },
        });

        revalidatePath('/admin/blogs');
        return {
            success: true,
            message: 'Blog delete successeffuly.',
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'Error while deleting blog.',
        };
    }
}
