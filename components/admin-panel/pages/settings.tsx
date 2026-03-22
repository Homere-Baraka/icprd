'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useSession } from 'next-auth/react';
import useNotification from '@/hooks/use-taost';
import { uploadProfileImage } from '@/lib/upload';
import { User, Mail, Lock, Camera, Save, ShieldCheck } from 'lucide-react';
import { useProfileValidationForm } from '@/hooks/use-validation-form';
import { updateAdminProfileAction } from '@/actions/admin/user';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function Setting() {
    const router = useRouter();
    const { update } = useSession();
    const [isPending, setIsPending] = useState(false);
    const { notifyError, notifySuccess } = useNotification();
    const { name, email, image, first_name, last_name } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useProfileValidationForm();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const onSubmit = async (data: any) => {
        try {
            setIsPending(true);

            const filteredData = Object.fromEntries(
                Object.entries(data).filter(
                    ([key, value]) =>
                        value !== '' &&
                        value !== undefined &&
                        key !== 'confirmPassword',
                ),
            );

            if (Object.keys(filteredData).length === 0) {
                console.log('Aucune modification détectée.');
                return;
            }

            const result = await updateAdminProfileAction(filteredData);

            if (result.success) {
                await update({
                    user: {
                        ...filteredData,
                        image: filteredData.image || previewImage,
                    },
                });

                notifySuccess('Profil mis à jour avec succès !');
                router.push('/admin');
                router.refresh();
            } else {
                notifyError(result.error || 'Une erreur est survenue.');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission :', error);
        } finally {
            setIsPending(false);
        }
    };

    const handleProfileUpload = async (file: File) => {
        const result = await uploadProfileImage(file);
        return result.success ? result.url : null;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const localPreview = URL.createObjectURL(file);
            setPreviewImage(localPreview);

            const url = await handleProfileUpload(file);
            if (url) {
                setPreviewImage(url);
                setValue('image', url, { shouldValidate: true });
                notifySuccess('Image de couverture téléchargée');
            } else {
                notifyError("Erreur lors de l'upload");
                setPreviewImage(null);
            }
        }
    };

    return (
        <div className="min-h-screen bg-background text-slate-200 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold text-text-main">
                        Paramètres du Profil
                    </h1>
                    <p className="text-text-muted text-sm mt-1">
                        Gérez vos informations personnelles et la sécurité de
                        votre compte.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-card-border rounded-2xl p-8 text-center shadow-sm">
                            <div className="relative inline-block group">
                                <div className="w-32 h-32 rounded-full border-4 border-slate-800 ring-2 ring-indigo-500/20 overflow-hidden bg-slate-800 transition-transform duration-300 group-hover:scale-105">
                                    <img
                                        src={
                                            previewImage ||
                                            image ||
                                            '/images/user.jpg'
                                        }
                                        alt="Profil"
                                        className="w-full h-full object-cover transition-filter duration-300 group-hover:brightness-75"
                                    />
                                </div>

                                <label className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                                    <Camera
                                        size={24}
                                        className="text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform"
                                    />
                                    <span className="text-[10px] text-white font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                        Modifier
                                    </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>

                                {/* Badge Status (Optionnel, petit point vert pour dire 'En ligne' ou 'Admin') */}
                                <div className="absolute bottom-1 right-2 w-5 h-5 bg-emerald-500 border-4 border-card rounded-full shadow-lg"></div>
                            </div>

                            <div className="mt-5 space-y-1">
                                <h3 className="font-bold text-lg text-text-main tracking-tight capitalize">
                                    {!(first_name || last_name)
                                        ? name
                                        : `${first_name} ${last_name}`}
                                </h3>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                                    <ShieldCheck
                                        size={12}
                                        className="text-indigo-400"
                                    />
                                    <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">
                                        Administrateur
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Message d'erreur stylisé */}
                        {errors.image && (
                            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                <p className="text-red-500 text-xs font-medium">
                                    {errors.image.message as string}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Colonne Droite  */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-background border border-card-border rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-card-border bg-card flex items-center gap-2">
                                <User size={18} className="text-indigo-400" />
                                <h2 className="font-semibold text-sm uppercase tracking-wide">
                                    Informations Publiques
                                </h2>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-text-muted">
                                        Nom d'utilisateur
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={name || ''}
                                        placeholder="ex: admin243"
                                        {...register('username')}
                                        className="w-full bg-card border border-card-border rounded-lg px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none transition-all"
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-xs font-bold">
                                            {errors.username.message as string}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-text-muted">
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={first_name || ''}
                                        placeholder="ex: jean"
                                        {...register('first_name')}
                                        className="w-full bg-card border border-card-border rounded-lg px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none transition-all"
                                    />
                                    {errors.first_name && (
                                        <p className="text-red-500 text-xs font-bold">
                                            {
                                                errors.first_name
                                                    .message as string
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-text-muted">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={last_name || ''}
                                        placeholder="ex: patrice"
                                        {...register('last_name')}
                                        className="w-full bg-card border border-card-border rounded-lg px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none transition-all"
                                    />
                                    {errors.last_name && (
                                        <p className="text-red-500 text-xs font-bold">
                                            {errors.last_name.message as string}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Sécurité */}
                        <section className="bg-background border border-card-border rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-card-border bg-rose-500/5 flex items-center gap-2">
                                <ShieldCheck
                                    size={18}
                                    className="text-rose-400"
                                />
                                <h2 className="font-semibold text-sm uppercase tracking-wide">
                                    Sécurité & Accès
                                </h2>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-text-muted flex items-center gap-2">
                                        <Mail size={14} /> Adresse Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue={email || ''}
                                        placeholder="exemple@icprd.com"
                                        {...register('email')}
                                        className="w-full bg-card border border-card-border rounded-lg px-4 py-2 text-sm focus:border-rose-500 focus:outline-none transition-all"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs font-bold">
                                            {errors.email.message as string}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-text-muted flex items-center gap-2">
                                            <Lock size={14} /> Nouveau mot de
                                            passe
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            {...register('password')}
                                            className="w-full bg-card border border-card-border rounded-lg px-4 py-2 text-sm focus:border-rose-500 focus:outline-none transition-all"
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-xs font-bold">
                                                {
                                                    errors.password
                                                        .message as string
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-text-muted flex items-center gap-2">
                                            Confirmer le mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            {...register('confirmPassword')}
                                            className="w-full bg-card border border-card-border rounded-lg px-4 py-2 text-sm focus:border-rose-500 focus:outline-none transition-all"
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-red-500 text-xs font-bold">
                                                {
                                                    errors.confirmPassword
                                                        .message as string
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-600 italic">
                                    Laissez vide si vous ne souhaitez pas
                                    modifier le mot de passe.
                                </p>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => router.back()}
                                className="px-6 py-2 rounded-lg text-sm font-medium text-text-muted cursor-pointer hover:bg-card hover:text-white transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-6 py-2 bg-primary hover:bg-indigo-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer transition-all"
                            >
                                {isPending ? (
                                    <>
                                        <LoadingSpinner />
                                        Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Enregistrer les modifications
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
