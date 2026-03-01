'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePostQuery } from '@/lib/query/post.query';
import MainLayout from '@/components/sections/admin-panel/main-layout';
import {
    Edit3,
    Eye,
    Calendar,
    Layout,
    User,
    ArrowLeft,
    CheckCircle2,
    FileText,
    ExternalLink,
} from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function PostDetailsAdminPage({
    params,
}: {
    params: Promise<{ postId: string }>;
}) {
    const router = useRouter();
    const resolvedParams = use(params);
    const { data: post, isLoading } = usePostQuery(resolvedParams.postId);

    if (isLoading)
        return (
            <div className="p-10 flex justify-center">
                <LoadingSpinner />
            </div>
        );
    if (!post?.data)
        return <div className="p-10 text-red-500">Post introuvable.</div>;

    const postData = post.data;
    const isPublished = !!postData.publishedAt;

    return (
        <MainLayout>
            <div className="p-6 lg:p-10 bg-background min-h-screen font-sans text-text-main">
                {/* Top Bar Navigation */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 bg-slate-200/20 border border-card-border rounded-lg hover:bg-slate-100/40 transition-colors"
                        >
                            <ArrowLeft size={20} className="text-text-main" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold tracking-tight">
                                    Détails de l'article
                                </h1>
                            </div>
                            <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                    isPublished
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-amber-100 text-amber-700'
                                }`}
                            >
                                {isPublished ? 'Publié' : 'Brouillon'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={`/blog/${postData.id}`}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-lg text-sm font-semibold hover:bg-card-border transition-all"
                        >
                            <ExternalLink size={16} /> Voir sur le site
                        </Link>
                        <Link
                            href={`/admin/posts/${postData.id}/edit`}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm transition-all cursor-pointer"
                        >
                            <Edit3 size={16} /> Modifier l'article
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne Gauche : Contenu principal */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-card-border bg-card-border">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                                    <FileText size={16} /> Contenu Éditorial
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-2 block">
                                        Titre
                                    </label>
                                    <p className="text-xl font-bold text-text-main">
                                        {postData.title}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-2 block">
                                        Extrait (Excerpt)
                                    </label>
                                    <p className="text-slate-600 leading-relaxed bg-card p-4 rounded-lg border border-card-border">
                                        {postData.excerpt ||
                                            'Aucun extrait rédigé.'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-[12px] font-black text-text-muted uppercase tracking-widest mb-2 block">
                                        Corps de l'article
                                    </label>
                                    <div className="text-text-main prose prose-sm max-w-none">
                                        {postData.content
                                            .split('\n')
                                            .map((p: string, i: number) => (
                                                <p key={i} className="mb-4">
                                                    {p}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Image */}
                    <div className="space-y-6">
                        <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-card-border bg-card-border">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                    <Layout size={16} /> Image de couverture
                                </h2>
                            </div>
                            <div className="p-4">
                                <div className="relative aspect-video rounded-lg overflow-hidden border border-card-border">
                                    <Image
                                        src={
                                            postData.imageUrl ||
                                            '/placeholder.jpg'
                                        }
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Informations Système */}
                        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-card-border bg-card-border">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                                    <CheckCircle2 size={16} /> Paramètres &
                                    Stats
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-card-border">
                                    <span className="text-sm text-text-muted flex items-center gap-2">
                                        <User size={14} /> Auteur
                                    </span>
                                    <span className="text-sm font-bold">
                                        {postData.team?.user?.username ||
                                            'Admin'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-card-border">
                                    <span className="text-sm text-text-muted flex items-center gap-2">
                                        <Calendar size={14} /> Création
                                    </span>
                                    <span className="text-sm font-bold">
                                        {new Date(
                                            postData.createdAt,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-card-border">
                                    <span className="text-sm text-text-muted flex items-center gap-2">
                                        <Eye size={14} /> Vues
                                    </span>
                                    <span className="text-sm font-bold">
                                        {postData.views || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-text-muted">
                                        Catégorie
                                    </span>
                                    <span className="px-2 py-0.5 bg-blue-50/20 text-text-main text-[11px] font-bold rounded uppercase">
                                        {postData.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
