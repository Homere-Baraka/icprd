'use client';

import { useState } from 'react';
import {
    Plus,
    CheckCircle2,
    AlertCircle,
    ArrowUpRight,
    TrendingUp,
    Users,
    BookOpenCheck,
} from 'lucide-react';

const initialPosts = [
    {
        id: 1,
        title: 'Nouvelle fonctionnalité',
        author: 'Alice',
        status: 'Brouillon',
        views: 120,
    },
    {
        id: 2,
        title: 'Mise à jour système',
        author: 'Bob',
        status: 'Publié',
        views: 45,
    },
    {
        id: 3,
        title: 'Annonce événement',
        author: 'Charlie',
        status: 'Brouillon',
        views: 300,
    },
];

export default function PostsSection() {
    const [posts, setPosts] = useState(initialPosts);
    const [search, setSearch] = useState('');

    const handlePublish = (id: number) => {
        setPosts(
            posts.map((p) => (p.id === id ? { ...p, status: 'Publié' } : p)),
        );
    };

    const handleDelete = (id: number) => {
        setPosts(posts.filter((p) => p.id !== id));
    };

    const filteredPosts = posts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header + Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Gestion des Posts</h1>
                <div className="flex gap-3 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Rechercher un post..."
                        className="px-4 py-2 rounded-lg border border-gray-300 flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">
                        <Plus size={16} /> Créer
                    </button>
                </div>
            </div>

            {/* Mini-Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Posts Publiés</p>
                        <h2 className="text-xl font-bold">
                            {posts.filter((p) => p.status === 'Publié').length}
                        </h2>
                    </div>
                    <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <div className="bg-white rounded-xl p-6 shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Posts Brouillon</p>
                        <h2 className="text-xl font-bold">
                            {
                                posts.filter((p) => p.status === 'Brouillon')
                                    .length
                            }
                        </h2>
                    </div>
                    <BookOpenCheck size={32} className="text-purple-500" />
                </div>
                <div className="bg-white rounded-xl p-6 shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Vues Totales</p>
                        <h2 className="text-xl font-bold">
                            {posts.reduce((acc, p) => acc + p.views, 0)}
                        </h2>
                    </div>
                    <TrendingUp size={32} className="text-emerald-500" />
                </div>
            </div>

            {/* Tableau Interactif */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-200 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Titre</th>
                            <th className="px-4 py-2">Auteur</th>
                            <th className="px-4 py-2">Vues</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredPosts.map((post) => (
                            <tr
                                key={post.id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-2">{post.title}</td>
                                <td className="px-4 py-2">{post.author}</td>
                                <td className="px-4 py-2">{post.views}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            post.status === 'Publié'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    {post.status !== 'Publié' && (
                                        <button
                                            onClick={() =>
                                                handlePublish(post.id)
                                            }
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500 transition"
                                        >
                                            Publier
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Placeholder mini-chart */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow">
                <h2 className="text-lg font-bold mb-4">
                    Activité des Posts (24h)
                </h2>
                <div className="h-48 bg-gradient-to-t from-blue-600/10 to-transparent rounded-xl flex items-end gap-2 px-4">
                    {[40, 70, 45, 90, 65, 80, 30, 50].map((h, i) => (
                        <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="w-6 bg-blue-600 rounded-t-md transition hover:bg-blue-500"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
