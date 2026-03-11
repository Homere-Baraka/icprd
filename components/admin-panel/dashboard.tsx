'use client';

import React, { useState, useEffect } from 'react';
import QuickActionModal from '@/components/quick-action-modal';
import { LayoutGrid, ArrowUpRight, Plus, Layers, Activity } from 'lucide-react';
import { getDashboardStatsAction } from '@/actions/admin/statistic';
import Link from 'next/link';

export default function Dashboard() {
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [counts, setCounts] = useState({
        blogs: 0,
        members: 0,
        partners: 0,
        achievements: 0,
        gallery: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            const result = await getDashboardStatsAction();
            if (result.success && result.data) setCounts(result.data);
        }
        fetchStats();
    }, []);

    const navigation = [
        {
            label: 'Articles',
            count: counts.blogs,
            link: '/admin/posts',
            color: 'from-blue-500 to-cyan-400',
        },
        {
            label: 'Équipe',
            count: counts.members,
            link: '/admin/teams',
            color: 'from-purple-500 to-pink-500',
        },
        {
            label: 'Partenaires',
            count: counts.partners,
            link: '/admin/partners',
            color: 'from-amber-400 to-orange-500',
        },
        {
            label: 'Média',
            count: counts.gallery,
            link: '/admin/gallery',
            color: 'from-emerald-400 to-teal-500',
        },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-blue-500/30">
            <div className="max-w-6xl mx-auto">
                {/* Header stylisé */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                    <div className="space-y-2">
                        <h1 className="text-6xl font-light tracking-tighter">
                            Dashboard.
                        </h1>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                            Système de gestion interne
                        </p>
                    </div>

                    <button
                        onClick={() => setIsActionModalOpen(true)}
                        className="group flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full hover:pr-8 transition-all duration-300 cursor-pointer"
                    >
                        <Plus
                            size={20}
                            className="group-hover:rotate-90 transition-transform"
                        />
                        <span className="text-sm font-bold uppercase tracking-tight">
                            Ajouter
                        </span>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Colonne Principale (Focus) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-10 rounded-[2.5rem]">
                            <div className="relative z-10">
                                <Activity
                                    className="text-blue-500 mb-6"
                                    size={32}
                                />
                                <h2 className="text-5xl font-black mb-2">
                                    {counts.achievements}
                                </h2>
                                <p className="text-zinc-400 font-medium text-lg italic">
                                    Succès & Accomplissements validés.
                                </p>
                                <Link
                                    href="/admin/achievements"
                                    className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-white/50 hover:text-white transition-colors"
                                >
                                    Voir les détails <ArrowUpRight size={16} />
                                </Link>
                            </div>
                            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full"></div>
                        </div>

                        {/* Navigation simplifiée style "Ligne" mais Premium */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {navigation.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.link}
                                    className="group flex justify-between items-center p-6 bg-zinc-900/50 border border-white/5 rounded-3xl hover:bg-zinc-800 transition-all hover:border-white/20"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}
                                        />
                                        <span className="font-bold text-zinc-300 group-hover:text-white transition-colors">
                                            {item.label}
                                        </span>
                                    </div>
                                    <span className="text-2xl font-black tabular-nums">
                                        {item.count}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Colonne Latérale - Raccourcis rapides */}
                    <div className="lg:col-span-4 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Layers className="text-zinc-500" size={20} />
                                <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-500">
                                    Archives
                                </h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Gérez vos ressources numériques et l'intégrité
                                de vos données depuis ce panneau centralisé.
                            </p>
                        </div>

                        <div className="space-y-4 mt-12">
                            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-black uppercase text-zinc-600 tracking-tighter">
                                <span>Stockage Cloud</span>
                                <span>64% utilisé</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <QuickActionModal
                isOpen={isActionModalOpen}
                onClose={() => setIsActionModalOpen(false)}
            />
        </div>
    );
}
