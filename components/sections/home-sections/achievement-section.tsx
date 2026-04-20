'use client';

import { fr, enUS } from 'date-fns/locale';
import { useParams } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { useAchievementsQuery } from '@/lib/query/query';
import { Calendar1, User } from 'lucide-react';
import { getDescription } from '@/utils/get-description';

export default function AchievementSection({ dict }: { dict: any }) {
    const { lang } = useParams();
    const dateLocale = lang === 'en' ? enUS : fr;

    const { data, isLoading } = useAchievementsQuery();
    const achievements = data?.data
        ?.filter((a: any) => a.publishedAt !== null)
        .slice(0, 3);

    return (
        <section
            id="achievements"
            className="py-24 bg-background-dark overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2
                        data-translate="achievements.title"
                        className="text-3xl md:text-5xl font-black text-white mb-4"
                    >
                        {dict.title}
                    </h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
                    <p
                        data-translate="achievements.subtitle"
                        className="text-slate-400 max-w-2xl mx-auto text-lg italic"
                    >
                        {dict.subtitle}
                    </p>
                </div>

                {isLoading ? (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-16 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-80 bg-slate-800 rounded-2xl"
                            />
                        ))}
                    </div>
                ) : (
                    achievements &&
                    achievements?.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {achievements &&
                                achievements.map((achievement: any) => (
                                    <article
                                        key={achievement?.id}
                                        className="achievement-card group relative flex flex-col bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-primary/5"
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
                                                    className="text-white text-xs font-bold flex items-center gap-1.5"
                                                >
                                                    <Calendar1 size={18} />
                                                    {achievement.status ===
                                                    'PENDING'
                                                        ? 'Projet en cours'
                                                        : 'Projet terminé'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <h3
                                                data-translate="achievement1.title"
                                                className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors"
                                            >
                                                {achievement.title}
                                            </h3>
                                            <p
                                                data-translate="achievement1.desc"
                                                className="text-slate-400 text-sm leading-relaxed"
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
                                                                dict.default_author}
                                                        </span>
                                                        <span className="text-[10px] text-text-muted">
                                                            {achievement.createdAt &&
                                                                formatDistanceToNow(
                                                                    new Date(
                                                                        achievement.createdAt,
                                                                    ),
                                                                    {
                                                                        addSuffix: true,
                                                                        locale: dateLocale,
                                                                    },
                                                                )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <a
                                                    href={`/${lang}/achievements/${achievement.id}`}
                                                    data-translate="achievement1.report"
                                                    className="text-primary font-black text-xs uppercase tracking-tighter cursor-pointer hover:underline"
                                                >
                                                    {dict.report} →
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                        </div>
                    )
                )}
            </div>
        </section>
    );
}
