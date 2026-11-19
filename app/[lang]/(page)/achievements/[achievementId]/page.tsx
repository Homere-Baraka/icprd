'use client';

import React, { use } from 'react';
import { fr } from 'date-fns/locale';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/sections/shares/main-layout';
import {
    Calendar,
    Share2,
    ArrowLeft,
    Eye,
    User,
    Globe,
    Map,
    DollarSign,
    CheckCircle2,
    Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useAchievementsQuery, useAchievementQuery } from '@/lib/query/query';
import { getDescription } from '@/utils/get-description';
import { formatDistanceToNow, format } from 'date-fns';

import LoadingSpinner from '@/components/ui/loading-spinner';
import NewsletterSection from '@/components/sections/home-sections/newsletter-section';

export default function AchievementDetailPage({
    params,
}: {
    params: Promise<{ lang: string; achievementId: string }>;
}) {
    const resolvedParams = use(params);
    const router = useRouter();

    const { data: achievementResponse, isLoading: achievementLoading } =
        useAchievementQuery(resolvedParams.achievementId);
    const achievement = achievementResponse?.data;

    const { data: achievementsResponse, isLoading: achievementsLoading } =
        useAchievementsQuery();
    const otherAchievements = achievementsResponse?.data
        ?.filter(
            (a: any) =>
                a.id !== resolvedParams.achievementId && a.publishedAt !== null,
        )
        .slice(0, 3);

    return (
        <MainLayout>
            {achievementLoading && !achievement ? (
                <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <div className="relative h-[80vh] w-full overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img
                                src={
                                    achievement?.imageUrl || '/images/user.png'
                                }
                                alt={achievement?.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        </div>

                        <nav className="absolute top-0 w-full z-20 p-6">
                            <div className="max-w-7xl mx-auto flex justify-between items-center">
                                <button
                                    onClick={() => router.back()}
                                    className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                                >
                                    <ArrowLeft size={18} />
                                    <span className="text-xs font-black uppercase tracking-widest">
                                        Retour aux réalisations
                                    </span>
                                </button>
                                <button className="p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-primary transition-all">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </nav>

                        <div className="absolute bottom-0 w-full z-10 pb-16">
                            <div className="max-w-6xl mx-auto px-6">
                                <h1 className="text-4xl md:text-7xl font-black text-white leading-[1] mb-8 tracking-tighter max-w-4xl">
                                    {achievement?.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                            <User
                                                size={18}
                                                className="text-primary"
                                            />
                                        </div>
                                        <span className="font-bold text-white uppercase tracking-tighter">
                                            {achievement?.author?.username ||
                                                'Équipe ICPRD'}
                                        </span>
                                    </div>
                                    {achievement?.date && (
                                        <div className="flex items-center gap-2">
                                            <Calendar
                                                size={18}
                                                className="text-primary"
                                            />
                                            <span className="font-bold">
                                                {format(
                                                    new Date(achievement.date),
                                                    'dd MMMM yyyy',
                                                    { locale: fr },
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="max-w-6xl mx-auto px-6 pt-10 pb-24">
                        <div className="prose prose-invert prose-lg max-w-none prose-img:rounded-3xl prose-p:text-slate-300 prose-headings:text-white prose-headings:font-black">
                            {Array.isArray(achievement?.contents) ? (
                                achievement.contents.map(
                                    (content: any, index: number) => (
                                        <div
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                                __html: content.value,
                                            }}
                                            className="mb-6"
                                        />
                                    ),
                                )
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            achievement?.contents ||
                                            '<p>Aucun contenu disponible.</p>',
                                    }}
                                />
                            )}
                        </div>

                        <div className="mt-20 pt-10 border-t border-white/10 flex flex-wrap gap-3">
                            <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400">
                                #IMPACT_SOCIAL
                            </span>
                            <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400">
                                #RDC
                            </span>
                            <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 uppercase">
                                #{achievement?.category}
                            </span>
                        </div>
                    </section>
                </>
            )}

            {!achievementsLoading &&
                otherAchievements &&
                otherAchievements.length > 0 && (
                    <section className="bg-white/[0.02] py-24 border-t border-white/5">
                        <div className="max-w-7xl mx-auto px-6">
                            <h3 className="text-3xl font-black text-white tracking-tighter mb-12">
                                Autres réalisations d'impact
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {otherAchievements.map((item: any) => (
                                    <article
                                        key={item.id}
                                        className="group bg-slate-900/40 rounded-3xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500"
                                    >
                                        <Link
                                            href={`/${resolvedParams.lang}/achievements/${item.id}`}
                                        >
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={
                                                        item.imageUrl ||
                                                        '/images/user.png'
                                                    }
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    alt={item.title}
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h4 className="text-xl font-bold text-white mb-4 line-clamp-2">
                                                    {item.title}
                                                </h4>
                                                <p className="text-slate-400 text-sm line-clamp-2 mb-6">
                                                    {getDescription(
                                                        item.contents,
                                                    )}
                                                </p>
                                                <div className="flex items-center justify-between text-[10px] font-black text-primary uppercase tracking-widest">
                                                    Voir le rapport →
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

            <NewsletterSection />
        </MainLayout>
    );
}
