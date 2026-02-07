import React from 'react';
import { Truck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const ResourcesView: React.FC = () => {
    const resources = [
        { id: 1, type: 'Ambulanza Medicalizzata', unit: 'BRAVO-1', status: 'AVAILABLE', location: 'Napoli Centro' },
        { id: 2, type: 'Ambulanza Rianimazione', unit: 'ALPHA-3', status: 'BUSY', location: 'Osp. Cardarelli' },
        { id: 3, type: 'Elisoccorso', unit: 'HELO-1', status: 'MAINTENANCE', location: 'Aeroporto Capodichino' },
        { id: 4, type: 'Automedica', unit: 'AUTO-2', status: 'AVAILABLE', location: 'Salerno' },
        { id: 5, type: 'Unità Mobile Idro', unit: 'IDRO-5', status: 'AVAILABLE', location: 'Sarno' },
    ];

    return (
        <div className="h-full p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Truck className="text-indigo-400" />
                Gestione Risorse & Mezzi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((res) => (
                    <div key={res.id} className="glass-panel p-5 rounded-xl border border-slate-700/50 hover:border-indigo-500/50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                                <Truck size={24} />
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${res.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400' :
                                    res.status === 'BUSY' ? 'bg-red-500/20 text-red-400' :
                                        'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {res.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-200 mb-1">{res.unit}</h3>
                        <p className="text-sm text-slate-400 mb-4">{res.type}</p>

                        <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-700/50 pt-3">
                            <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                            Posizione attuale: <span className="text-slate-300">{res.location}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesView;
