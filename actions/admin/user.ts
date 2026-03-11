'use server';

import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';
import { teamSchema } from '@/lib/prisma-schema';

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
            error: 'Erreur lors de la récupération',
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
            error: 'Error while fetching data',
        };
    }
}

// TEAMS
export async function createTeamAction(data: unknown) {
    try {
        // await requireAdmin();

        const validated = teamSchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }

        const {
            first_name,
            last_name,
            email,
            image,
            role,
            bio,
            socialLinks,
            phone,
        } = validated.data;

        await prisma.team.create({
            data: {
                first_name,
                last_name,
                email,
                image,
                bio,
                role,
                socialLinks: socialLinks
                    ? JSON.parse(JSON.stringify(socialLinks))
                    : null,
                phone,
            },
        });

        return {
            success: true,
            message: 'Team member created successfully',
        };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return {
                success: false,
                error: 'This email is already in use',
            };
        }

        console.error('[TEAM_REGISTER_ERROR]', error);
        return {
            success: false,
            error: 'Failed to create team member',
        };
    }
}

export async function getTeamsAction() {
    try {
        const members = await prisma.team.findMany({
            orderBy: { createdAt: 'desc' },
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
            where: { id: teamId },
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
