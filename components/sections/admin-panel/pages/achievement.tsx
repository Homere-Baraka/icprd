'use client';

import React from 'react';
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

    const achievementsData = achievements?.data || [];

    // Calcul des metrics en temps réel
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
            id: 1,
            label: 'Portée Provicial',
            value: `${uniqueProvinces}`,
            subtext: 'Provice',
            trend: '+12% cette année',
            icon: <Users className="text-blue-600" size={24} />,
            iconBg: 'bg-blue-50/10',
        },
        {
            id: 3,
            label: 'Croissance des Revenus',
            value: `${totalRevenue.toLocaleString()} $`,
            subtext: 'ARR (Revenu Annuel)',
            trend: '+45% sur un an',
            icon: <TrendingUp className="text-emerald-500" size={24} />,
            iconBg: 'bg-emerald-50/10',
        },
        {
            id: 4,
            label: 'Projets Terminés',
            value: `${completedCount}`,
            subtext: 'Livraisons réussies',
            trend: 'En bonne voie pour le T4',
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
                    className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md cursor-pointer active:scale-95"
                >
                    <Plus size={20} />
                    Ajouter une réalisation
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {metrics.map((item) => (
                    <div
                        key={item.id}
                        className="bg-card p-8 rounded-xl border border-card-border shadow-sm hover:shadow-md transition-shadow"
                    >
                        {/* Icon Circle */}
                        <div
                            className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center mb-6`}
                        >
                            {item.icon}
                        </div>

                        <div className="space-y-1 mb-6">
                            <p className="text-sm font-semibold text-text-main uppercase tracking-wide">
                                {item.label}
                            </p>
                            <h2 className="text-4xl font-extrabold text-text-muted">
                                {item.value}
                            </h2>
                            <p className="text-text-subtle font-medium">
                                {item.subtext}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-card-border w-full mb-4" />

                        {/* Trend info */}
                        <div className="flex items-center gap-1.5 text-blue-500 text-sm font-medium">
                            <ArrowUpRight size={16} />
                            <span>{item.trend}</span>
                        </div>
                    </div>
                ))}
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
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                        i === 0
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'text-text-muted hover:text-text-main'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <button
                            className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-text-muted hover:text-text-main hover:bg-white/[0.08] transition-all"
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
                            ) : achievements?.data &&
                              achievements.data.length > 0 ? (
                                achievements.data.map((achievement: any) => (
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
                            ) : (
                                <EmptyState
                                    title="Vos Accomplissements"
                                    description="
                                        Retrouvez ici l'ensemble de vos succès et leur évolution.
                                        Nous préparons une chronologie visuelle pour retracer votre
                                        parcours : restez connectés !"
                                    icon={
                                        <Trophy strokeWidth={1.5} size={32} />
                                    }
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
