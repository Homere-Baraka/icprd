'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Share2,
    User as UserIcon,
    Briefcase,
    Camera,
    Save,
    ArrowLeft,
} from 'lucide-react';
import useNotification from '@/hooks/use-taost';
import MainLayout from '@/components/admin-panel/main-layout';
import { useTeamValidationForm } from '@/hooks/use-validation-form';
import LoadingSpinner from '@/components/ui/loading-spinner';
import {
    createTeamAction,
    getTeamByIdAction,
    updateTeamAction,
} from '@/actions/admin/user';
import { uploadTeamImage } from '@/lib/upload';
import Link from 'next/link';

interface CreateTeamProps {
    teamId?: string;
}

export default function CreateTeam({ teamId }: CreateTeamProps) {
    const router = useRouter();
    const isEditing = !!teamId;
    const { notifySuccess, notifyError } = useNotification();
    const [isPending, setIsPending] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(isEditing);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useTeamValidationForm();

    useEffect(() => {
        if (!teamId) return;

        const loadTeamData = async () => {
            setIsInitialLoading(true);
            try {
                const result = await getTeamByIdAction(teamId);
                if (result?.success && result.member) {
                    const m = result.member;

                    const defaultSocials = {
                        linkedin: '',
                        twitter: '',
                        youtube: '',
                        facebook: '',
                    };

                    reset({
                        first_name: m.first_name || '',
                        last_name: m.last_name || '',
                        email: m.email || '',
                        role: m.role || '',
                        phone: m.phone || '',
                        bio: m.bio || '',
                        image: m.image || '',
                        socialLinks: {
                            ...defaultSocials,
                            ...(m.socialLinks as object),
                        },
                    } as any);

                    if (m.image) setPreviewImage(m.image);
                } else {
                    notifyError(
                        result?.message || 'Impossible de charger le membre',
                    );
                    router.push('/admin/teams');
                }
            } catch (err) {
                notifyError('Erreur lors du chargement des données');
            } finally {
                setIsInitialLoading(false);
            }
        };
        loadTeamData();
    }, [teamId, reset, router]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localPreview = URL.createObjectURL(file);
        setPreviewImage(localPreview);
        setSelectedFile(file);

        setValue('image', "pending_upload", { shouldValidate: true });
    };

    const onSubmit = async (data: any) => {
        setIsPending(true);
        try {
            let finalImageUrl = data.image;
            
            if (selectedFile) {
                const uploadResult = await uploadTeamImage(selectedFile);
                if (uploadResult.success) {
                    finalImageUrl = uploadResult.url;
                } else {
                    throw new Error("Échec de l'upload de l'image de couverture");
                }
            }

            const finalData = { 
                ...data, 
                image: finalImageUrl 
            };

            const result = isEditing
                ? await updateTeamAction(teamId!, finalData)
                : await createTeamAction(finalData);

            if (result.success) {
                notifySuccess(isEditing ? 'Membre mis à jour' : 'Membre créé');
                router.push('/admin/teams');
                router.refresh();
            } else {
                notifyError(result.error || 'Une erreur est survenue');
            }
        } catch (err) {
            notifyError('Erreur de communication avec le serveur');
        } finally {
            setIsPending(false);
        }
    };

    if (isInitialLoading) {
        return (
            <>
                <div className="flex h-[60vh] items-center justify-center">
                    <LoadingSpinner />
                </div>
            </>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-10">
            {/* Header avec bouton retour */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-100">
                        {isEditing ? 'Modifier le membre' : 'Ajouter un membre'}
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                        Gestion de l'équipe CodePlatform
                    </p>
                </div>
                <Link
                    href="/admin/teams"
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors"
                >
                    <ArrowLeft size={14} /> RETOUR
                </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* SECTION PHOTO */}
                <div className="flex flex-col items-center p-8 bg-slate-50/5 border border-dashed border-white/10 rounded-2xl transition-all hover:bg-slate-50/10">
                    <div className="relative group w-28 h-28 bg-slate-900 border-2 border-white/10 rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-2xl">
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Camera className="text-slate-700" size={32} />
                        )}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera className="text-white" size={24} />
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Photo de profil
                    </p>
                    {errors.image && (
                        <p className="text-red-500 text-[10px] font-bold mt-2 uppercase">
                            {errors.image.message as string}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* SECTION IDENTITÉ */}
                    <div className="space-y-5 p-6 bg-background border border-card-border rounded-2xl">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 mb-2">
                            <UserIcon size={14} /> Informations Personnelles
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <input
                                    {...register('first_name')}
                                    className="w-full p-3.5 bg-card border border-card-border rounded-xl text-sm text-text-main placeholder:text-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                    placeholder="Prénom"
                                />
                                {errors.first_name && (
                                    <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase pl-1">
                                        {errors.first_name.message as string}
                                    </span>
                                )}
                            </div>
                            <div>
                                <input
                                    {...register('last_name')}
                                    className="w-full p-3.5 bg-card border border-card-border rounded-xl text-sm text-text-main placeholder:text-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                    placeholder="Nom"
                                />
                                {errors.last_name && (
                                    <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase pl-1">
                                        {errors.last_name.message as string}
                                    </span>
                                )}
                            </div>
                            <div>
                                <input
                                    {...register('email')}
                                    className="w-full p-3.5 bg-card border border-card-border rounded-xl text-sm text-text-main placeholder:text-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase pl-1">
                                        {errors.email.message as string}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SECTION PROFESSIONNEL */}
                    <div className="space-y-5 p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 mb-2">
                            <Briefcase size={14} /> Poste & Bio
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <input
                                    {...register('role')}
                                    className="w-full p-3.5 bg-card border border-card-border rounded-xl text-sm text-text-main placeholder:text-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                    placeholder="Rôle (ex: Full Stack Developer)"
                                />
                                {errors.role && (
                                    <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase pl-1">
                                        {errors.role.message as string}
                                    </span>
                                )}
                            </div>
                            <div>
                                <input
                                    {...register('phone')}
                                    className="w-full p-3.5 bg-card border border-card-border rounded-xl text-sm text-text-main placeholder:text-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                                    placeholder="Téléphone"
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase pl-1">
                                        {errors.phone.message as string}
                                    </span>
                                )}
                            </div>
                            <div>
                                <textarea
                                    {...register('bio')}
                                    className="w-full p-3.5 bg-card border border-card-border rounded-xl text-sm text-text-main placeholder:text-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all h-[85px] py-3 resize-none"
                                    placeholder="Décrivez brièvement le membre..."
                                />
                                {errors.bio && (
                                    <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase pl-1">
                                        {errors.bio.message as string}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION RÉSEAUX SOCIAUX */}
                <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-5">
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        <Share2 size={14} /> Liens de réseaux sociaux
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            {...register('socialLinks.linkedin')}
                            className="w-full p-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                            placeholder="URL LinkedIn"
                        />
                        <input
                            {...register('socialLinks.twitter')}
                            className="w-full p-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                            placeholder="URL Twitter / X"
                        />
                        <input
                            {...register('socialLinks.youtube')}
                            className="w-full p-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                            placeholder="URL YouTube"
                        />
                        <input
                            {...register('socialLinks.facebook')}
                            className="w-full p-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                            placeholder="URL Facebook"
                        />
                    </div>
                </div>

                {/* BOUTON ACTIONS */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-3 px-12 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-xs tracking-widest transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isPending ? (
                            <>
                                <LoadingSpinner />
                                Enregistrement...
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                {isEditing
                                    ? 'METTRE À JOUR LE MEMBRE'
                                    : 'ENREGISTRER LE MEMBRE'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
