'use client';

import Link from 'next/link';
import { fr, enUS } from 'date-fns/locale';
import { useParams } from 'next/navigation';
import { useBlogsQuery } from '@/lib/query/query';
import { getDescription } from '@/utils/get-description';
import { ArrowRight, Eye, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function BlogSection({ dict }: { dict: any }) {
    const { lang } = useParams();
    const dateLocale = lang === 'en' ? enUS : fr;

    const { data: blogsResponse, isLoading } = useBlogsQuery();
    const blogs = blogsResponse?.data
        ?.filter((b: any) => b.publishedAt !== null)
        .slice(0, 3);

    return isLoading
        ? [1, 2, 3].map((n) => (
              <div
                  key={n}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-8"
              >
                  <div
                      key={n}
                      className="h-[350px] bg-card-border/5 animate-pulse rounded-2xl"
                  />
              </div>
          ))
        : blogs && blogs?.length > 0 && (
              <section
                  id="blog"
                  className="py-24 bg-background-light dark:bg-background-dark"
              >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                          <div>
                              <h2
                                  data-translate="blog.title"
                                  className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4"
                              >
                                  {dict.title}
                              </h2>
                              <p
                                  data-translate="blog.subtitle"
                                  className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg"
                              >
                                  {dict.subtitle}
                              </p>
                          </div>
                          <Link
                              data-translate="blog.viewall"
                              className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
                              href="/blogs"
                          >
                              {dict.viewall}
                              <ArrowRight />
                          </Link>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {blogs?.map((blog: any) => (
                              <article
                                  key={blog.id}
                                  className="blog-card flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                      </div>

                                      <div className="p-6 flex-1 flex flex-col">
                                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                              {blog.title}
                                          </h3>

                                          <p className="text-slate-200 text-sm leading-relaxed mb-6 line-clamp-3">
                                              {getDescription(blog.contents)}
                                          </p>

                                          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                              <div className="flex items-center gap-3">
                                                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                      <User size={16} />
                                                  </div>
                                                  <div className="flex flex-col">
                                                      <span className="text-xs font-bold text-white">
                                                          {blog.author?.name ||
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
                                                                      locale: dateLocale,
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
                  </div>
              </section>
          );
}
