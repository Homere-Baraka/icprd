'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    Trophy,
    X,
    Calendar,
    ArrowRight,
    Loader2,
    MapPin,
    Target,
} from 'lucide-react';
import { useAchievementsQuery } from '@/lib/query/query';

export default function AchievementsHero({ dict }: { dict: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'unset';
    }, [isModalOpen]);

    const { data: response, isLoading } = useAchievementsQuery();

    const filteredAchievements = useMemo(() => {
        if (!response?.data) return [];
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase();
        return response.data.filter(
            (item: any) =>
                item.title.toLowerCase().includes(query) ||
                item.category?.toLowerCase().includes(query),
        );
    }, [searchQuery, response]);

    return (
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
            <div className="absolute inset-0 bg-slate-800">
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{
                        backgroundImage: `url("/images/achievements-bg.webp")`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950 to-slate-950"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                    <Trophy size={14} /> {dict.badge || 'Nos Réalisations'}
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
                    {dict.title_part1 || 'Actions &'}{' '}
                    <span className="text-primary">
                        {dict.title_part2 || 'Résultats.'}
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed mb-10">
                    {dict.description}
                </p>

                <div className="mt-10 max-w-xl mx-auto relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        readOnly
                        onClick={() => setIsModalOpen(true)}
                        placeholder={dict.search_placeholder}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl outline-none cursor-pointer hover:border-primary/50 transition-all text-sm text-white shadow-2xl"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-700 bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-500">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>
            </div>

            {/* --- MODAL DE RECHERCHE RÉALISATIONS --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-950/20"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative w-full max-w-4xl mt-[80px] bg-[#161b33] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-top duration-300">
                        <div className="p-5 border-b border-white/5 flex items-center gap-4">
                            <Search
                                className={
                                    searchQuery
                                        ? 'text-primary'
                                        : 'text-slate-500'
                                }
                                size={24}
                            />
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={dict.modal_filter}
                                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-500"
                            />
                            {isLoading && (
                                <Loader2
                                    className="animate-spin text-primary"
                                    size={20}
                                />
                            )}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                            {searchQuery.length > 0 ? (
                                filteredAchievements.length > 0 ? (
                                    <div className="space-y-2">
                                        {filteredAchievements.map(
                                            (item: any) => (
                                                <a
                                                    key={item.id}
                                                    href={`/achievements/${item.id}`}
                                                    className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group items-center"
                                                >
                                                    <div className="w-20 h-20 relative flex-shrink-0">
                                                        <img
                                                            src={
                                                                item.imageUrl ||
                                                                '/images/placeholder-achievement.webp'
                                                            }
                                                            className="w-full h-full object-cover rounded-xl bg-slate-800"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase mb-1">
                                                            <span className="text-primary flex items-center gap-1">
                                                                <Target
                                                                    size={12}
                                                                />{' '}
                                                                {item.category ||
                                                                    'Projet'}
                                                            </span>
                                                            <span className="text-slate-500 flex items-center gap-1">
                                                                <MapPin
                                                                    size={12}
                                                                />{' '}
                                                                {item.province >
                                                                0
                                                                    ? `${item.province} Prov.`
                                                                    : 'Local'}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-white font-bold group-hover:text-primary transition-colors truncate">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-slate-500 text-[10px] mt-1">
                                                            {dict.date_prefix ||
                                                                'Réalisé le'}{' '}
                                                            {new Date(
                                                                item.publishedAt ||
                                                                    item.createdAt,
                                                            ).toLocaleDateString(
                                                                dict.date_format ||
                                                                    'fr-FR',
                                                            )}
                                                        </p>
                                                    </div>
                                                    <ArrowRight
                                                        className="text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all"
                                                        size={20}
                                                    />
                                                </a>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center text-slate-400">
                                        {dict.no_results ||
                                            'Aucun projet trouvé pour'}{' '}
                                        <span className="font-bold text-white">
                                            {searchQuery}
                                        </span>
                                        .
                                    </div>
                                )
                            ) : (
                                <div className="py-12 text-center text-slate-500">
                                    {dict.start_typing}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
