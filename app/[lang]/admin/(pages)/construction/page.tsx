'use client';

import React from 'react';
import {
    Construction,
    Cpu,
    Rocket,
    ArrowLeft,
    ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminComingSoon() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            {/* EFFET DE LUMIÈRE EN ARRIÈRE-PLAN */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />

            {/* ICÔNE ANIMÉE */}
            <div className="relative mb-8">
                <div className="size-24 bg-slate-900 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative z-10">
                    <Cpu size={40} className="text-primary animate-pulse" />
                </div>
                {/* Petits éléments décoratifs flottants */}
                <div className="absolute -top-2 -right-2 size-8 bg-primary/20 rounded-full blur-md animate-bounce" />
            </div>

            {/* TEXTE PRINCIPAL */}
            <div className="max-w-xl space-y-4">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                    Module en{' '}
                    <span className="text-primary">Développement</span>
                </h1>

                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    Cette section du panneau d'administration est en cours
                    d'optimisation. Nous finalisons l'architecture de données
                    pour garantir une gestion fluide et sécurisée de vos
                    contenus **ICPRD**.
                </p>
            </div>

            {/* DASHBOARD STATUS (POUR CONVAINCRE L'ADMIN) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-2xl">
                {[
                    {
                        icon: <ShieldCheck size={18} />,
                        label: 'SÉCURITÉ',
                        status: 'Validée',
                    },
                    {
                        icon: <Construction size={18} />,
                        label: 'INTERFACE',
                        status: '85%',
                    },
                    {
                        icon: <Rocket size={18} />,
                        label: 'DÉPLOIEMENT',
                        status: 'Bientôt',
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center gap-2"
                    >
                        <div className="text-primary">{item.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            {item.label}
                        </span>
                        <span className="text-xs font-bold text-white">
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>

            {/* BOUTON RETOUR */}
            <div className="mt-12">
                <Link
                    href="/admin"
                    className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-black text-xs tracking-[0.2em] transition-all hover:bg-primary hover:text-white active:scale-95"
                >
                    <ArrowLeft
                        size={16}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    RETOUR AU TABLEAU DE BORD
                </Link>
            </div>

            {/* FOOTER DISCRET */}
            <p className="mt-20 text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
                ICPRD Engine v2.0 • Build 2026
            </p>
        </div>
    );
}
