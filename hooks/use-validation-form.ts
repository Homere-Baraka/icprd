'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    userLoginInput,
    userLoginSchema,
    userRegisterInput,
    userRegisterSchema,
    postSchema,
    postFormValues,
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

/*====== POST VALIDATION =======*/

export const usePostValidation = () => {
    const form = useForm<postFormValues>({
        resolver: zodResolver(postSchema),
    });

    return form;
};
