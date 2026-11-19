'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    Plus,
    Mail,
    Linkedin,
    Twitter,
    Youtube,
    Globe,
    Trash2,
    Pencil,
} from 'lucide-react';
import { useTeamsQuery } from '@/lib/query/user.query';
import EmptyState from '@/components/ui/empty-state';
import TeamSkeletton from '@/components/ui/team-skelette';
import ErrorState from '@/components/ui/error-state';
import { deleteTeamAction } from '@/actions/admin/user';
import useNotification from '@/hooks/use-taost';
import DeleteConfirmModal from '@/components/ui/delete-confirm-modal';

export default function Teams() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { notifyError, notifySuccess } = useNotification();
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

    const {
        data: teamMembers,
        isLoading,
        refetch,
        error,
        isError,
    } = useTeamsQuery();

    const handleDelete = async () => {
        if (!selectedTeamId) return;

        startTransition(async () => {
            try {
                const result = await deleteTeamAction(selectedTeamId);

                if (result.success) {
                    setIsModalOpen(false);
                    setSelectedTeamId(null);
                    notifySuccess(result.message || 'Supprimé avec succès');

                    await refetch();
                } else {
                    notifyError(String(result.error));
                }
            } catch (err) {
                notifyError('Une erreur est survenue');
            }
        });
    };

    return (
        <div className="min-h-screen bg-background p-10 font-sans text-text-main">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tighter">
                        Membres de l'équipe
                    </h1>
                    <p className="text-text-muted mt-1">
                        Gérez votre équipe professionnelle et leurs
                        contributions.
                    </p>
                </div>
                <button
                    onClick={() => router.push('/admin/teams/new')}
                    className="group flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg"
                >
                    <Plus
                        size={20}
                        className="group-hover:rotate-90 transition-transform"
                    />
                    Ajouter un membre
                </button>
            </div>

            {/* Rendu Conditionnel */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TeamSkeletton />
                </div>
            ) : isError ? (
                <ErrorState onRetry={refetch} message={error.message} />
            ) : teamMembers?.data && teamMembers.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.data.map((member: any) => (
                        <div
                            key={member.id}
                            className="relative group bg-card rounded-xl border border-card-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Actions Buttons */}
                            <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() =>
                                        router.push(`/admin/teams/${member.id}`)
                                    }
                                    className="p-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-lg"
                                    title="Modifier"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedTeamId(member.id);
                                        setIsModalOpen(true);
                                    }}
                                    className="p-2 bg-white/10 backdrop-blur-md border border-white/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                    title="Supprimer"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="relative p-6 pb-0">
                                <div className="relative w-28 h-28 mx-auto">
                                    <img
                                        src={
                                            member?.image || '/images/user.jpg'
                                        }
                                        alt={`${member.first_name}`}
                                        className="w-full h-full object-cover rounded-full shadow-lg group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-0 right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
                                        <Mail size={16} />
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex justify-center gap-3 mt-6">
                                    {member.socialLinks &&
                                        Object.entries(member.socialLinks).map(
                                            ([platform, url]) => {
                                                if (
                                                    !url ||
                                                    typeof url !== 'string'
                                                )
                                                    return null;

                                                const platformConfig: any = {
                                                    linkedin: {
                                                        icon: Linkedin,
                                                        color: 'text-blue-600',
                                                        bg: 'hover:bg-blue-100',
                                                    },
                                                    twitter: {
                                                        icon: Twitter,
                                                        color: 'text-sky-500',
                                                        bg: 'hover:bg-sky-100',
                                                    },
                                                    facebook: {
                                                        icon: Globe,
                                                        color: 'text-blue-700',
                                                        bg: 'hover:bg-blue-50',
                                                    },
                                                    youtube: {
                                                        icon: Youtube,
                                                        color: 'text-red-600',
                                                        bg: 'hover:bg-red-50',
                                                    },
                                                };

                                                const config =
                                                    platformConfig[
                                                        platform.toLowerCase()
                                                    ];
                                                if (!config) return null;
                                                const Icon = config.icon;

                                                return (
                                                    <a
                                                        key={platform}
                                                        href={
                                                            url.startsWith(
                                                                'http',
                                                            )
                                                                ? url
                                                                : `https://${url}`
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`p-2 bg-slate-400/10 ${config.bg} ${config.color} rounded-lg transition-all duration-200 hover:scale-110 shadow-sm`}
                                                    >
                                                        <Icon size={18} />
                                                    </a>
                                                );
                                            },
                                        )}
                                </div>
                            </div>

                            <div className="p-8 pt-4 text-center flex-grow">
                                <h3 className="text-2xl font-bold text-text-main leading-tight">
                                    {member.first_name} {member.last_name}
                                </h3>
                                <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                                    {member.role || 'Membre équipe'}
                                </p>
                                <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                                    {member.bio ||
                                        'Aucune biographie disponible.'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="Votre catalogue est vide"
                    description="Commencez à bâtir votre équipe professionnelle dès maintenant."
                    copy="Ajouter mon premier membre"
                />
            )}

            <DeleteConfirmModal
                title="Supprimer définitivement"
                element="ce membre de l'équipe"
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTeamId(null);
                }}
                onConfirm={handleDelete}
                isLoading={isPending}
            />
        </div>
    );
}
