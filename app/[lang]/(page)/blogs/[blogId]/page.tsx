import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fr } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Share2, ArrowLeft, Eye, User } from 'lucide-react';

import MainLayout from '@/components/sections/shares/main-layout';
import NewsletterSection from '@/components/sections/home-sections/newsletter-section';
import { getDescription } from '@/utils/get-description';
import { getBlogByIdAction, getBlogsAction } from '@/actions/admin/blog';

export const dynamic = 'force-dynamic';

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ lang: string; blogId: string }>;
}) {
    const { lang, blogId } = await params;

    const [blogRes, blogsRes] = await Promise.all([
        getBlogByIdAction(blogId),
        getBlogsAction(),
    ]);

    const blog = blogRes?.data;

    if (!blogRes?.success || !blog) {
        notFound();
    }

    const otherBlogs = blogsRes?.data
        ?.filter((b: any) => b.id !== blogId && b.publishedAt !== null)
        .slice(0, 3);

    return (
        <MainLayout>
            <div className="relative h-[75vh] w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={blog.imageUrl || '/images/user.png'}
                        alt={blog.title || 'Blog cover'}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                <nav className="absolute top-0 w-full z-20 p-6">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link
                            href={`/${lang}/blogs`}
                            className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                        >
                            <ArrowLeft size={18} />
                            <span className="text-sm font-bold uppercase tracking-tighter">
                                Back to Stories
                            </span>
                        </Link>
                        <button className="p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-primary transition-all">
                            <Share2 size={18} />
                        </button>
                    </div>
                </nav>

                <div className="absolute bottom-0 w-full z-10 pb-16">
                    <div className="max-w-6xl mx-auto px-3">
                        <span className="inline-block px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6 shadow-xl">
                            {blog.category || 'Information'}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <User size={18} className="text-primary" />
                                </div>
                                <span className="font-bold text-white">
                                    {blog.author?.username || 'Equipe ICPRD'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-primary" />
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
                                <Eye size={16} className="text-primary" />
                                <span>{blog.views || 0} vues</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 gap-16 py-20">
                <div className="lg:col-span-8">
                    <div className="prose prose-invert prose-lg max-w-none prose-img:max-w-[50%] prose-p:leading-relaxed prose-p:text-slate-300 prose-headings:text-white prose-headings:font-black">
                        {blog.contents?.map((content: any, index: number) => (
                            <div
                                key={index}
                                dangerouslySetInnerHTML={{
                                    __html: content.value,
                                }}
                                className="mb-6 last:mb-0"
                            />
                        ))}
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

            {otherBlogs && otherBlogs.length > 0 && (
                <section className="bg-white/[0.02] py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-3xl font-black text-white tracking-tighter italic">
                                Discover more.
                            </h3>
                            <Link
                                href={`/${lang}/blogs`}
                                className="text-primary font-bold text-sm flex items-center gap-2 group"
                            >
                                All posts{' '}
                                <span className="group-hover:translate-x-1 transition-transform">
                                    →
                                </span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {otherBlogs.map((b: any) => (
                                <article
                                    key={b.id}
                                    className="group blog-card flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <Link href={`/${lang}/blogs/${b.id}`}>
                                        <div className="relative h-60 overflow-hidden">
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl">
                                                    {b.category || 'Général'}
                                                </span>
                                            </div>
                                            <img
                                                className="w-full h-full flex items-center justify-center object-cover transition-transform duration-700 group-hover:scale-110"
                                                alt={b.title}
                                                src={
                                                    b.imageUrl ||
                                                    '/images/placeholder-blog.jpg'
                                                }
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                                {b.title}
                                            </h3>

                                            <p className="text-slate-200 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {getDescription(b.contents)}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                        <User size={16} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-white">
                                                            {b.author
                                                                ?.first_name ||
                                                                'Équipe ICPRD'}
                                                        </span>
                                                        <span className="text-[10px] text-text-muted">
                                                            {b.createdAt &&
                                                                formatDistanceToNow(
                                                                    new Date(
                                                                        b.createdAt,
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
                                                    {b.views || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <NewsletterSection />
        </MainLayout>
    );
}