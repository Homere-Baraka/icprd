'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    UserLoginInput,
    UserLoginSchema,
} from '@/lib/prisma-schema';


/*====== ADMIN AUTH VALIDATION =======*/

export const useUserLoginValidationForm = () => {
    const form = useForm<UserLoginInput>({
        resolver: zodResolver(UserLoginSchema),
    });

    return form;
};
