'use client';

import React from 'react';
import { Search, Trophy, CheckCircle2 } from 'lucide-react';

export default function AchievementsHero() {
    return (
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
            {/* Background avec le même style que le blog */}
            <div className="absolute inset-0 bg-slate-800">
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    aria-label="Projets de l'ICPRD sur le terrain"
                    style={{
                        backgroundImage: `url("/images/achievements-bg.webp")`, // Change par ton image
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950 to-slate-950"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                    <Trophy size={14} /> Nos Réalisations
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
                    Actions & <span className="text-primary">Résultats.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
                    Explorez l'impact concret de nos interventions. Chaque
                    projet réalisé est un pas de plus vers la stabilité et le
                    développement durable en RDC.
                </p>

                {/* Barre de recherche style Blog */}
                <div className="mt-10 max-w-xl mx-auto relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher une réalisation, un projet ou une zone..."
                        className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-white"
                    />
                </div>
            </div>
        </section>
    );
}
