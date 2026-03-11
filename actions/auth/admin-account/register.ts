'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { userRegisterSchema } from '@/lib/prisma-schema';

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

        const { username, email, password, is_active } = validated.data;

        const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : null;

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                is_active: is_active ?? true,
            },
        });

        return {
            success: true,
            message: 'Account created successfully',
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
