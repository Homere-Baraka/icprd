'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { userRegisterSchema } from '@/lib/prisma-schema';
import { requireAdmin } from '@/lib/auth/admin-guard';

export async function adminRegisterAction(data: unknown) {
    try {
        // await requireAdmin();

        const validated = userRegisterSchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }

        const { username, email, password, role, is_active } = validated.data;

        const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : null;

        const result = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    role,
                    is_active: is_active ?? true,
                },
            });

            const newTeamMember = await tx.team.create({
                data: { userId: newUser.id },
            });

            return newUser;
        });

        return {
            success: true,
            message: 'Account created successfully',
            admin: { id: result.id, email: result.email },
        };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return {
                success: false,
                error: 'This email is already in use',
            };
        }

        console.error('[ADMIN_REGISTER_ERROR]', error);
        return {
            success: false,
            message: 'Failed to create admin account',
        };
    }
}
