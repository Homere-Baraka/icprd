import React from 'react';
import {
    Plus,
    Users,
    Trophy,
    TrendingUp,
    Target,
    ArrowUpRight,
} from 'lucide-react';

export default function Achievement() {
    const metrics = [
        {
            id: 1,
            label: 'Global Reach',
            value: '150+',
            subtext: 'Countries',
            trend: '+12% this year',
            icon: <Users className="text-blue-600" size={24} />,
            iconBg: 'bg-blue-50',
        },
        {
            id: 2,
            label: 'Awards Won',
            value: '24',
            subtext: 'Industry Awards',
            trend: '3 new this month',
            icon: <Trophy className="text-amber-500" size={24} />,
            iconBg: 'bg-amber-50',
        },
        {
            id: 3,
            label: 'Revenue Growth',
            value: '$4.2M',
            subtext: 'ARR',
            trend: '+45% YoY',
            icon: <TrendingUp className="text-emerald-500" size={24} />,
            iconBg: 'bg-emerald-50',
        },
        {
            id: 4,
            label: 'Projects Completed',
            value: '850+',
            subtext: 'Successful Deliveries',
            trend: 'On track for Q4',
            icon: <Target className="text-purple-500" size={24} />,
            iconBg: 'bg-purple-50',
        },
    ];

    return (
        <div className="min-h-screen bg-background p-10 font-sans">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-text-main text-3xl font-bold">
                        Achievements
                    </h1>
                    <p className="text-text-muted mt-1">
                        Highlight your company milestones and stats.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md active:scale-95">
                    <Plus size={20} />
                    Add Metric
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {metrics.map((item) => (
                    <div
                        key={item.id}
                        className="bg-card p-8 rounded-xl border border-card-border shadow-sm hover:shadow-md transition-shadow"
                    >
                        {/* Icon Circle */}
                        <div
                            className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center mb-6`}
                        >
                            {item.icon}
                        </div>

                        <div className="space-y-1 mb-6">
                            <p className="text-sm font-semibold text-text-main uppercase tracking-wide">
                                {item.label}
                            </p>
                            <h2 className="text-4xl font-extrabold text-text-muted">
                                {item.value}
                            </h2>
                            <p className="text-text-subtle font-medium">
                                {item.subtext}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-card-border w-full mb-4" />

                        {/* Trend info */}
                        <div className="flex items-center gap-1.5 text-blue-500 text-sm font-medium">
                            <ArrowUpRight size={16} />
                            <span>{item.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder / Empty State (Timeline View Coming Soon) */}
            <div className="bg-card rounded-xl border border-card-border p-16 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-16 h-16 bg-text-main rounded-full flex items-center justify-center mb-6">
                    <Trophy className="text-slate-400" size={32} />
                </div>
                <h3 className="text-xl text-text-main font-bold mb-2">
                    Timeline View Coming Soon
                </h3>
                <p className="text-text-subtle max-w-sm mx-auto">
                    We are working on a visual timeline to map your journey.
                    Stay tuned for updates!
                </p>
            </div>
        </div>
    );
}
