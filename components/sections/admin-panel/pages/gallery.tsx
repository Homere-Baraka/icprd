import React from 'react';
import { Upload, Eye, Trash2 } from 'lucide-react';

export default function Gallery() {
    const categories = ['All', 'Events', 'Workspace', 'Team', 'Design'];

    const images = [
        {
            id: 1,
            title: 'Annual Conference',
            subtitle: 'Main Hall - 2024',
            url: 'https://images.unsplash.com/photo-1540575861501-7ce0e1d1aa99?auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 2,
            title: 'Tech Office',
            subtitle: 'Open Space Layout',
            url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 3,
            title: 'Summer Retreat',
            subtitle: 'Mountains Side',
            url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 4,
            title: 'Demo Night',
            subtitle: 'Grand Screen Presentation',
            url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 5,
            title: 'Design Palette',
            subtitle: 'Branding materials',
            url: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 6,
            title: 'Workstation',
            subtitle: 'Pro Setup',
            url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-10 font-sans text-[#1a202c]">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Gallery</h1>
                    <p className="text-slate-500 mt-1">
                        Manage your visual assets and media.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md active:scale-95">
                    <Upload size={20} />
                    Upload Media
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
                {categories.map((cat, index) => (
                    <button
                        key={cat}
                        className={`px-5 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                            index === 0
                                ? 'bg-[#2563eb] text-white'
                                : 'bg-slate-200/50 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div
                        key={img.id}
                        className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 shadow-sm border border-slate-100"
                    >
                        {/* Image */}
                        <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overly on Hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                            {/* Top Actions */}
                            <div className="flex justify-end gap-2 translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300">
                                <button className="p-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-xl transition-colors">
                                    <Eye size={20} />
                                </button>
                                <button className="p-2.5 bg-red-500/80 hover:bg-red-500 backdrop-blur-md text-white rounded-xl transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            {/* Bottom Info */}
                            <div className="translate-y-[10px] group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white font-bold text-lg leading-tight">
                                    {img.title}
                                </h3>
                                <p className="text-white/80 text-sm font-medium">
                                    {img.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
