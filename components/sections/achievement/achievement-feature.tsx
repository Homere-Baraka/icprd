'use client';

import { ChevronRight, Target, MapPin } from 'lucide-react';

export default function FeatureAchievement() {
    return (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#161b33] border border-slate-400/20 rounded-3xl overflow-hidden p-4 lg:p-8 hover:shadow-xl transition-all duration-500">
                {/* Image Section */}
                <div className="relative aspect-[16/10] lg:aspect-square overflow-hidden rounded-2xl">
                    <img
                        src="/images/achievement-main.webp" // Image d'un projet réussi
                        alt="Projet achevé"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow-lg">
                            Succès Majeur
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-primary" />{' '}
                            Nord-Kivu
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span className="text-primary uppercase flex items-center gap-1">
                            <Target size={12} /> Impact Social
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                        Réhabilitation du centre de santé communautaire de Beni.
                    </h2>

                    <p className="text-slate-300 leading-relaxed italic border-l-2 border-primary/30 pl-4">
                        "Grâce à cette réalisation, plus de 12 000 personnes ont
                        désormais accès à des soins de santé primaires dans un
                        environnement sécurisé et moderne."
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                            <span className="block text-primary font-black text-xl">
                                100%
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                                Opérationnel
                            </span>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                            <span className="block text-primary font-black text-xl">
                                +12k
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                                Bénéficiaires
                            </span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                            Voir les détails du projet{' '}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
