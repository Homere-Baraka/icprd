import React from 'react';
import { Search, Plus, Filter, Download, MoreVertical } from 'lucide-react';

export default function Posts() {
    const posts = [
        {
            id: 1,
            title: '10 Tips for Better Design',
            author: 'Jane Doe',
            status: 'Published',
            date: '2024-05-12',
        },
        {
            id: 2,
            title: 'Understanding React Hooks',
            author: 'John Smith',
            status: 'Draft',
            date: '2024-05-10',
        },
        {
            id: 3,
            title: 'The Future of Web Development',
            author: 'Alice Johnson',
            status: 'Published',
            date: '2024-05-08',
        },
        {
            id: 4,
            title: 'Mastering Tailwind CSS',
            author: 'Jane Doe',
            status: 'Published',
            date: '2024-05-01',
        },
    ];

    return (
        <div className="min-h-screen bg-background p-8 font-sans text-text-main">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">Posts</h1>
                    <p className="text-text-muted mt-1">
                        Manage your blog articles and publications.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                    <Plus size={18} />
                    Créer une post
                </button>
            </div>

            {/* Main Card */}
            <div className="bg-card rounded-xl border border-card-border shadow-sm overflow-hidden">
                <div className="p-6 flex justify-between items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full pl-10 pr-4 py-2 bg-background border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-text-muted hover:bg-gray-800 font-medium transition-colors">
                            <Filter size={18} />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-text-muted hover:bg-gray-800 font-medium transition-colors">
                            <Download size={18} />
                            Export
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
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
                                    Status
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
                            {posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="hover:bg-slate-50/5 transition-colors group"
                                >
                                    <td className="px-6 py-5 font-semibold text-text-muted">
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-5 text-text-subtle">
                                        {post.author}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                post.status === 'Published'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}
                                        >
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400">
                                        {post.date}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-1 hover:bg-background rounded-md transition-colors text-slate-400">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
