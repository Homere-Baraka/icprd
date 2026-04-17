'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NavBar from './nav-bar';
import FooterSection from './footer';
import MobileSidebar from './mobile-sidebar';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const lang = (params?.lang as 'en' | 'fr') || 'fr';

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dict, setDict] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await import(`@/dictionaries/${lang}.json`);
                setDict(data.default);
            } catch (err) {
                console.error('Erreur chargement :', err);
            }
        };

        load();
    }, [lang]);

    const navDict = dict?.nav || {};
    const footerDict = dict?.footer || {
        org: {},
        legal: {},
    };

    return (
        <div>
            <NavBar
                onMenuClick={() => setIsSidebarOpen(true)}
                dict={navDict} 
                lang={lang}
            />

            <MobileSidebar
                dict={navDict}
                lang={lang}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <main className="flex-1 overflow-x-hidden bg-background-dark custom-scrollbar">
                {children}
            </main>

            <FooterSection lang={lang} dict={footerDict} />
        </div>
    );
}
