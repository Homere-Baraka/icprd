import React from 'react';
import {
    X,
    FileText,
    Users,
    Handshake,
    Trophy,
    Image as ImageIcon,
    Plus,
} from 'lucide-react';

export default function QuickActionModal({ isOpen, onClose }: any) {
    if (!isOpen) return null;

    const actions = [
        {
            label: 'Nouveau Post',
            icon: <FileText size={20} />,
            color: 'bg-blue-100/10 text-blue-600',
            href: '/admin/posts/new',
        },
        {
            label: 'Ajouter un Membre',
            icon: <Users size={20} />,
            color: 'bg-emerald-100/10 text-emerald-600',
            href: '/admin/teams/new',
        },
        {
            label: 'Nouveau Partenaire',
            icon: <Handshake size={20} />,
            color: 'bg-amber-100/10 text-amber-600',
            href: '/admin/partners/new',
        },
        {
            label: 'Nouvelle Réussite',
            icon: <Trophy size={20} />,
            color: 'bg-purple-100/10 text-purple-600',
            href: '/admin/achievements/new',
        },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay sombre */}
            <div
                className="absolute inset-0 bg-slate-900/10 animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative top-10 left-20 bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-card-border overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header de la Modal */}
                <div className="p-8 border-b border-card-border flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black">
                            Quick Action{' '}
                            <span className="text-blue-600">+</span>
                        </h2>
                        <p className="text-slate-400 text-sm font-medium">
                            Que souhaitez-vous créer aujourd'hui ?
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-slate-100/10 text-text-muted rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Liste des Actions */}
                <div className="p-3 grid grid-cols-1 gap-1">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                // Ici tu navigues vers l'URL
                                window.location.href = action.href;
                                onClose();
                            }}
                            className="group w-full flex items-center justify-between p-3 rounded-2xl hover:bg-card-border transition-all border border-transparent hover:border-card-border text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                                >
                                    {action.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-text-main">
                                        {action.label}
                                    </p>
                                    <p className="text-xs text-text-subtle tracking-tighter font-semibold">
                                        Action instantanée
                                    </p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-background opacity-0 hover:bg-primary hover:text-white cursor-pointer group-hover:opacity-100 transition-opacity">
                                <Plus size={16} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
