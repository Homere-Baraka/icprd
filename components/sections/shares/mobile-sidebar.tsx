'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function MobileSidebar({
    isOpen,
    setIsOpen,
    dict,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    dict: any;
}) {
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div ref={dropdownRef}>
            <div
                id="mobile-overlay"
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[59] bg-black/50 hidden lg:hidden"
            ></div>
            <div
                className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-[#101322] z-[60] transform transition-transform duration-300 ease-in-out shadow-2xl lg:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="text-primary">
                                <svg
                                    className="size-8"
                                    fill="currentColor"
                                    viewBox="0 0 48 48"
                                >
                                    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-black text-slate-900 dark:text-white">
                                ICPRD
                            </span>
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            id="mobile-menu-close"
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                            aria-label="Fermer"
                        >
                            <X />
                        </button>
                    </div>
                    <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
                        <a
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.home"
                        >
                            {dict.home}
                        </a>
                        <a
                            href="/achievements"
                            onClick={() => setIsOpen(false)}
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.what-we-do"
                        >
                            {dict.achievements}
                        </a>
                        <a
                            href="/blogs"
                            onClick={() => setIsOpen(false)}
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.insights"
                        >
                            {dict.views}
                        </a>
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.team"
                        >
                            {dict.team}
                        </a>
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.contact"
                        >
                            {dict.contact}
                        </a>
                    </nav>
                    <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                        <a
                            href="/construction"
                            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold text-sm transition-all mb-4 sidebar-link"
                            data-translate="header.donate"
                        >
                            {dict.donate}
                        </a>
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                            © 2026 ICPRD
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
