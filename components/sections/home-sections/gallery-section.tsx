export default function GallerySection() {
    return (
        <section id="environment" className="pb-20 dark:bg-[#161b33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3
                    data-translate="environment.gallery"
                    className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-10"
                >
                    Actions sur le Terrain
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <img
                            src="/images/mine.jpeg"
                            alt="Identification site minier"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4 bg-white dark:bg-slate-800">
                            <p
                                data-translate="environment.gallery.action1"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Identification des sites miniers
                            </p>
                        </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <img
                            src="/images/emission.jpeg"
                            alt="Émission radio GL Tv"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4 bg-white dark:bg-slate-800">
                            <p
                                data-translate="environment.gallery.action2"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Émission radio GL Tv - Mwenga
                            </p>
                        </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <img
                            src="/images/conseil.jpeg"
                            alt="Counseling Kitutu"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4 bg-white dark:bg-slate-800">
                            <p
                                data-translate="environment.gallery.action3"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Counseling à Kitutu, Banampute
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
