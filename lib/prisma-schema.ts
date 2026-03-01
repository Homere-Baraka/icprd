import { z } from 'zod';

/*====== AUTH SCHEMA =======*/

export const RoleEnum = z.enum(['USER', 'MEMBER', 'ADMIN']);

export const userRegisterSchema = z.object({
    username: z
        .string()
        .min(3, 'Le nom est trop court')
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Le nom ne doit contenir que des lettres'),
    first_name: z
        .string()
        .min(3, 'Le prénom est trop court')
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Le prénom ne doit contenir que des lettres')
        .optional()
        .or(z.literal('')),
    last_name: z
        .string()
        .min(3, 'Le nom de famille est trop court')
        .regex(
            /^[a-zA-ZÀ-ÿ\s]+$/,
            'Le nom de famille ne doit contenir que des lettres',
        )
        .optional()
        .or(z.literal('')),
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
export type userRegisterInput = z.infer<typeof userRegisterSchema>;

// Login validation
export const userLoginSchema = z.object({
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
export type userLoginInput = z.infer<typeof userLoginSchema>;

// BLOG FORM VALIDATION

export const postSchema = z.object({
    title: z
        .string()
        .min(4, 'Le titre est trop court (min 4 caractères)')
        .max(100, 'Le titre est trop long (max 100)'),

    content: z.string().min(15, 'Le contenu doit faire au moins 15 caractères'),

    excerpt: z.string().optional().or(z.literal('')),

    imageUrl: z.preprocess(
        (val) => (val === null ? '' : val),
        z.string().optional().or(z.literal('')),
    ),

    category: z.string().min(1, 'Veuillez choisir une catégorie').optional(),
    views: z.number().int().default(0),
});

export type postFormValues = z.infer<typeof postSchema>;
export const updatePostSchema = postSchema.partial();
