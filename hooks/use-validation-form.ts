'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    userLoginInput,
    userLoginSchema,
    userRegisterInput,
    userRegisterSchema,
    teamSchema,
    teamFormValues,
    blogSchema,
    blogFormValues,
    achievementFormValues,
    achievementSchema,
    contactMessageInput,
    contactMessageSchema,
    newsletterFormValues,
    newsletterSchema,
} from '@/lib/prisma-schema';

/*====== ADMIN AUTH VALIDATION =======*/
export const useUserRegisterValidationForm = () => {
    const form = useForm<userRegisterInput>({
        resolver: zodResolver(userRegisterSchema),
    });

    return form;
};

export const useUserLoginValidationForm = () => {
    const form = useForm<userLoginInput>({
        resolver: zodResolver(userLoginSchema),
    });

    return form;
};

/*====== TEAM VALIDATION =======*/
export const useTeamValidationForm = () => {
    const form = useForm<teamFormValues>({
        resolver: zodResolver(teamSchema),
    });

    return form;
};

/*====== POST VALIDATION =======*/
export const usePostValidation = () => {
    const form = useForm<blogFormValues>({
        resolver: zodResolver(blogSchema),
    });

    return form;
};

/*====== ACHIEVEMENT VALIDATION =======*/
export const useAchievementValidation = () => {
    const form = useForm<achievementFormValues>({
        resolver: zodResolver(achievementSchema),
    });
    return form;
};

/*======= CONTACT VALIDATION ======*/
export const useContactValidation = () => {
    const form = useForm<contactMessageInput>({
        resolver: zodResolver(contactMessageSchema),
    });
    return form;
};

/*======= NEWSLETTER VALIDATION ======*/
export const useNewsletterValidation = () => {
    const form = useForm<newsletterFormValues>({
        resolver: zodResolver(newsletterSchema),
    });
    return form;
};
