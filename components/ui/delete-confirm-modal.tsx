'use client';

import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import LoadingSpinner from './loading-spinner';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
    title?: string;
    element?: string;
}

export default function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    title = 'Supprimer ce message',
    element = 'cet élément',
}: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/20 animate-in fade-in duration-200"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-card rounded-xl shadow-2xl overflow-hidden p-8 border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6">
                        <AlertTriangle size={32} />
                    </div>

                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        Êtes-vous sûr de vouloir supprimer {element} ? <br />
                        Cette action est irréversible.
                    </p>

                    {/* Actions */}
                    <div className="flex w-full gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 px-6 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all text-xs uppercase tracking-widest"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 py-4 px-6 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-70"
                        >
                            {isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    <Trash2 size={16} />
                                    <span>Supprimer</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
