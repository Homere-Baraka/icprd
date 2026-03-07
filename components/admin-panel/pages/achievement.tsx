'use client';

import React, { useState, useMemo } from 'react';
import {
    Plus,
    Users,
    Trophy,
    Search,
    TrendingUp,
    Target,
    ExternalLink,
    ArrowUpRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAchievementsQuery } from '@/lib/query/query';
import PostSkeleton from '@/components/ui/post-skeletton';
import EmptyState from '@/components/ui/empty-state';
import ErrorState from '@/components/ui/error-state';
import ActionMenu from '@/components/action-menu';

export default function Achievement() {
    const router = useRouter();
    const {
        data: achievements,
        isLoading,
        isError,
        error,
        refetch,
    } = useAchievementsQuery();

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Tous');

    const achievementsData = achievements?.data || [];

    const totalRevenue = achievementsData.reduce(
        (acc: number, curr: any) => acc + (curr.revenue || 0),
        0,
    );
    const uniqueProvinces = new Set(
        achievementsData.map((a: any) => a.province).filter(Boolean),
    ).size;
    const completedCount = achievementsData.filter(
        (a: any) => a.status === 'FINISHED',
    ).length;

    const metrics = [
        {
            id: 4,
            label: 'Projets Terminés',
            value: `${completedCount}`,
            icon: <Target className="text-purple-500" size={24} />,
            iconBg: 'bg-purple-50/10',
        },
    ];

    const getProgressBadge = (status: string) => {
        switch (status) {
            case 'PENDING':
                return {
                    label: 'En cours',
                    classes: 'bg-amber-100/10 text-amber-700 border-amber-200',
                    dot: 'bg-amber-500',
                };
            case 'FINISHED':
                return {
                    label: 'Terminé',
                    classes:
                        'bg-emerald-100/10 text-emerald-700 border-emerald-200',
                    dot: 'bg-emerald-500',
                };
            case 'CANCELED':
                return {
                    label: 'Annulé',
                    classes: 'bg-rose-100/10 text-rose-700 border-rose-200',
                    dot: 'bg-rose-500',
                };
            default:
                return {
                    label: 'Inconnu',
                    classes: 'bg-slate-100/10 text-slate-700 border-slate-200',
                    dot: 'bg-slate-500',
                };
        }
    };

    const filteredAchievements = useMemo(() => {
        if (!achievements?.data) return [];

        return achievements.data.filter((achievement: any) => {
            const matchesSearch =
                achievement.title
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                achievement?.author?.user?.username
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const isPublished = Boolean(achievement.publishedAt);
            const status = achievement.status;
            const matchesTab =
                activeTab === 'Tous' ||
                (activeTab === 'En cours' && status === 'PENDING') ||
                (activeTab === 'Finis' && status === 'FINISHED') ||
                (activeTab === 'Publié' && isPublished) ||
                (activeTab === 'Brouillon' && !isPublished);

            return matchesSearch && matchesTab;
        });
    }, [achievements?.data, searchQuery, activeTab]);

    return (
        <div className="min-h-screen bg-background p-10 font-sans">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-text-main text-3xl font-bold">
                        Achievements
                    </h1>
                    <p className="text-text-muted mt-1">
                        Highlight your company milestones and stats.
                    </p>
                </div>
                <button
                    onClick={() => router.push('/admin/achievements/new')}
                    className="group flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full hover:pr-8 transition-all duration-300 cursor-pointer"
                >
                    <Plus
                        size={20}
                        className="group-hover:rotate-90 transition-transform"
                    />
                    Ajouter une réalisation
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-card border border-card-border p-6 rounded-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-14 h-14 bg-blue-50/10 rounded-2xl flex items-center justify-center mb-6`}
                        >
                            <Users className="text-blue-600" size={24} />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-bold text-text-muted uppercase tracking-wider">
                                Portée Provicial
                            </p>
                            <h2 className="text-3xl font-extrabold text-text-muted">
                                {uniqueProvinces}
                            </h2>
                        </div>
                    </div>
                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:scale-110 transition-transform">
                        <Users size={80} />
                    </div>
                </div>

                <div className="bg-card border border-card-border p-6 rounded-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-14 h-14 bg-emerald-50/10 rounded-2xl flex items-center justify-center mb-6`}
                        >
                            <TrendingUp
                                className="text-emerald-500"
                                size={24}
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-bold text-text-muted uppercase tracking-wider">
                                Croissance des Revenus
                            </p>
                            <h2 className="text-3xl font-extrabold text-text-muted">
                                {totalRevenue.toLocaleString()}
                            </h2>
                        </div>
                    </div>
                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:scale-110 transition-transform">
                        <TrendingUp size={80} />
                    </div>
                </div>

                <div className="bg-card border border-card-border p-6 rounded-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-14 h-14 bg-purple-50/10 rounded-2xl flex items-center justify-center mb-6`}
                        >
                            <Target className="text-purple-500" size={24} />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-bold text-text-muted uppercase tracking-wider">
                                Projets Terminés
                            </p>
                            <h2 className="text-3xl font-extrabold text-text-muted">
                                {completedCount}
                            </h2>
                        </div>
                    </div>
                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:scale-110 transition-transform">
                        <Target size={80} />
                    </div>
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-card rounded-xl border border-card-border shadow-sm">
                <div className="p-6 bg-gradient-to-b from-card/50 to-transparent backdrop-blur-md border-b border-white/[0.05] flex flex-wrap items-center justify-between gap-6">
                    <div className="relative group min-w-[320px]">
                        <div className="relative flex items-center">
                            <Search
                                className="absolute left-4 text-text-muted/40 group-focus-within:text-primary transition-colors"
                                size={18}
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher une pépite..."
                                className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/5 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary/50 transition-all placeholder:text-text-muted/30"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex bg-black/20 p-1 rounded-xl border border-white/5">
                            {[
                                'Tous',
                                'Finis',
                                'En cours',
                                'Brouillon',
                                'Publié',
                            ].map((tab, i) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                        activeTab === tab
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'text-text-muted hover:text-text-main'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <button
                            className="px-3 py-2 rounded-gl bg-white/[0.03] border border-white/10 text-text-muted hover:text-text-main hover:bg-white/[0.08] transition-all"
                            title="Voir le profil public"
                        >
                            <ExternalLink size={18} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="relative">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/5 border-y border-card-border">
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider">
                                    Progrès
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider">
                                    Visibilité
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-card-border text-text-muted">
                            {isLoading ? (
                                <PostSkeleton />
                            ) : isError ? (
                                <tr>
                                    <dt>
                                        <ErrorState
                                            onRetry={refetch}
                                            message={error?.message}
                                        />
                                    </dt>
                                </tr>
                            ) : achievements?.data?.length == 0 ? (
                                <tr>
                                    <td>
                                        <EmptyState
                                            title="Vos Accomplissements"
                                            description="
                                                Retrouvez ici l'ensemble de vos succès et leur évolution.
                                                Nous préparons une chronologie visuelle pour retracer votre
                                                parcours : restez connectés !"
                                            icon={
                                                <Trophy
                                                    strokeWidth={1.5}
                                                    size={32}
                                                />
                                            }
                                        />
                                    </td>
                                </tr>
                            ) : filteredAchievements.length == 0 ? (
                                <tr>
                                    <td>
                                        <div className="text-center p-6 text-text-muted text-xl">
                                            Aucun résultat
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                (filteredAchievements &&
                                    filteredAchievements.length) > 0 &&
                                filteredAchievements.map((achievement: any) => (
                                    <tr
                                        key={achievement.id}
                                        className="hover:bg-slate-50/5 transition-colors group"
                                    >
                                        <td className="px-6 py-5 font-semibold text-text-muted max-w-52 truncate">
                                            {achievement.title}
                                        </td>
                                        <td className="px-6 py-5 text-text-subtle">
                                            {
                                                achievement?.author?.user
                                                    ?.username
                                            }{' '}
                                            {
                                                achievement?.author?.user
                                                    ?.first_name
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {(() => {
                                                const badge = getProgressBadge(
                                                    achievement.status,
                                                );
                                                return (
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${badge.classes}`}
                                                    >
                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}
                                                        />
                                                        {badge.label}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    achievement.publishedAt
                                                        ? 'bg-emerald-100/10 text-emerald-500'
                                                        : 'bg-slate-100/10 text-text-main'
                                                }`}
                                            >
                                                {achievement.publishedAt
                                                    ? 'Publié'
                                                    : 'Brouillon'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-slate-400">
                                            {new Date(
                                                achievement?.createdAt,
                                            ).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <ActionMenu
                                                link1={`/admin/achievements/${achievement.id}`}
                                                link2={`/admin/achievements/${achievement.id}/edit`}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
