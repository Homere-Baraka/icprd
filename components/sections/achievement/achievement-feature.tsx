'use client';

import {
    ChevronRight,
    Target,
    MapPin,
    AlertCircle,
    TrendingUp,
} from 'lucide-react';
import { useAchievementHeadlineQuery } from '@/lib/query/query';
import { getDescriptionForHeadline } from '@/utils/get-description';

export default function FeatureAchievement() {
    const {
        data: response,
        isLoading,
        isError,
    } = useAchievementHeadlineQuery();
    const achievement = response?.data;

    if (isLoading) {
        return (
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#161b33] border border-slate-400/20 rounded-3xl p-4 lg:p-8 animate-pulse">
                    <div className="aspect-[16/10] lg:aspect-square bg-slate-700/50 rounded-2xl" />
                    <div className="space-y-6">
                        <div className="h-4 w-40 bg-slate-700/50 rounded" />
                        <div className="h-12 w-full bg-slate-700/50 rounded" />
                        <div className="h-20 w-full bg-slate-700/50 rounded" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-16 bg-slate-700/50 rounded-xl" />
                            <div className="h-16 bg-slate-700/50 rounded-xl" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !achievement) {
        return (
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center py-12 bg-[#161b33] border border-slate-400/20 rounded-3xl text-center">
                    <AlertCircle className="text-slate-500 mb-3" size={40} />
                    <h3 className="text-lg font-bold text-white">
                        Aucun succès récent à afficher
                    </h3>
                    <p className="text-slate-400 text-sm">
                        Les nouveaux accomplissements apparaîtront ici sous peu.
                    </p>
                </div>
            </section>
        );
    }

    // --- ÉTAT SUCCÈS ---
    return (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#161b33] border border-slate-400/20 rounded-3xl overflow-hidden p-4 lg:p-8 hover:shadow-xl transition-all duration-500">
                {/* Image Section */}
                <div className="relative aspect-[16/10] lg:aspect-square overflow-hidden rounded-2xl">
                    <img
                        src={
                            achievement.imageUrl ||
                            '/images/achievement-main.webp'
                        }
                        alt={achievement.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow-lg tracking-widest">
                            Succès Majeur
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-primary" />
                            {achievement?.province > 1
                                ? `Déployé dans ${achievement?.province} provinces`
                                : 'Impact local'}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span className="text-primary uppercase flex items-center gap-1">
                            <Target size={14} />{' '}
                            {achievement.category || 'Impact'}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                        {achievement.title}
                    </h2>

                    {/* On affiche le premier contenu textuel s'il existe */}
                    <p className="text-slate-300 leading-relaxed italic border-l-2 border-primary/30 pl-4 line-clamp-3">
                        "
                        {getDescriptionForHeadline(achievement.contents) ||
                            "Découvrez l'impact de notre dernier projet sur le terrain."}
                        "
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 flex flex-col justify-center">
                            <span className="flex items-center gap-1 text-primary font-black text-xl">
                                <TrendingUp size={16} />
                                {'Actif'}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                                Revenu / Impact
                            </span>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 flex flex-col justify-center">
                            <span className="block text-primary font-black text-xl">
                                +{achievement?.countries || 1}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                                Pays Touchés
                            </span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <a
                            href={`/achievements/${achievement.id}`}
                            className="group/btn flex items-center gap-2 px-6 py-3 bg-primary w-68 text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            Voir les détails du projet
                            <ChevronRight
                                size={18}
                                className="group-hover/btn:translate-x-1 transition-transform"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
