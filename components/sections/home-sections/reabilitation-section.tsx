import { Trees, Megaphone, Headset } from 'lucide-react';

export default function ReabilitationSection({ dict }: { dict: any }) {
    return (
        <section id="environment" className="py-24 bg-[#161b33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">
                        {dict.badge}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        {dict.title}
                    </h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                        {dict.subtitle}
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
                            <p className="text-sm font-bold italic">
                                {dict.slogan}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {/* Action 1 */}
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-400">
                                <Trees />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {dict.action1.title}
                                </h3>
                                <p className="text-slate-400">
                                    {dict.action1.desc}
                                </p>
                            </div>
                        </div>
                        {/* Action 2 */}
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Megaphone />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {dict.action2.title}
                                </h3>
                                <p className="text-slate-400">
                                    {dict.action2.desc}
                                </p>
                            </div>
                        </div>
                        {/* Action 3 */}
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Headset />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {dict.action3.title}
                                </h3>
                                <p className="text-slate-400">
                                    {dict.action3.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
