'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    Sparkles,
    X,
    Calendar,
    ArrowRight,
    Loader2,
} from 'lucide-react';
import { useBlogsQuery } from '@/lib/query/query';
import { getDescription } from '@/utils/get-description';

export default function BlogHero({ dict }: { dict: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'unset';
    }, [isModalOpen]);

    const { data: response, isLoading } = useBlogsQuery();

    const filteredBlogs = useMemo(() => {
        if (!response?.data) return [];
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase();
        return response.data.filter(
            (blog: any) =>
                blog.title.toLowerCase().includes(query) ||
                blog.category?.toLowerCase().includes(query),
        );
    }, [searchQuery, response]);

    return (
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
            <div className="absolute inset-0 bg-slate-800">
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: `url("/images/blog-hero.png")` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950 to-slate-950"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                    <Sparkles size={14} /> {dict.badge || 'Journal'}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
                    {dict.title_part1}{' '}
                    <span className="text-primary">{dict.title_part2}</span>
                </h1>

                <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed mb-10">
                    {dict.description}
                </p>

                <div className="mt-10 max-w-xl mx-auto relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        readOnly
                        onClick={() => setIsModalOpen(true)}
                        placeholder={dict.search_placeholder}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl outline-none cursor-pointer hover:border-primary/50 transition-all text-sm text-white"
                    />
                </div>
            </div>

            {/* --- MODAL DE RECHERCHE --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-950/20"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative w-full max-w-4xl mt-[80px] bg-[#161b33] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-top duration-300">
                        <div className="p-5 border-b border-white/5 flex items-center gap-4">
                            <Search
                                className={
                                    searchQuery
                                        ? 'text-primary'
                                        : 'text-slate-500'
                                }
                                size={24}
                            />
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={dict.modal_filter}
                                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-500"
                            />
                            {isLoading && (
                                <Loader2
                                    className="animate-spin text-primary"
                                    size={20}
                                />
                            )}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="flex gap-4 p-3 animate-pulse"
                                        >
                                            <div className="w-20 h-20 bg-slate-800 rounded-xl" />
                                            <div className="flex-1 space-y-3">
                                                <div className="h-3 w-24 bg-slate-800 rounded" />
                                                <div className="h-5 w-3/4 bg-slate-800 rounded" />
                                                <div className="h-3 w-full bg-slate-800 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : searchQuery.length > 0 ? (
                                filteredBlogs.length > 0 ? (
                                    <div className="space-y-2">
                                        {filteredBlogs.map((blog: any) => (
                                            <a
                                                key={blog.id}
                                                href={`/blogs/${blog.id}`}
                                                className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group items-center"
                                            >
                                                <img
                                                    src={
                                                        blog.imageUrl ||
                                                        '/default-image.jpg'
                                                    }
                                                    className="w-20 h-20 object-cover rounded-xl bg-slate-800"
                                                    alt=""
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 text-[10px] text-primary font-bold uppercase mb-1">
                                                        <Calendar size={12} />
                                                        {new Date(
                                                            blog.createdAt,
                                                        ).toLocaleDateString(
                                                            dict.date_format ||
                                                                'fr-FR',
                                                            {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            },
                                                        )}
                                                    </div>
                                                    <h4 className="text-white font-bold group-hover:text-primary transition-colors truncate">
                                                        {blog.title}
                                                    </h4>
                                                    <p className="text-slate-400 text-xs line-clamp-2 mt-1">
                                                        {getDescription(
                                                            blog?.contents,
                                                        )}
                                                    </p>
                                                </div>
                                                <ArrowRight
                                                    className="text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all"
                                                    size={20}
                                                />
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <p className="text-slate-400">
                                            {dict.no_results} "
                                            <span className="text-white font-medium">
                                                {searchQuery}
                                            </span>
                                            "
                                        </p>
                                    </div>
                                )
                            ) : (
                                <div className="py-12 text-center text-slate-500">
                                    {dict.start_typing}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
