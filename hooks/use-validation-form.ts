'use client';

import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    userLoginInput,
    userLoginSchema,
    updateProfileFormValues,
    profilePatchSchema,
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

/*====== ADMIN SETTING VALIDATION =======*/
export const useProfileValidationForm = () => {
    const form = useForm<updateProfileFormValues>({
        resolver: zodResolver(
            profilePatchSchema,
        ) as unknown as Resolver<updateProfileFormValues>,
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
        resolver: zodResolver(
            teamSchema,
        ) as unknown as Resolver<teamFormValues>,
    });

    return form;
};

/*====== POST VALIDATION =======*/
export const usePostValidation = () => {
    const form = useForm<blogFormValues>({
        resolver: zodResolver(
            blogSchema,
        ) as unknown as Resolver<blogFormValues>,
    });

    return form;
};

/*====== ACHIEVEMENT VALIDATION =======*/
export const useAchievementValidation = () => {
    const form = useForm<achievementFormValues>({
        resolver: zodResolver(
            achievementSchema,
        ) as unknown as Resolver<achievementFormValues>,
        defaultValues: {
            province: 0,
            revenue: 0.0,
            countries: 0,
        },
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
