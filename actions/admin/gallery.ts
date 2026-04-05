'use server';

import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';
import { gallerySchema, teamSchema } from '@/lib/prisma-schema';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/admin-guard';
import { deleteFileFromStorage } from '@/lib/file-helper';

export async function createGalleryAction(data: unknown) {
    try {
        await requireAdmin();

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return { success: false, error: 'Vous devez être connecté.' };
        }

        const validated = gallerySchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }

        const { title, description, imageUrl, category } = validated.data;

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return {
                success: false,
                error: 'Profil membre introuvable.',
            };
        }

        await prisma.gallery.create({
            data: {
                title,
                description,
                imageUrl,
                category,
                userId: user.id,
            },
        });

        return {
            success: true,
            message: 'Gallery item created successfully',
        };
    } catch (error: any) {
        console.error('[GALLERY_CREATE_ERROR]', error);
        return {
            success: false,
            error: 'Failed to create gallery item',
        };
    }
}

export async function updateGalleryAction(galleryId: string, data: unknown) {
    try {
        await requireAdmin();

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return { success: false, error: 'Vous devez être connecté.' };
        }

        const validated = gallerySchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }

        const { title, description, imageUrl, category } = validated.data;

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return {
                success: false,
                error: 'Profil membre introuvable.',
            };
        }

        await prisma.gallery.update({
            where: { id: galleryId },
            data: {
                title,
                description,
                imageUrl,
                category,
                userId: user.id,
            },
        });

        return {
            success: true,
            message: 'Gallery item updated successfully',
        };
    } catch (error: any) {
        console.error('[GALLERY_UPDATE_ERROR]', error);
        return {
            success: false,
            error: 'Failed to update gallery item',
        };
    }
}

export async function getGalleriesAction() {
    try {
        const members = await prisma.gallery.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return {
            success: true,
            data: members,
        };
    } catch (error) {
        console.error('Gallery Error:', error);
        return {
            success: false,
            error: 'Error while fetching data',
        };
    }
}

export async function getGalleryByIdAction(galleryId: string) {
    try {
        if (!galleryId) return null;

        const gallery = await prisma.gallery.findUnique({
            where: { id: galleryId },
        });
        if (!gallery) {
            return { success: false, message: 'Gallery item not found' };
        }

        return {
            success: true,
            data: gallery,
        };
    } catch (error) {
        console.error('Error :', error);
        return {
            success: false,
            error: 'Error while fetching data',
        };
    }
}

export async function deleteGalleryAction(galleryId: string) {
    await requireAdmin();

    try {
        const gallery = await prisma.gallery.findUnique({
            where: { id: galleryId },
            select: { imageUrl: true },
        });

        if (!gallery) {
            return { success: false, error: 'Gallery item not found.' };
        }

        if (gallery?.imageUrl) {
            await deleteFileFromStorage(gallery.imageUrl);
            console.log('File deleted from storage');
        }

        await prisma.gallery.delete({
            where: { id: galleryId },
        });

        revalidatePath('/admin/gallery');

        return {
            success: true,
            message: 'Gallery item deleted successfully.',
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'Error while deleting gallery item.',
        };
    }
}
