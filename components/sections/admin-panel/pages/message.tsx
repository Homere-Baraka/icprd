import React from 'react';
import { Search, Clock } from 'lucide-react';

export default function Messages() {
    const messages = [
        {
            id: 1,
            sender: 'David Chen',
            subject: 'Partnership Inquiry',
            preview:
                'Hi team, I would like to discuss a potential partnership between our companies...',
            time: '2 hours ago',
            initial: 'D',
            unread: true,
            color: 'bg-blue-600',
        },
        {
            id: 2,
            sender: 'Lisa Wong',
            subject: 'Product Feedback',
            preview:
                "I've been using your dashboard for a week and I wanted to share some thoughts...",
            time: 'Yesterday',
            initial: 'L',
            unread: true,
            color: 'bg-blue-600',
        },
        {
            id: 3,
            sender: 'Robert Fox',
            subject: 'Enterprise Pricing',
            preview:
                'Could you send me more details about your enterprise tier pricing and features?',
            time: 'Oct 12',
            initial: 'R',
            unread: false,
            color: 'bg-slate-100 text-slate-400',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-10 font-sans text-[#1a202c]">
            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold">Messages</h1>
                <p className="text-slate-500 mt-1">
                    Manage incoming contact form submissions.
                </p>
            </div>

            {/* Main Container */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Search Bar & Stats */}
                <div className="p-6 flex justify-between items-center border-b border-slate-50">
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div className="text-slate-500 font-medium">
                        <span className="text-slate-900">2</span> Unread
                    </div>
                </div>

                {/* Message List */}
                <div className="divide-y divide-slate-100">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-6 flex items-start gap-4 transition-colors cursor-pointer hover:bg-slate-50/80 ${
                                msg.unread ? 'bg-blue-50/40' : 'bg-white'
                            }`}
                        >
                            {/* Avatar */}
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg ${msg.color}`}
                            >
                                {msg.initial}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3
                                        className={`text-base font-bold ${msg.unread ? 'text-slate-900' : 'text-slate-600'}`}
                                    >
                                        {msg.sender}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                                        <Clock size={14} />
                                        {msg.time}
                                    </div>
                                </div>
                                <p className="font-bold text-slate-800 text-sm mb-1">
                                    {msg.subject}
                                </p>
                                <p className="text-slate-500 text-sm truncate pr-10">
                                    {msg.preview}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
