export default function CTASection() {
    return (
        <section id="cta" className="py-20 bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2
                    data-translate="cta.title"
                    className="text-4xl font-black text-white mb-6"
                >
                    Soutenez la Paix Aujourd'hui
                </h2>
                <p
                    data-translate="cta.desc"
                    className="text-white/80 text-xl max-w-2xl mx-auto mb-10"
                >
                    Votre contribution finance directement nos programmes de
                    médiation communautaire, de désarmement volontaire et nos
                    projets de développement dans les zones en proie aux
                    conflits.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        data-translate="cta.button1"
                        className="bg-white text-primary px-10 py-4 rounded-xl font-black text-lg hover:bg-slate-50 transition-all"
                    >
                        Faire un Don
                    </button>
                    <button
                        data-translate="cta.button2"
                        className="bg-primary-dark/20 text-white border-2 border-white/30 px-10 py-4 rounded-xl font-black text-lg hover:bg-white/10 transition-all"
                    >
                        Devenir Partenaire
                    </button>
                </div>
            </div>
        </section>
    );
}
