'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Mail, Linkedin, Twitter, Youtube, Globe } from 'lucide-react';
import { useTeamsQuery } from '@/lib/query/user.query';
import EmptyState from '@/components/ui/empty-state';
import TeamSkeletton from '@/components/ui/team-skelette';
import ErrorState from '@/components/ui/error-state';

export default function Teams() {
    const router = useRouter();
    const {
        data: teamMembers,
        isLoading,
        refetch,
        error,
        isError,
    } = useTeamsQuery();

    return (
        <div className="min-h-screen bg-background p-10 font-sans text-text-main">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-3xl font-bold">Membres de l'équipe</h1>
                    <p className="text-text-muted mt-1">
                        Gérez votre équipe professionnelle et leurs
                        contributions.
                    </p>
                </div>
                <button
                    onClick={() => router.push('/admin/teams/new')}
                    className="group flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full hover:pr-8 transition-all duration-300 cursor-pointer"
                >
                    <Plus
                        size={20}
                        className="group-hover:rotate-90 transition-transform"
                    />
                    Ajouter un membre
                </button>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    <TeamSkeletton />
                ) : isError ? (
                    <ErrorState onRetry={refetch} message={error.message} />
                ) : teamMembers?.data && teamMembers.data.length > 0 ? (
                    teamMembers.data.map((member: any) => (
                        <div
                            key={member.id}
                            className="group bg-card rounded-xl border border-card-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            <div className="relative p-6 pb-0">
                                <div className="relative w-28 h-28 mx-auto">
                                    <img
                                        src={
                                            member?.image || '/images/user.jpg'
                                        }
                                        alt={`${member.first_name} ${member.last_name}`}
                                        className="w-full h-full object-cover rounded-full shadow-lg group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-0 right-2 bg-[#2563eb] text-white p-2 rounded-xl shadow-lg">
                                        <Mail size={16} />
                                    </div>
                                </div>

                                <div className="flex justify-center gap-3 mt-6 transition-opacity duration-300">
                                    {member.socialLinks &&
                                        Object.entries(member.socialLinks).map(
                                            ([platform, url]) => {
                                                if (
                                                    !url ||
                                                    typeof url !== 'string'
                                                )
                                                    return null;

                                                const platformConfig: Record<
                                                    string,
                                                    {
                                                        icon: any;
                                                        color: string;
                                                        bg: string;
                                                    }
                                                > = {
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
                                                        title={`Visiter ${platform}`}
                                                    >
                                                        <Icon size={18} />
                                                    </a>
                                                );
                                            },
                                        )}
                                </div>
                            </div>

                            <div className="p-8 pt-4 text-center flex-grow">
                                <h3 className="text-2xl font-bold text-text-main">
                                    {member.first_name} {member.last_name}
                                </h3>
                                <p className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider mb-4">
                                    {member.role || 'Aucun rôle défini'}
                                </p>
                                <p className="text-text-muted text-sm leading-relaxed mb-6">
                                    {member.bio || 'No bio provided yet.'}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyState
                        title="Votre catalogue est vide"
                        description="
                            Commencez à bâtir votre empire de blog en
                            créant votre tout premier blog premium."
                        copy=" C'est parti !"
                    />
                )}
            </div>
        </div>
    );
}
