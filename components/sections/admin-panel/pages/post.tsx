'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ActionMenu from '@/components/action-menu';
import { usePostsQuery } from '@/lib/query/query';
import EmptyState from '@/components/ui/empty-state';
import ErrorState from '@/components/ui/error-state';
import PostSkeleton from '@/components/ui/post-skeletton';
import {
    Search,
    Plus,
    Eye,
    Filter,
    Download,
    MoreVertical,
    PlusCircle,
    ExternalLink,
} from 'lucide-react';

export default function Posts() {
    const router = useRouter();
    const { data: posts, isLoading, error, isError, refetch } = usePostsQuery();

    return (
        <div className="min-h-screen bg-background p-8 font-sans text-text-main">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">
                        Articles de blog
                    </h1>
                    <p className="text-text-muted mt-1">
                        Gérez vos articles de blog et vos publications.
                    </p>
                </div>
                <button
                    onClick={() => router.push('/admin/posts/new')}
                    className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Créer une post
                </button>
            </div>

            {/* Card section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card border border-card-border p-6 rounded-2xl shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-50/10 text-emerald-600 rounded-xl">
                            <PlusCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-text-muted uppercase tracking-wider">
                                Publiés
                            </p>
                            <h3 className="text-2xl font-black text-text-main">
                                {isLoading
                                    ? '...'
                                    : posts?.data?.filter(
                                          (p: any) => p.publishedAt,
                                      ).length || 0}
                            </h3>
                        </div>
                    </div>
                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:scale-110 transition-transform">
                        <PlusCircle size={80} />
                    </div>
                </div>

                <div className="bg-card border border-card-border p-6 rounded-2xl shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50/10 text-amber-600 rounded-xl">
                            <Filter size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-text-muted uppercase tracking-wider">
                                Brouillons
                            </p>
                            <h3 className="text-2xl font-black text-text-main">
                                {isLoading
                                    ? '...'
                                    : posts?.data?.filter(
                                          (p: any) => !p.publishedAt,
                                      ).length || 0}
                            </h3>
                        </div>
                    </div>
                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:scale-110 transition-transform">
                        <Filter size={80} />
                    </div>
                </div>

                <div className="bg-card border border-card-border p-6 rounded-2xl shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50/10 text-blue-600 rounded-xl">
                            <Eye size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-text-muted uppercase tracking-wider">
                                Vues total
                            </p>
                            <h3 className="text-2xl font-black text-text-main">
                                {isLoading
                                    ? '...'
                                    : posts?.data
                                          ?.reduce(
                                              (acc: number, post: any) =>
                                                  acc + (post.views || 0),
                                              0,
                                          )
                                          .toLocaleString() || 0}
                            </h3>
                        </div>
                    </div>
                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:scale-110 transition-transform">
                        <Eye size={80} />
                    </div>
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-card rounded-xl border border-card-border shadow-sm">
                <div className="p-6 bg-gradient-to-b from-card/50 to-transparent backdrop-blur-md border-b border-white/[0.05] flex flex-wrap items-center justify-between gap-6">
                    <div className="relative group min-w-[320px]">
                        <div className="relative flex items-center">
                            <Search
                                className="absolute left-4 text-text-muted/40 group-focus-within:text-primary transition-colors"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/5 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary/50 transition-all placeholder:text-text-muted/30"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex bg-black/20 p-1 rounded-xl border border-white/5">
                            {['Tous', 'Brouillon', 'Publié'].map((tab, i) => (
                                <button
                                    key={tab}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                        i === 0
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'text-text-muted hover:text-text-main'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <button
                            className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-text-muted hover:text-text-main hover:bg-white/[0.08] transition-all"
                            title="Voir le profil public"
                        >
                            <ExternalLink size={18} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="relative">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/5 border-y border-card-border">
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider">
                                    Visiblité
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-text-main uppercase tracking-wider text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-card-border text-text-muted">
                            {isLoading ? (
                                <PostSkeleton />
                            ) : isError ? (
                                <tr>
                                    <dt>
                                        <ErrorState
                                            onRetry={refetch}
                                            message={error?.message}
                                        />
                                    </dt>
                                </tr>
                            ) : posts?.data && posts.data.length > 0 ? (
                                posts.data.map((post: any) => (
                                    <tr
                                        key={post.id}
                                        className="hover:bg-slate-50/5 transition-colors group"
                                    >
                                        <td className="px-6 py-5 font-semibold text-text-muted max-w-56 truncate">
                                            {post.title}
                                        </td>
                                        <td className="px-6 py-5 text-text-subtle">
                                            {post?.author?.user?.username}{' '}
                                            {post?.author?.user?.first_name}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    post.publishedAt
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-slate-100 text-slate-600'
                                                }`}
                                            >
                                                {post.publishedAt
                                                    ? 'Publié'
                                                    : 'Brouillon'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-slate-400">
                                            {new Date(
                                                post?.createdAt,
                                            ).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <ActionMenu
                                                link1={`/admin/posts/${post.id}`}
                                                link2={`/admin/posts/${post.id}/edit`}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <EmptyState
                                    title="Votre catalogue est vide"
                                    description="
                                        Commencez à bâtir votre empire de blog en
                                        créant votre tout premier blog premium."
                                    copy=" C'est parti !"
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
