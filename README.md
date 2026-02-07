# Campania COP Platform

Campania COP (Common Operating Picture) Platform è una dashboard operativa avanzata per il monitoraggio e la gestione dei rischi in tempo reale nella regione Campania. Sviluppata con **React**, **Vite** e **Tailwind CSS**, la piattaforma fornisce agli operatori una visione unificata della situazione territoriale, integrando dati critici su sismi, rischio idrogeologico e stato delle strutture sanitarie.

**Funzionalità Principali:**
*   **Dashboard Operativa:** Visualizzazione KPI in tempo reale (temperatura, rischio meteo, rischio sanitario, disponibilità mezzi).
*   **Mappa dei Rischi:** Mappa interattiva con layer sovrapponibili per sismicità, rischio idrogeologico e logistica sanitaria.
*   **Simulazione Scenari:** Capacità di simulare eventi critici (ondate di calore, tempeste) per testare la risposta del sistema.
*   **AI Assistant:** Integrazione con Google Gemini per supporto decisionale intelligente tramite chat.
*   **Gestione Risorse:** Monitoraggio stato ospedali e allocazione risorse di emergenza.
*   **Report Ambientali:** Sezione dedicata alla reportistica ambientale.

## Repo Structure

```bash
.
├── components
│   ├── AIChat.tsx
│   ├── Dashboard.tsx
│   ├── EnvironmentalReport.tsx
│   ├── HospitalsView.tsx
│   ├── Login.tsx
│   ├── ResourcesView.tsx
│   ├── RiskMap.tsx
│   └── SettingsView.tsx
├── data_to_yaml
│   ├── data.csv
│   ├── find_model.py
│   ├── generate_site.py
│   └── site_config.yaml
├── services
│   └── geminiService.ts
├── .env.local
├── .gitignore
├── App.tsx
├── constants.ts
├── index.html
├── index.tsx
├── package.json
├── requirements.txt
├── tsconfig.json
├── types.ts
└── vite.config.ts
```

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
