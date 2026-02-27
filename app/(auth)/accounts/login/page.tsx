'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ThemeProvider } from '@/hooks/theme-provider';
import { Lock, LockOpen, Mail, ArrowRight, BookOpenText } from 'lucide-react';
import { useUserLoginValidationForm } from '@/hooks/use-validation-form';
import LoadingSpinner from '@/components/ui/loading-spinner';
import Logo from '@/components/ui/logo';

export default function AdminSignIn() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | undefined | null>(null);
    const [passwordVisible, setIsPasswordVisible] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useUserLoginValidationForm();

    const onSubmit = async (data: any) => {
        setIsPending(true);
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        console.log('Result : ', result);

        if (result?.error) {
            setError('Les informations fournies ne sont pas valides.');
            setIsPending(false);
        } else {
            window.location.href = '/admin';
        }
    };

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
        >
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="max-w-md w-full rounded-3xl shadow-md shadow-background p-10">
                    {/* Logo & Header */}
                    <div className="text-center mb-15">
                        <div className="flex flex-col items-center gap-3">
                            <Logo />
                            <h2 className="text-slate-900 dark:text-white text-2xl font-black tracking-tighter">
                                ICPRD
                            </h2>
                        </div>
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
                            <div className="border-l-2 border-red-500 p-3 bg-card text-red-600">
                                {error}
                            </div>
                        )}

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
                                <a
                                    href="/accounts/recovery/verification"
                                    className="text-xs text-indigo-600 hover:underline"
                                >
                                    Oublié ?
                                </a>
                            </div>
                            <div className="relative">
                                {passwordVisible ? (
                                    <LockOpen
                                        onClick={() =>
                                            setIsPasswordVisible((p) => !p)
                                        }
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        size={18}
                                    />
                                ) : (
                                    <Lock
                                        onClick={() =>
                                            setIsPasswordVisible((p) => !p)
                                        }
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        size={18}
                                    />
                                )}

                                <input
                                    type={`${passwordVisible ? 'text' : 'password'}`}
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

                        <button
                            disabled={isPending}
                            className={`w-full mt-10 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                            ${isPending ? 'bg-indigo-700 text-gray-400 cursor-not-allowed' : 'bg-indigo-900 text-white hover:bg-slate-800'}
                            transition-all group`}
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
                </div>
            </div>
        </ThemeProvider>
    );
}
