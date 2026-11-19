import { getGlobalStatisticsVisitor } from "@/actions/admin/statistic";
import { 
    LayoutDashboard, 
    Globe2, 
    MousePointer2, 
    Users2, 
    Clock, 
    ChevronRight,
    ArrowUpRight,
    Activity
} from "lucide-react";

export default async function AdminDashboard() {
    const stats = await getGlobalStatisticsVisitor();

    return (
        <div className="p-8 bg-background min-h-screen max-w-[900px] mx-auto font-sans text-text-main">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <LayoutDashboard className="text-white" size={24} /> 
                        </div>
                        Monitoring ICPRD
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium">Analyse temps réel de l'écosystème</p>
                </div>
                <div className="flex items-center gap-3 bg-card-border p-2 rounded-full shadow-sm border border-slate-500 pr-4">
                    <span className="relative flex h-3 w-3 ml-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Live System</span>
                </div>
            </div>

            {/* Top KPIs Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: "Visiteurs Uniques", val: stats.summary.visitors, icon: Users2, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Sessions Totales", val: stats.summary.sessions, icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Taux de Rebond", val: "24%", icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((kpi, i) => (
                    <div key={i} className="bg-card p-6 rounded-2xl border border-card-border shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase">{kpi.label}</p>
                            <h3 className="text-3xl font-bold mt-1">{kpi.val}</h3>
                        </div>
                        <div className={`${kpi.bg} ${kpi.color} p-4 rounded-xl`}>
                            <kpi.icon size={28} />
                        </div>
                    </div>
                ))}
            </div>

            {/* COLONNE GAUCHE (4/12) */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
                {/* Top Pays avec barres de progression */}
                <div className="bg-background border border-card-border rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-5 bg-card border-b border-card-border flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase text-slate-600 flex items-center gap-2">
                            <Globe2 size={18} className="text-blue-500" /> Géolocalisation
                        </h2>
                    </div>
                    <div className="p-5 space-y-5">
                        {stats.charts.countries.map((c) => (
                            <div key={c.name} className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-text-muted">{c.name}</span>
                                    <span className="text-text-main">{c.value}</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
                                        style={{ width: `${(c.value / stats.summary.visitors) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="">

                {/* COLONNE DROITE (8/12) */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    
                    {/* Top Pages */}
                    {/* <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase text-slate-600 flex items-center gap-2">
                                <MousePointer2 size={18} className="text-indigo-500" /> Pages Populaires
                            </h2>
                            <button className="text-xs font-bold text-blue-600 hover:underline">Voir tout</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50">
                                    <tr className="text-[11px] uppercase text-slate-400">
                                        <th className="p-4 font-bold">Endpoint</th>
                                        <th className="p-4 font-bold text-right">Trafic</th>
                                        <th className="p-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {stats.charts.pages.map((page) => (
                                        <tr key={page.path} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono text-slate-600 mr-2">GET</span>
                                                <span className="text-sm font-semibold text-slate-700">{page.path}</span>
                                            </td>
                                            <td className="p-4 text-sm font-bold text-right">
                                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{page.count}</span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 inline" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> */}

                    {/* Flux d'activité (Console Style) */}
                    <div className="bg-background rounded-2xl mt-10 shadow-sm border border-card-border overflow-hidden">
                        <div className="p-5 bg-card border-b border-card-border">
                            <h2 className="text-sm font-bold uppercase text-slate-600 flex items-center gap-2">
                                <Clock size={18} className="text-emerald-500" /> 
                                Journal des activités récentes
                            </h2>
                        </div>
    
                        <div className="divide-y divide-card-border">
                            {stats.recentVisits.map((visit: any) => (
                                <div key={visit.id} className="p-4 hover:bg-card transition-colors flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Heure avec un style badge */}
                                        <span className="text-xs font-semibold bg-slate-100 text-slate-500 py-1 px-2 rounded">
                                            {new Date(visit.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                {/* IP complète pour identification */}
                                                <span className="text-sm font-mono font-medium text-slate-700">
                                                    {visit.visitor.ip}
                                                </span>
                                                <span className="text-slate-300">•</span>
                                                {/* Localisation claire */}
                                                <span className="text-sm text-slate-600">
                                                    {visit.visitor.city || 'Ville inconnue'}, {visit.visitor.country || 'Pays inconnu'}
                                                </span>
                                            </div>
                                            {/* Indicateur d'appareil ou plateforme si disponible */}
                                            <p className="text-[11px] text-slate-400 mt-0.5">
                                                Identifiant visiteur : {visit.visitor.id}...
                                            </p>
                                        </div>
                                    </div>

                                    {/* Statistique de session simplifiée */}
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-blue-600">
                                            {visit.pagesCount} {visit.pagesCount > 1 ? 'pages consultées' : 'page consultée'}
                                        </div>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                            Session active
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}