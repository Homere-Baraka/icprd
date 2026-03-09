'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { newsletterSchema } from '@/lib/prisma-schema';

export async function subscribeToNewsletter(data: unknown) {
    const validation = newsletterSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            error: 'Invalid data provided. Please check your email format.',
        };
    }

    const { email, name } = validation.data;

    try {
        const subscriber = await prisma.newsletter.create({
            data: {
                email,
                name: name || null,
            },
        });

        revalidatePath('/admin/newsletter');

        return {
            success: true,
            message: 'Success! You have been subscribed to our newsletter.',
            data: subscriber,
        };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return {
                success: false,
                error: 'This email is already subscribed to our newsletter.',
            };
        }

        console.error('Newsletter Subscription Error:', error);
        return {
            success: false,
            error: 'An unexpected error occurred. Please try again later.',
        };
    }
}
