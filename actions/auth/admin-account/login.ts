'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { UserLoginSchema } from '@/lib/prisma-schema';
// import { requireAdmin } from '@/lib/auth/admin-guard';

export async function adminLoginAction(data: unknown) {
    try {
        // await requireAdmin();

        const validated = UserLoginSchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }

        const { email, password } = validated.data;

        const admin = await prisma.user.findUnique({ where: { email } });

        if (!admin) {
            return { success: false, message: 'Invalid credentials' };
        }

        const isValid = await bcrypt.compare(password, admin.password || '');

        if (!isValid) {
            return { success: false, message: 'Invalid credentials' };
        }

        return {
            success: true,
            message: 'Admin logged in successfully',
            admin: { id: admin.id, email: admin.email, username: admin.username },
        };
    } catch (error) {
        console.error('[ADMIN_LOGIN_ERROR]', error);
        return { success: false, message: 'Internal server error' };
    }
}
