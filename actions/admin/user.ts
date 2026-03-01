'use server';

import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';

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
        console.error('Error :', error);
        return {
            success: false,
            message: 'Error while fetching data',
        };
    }
}

// TEAMS
// TEAMS
export async function getTeamsAction() {
    try {
        const members = await prisma.team.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: true,
                _count: {
                    select: {
                        posts: true,
                        achievements: true,
                        testimonials: true,
                    },
                },
            },
        });

        return {
            success: true,
            data: members,
        };
    } catch (error) {
        console.error('Team Error:', error);
        return {
            success: false,
            error: 'Error while fetching data',
        };
    }
}

export async function getTeamByIdAction(teamId: string) {
    try {
        if (!teamId) return null;

        const member = await prisma.team.findUnique({
            where: { userId: teamId },
            include: { user: true },
        });
        if (!member) {
            return { success: false, message: 'Member not found' };
        }

        return {
            success: true,
            member: member,
        };
    } catch (error) {
        console.error('Error :', error);
        return {
            success: false,
            error: 'Error while fetching data',
        };
    }
}
