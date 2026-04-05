'use client';

import React from 'react';
import {
    X,
    FileText,
    Users,
    Handshake,
    Trophy,
    Plus,
    ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function QuickActionModal({ isOpen, onClose }: any) {
    const router = useRouter();

    if (!isOpen) return null;

    const actions = [
        {
            label: 'Nouveau Blog',
            description: 'Publier un article ou une actualité',
            icon: <FileText size={20} />,
            color: 'bg-blue-500/10 text-blue-500',
            href: '/admin/blogs/new',
        },
        {
            label: 'Ajouter un Membre',
            description: 'Intégrer un nouvel expert à l\'équipe',
            icon: <Users size={20} />,
            color: 'bg-emerald-500/10 text-emerald-500',
            href: '/admin/teams/new',
        },
        {
            label: 'Nouveau Partenaire',
            description: 'Enregistrer une collaboration stratégique',
            icon: <Handshake size={20} />,
            color: 'bg-amber-500/10 text-amber-500',
            href: '/admin/construction',
        },
        {
            label: 'Nouvelle Réussite',
            description: 'Documenter un projet achevé',
            icon: <Trophy size={20} />,
            color: 'bg-purple-500/10 text-purple-500',
            href: '/admin/achievements/new',
        },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40">
            {/* Overlay */}
            <div className="absolute inset-0 transition-opacity" onClick={onClose} />

            {/* Modal Card */}
            <div className="relative bg-card w-full max-w-lg rounded-[2rem] shadow-2xl border border-white/5 overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="p-8 border-b border-card-border flex justify-between items-center bg-zinc-900/50">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tighter">
                            Quick <span className="text-primary text-3xl">.</span> Actions
                        </h2>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
                            Raccourcis de gestion
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/5 text-zinc-400 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-90"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Liste des Actions */}
                <div className="p-4 space-y-2">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                router.push(action.href);
                                onClose();
                            }}
                            className="group w-full flex items-center justify-between p-4 rounded-[1.5rem] hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5 text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20`}>
                                    {action.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-100 group-hover:text-primary transition-colors">
                                        {action.label}
                                    </p>
                                    <p className="text-[11px] text-zinc-500 font-medium italic">
                                        {action.description}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="p-2 rounded-full bg-zinc-800 text-zinc-500 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1">
                                <ArrowRight size={16} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}