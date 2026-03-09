export default function FilterGallery() {
    return (
        <section className="sticky top-16 sm:top-20 z-40 bg-background-dark/95 border-y border-white/10 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar justify-start sm:justify-center">
                    <button className="flex-none bg-primary text-white text-sm font-semibold px-6 py-2 rounded-full whitespace-nowrap">
                        Tous
                    </button>
                    <button className="flex-none bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-6 py-2 rounded-full whitespace-nowrap transition-colors">
                        Paix &amp; Réconciliation
                    </button>
                    <button className="flex-none bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-6 py-2 rounded-full whitespace-nowrap transition-colors">
                        Environnement
                    </button>
                    <button className="flex-none bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-6 py-2 rounded-full whitespace-nowrap transition-colors">
                        Développement Durable
                    </button>
                    <button className="flex-none bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-6 py-2 rounded-full whitespace-nowrap transition-colors">
                        Vie de l'ONG
                    </button>
                </div>
            </div>
        </section>
    );
}
