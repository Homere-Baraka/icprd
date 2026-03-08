'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, Mail, Calendar, User } from 'lucide-react';
import { useContactMessageQuery } from '@/lib/query/query';
import useNotification from '@/hooks/use-taost';
import { markMessageAsReadAction } from '@/actions/admin/contact';
import MainLayout from '@/components/admin-panel/main-layout';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { deleteContactMessageAction } from '@/actions/admin/contact';
import { getAvatarColor } from '@/utils/avatar-color';
import DeleteConfirmModal from '@/components/ui/delete-confirm-modal';

export default function MessageDetail() {
    const { messageId } = useParams();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { notifyError, notifySuccess } = useNotification();
    const [isPending, startTransition] = useTransition();
    const { data: message, isLoading } = useContactMessageQuery(
        String(messageId),
    );

    useEffect(() => {
        if (messageId && typeof messageId === 'string') {
            markMessageAsReadAction(messageId);
        }
    }, [messageId]);

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteContactMessageAction(String(messageId));

            if (result.success) {
                setIsModalOpen(false);
                notifySuccess(String(result.message));
                router.push('/admin/messages');
            } else {
                notifyError(String(result.error));
            }
        });
    };

    const messageData = message?.data;

    return (
        <MainLayout>
            {isLoading || !messageData ? (
                <div className="p-10 mt-10 flex justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <div className="p-6 md:p-12 max-w-5xl mx-auto">
                        <div className="flex justify-between items-center mb-12">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 text-slate-500 hover:text-text-main transition-colors font-bold text-sm uppercase tracking-widest"
                            >
                                <ArrowLeft size={18} /> Retour
                            </button>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                title="Supprimer"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-4 space-y-8">
                                <div className="flex flex-col items-center text-center p-8 bg-card border border-card-border rounded-lg shadow-sm">
                                    <div
                                        className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black mb-4 shadow-xl ${getAvatarColor(String(message?.data?.name))}`}
                                    >
                                        {message?.data?.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <h2 className="text-xl font-bold text-text-main">
                                        {message?.data?.name}
                                    </h2>
                                    <p className="text-sm text-slate-500 mb-6">
                                        {message?.data?.email}
                                    </p>

                                    <a
                                        href={`mailto:${message?.data?.email}`}
                                        target="_blank"
                                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Mail size={16} /> Répondre
                                    </a>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar
                                            className="text-slate-400"
                                            size={16}
                                        />
                                        <span className="text-slate-500">
                                            Reçu{' '}
                                            {formatDistanceToNow(
                                                new Date(
                                                    String(
                                                        message?.data
                                                            ?.createdAt,
                                                    ),
                                                ),
                                                { addSuffix: true, locale: fr },
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-8">
                                <div className="px-5 rounded-[3rem] min-h-[300px]">
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-4 block">
                                        Sujet du message
                                    </span>
                                    <h1 className="text-3xl md:text-4xl font-black text-text-main mb-10 leading-tight">
                                        {message?.data?.subject}
                                    </h1>

                                    <div className="h-[1px] w-20 bg-slate-200 mb-10"></div>

                                    <p className="text-text-main leading-relaxed text-lg whitespace-pre-wrap">
                                        {message?.data?.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DeleteConfirmModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleDelete}
                        isLoading={isPending}
                    />
                </>
            )}
        </MainLayout>
    );
}
