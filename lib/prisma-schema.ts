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

// SETTING VALIDATION
export const profilePatchSchema = z
    .object({
        username: z
            .string()
            .min(3, 'Trop court')
            .max(20)
            .regex(/^[a-zA-Z0-9_]+$/)
            .optional()
            .or(z.literal('')),

        first_name: z.string().max(50).optional().or(z.literal('')),

        last_name: z.string().max(50).optional().or(z.literal('')),

        email: z.string().email('Format invalide').optional().or(z.literal('')),

        image: z.preprocess(
            (val) => (val === null ? '' : val),
            z.string().optional().or(z.literal('')),
        ),

        passwordSchema : z
            .object({
                oldPassword: z
                .string()
                .optional()
                .or(z.literal('')),
                
                newPassword: z
                .string()
                .optional()
                .or(z.literal('')),
            })
            .superRefine((data, ctx) => {
                if (data.oldPassword && data.oldPassword.length > 0) {
                
                if (!data.newPassword || data.newPassword.length === 0) {
                    ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['newPassword'],
                    message: "Le nouveau mot de passe est requis si l'ancien est fourni",
                    });
                }
            
                if (data.newPassword) {
                    if (data.newPassword.length < 8) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            path: ['newPassword'],
                            message: "Le mot de passe doit faire au moins 8 caractères",
                        });
                    }

                    if (!/[A-Z]/.test(data.newPassword)) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            path: ['newPassword'],
                            message: "Au moins une majuscule",
                        });
                    }
                    if (!/[0-9]/.test(data.newPassword)) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            path: ['newPassword'],
                            message: "Au moins un chiffre",
                        });
                    }
                }
            }
        })
    })
// export const updateProfileSchema = profilePatchSchema.partial();
export type updateProfileFormValues = z.infer<typeof profilePatchSchema>;


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

    socialLinks: z
        .record(z.string(), z.string().url().or(z.literal('')))
        .optional(),

    phone: z
        .string()
        .refine((val) => val.startsWith('+'), {
            message:
                "Le numéro de téléphone doit commencer par l'indicatif pays (+)",
        })
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

    date: z.preprocess(
        (val) => (val === '' || val === null ? undefined : val),
        z.coerce
            .date()
            .refine((d) => !isNaN(d.getTime()), {
                message: 'Veuillez sélectionner une date valide',
            })
            .refine((d) => d <= new Date(), {
                message: 'La date ne peut pas être dans le futur',
            })
            .optional(),
    ),
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

// GALLERY VALIDATION

// Configuration des limites
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

export const gallerySchema = z.object({
    title: z
        .string()
        .min(3, 'Le titre doit contenir au moins 3 caractères')
        .max(100, 'Le titre est trop long'),

    category: z
        .string()
        .min(2, 'Veuillez sélectionner ou entrer une catégorie'),

    description: z
        .string()
        .max(500, 'La description ne doit pas dépasser 500 caractères')
        .optional()
        .or(z.literal('')),

    imageUrl: z
        .any()
        .refine((val) => {
            if (!val) return false;
            if (typeof val === 'string' && val.length > 0) return true;
            if (val instanceof File) return val.size > 0;
            return false;
        }, 'Une image est requise')
        .refine((val) => {
            if (val instanceof File) return val.size <= MAX_FILE_SIZE;
            return true; 
        }, `L'image est trop lourde (Max 5Mo)`)
        .refine((val) => {
            if (val instanceof File) return ACCEPTED_IMAGE_TYPES.includes(val.type);
            return true;
        }, 'Seuls les formats .jpg, .png et .webp sont acceptés'),
});
export type GalleryFormValues = z.infer<typeof gallerySchema>;
