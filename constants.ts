import { UserRole, RiskLevel, Hospital, SeismicEvent, Alert, Coordinates } from './types';

// Approximate relative coordinates for a stylized map (0-100 grid)
// Napoli is roughly central-left.
export const CITIES: Coordinates[] = [
  { label: 'Napoli', x: 35, y: 60 },
  { label: 'Salerno', x: 65, y: 75 },
  { label: 'Caserta', x: 40, y: 35 },
  { label: 'Benevento', x: 70, y: 40 },
  { label: 'Avellino', x: 60, y: 55 },
  { label: 'Pozzuoli (Campi Flegrei)', x: 28, y: 62 },
];

export const MOCK_HOSPITALS: Hospital[] = [
  { id: '1', name: 'A.O.R.N. Cardarelli', location: 'Napoli', occupancyRate: 92, erWaitTime: 180, ambulanceAvailable: 2, status: RiskLevel.CRITICAL },
  { id: '2', name: 'Ospedale del Mare', location: 'Napoli', occupancyRate: 85, erWaitTime: 120, ambulanceAvailable: 5, status: RiskLevel.HIGH },
  { id: '3', name: 'A.O.U. Ruggi d\'Aragona', location: 'Salerno', occupancyRate: 78, erWaitTime: 60, ambulanceAvailable: 8, status: RiskLevel.MEDIUM },
  { id: '4', name: 'A.O. San Pio', location: 'Benevento', occupancyRate: 65, erWaitTime: 45, ambulanceAvailable: 10, status: RiskLevel.LOW },
];

export const RECENT_SEISMIC: SeismicEvent[] = [
  { id: 's1', magnitude: 2.1, depth: 2.5, location: 'Campi Flegrei', time: '10 min fa', coordinates: { x: 28, y: 62, label: 'Epicentro' } },
  { id: 's2', magnitude: 1.8, depth: 3.0, location: 'Vesuvio', time: '2 ore fa', coordinates: { x: 45, y: 65, label: 'Epicentro' } },
];

export const ACTIVE_ALERTS: Alert[] = [
  { id: 'a1', type: 'HEAT', level: RiskLevel.HIGH, message: 'Ondata di calore: Temperature > 38°C previste nelle aree urbane di Napoli e Caserta.', timestamp: 'Oggi, 08:00', location: 'Area Metropolitana Napoli' },
  { id: 'a2', type: 'SEISMIC', level: RiskLevel.MEDIUM, message: 'Sciame sismico in corso area Solfatara. Monitoraggio attivo.', timestamp: 'Oggi, 09:30', location: 'Pozzuoli' },
];

// --- MOCK USERS ---
export const MOCK_USERS = [
  { username: "admin", password: "123", fullName: "Amministratore", avatar: "AD", role: UserRole.DECISION_MAKER },
  { username: "mario", password: "123", fullName: "Mario Rossi", avatar: "MR", role: UserRole.OPERATOR },
  { username: "giulia", password: "123", fullName: "Giulia Bianchi", avatar: "GB", role: UserRole.CITIZEN }
];

export const SYSTEM_INSTRUCTION_DECISION_MAKER = `
// ... existing content ...
Sei un'AI Prescrittiva per la piattaforma "Campania Resilienza". 
Il tuo ruolo è supportare i Decision Maker (Protezione Civile, Regione) nella gestione di rischi sismici (Campi Flegrei, Vesuvio), idrogeologici e sanitari.
Fornisci risposte basate su dati, sintetiche e orientate all'azione.
Usa un tono istituzionale, preciso e urgente se necessario.
Struttura la risposta con:
1. Analisi della situazione
2. Livello di Rischio (Basso/Medio/Alto/Critico)
3. Azioni Prescrittive (es. "Attivare COC", "Pre-allertare ospedali")
`;

export const SYSTEM_INSTRUCTION_CITIZEN = `
Sei un'AI assistente per i cittadini della Campania.
Il tuo obiettivo è rassicurare, informare e dare istruzioni chiare su sicurezza sismica, ondate di calore o emergenze.
Usa un linguaggio semplice, chiaro ed empatico.
Non creare allarmismo ingiustificato.
Fornisci raccomandazioni pratiche (es. "Bere molto", "Stare lontano dai vetri").
`;
