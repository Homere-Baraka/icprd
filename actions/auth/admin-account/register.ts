'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { UserRegisterSchema } from '@/lib/prisma-schema';
import { requireAdmin } from '@/lib/auth/admin-guard';

export async function adminRegisterAction(data: unknown) {
    try {
        // await requireAdmin();

        const validated = UserRegisterSchema.safeParse(data);

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

        const adminData = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role,
                is_active: is_active ?? true,
            },
        });

        return {
            success: true,
            message: 'Admin account created successfully',
            admin: { id: adminData.id, email: adminData.email },
        };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { success: false, message: 'This email is already in use' };
        }

        console.error('[ADMIN_REGISTER_ERROR]', error);
        return {
            success: false,
            message: 'Failed to create admin account',
        };
    }
}
