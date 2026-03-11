'use client';

import { useTransition } from 'react';
import useNotification from '@/hooks/use-taost';
import { useNewsletterValidation } from '@/hooks/use-validation-form';
import { subscribeToNewsletter } from '@/actions/subscriber-to-newsletter';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Send, Share2, Users } from 'lucide-react';

export default function FooterSection() {
    const [isPending, startTransition] = useTransition();
    const { notifyError, notifySuccess } = useNotification();

    const { register, handleSubmit } = useNewsletterValidation();

    const onSubmit = async (data: any) => {
        startTransition(async () => {
            const result = await subscribeToNewsletter(data);
            try {
                if (result.success) {
                    notifySuccess(result.message as string);
                } else {
                    notifyError(result.error as string);
                }
            } catch (error) {
                notifyError(String(result?.error) || 'Une erreur est survenue');
            }
        });
    };

    return (
        <footer className="bg-background-dark text-slate-400 py-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 text-white mb-8">
                            <div className="text-primary">
                                <svg
                                    className="size-8"
                                    fill="currentColor"
                                    viewBox="0 0 48 48"
                                >
                                    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"></path>
                                </svg>
                            </div>
                            <span className="text-2xl font-black">ICPRD</span>
                        </div>
                        <p
                            data-translate="footer.desc"
                            className="text-sm leading-relaxed mb-8"
                        >
                            Dédiée à favoriser l'harmonie et le développement
                            durable à travers la République Démocratique du
                            Congo depuis 2004.
                        </p>
                        <div className="flex gap-4">
                            <a
                                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white"
                                href="#"
                                aria-label="Partager"
                            >
                                <Share2 size={18} />
                            </a>
                            <a
                                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white"
                                href="#"
                                aria-label="Équipe"
                            >
                                <Users size={18} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4
                            data-translate="footer.org"
                            className="text-white font-black text-sm uppercase tracking-widest mb-8"
                        >
                            Organisation
                        </h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li>
                                <a
                                    data-translate="footer.org.about"
                                    className="hover:text-primary transition-colors"
                                    href="#"
                                >
                                    À propos
                                </a>
                            </li>
                            <li>
                                <a
                                    data-translate="footer.org.plan"
                                    className="hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Plan Stratégique
                                </a>
                            </li>
                            <li>
                                <a
                                    data-translate="footer.org.reports"
                                    className="hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Rapports Annuels
                                </a>
                            </li>
                            <li>
                                <a
                                    data-translate="footer.org.join"
                                    className="hover:text-primary transition-colors"
                                    href="#newsletter"
                                >
                                    Rejoignez-nous
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4
                            data-translate="footer.legal"
                            className="text-white font-black text-sm uppercase tracking-widest mb-8"
                        >
                            Légal & Confidentialité
                        </h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li>
                                <a
                                    data-translate="footer.legal.privacy"
                                    className="hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Politique de Confidentialité
                                </a>
                            </li>
                            <li>
                                <a
                                    data-translate="footer.legal.charter"
                                    className="hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Charte des Donateurs
                                </a>
                            </li>
                            <li>
                                <a
                                    data-translate="footer.legal.governance"
                                    className="hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Gouvernance
                                </a>
                            </li>
                            <li>
                                <a
                                    data-translate="footer.legal.transparency"
                                    className="hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Transparence
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4
                            data-translate="footer.newsletter"
                            className="text-white font-black text-sm uppercase tracking-widest mb-8"
                        >
                            Newsletter
                        </h4>
                        <p
                            data-translate="footer.newsletter.desc"
                            className="text-sm mb-6"
                        >
                            Recevez des mises à jour du terrain et nos rapports
                            directement dans votre boîte mail.
                        </p>
                        <form
                            method="post"
                            className="flex gap-2"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <input
                                {...register('email')}
                                data-translate="footer.newsletter.placeholder"
                                className="bg-slate-900 border-none rounded-xl focus:ring-primary text-sm w-full py-3"
                                placeholder="Adresse email"
                                type="email"
                            />
                            <button
                                data-translate="footer.newsletter.button"
                                className="bg-primary text-white px-5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center"
                            >
                                {isPending ? <LoadingSpinner /> : <Send />}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    <p data-translate="footer.copyright">
                        © 2024 Initiative Chrétienne pour la Paix, la
                        Réconciliation et le Développement.
                    </p>
                    <div className="flex gap-10">
                        <a
                            data-translate="footer.tagline1"
                            className="hover:text-primary"
                            href="#"
                        >
                            La Paix est Possible
                        </a>
                        <a
                            data-translate="footer.tagline2"
                            className="hover:text-primary"
                            href="#"
                        >
                            RDC Forte
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
