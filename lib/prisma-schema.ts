import { z } from 'zod';

/*====== AUTH SCHEMA =======*/

export const RoleEnum = z.enum(['USER', 'MEMBER', 'ADMIN']);

export const UserRegisterSchema = z.object({
    username: z
        .string()
        .min(3, 'Le nom est trop court')
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Le nom ne doit contenir que des lettres'),
    first_name: z
        .string()
        .min(3, 'Le prénom est trop court')
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Le prénom ne doit contenir que des lettres')
        .optional(),
    last_name: z
        .string()
        .min(3, 'Le nom de famille est trop court')
        .regex(
            /^[a-zA-ZÀ-ÿ\s]+$/,
            'Le nom de famille ne doit contenir que des lettres',
        )
        .optional(),
    email: z
        .string()
        .email("Format d'email invalide")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "L'email contient des caractères non autorisés",
        ),
    password: z
        .string()
        .min(8, 'Mot de passe trop court')
        .regex(/[A-Z]/, 'Au moins une majuscule')
        .regex(/[0-9]/, 'Au moins un chiffre'),
    role: RoleEnum.default('USER'),
    is_active: z.boolean().default(true),
});
export type UserRegisterInput = z.infer<typeof UserRegisterSchema>;

// Login validation
export const UserLoginSchema = z.object({
    email: z
        .string()
        .email("Format d'email invalide")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "L'email contient des caractères non autorisés",
        ),
    password: z
        .string()
        .min(8, 'Mot de passe trop court')
        .regex(/[A-Z]/, 'Au moins une majuscule')
        .regex(/[0-9]/, 'Au moins un chiffre'),
});
export type UserLoginInput = z.infer<typeof UserLoginSchema>;
