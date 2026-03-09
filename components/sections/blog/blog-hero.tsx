'use client';

import React from 'react';
import { Search, Sparkles } from 'lucide-react';

export default function BlogHero() {
    return (
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
            <div className="absolute inset-0 bg-slate-800">
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    aria-label="Vue aérienne d'un paysage forestier dense en République Démocratique du Congo"
                    style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_Ax_T6bsr32KsXiYh81xgyDZ_f6WBL8YxdxAGEtHLPoeE2o700Q91JLAdu4eRRNFXCVIELXreEUPS5OguaHpLBaJbciB0qo5PKolDHFoH-oUEnpWcGXM5Tf4fzfyLDaJ81FwZrzuWW91_C60Aw61ikplUOMbmmahlymBOnQqfwT9C0qIN-47jUCB7gDQOrUQ9w82jyTYvzzI4zlOr8R4zNknP7sKMR3wZma_uzWwcqRaryCrHBTWFrD44ANXIclCj62UaydgsWJAP")`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950 to-slate-950"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                    <Sparkles size={14} /> Notre Journal
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
                    Perspectives & <span className="text-primary">Impact.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
                    Restez informé des dernières actualités, rapports de terrain
                    et analyses stratégiques des équipes de l'ICPRD à travers la
                    République Démocratique du Congo.
                </p>

                <div className="mt-10 max-w-xl mx-auto relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher des articles, actualités ou rapports..."
                        className="w-full pl-12 pr-4 py-4 bg-background border border-card-border rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    />
                </div>
            </div>
        </section>
    );
}
