'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function resetPasswordAction(data: {
    token?: string;
    email?: string;
    password?: string;
}) {
    const { token, email, password } = data;

    if (!token || !email || !password) {
        return { error: 'Missing data' };
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return { error: 'Invalid request' };
    }

    const resetRecord = await prisma.passwordReset.findFirst({
        where: {
            userId: user.id,
            expiresAt: { gt: new Date() },
        },
    });

    if (!resetRecord) {
        return { error: 'Token expired' };
    }

    const isValid = await bcrypt.compare(token, resetRecord.token);

    if (!isValid) {
        return { error: 'Invalid token' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    await prisma.passwordReset.delete({
        where: { id: resetRecord.id },
    });

    return { success: true };
}
