'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/hooks/theme-provider';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { requestVerifyEmailAction } from '@/actions/auth/admin-account/request-veriry-email';

export default function VerifyEmail() {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('Envoi du lien de vérification...');

        const result = await requestVerifyEmailAction(email);

        if (result.success) {
            setStatus('success');
            setMessage(
                'Lien de vérification envoyé ! Vérifiez votre boîte mail.',
            );
            setEmail('');
        } else {
            setStatus('error');
            setMessage(result.error || "Une erreur s'est produite.");
        }
    };

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
        >
            <form
                onSubmit={handleSubmit}
                className="min-h-screen flex items-center justify-center bg-background"
            >
                <div className="w-full max-w-lg bg-card rounded-xl shadow-2xl p-10 flex flex-col items-center gap-6 text-center transition-all">
                    {/* Icon */}
                    <div className="flex items-center justify-center">
                        {status === 'loading' && (
                            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
                        )}
                        {status === 'success' && (
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        )}
                        {status === 'error' && (
                            <XCircle className="w-16 h-16 text-red-500" />
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Vérification de votre email
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        Afin d'assurer la sécurité de votre compte, veuillez
                        saisir votre adresse email. Nous vous enverrons un lien
                        pour vérifier que vous êtes bien le propriétaire.
                    </p>

                    <div className="w-full">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre email"
                            required
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3 bg-primary hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading'
                            ? 'Envoi...'
                            : 'Envoyer le lien de vérification'}
                    </button>

                    {message && (
                        <p
                            className={`text-sm font-medium ${
                                status === 'success'
                                    ? 'text-green-600'
                                    : status === 'error'
                                      ? 'text-red-500'
                                      : 'text-indigo-600'
                            }`}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </form>
        </ThemeProvider>
    );
}
