export default function CTAGallery() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="bg-gradient-to-r from-primary to-indigo-700 rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-[url('https://placeholder.pics/svg/100/DEDEDE/555555/ICPRD')] bg-repeat"></div>
                <div className="text-center lg:text-left">
                    <h3 className="text-3xl font-black text-white mb-4">
                        Support Our Journey
                    </h3>
                    <p className="text-slate-400 max-w-md">
                        Every photograph represents a life touched and a
                        community strengthened. Join us in making an even
                        greater impact.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                        Become a Partner
                    </button>
                    <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all">
                        Volunteer with Us
                    </button>
                </div>
            </div>
        </section>
    );
}
