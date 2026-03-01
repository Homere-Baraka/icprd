'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Plus,
    Mail,
    Github,
    Linkedin,
    Twitter,
    MessageSquare,
    Award,
    FileText,
} from 'lucide-react';
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
                    className="flex items-center gap-2 bg-primary hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md font-medium transition-all shadow-md cursor-pointer active:scale-95"
                >
                    <Plus size={20} />
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
                            {/* Top Section: Photo & Socials */}
                            <div className="relative p-6 pb-0">
                                <div className="relative w-32 h-32 mx-auto">
                                    <img
                                        src={
                                            member?.imageUrl ||
                                            '/images/user.jpg'
                                        }
                                        alt={`${member.user.username} ${member.user.first_name}`}
                                        className="w-full h-full object-cover rounded-[2rem] shadow-lg group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-[#2563eb] text-white p-2 rounded-xl shadow-lg">
                                        <Mail size={16} />
                                    </div>
                                </div>

                                {/* Social Links Popover (Visible on hover) */}
                                <div className="flex justify-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {member?.socialLinks?.github && (
                                        <button className="p-2 bg-slate-400/20 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                                            <Github size={18} />
                                        </button>
                                    )}
                                    {member.socialLinks?.linkedin && (
                                        <button className="p-2 bg-slate-400/20 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors">
                                            <Linkedin size={18} />
                                        </button>
                                    )}
                                    {member.socialLinks?.twitter && (
                                        <button className="p-2 bg-slate-400/20 hover:bg-sky-100 rounded-lg text-sky-500 transition-colors">
                                            <Twitter size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 pt-4 text-center flex-grow">
                                <h3 className="text-2xl font-bold text-text-main">
                                    {member.user.username}{' '}
                                    {member.user.last_name}
                                </h3>
                                <p className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider mb-4">
                                    {member.role || 'Aucun rôle défini'}
                                </p>
                                <p className="text-text-muted text-sm leading-relaxed mb-6">
                                    {member.bio || 'No bio provided yet.'}
                                </p>

                                {/* Integration Stats (Basé sur ton modèle Prisma) */}
                                <div className="grid grid-cols-3 gap-2 bg-card-border rounded-xl p-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-1 text-text-main mb-1">
                                            <FileText size={14} />
                                            <span className="text-[10px] font-bold uppercase">
                                                Posts
                                            </span>
                                        </div>
                                        <span className="font-bold text-text-muted">
                                            {member._count.posts}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center border-x border-gray-500">
                                        <div className="flex items-center gap-1 text-text-main mb-1">
                                            <MessageSquare size={14} />
                                            <span className="text-[10px] font-bold uppercase">
                                                Tips
                                            </span>
                                        </div>
                                        <span className="font-bold text-text-muted">
                                            {member._count.testimonials}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-1 text-text-main mb-1">
                                            <Award size={14} />
                                            <span className="text-[10px] font-bold uppercase">
                                                Wins
                                            </span>
                                        </div>
                                        <span className="font-bold text-text-muted">
                                            {member._count.achievements}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Action */}
                            <button className="w-full py-4 bg-background group-hover:bg-card-border group-hover:text-white transition-colors font-bold text-sm text-text-subtle border-t border-card-border cursor-pointer">
                                VIEW FULL PROFILE
                            </button>
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
