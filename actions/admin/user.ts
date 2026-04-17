'use server';

import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';
import { teamSchema } from '@/lib/prisma-schema';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/admin-guard';
import { deleteFileFromStorage } from '@/lib/file-helper';

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

export async function updateTeamAction(teamId: string, data: unknown) {
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

        await prisma.team.update({
            where: { id: teamId },
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
            message: 'Team member updated successfully',
        };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return {
                success: false,
                error: 'This email is already in use',
            };
        }

        console.error('[TEAM_UPDATE_ERROR]', error);
        return {
            success: false,
            error: 'Failed to update team member',
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

export async function deleteTeamAction(teamId: string) {
    await requireAdmin();

    try {
        const member = await prisma.team.findUnique({
            where: { id: teamId },
            select: { image: true },
        });

        if (!member) {
            return { success: false, error: 'Membre introuvable.' };
        }

        if (member?.image) {
            await deleteFileFromStorage(member.image);
            console.log('File deleted from storage');
        }

        await prisma.team.delete({
            where: { id: teamId },
        });

        revalidatePath('/admin/teams');

        return {
            success: true,
            message: 'Member delete successeffuly.',
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'Error while deleting member.',
        };
    }
}

// ADMIN PROFILE
export async function updateAdminProfileAction(formData: any) {
    await requireAdmin();

    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return { success: false, error: 'Forbidden' };
        }

        const userId = session.user.id;

        const { passwordSchema, ...dataToUpdate } = formData;

        const oldPassword = passwordSchema?.oldPassword;
        const newPassword = passwordSchema?.newPassword;

        if (oldPassword && newPassword) {
            const currentUser = await prisma.user.findUnique({
                where: { id: userId },
                select: { password: true }
            });

            if (!currentUser || !currentUser.password) {
                return { success: false, error: 'Utilisateur introuvable' };
            }
            const isMatch = await bcrypt.compare(oldPassword, currentUser.password);
            
            if (!isMatch) {
                return { success: false, error: 'L’ancien mot de passe est incorrect.' };
            }
            dataToUpdate.password = await bcrypt.hash(newPassword, 10);
        }

        await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
        });

        revalidatePath('/settings');
        revalidatePath('/admin');

        return { success: true, message: 'User updated successfully' };

    } catch (error: any) {
        console.error('Prisma Patch Error:', error);

        if (error.code === 'P2002') {
            return {
                success: false,
                error: 'This email or username is already in use.',
            };
        }

        return {
            success: false,
            error: 'An error occurred while updating the database.',
        };
    }
}