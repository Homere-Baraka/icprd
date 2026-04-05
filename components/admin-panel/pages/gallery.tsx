'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Eye,
    Trash2,
    Plus,
    ChevronLeft,
    ChevronRight,
    X,
    ImageIcon,
    Loader2,
    AlertCircle,
} from 'lucide-react';
import { useGalleriesQuery } from '@/lib/query/query';

export default function Gallery({ dict }: { dict: any }) {
    const t = dict?.admin_gallery || {};
    const router = useRouter();
    const { data: response, isLoading, error } = useGalleriesQuery();
    const galleries = response?.data || [];

    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const openCarousel = (index: number) => setCurrentIndex(index);
    const closeCarousel = () => setCurrentIndex(null);
    const nextImage = () =>
        currentIndex !== null &&
        setCurrentIndex((currentIndex + 1) % galleries.length);
    const prevImage = () =>
        currentIndex !== null &&
        setCurrentIndex(
            (currentIndex - 1 + galleries.length) % galleries.length,
        );

    if (isLoading) {
        return (
            <div className="min-h-screen p-10">
                <div className="flex justify-between mb-8 animate-pulse">
                    <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                    <div className="h-12 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="aspect-[4/3] rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <h2 className="text-2xl font-bold">
                    Oups ! Une erreur est survenue
                </h2>
                <p className="text-slate-500 mb-6">
                    Impossible de charger les images pour le moment.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-white rounded-xl"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 lg:p-10 font-sans text-text-main relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">
                        {t.title || 'Gallery'}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {t.subtitle || 'Gérez vos ressources visuelles.'}
                    </p>
                </div>
                <button
                    onClick={() => router.push('/admin/gallery/new')}
                    className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                    <Plus size={20} />
                    {t.btn_add || 'Ajouter une image'}
                </button>
            </div>

            {galleries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-card-border rounded-[3rem] bg-slate-500/5">
                    <ImageIcon size={64} className="text-slate-400 mb-4" />
                    <p className="text-slate-500 font-medium">
                        Aucune image dans la galerie pour le moment.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {galleries.map((gallery: any, index: number) => (
                        <div
                            key={gallery.id}
                            className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-card-border bg-slate-900 shadow-sm"
                        >
                            <img
                                src={gallery.imageUrl}
                                alt={gallery.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6 backdrop-blur-[2px]">
                                <div className="flex justify-end gap-2 translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-500">
                                    <button
                                        onClick={() => openCarousel(index)}
                                        className="p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white rounded-2xl transition-colors border border-white/20"
                                    >
                                        <Eye size={20} />
                                    </button>
                                    <button className="p-3 bg-red-500/20 hover:bg-red-500 text-white rounded-2xl transition-colors border border-red-500/50">
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <div className="translate-y-[10px] group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-[10px] uppercase tracking-widest text-primary font-black mb-1 block">
                                        {gallery.category}
                                    </span>
                                    <h3 className="text-white font-bold text-lg leading-tight truncate">
                                        {gallery.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {currentIndex !== null && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
                    <button
                        onClick={closeCarousel}
                        className="absolute top-6 right-6 p-4 text-white/50 hover:text-white transition-colors z-[210]"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-6 p-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all z-[210] hidden md:block"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-6 p-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all z-[210] hidden md:block"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Main Image & Info */}
                    <div className="w-full max-w-5xl px-4 flex flex-col items-center">
                        <div className="relative group w-full aspect-video md:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                            <img
                                src={galleries[currentIndex].imageUrl}
                                alt={
                                    galleries[currentIndex].title ||
                                    'Gallery Image'
                                }
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="mt-8 text-center text-white space-y-2">
                            <h2 className="text-2xl font-black">
                                {galleries[currentIndex].title}
                            </h2>
                            <p className="text-primary font-bold uppercase tracking-widest text-sm">
                                {galleries[currentIndex].category}
                            </p>
                            <p className="text-slate-400 max-w-2xl mx-auto italic">
                                {galleries[currentIndex].description}
                            </p>

                            {/* Compteur */}
                            <div className="mt-4 inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-mono">
                                {currentIndex + 1} / {galleries.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
