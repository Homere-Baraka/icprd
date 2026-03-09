'use client';

import { useBlogsQuery } from '@/lib/query/query';
import { Eye, User, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getDescription } from '@/utils/get-description';
import Link from 'next/link';

export default function BlogInfos() {
    const { data: blogs, isLoading } = useBlogsQuery();
    const blogData = blogs?.data?.filter(
        (blog: any) => blog.publishedAt !== null,
    );

    return (
        <>
            {/* <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-y border-card-border/5">
                <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-8 py-4 whitespace-nowrap">
                        {[
                            'All Stories', 'Health', 'Education', 
                            'Environment', 'Economy', 'Field Reports',
                        ].map((cat, i) => (
                            <button
                                key={cat}
                                className={`text-sm font-bold transition-colors hover:text-primary cursor-pointer ${i === 0 ? 'text-primary' : 'text-text-muted'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </nav> */}

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
                            {blogData &&
                                blogData.map((blog: any) => (
                                    <article
                                        key={blog.id}
                                        className="blog-card flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <Link href={`/blogs/${blog.id}`}>
                                            {/* IMAGE CONTAINER */}
                                            <div className="relative h-60 overflow-hidden">
                                                <div className="absolute top-4 left-4 z-20">
                                                    <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl">
                                                        {blog.category ||
                                                            'Général'}
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
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>

                                            {/* CONTENT */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                                    {blog.title}
                                                </h3>

                                                <p className="text-slate-200 text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {getDescription(
                                                        blog.contents,
                                                    )}
                                                </p>

                                                {/* FOOTER CARD */}
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
                                                            <span className="text-[10px] text-text-muted">
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
                                                    <div className="flex items-center gap-1.5 text-text-muted text-xs font-medium bg-white/5 px-2 py-1 rounded-md">
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

                    {blogData?.length === 0 && !isLoading && (
                        <div className="text-center py-20 text-text-muted border-2 border-dashed border-card-border/10 rounded-3xl">
                            No articles published yet.
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
