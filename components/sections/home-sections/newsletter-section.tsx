'use client';

import { useTransition } from 'react';
import useNotification from '@/hooks/use-taost';
import { useNewsletterValidation } from '@/hooks/use-validation-form';
import { subscribeToNewsletter } from '@/actions/subscriber-to-newsletter';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function NewsletterSection({ dict }: { dict: any }) {
    const t = dict?.newsletter || {};

    const [isPending, startTransition] = useTransition();
    const { notifyError, notifySuccess } = useNotification();

    const { register, handleSubmit, reset } = useNewsletterValidation();

    const onSubmit = async (data: any) => {
        startTransition(async () => {
            const result = await subscribeToNewsletter(data);
            try {
                if (result.success) {
                    notifySuccess(result.message as string);
                    reset();
                } else {
                    notifyError(result.error as string);
                }
            } catch (error) {
                notifyError(
                    String(result?.error) ||
                        t.error_fallback ||
                        'Une erreur est survenue',
                );
            }
        });
    };

    return (
        <section className="py-20" id="newsletter">
            <div className="max-w-5xl mx-auto px-4 text-white text-center">
                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-md">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 relative z-10">
                        {t.title || 'Ne manquez aucune de nos actualités.'}
                    </h2>
                    <p className="text-slate-400 mb-10 max-w-lg mx-auto relative z-10">
                        {t.description ||
                            'Abonnez-vous à notre infolettre hebdomadaire...'}
                    </p>
                    <form
                        method="post"
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col md:flex-row gap-3 max-w-md mx-auto relative z-10"
                    >
                        <input
                            type="email"
                            {...register('email')}
                            placeholder={t.placeholder || 'your@email.com'}
                            className="flex-grow px-6 py-4 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-primary transition-all text-sm"
                        />
                        <button className="px-8 py-4 bg-primary rounded-xl font-black hover:bg-white hover:text-primary transition-all">
                            {isPending ? (
                                <LoadingSpinner />
                            ) : (
                                t.button || "S'inscrire"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
