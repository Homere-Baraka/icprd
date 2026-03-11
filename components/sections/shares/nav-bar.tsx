'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/logo';

export default function NavBar({ onMenuClick }: any) {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#101322]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3">
                            <div className="text-primary">
                                <Logo />
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-2xl font-black tracking-tighter">
                                ICPRD
                            </h2>
                        </div>
                        <nav className="hidden lg:flex items-center gap-8">
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="#mission"
                                data-translate="nav.about"
                            >
                                À Propos
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="#intervention"
                                data-translate="nav.what-we-do"
                            >
                                Nos Actions
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="#environment"
                                data-translate="nav.environment"
                            >
                                Environnement
                            </a>

                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="/blogs"
                                data-translate="nav.insights"
                            >
                                Perspectives
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="#team"
                                data-translate="nav.team"
                            >
                                Équipe
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="#contact"
                                data-translate="nav.contact"
                            >
                                Contact
                            </a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <span className="material-symbols-outlined text-primary !text-lg">
                                language
                            </span>
                            <button
                                className="text-xs font-bold text-primary"
                                data-lang-btn="en"
                            >
                                EN
                            </button>
                            <span className="text-slate-300 dark:text-slate-700">
                                |
                            </span>
                            <button
                                className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                data-lang-btn="fr"
                            >
                                FR
                            </button>
                        </div>
                        <button
                            onClick={onMenuClick}
                            id="mobile-menu-toggle"
                            className="lg:hidden flex items-center border justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            aria-label="Menu"
                        >
                            <Menu />
                        </button>
                        <button
                            onClick={() => router.push('/donation')}
                            className="hidden lg:block bg-primary hover:bg-primary/90 text-white px-7 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/30"
                            data-translate="header.donate"
                        >
                            Donate Now
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
