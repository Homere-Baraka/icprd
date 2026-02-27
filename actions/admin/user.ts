'use server';

import { prisma } from '@/lib/prisma';

export async function getUsersAction() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { created_at: 'desc' },
        });

        return {
            success: true,
            data: users,
        };
    } catch (error) {
        console.error('Erreur Fetch:', error);
        return {
            success: false,
            message: 'Erreur lors de la récupération',
        };
    }
}

export async function getUserByIdAction(userId: string) {
    try {
        if (!userId) return null;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        return {
            success: true,
            user: user,
        };
    } catch (error) {
        console.error('Erreur Fetch:', error);
        return {
            success: false,
            message: 'Erreur lors de la récupération',
        };
    }
}
