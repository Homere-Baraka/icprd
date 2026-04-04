'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import useNotification from '@/hooks/use-taost';
import { useContactValidation } from '@/hooks/use-validation-form';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { createContactAction } from '@/actions/admin/contact';
import { LocationEdit, Mail } from 'lucide-react';

export default function ContactSection({ dict }: { dict: any }) {
    const router = useRouter();
    const { notifyError, notifySuccess } = useNotification();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useContactValidation();

    const onSubmit = async (data: any) => {
        startTransition(async () => {
            try {
                const result = await createContactAction(data);
                if (result.success) {
                    notifySuccess(dict.form.success);
                    router.push('/');
                    router.refresh();
                } else {
                    notifyError((result.error as string) || dict.form.error);
                }
            } catch (err) {
                notifyError(dict.form.server_error);
            }
        });
    };

    return (
        <section id="contact" className="py-32 bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20">
                    <div className="contact-info text-white">
                        <h2 className="text-5xl font-black mb-8">
                            {dict.title}
                        </h2>
                        <p className="text-xl opacity-90 mb-12 font-light leading-relaxed">
                            {dict.subtitle}
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                                    <Mail />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-60">
                                        {dict.email_label}
                                    </p>
                                    <p className="text-lg font-bold">
                                        contact@icprd.com
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                                    <LocationEdit />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-60">
                                        {dict.location_label}
                                    </p>
                                    <p className="text-lg font-bold">
                                        {dict.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-2xl">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                        {dict.form.name}
                                    </label>
                                    <input
                                        {...register('name')}
                                        className="w-full text-slate-900 dark:text-slate-50 px-3 placeholder:text-slate-500 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-4"
                                        placeholder={dict.form.name_placeholder}
                                        type="text"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                        {dict.form.email}
                                    </label>
                                    <input
                                        {...register('email')}
                                        className="w-full text-slate-900 dark:text-slate-50 px-3 placeholder:text-slate-500 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-4"
                                        placeholder={
                                            dict.form.email_placeholder
                                        }
                                        type="email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                    {dict.form.subject}
                                </label>
                                <input
                                    {...register('subject')}
                                    className="w-full text-slate-900 dark:text-slate-50 px-3 placeholder:text-slate-500 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-4"
                                    placeholder={dict.form.subject_placeholder}
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                    {dict.form.message}
                                </label>
                                <textarea
                                    {...register('message')}
                                    className="w-full text-slate-900 dark:text-slate-50 px-3 placeholder:text-slate-500 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-4"
                                    placeholder={dict.form.message_placeholder}
                                    rows={4}
                                ></textarea>
                            </div>
                            <button
                                disabled={isPending}
                                className="w-full bg-primary py-5 rounded-xl text-center text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                            >
                                {isPending ? (
                                    <div className="flex gap-x-3 items-center justify-center">
                                        <LoadingSpinner />
                                        {dict.form.loading}
                                    </div>
                                ) : (
                                    <>{dict.form.button}</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
