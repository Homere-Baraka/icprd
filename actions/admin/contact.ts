'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { contactMessageSchema } from '@/lib/prisma-schema';

export async function createContactAction(data: unknown) {
    const validation = contactMessageSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors,
        };
    }

    const { name, email, subject, message } = validation.data;

    try {
        await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        revalidatePath('/admin/messages');

        return {
            success: true,
            message: 'Contact send successfully',
        };
    } catch (error: any) {
        return {
            success: false,
            error: 'An error was encountered during the send contact informations.',
        };
    }
}

export async function getContactMessagesAction() {
    try {
        const contactMessages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return {
            success: true,
            data: contactMessages,
        };
    } catch (error) {
        console.error('[CONTACT_MESSAGEs_ERROR]:', error);
        return {
            success: false,
            message: 'Error while fetching data.',
        };
    }
}

export async function getContactMessageByIdAction(contactId: string) {
    try {
        const contactMessage = await prisma.contactMessage.findUnique({
            where: { id: contactId },
        });

        if (!contactMessage) {
            return { success: false, message: 'ContactMessage not found' };
        }

        return { success: true, data: contactMessage };
    } catch (error) {
        console.error('[CONTACT_MESSAGE_ERROR]', error);
        return { success: false, message: 'Error while fetching data.' };
    }
}
