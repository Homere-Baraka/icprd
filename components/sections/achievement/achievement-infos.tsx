'use client';

import { Eye, User, Calendar, Calendar1, CheckCircle2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAchievementsQuery } from '@/lib/query/query';
import { getDescription } from '@/utils/get-description';
import Link from 'next/link';

export default function AchievementInfos() {
    const { data, isLoading } = useAchievementsQuery();
    const achievements = data?.data?.filter(
        (achievement: any) => achievement.publishedAt !== null,
    );

    return (
        <>
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <h3 className="text-2xl md:text-3xl text-white font-black uppercase tracking-tighter leading-none">
                                    Dernières{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                                        Publications
                                    </span>
                                </h3>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80 mt-1">
                                    Archives & Rapports
                                </span>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((n) => (
                                <div
                                    key={n}
                                    className="h-[400px] bg-card-border/5 animate-pulse rounded-2xl"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {achievements &&
                                achievements.map((achievement: any) => (
                                    <article
                                        key={achievement?.id}
                                        className="achievement-card group relative flex flex-col bg-white dark:bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-primary/5"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                className="achievement-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                alt="Former child soldiers reintegration"
                                                src={`${achievement.imageUrl || '/images/user.png'}`}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                                            <div className="absolute bottom-4 left-6">
                                                <span
                                                    data-translate="achievement1.category"
                                                    className="bg-primary px-3 py-1 rounded-full text-[10px] font-black text-white tracking-widest uppercase mb-2 inline-block"
                                                >
                                                    {achievement.category}
                                                </span>
                                                <p
                                                    data-translate="achievement1.status"
                                                    className={
                                                        `text-white text-xs font-bold flex items-center gap-1.5
                                                        ${achievement.status === 'FINISHED' 
                                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                                            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                                        }`}
                                                >
                                                    {achievement.status === 'FINISHED' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                                                    {achievement.status === 'FINISHED' ? 'Terminé' : 'En cours'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <h3
                                                data-translate="achievement1.title"
                                                className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors"
                                            >
                                                {achievement.title}
                                            </h3>
                                            <p
                                                data-translate="achievement1.desc"
                                                className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                                            >
                                                {getDescription(
                                                    achievement.contents,
                                                )}
                                            </p>
                                            <div className="mt-8 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                        <User size={16} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-white">
                                                            {achievement.author
                                                                ?.username ||
                                                                'Équipe ICPRD'}
                                                        </span>
                                                        <span className="text-[10px] text-text-muted">
                                                            {achievement.createdAt &&
                                                                formatDistanceToNow(
                                                                    new Date(
                                                                        achievement.createdAt,
                                                                    ),
                                                                    {
                                                                        addSuffix: true,
                                                                        locale: fr,
                                                                    },
                                                                )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <a
                                                    href={`/achievements/${achievement.id}`}
                                                    data-translate="achievement1.report"
                                                    className="text-primary font-black text-xs uppercase tracking-tighter cursor-pointer hover:underline"
                                                >
                                                    Rapport Complet →
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                        </div>
                    )}

                    {achievements?.length === 0 && !isLoading && (
                        <div className="text-center py-20 text-text-muted border-2 border-dashed border-card-border/10 rounded-3xl">
                            No articles published yet.
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
