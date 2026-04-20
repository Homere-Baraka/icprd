'use client';

import { useGalleriesQuery } from '@/lib/query/query';
import Link from 'next/link';
import { ArrowRight, ImageIcon } from 'lucide-react';

export default function GallerySection({
    dict,
    lang,
}: {
    dict: any;
    lang: string;
}) {
    const { data: galleriesResponse, isLoading } = useGalleriesQuery();

    const galleries = galleriesResponse?.data
        ?.filter((g: any) => g.imageUrl?.length > 0)
        .slice(0, 3);

    return (
        <section id="gallery" className="pb-20 bg-[#161b33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header avec Titre à gauche et Lien à droite */}
                <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-4">
                    <div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                            {dict.title}
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">
                            Nos activités récentes sur le terrain
                        </p>
                    </div>

                    <Link
                        href={`/${lang}/gallery`}
                        className="group flex items-center gap-2 text-primary hover:text-white transition-all font-bold text-sm uppercase tracking-widest"
                    >
                        Voir tout le catalogue
                        <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </div>

                {/* État de chargement */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-80 bg-slate-800 rounded-2xl"
                            />
                        ))}
                    </div>
                )}

                {/* Grille de données dynamiques */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {galleries && galleries.length > 0
                        ? galleries.map((item: any) => (
                              <div
                                  key={item.id}
                                  className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-white/5 shadow-xl hover:-translate-y-2 transition-all duration-300"
                              >
                                  <div className="aspect-[4/5] overflow-hidden">
                                      <img
                                          src={item.imageUrl}
                                          alt={item.title}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                      />
                                      {/* Overlay au hover */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                                  </div>

                                  <div className="absolute bottom-0 left-0 right-0 p-6">
                                      <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-1 rounded mb-2 inline-block">
                                          {item.category || 'Activité'}
                                      </span>
                                      <h4 className="text-lg font-bold text-white leading-tight">
                                          {item.title}
                                      </h4>
                                      {item.description && (
                                          <p className="text-slate-400 text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                              {item.description}
                                          </p>
                                      )}
                                  </div>
                              </div>
                          ))
                        : !isLoading && (
                              <div className="col-span-3 py-20 text-center border border-dashed border-white/10 rounded-3xl">
                                  <ImageIcon
                                      className="mx-auto text-slate-700 mb-4"
                                      size={48}
                                  />
                                  <p className="text-slate-500 font-medium">
                                      Aucune image disponible pour le moment.
                                  </p>
                              </div>
                          )}
                </div>
            </div>
        </section>
    );
}
