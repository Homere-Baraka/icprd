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
                b.id !== resolvedParams.blogId && b.publishedAt === 'PUBLISH',
        )
        .slice(0, 3);

    if (!blog)
        return (
            <div className="text-white text-center py-20">
                Article not found.
            </div>
        );

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
                            <div className="max-w-4xl mx-auto px-6">
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
                                            {blog?.author?.user?.username ||
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
                                {['Impact', 'RDC', blog.category]
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
            {otherBlogs && otherBlogs?.length > 0 && (
                <section className="bg-white/[0.02] py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-3xl font-black text-white tracking-tighter italic">
                                Discover more.
                            </h3>
                            <Link
                                href="/blog"
                                className="text-primary font-bold text-sm flex items-center gap-2 group"
                            >
                                All posts{' '}
                                <span className="group-hover:translate-x-1 transition-transform">
                                    →
                                </span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {otherBlogs?.map((item: any) => (
                                <Link
                                    href={`/blogs/${item.id}`}
                                    key={item.id}
                                    className="group"
                                >
                                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/5 relative">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="mt-3 text-sm text-slate-500 line-clamp-2">
                                        {getDescription(item.contents)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <NewsletterSection />
        </MainLayout>
    );
}
