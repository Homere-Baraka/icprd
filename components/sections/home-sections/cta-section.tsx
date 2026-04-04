'use client';

import { useRouter } from 'next/navigation';

export default function CTASection({ dict }: { dict: any }) {
    const router = useRouter();

    return (
        <section id="cta" className="py-20 bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-black text-white mb-6">
                    {dict.title}
                </h2>
                <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
                    {dict.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/construction"
                        className="bg-white text-primary px-10 py-4 rounded-xl font-black text-lg hover:bg-slate-50 transition-all"
                    >
                        {dict.button1}
                    </a>
                    <a
                        href="/construction/features"
                        className="bg-primary-dark/20 text-white border-2 border-white/30 px-10 py-4 rounded-xl font-black text-lg hover:bg-white/10 transition-all"
                    >
                        {dict.button2}
                    </a>
                </div>
            </div>
        </section>
    );
}
