'use client';

import React from 'react';
import TopBar from './top-bar';
import Sidebar from './side-bar';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="relative flex flex-col flex-1 overflow-hidden">
                <TopBar />

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
