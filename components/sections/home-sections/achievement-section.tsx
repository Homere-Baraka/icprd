export default function AchievementSection() {
    return (
        <section
            id="achievements"
            className="py-24 bg-background-light dark:bg-background-dark overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2
                        data-translate="achievements.title"
                        className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
                    >
                        Nos Réalisations
                    </h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
                    <p
                        data-translate="achievements.subtitle"
                        className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg italic"
                    >
                        Un aperçu de notre impact durable à travers le Sud-Kivu
                        et le Nord-Kivu au fil des années.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="achievement-card group relative flex flex-col bg-white dark:bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-primary/5">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                className="achievement-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                alt="Former child soldiers reintegration"
                                src="/images/WhatsApp Image 2026-02-13 at 15.28.29.jpeg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                            <div className="absolute bottom-4 left-6">
                                <span
                                    data-translate="achievement1.category"
                                    className="bg-primary px-3 py-1 rounded-full text-[10px] font-black text-white tracking-widest uppercase mb-2 inline-block"
                                >
                                    Paix & Stabilité
                                </span>
                                <p
                                    data-translate="achievement1.status"
                                    className="text-white text-xs font-bold flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined !text-sm">
                                        calendar_today
                                    </span>
                                    Projet en cours
                                </p>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3
                                data-translate="achievement1.title"
                                className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors"
                            >
                                1,000+ Anciens Combattants Réintégrés
                            </h3>
                            <p
                                data-translate="achievement1.desc"
                                className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                            >
                                Grâce à un accompagnement psychologique et une
                                formation professionnelle, nous réintégrons avec
                                succès d'anciens combattants, y compris
                                d'anciens enfants soldats, dans leurs familles
                                et communautés.
                            </p>
                            <div className="mt-8 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                        UN
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                        RDC
                                    </div>
                                </div>
                                <span
                                    data-translate="achievement1.report"
                                    className="text-primary font-black text-xs uppercase tracking-tighter cursor-pointer hover:underline"
                                >
                                    Rapport Complet →
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="achievement-card group relative flex flex-col bg-white dark:bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-primary/5">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                className="achievement-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                alt="Voluntary disarmament operations"
                                src="/images/rapatriement.jpeg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                            <div className="absolute bottom-4 left-6">
                                <span
                                    data-translate="achievement2.category"
                                    className="bg-emerald-500 px-3 py-1 rounded-full text-[10px] font-black text-white tracking-widest uppercase mb-2 inline-block"
                                >
                                    Désarmement
                                </span>
                                <p className="text-white text-xs font-bold flex items-center gap-1.5">
                                    <span className="material-symbols-outlined !text-sm">
                                        calendar_today
                                    </span>
                                    2013-2014
                                </p>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3
                                data-translate="achievement2.title"
                                className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors"
                            >
                                Rapatriement Volontaire des Groupes Armés
                            </h3>
                            <p
                                data-translate="achievement2.desc"
                                className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                            >
                                L'ICPRD a été un facilitateur clé dans les
                                opérations de sensibilisation et de désarmement
                                volontaire de groupes armés, notamment les FDLR,
                                contribuant directement à réduire les tensions
                                et les violences.
                            </p>
                            <div className="mt-8 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                        MCC
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                        DDR
                                    </div>
                                </div>
                                <span
                                    data-translate="achievement2.report"
                                    className="text-primary font-black text-xs uppercase tracking-tighter cursor-pointer hover:underline"
                                >
                                    Rapport Complet →
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="achievement-card group relative flex flex-col bg-white dark:bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-primary/5">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                className="achievement-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                alt="Kitamba training center"
                                src="/images/c-f-kitamba.jpeg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                            <div className="absolute bottom-4 left-6">
                                <span
                                    data-translate="achievement3.category"
                                    className="bg-amber-500 px-3 py-1 rounded-full text-[10px] font-black text-white tracking-widest uppercase mb-2 inline-block"
                                >
                                    Développement
                                </span>
                                <p
                                    data-translate="achievement3.status"
                                    className="text-white text-xs font-bold flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined !text-sm">
                                        calendar_today
                                    </span>
                                    Lancé en 2023
                                </p>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3
                                data-translate="achievement3.title"
                                className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors"
                            >
                                Centre de Réintégration de Kitamba
                            </h3>
                            <p
                                data-translate="achievement3.desc"
                                className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                            >
                                Nous avons construit et équipé un centre de
                                formation à Kitamba (Mwenga), offrant des
                                compétences et un avenir aux démobilisés. "Le
                                PPR est un poumon du développement", témoigne le
                                Mwami Kalenga Riziki Lwango.
                            </p>
                            <div className="mt-8 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                        MONUSCO
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                        ECC
                                    </div>
                                </div>
                                <span
                                    data-translate="achievement3.report"
                                    className="text-primary font-black text-xs uppercase tracking-tighter cursor-pointer hover:underline"
                                >
                                    Rapport Complet →
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
