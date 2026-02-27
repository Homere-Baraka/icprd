import React from 'react';
import { Plus, ExternalLink } from 'lucide-react';

export default function Partners() {
    const partners = [
        {
            id: 1,
            name: 'Acme Corp',
            role: 'Technology Partner',
            initial: 'A',
            url: 'acme.com',
            status: 'ACTIVE',
        },
        {
            id: 2,
            name: 'Global Industries',
            role: 'Strategic Partner',
            initial: 'G',
            url: 'global-ind.com',
            status: 'ACTIVE',
        },
        {
            id: 3,
            name: 'Stark Enterprises',
            role: 'Supplier',
            initial: 'S',
            url: 'stark.com',
            status: 'INACTIVE',
        },
        {
            id: 4,
            name: 'Wayne Tech',
            role: 'Technology Partner',
            initial: 'W',
            url: 'wayne.tech',
            status: 'ACTIVE',
        },
        {
            id: 5,
            name: 'Massive Dynamic',
            role: 'Distributor',
            initial: 'M',
            url: 'massive-dyn.com',
            status: 'ACTIVE',
        },
        {
            id: 6,
            name: 'Umbrella Corp',
            role: 'Strategic Partner',
            initial: 'U',
            url: 'umbrella.com',
            status: 'PENDING',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-10 font-sans text-[#1a202c]">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-3xl font-bold">Partners</h1>
                    <p className="text-slate-500 mt-1">
                        Manage your partner network and sponsors.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md">
                    <Plus size={20} />
                    Add Partner
                </button>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map((partner) => (
                    <div
                        key={partner.id}
                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                    >
                        {/* Logo Placeholder / Avatar */}
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                            <span className="text-2xl font-bold text-blue-600">
                                {partner.initial}
                            </span>
                        </div>

                        {/* Partner Info */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {partner.name}
                            </h3>
                            <p className="text-slate-500 font-medium">
                                {partner.role}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-slate-100 w-full mb-6" />

                        {/* Footer with Link and Status */}
                        <div className="flex justify-between items-center">
                            <a
                                href={`https://${partner.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-blue-500 text-sm font-semibold hover:underline"
                            >
                                <ExternalLink size={14} />
                                {partner.url}
                            </a>

                            <span
                                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                                    partner.status === 'ACTIVE'
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : partner.status === 'INACTIVE'
                                          ? 'bg-red-50 text-red-500'
                                          : 'bg-amber-50 text-amber-600'
                                }`}
                            >
                                {partner.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
