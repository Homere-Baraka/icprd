'use client';

export default function FilterGallery({ dict }: { dict: any }) {
    return (
        <section className="sticky top-16 sm:top-20 z-40 bg-slate-950/95 backdrop-blur-md border-y border-white/10 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar justify-start sm:justify-center">
                    <button className="flex-none bg-primary text-white text-sm font-semibold px-6 py-2 rounded-full whitespace-nowrap shadow-lg shadow-primary/20">
                        {dict.all}
                    </button>

                    <button className="flex-none bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-6 py-2 rounded-full whitespace-nowrap transition-all border border-white/5">
                        {dict.peace}
                    </button>

                    <button className="flex-none bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-6 py-2 rounded-full whitespace-nowrap transition-all border border-white/5">
                        {dict.env}
                    </button>

                    <button className="flex-none bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-6 py-2 rounded-full whitespace-nowrap transition-all border border-white/5">
                        {dict.dev}
                    </button>

                    <button className="flex-none bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-6 py-2 rounded-full whitespace-nowrap transition-all border border-white/5">
                        {dict.life}
                    </button>
                </div>
            </div>
        </section>
    );
}
