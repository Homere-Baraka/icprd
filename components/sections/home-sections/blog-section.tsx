export default function BlogSection() {
    return (
        <section
            id="blog"
            className="py-24 bg-background-light dark:bg-background-dark"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2
                            data-translate="blog.title"
                            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4"
                        >
                            Derniers Rapports & Témoignages
                        </h2>
                        <p
                            data-translate="blog.subtitle"
                            className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg"
                        >
                            Analyses détaillées et récits issus de nos
                            opérations sur le terrain à travers la RDC.
                        </p>
                    </div>
                    <a
                        data-translate="blog.viewall"
                        className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
                        href="#"
                    >
                        Voir tous les articles
                        <span className="material-symbols-outlined">
                            arrow_forward
                        </span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <article className="blog-card flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="relative h-56 overflow-hidden">
                            <div className="absolute top-4 left-4 z-20">
                                <span
                                    data-translate="blog1.category"
                                    className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg"
                                >
                                    Paix
                                </span>
                            </div>
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                alt="Peacebuilding discussion"
                                src="/images/WhatsApp Image 2026-02-13 at 14.14.01.jpeg"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3
                                data-translate="blog1.title"
                                className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-snug"
                            >
                                Éducation communautaire sur le BDH
                            </h3>
                            <p
                                data-translate="blog1.desc"
                                className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3"
                            >
                                Retour sur nos missions de sensibilisation à
                                Kigogo, Burhinyi et Minova qui ont conduit au
                                rapatriement de centaines de combattants.
                            </p>
                            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        className="size-8 rounded-full"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0YvYWN1xPSgulZYBKIJKeezVrPNcZxSCZCcNvhV9tQ1TOC8AGX5-3NSeClTsAcZdEfAy8qAfzbDusbbhfThUUL7NSo6Y4hMWEawM7EgsalIhf4BxLCtr4q2jNllLHsU6-zEbhgcn-2PL737QnvL_fIG3DV9ZkxJSlCu6SscNFVk0HzD4JVch51zriUoPZMbd0z3HxgJQL8CjH5-QCwO1LAz3MktlD9ZndaJKsT1OoKedhe7l-jEskrZdwJGembHcB7mw05lvsBXzR"
                                        alt="Équipe ICPRD"
                                    />
                                    <div className="flex flex-col">
                                        <span
                                            data-translate="blog1.author"
                                            className="text-xs font-bold text-slate-900 dark:text-white"
                                        >
                                            Équipe ICPRD
                                        </span>
                                        <span
                                            data-translate="blog1.date"
                                            className="text-[10px] text-slate-500"
                                        >
                                            Il y a 2 jours
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                    <span className="material-symbols-outlined !text-base">
                                        visibility
                                    </span>
                                    1.2k vues
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className="blog-card flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="relative h-56 overflow-hidden">
                            <div className="absolute top-4 left-4 z-20">
                                <span
                                    data-translate="blog2.category"
                                    className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg"
                                >
                                    Formation
                                </span>
                            </div>
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                alt="Centre Kitamba"
                                src="/images/WhatsApp Image 2026-02-13 at 14.53.22.jpeg"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3
                                data-translate="blog2.title"
                                className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-snug"
                            >
                                Kitamba : Un Centre pour l'Avenir
                            </h3>
                            <p
                                data-translate="blog2.desc"
                                className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3"
                            >
                                Comment notre centre de réintégration
                                socio-professionnelle forme d'anciens
                                combattants à la menuiserie, la couture et
                                d'autres métiers pour une réinsertion réussie.
                            </p>
                            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        className="size-8 rounded-full"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8v2Bf3UCZJGkvojDhQqoDiJz4PuA2tXPMOf0M-yVwBHUqRydWDncoPKnlvO2GdlPADNVQ1QAw36Lf3lT9vHOBidCWtgHrxJjgFX0dhMYujWtxh3dZc6z3ti0ECoTecY-HsCvQsOH08-AziRXNf4lx8LPrhiRy18GuuTFVBlqEimCrUaiAbu3wzsAnSj0mRB0rXvjjMzGVy2P3l_Dyvdvw3x27MzneTRJOMd_elXecfm6XpM0UCTDOIMVvqV6w-e0QROy_ypzlwAZ9"
                                        alt="Mwami Kalenga"
                                    />
                                    <div className="flex flex-col">
                                        <span
                                            data-translate="author"
                                            className="text-xs font-bold text-slate-900 dark:text-white"
                                        >
                                            Témoignage
                                        </span>
                                        <span
                                            data-translate="blog2.date"
                                            className="text-[10px] text-slate-500"
                                        >
                                            Il y a 5 jours
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                    <span className="material-symbols-outlined !text-base">
                                        visibility
                                    </span>
                                    840 vues
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className="blog-card flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="relative h-56 overflow-hidden">
                            <div className="absolute top-4 left-4 z-20">
                                <span
                                    data-translate="blog3.category"
                                    className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg"
                                >
                                    Droits Humains
                                </span>
                            </div>
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                alt="Atelier formation"
                                src="/images/WhatsApp Image 2026-02-13 at 15.28.28.jpeg"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3
                                data-translate="blog3.title"
                                className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-snug"
                            >
                                Formation des Défenseurs des Droits Humains
                            </h3>
                            <p
                                data-translate="blog3.desc"
                                className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3"
                            >
                                Compte-rendu de notre atelier à Bukavu sur la
                                collecte de données pour documenter les
                                incidents dans la chaîne de valeur de
                                l'exploitation minière.
                            </p>
                            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        className="size-8 rounded-full"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoH0880EoeRXVQUr3e-fjGXsoplETONvtbowTdEgHMOlKBiH-nzKsYYQcLCwooIJYRjW3hhx0oPxaUmH2qWwExh5eJe9bfghUJ3bcm0A5-dqnAZxbWuBRNjKlnUTeaN4VKedycx7XH3fgJL83msDfqwlVyXGMcKbJ-lU_NpBVcW5xO-Q6i_HJoeXaiUqwIpJA7JhoavI08KZ86cgmxsObrTquLGy49kVbMc1ZcCd-OpCySoPM4N02eJqRETn9XcbUCSCGhWJxTKD7p"
                                        alt="Expert UN"
                                    />
                                    <div className="flex flex-col">
                                        <span
                                            data-translate="blog3.author"
                                            className="text-xs font-bold text-slate-900 dark:text-white"
                                        >
                                            Expert UN
                                        </span>
                                        <span
                                            data-translate="blog3.date"
                                            className="text-[10px] text-slate-500"
                                        >
                                            Il y a 1 semaine
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                    <span className="material-symbols-outlined !text-base">
                                        visibility
                                    </span>
                                    2.1k vues
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
