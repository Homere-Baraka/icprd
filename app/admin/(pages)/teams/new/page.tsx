'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    UserPlus,
    Mail,
    Lock,
    Shield,
    User as UserIcon,
    ArrowLeft,
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import useNotification from '@/hooks/use-taost';
import { adminRegisterAction } from '@/actions/auth/admin-account/register';
import MainLayout from '@/components/sections/admin-panel/main-layout';
import { useUserRegisterValidationForm } from '@/hooks/use-validation-form';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function AddMemberForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { notifySuccess, notifyError } = useNotification();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | undefined | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useUserRegisterValidationForm();

    const onSubmit = async (data: any) => {
        startTransition(async () => {
            const result = await adminRegisterAction(data);

            if (result.success) {
                const loginResult = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });

                if (loginResult?.ok) {
                    notifySuccess(result.message as any);
                    window.location.href = '/admin/teams';
                }
            } else {
                console.log('loginError: ', result.errors || result.message);
                setError(result.message);
            }
        });
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto p-6 lg:p-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <button
                        onClick={() => router.back()}
                        className="p-2 bg-slate-50/10 border border-card-border rounded-lg hover:bg-slate-50/20 cursor-pointer transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black">
                            Ajouter un Membre
                        </h1>
                        <p className="text-text-muted text-sm">
                            Créez un nouvel accès utilisateur au système.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Identifiants de connexion */}
                    <div className="md:col-span-2 p-6 rounded-xl border border-card-border shadow-sm space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 mb-4">
                            <Lock size={14} /> Sécurité & Connexion
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-tighter ml-1">
                                    Username *
                                </label>
                                <div className="relative">
                                    <UserIcon
                                        className="absolute left-3 top-3 text-text-muted"
                                        size={16}
                                    />
                                    <input
                                        {...register('username')}
                                        className="w-full pl-10 pr-4 py-3 bg-card border border-card-border rounded-lg outline-none focus:border-primary text-sm font-semibold"
                                        placeholder="nom"
                                    />
                                </div>
                                {errors.username && (
                                    <p className="text-red-500 text-[13px]">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-text-muted uppercase tracking-tighter ml-1">
                                    Email *
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-3 text-slate-400"
                                        size={16}
                                    />
                                    <input
                                        {...register('email')}
                                        className="w-full pl-10 pr-4 py-3 bg-card border border-card-border rounded-lg outline-none focus:border-primary text-sm font-semibold"
                                        placeholder="email@exemple.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-[13px]">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-tighter ml-1">
                                    Mot de passe *
                                </label>
                                <input
                                    type="password"
                                    {...register('password')}
                                    className="w-full px-4 py-3 bg-card border border-card-border rounded-lg outline-none focus:border-primary text-sm font-semibold"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-[13px]">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-tighter ml-1">
                                    Rôle Système
                                </label>
                                <div className="relative">
                                    <Shield
                                        className="absolute left-3 top-3 text-slate-400"
                                        size={16}
                                    />
                                    <select
                                        {...register('role')}
                                        className="w-full pl-10 pr-4 py-3 bg-card border border-card-border rounded-lg outline-none focus:border-primary text-sm font-bold appearance-none"
                                    >
                                        <option value="USER">
                                            Utilisateur
                                        </option>
                                        <option value="MEMBER">Membre</option>
                                        <option value="ADMIN">
                                            Administrateur
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informations personnelles */}
                    <div className="md:col-span-2 p-6 rounded-xl border border-card-border shadow-sm">
                        <h2 className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2 mb-4">
                            Profil (Optionnel)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                {...register('first_name')}
                                className="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Prénom"
                            />
                            <input
                                {...register('last_name')}
                                className="w-full px-4 py-2 bg-card border border-card-border rounded-lg text-sm"
                                placeholder="Nom"
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-black text-sm hover:bg-blue-700 cursor-pointer transition-all active:scale-95 disabled:opacity-5"
                        >
                            {isPending ? (
                                <>
                                    <LoadingSpinner /> Création en cours...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} /> Créer un membre
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
