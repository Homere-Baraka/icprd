import { Mail, Share2 } from 'lucide-react';

export default function TeamSection() {
    return (
        <section id="team" className="py-24 bg-white dark:bg-[#161b33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2
                        data-translate="team.title"
                        className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4"
                    >
                        Notre Équipe de Direction
                    </h2>
                    <p
                        data-translate="team.subtitle"
                        className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Guidée par des experts engagés, des activistes locaux et
                        des artisans de paix dévoués.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    <div className="team-member flex flex-col items-center group">
                        <div className="relative w-48 h-48 mb-6">
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform"></div>
                            <img
                                className="relative w-full h-full object-cover rounded-2xl shadow-xl grayscale group-hover:grayscale-0 transition-all"
                                alt="Executive Director"
                                src="/images/docteur.jpeg"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            Isokelo Munyuku Fama
                        </h3>
                        <p
                            data-translate="team.position1"
                            className="text-primary font-bold text-sm mb-4"
                        >
                            Conseillé au projet
                        </p>
                        <div className="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                <Share2 />
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                <Mail />
                            </a>
                        </div>
                    </div>
                    <div className="team-member flex flex-col items-center group">
                        <div className="relative w-48 h-48 mb-6">
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform"></div>
                            <img
                                className="relative w-full h-full object-cover rounded-2xl shadow-xl grayscale group-hover:grayscale-0 transition-all"
                                alt="Peace Lead"
                                src="/images/secretaire.jpeg"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            BULAMBO Lembelembe
                        </h3>
                        <p
                            data-translate="team.position2"
                            className="text-primary font-bold text-sm mb-4"
                        >
                            Secretaire Executif
                        </p>
                        <div className="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                <Share2 />
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                <Mail />
                            </a>
                        </div>
                    </div>
                    <div className="team-member flex flex-col items-center group">
                        <div className="relative w-48 h-48 mb-6">
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform"></div>
                            <img
                                className="relative w-full h-full object-cover rounded-2xl shadow-xl grayscale group-hover:grayscale-0 transition-all"
                                alt="Operations Director"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWlFkalg3Tui2d_Fxx-r3BL9vPoYvRMEYPQGwAIFabz4Kgtx6X21bH6VxzRF1N38Pc_Sfy1GTl49RMqS8nEkU-iQmKo1F-B8elbV5JhyxemglMm-lycmzivQj6DXEyWAAoZXUKF7o9N9QjSDhuxrIaD6qgHp73D3Y0MmlkwiKcpSxMR8mZQHigTDKCRsXffCBDXNcg70PKyjTx2RVPC8amfR_MCsbTFegMU6O057ewc-5H7lQpgvT317F3GTYN1Mi9kOGSwD3Nz_DT"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            Thomas Verhoeven
                        </h3>
                        <p
                            data-translate="team.position3"
                            className="text-primary font-bold text-sm mb-4"
                        >
                            Directeur des Opérations
                        </p>
                        <div className="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                <Share2 />
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                <Mail />
                            </a>
                        </div>
                    </div>
                    <div className="team-member flex flex-col items-center group">
                        <div className="relative w-48 h-48 mb-6">
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform"></div>
                            <img
                                className="relative w-full h-full object-cover rounded-2xl shadow-xl grayscale group-hover:grayscale-0 transition-all"
                                alt="Reconciliation Specialist"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3njLqCjtisPaN4RgCcx89B2L4buAn3US5LAgqAVhBBScUL8U6163xibtHZoANHWH3jNC7EqxFGpKKCGZyZF8r18HiF1EKZeVfffM-13u_rADThETDpQHgMOv3_uNIAfpjkRdVi72zgCQism2_rDiRRbEINrPqT14CWU8XDryGn-40r0bFUg_314HLs_M_83grpw9OmXpQREcTT3ZQgzcwKTjQBQFAZ9AjvYjfujte_eE7qH-HN_AmJecxoHDe5x3XrcUoH7LSpVDe"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            Clara Nzuzi
                        </h3>
                        <p
                            data-translate="team.position4"
                            className="text-primary font-bold text-sm mb-4"
                        >
                            Coordinatrice Humanitaire
                        </p>
                        <div className="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                <Share2 />
                            </a>
                            <a
                                className="text-slate-600 dark:text-slate-300 hover:text-primary"
                                href="#"
                            >
                                <Mail />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
