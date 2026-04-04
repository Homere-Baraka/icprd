import Link from 'next/link';
import MainLayout from '@/components/sections/shares/main-layout';
import { ChevronLeft, Construction, Hammer, Pickaxe } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';

export default async function ConstructionPage({
    params,
}: {
    params: Promise<{ lang: 'fr' | 'en' }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const t = dict.construction;

    return (
        <MainLayout>
            <div className="min-h-[80vh] flex flex-col items-center justify-center mt-10 px-4">
                <div className="relative mb-8">
                    <div className="absolute -top-8 -left-8 text-primary/10 animate-bounce delay-100">
                        <Pickaxe size={64} />
                    </div>
                    <div className="absolute -bottom-8 -right-8 text-primary/10 animate-pulse">
                        <Hammer size={64} />
                    </div>

                    <div className="relative bg-primary/10 p-8 rounded-full border-2 border-dashed border-primary/30">
                        <Construction
                            size={80}
                            className="text-primary animate-pulse"
                        />
                    </div>
                </div>

                <div className="text-center max-w-lg">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        {t.title || 'Page en cours de conception'}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">
                        {t.description ||
                            "Nous travaillons d'arrache-pied pour vous proposer un contenu de qualité. Revenez très bientôt !"}
                    </p>
                    <Link href="/" className="flex justify-center items-center">
                        <button className="flex items-center text-primary gap-2 p-2 text-lg cursor-pointer">
                            <ChevronLeft size={20} />
                            {t.back_home || "Retour à l'accueil"}
                        </button>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
