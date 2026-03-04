export default function MobileSidebar() {
    return (
        <>
            <div
                id="mobile-overlay"
                className="fixed inset-0 z-[59] bg-black/50 hidden lg:hidden"
            ></div>
            <div
                id="mobile-sidebar"
                className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-[#101322] z-[60] transform translate-x-full transition-transform duration-300 ease-in-out shadow-2xl lg:hidden"
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="text-primary">
                                <svg
                                    className="size-8"
                                    fill="currentColor"
                                    viewBox="0 0 48 48"
                                >
                                    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-black text-slate-900 dark:text-white">
                                ICPRD
                            </span>
                        </div>
                        <button
                            id="mobile-menu-close"
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                            aria-label="Fermer"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                close
                            </span>
                        </button>
                    </div>
                    <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
                        <a
                            href="#mission"
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.about"
                        >
                            About Us
                        </a>
                        <a
                            href="#intervention"
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.what-we-do"
                        >
                            What we do
                        </a>
                        <a
                            href="#environment"
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.environment"
                        >
                            Environment
                        </a>
                        <a
                            href="#insights"
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.insights"
                        >
                            Insights
                        </a>
                        <a
                            href="#team"
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.team"
                        >
                            Team
                        </a>
                        <a
                            href="#contact"
                            className="block text-slate-700 dark:text-slate-300 hover:text-primary font-bold text-sm uppercase tracking-wide py-3 transition-colors sidebar-link"
                            data-translate="nav.contact"
                        >
                            Contact
                        </a>
                    </nav>
                    <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                        <button
                            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold text-sm transition-all mb-4 sidebar-link"
                            data-translate="header.donate"
                        >
                            Donate Now
                        </button>
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                            © 2024 ICPRD
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
