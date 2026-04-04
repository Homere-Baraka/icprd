export default function GallerySection({ dict }: { dict: any }) {
    return (
        <section id="gallery" className="pb-20 dark:bg-[#161b33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-10">
                    {dict.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <img
                            src="/images/mine.jpeg"
                            alt="Identification site minier"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4 bg-white dark:bg-slate-800">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {dict.action1}
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
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {dict.action2}
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
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {dict.action3}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
