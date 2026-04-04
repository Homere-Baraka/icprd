export default function HeroSection({ dict }: { dict: any }) {
    return (
        <section
            id="hero"
            className="relative min-h-[600px] py-4 flex items-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/70 to-transparent z-10"></div>
            <div
                className="absolute inset-0 bg-cover bg-center"
                data-alt="Community outreach group in the Democratic Republic of Congo"
                style={{
                    backgroundImage:
                        "url('/images/WhatsApp Image 2026-02-13 at 15.28.28.jpeg')",
                }}
            ></div>
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                    <span
                        id="hero-badge"
                        data-translate="hero.badge"
                        className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        {dict.badge}
                    </span>
                    <h1
                        id="hero-title"
                        className="text-5xl md:text-6xl font-black text-white leading-tight mb-6"
                        data-translate="hero.title"
                    >
                        {dict.title}{' '}
                        <span className="text-primary">{dict.titleAccent}</span>
                    </h1>
                    <p
                        id="hero-subtitle"
                        className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
                        data-translate="hero.subtitle"
                    >
                        {dict.subtitle}
                    </p>
                    <div className="hero-buttons flex flex-wrap gap-4">
                        <button
                            id="hero-btn1"
                            data-translate="hero.button1"
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-primary/30 transition-all"
                        >
                            {dict.button1}
                        </button>
                        <button
                            id="hero-btn2"
                            data-translate="hero.button2"
                            className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
                        >
                            {dict.button2}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
