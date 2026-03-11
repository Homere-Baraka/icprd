'use client';

import { useState } from 'react';
import NavBar from './nav-bar';
import FooterSection from './footer';
import MobileSidebar from './mobile-sidebar';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            <NavBar onMenuClick={() => setIsSidebarOpen(true)} />
            <MobileSidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <main className="flex-1 overflow-x-hidden bg-background-dark custom-scrollbar">
                {children}
            </main>
            <FooterSection />
        </div>
    );
}
