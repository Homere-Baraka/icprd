import { z } from 'zod';

/*====== AUTH SCHEMA =======*/
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
    is_active: z.boolean().default(true),
});
export type userRegisterInput = z.infer<typeof userRegisterSchema>;

// LOGIN VALIDATION
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

// TEAM VALIDATION
export const teamSchema = z.object({
    first_name: z
        .string()
        .min(2, 'Le prénom est trop court')
        .nullable()
        .optional(),

    last_name: z.string().min(2, 'Le nom est trop court').nullable().optional(),

    email: z.string().email("Format d'email invalide").nullable().optional(),

    image: z.preprocess(
        (val) => (val === null ? '' : val),
        z.string().optional().or(z.literal('')),
    ),

    role: z.string().max(50, 'Le rôle est trop long').nullable().optional(),

    bio: z.string().max(500, 'La bio est trop longue').nullable().optional(),

    socialLinks: z.record(z.string(), z.string().url()).nullable().optional(),

    phone: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, 'Numéro de téléphone invalide')
        .nullable()
        .optional(),
});
export type teamFormValues = z.infer<typeof teamSchema>;

// BLOG FORM VALIDATION
export const blogSchema = z.object({
    title: z
        .string()
        .min(4, 'Le titre est trop court (min 4 caractères)')
        .max(100, 'Le titre est trop long (max 100)'),

    excerpt: z.string().optional().or(z.literal('')),

    imageUrl: z.preprocess(
        (val) => (val === null ? '' : val),
        z.string().optional().or(z.literal('')),
    ),

    category: z
        .string()
        .min(1, 'Veuillez choisir une catégorie de votre blog')
        .optional(),
    views: z.number().int().default(0),
    contents: z
        .string()
        .min(10, 'Le contenu doit faire au moins 15 caractères'),
});

export type blogFormValues = z.infer<typeof blogSchema>;
export const updateBlogSchema = blogSchema.partial();

// ACHIEVEMENT FORM VALIDATION
export const AchievementEnum = z.enum(['PENDING', 'FINISHED', 'CANCELED']);
export const achievementSchema = z.object({
    title: z
        .string()
        .min(4, 'Le titre est trop court (min 4 caractères)')
        .max(100, 'Le titre est trop long (max 100)'),

    date: z.coerce
        .date()
        .refine((d) => !isNaN(d.getTime()), {
            message: 'Veuillez sélectionner une date valide',
        })
        .refine((d) => d <= new Date(), {
            message: 'La date ne peut pas être dans le futur',
        })
        .optional()
        .or(z.literal('')),

    imageUrl: z.preprocess(
        (val) => (val === null ? '' : val),
        z.string().optional().or(z.literal('')),
    ),

    category: z
        .string()
        .min(1, 'Veuillez choisir une catégorie de votre réalisation')
        .optional(),

    revenue: z.coerce.number().optional().default(0),
    province: z.coerce.number().int().optional().default(0),
    countries: z.coerce.number().int().optional().default(0),

    status: AchievementEnum.default('PENDING'),
    contents: z
        .string()
        .min(10, 'Le contenu doit faire au moins 15 caractères'),
});

export type achievementFormValues = z.infer<typeof achievementSchema>;
export const updateAchievementSchema = achievementSchema.partial();

// CONTACT VALIDATION
export const contactMessageSchema = z.object({
    name: z
        .string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .max(50, 'Le nom est trop long')
        .trim(),

    email: z.string().email("Format d'email invalide").trim().toLowerCase(),

    subject: z
        .string()
        .min(3, "L'objet doit contenir au moins 3 caractères")
        .max(100, "L'objet est trop long")
        .trim(),

    message: z
        .string()
        .min(10, 'Le message est trop court (min. 10 caractères)')
        .max(2000, 'Le message ne peut pas dépasser 2000 caractères')
        .trim(),
});
export type contactMessageInput = z.infer<typeof contactMessageSchema>;

// NEWS LETTER VALIDATION
export const newsletterSchema = z.object({
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    name: z.string().optional().or(z.literal('')),
});
export type newsletterFormValues = z.infer<typeof newsletterSchema>;
