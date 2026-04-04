import { Construction, Handshake } from 'lucide-react';

export default function MissionSection({ dict }: { dict: any }) {
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
                            <p className="text-sm font-bold opacity-80 tracking-widest">
                                {dict.experience}
                            </p>
                        </div>
                    </div>
                    <div className="mission-content">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                            {dict.title}
                            <span className="text-primary underline underline-offset-8 mx-2">
                                {dict.title_highlight}
                            </span>
                            {dict.title_suffix}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            {dict.desc}
                        </p>
                        <div className="space-y-6">
                            {/* Point 1 */}
                            <div className="flex gap-5">
                                <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Handshake />
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                                        {dict.point1.title}
                                    </h5>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        {dict.point1.desc}
                                    </p>
                                </div>
                            </div>
                            {/* Point 2 */}
                            <div className="flex gap-5">
                                <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Construction />
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                                        {dict.point2.title}
                                    </h5>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        {dict.point2.desc}
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
