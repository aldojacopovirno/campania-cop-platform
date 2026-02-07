import React, { useState, lazy, Suspense } from 'react';
import { UserRole, RiskLevel, User, DashboardState } from '../types';
const RiskMap = lazy(() => import('./RiskMap'));
const AIChat = lazy(() => import('./AIChat'));
// Helper for charts to avoid large bundle? Recharts is large but maybe keep it for now as it's used in main view. 
// Actually, charts are used in the main view so they will be loaded anyway.
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { Activity, Thermometer, ShieldAlert, Truck, Bed, AlertTriangle, Menu, Settings, Bell, LogOut, CloudRain, Sun, Zap, FileText } from 'lucide-react';
import { MOCK_HOSPITALS, ACTIVE_ALERTS } from '../constants';

const ResourcesView = lazy(() => import('./ResourcesView'));
const HospitalsView = lazy(() => import('./HospitalsView'));
const SettingsView = lazy(() => import('./SettingsView'));
const EnvironmentalReport = lazy(() => import('./EnvironmentalReport'));

interface DashboardProps {
    user: User;
    onLogout: () => void;
    dashboardState: DashboardState;
    onUpdateState: (newState: Partial<DashboardState>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, dashboardState, onUpdateState }) => {
    // Shared Suspense Fallback
    const Loader = () => (
        <div className="w-full h-full flex items-center justify-center text-slate-500">
            <div className="flex flex-col items-center gap-2">
                <Activity className="animate-spin text-indigo-500" size={24} />
                <span className="text-xs font-mono uppercase">Caricamento modulo...</span>
            </div>
        </div>
    );
    const [layers, setLayers] = useState({
        seismic: true,
        hydro: true,
        health: true
    });

    const [activeTab, setActiveTab] = useState<'dashboard' | 'resources' | 'hospitals' | 'settings' | 'report'>('dashboard');
    const [showChat, setShowChat] = useState(true);

    // Mock data for charts
    const occupancyData = MOCK_HOSPITALS.map(h => ({
        name: h.name.split(' ')[0],
        occupancy: h.occupancyRate,
        fill: h.occupancyRate > 90 ? '#ef4444' : h.occupancyRate > 75 ? '#f59e0b' : '#10b981'
    }));

    const forecastData = [
        { time: '0h', risk: 30 },
        { time: '12h', risk: 45 },
        { time: '24h', risk: 75 },
        { time: '36h', risk: 60 },
        { time: '48h', risk: 40 },
        { time: '72h', risk: 25 },
    ];

    const simulateScenario = (scenario: 'normal' | 'heatwave' | 'storm') => {
        if (scenario === 'heatwave') {
            onUpdateState({ temperature: 39, weatherRisk: 'high', healthRisk: 'high' });
        } else if (scenario === 'storm') {
            onUpdateState({ temperature: 18, weatherRisk: 'moderate', healthRisk: 'medium' });
        } else {
            onUpdateState({ temperature: 26, weatherRisk: 'low', healthRisk: 'low' });
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#020617] overflow-hidden text-slate-200 font-sans">

            {/* 1. Sidebar */}
            <aside className="w-20 flex flex-col items-center py-6 bg-slate-900/80 backdrop-blur-md border-r border-slate-800 z-30">
                <div className="mb-10">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                        <ShieldAlert className="text-white w-6 h-6" />
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-6 w-full items-center">
                    <NavItem icon={<Activity size={22} />} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <NavItem icon={<FileText size={22} />} active={activeTab === 'report'} onClick={() => setActiveTab('report')} />
                    <NavItem icon={<Truck size={22} />} active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} />
                    <NavItem icon={<Bed size={22} />} active={activeTab === 'hospitals'} onClick={() => setActiveTab('hospitals')} />
                    <NavItem icon={<Settings size={22} />} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </nav>

                <button onClick={onLogout} className="mt-auto p-4 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                    <LogOut size={22} />
                </button>
            </aside>

            {/* 2. Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950">

                {/* Header */}
                <header className="h-20 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-8 z-20">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">CAMPANIA <span className="text-indigo-400 font-light">COP</span></h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${dashboardState.weatherRisk === 'high' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                            <p className={`text-[10px] font-mono tracking-widest uppercase ${dashboardState.weatherRisk === 'high' ? 'text-red-400' : 'text-emerald-400'}`}>
                                {dashboardState.weatherRisk === 'high' ? 'CRITICAL STATUS' : 'SYSTEM OPTIMAL'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Simulation Controls */}
                        <div className="hidden lg:flex items-center gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
                            <button onClick={() => simulateScenario('normal')} className="p-1.5 hover:bg-emerald-500/20 rounded text-slate-400 hover:text-emerald-400 transition-colors" title="Normal"><Sun size={14} /></button>
                            <button onClick={() => simulateScenario('heatwave')} className="p-1.5 hover:bg-orange-500/20 rounded text-slate-400 hover:text-orange-400 transition-colors" title="Heatwave"><Thermometer size={14} /></button>
                            <button onClick={() => simulateScenario('storm')} className="p-1.5 hover:bg-blue-500/20 rounded text-slate-400 hover:text-blue-400 transition-colors" title="Storm"><CloudRain size={14} /></button>
                        </div>

                        <div className="h-8 w-px bg-slate-800"></div>
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-semibold text-white">{user.fullName}</p>
                            <p className="text-[10px] text-slate-500 font-mono">{user.role}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-bold shrink-0">
                            {user.avatar}
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
                    {activeTab === 'dashboard' && (
                        <div className="grid grid-cols-12 grid-rows-6 gap-6 h-[calc(100vh-8rem)] min-h-[800px]">

                            {/* KPI 1: Temperature (Dynamic) */}
                            <KPICard
                                title="Temperatura"
                                value={`${dashboardState.temperature}°C`}
                                subtitle={dashboardState.location}
                                trend={dashboardState.weatherRisk === 'high' ? '+4.2°' : '+0.5°'}
                                trendColor={dashboardState.weatherRisk === 'high' ? "text-red-400" : "text-emerald-400"}
                                bgColor={dashboardState.weatherRisk === 'high' ? "bg-red-500/10" : "bg-emerald-500/10"}
                                icon={<Thermometer size={24} className={dashboardState.weatherRisk === 'high' ? "text-red-500" : "text-emerald-500"} />}
                                chartColor={dashboardState.weatherRisk === 'high' ? "#ef4444" : "#10b981"}
                            />

                            {/* KPI 2 */}
                            <KPICard
                                title="Sismicità (24h)"
                                value="12"
                                subtitle="Campi Flegrei"
                                trend="Stabile"
                                trendColor="text-yellow-400"
                                bgColor="bg-yellow-500/10"
                                icon={<Activity size={24} className="text-yellow-500" />}
                                chartColor="#eab308"
                            />

                            {/* KPI 3: Health Risk (Dynamic) */}
                            <KPICard
                                title="Rischio Sanitario"
                                value={dashboardState.healthRisk.toUpperCase()}
                                subtitle="Regionale"
                                trend={dashboardState.healthRisk === 'high' ? 'Critico' : 'Stabile'}
                                trendColor={dashboardState.healthRisk === 'high' ? "text-red-400" : "text-blue-400"}
                                bgColor={dashboardState.healthRisk === 'high' ? "bg-red-500/10" : "bg-blue-500/10"}
                                icon={<Bed size={24} className={dashboardState.healthRisk === 'high' ? "text-red-500" : "text-blue-500"} />}
                                chartColor={dashboardState.healthRisk === 'high' ? "#ef4444" : "#3b82f6"}
                            />

                            {/* KPI 4 */}
                            <KPICard
                                title="Mezzi Disponibili"
                                value="14/25"
                                subtitle="Area Metropolitana"
                                trend="Adeguato"
                                trendColor="text-emerald-400"
                                bgColor="bg-emerald-500/10"
                                icon={<Truck size={24} className="text-emerald-500" />}
                                chartColor="#10b981"
                            />

                            {/* Main Map */}
                            <div className="col-span-12 lg:col-span-8 row-span-4 relative group">
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    <LayerToggle label="Sisma" active={layers.seismic} onClick={() => setLayers(p => ({ ...p, seismic: !p.seismic }))} color="orange" />
                                    <LayerToggle label="Idrogeologico" active={layers.hydro} onClick={() => setLayers(p => ({ ...p, hydro: !p.hydro }))} color="blue" />
                                    <LayerToggle label="Sanità" active={layers.health} onClick={() => setLayers(p => ({ ...p, health: !p.health }))} color="emerald" />
                                </div>
                                <Suspense fallback={<Loader />}>
                                    <RiskMap showSeismic={layers.seismic} showHydro={layers.hydro} showHealth={layers.health} />
                                </Suspense>
                            </div>

                            {/* Right Panel Charts */}
                            <div className="col-span-12 lg:col-span-4 row-span-4 flex flex-col gap-6">

                                {/* Hospital Chart */}
                                <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-slate-300 text-xs font-bold uppercase tracking-wider">Stato Ospedali</h3>
                                        <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">Real-time</span>
                                    </div>
                                    <div className="flex-1 w-full min-h-[150px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={occupancyData} layout="vertical" margin={{ left: 0, right: 30 }}>
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                                />
                                                <Bar dataKey="occupancy" radius={[0, 4, 4, 0]} barSize={24} animationDuration={1500} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Risk Forecast Chart */}
                                <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-slate-300 text-xs font-bold uppercase tracking-wider">Forecast Rischio Multi-Hazard</h3>
                                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">AI Model v3.1</span>
                                    </div>
                                    <div className="flex-1 w-full min-h-[150px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={forecastData}>
                                                <defs>
                                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                                <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                                                <YAxis hide />
                                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
                                                <Area type="monotone" dataKey="risk" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Alert Log */}
                            <div className="col-span-12 row-span-1 glass-panel rounded-2xl p-4 overflow-hidden flex flex-col">
                                <div className="flex items-center justify-between mb-3 px-2">
                                    <h3 className="text-slate-300 text-xs font-bold uppercase flex items-center gap-2">
                                        <Activity size={14} className="text-indigo-400" />
                                        Log Eventi & Early Warning
                                    </h3>
                                    <button className="text-[10px] text-indigo-400 hover:text-indigo-300">VEDI TUTTI</button>
                                </div>
                                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    {ACTIVE_ALERTS.map(alert => (
                                        <div key={alert.id} className="flex items-center justify-between p-3 bg-slate-800/40 hover:bg-slate-800/60 transition-colors rounded-lg border-l-2 border-red-500 group">
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 transition-colors">{alert.timestamp}</span>
                                                <div>
                                                    <p className="text-sm text-slate-200 font-medium">{alert.type} WARNING <span className="text-slate-500 mx-1">//</span> {alert.location}</p>
                                                    <p className="text-xs text-slate-400">{alert.message}</p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${alert.level === RiskLevel.CRITICAL ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-orange-500/20 text-orange-400 border border-orange-500/20'}`}>
                                                {alert.level}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}
                    <Suspense fallback={<Loader />}>
                        {activeTab === 'report' && <EnvironmentalReport />}
                        {activeTab === 'resources' && <ResourcesView />}
                        {activeTab === 'hospitals' && <HospitalsView />}
                        {activeTab === 'settings' && <SettingsView />}
                    </Suspense>
                </main>
            </div>

            {/* Floating Chatbot */}
            <div className={`fixed right-0 top-20 bottom-6 w-96 z-40 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${showChat ? 'translate-x-0 mr-6' : 'translate-x-[120%]'}`}>
                <div className="h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
                    <Suspense fallback={<Loader />}>
                        <AIChat role={user.role} dashboardState={dashboardState} user={user} />
                    </Suspense>
                </div>
            </div>

            {/* Chat Toggle Button */}
            <button
                onClick={() => setShowChat(!showChat)}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-110 ${showChat ? 'bg-slate-800 text-indigo-400 border border-slate-700' : 'bg-indigo-600 text-white'}`}
            >
                {showChat ? <Settings size={24} /> : <div className="relative"><Activity size={24} /><span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-indigo-600"></span></div>}
            </button>

        </div>
    );
};

// UI Components
const NavItem = ({ icon, active = false, onClick }: { icon: React.ReactNode, active?: boolean, onClick?: () => void }) => (
    <button
        onClick={onClick}
        className={`p-3 rounded-xl transition-all duration-200 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'}`}
    >
        {icon}
    </button>
);

const KPICard = ({ title, value, subtitle, trend, trendColor, bgColor, icon, chartColor }: any) => (
    <div className="col-span-12 sm:col-span-6 lg:col-span-3 glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-slate-600 transition-colors">
        <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
            {icon}
        </div>
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{title}</h3>
                <p className="text-[10px] text-slate-500">{subtitle}</p>
            </div>
            <div className={`p-2 rounded-lg bg-slate-800/50 ${bgColor}`}>
                {React.cloneElement(icon, { size: 16 })}
            </div>
        </div>
        <div className="flex items-end gap-3">
            <span className="text-3xl font-mono font-bold text-white tracking-tight">{value}</span>
            <span className={`text-xs font-bold mb-1.5 ${trendColor}`}>{trend}</span>
        </div>
        {/* Tiny Sparkline Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
            <div className="h-full" style={{ width: '60%', backgroundColor: chartColor }}></div>
        </div>
    </div>
);

const LayerToggle = ({ label, active, onClick, color }: any) => {
    const colorClasses: any = {
        orange: 'bg-orange-500 border-orange-400 text-orange-100 shadow-[0_0_10px_rgba(249,115,22,0.3)]',
        blue: 'bg-blue-500 border-blue-400 text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.3)]',
        emerald: 'bg-emerald-500 border-emerald-400 text-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
    };

    return (
        <button
            onClick={onClick}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border transition-all duration-300 ${active ? colorClasses[color] : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
        >
            {label}
        </button>
    );
};

export default Dashboard;