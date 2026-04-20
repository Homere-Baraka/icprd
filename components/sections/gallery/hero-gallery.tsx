import { ChevronDown } from 'lucide-react';

export default function HeroGallerySection({ dict }: { dict: any }) {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-slate-950">
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    aria-label={dict.image_alt}
                    style={{
                        backgroundImage: `url("/images/blog-hero.png")`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950 to-slate-950"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
                    {dict.title}
                </h1>
                <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
                    {dict.description}
                </p>

                <div className="mt-10 flex justify-center gap-4 text-primary text-4xl animate-bounce">
                    <ChevronDown color="#4a6df7" size={32} />
                </div>
            </div>
        </section>
    );
}
