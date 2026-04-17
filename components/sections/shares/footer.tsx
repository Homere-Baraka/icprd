'use client';

import { useTransition } from 'react';
import useNotification from '@/hooks/use-taost';
import { useNewsletterValidation } from '@/hooks/use-validation-form';
import { subscribeToNewsletter } from '@/actions/subscriber-to-newsletter';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Send, Share2, Users } from 'lucide-react';

export default function FooterSection({ dict, lang }: { dict: any, lang: string }) {
    const [isPending, startTransition] = useTransition();
    const { notifyError, notifySuccess } = useNotification();
    const { register, handleSubmit } = useNewsletterValidation();

    const onSubmit = async (data: any) => {
        startTransition(async () => {
            try {
                const result = await subscribeToNewsletter(data);
                if (result.success) {
                    notifySuccess(result.message as string);
                } else {
                    notifyError((result.error as string) || dict.error_default);
                }
            } catch (error) {
                notifyError(dict.error_default);
            }
        });
    };

    return (
        <footer className="bg-background-dark text-slate-400 py-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-4 pb-6">
                            <div className="relative flex items-center justify-center rounded-lg h-12 w-12 overflow-hidden">
                                <img
                                    src="/images/logo.png"
                                    alt="icprd logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tighter leading-none">
                                ICPRD
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed mb-8">
                            {dict.desc}
                        </p>
                        <div className="flex gap-4">
                            <a
                                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white"
                                href="#"
                            >
                                <Share2 size={18} />
                            </a>
                            <a
                                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white"
                                href="#"
                            >
                                <Users size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">
                            {dict.org_title}
                        </h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li>
                                <a
                                    className="hover:text-primary transition-colors"
                                    href={`/${lang}/construction`}
                                >
                                    {dict.org.about}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-primary transition-colors"
                                    href={`/${lang}/construction`}
                                >
                                    {dict.org.plan}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-primary transition-colors"
                                    href={`/${lang}/construction`}
                                >
                                    {dict.org.reports}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-primary transition-colors"
                                    href={`/${lang}#newsletter`}
                                >
                                    {dict.org.join}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">
                            {dict.legal_title}
                        </h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li>
                                <a
                                    className="hover:text-primary transition-colors"
                                    href={`/${lang}/construction`}
                                >
                                    {dict.legal.privacy}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-primary transition-colors"
                                    href={`/${lang}/construction`}
                                >
                                    {dict.legal.charter}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-primary transition-colors"
                                    href={`/${lang}/construction`}
                                >
                                    {dict.legal.governance}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-primary transition-colors"
                                    href={`/${lang}/construction`}
                                >
                                    {dict.legal.transparency}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">
                            {dict.newsletter_title}
                        </h4>
                        <p className="text-sm mb-6">{dict.newsletter_desc}</p>
                        <form
                            className="flex gap-2"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <input
                                {...register('email')}
                                className="bg-slate-900 border-none rounded-xl focus:ring-primary text-sm w-full p-3"
                                placeholder={dict.newsletter_placeholder}
                                type="email"
                            />
                            <button className="bg-primary text-white px-5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center min-w-[50px]">
                                {isPending ? (
                                    <LoadingSpinner />
                                ) : (
                                    <Send size={18} />
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    <p>{dict.copyright}</p>
                    <div className="flex gap-10">
                        <a className="hover:text-primary" href={`/${lang}/construction`}>
                            {dict.tagline1}
                        </a>
                        <a className="hover:text-primary" href={`/${lang}/construction`}>
                            {dict.tagline2}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
