'use client';

import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { signIn } from 'next-auth/react';
import {
    Lock,
    LockOpen,
    Mail,
    ArrowRight,
    BookOpenText,
    User,
} from 'lucide-react';
import { adminRegisterAction } from '@/actions/auth/admin-account/register';
import { useUserRegisterValidationForm } from '@/hooks/use-validation-form';

export default function AdminSignIn() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined | null>(null);
    const [passwordVisible, setIsPasswordVisible] = useState(false);
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
                console.log('ResultLogin : ', loginResult);
                if (loginResult?.ok) {
                    window.location.href = '/admin';
                }
            } else {
                console.log('loginError: ', result.errors || result.message);
                setError(result.message);
            }
        });
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="max-w-md w-full rounded-3xl shadow-md shadow-background p-10">
                {/* Logo & Header */}
                <div className="text-center mb-15">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
                        <BookOpenText className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-text-main">
                        CodePlatform
                    </h1>
                    <p className="text-text-subtle mt-2">
                        Accédez à votre espace d'administration
                    </p>
                </div>

                {/* Formulaire */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    method="post"
                    className="space-y-5"
                >
                    {error && (
                        <div className="border-l-2 border-red-500 p-3 bg-red-100 text-red-600">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">
                            Name
                        </label>
                        <div className="relative">
                            <User
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                            <input
                                type="text"
                                {...register('username')}
                                placeholder="username"
                                className="w-full pl-12 pr-4 py-3 bg-card border border-card-border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                        {errors.username && (
                            <small className="text-red-500 pt-0.5 font-semibold">
                                {errors.username.message}
                            </small>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="example@gmail.com"
                                className="w-full pl-12 pr-4 py-3 bg-card border border-card-border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                        {errors.email && (
                            <small className="text-red-500 pt-0.5 font-semibold">
                                {errors.email.message}
                            </small>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-text-muted">
                                Mot de passe
                            </label>
                        </div>
                        <div className="relative">
                            {passwordVisible ? (
                                <LockOpen
                                    onClick={() =>
                                        setIsPasswordVisible((p) => p != true)
                                    }
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                            ) : (
                                <Lock
                                    onClick={() => setIsPasswordVisible(true)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                            )}

                            <input
                                type={` ${passwordVisible ? 'text' : 'password'}`}
                                {...register('password')}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 bg-card border border-card-border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                        {errors.password && (
                            <small className="text-red-500 pt-0.5 font-semibold">
                                {errors.password.message}
                            </small>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">
                            Role
                        </label>
                        <div className="relative">
                            <select
                                {...register('role')}
                                className="w-full pl-4 pr-4 py-3 bg-card border border-card-border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            >
                                <option value="USER">User</option>
                                <option value="MEMBER">Member</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        {errors.role && (
                            <small className="text-red-500 pt-0.5 font-semibold">
                                {errors.role.message}
                            </small>
                        )}
                    </div>

                    <button
                        disabled={isPending}
                        className={`w-full mt-10 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                            ${isPending ? 'bg-indigo-700 text-gray-400 cursor-not-allowed' : 'bg-indigo-900 text-white hover:bg-slate-800'}
                            transition-all group cursor-pointer`}
                    >
                        {isPending ? (
                            <>
                                <LoadingSpinner />
                                Connexion...
                            </>
                        ) : (
                            <>
                                Se connecter
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-card-border text-center text-sm text-slate-600">
                    Nouveau sur la plateforme ?{' '}
                    <Link
                        href="/auth/accounts/signin"
                        className="text-indigo-600 font-bold hover:underline"
                    >
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
}
