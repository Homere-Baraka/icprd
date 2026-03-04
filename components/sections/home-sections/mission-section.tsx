import { Construction, Handshake } from 'lucide-react';

export default function MissionSection() {
    return (
        <section id="mission" className="py-32 bg-white dark:bg-[#161b33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="mission-image relative">
                        <div className="aspect-square rounded-[3rem] overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                alt="ICPRD in action"
                                src="/images/mission.jpg"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-64 bg-primary p-8 rounded-3xl shadow-2xl text-white">
                            <p className="text-4xl font-black mb-1">12+</p>
                            <p
                                data-translate="mission.experience"
                                className="text-sm font-bold opacity-80 tracking-widest"
                            >
                                Années d'Engagement sur le Terrain
                            </p>
                        </div>
                    </div>
                    <div className="mission-content">
                        <h2
                            data-translate="mission.title"
                            className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight"
                        >
                            Notre Mission : Guérir par l'
                            <span
                                data-translate="mission.title_highlight"
                                className="text-primary underline underline-offset-8"
                            >
                                Action
                            </span>
                            et le Dialogue
                        </h2>
                        <p
                            data-translate="mission.desc"
                            className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                        >
                            L'Initiative Chrétienne pour la Paix, la
                            Réconciliation et le Développement (ICPRD) est née
                            de la nécessité urgente de rompre les cycles
                            systémiques de conflit dans l'Est de la RDC, pour
                            porter secours aux populations victimes.
                        </p>
                        <div className="space-y-6">
                            <div className="flex gap-5">
                                <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Handshake />
                                </div>
                                <div>
                                    <h5
                                        data-translate="mission.point1.title"
                                        className="font-bold text-slate-900 dark:text-white mb-2"
                                    >
                                        Action de Terrain et Médiation
                                    </h5>
                                    <p
                                        data-translate="mission.point1.desc"
                                        className="text-slate-500 dark:text-slate-400 text-sm"
                                    >
                                        Notre approche est fondée sur un
                                        engagement direct, la sensibilisation
                                        des parties aux conflits et la médiation
                                        pour faciliter le désarmement volontaire
                                        et les rapatriements.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Construction />
                                </div>
                                <div>
                                    <h5
                                        data-translate="mission.point2.title"
                                        className="font-bold text-slate-900 dark:text-white mb-2"
                                    >
                                        Développement Communautaire
                                    </h5>
                                    <p
                                        data-translate="mission.point2.desc"
                                        className="text-slate-500 dark:text-slate-400 text-sm"
                                    >
                                        Nous croyons que la paix durable passe
                                        par le développement. Nous construisons
                                        des centres de formation et soutenons
                                        l'autonomie des communautés pour un
                                        avenir stable.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
