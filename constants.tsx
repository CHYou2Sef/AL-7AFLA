
import React from 'react';
import { Notification, RideHistory } from './types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'arrival',
    title: 'Arrivée à destination',
    message: 'Le bus a déposé Amine à l\'école en toute sécurité.',
    time: '08:05',
    read: false,
  },
  {
    id: '2',
    type: 'delay',
    title: 'Retard estimé',
    message: 'Embouteillage important sur l\'avenue H. Bourguiba. Retard estimé de 10 min.',
    time: '07:45',
    read: true,
  },
  {
    id: '3',
    type: 'info',
    title: 'Départ du bus',
    message: 'Le bus scolaire a commencé sa tournée.',
    time: '07:15',
    read: true,
  }
];

export const MOCK_HISTORY: RideHistory[] = [
  { id: '1', date: '25 Nov 2025', pickup: 'Maison', dropoff: 'École El Ghazala', status: 'completed', duration: '45 min' },
  { id: '2', date: '24 Nov 2025', pickup: 'Maison', dropoff: 'École El Ghazala', status: 'completed', duration: '42 min' },
  { id: '3', date: '23 Nov 2025', pickup: 'Maison', dropoff: 'École El Ghazala', status: 'absent', duration: '-' },
  { id: '4', date: '22 Nov 2025', pickup: 'Maison', dropoff: 'École El Ghazala', status: 'completed', duration: '40 min' },
];

export const THEME_COLOR = "purple"; 

export const TRANSLATIONS = {
  fr: {
    welcome: "Bienvenue",
    subtitle: "Connectez-vous pour suivre votre enfant.",
    phoneLabel: "Numéro de téléphone",
    continue: "Continuer",
    terms: "En continuant, vous acceptez nos Termes et Conditions.",
    child: "Enfant",
    estimatedTime: "Temps estimé",
    driver: "Chauffeur",
    route: "Itinéraire",
    notifications: "Notifications",
    profile: "Profil",
    general: "Général",
    childProfile: "Profil de l'enfant",
    history: "Historique des trajets",
    settings: "Paramètres",
    darkMode: "Mode Sombre",
    language: "Langue",
    logout: "Se déconnecter",
    save: "Enregistrer",
    edit: "Modifier",
    home: "Maison",
    school: "École",
    status_moving: "En route",
    status_delayed: "Retardé",
    map_standard: "Standard",
    map_satellite: "Satellite",
    map_dark: "Sombre"
  },
  en: {
    welcome: "Welcome",
    subtitle: "Login to track your child.",
    phoneLabel: "Phone Number",
    continue: "Continue",
    terms: "By continuing, you agree to our Terms & Conditions.",
    child: "Child",
    estimatedTime: "Estimated Time",
    driver: "Driver",
    route: "Route",
    notifications: "Notifications",
    profile: "Profile",
    general: "General",
    childProfile: "Child Profile",
    history: "Ride History",
    settings: "Settings",
    darkMode: "Dark Mode",
    language: "Language",
    logout: "Logout",
    save: "Save",
    edit: "Edit",
    home: "Home",
    school: "School",
    status_moving: "On the way",
    status_delayed: "Delayed",
    map_standard: "Standard",
    map_satellite: "Satellite",
    map_dark: "Dark"
  },
  ar: {
    welcome: "مرحباً",
    subtitle: "قم بتسجيل الدخول لتتبع طفلك.",
    phoneLabel: "رقم الهاتف",
    continue: "متابعة",
    terms: "بالمتابعة، أنت توافق على الشروط والأحكام.",
    child: "الطفل",
    estimatedTime: "الوقت المقدر",
    driver: "السائق",
    route: "المسار",
    notifications: "الإشعارات",
    profile: "الملف الشخصي",
    general: "عام",
    childProfile: "ملف الطفل",
    history: "سجل الرحلات",
    settings: "الإعدادات",
    darkMode: "الوضع الداكن",
    language: "اللغة",
    logout: "تسجيل الخروج",
    save: "حفظ",
    edit: "تعديل",
    home: "المنزل",
    school: "المدرسة",
    status_moving: "في الطريق",
    status_delayed: "متأخر",
    map_standard: "قياسي",
    map_satellite: "قمر صناعي",
    map_dark: "داكن"
  }
};
