import { ChevronRight } from 'lucide-react';

export default function FeatureBlog() {
    return (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#161b33] border border-slate-400/20 rounded-3xl overflow-hidden p-4 lg:p-8 hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[16/10] lg:aspect-square overflow-hidden rounded-2xl">
                    <img
                        src="/images/war-child.webp"
                        alt="Featured post"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black uppercase text-primary">
                            Featured
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-text-muted">
                        <span>09 Mars 2026</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-primary uppercase">
                            Durabilité
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight transition-colors">
                        Autonomisation des communautés locales grâce à
                        l'agriculture durable au Kivu.
                    </h2>
                    <p className="text-slate-200 leading-relaxed">
                        Découvrez comment notre dernière initiative transforme
                        plus de 500 foyers en fournissant des outils modernes et
                        des techniques agricoles respectueuses de
                        l'environnement...
                    </p>
                    <div className="pt-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                            Lire l'article complet <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
