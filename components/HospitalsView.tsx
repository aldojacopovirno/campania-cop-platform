import React from 'react';
import { Bed, Activity, Clock, Users } from 'lucide-react';
import { MOCK_HOSPITALS } from '../constants';
import { RiskLevel } from '../types';

const HospitalsView: React.FC = () => {
    return (
        <div className="h-full p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Bed className="text-indigo-400" />
                Stato Rete Ospedaliera
            </h2>

            <div className="grid grid-cols-1 gap-4">
                {MOCK_HOSPITALS.map((hospital) => (
                    <div key={hospital.id} className="glass-panel p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-xl ${hospital.status === RiskLevel.CRITICAL ? 'bg-red-500/20 text-red-400' :
                                        hospital.status === RiskLevel.HIGH ? 'bg-orange-500/20 text-orange-400' :
                                            hospital.status === RiskLevel.MEDIUM ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-emerald-500/20 text-emerald-400'
                                    }`}>
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-200">{hospital.name}</h3>
                                    <p className="text-sm text-slate-400">{hospital.location}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 w-full md:w-auto">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Occupazione</span>
                                    <div className="flex items-end gap-2">
                                        <span className={`text-2xl font-mono font-bold ${hospital.occupancyRate > 90 ? 'text-red-400' : 'text-slate-200'}`}>
                                            {hospital.occupancyRate}%
                                        </span>
                                        <div className="h-1.5 w-16 bg-slate-700/50 rounded-full mb-1.5 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${hospital.occupancyRate > 90 ? 'bg-red-500' : 'bg-indigo-500'}`}
                                                style={{ width: `${hospital.occupancyRate}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Attesa PS</span>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <Clock size={16} className="text-slate-500" />
                                        <span className="text-lg font-mono font-bold">{hospital.erWaitTime} min</span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Ambulanze</span>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <TruckIcon size={16} className="text-slate-500" />
                                        <span className="text-lg font-mono font-bold">{hospital.ambulanceAvailable}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Simple icon wrapper
const TruckIcon = ({ size, className }: { size: number, className: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="16" height="13" x="4" y="5" rx="2" />
        <path d="M16 2v3.3a2 2 0 0 0 1.95 2.25h0a2 2 0 0 0 2-2.26V2" />
        <path d="M6 2v3.3a2 2 0 0 1-1.99 2.16h0A2 2 0 0 1 2 5.09V2" />
        <circle cx="9" cy="21" r="1" />
        <circle cx="15" cy="21" r="1" />
    </svg>
);

export default HospitalsView;
