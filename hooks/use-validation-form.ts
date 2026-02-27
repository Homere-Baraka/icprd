'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    UserLoginInput,
    UserLoginSchema,
    UserRegisterInput,
    UserRegisterSchema,
} from '@/lib/prisma-schema';

/*====== ADMIN AUTH VALIDATION =======*/

export const useUserRegisterValidationForm = () => {
    const form = useForm<UserRegisterInput>({
        resolver: zodResolver(UserRegisterSchema),
    });

    return form;
};

export const useUserLoginValidationForm = () => {
    const form = useForm<UserLoginInput>({
        resolver: zodResolver(UserLoginSchema),
    });

    return form;
};
