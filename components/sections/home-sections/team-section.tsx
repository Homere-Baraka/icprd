'use client';

import { Mail, Share2, Linkedin, Twitter, Globe } from 'lucide-react';
import { useTeamsQuery } from '@/lib/query/user.query';
import ErrorState from '@/components/ui/error-state';

export default function TeamSection({ dict }: { dict: any }) {
    const {
        data: teamMembers,
        isLoading,
        refetch,
        error,
        isError,
    } = useTeamsQuery();

    return (
        <section id="team" className="py-24 bg-white bg-[#161b33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2
                        data-translate="team.title"
                        className="text-3xl md:text-4xl font-black text-slate-900 text-white mb-4"
                    >
                        {dict.title}
                    </h2>
                    <p
                        data-translate="team.subtitle"
                        className="text-slate-600 text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        {dict.subtitle}
                    </p>
                </div>
                <div className="flex flex-wrap mx-auto justify-center gap-x-8 gap-y-12">
                    {isLoading ? (
                        [1, 2, 3, 4].map((m, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center flex-1 animate-pulse"
                            >
                                <div className="relative w-48 h-48 mb-6">
                                    <div className="absolute inset-0 bg-slate-200 bg-slate-800 rounded-2xl transform rotate-6"></div>
                                    <div className="relative w-full h-full bg-slate-300 bg-slate-700 rounded-2xl shadow-xl"></div>
                                </div>

                                <div className="h-6 w-40 bg-slate-300 bg-slate-700 rounded-md mb-2"></div>

                                <div className="h-4 w-32 bg-primary/20 rounded-md mb-5"></div>

                                <div className="flex gap-4 opacity-30">
                                    <div className="w-6 h-6 bg-slate-700 rounded-full"></div>
                                    <div className="w-6 h-6 bg-slate-700 rounded-full"></div>
                                </div>
                            </div>
                        ))
                    ) : isError ? (
                        <ErrorState
                            onRetry={refetch}
                            message={dict.error_loading || error?.message}
                        />
                    ) : (
                        teamMembers?.data &&
                        teamMembers.data.length > 0 &&
                        teamMembers.data.map((member: any) => (
                            <div
                                key={member.id}
                                className="team-member flex flex-col items-center group"
                            >
                                <div className="relative w-48 h-48 mb-6">
                                    <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform"></div>
                                    <img
                                        className="relative w-full h-full object-cover rounded-2xl shadow-xl grayscale group-hover:grayscale-0 transition-all"
                                        src={
                                            member?.image || '/images/user.jpg'
                                        }
                                        alt={`${member.first_name} ${member.last_name}`}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {member.first_name} {member.last_name}
                                </h3>
                                <p
                                    data-translate="team.position1"
                                    className="text-primary font-bold text-sm mb-4"
                                >
                                    {member.role}
                                </p>
                                <div className="flex justify-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
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
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
