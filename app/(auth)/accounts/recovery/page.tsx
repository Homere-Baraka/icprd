'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/hooks/theme-provider';
import { resetPasswordAction } from '@/actions/auth/admin-account/reset-password';

export default function ResetPasswordPage({
    searchParams,
}: {
    searchParams: { token?: string; email?: string };
}) {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if (password !== confirmPassword) {
        setMessage('Les mots de passe ne correspondent pas');
        return;
    }

    const handleReset = async () => {
        const result = await resetPasswordAction({
            token: searchParams.token,
            email: searchParams.email,
            password,
        });

        if (result.success) {
            setMessage('Password updated');
        } else {
            setMessage(result.error || 'Something went wrong');
        }
    };

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
        >
            <div className="max-w-md mx-auto mt-20 p-8 bg-card rounded-xl shadow-lg flex flex-col gap-6">
                <h1 className="text-3xl font-extrabold text-center text-text-main">
                    Réinitialiser le mot de passe
                </h1>

                <p className="text-sm text-center text-text-muted">
                    Veuillez entrer votre nouveau mot de passe ci-dessous.
                    Assurez-vous qu’il soit fort et sécurisé.
                </p>

                <div className="relative">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nouveau mot de passe"
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                    />
                </div>

                <div className="relative">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmer le nouveau mot de passe"
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                    />
                </div>

                <button
                    onClick={handleReset}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
                >
                    Reset Password
                </button>

                {message && (
                    <p className="text-center text-sm text-red-500 dark:text-red-400 font-medium">
                        {message}
                    </p>
                )}
            </div>
        </ThemeProvider>
    );
}
