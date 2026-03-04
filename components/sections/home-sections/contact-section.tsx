export default function ContactSection() {
    return (
        <section id="contact" className="py-32 bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20">
                    <div className="contact-info text-white">
                        <h2
                            data-translate="contact.title"
                            className="text-5xl font-black mb-8"
                        >
                            Construisons la Paix Ensemble
                        </h2>
                        <p
                            data-translate="contact.subtitle"
                            className="text-xl opacity-90 mb-12 font-light leading-relaxed"
                        >
                            Que vous souhaitiez devenir partenaire, bénévole ou
                            soutenir nos programmes, nous serions ravis
                            d'échanger avec vous.
                        </p>
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                                    <span className="material-symbols-outlined">
                                        alternate_email
                                    </span>
                                </div>
                                <div>
                                    <p
                                        data-translate="contact.email"
                                        className="text-xs font-black uppercase tracking-widest opacity-60"
                                    >
                                        Écrivez-nous
                                    </p>
                                    <p
                                        data-translate="contact.email_value"
                                        className="text-lg font-bold"
                                    >
                                        contact@icprd.com
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                                    <span className="material-symbols-outlined">
                                        location_on
                                    </span>
                                </div>
                                <div>
                                    <p
                                        data-translate="contact.location"
                                        className="text-xs font-black uppercase tracking-widest opacity-60"
                                    >
                                        Nos bureaux
                                    </p>
                                    <p
                                        data-translate="contact.location_value"
                                        className="text-lg font-bold"
                                    >
                                        Av Vamaro, No 15, Com d'Ibanda Ville de
                                        Bukavu RDC
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-2xl">
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label
                                        data-translate="form.name"
                                        className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2"
                                    >
                                        Nom
                                    </label>
                                    <input
                                        data-translate="form.name_placeholder"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-4"
                                        placeholder="Nom complet"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label
                                        data-translate="form.email"
                                        className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        data-translate="form.email_placeholder"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-4"
                                        placeholder="Adresse email"
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    data-translate="form.subject"
                                    className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2"
                                >
                                    Sujet
                                </label>
                                <input
                                    data-translate="form.subject_placeholder"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-4"
                                    placeholder="Objet de votre message"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label
                                    data-translate="form.message"
                                    className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    data-translate="form.message_placeholder"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary py-4"
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    rows="4"
                                ></textarea>
                            </div>
                            <button
                                data-translate="form.button"
                                className="w-full bg-primary py-5 rounded-xl text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                            >
                                Envoyer le Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
