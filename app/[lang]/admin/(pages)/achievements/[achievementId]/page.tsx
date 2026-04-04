'use client';

import React, { use, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAchievementQuery } from '@/lib/query/query';
import MainLayout from '@/components/admin-panel/main-layout';
import {
    Edit3,
    Eye,
    Tag,
    Map,
    Globe,
    Calendar,
    Layout,
    User,
    Trash2,
    ArrowLeft,
    CheckCircle2,
    FileText,
    ExternalLink,
    DollarSign,
} from 'lucide-react';
import DeleteConfirmModal from '@/components/ui/delete-confirm-modal';
import { deleteAchievementAction } from '@/actions/admin/achievement';
import useNotification from '@/hooks/use-taost';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function AchievementDetailsAdminPage({
    params,
}: {
    params: Promise<{ achievementId: string }>;
}) {
    const router = useRouter();
    const resolvedParams = use(params);
    const { notifyError, notifySuccess } = useNotification();
    const [isPending, startTransition] = useTransition();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: achievement, isLoading } = useAchievementQuery(
        resolvedParams.achievementId,
    );

    const achievementData = achievement?.data;
    const isPublished = !!achievementData?.publishedAt;
    const htmlContent = achievementData?.contents?.[0]?.value || '';

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteAchievementAction(
                String(resolvedParams.achievementId),
            );

            if (result.success) {
                setIsModalOpen(false);
                notifySuccess(String(result.message));
                router.push('/admin/achievements');
            } else {
                notifyError(String(result.error));
            }
        });
    };

    return (
        <MainLayout>
            {isLoading || !achievementData ? (
                <div className="p-10 mt-10 flex justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="p-6 lg:p-10 bg-background min-h-screen font-sans text-text-main">
                    {/* Top Bar Navigation */}
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="p-2 bg-card border border-card-border rounded-lg hover:bg-card-border transition-colors shadow-sm cursor-pointer"
                            >
                                <ArrowLeft
                                    size={20}
                                    className="text-text-main"
                                />
                            </button>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight text-text-main">
                                    Détails de l'article
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            isPublished
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                        }`}
                                    >
                                        {isPublished ? 'Publié' : 'Brouillon'}
                                    </span>
                                    <span className="text-text-muted text-xs">
                                        •
                                    </span>
                                    <span className="text-text-muted text-xs flex items-center gap-1">
                                        <Tag size={12} />{' '}
                                        {achievementData?.category}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                title="Supprimer"
                            >
                                <Trash2 size={20} />
                            </button>
                            <Link
                                href={`/achievements/${achievementData?.id}`}
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-lg text-sm font-bold hover:bg-card-border transition-all shadow-sm"
                            >
                                <ExternalLink size={16} /> Voir sur le site
                            </Link>
                            <Link
                                href={`/admin/achievements/${achievementData?.id}/edit`}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 shadow-md transition-all"
                            >
                                <Edit3 size={16} /> Modifier
                            </Link>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Colonne gauche */}
                        <div className="space-y-6">
                            <div className="border border-card-border rounded-2xl shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-card-border bg-card">
                                    <h2 className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                                        <Layout size={14} /> Image de couverture
                                    </h2>
                                </div>
                                <div className="p-4">
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-card-border shadow-inner bg-slate-50">
                                        <Image
                                            src={
                                                achievementData?.imageUrl ||
                                                '/placeholder.jpg'
                                            }
                                            alt="Couverture"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Statistiques & Métadonnées */}
                            <div className="border border-card-border rounded-2xl shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-card-border bg-card">
                                    <h2 className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                                        <CheckCircle2 size={14} /> Informations
                                    </h2>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-muted flex items-center gap-2 font-medium">
                                            <User size={14} /> Auteur
                                        </span>
                                        <span className="font-bold text-text-main">
                                            {achievementData?.author
                                                ?.username || 'Équipe Admin'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-muted flex items-center gap-2 font-medium">
                                            <Calendar size={14} /> Date
                                        </span>
                                        <span className="font-bold text-text-main">
                                            {new Date(
                                                achievementData?.createdAt,
                                            ).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-muted flex items-center gap-2 font-medium">
                                            <DollarSign
                                                size={14}
                                                className="text-emerald-500"
                                            />{' '}
                                            Revenu généré
                                        </span>
                                        <span className="font-bold text-text-main">
                                            {achievementData?.revenue?.toLocaleString(
                                                'en-US',
                                            )}{' '}
                                            $
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-muted flex items-center gap-2 font-medium">
                                            <Map
                                                size={14}
                                                className="text-blue-500"
                                            />{' '}
                                            Provinces ciblées
                                        </span>
                                        <span className="font-bold text-text-main">
                                            {achievementData?.province || 0}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-muted flex items-center gap-2 font-medium">
                                            <Globe
                                                size={14}
                                                className="text-indigo-500"
                                            />{' '}
                                            Pays ciblés
                                        </span>
                                        <span className="font-bold text-text-main">
                                            {achievementData?.countries || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Colonne de Droit */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="border border-card-border rounded-2xl shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-card-border bg-card">
                                    <h2 className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                                        <FileText size={14} /> Contenu de
                                        l'article
                                    </h2>
                                </div>

                                <div className="p-8 space-y-8">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">
                                            Titre de l'article
                                        </label>
                                        <h3 className="text-3xl font-black text-text-main leading-tight">
                                            {achievementData?.title}
                                        </h3>
                                    </div>

                                    <hr className="border-card-border" />

                                    {/* Corps de l'article avec Rendu HTML */}
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">
                                            Corps du texte
                                        </label>

                                        <div
                                            className="prose prose-blue prose-h1:text-text-main prose-h2:text-text-main prose-img:rounded-xl prose-img:max-w-[45%] prose-headings:font-black max-w-none text-text-main leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: htmlContent,
                                            }}
                                        />

                                        {!htmlContent && (
                                            <p className="text-slate-400 italic">
                                                Aucun contenu rédigé pour cet
                                                article.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <DeleteConfirmModal
                title="Supprimer cette Réalisation"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                isLoading={isPending}
            />
        </MainLayout>
    );
}
