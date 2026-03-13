'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { fr } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/sections/shares/main-layout';
import {
    Calendar,
    Clock,
    Share2,
    ArrowLeft,
    MessageSquare,
    ThumbsUp,
    Eye,
    User,
} from 'lucide-react';
import { useBlogsQuery, useBlogQuery } from '@/lib/query/query';
import { getDescription } from '@/utils/get-description';
import { formatDistanceToNow } from 'date-fns';

import LoadingSpinner from '@/components/ui/loading-spinner';
import NewsletterSection from '@/components/sections/home-sections/newsletter-section';

export default function BlogDetailPage({
    params,
}: {
    params: Promise<{ blogId: string }>;
}) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { data: blogResponse, isLoading: blogLoading } = useBlogQuery(
        resolvedParams.blogId,
    );
    const blog = blogResponse?.data;

    const { data: blogsResponse, isLoading: blogsLoading } = useBlogsQuery();
    const otherBlogs = blogsResponse?.data
        ?.filter(
            (b: any) =>
                b.id !== resolvedParams.blogId && b.publishedAt !== null,
        )
        .slice(0, 3);

    if (!blog) {
        return (
            <div className="text-white text-center py-20">
                Article not found.
            </div>
        );
    }

    return (
        <MainLayout>
            {blogLoading ? (
                <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <div className="relative h-[75vh] w-full overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img
                                src={blog?.imageUrl || 'images/user.png'}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        </div>

                        <nav className="absolute top-0 w-full z-20 p-6">
                            <div className="max-w-7xl mx-auto flex justify-between items-center">
                                <button
                                    onClick={() => router.back()}
                                    className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                                >
                                    <ArrowLeft size={18} />
                                    <span className="text-sm font-bold uppercase tracking-tighter">
                                        Back to Stories
                                    </span>
                                </button>
                                <button className="p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-primary transition-all">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </nav>

                        <div className="absolute bottom-0 w-full z-10 pb-16">
                            <div className="max-w-5xl mx-auto px-3">
                                <span className="inline-block px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6 shadow-xl">
                                    {blog.category || 'Information'}
                                </span>
                                <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                                    {blog.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                            <User
                                                size={18}
                                                className="text-primary"
                                            />
                                        </div>
                                        <span className="font-bold text-white">
                                            {blog?.author?.username ||
                                                'Equipe ICPRD'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar
                                            size={16}
                                            className="text-primary"
                                        />
                                        <span>
                                            {blog.createdAt &&
                                                formatDistanceToNow(
                                                    new Date(blog.createdAt),
                                                    {
                                                        addSuffix: true,
                                                        locale: fr,
                                                    },
                                                )}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye
                                            size={16}
                                            className="text-primary"
                                        />
                                        <span>{blog.views || 0} vues</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. CONTENT SECTION */}
                    <section className="relative z-10 max-w-4xl mx-auto px-6 grid grid-cols-1  gap-16 py-20">
                        <div className="lg:col-span-8">
                            <div className="prose prose-invert prose-lg max-w-none prose-img:max-w-[50%] prose-p:leading-relaxed prose-p:text-slate-300 prose-headings:text-white prose-headings:font-black">
                                {blog.contents?.map(
                                    (content: any, index: number) => (
                                        <div
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                                __html: content.value,
                                            }}
                                            className="mb-6 last:mb-0"
                                        />
                                    ),
                                )}
                            </div>

                            <div className="mt-20 pt-10 border-t border-white/10 flex flex-wrap gap-3">
                                {['Impact', blog.category, 'RDC']
                                    .filter(Boolean)
                                    .map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:border-primary/50 transition-all cursor-default"
                                        >
                                            #{tag?.toUpperCase()}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* 3. RELATED POSTS */}
            {blogsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((n) => (
                        <div
                            key={n}
                            className="h-[400px] bg-card-border/5 animate-pulse rounded-2xl"
                        />
                    ))}
                </div>
            ) : (
                otherBlogs &&
                otherBlogs?.length > 0 && (
                    <section className="bg-white/[0.02] py-24 border-t border-white/5">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-3xl font-black text-white tracking-tighter italic">
                                    Discover more.
                                </h3>
                                <a
                                    href="/blog"
                                    className="text-primary font-bold text-sm flex items-center gap-2 group"
                                >
                                    All posts{' '}
                                    <span className="group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </a>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {otherBlogs?.map((item: any) => (
                                    <article
                                        key={blog.id}
                                        className="blog-card flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <a href={`/blogs/${blog.id}`}>
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

                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                                    {blog.title}
                                                </h3>

                                                <p className="text-slate-200 text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {getDescription(
                                                        blog.contents,
                                                    )}
                                                </p>

                                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                            <User size={16} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-white">
                                                                {blog.author
                                                                    ?.first_name ||
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
                                        </a>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            )}

            <NewsletterSection />
        </MainLayout>
    );
}
