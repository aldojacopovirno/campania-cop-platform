# Campania COP Platform

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![AI4Purpose](https://img.shields.io/badge/Hackathon-AI4Purpose-FF6B6B)](https://www.codemotion.com/)

> Progetto sviluppato per l'Hackathon AI4Purpose di Codemotion

Campania COP (Common Operating Picture) Platform è una dashboard operativa avanzata per il monitoraggio e la gestione dei rischi in tempo reale nella regione Campania. Sviluppata con **React 19**, **Vite**, **TypeScript** e **Tailwind CSS**, la piattaforma fornisce agli operatori una visione unificata della situazione territoriale, integrando dati critici su sismi, rischio idrogeologico e stato delle strutture sanitarie.

## Funzionalità Principali

*   **Dashboard Operativa:** Visualizzazione KPI in tempo reale (temperatura, rischio meteo, rischio sanitario, disponibilità mezzi).
*   **Mappa dei Rischi:** Mappa interattiva con layer sovrapponibili per sismicità, rischio idrogeologico e logistica sanitaria.
*   **Simulazione Scenari:** Capacità di simulare eventi critici (ondate di calore, tempeste) per testare la risposta del sistema.
*   **AI Assistant:** Integrazione con Google Gemini per supporto decisionale intelligente tramite chat.
*   **Gestione Risorse:** Monitoraggio stato ospedali e allocazione risorse di emergenza.
*   **Report Ambientali:** Sezione dedicata alla reportistica ambientale generata tramite AI.

## Repo Structure

```bash
campania-cop-platform/
├── components/           # React components
│   ├── AIChat.tsx       # AI Assistant chatbot (Google Gemini)
│   ├── Dashboard.tsx    # Main dashboard con KPI
│   ├── EnvironmentalReport.tsx  # Report ambientali generati via AI
│   ├── HospitalsView.tsx        # Vista ospedali e risorse sanitarie
│   ├── Login.tsx        # Autenticazione utenti
│   ├── ResourcesView.tsx        # Gestione risorse di emergenza
│   ├── RiskMap.tsx      # Mappa interattiva dei rischi
│   └── SettingsView.tsx # Impostazioni di sistema
├── data_to_yaml/        # Python scripts per data processing
│   ├── data.csv         # Dataset meteorologici
│   ├── find_model.py    # Model discovery
│   ├── generate_site.py # Report generator
│   └── site_config.yaml # Configurazione report
├── services/
│   └── geminiService.ts # API wrapper per Google Gemini
├── App.tsx              # Root component
├── constants.ts         # App constants
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration + custom middleware
└── package.json         # Dependencies
```

## Run Locally

### Prerequisites
- **Node.js** (v18 o superiore)
- **Python 3** (per la generazione di report)
- **Google Gemini API Key** ([Ottienila qui](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/campania-cop-platform.git
   cd campania-cop-platform
   ```

2. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies** (per la generazione report)
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**

   Crea un file `.env.local` nella root del progetto:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   L'applicazione sarà disponibile su `http://localhost:3000`

### Available Scripts

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Build di produzione
- `npm run preview` - Preview della build di produzione
- `npm run generate-report` - Genera il report ambientale via Python

## Build & Deployment

### Production Build

```bash
npm run build
```

I file ottimizzati saranno generati nella cartella `dist/`.

### Deploy

La piattaforma può essere deployata su:
- **Vercel** - `vercel deploy`
- **Netlify** - Drag & drop della cartella `dist/`
- **Docker** - (Dockerfile da implementare)

**Note:** Assicurati di configurare la variabile d'ambiente `GEMINI_API_KEY` nel provider di hosting.

## About the Hackathon

Questo progetto è stato sviluppato nell'ambito dell'**Hackathon AI4Purpose** organizzato da **Codemotion**, un evento dedicato allo sviluppo di soluzioni innovative basate sull'Intelligenza Artificiale per affrontare problematiche sociali e ambientali reali.

### Contributors
- **A. J. Virno**
- **A. Bucchignani**
- **S. Bosco**
- **D. Cioffi**


## License

Questo progetto è rilasciato sotto licenza [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ for AI4Purpose Hackathon by Codemotion
</div>
