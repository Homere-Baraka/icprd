import { ChevronDown } from 'lucide-react';

export default function HeroGallerySection() {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-slate-950">
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    aria-label="Vue aérienne d'un paysage forestier dense en République Démocratique du Congo"
                    style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_Ax_T6bsr32KsXiYh81xgyDZ_f6WBL8YxdxAGEtHLPoeE2o700Q91JLAdu4eRRNFXCVIELXreEUPS5OguaHpLBaJbciB0qo5PKolDHFoH-oUEnpWcGXM5Tf4fzfyLDaJ81FwZrzuWW91_C60Aw61ikplUOMbmmahlymBOnQqfwT9C0qIN-47jUCB7gDQOrUQ9w82jyTYvzzI4zlOr8R4zNknP7sKMR3wZma_uzWwcqRaryCrHBTWFrD44ANXIclCj62UaydgsWJAP")`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950 to-slate-950"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
                    Galerie Photos
                </h1>
                <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
                    Découvrez nos actions sur le terrain à travers nos clichés.
                    Un aperçu visuel de l'impact de l'ICPRD dans les communautés
                    de la RDC.
                </p>

                <div className="mt-10 flex justify-center gap-4 text-primary text-4xl animate-bounce">
                    <ChevronDown color="#4a6df7" />
                </div>
            </div>
        </section>
    );
}
