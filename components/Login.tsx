import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { ShieldCheck, UserCircle, Activity, Lock, ChevronRight, UserPlus, LogIn } from 'lucide-react';
import { MOCK_USERS } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
      // Registration Logic
      if (!formData.username || !formData.password || !formData.fullName) {
        setError('Tutti i campi sono obbligatori');
        return;
      }
      if (MOCK_USERS.find(u => u.username === formData.username)) {
        setError('Username già esistente');
        return;
      }

      const newUser: User = {
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        avatar: formData.fullName.substring(0, 2).toUpperCase(),
        role: UserRole.CITIZEN // Default role for new users
      };

      // In a real app, we'd add to DB. Here we just log them in.
      onLogin(newUser);

    } else {
      // Login Logic
      const user = MOCK_USERS.find(u => u.username === formData.username && u.password === formData.password);
      if (user) {
        onLogin(user);
      } else {
        setError('Credenziali non valide');
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(79,70,229,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-2xl shadow-2xl">

        {/* Left: Branding & Info */}
        <div className="p-12 flex flex-col justify-between relative border-r border-slate-800/50 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/20">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Activity className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Campania<span className="text-indigo-400">Resilienza</span></span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
              Piattaforma Regionale <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Multi-Hazard Intelligence</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Sistema integrato per il monitoraggio sismico, idrogeologico e sanitario. Supporto decisionale attivo tramite AI Prescrittiva.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Sismico</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Idro</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Sanità</span>
            </div>
            <div className="h-px w-full bg-slate-800"></div>
            <p className="text-[10px] text-slate-600 uppercase tracking-wider">Accesso Riservato Personale Autorizzato</p>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="p-12 bg-slate-950/50 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-1">{isRegistering ? 'Crea Account' : 'Bentornato'}</h2>
            <p className="text-sm text-slate-500">
              {isRegistering ? 'Inserisci i tuoi dati per registrarti.' : 'Inserisci le credenziali per accedere.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 ml-1">NOME COMPLETO</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                  placeholder="Mario Rossi"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 ml-1">USERNAME</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                placeholder="Nome utente"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 ml-1">PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
                <Activity size={14} /> {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
            >
              {isRegistering ? <UserPlus size={18} /> : <LogIn size={18} />}
              {isRegistering ? 'REGISTRATI' : 'ACCEDI'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {isRegistering ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati a FORME E IDEE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;