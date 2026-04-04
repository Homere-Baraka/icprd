'use client';

import { ChevronRight, AlertCircle } from 'lucide-react';
import { useBlogHeadlineQuery } from '@/lib/query/query';
import { getDescriptionForHeadline } from '@/utils/get-description';

export default function FeatureBlog() {
    const { data: response, isLoading, isError } = useBlogHeadlineQuery();
    const blogHeadline = response?.data;

    if (isLoading) {
        return (
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#161b33] border border-slate-400/20 rounded-3xl p-4 lg:p-8 animate-pulse">
                    <div className="aspect-[16/10] lg:aspect-square bg-slate-700/50 rounded-2xl" />
                    <div className="space-y-4">
                        <div className="h-4 w-32 bg-slate-700/50 rounded" />
                        <div className="h-10 w-full bg-slate-700/50 rounded" />
                        <div className="h-10 w-3/4 bg-slate-700/50 rounded" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-slate-700/50 rounded" />
                            <div className="h-4 w-5/6 bg-slate-700/50 rounded" />
                        </div>
                        <div className="pt-4">
                            <div className="h-12 w-48 bg-slate-700/50 rounded-xl" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !blogHeadline) {
        return (
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center py-12 px-6 bg-[#161b33] border border-red-500/20 rounded-3xl text-center">
                    <AlertCircle className="text-red-400 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-white">
                        Impossible de charger l'article vedette
                    </h3>
                    <p className="text-slate-400 mt-2">
                        Une erreur est survenue lors de la récupération des
                        données.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#161b33] border border-slate-400/20 rounded-3xl overflow-hidden p-4 lg:p-8 hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[16/10] lg:aspect-square overflow-hidden rounded-2xl">
                    <img
                        src={blogHeadline.imageUrl || '/images/war-child.webp'}
                        alt={blogHeadline.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black uppercase text-primary">
                            Populaire
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <span>
                            {new Date(
                                blogHeadline.createdAt,
                            ).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span className="text-primary uppercase tracking-wider">
                            {blogHeadline.category || 'Actualité'}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span className="text-slate-300 italic">
                            {blogHeadline.views} vues
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight transition-colors">
                        {blogHeadline.title}
                    </h2>

                    <p className="text-slate-200 leading-relaxed line-clamp-3">
                        {getDescriptionForHeadline(blogHeadline.contents)}
                    </p>

                    <div className="pt-4">
                        <a
                            href={`/blogs/${blogHeadline.id}`}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white w-60 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                        >
                            Lire l'article complet <ChevronRight size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
