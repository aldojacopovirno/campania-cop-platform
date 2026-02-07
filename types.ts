export enum UserRole {
  DECISION_MAKER = 'DECISION_MAKER',
  OPERATOR = 'OPERATOR',
  CITIZEN = 'CITIZEN'
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Coordinates {
  x: number;
  y: number;
  label: string;
}

export interface SeismicEvent {
  id: string;
  magnitude: number;
  depth: number;
  location: string;
  time: string;
  coordinates: Coordinates;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  occupancyRate: number; // Percentage
  erWaitTime: number; // Minutes
  ambulanceAvailable: number;
  status: RiskLevel;
}

export interface Alert {
  id: string;
  type: 'SEISMIC' | 'HYDRO' | 'HEAT' | 'SANITARY';
  level: RiskLevel;
  message: string;
  timestamp: string;
  location: string;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  heatIndex: number; // Perceived temp
  risk: RiskLevel;
}

// --- AUTH ---
export interface User {
  username: string;
  password?: string; // Optional for security when passing around
  fullName: string;
  avatar: string;
  role: UserRole;
}

// --- STATE ---
export interface DashboardState {
  location: string;
  temperature: number;
  weatherRisk: 'low' | 'moderate' | 'high';
  healthRisk: 'low' | 'medium' | 'high';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isPrescriptive?: boolean;
}
