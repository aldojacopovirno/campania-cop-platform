import React, { useState, useEffect, useRef } from 'react';
import { UserRole, ChatMessage, User, DashboardState } from '../types';
import { generateAIResponse } from '../services/geminiService';
import { Send, Bot, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { MOCK_HOSPITALS, ACTIVE_ALERTS, RECENT_SEISMIC } from '../constants';

interface AIChatProps {
  role: UserRole;
  user: User;
  dashboardState: DashboardState;
}

const AIChat: React.FC<AIChatProps> = ({ role, user, dashboardState }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greeting = role === UserRole.DECISION_MAKER
      ? `SISTEMA PRESCRITTIVO ATTIVO. Benvenuto Direttore ${user.fullName}. In attesa di input operativi.`
      : `Ciao ${user.fullName.split(' ')[0]}! Sono il tuo assistente per la sicurezza. Come posso aiutarti?`;

    setMessages([{
      id: 'init',
      role: 'model',
      text: greeting,
      timestamp: new Date()
    }]);
  }, [role, user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Merge static mock data with dynamic dashboard state
    const contextData = JSON.stringify({
      currentStatus: dashboardState, // REAL-TIME DATA (Temp, Risks)
      hospitals: MOCK_HOSPITALS,
      alerts: ACTIVE_ALERTS,
      seismic: RECENT_SEISMIC,
      currentUser: { name: user.fullName, role: user.role }
    });

    const aiText = await generateAIResponse(userMsg.text, role, contextData);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: aiText,
      timestamp: new Date(),
      isPrescriptive: role === UserRole.DECISION_MAKER
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 backdrop-blur-xl relative">
      {/* Header */}
      <div className="p-5 border-b border-slate-700 bg-slate-900 flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <BrainCircuit size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm tracking-wide">AI Assistant</h3>
            <p className="text-[10px] text-indigo-400 font-mono">GEMINI 3 FLASH // ONLINE</p>
          </div>
        </div>
        {role === UserRole.DECISION_MAKER && (
          <div className="px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 uppercase tracking-widest">
            Level 1
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[90%] p-4 text-sm shadow-lg backdrop-blur-sm ${msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm'
                : msg.isPrescriptive
                  ? 'bg-slate-800 border-l-2 border-indigo-500 text-slate-200 rounded-r-2xl rounded-bl-2xl'
                  : 'bg-slate-800 text-slate-200 rounded-2xl rounded-tl-sm'
                }`}
            >
              {msg.isPrescriptive && msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700 text-indigo-400 font-bold text-[10px] uppercase tracking-widest">
                  <Sparkles size={12} /> Analisi Prescrittiva
                </div>
              )}
              <div className="whitespace-pre-wrap break-words leading-relaxed text-sm font-light">{msg.text}</div>
              <div className={`text-[9px] mt-2 text-right font-mono opacity-60 ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-500'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-700/50 flex items-center gap-3">
              <Loader2 size={14} className="animate-spin text-indigo-400" />
              <span className="text-xs text-slate-400 animate-pulse">Elaborazione scenario in corso...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={role === UserRole.DECISION_MAKER ? "Richiedi simulazione o analisi..." : "Scrivi un messaggio..."}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-12 py-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600 transition-all shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-600 transition-colors"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-[9px] text-slate-600">AI generated content can be inaccurate. Verify critical info.</p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;