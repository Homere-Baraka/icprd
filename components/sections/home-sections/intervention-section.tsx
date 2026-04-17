import { Users, ArrowRight, GraduationCap, ShieldPlus } from 'lucide-react';

export default function InterventionSection({ dict, lang }: { dict: any, lang: string }) {
    return (
        <section
            id="intervention"
            className="py-32 bg-background-light dark:bg-background-dark"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                    <div className="max-w-2xl">
                        <h2 className="section-subtitle text-slate-400 font-black uppercase tracking-widest text-sm mb-4">
                            {dict.subtitle}
                        </h2>
                        <h3 className="section-title text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                            {dict.title}
                        </h3>
                    </div>
                    <div className="section-desc text-slate-500 dark:text-slate-400 max-w-md font-light">
                        {dict.description}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="pillar-card group bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                            <Users />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            {dict.pillar1.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            {dict.pillar1.desc}
                        </p>
                        <a
                            href={`/${lang}/construction`}
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all"
                        >
                            {dict.pillar1.learn}
                            <ArrowRight />
                        </a>
                    </div>

                    <div className="pillar-card group bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
                            <ShieldPlus />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            {dict.pillar2.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            {dict.pillar2.desc}
                        </p>
                        <a
                            href={`/${lang}/construction`}
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all"
                        >
                            {dict.pillar2.learn}
                            <ArrowRight />
                        </a>
                    </div>

                    <div className="pillar-card group bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 transition-transform">
                            <GraduationCap />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            {dict.pillar3.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            {dict.pillar3.desc}
                        </p>
                        <a
                            href={`/${lang}/construction`}
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all"
                        >
                            {dict.pillar3.learn}
                            <ArrowRight />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
