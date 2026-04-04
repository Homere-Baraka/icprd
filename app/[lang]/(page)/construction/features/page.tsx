import Link from 'next/link';
import MainLayout from '@/components/sections/shares/main-layout';
import { ChevronLeft, Rocket, Wrench, Lightbulb, Sparkles } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';

export default async function FeaturesComingSoon({
    params,
}: {
    params: Promise<{ lang: 'fr' | 'en' }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const t = dict.construction_features;

    return (
        <MainLayout>
            <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 text-primary/10 animate-pulse">
                    <Lightbulb size={120} />
                </div>
                <div className="absolute bottom-1/4 right-1/4 text-primary/10 animate-bounce delay-700">
                    <Rocket size={100} />
                </div>

                <div className="relative mb-10">
                    <div className="absolute -top-6 -right-6 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-md rotate-12 animate-shimmer">
                        COMING SOON
                    </div>

                    <div className="relative bg-slate-900/50 p-10 rounded-3xl border-2 border-dashed border-slate-700 dark:border-slate-800">
                        <Wrench
                            size={80}
                            className="text-primary animate-spin [animation-duration:3s]"
                        />
                    </div>
                </div>

                <div className="text-center max-w-2xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={14} /> {t.badge || 'Fonctionnalités'}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                        {t.title_part1 || 'Nouvelles'}{' '}
                        <span className="text-primary">
                            {t.title_part2 || 'Capacités.'}
                        </span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed mb-12">
                        {t.description}
                    </p>

                    <Link
                        href="/"
                        className="group inline-flex items-center gap-3"
                    >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <ChevronLeft size={24} />
                        </div>
                        <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {t.back || "Retour à l'accueil"}
                        </span>
                    </Link>
                </div>
                <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>
        </MainLayout>
    );
}
