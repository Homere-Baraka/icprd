'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
    onBack: () => void;
    onNext: () => void;
    isFirst: boolean;
    isLast: boolean;
    currentIndex: number;
    totalCount: number;
}

export default function Pagination({
    onBack,
    onNext,
    isFirst,
    isLast,
    currentIndex,
    totalCount,
}: NavigationProps) {
    const pages = Array.from({ length: totalCount }, (_, i) => i);

    return (
        <nav className="w-full max-w-7xl mx-auto mt-16 mb-10 px-4">
            <div className="flex items-center justify-end gap-10 py-6 border-t border-white/5">
                <button
                    onClick={onBack}
                    disabled={isFirst}
                    className={`group flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300 border
                        ${
                            isFirst
                                ? 'opacity-20 cursor-not-allowed border-transparent text-slate-500'
                                : 'border-white/5 bg-white/[0.02] text-slate-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary'
                        }`}
                >
                    <ChevronLeft
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span className="text-[11px] font-black uppercase tracking-widest">
                        Précédent
                    </span>
                </button>

                <div className="hidden md:flex items-center gap-2">
                    {pages.map((page) => (
                        <button
                            key={page}
                            disabled={page === currentIndex}
                            className={`size-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300 border
                                ${
                                    page === currentIndex
                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                        : 'bg-transparent border-white/5 text-slate-500 hover:border-white/20 hover:text-white'
                                }`}
                            onClick={() => {
                                const diff = page - currentIndex;
                                if (diff > 0)
                                    for (let i = 0; i < diff; i++) onNext();
                                if (diff < 0)
                                    for (let i = 0; i < Math.abs(diff); i++)
                                        onBack();
                            }}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>

                <div className="md:hidden flex flex-col items-center">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                        Page {currentIndex + 1}{' '}
                        <span className="text-slate-600 mx-1">/</span>{' '}
                        {totalCount}
                    </span>
                </div>

                <button
                    onClick={onNext}
                    disabled={isLast}
                    className={`group flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300 border
                        ${
                            isLast
                                ? 'opacity-20 cursor-not-allowed border-transparent text-slate-500'
                                : 'border-white/5 bg-white/[0.02] text-slate-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary'
                        }`}
                >
                    <span className="text-[11px] font-black uppercase tracking-widest">
                        Suivant
                    </span>
                    <ChevronRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </button>
            </div>
        </nav>
    );
}
