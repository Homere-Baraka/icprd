'use server';

import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export async function requestVerifyEmailAction(email: string) {
    if (!email) {
        return { error: 'Email is required' };
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return {
            success: false,
            error: "user with this email doesn't exist",
        };
    }

    const randomToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(randomToken, 10);

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.passwordReset.upsert({
        where: { userId: user.id },
        update: {
            token: hashedToken,
            expiresAt,
        },
        create: {
            userId: user.id,
            token: hashedToken,
            expiresAt,
        },
    });

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${randomToken}&email=${email}`;

    await transporter.sendMail({
        from: `"ICPRD Admin" <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: 'Password reset request',
        html: `
        <p>
            Click <a href="${resetLink}">here</a> to reset your password.
            This link is valid for 30 minutes.
        </p>
        `,
    });

    return { success: true };
}
