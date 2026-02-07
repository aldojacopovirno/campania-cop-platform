import React from 'react';
import { Settings, Bell, Moon, Sun, Shield, User } from 'lucide-react';
import { UserRole } from '../types';

const SettingsView: React.FC = () => {
    return (
        <div className="h-full p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Settings className="text-indigo-400" />
                Impostazioni Piattaforma
            </h2>

            <div className="max-w-2xl space-y-6">

                {/* User Profile Section */}
                <div className="glass-panel p-6 rounded-xl border border-slate-700/50">
                    <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <User size={20} className="text-indigo-400" />
                        Profilo Utente
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold text-2xl border-2 border-slate-600">
                            DO
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Direttore Operativo</h4>
                            <p className="text-slate-500 text-sm">ID: OPERATOR-X92</p>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30">
                                Level 1 Clearance
                            </span>
                        </div>
                    </div>
                </div>

                {/* Global Settings */}
                <div className="glass-panel p-6 rounded-xl border border-slate-700/50">
                    <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-indigo-400" />
                        Preferenze Sistema
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Bell size={18} className="text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-200">Notifiche Push</p>
                                    <p className="text-xs text-slate-500">Ricevi allerte critiche in tempo reale</p>
                                </div>
                            </div>
                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Moon size={18} className="text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-200">Dark Mode</p>
                                    <p className="text-xs text-slate-500">Tema ad alto contrasto per sale operative</p>
                                </div>
                            </div>
                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8">
                    <p className="text-[10px] text-slate-600 font-mono">
                        CAMPANIA COP PLATFORM v1.4.2 (BETA) <br />
                        Powered by Gemini 1.5 Flash
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SettingsView;
