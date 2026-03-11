'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    UserPlus,
    Mail,
    Lock,
    Shield,
    Share2,
    User as UserIcon,
    ArrowLeft,
    Briefcase,
    Phone,
    FileText,
    Globe,
    ImageIcon,
    Camera,
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import useNotification from '@/hooks/use-taost';
import MainLayout from '@/components/admin-panel/main-layout';
import { useTeamValidationForm } from '@/hooks/use-validation-form';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { createTeamAction } from '@/actions/admin/user';
import { uploadTeamImage } from '@/lib/upload';

export default function AddMemberForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { notifySuccess, notifyError } = useNotification();
    const [error, setError] = useState<string | undefined | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useTeamValidationForm();

    const onSubmit = async (data: any) => {
        startTransition(async () => {
            const result = await createTeamAction(data);
            if (result.success) {
                notifySuccess(result.message as any);
                window.location.href = '/admin/teams';
            } else {
                setError(result.error);
                notifyError(result.message as string);
            }
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const localPreview = URL.createObjectURL(file);
            setPreviewImage(localPreview);

            const result = await uploadTeamImage(file);

            if (result.success) {
                setPreviewImage(result.url);
                setValue('image', result.url, { shouldValidate: true });
                notifySuccess('Image téléchargée avec succès');
            } else {
                notifyError("Échec de l'upload");
                setPreviewImage(null);
            }
        }
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto p-6 lg:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-col items-center p-6 bg-slate-50/5 border border-dashed border-card-border rounded-xl">
                        <div className="relative w-24 h-24 bg-card border border-card-border rounded-full flex items-center justify-center mb-4 overflow-hidden">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Camera className="text-slate-500" size={30} />
                            )}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                        </div>
                        <p className="text-[11px] font-bold uppercase text-slate-500">
                            Photo de profil
                        </p>
                    </div>
                    {errors.image && (
                        <p className="text-red-500 text-xs font-bold">
                            {errors.image.message as string}
                        </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4 p-6 border border-card-border rounded-xl">
                            <h2 className="text-xs font-black uppercase text-primary flex items-center gap-2">
                                <UserIcon size={14} /> Identité
                            </h2>
                            <input
                                {...register('first_name')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Prénom"
                            />
                            {errors.first_name && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.first_name.message as string}
                                </p>
                            )}
                            <input
                                {...register('last_name')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Nom"
                            />
                            {errors.last_name && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.last_name.message as string}
                                </p>
                            )}
                            <input
                                {...register('email')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.email.message as string}
                                </p>
                            )}
                        </div>

                        <div className="space-y-4 p-6 border border-card-border rounded-xl">
                            <h2 className="text-xs font-black uppercase text-primary flex items-center gap-2">
                                <Briefcase size={14} /> Professionnel
                            </h2>
                            <input
                                {...register('role')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Rôle (ex: Lead Dev)"
                            />
                            {errors.role && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.role.message as string}
                                </p>
                            )}
                            <input
                                {...register('phone')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Téléphone"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.phone.message as string}
                                </p>
                            )}
                            <textarea
                                {...register('bio')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm h-[85px]"
                                placeholder="Bio courte..."
                            />
                            {errors.bio && (
                                <p className="text-red-500 text-xs font-bold">
                                    {errors.bio.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div className="p-6 border border-card-border rounded-xl space-y-4">
                        <h2 className="text-xs font-black uppercase text-primary flex items-center gap-2">
                            <Share2 size={14} /> Réseaux Sociaux (JSON)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                {...register('socialLinks.linkedin')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Lien LinkedIn"
                            />
                            <input
                                {...register('socialLinks.twitter')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Lien Twitter"
                            />
                            <input
                                {...register('socialLinks.youtube')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Lien Youtube"
                            />
                            <input
                                {...register('socialLinks.facebook')}
                                className="w-full p-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Lien Facebook"
                            />
                        </div>
                        {errors.socialLinks && (
                            <p className="text-red-500 text-xs font-bold">
                                {errors.socialLinks.message as any}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-10 py-3 bg-primary text-white rounded-lg font-black text-sm hover:scale-[1.02] transition-transform"
                        >
                            {isPending ? (
                                <LoadingSpinner />
                            ) : (
                                'ENREGISTRER LE MEMBRE'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
