'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useContactMessagesQuery } from '@/lib/query/query';
import {
    Search,
    User,
    Settings,
    LogOut,
    Bell,
    Sun,
    Moon,
    Command,
} from 'lucide-react';
import { useUser } from '@/hooks/use-user';

export default function TopBar() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const menuRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isLoading } = useUser();
    const { data: messages } = useContactMessagesQuery();
    const [lastSeenCount, setLastSeenCount] = useState<number>(0);

    const currentUnreadCount =
        messages?.data?.filter((msg: any) => !msg.read).length || 0;

    useEffect(() => {
        setMounted(true);

        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const savedCount = localStorage.getItem('notifications_seen_count');
        if (savedCount) {
            setLastSeenCount(parseInt(savedCount, 10));
        }
    }, []);

    const showBadge = currentUnreadCount > lastSeenCount;
    const displayCount = currentUnreadCount - lastSeenCount;

    const isDark = theme === 'dark';

    return (
        <header className="h-20 border-b border-card-border bg-background backdrop-blur-md flex items-center justify-end px-8 sticky top-0 z-10">
            {/* Right Actions */}
            <div className="flex justify-end items-end gap-6">
                <div className="flex items-center gap-3 pr-6 border-r border-gray-800">
                    <button
                        onClick={() => {
                            setLastSeenCount(currentUnreadCount);
                            localStorage.setItem(
                                'notifications_seen_count',
                                currentUnreadCount.toString(),
                            );
                            router.push('/admin/messages');
                        }}
                        className="relative p-2.5 bg-[#161B22] border border-gray-700 rounded-xl text-gray-400 hover:text-white transition-colors"
                    >
                        <Bell size={18} />

                        {showBadge && (
                            <span className="absolute top-3 right-0.5 flex h-5 w-5 items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>

                                <span className="relative flex justify-center items-center rounded-full h-4 w-4 bg-red-500 text-[10px] font-bold text-white">
                                    {displayCount > 9 ? '9+' : displayCount}
                                </span>
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        className="size-10 flex items-center justify-center rounded-xl bg-primary-light dark:bg-card-hover text-primary dark:text-accent transition-all duration-300 hover:scale-110"
                    >
                        {!mounted ? (
                            <div className="size-5" />
                        ) : isDark ? (
                            <Moon
                                size={20}
                                className="animate-in zoom-in rotate-90"
                            />
                        ) : (
                            <Sun
                                size={20}
                                className="animate-in zoom-in -rotate-90"
                            />
                        )}
                    </button>
                </div>

                {/* User Profile */}
                {isLoading ? (
                    <div className="flex items-center gap-3 animate-pulse">
                        <div className="flex flex-col items-end gap-2">
                            <div className="h-3 w-20 bg-text-subtle rounded-full" />
                            <div className="h-2 w-28 bg-text-subtle rounded-full" />
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-gray-100 p-0.5">
                            <div className="w-full h-full rounded-full bg-gray-200" />
                        </div>
                    </div>
                ) : (
                    user && (
                        <div
                            ref={menuRef}
                            className="relative flex items-center gap-3"
                        >
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-3 hover:bg-white/5 p-1.5 rounded-2xl transition-all group"
                            >
                                <div className="text-right">
                                    <p className="text-sm font-bold text-text-main leading-none">
                                        {user?.name}{' '}
                                    </p>
                                    <p className="text-[10px] text-text-subtle font-bold mt-1 tracking-tighter">
                                        {user?.email}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 p-0.5">
                                    <img
                                        src={user?.image || '/images/user.jpg'}
                                        alt="Avatar"
                                        className="rounded-full w-full h-full object-cover"
                                    />
                                </div>
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-10 top-[calc(100%+8px)] w-56 bg-card border border-card-border rounded-[0_0_10px_10px] py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                    <div className="px-4 py-3 border-b border-card-border mb-1">
                                        <p className="text-xs font-black text-text-muted uppercase tracking-widest">
                                            Compte
                                        </p>
                                    </div>

                                    {/* <Link
                                        href="/admin/profile"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-main hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        <User size={16} /> Voir le profil
                                    </Link> */}

                                    <Link
                                        href="/admin/settings"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-main hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        <Settings size={16} /> Paramètres
                                    </Link>

                                    <div className="h-px bg-card-border my-1" />

                                    <button
                                        onClick={() =>
                                            signOut({
                                                callbackUrl: '/accounts/login',
                                            })
                                        }
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors"
                                    >
                                        <LogOut size={16} /> Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </header>
    );
}
