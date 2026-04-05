'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Languages, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/logo';

export default function NavBar({ onMenuClick, dict }: any) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const currentLang = params.lang as string;

    const handleLanguageChange = (newLang: string) => {
        if (currentLang === newLang) return;

        const segments = pathname.split('/');
        segments[1] = newLang;
        const newPath = segments.join('/');

        router.push(newPath);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#101322]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-4">
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
                        <nav className="hidden lg:flex items-center gap-8">
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="/"
                                data-translate="nav.about"
                            >
                                {dict.home}
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="/achievements"
                                data-translate="nav.what-we-do"
                            >
                                {dict.achievements}
                            </a>

                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="/blogs"
                                data-translate="nav.insights"
                            >
                                {dict.news}
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="#team"
                                data-translate="nav.team"
                            >
                                {dict.team}
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="/construction"
                                data-translate="nav.about"
                            >
                                {dict.about}
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                                href="#contact"
                                data-translate="nav.contact"
                            >
                                {dict.contact}
                            </a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <Languages size={20} color="white" />
                            <button
                                onClick={() => handleLanguageChange('en')}
                                className={`cursor-pointer text-xs font-bold transition-colors ${currentLang === 'en' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                EN
                            </button>
                            <span className="text-slate-300 dark:text-slate-700">
                                |
                            </span>
                            <button
                                onClick={() => handleLanguageChange('fr')}
                                className={`cursor-pointer text-xs font-bold transition-colors ${currentLang === 'fr' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
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
                        <a
                            href="/construction"
                            className="hidden lg:block bg-primary hover:bg-primary/90 text-white px-7 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/30"
                            data-translate="header.donate"
                        >
                            {dict.donate}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
