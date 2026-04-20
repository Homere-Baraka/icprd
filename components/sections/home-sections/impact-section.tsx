export default function ImpactSection({ dict }: { dict: any }) {
    return (
        <section id="stats" className="py-12 bg-[#161b33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="stat-card flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                        <span className="stat-number text-4xl font-black text-primary mb-2">
                            20k+
                        </span>
                        <span
                            data-translate="stats.combatants"
                            className="text-slate-400 font-semibold uppercase text-xs tracking-widest"
                        >
                            {dict.combatants}
                        </span>
                    </div>
                    <div className="stat-card flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                        <span className="stat-number text-4xl font-black text-primary mb-2">
                            15+
                        </span>
                        <span
                            data-translate="stats.experience"
                            className="text-slate-400 font-semibold uppercase text-xs tracking-widest"
                        >
                            {dict.experience}
                        </span>
                    </div>
                    <div className="stat-card flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                        <span className="stat-number text-4xl font-black text-primary mb-2">
                            100+
                        </span>
                        <span
                            data-translate="stats.communities"
                            className="text-slate-400 font-semibold uppercase text-xs tracking-widest"
                        >
                            {dict.communities}
                        </span>
                    </div>
                    <div className="stat-card flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                        <span className="stat-number text-4xl font-black text-primary mb-2">
                            10+
                        </span>
                        <span
                            data-translate="stats.partners"
                            className="text-slate-400 font-semibold uppercase text-xs tracking-widest"
                        >
                            {dict.partners}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
