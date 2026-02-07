import React from 'react';
import { CITIES, RECENT_SEISMIC } from '../constants';

interface RiskMapProps {
  showSeismic: boolean;
  showHydro: boolean;
  showHealth: boolean;
}

const RiskMap: React.FC<RiskMapProps> = ({ showSeismic, showHydro, showHealth }) => {
  return (
    <div className="relative w-full h-full bg-[#0B1121] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Radar Scan Effect (Centered on Napoli roughly) */}
      <div className="absolute top-[30%] left-[35%] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
         <div className="w-full h-full radar-scan"></div>
      </div>

      {/* SVG Map Layer */}
      <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Region Outline - Tactical Style */}
        <path 
          d="M 20 10 L 60 5 L 90 20 L 95 60 L 70 95 L 40 90 L 20 70 L 15 40 Z" 
          fill="#1e293b" 
          fillOpacity="0.4"
          stroke="#475569" 
          strokeWidth="0.5" 
          strokeDasharray="1 1"
        />
        
        {/* Hydro Risk Zones */}
        {showHydro && (
            <>
            <path d="M 40 35 L 50 35 L 50 45 L 40 45 Z" fill="url(#hydroPattern)" stroke="#3b82f6" strokeWidth="0.2" opacity="0.6">
               <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M 65 70 L 75 70 L 75 80 L 65 80 Z" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="0.2">
               <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            </path>
            </>
        )}

        {/* Connections / Logistics Lines (Decorative) */}
        {showHealth && (
           <path d="M 35 60 L 65 75 L 70 40 L 40 35 Z" fill="none" stroke="#10b981" strokeWidth="0.1" strokeDasharray="2 1" opacity="0.3" />
        )}

        {/* Cities */}
        {CITIES.map((city) => (
          <g key={city.label} className="cursor-default hover:opacity-100 transition-opacity">
            <circle cx={city.x} cy={city.y} r="0.8" fill="#e2e8f0" />
            <circle cx={city.x} cy={city.y} r="2" fill="none" stroke="#64748b" strokeWidth="0.1" opacity="0.5" />
            <text x={city.x + 3} y={city.y + 0.5} fontSize="2.5" fill="#94a3b8" className="select-none font-mono font-bold tracking-tighter">
              {city.label.toUpperCase()}
            </text>
            <line x1={city.x} y1={city.y} x2={city.x + 2} y2={city.y} stroke="#64748b" strokeWidth="0.1" />
          </g>
        ))}

        {/* Seismic Events */}
        {showSeismic && RECENT_SEISMIC.map((event) => (
          <g key={event.id}>
             <circle cx={event.coordinates.x} cy={event.coordinates.y} r={event.magnitude * 2.5} fill="none" stroke="#f97316" strokeWidth="0.2" opacity="0.5">
                <animate attributeName="r" from="1" to={event.magnitude * 4} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
             </circle>
             <circle cx={event.coordinates.x} cy={event.coordinates.y} r="0.8" fill="#f97316" filter="url(#glow)" />
             <text x={event.coordinates.x - 5} y={event.coordinates.y - 3} fontSize="2" fill="#f97316" className="font-mono">
               M{event.magnitude}
             </text>
          </g>
        ))}
      </svg>
      
      {/* Overlay UI Elements */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-slate-700/50 shadow-xl">
          <h4 className="font-bold mb-2 text-[10px] uppercase tracking-widest text-slate-400">Map Layers</h4>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-[10px] text-slate-300">Sismicità Real-time</span>
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-sm bg-blue-500/50 border border-blue-500"></div>
            <span className="text-[10px] text-slate-300">Rischio Idrogeologico</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full border border-emerald-500"></div>
            <span className="text-[10px] text-slate-300">Logistica Sanitaria</span>
          </div>
        </div>
      </div>
      
      {/* Live Data Badge */}
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur px-4 py-2 rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
           <div className="relative">
             <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
             <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
           </div>
           <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest">
             SISTEMA OPERATIVO // ONLINE
           </span>
        </div>
      </div>
    </div>
  );
};

export default RiskMap;