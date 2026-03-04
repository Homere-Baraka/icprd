'use client';

import React, { useState, useEffect } from 'react';
import QuickActionModal from '@/components/quick-action-modal';
import {
    FileText,
    Users,
    Handshake,
    Trophy,
    Image as ImageIcon,
    ArrowRight,
    Plus,
    ExternalLink,
} from 'lucide-react';
import { getDashboardStatsAction } from '@/actions/admin/statistic';

export default function Dashboard() {
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [counts, setCounts] = useState({
        posts: 0,
        members: 0,
        partners: 0,
        achievements: 0,
        gallery: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const result = await getDashboardStatsAction();
            if (result.success && result.data) {
                setCounts(result.data);
            }
            setIsLoading(false);
        }
        fetchStats();
    }, []);

    const stats = [
        {
            id: 'posts',
            label: 'Articles de Blog',
            count: counts.posts,
            subtext: '8 publiés ce mois',
            icon: <FileText className="text-blue-600" size={28} />,
            color: 'bg-blue-50/10',
            link: '/admin/posts',
            borderColor: 'hover:border-blue-200',
        },
        {
            id: 'team',
            label: "Membres d'Équipe",
            count: counts.members,
            subtext: '4 départements',
            icon: <Users className="text-emerald-600" size={28} />,
            color: 'bg-emerald-50/10',
            link: '/admin/teams',
            borderColor: 'hover:border-emerald-200',
        },
        {
            id: 'partners',
            label: 'Partenaires',
            count: counts.partners,
            subtext: '2 en attente',
            icon: <Handshake className="text-amber-600" size={28} />,
            color: 'bg-amber-50/10',
            link: '/admin/partners',
            borderColor: 'hover:border-amber-200',
        },
        {
            id: 'achievements',
            label: 'Succès & Stats',
            count: counts.achievements,
            subtext: '+12% de croissance',
            icon: <Trophy className="text-purple-600" size={28} />,
            color: 'bg-purple-50/10',
            link: '/admin/achievements',
            borderColor: 'hover:border-purple-200',
        },
        {
            id: 'gallery',
            label: 'Médiathèque',
            count: counts.gallery,
            subtext: 'Images & Vidéos',
            icon: <ImageIcon className="text-rose-600" size={28} />,
            color: 'bg-rose-50/10',
            link: '/admin/gallery',
            borderColor: 'hover:border-cyan-200',
        },
    ];

    return (
        <div className="relative min-h-screen bg-background p-10 font-sans text-text-main">
            {/* Header avec un look très "Clean Organization" */}
            <div className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">
                        Overview <span className="text-blue-600">.</span>
                    </h1>
                    <p className="text-text-muted font-medium mt-2">
                        Bienvenue dans votre centre de gestion d'organisation.
                    </p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Dernière mise à jour
                    </p>
                    <p className="font-bold text-text-muted">
                        Aujourd'hui, 14:30
                    </p>
                </div>
            </div>

            {/* Grid de Navigation */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className={`group bg-card p-8 rounded-2xl border border-card-border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${item.borderColor}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div
                                className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                            >
                                {item.icon}
                            </div>

                            <button
                                onClick={() =>
                                    (window.location.href = item.link)
                                }
                                className="p-2.5 text-text-muted rounded-xl hover:bg-card-border hover:text-text-main transition-all shadow-sm cursor-pointer"
                                title={`Gérer les ${item.label}`}
                            >
                                <ExternalLink size={20} />
                            </button>
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                                {item.label}
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-text-main">
                                    {item.count}
                                </span>
                                <span className="text-text-muted font-medium">
                                    total
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm italic pt-2">
                                {item.subtext}
                            </p>
                        </div>

                        {/* Barre de progression décorative ou footer */}
                        <div className="mt-8 flex items-center justify-between text-primary font-bold text-sm group-hover:gap-2 transition-all">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                Accéder à la gestion
                            </span>
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </div>
                    </div>
                ))}

                {/* Quick Action */}
                <div
                    onClick={() => setIsActionModalOpen(true)}
                    className="bg-card border border-card-border p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center text-white group cursor-pointer hover:bg-primary transition-colors"
                >
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:rotate-90 transition-transform duration-500">
                        <Plus size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Action Rapide</h3>
                    <p className="text-white/60 text-sm mt-2">
                        Ajouter un nouvel élément à n'importe quelle section.
                    </p>
                </div>
            </div>

            <QuickActionModal
                isOpen={isActionModalOpen}
                onClose={() => setIsActionModalOpen(false)}
            />
        </div>
    );
}
