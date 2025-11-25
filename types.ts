
export enum AppView {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  HOME = 'HOME',
  NOTIFICATIONS = 'NOTIFICATIONS',
  PROFILE = 'PROFILE',
  CHILD_PROFILE = 'CHILD_PROFILE',
  HISTORY = 'HISTORY'
}

export type Language = 'fr' | 'en' | 'ar';
export type MapMode = 'standard' | 'satellite' | 'dark';

export interface Notification {
  id: string;
  type: 'arrival' | 'delay' | 'incident' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface User {
  name: string;
  email: string;
  childName: string;
  childAge: string;
  childSchool: string;
  phone: string;
  avatarUrl: string;
}

export interface BusStatus {
  id: string;
  status: 'moving' | 'stopped' | 'delayed';
  nextStop: string;
  etaMinutes: number;
  progress: number; // 0 to 100
}

export interface RideHistory {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  status: 'completed' | 'absent' | 'cancelled';
  duration: string;
}