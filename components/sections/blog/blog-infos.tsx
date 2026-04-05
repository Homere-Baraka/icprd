'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBlogsQuery } from '@/lib/query/query';
import { Eye, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getDescription } from '@/utils/get-description';
import Pagination from '@/components/ui/pagination';

export default function BlogInfos() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ITEMS_PER_PAGE = 10;

    const { data: blogs, isLoading } = useBlogsQuery();

    const allPublishedBlogs =
        blogs?.data?.filter((blog: any) => blog.publishedAt !== null) || [];

    const startIndex = currentIndex * ITEMS_PER_PAGE;
    const visibleBlogs = allPublishedBlogs.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE,
    );

    const totalPages = Math.ceil(allPublishedBlogs.length / ITEMS_PER_PAGE);

    const handleNext = () => {
        if (currentIndex < totalPages - 1) {
            setCurrentIndex((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 flex items-center justify-between">
                        <h3 className="text-2xl text-white font-black uppercase tracking-tighter">
                            Dernières Publications
                        </h3>
                        <div className="h-[1px] flex-grow mx-8 bg-white/10 hidden md:block" />
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((n) => (
                                <div
                                    key={n}
                                    className="h-[400px] bg-card-border/5 animate-pulse rounded-2xl"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* On affiche UNIQUEMENT les blogs de la page actuelle */}
                            {visibleBlogs.map((blog: any) => (
                                <article
                                    key={blog.id}
                                    className="group blog-card flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <Link href={`/blogs/${blog.id}`}>
                                        <div className="relative h-60 overflow-hidden">
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl">
                                                    {blog.category || 'Général'}
                                                </span>
                                            </div>
                                            <img
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                alt={blog.title}
                                                src={
                                                    blog.imageUrl ||
                                                    '/images/placeholder-blog.jpg'
                                                }
                                            />
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                                {blog.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {getDescription(blog.contents)}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                        <User size={16} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-white">
                                                            {blog.author
                                                                ?.name ||
                                                                'Équipe ICPRD'}
                                                        </span>
                                                        <span className="text-[10px] text-slate-500">
                                                            {blog.createdAt &&
                                                                formatDistanceToNow(
                                                                    new Date(
                                                                        blog.createdAt,
                                                                    ),
                                                                    {
                                                                        addSuffix: true,
                                                                        locale: fr,
                                                                    },
                                                                )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                    <Eye
                                                        size={14}
                                                        className="text-primary"
                                                    />
                                                    {blog.views || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}

                    {allPublishedBlogs.length === 0 && !isLoading && (
                        <div className="text-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-3xl">
                            Aucun article publié pour le moment.
                        </div>
                    )}
                </div>
            </section>

            {allPublishedBlogs.length > ITEMS_PER_PAGE && (
                <Pagination
                    onBack={handleBack}
                    onNext={handleNext}
                    isFirst={currentIndex === 0}
                    isLast={currentIndex === totalPages - 1}
                    currentIndex={currentIndex}
                    totalCount={totalPages}
                />
            )}
        </>
    );
}
