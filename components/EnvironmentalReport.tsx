
import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import { AlertTriangle, BookOpen, CheckCircle, Info, Thermometer, Wind } from 'lucide-react';
// @ts-ignore
// import reportContent from '../data_to_yaml/site_config.yaml?raw';

interface ReportData {
  title: string;
  description: string;
  alerts?: {
    level: 'critical' | 'warning' | 'info';
    message: string;
  }[];
  sections?: {
    title: string;
    content: string;
    recommendation?: string;
  }[];
}

const EnvironmentalReport: React.FC = () => {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Trigger generation immediately on load
        const response = await fetch('/api/generate-report');
        if (!response.ok) throw new Error('Failed to fetch report');
        const text = await response.text();
        const parsedData = yaml.load(text) as ReportData;
        setData(parsedData);
      } catch (e) {
        console.error("Error parsing YAML:", e);
        setError("Impossibile caricare il report. Verifica che il file site_config.yaml sia valido.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const renderMarkdown = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400 animate-pulse">
        Caricamento Report Ambientale...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-full text-red-400">
        <AlertTriangle className="mr-2" />
        {error || "Nessun dato disponibile."}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-8 p-4">

      {/* Header Section */}
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <BookOpen size={120} className="text-indigo-400" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-bold tracking-wider text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 rounded-full uppercase">
              Report Settimanale
            </span>
            <span className="text-xs text-slate-500 font-mono">Generato da AI</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
            {data.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed border-l-4 border-indigo-500 pl-4 py-1">
            {data.description}
          </p>
        </div>
      </div>

      {/* Alerts Section */}
      {data.alerts && data.alerts.length > 0 && (
        <div className="grid gap-4">
          {data.alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-l-4 flex items-start gap-4 shadow-lg backdrop-blur-sm transition-transform hover:scale-[1.01] ${alert.level === 'critical'
                  ? 'bg-red-500/10 border-red-500 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                  : alert.level === 'warning'
                    ? 'bg-orange-500/10 border-orange-500 text-orange-100 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
                    : 'bg-blue-500/10 border-blue-500 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
            >
              <div className={`p-3 rounded-lg shrink-0 ${alert.level === 'critical' ? 'bg-red-500/20 text-red-400' :
                  alert.level === 'warning' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                }`}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 uppercase tracking-wider">
                  {alert.level === 'critical' ? 'Allerta Critica' : alert.level === 'warning' ? 'Attenzione' : 'Nota Informativa'}
                </h3>
                <div
                  className="opacity-90 leading-relaxed font-light"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(alert.message) }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.sections?.map((section, index) => (
          <div key={index} className="glass-panel p-6 rounded-2xl flex flex-col h-full hover:border-slate-600 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/50">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shadow-inner">
                {index % 2 === 0 ? <Thermometer size={20} /> : <Wind size={20} />}
              </div>
              <h2 className="text-xl font-bold text-slate-100">{section.title}</h2>
            </div>

            <div className="prose prose-invert prose-sm max-w-none mb-6 text-slate-300 leading-relaxed flex-grow">
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(section.content) }} />
            </div>

            {section.recommendation && (
              <div className="mt-auto bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3 items-start">
                <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Raccomandazione</span>
                  <p
                    className="text-sm text-emerald-100/80 italic"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(section.recommendation || '') }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default EnvironmentalReport;
