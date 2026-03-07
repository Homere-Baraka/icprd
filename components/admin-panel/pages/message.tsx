'use client';

import React, { useState, useMemo } from 'react';
import { Search, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useContactMessagesQuery } from '@/lib/query/query';
import ErrorState from '@/components/ui/error-state';
import { MessageCircle } from 'lucide-react';
import EmptyState from '@/components/ui/empty-state';
import { getAvatarColor } from '@/utils/avatar-color';

export default function Messages() {
    const {
        data: messages,
        isLoading,
        error,
        isError,
        refetch,
    } = useContactMessagesQuery();

    const [searchQuery, setSearchQuery] = useState('');
    const messageData = messages?.data || [];

    const filteredMessages = useMemo(() => {
        return messageData.filter((message: any) => {
            const matchesSearch =
                message?.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                message?.subject
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                message?.message
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());

            return matchesSearch;
        });
    }, [messages?.data, searchQuery]);

    return (
        <div className="min-h-screen p-10 font-sans text-text-main">
            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold">Messages</h1>
                <p className="text-text-muted mt-1">
                    Manage incoming contact form submissions.
                </p>
            </div>

            {/* Main Container */}
            <div className="bg-card rounded-xl border border-card-border overflow-hidden">
                {/* Search Bar & Stats */}
                <div className="p-6 flex justify-between items-center border-b border-card-border">
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Chercher un message..."
                            className="w-full pl-12 pr-4 py-2.5 bg-background border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div className="text-slate-500 font-medium">
                        <span className="text-slate-900">2</span> Unread
                    </div>
                </div>

                {/* Message List */}
                <div className="divide-y divide-card-border">
                    {isLoading ? (
                        <MessageSkeleton />
                    ) : isError ? (
                        <tr>
                            <dt>
                                <ErrorState
                                    onRetry={refetch}
                                    message={error?.message}
                                />
                            </dt>
                        </tr>
                    ) : messageData.length == 0 ? (
                        <EmptyState
                            title="Vos Accomplissements"
                            description="
                                    Retrouvez ici l'ensemble de vos succès et leur évolution.
                                    Nous préparons une chronologie visuelle pour retracer votre
                                    parcours : restez connectés !"
                            icon={<MessageCircle strokeWidth={1.5} size={32} />}
                        />
                    ) : filteredMessages.length == 0 ? (
                        <div className="text-center p-6 text-text-muted text-xl">
                            Aucun résultat
                        </div>
                    ) : (
                        filteredMessages &&
                        filteredMessages.map((msg: any) => (
                            <div
                                key={msg.id}
                                className={`p-6 flex items-start gap-4 transition-colors cursor-pointer hover:bg-card ${
                                    msg.unread
                                        ? 'bg-blue-50/40'
                                        : 'bg-background'
                                }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg ${getAvatarColor(msg.name)}`}
                                >
                                    {msg.name.charAt(0).toUpperCase()}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3
                                            className={`text-base font-bold ${msg.read ? 'text-slate-600' : 'text-slate-400'}`}
                                        >
                                            {msg.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                                            <Clock size={14} />
                                            <span className="first-letter:uppercase">
                                                {formatDistanceToNow(
                                                    new Date(msg.createdAt),
                                                    {
                                                        addSuffix: true,
                                                        locale: fr,
                                                    },
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="font-bold text-text-main text-sm mb-1">
                                        {msg.subject}
                                    </p>
                                    <p className="text-text-muted text-sm truncate pr-10">
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

const MessageSkeleton = () => {
    return (
        <div className="divide-y divide-slate-100 animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="p-6 flex items-start gap-4 bg-white">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="h-4 bg-slate-200 rounded-md w-32" />
                            <div className="h-3 bg-slate-100 rounded-md w-20" />
                        </div>
                        <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                        <div className="h-3 bg-slate-100 rounded-md w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};
