'use client';

import React, { useState } from 'react';
import {
    Heart,
    CreditCard,
    Smartphone,
    ShieldCheck,
    ArrowRight,
    Wallet,
} from 'lucide-react';
import MainLayout from '@/components/sections/shares/main-layout';

export default function DonationPage() {
    const [method, setMethod] = useState<'card' | 'mobile'>('card');
    const [amount, setAmount] = useState<string>('50');

    const suggestedAmounts = ['10', '25', '50', '100', '250'];

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-16">
                {/* HEADER DE LA PAGE */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <Heart size={14} /> Soutenez l'Impact
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        Faire un <span className="text-primary">Don.</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-slate-400">
                        Chaque contribution aide les communautés de la RDC à
                        construire un avenir plus stable et durable.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* COLONNE GAUCHE : FORMULAIRE */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* 1. CHOIX DU MONTANT */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="size-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                                    1
                                </span>
                                Choisissez le montant
                            </h3>
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {suggestedAmounts.map((amt) => (
                                    <button
                                        key={amt}
                                        onClick={() => setAmount(amt)}
                                        className={`py-4 rounded-xl font-black transition-all border ${
                                            amount === amt
                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                                        }`}
                                    >
                                        {amt}$
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                                    $
                                </span>
                                <input
                                    type="number"
                                    placeholder="Autre montant"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-10 pr-4 py-4 bg-slate-900 border border-white/10 rounded-2xl outline-none focus:border-primary transition-all font-bold"
                                />
                            </div>
                        </div>

                        {/* 2. MÉTHODE DE PAIEMENT */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="size-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                                    2
                                </span>
                                Méthode de paiement
                            </h3>

                            <div className="flex gap-4 mb-8">
                                <button
                                    onClick={() => setMethod('card')}
                                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${method === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-white/5 bg-white/5 text-slate-500'}`}
                                >
                                    <CreditCard size={24} />
                                    <span className="text-xs font-bold uppercase">
                                        PayPal / Carte
                                    </span>
                                </button>
                                <button
                                    onClick={() => setMethod('mobile')}
                                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${method === 'mobile' ? 'border-primary bg-primary/5 text-primary' : 'border-white/5 bg-white/5 text-slate-500'}`}
                                >
                                    <Smartphone size={24} />
                                    <span className="text-xs font-bold uppercase">
                                        Mobile Money
                                    </span>
                                </button>
                            </div>

                            {/* CONTENU PAYPAL */}
                            {method === 'card' && (
                                <div className="space-y-4 animate-in fade-in duration-500">
                                    <button className="w-full py-4 bg-[#0070ba] text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                                        Payer avec{' '}
                                        <span className="italic">PayPal</span>
                                    </button>
                                    <p className="text-[10px] text-center text-slate-500 italic">
                                        Vous serez redirigé vers le site
                                        sécurisé de PayPal.
                                    </p>
                                </div>
                            )}

                            {/* CONTENU MOBILE MONEY */}
                            {method === 'mobile' && (
                                <div className="grid grid-cols-1 gap-4 animate-in fade-in duration-500">
                                    <button className="flex items-center justify-between p-4 bg-[#ff6600]/10 border border-[#ff6600]/30 rounded-2xl group hover:bg-[#ff6600]/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Orange_logo.svg/1024px-Orange_logo.svg.png"
                                                    alt="Orange"
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-white">
                                                    Orange Money
                                                </p>
                                                <p className="text-[10px] text-slate-400">
                                                    RDC & International
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight
                                            size={18}
                                            className="text-[#ff6600] group-hover:translate-x-1 transition-transform"
                                        />
                                    </button>

                                    <button className="flex items-center justify-between p-4 bg-[#e11919]/10 border border-[#e11919]/30 rounded-2xl group hover:bg-[#e11919]/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Airtel_logo.svg/2560px-Airtel_logo.svg.png"
                                                    alt="Airtel"
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-white">
                                                    Airtel Money
                                                </p>
                                                <p className="text-[10px] text-slate-400">
                                                    Paiement instantané
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight
                                            size={18}
                                            className="text-[#e11919] group-hover:translate-x-1 transition-transform"
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* COLONNE DROITE : RÉCAPITULATIF / TRUST */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 bg-primary rounded-[2rem] text-white">
                            <h4 className="text-xl font-black mb-4 tracking-tight">
                                Récapitulatif
                            </h4>
                            <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-4">
                                <span className="text-sm">Votre don</span>
                                <span className="text-2xl font-black">
                                    {amount}$
                                </span>
                            </div>
                            <p className="text-xs leading-relaxed opacity-80">
                                Ce don permettra de financer nos projets d'accès
                                à l'eau potable et d'éducation pour les enfants
                                vulnérables.
                            </p>
                        </div>

                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                            <div className="flex items-start gap-4">
                                <ShieldCheck
                                    className="text-primary shrink-0"
                                    size={20}
                                />
                                <div>
                                    <p className="text-sm font-bold text-white">
                                        100% Sécurisé
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Vos transactions sont cryptées et
                                        protégées.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Wallet
                                    className="text-primary shrink-0"
                                    size={20}
                                />
                                <div>
                                    <p className="text-sm font-bold text-white">
                                        Transparence
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Un rapport d'utilisation des fonds vous
                                        sera envoyé par mail.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
