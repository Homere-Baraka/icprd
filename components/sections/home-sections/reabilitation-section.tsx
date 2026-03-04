import { Trees, Megaphone, Headset } from 'lucide-react';

export default function ReabilitationSection() {
    return (
        <section id="environment" className="py-24 bg-white dark:bg-[#161b33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span
                        data-translate="environment.badge"
                        className="text-primary font-black uppercase tracking-widest text-sm mb-4 block"
                    >
                        Notre Engagement
                    </span>
                    <h2
                        data-translate="environment.title"
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6"
                    >
                        Réhabilitation Environnementale
                    </h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                    <p
                        data-translate="environment.subtitle"
                        className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg"
                    >
                        L'ICPRD intervient dans la réhabilitation de
                        l'environnement ainsi que le plaidoyer pour amener les
                        destructeurs de l'environnement à le réhabiliter.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="/images/mine.jpeg"
                                alt="Identification des sites miniers à Kitutu"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl max-w-xs">
                            <p
                                data-translate="environment.action2.slogan"
                                className="text-sm font-bold italic"
                            >
                                "L'équipe de l'ICPRD lors de l'identification
                                des sites miniers exploités, détruits et
                                abandonnés par les Ets Chinoise à Kitutu"
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Trees />
                            </div>
                            <div>
                                <h3
                                    data-translate="environment.action1.title"
                                    className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                                >
                                    Identification des Sites Détruits
                                </h3>
                                <p
                                    data-translate="environment.action1.desc"
                                    className="text-slate-600 dark:text-slate-400"
                                >
                                    Identification des sites miniers exploités,
                                    détruits et abandonnés par les entreprises à
                                    Kitutu dans le territoire de Mwenga au
                                    Sud-Kivu.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Megaphone />
                            </div>
                            <div>
                                <h3
                                    data-translate="environment.action2.title"
                                    className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                                >
                                    Sensibilisation Radio
                                </h3>
                                <p
                                    data-translate="environment.action2.desc"
                                    className="text-slate-600 dark:text-slate-400"
                                >
                                    Émissions de sensibilisation sur la bonne
                                    exploitation des ressources naturelles pour
                                    le développement du territoire de Mwenga au
                                    studio de la radio GL Tv.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Headset />
                            </div>
                            <div>
                                <h3
                                    data-translate="environment.action3.title"
                                    className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                                >
                                    Counseling aux Victimes
                                </h3>
                                <p
                                    data-translate="environment.action3.desc"
                                    className="text-slate-600 dark:text-slate-400"
                                >
                                    Counseling au profit des victimes
                                    d'exploitation minière à Kitutu dans le
                                    Groupement de Banampute.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
