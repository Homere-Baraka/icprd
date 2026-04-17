"use client";

import React from 'react';

export default function CTAGallery({ dict, lang }: { dict: any; lang: string }) {

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="bg-gradient-to-br from-primary via-indigo-700 to-indigo-900 rounded-[2.5rem] p-8 sm:p-16 text-white relative overflow-hidden group">
                
                {/* Texture de fond subtile */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-700 bg-[url('/images/pattern.png')] bg-repeat"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="text-center lg:text-left">
                        <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
                            {dict.title}
                        </h3>
                        <p className="text-indigo-100/80 max-w-xl text-lg leading-relaxed">
                            {dict.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-white text-primary font-black rounded-2xl shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">
                            {dict.btn_partner}
                        </a>
                        <a
                            href={`/${lang}#contact`}
                            className="px-8 py-4 bg-slate-900/40 backdrop-blur-md text-white font-black rounded-2xl border border-white/10 hover:bg-slate-900/60 transition-all">
                            {dict.btn_volunteer}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}