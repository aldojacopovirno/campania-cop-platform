# Campania COP Platform

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![AI4Purpose](https://img.shields.io/badge/Hackathon-AI4Purpose-FF6B6B)](https://www.codemotion.com/)

> Made with ❤️ for AI4Purpose Hackathon by Codemotion.

Campania COP (Common Operating Picture) Platform is an operational dashboard for real-time risk monitoring and management in the Campania region. Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**, the platform provides operators with a unified view of the territorial situation, integrating critical data on seismic activity, hydrogeological risk, and healthcare facility status.

## Key Features

*   **Operational Dashboard:** Real-time KPI visualization (temperature, weather risk, health risk, vehicle availability).
*   **Risk Map:** Interactive map with overlayable layers for seismicity, hydrogeological risk, and healthcare logistics.
*   **Scenario Simulation:** Ability to simulate critical events (heat waves, storms) to test system response.
*   **AI Assistant:** Integration with Google Gemini for intelligent decision support via chat.
*   **Resource Management:** Hospital status monitoring and emergency resource allocation.
*   **Environmental Reports:** Dedicated section for AI-generated environmental reporting.

## Repo Structure

```bash
campania-cop-platform/
├── components/                        # React components
│   ├── AIChat.tsx                     # AI Assistant chatbot (Google Gemini)
│   ├── Dashboard.tsx                  # Main dashboard with KPIs
│   ├── EnvironmentalReport.tsx        # AI-generated environmental reports
│   ├── HospitalsView.tsx              # Hospital view and healthcare resources
│   ├── Login.tsx                      # User authentication
│   ├── ResourcesView.tsx              # Emergency resource management
│   ├── RiskMap.tsx                    # Interactive risk map
│   └── SettingsView.tsx               # System settings
├── data_to_yaml/                      # Python scripts for data processing
│   ├── data.csv                       # Meteorological datasets
│   ├── find_model.py                  # Model discovery
│   ├── generate_site.py               # Report generator
│   └── site_config.yaml               # Report configuration
├── notebooks/                         # Jupyter notebooks for data science
│   ├── 00_data_exploration.ipynb      # Dataset exploration & RGB/HSV analysis
│   ├── 01_filter_clouds.ipynb         # Cloud detection (classic filters)
│   ├── 02_filter_vegetation.ipynb     # Vegetation detection (ExG + HSV)
│   ├── 03_filter_water.ipynb          # Water body detection
│   ├── 04_filter_desert.ipynb         # Desert/arid area detection
│   ├── 05_temperature_proxy.ipynb     # Temperature estimation from imagery
│   ├── 06_ml_classification.ipynb     # CNN classifier (91% accuracy)
│   └── 07_comparison_dashboard.ipynb  # Classic filters vs ML comparison
├── services/
│   └── geminiService.ts               # API wrapper for Google Gemini
├── App.tsx                            # Root component
├── constants.ts                       # App constants
├── types.ts                           # TypeScript type definitions
├── vite.config.ts                     # Vite configuration + custom middleware
└── package.json                       # Dependencies
```

## Run Locally

### Prerequisites
- **Node.js** (v18 or higher)
- **Python 3** (for report generation)
- **Google Gemini API Key**

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

3. **Install Python dependencies** (for report generation)
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**

   Create a `.env.local` file in the project root:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Production build
- `npm run preview` - Preview the production build
- `npm run generate-report` - Generate environmental report via Python

## Data Science & Analysis

The `notebooks/` directory contains a complete data science workflow for satellite image analysis, combining **classic image processing filters** and **machine learning** approaches.

### Dataset

- **4 categories**: Cloudy (1,500), Desert (1,131), Green Area (1,500), Water (1,500)
- **Image size**: 64x64 RGB images
- **Total**: 5,631 satellite images

### Running the Notebooks

```bash
# Install Python dependencies
pip install jupyter numpy matplotlib pillow opencv-python tensorflow scikit-learn seaborn

# Launch Jupyter
jupyter notebook notebooks/

# Or use VS Code with Jupyter extension
```

## Build

### Production Build

```bash
npm run build
```

Optimized files will be generated in the `dist/` folder.

## About the Hackathon

This project was developed for the **AI4Purpose Hackathon** organized by **Codemotion**, an event dedicated to developing innovative AI-based solutions to address real social and environmental challenges.

### Contributors
- **A. J. Virno**
- **A. Bucchignani**
- **S. Bosco**
- **D. Cioffi**

## License

This project is released under the [MIT License](LICENSE).
