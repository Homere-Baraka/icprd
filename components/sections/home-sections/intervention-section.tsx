import { Users, ArrowRight, GraduationCap, ShieldPlus } from 'lucide-react';

export default function InterventionSection() {
    return (
        <section
            id="intervention"
            className="py-32 bg-background-light dark:bg-background-dark"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                    <div className="max-w-2xl">
                        <h2
                            data-translate="pillars.subtitle"
                            className="section-subtitle text-slate-400 font-black uppercase tracking-widest text-sm mb-4"
                        >
                            Domaines d'Intervention
                        </h2>
                        <h3
                            data-translate="pillars.title"
                            className="section-title text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight"
                        >
                            Agir pour le Changement à Travers Nos Trois Domaines
                            Clés
                        </h3>
                    </div>
                    <div
                        data-translate="pillars.description"
                        className="section-desc text-slate-500 dark:text-slate-400 max-w-md font-light"
                    >
                        Notre approche holistique garantit que la paix n'est pas
                        seulement l'absence de conflit, mais la présence de
                        justice et d'opportunités.
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="pillar-card group bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                            <Users />
                        </div>
                        <h4
                            data-translate="pillar1.title"
                            className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
                        >
                            Consolidation de la Paix
                        </h4>
                        <p
                            data-translate="pillar1.desc"
                            className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6"
                        >
                            Acteur majeur dans le Désarmement, Démobilisation et
                            Réintégration (DDR) au Sud-Kivu. Nous facilitons le
                            rapatriement des groupes armés et la réintégration
                            socio-professionnelle des combattants.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all"
                            data-translate="pillar1.learn"
                        >
                            En savoir plus
                            <ArrowRight />
                        </a>
                    </div>
                    <div className="pillar-card group bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
                            <ShieldPlus />
                        </div>
                        <h4
                            data-translate="pillar2.title"
                            className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
                        >
                            Urgence Humanitaire
                        </h4>
                        <p
                            data-translate="pillar2.desc"
                            className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6"
                        >
                            Nous intervenons dans les domaines de la santé et de
                            la nutrition lorsque le besoin se fait sentir
                            pendant nos activités, avec le soutien de nos
                            partenaires.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all"
                            data-translate="pillar2.learn"
                        >
                            En savoir plus
                            <ArrowRight />
                        </a>
                    </div>
                    <div className="pillar-card group bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 transition-transform">
                            <GraduationCap />
                        </div>
                        <h4
                            data-translate="pillar3.title"
                            className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
                        >
                            Développement Durable
                        </h4>
                        <p
                            data-translate="pillar3.desc"
                            className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6"
                        >
                            Nous renforçons la résilience des communautés par la
                            formation professionnelle, l'autonomisation et le
                            plaidoyer pour les droits humains et le
                            développement local.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all"
                            data-translate="pillar3.learn"
                        >
                            En savoir plus
                            <ArrowRight />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
