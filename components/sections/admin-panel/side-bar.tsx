'use client';

import {
    LayoutDashboard,
    BookOpen,
    Users,
    Trophy,
    Handshake,
    Settings,
    ImageIcon,
    LogOut,
    MessageSquareQuote,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: 'Tableau de bord',
            href: '/admin',
            active: true,
        },
        {
            icon: Users,
            label: 'Équipes',
            href: '/admin/teams',
        },
        {
            icon: BookOpen,
            label: 'Articles',
            href: '/admin/posts',
        },
        {
            icon: Trophy,
            label: 'Achievements',
            href: '/admin/achievements',
        },
        // {
        //     icon: MessageSquareQuote,
        //     label: 'Testimonials',
        //     href: '/admin/testimonials',
        // },
        // {
        //     icon: ImageIcon,
        //     label: 'Galleries',
        //     href: '/admin/gallery',
        // },
        // {
        //     icon: Handshake,
        //     label: 'Partenaires',
        //     href: '/admin/partners',
        // },
        {
            icon: Settings,
            label: 'Paramétres',
            href: '/admin/settings',
        },
    ];

    return (
        <aside className="w-64 h-screen bg-card border-r border-card-border flex flex-col p-6">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <BookOpen className="text-white size-6" strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="text-text-main font-bold leading-tight tracking-tight">
                        ICPRD
                    </h1>
                </div>
            </div>

            {/* Navigation principale */}
            <nav className="flex-1 space-y-1.5">
                {menuItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== '/admin' &&
                            pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive
                                    ? 'bg-indigo-300/5 text-primary border border-indigo-500/10'
                                    : 'text-text-muted hover:bg-gray-800/50 hover:text-gray-200'
                            }`}
                        >
                            <item.icon
                                size={19}
                                className={
                                    isActive
                                        ? 'text-primary'
                                        : 'group-hover:text-gray-200'
                                }
                            />
                            <span className="font-medium text-sm">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 space-y-4">
                <button className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-red-400 transition-colors w-full group">
                    <LogOut
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                    <span className="text-sm font-medium">Déconnexion</span>
                </button>
            </div>
        </aside>
    );
}
