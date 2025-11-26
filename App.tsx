import React, { useState, useEffect, useRef } from 'react';
import { AppView, User, Notification, Language, MapMode } from './types';
import { Icons } from './components/Icons';
import { MapVisual } from './components/MapVisual';
import { MOCK_NOTIFICATIONS, TRANSLATIONS, MOCK_HISTORY } from './constants';

/**
 * --- SUB-COMPONENTS ---
 * Smaller components used to build the main views.
 */

// Splash Screen: displayed initially while loading
const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    // Simulate loading time (e.g., checking auth session)
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 flex flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="z-10 flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl mb-6 shadow-2xl border border-white/30 animate-bounce">
          <Icons.Bus className="w-16 h-16 text-white drop-shadow-md" />
        </div>
        <h1 className="text-5xl font-bold tracking-wider mb-2 drop-shadow-lg">HAFLA</h1>
        <p className="text-purple-100 text-sm tracking-widest uppercase font-medium">Smart School Tracking</p>
      </div>
    </div>
  );
};

// Social Login Component
const SocialLogin = ({ onSocialLogin }: { onSocialLogin: () => void }) => (
  <div className="w-full flex flex-col items-center gap-4 mt-4">
    <div className="flex items-center w-full gap-2">
      <div className="h-px bg-gray-200 flex-1"></div>
      <span className="text-xs text-gray-400 font-medium">Ou continuer avec</span>
      <div className="h-px bg-gray-200 flex-1"></div>
    </div>
    <div className="flex gap-4 justify-center w-full">
      <button onClick={onSocialLogin} className="w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
        <Icons.Google className="w-6 h-6 text-red-500" />
      </button>
      <button onClick={onSocialLogin} className="w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
        <Icons.Facebook className="w-6 h-6 text-blue-600" />
      </button>
      <button onClick={onSocialLogin} className="w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
        <Icons.Github className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  </div>
);

// Login Screen: Handles user authentication (simulated)
const LoginScreen = ({ onLogin, onSignupClick, t }: { onLogin: () => void, onSignupClick: () => void, t: any }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="h-screen w-full bg-white flex flex-col relative overflow-hidden">
       {/* Vivid Background using CSS shapes and gradients */}
       <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-br from-purple-600 to-indigo-600 rounded-b-[60px] shadow-2xl z-0"></div>
       <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
       <div className="absolute top-[10%] right-[-20px] w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="z-10 flex flex-col px-8 pt-20 h-full">
        <div className="mb-8 text-center">
            <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-white/30">
                <Icons.Bus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">{t.welcome}</h2>
            <p className="text-purple-100 text-lg">{t.subtitle}</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-4 flex-grow max-h-[580px] overflow-y-auto no-scrollbar">
             <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">{t.phoneLabel}</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icons.Phone className="w-5 h-5 text-purple-500" />
                        </div>
                        <input
                        type="tel"
                        className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
                        placeholder="20 123 456"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Mot de passe</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icons.Lock className="w-5 h-5 text-purple-500" />
                        </div>
                        <input
                        type="password"
                        className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
                        placeholder="•••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-right mt-2">
                        <a href="#" className="text-sm text-purple-600 font-bold hover:underline">Mot de passe oublié ?</a>
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <button
                onClick={onLogin}
                className="w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg shadow-purple-500/30 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] transition-transform active:scale-95"
                >
                Se connecter
                </button>
            </div>

            <SocialLogin onSocialLogin={onLogin} />
        </div>

        <div className="py-6 text-center z-10">
            <p className="text-gray-600">
                Pas encore de compte ?{' '}
                <button onClick={onSignupClick} className="text-purple-600 font-bold hover:underline">
                    S'inscrire
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

// Signup Screen: New user registration
const SignupScreen = ({ onSignup, onLoginClick, t }: { onSignup: () => void, onLoginClick: () => void, t: any }) => {
    return (
      <div className="h-screen w-full bg-white flex flex-col relative overflow-hidden">
         {/* Vivid Header with different gradient for distinction */}
         <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-bl from-pink-500 to-purple-600 rounded-b-[60px] shadow-2xl z-0"></div>
         <div className="absolute top-[-20px] right-[-20px] w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>
  
        <div className="z-10 flex flex-col px-8 pt-16 h-full">
          <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Créer un compte</h2>
              <p className="text-purple-100">Rejoignez la communauté Hafla</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-4 flex-grow max-h-[550px] overflow-y-auto no-scrollbar">
               
               {/* Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nom complet</label>
                        <input type="text" className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Votre nom" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Téléphone</label>
                        <input type="tel" className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" placeholder="20 123 456" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Code Enfant (Fourni par l'école)</label>
                        <input type="text" className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" placeholder="ex: HFL-8821" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Mot de passe</label>
                        <input type="password" className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" placeholder="•••••••" />
                    </div>
                </div>
  
              <div className="mt-4">
                  <button
                  onClick={onSignup}
                  className="w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg shadow-pink-500/30 bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-transform active:scale-95"
                  >
                  S'inscrire
                  </button>
              </div>

              <SocialLogin onSocialLogin={onSignup} />
          </div>
  
          <div className="py-6 text-center z-10">
              <p className="text-gray-600">
                  Déjà membre ?{' '}
                  <button onClick={onLoginClick} className="text-purple-600 font-bold hover:underline">
                      Se connecter
                  </button>
              </p>
          </div>
        </div>
      </div>
    );
  };

// Calendar Strip: Shows dynamic dates centered on today
const CalendarStrip = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [days, setDays] = useState<{ day: string, date: string, active: boolean }[]>([]);

    useEffect(() => {
        const today = new Date();
        const newDays = [];
        const formatterDay = new Intl.DateTimeFormat('fr-FR', { weekday: 'short' });
        const formatterDate = new Intl.DateTimeFormat('fr-FR', { day: 'numeric' });

        // Generate 5 days: 2 before today, today, 2 after today
        for (let i = -2; i <= 2; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            
            newDays.push({
                day: formatterDay.format(d).replace('.', ''),
                date: formatterDate.format(d),
                active: i === 0 // Today is active
            });
        }
        setDays(newDays);
    }, []);

  // Themed Background: Purple Gradient to match app identity
  return (
    <div className={`absolute top-0 left-0 right-0 pt-4 pb-6 px-4 z-30 flex justify-between items-center rounded-b-3xl shadow-xl transition-all duration-300 ${
        isDarkMode 
        ? 'bg-slate-900/95 border-b border-slate-700' 
        : 'bg-gradient-to-r from-purple-700 to-indigo-700'
    }`}>
        {days.map((d, i) => (
            <div key={i} className={`flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all border ${
                d.active 
                ? 'bg-white text-purple-700 scale-110 shadow-lg border-white font-extrabold' 
                : 'bg-white/10 text-purple-100 border-transparent hover:bg-white/20'
            }`}>
                <span className={`text-[10px] tracking-wider uppercase ${d.active ? 'text-purple-600' : 'text-purple-200'}`}>{d.day}</span>
                <span className="text-xl">{d.date}</span>
            </div>
        ))}
    </div>
  );
};

// Home View: The main tracking screen with Map and Bottom Sheet
const HomeView = ({ user, t, mapMode, setMapMode, isDarkMode }: any) => {
  const [busProgress, setBusProgress] = useState(20); // 0-100% of route
  const [isDelayed, setIsDelayed] = useState(false); // Simulated delay status
  const [mapSearch, setMapSearch] = useState('');
  
  // Sheet State: expanded (true) or collapsed (false)
  const [isSheetExpanded, setIsSheetExpanded] = useState(false); // Default collapsed
  const sheetRef = useRef<HTMLDivElement>(null);
  
  // Touch Handling for Drag Gesture
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Constants for drag behavior
  const MIN_SWIPE_DISTANCE = 50;

  // Handle Swipe Gestures on the bottom sheet
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); 
    setTouchStart(e.targetTouches[0].clientY);
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  }

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > MIN_SWIPE_DISTANCE;
    const isDownSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isUpSwipe) {
        setIsSheetExpanded(true);
    }
    if (isDownSwipe) {
        setIsSheetExpanded(false);
    }
  }

  // Simulate Bus Movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBusProgress(prev => {
        if (prev >= 100) return 0; // Reset loop
        // Randomly simulate delay in the middle of route
        if (prev > 45 && prev < 55 && Math.random() > 0.8) {
             setIsDelayed(true);
             return prev + 0.1; 
        }
        if (prev > 60) setIsDelayed(false);
        return prev + 0.3;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleBusClick = () => {
      setIsSheetExpanded(true);
  };

  // Share Functionality: Uses the Web Share API
  const handleShare = async () => {
      if (navigator.share) {
          try {
              await navigator.share({
                  title: 'Suivi Bus Hafla',
                  text: `Le bus de ${user.childName} est en route vers l'école. Arrivée estimée dans ${Math.floor((100 - busProgress) / 5)} min. Suivez le trajet en direct !`,
                  url: window.location.href // In a real app, this would be a deep link
              });
          } catch (error) {
              console.log('Error sharing:', error);
          }
      } else {
          // Fallback for browsers that don't support share API
          alert('Le partage n\'est pas supporté sur ce navigateur.');
      }
  };

  const stops = [
    { name: t.home, time: '07:30', status: 'completed' },
    { name: 'Avenue H. Bourguiba', time: '07:45', status: 'completed' },
    { name: 'Cité Olympique', time: '07:55', status: 'current' },
    { name: t.school, time: '08:15', status: 'pending' },
  ];

  return (
    <div className={`h-full relative flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      
      {/* Calendar Strip - Now Themed */}
      <CalendarStrip isDarkMode={isDarkMode} />

      {/* Floating Map Search Bar */}
      <div className="absolute top-28 left-4 right-4 z-20">
        <div className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg backdrop-blur-md transition-colors ${
            isDarkMode ? 'bg-slate-800/80 text-white border border-slate-700' : 'bg-white/90 text-gray-800 border border-gray-100'
        }`}>
            <Icons.Search className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-purple-600'}`} />
            <input 
                type="text" 
                placeholder="Rechercher une adresse..." 
                className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder-gray-500"
                value={mapSearch}
                onChange={(e) => setMapSearch(e.target.value)}
            />
            {mapSearch && (
                <button onClick={() => setMapSearch('')} className="p-1">
                    <Icons.Close size={16} className="text-gray-400" />
                </button>
            )}
        </div>
      </div>

      {/* Map Implementation */}
      <div className="flex-grow relative mt-0 z-0">
        <MapVisual 
            progress={busProgress} 
            isDelayed={isDelayed} 
            mode={mapMode} 
            isDarkMode={isDarkMode}
            onBusClick={handleBusClick}
            searchQuery={mapSearch}
        />
      </div>

      {/* Draggable Bottom Sheet - Dark Theme Styled */}
      <div 
        ref={sheetRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
        className={`absolute bottom-0 left-0 right-0 bg-slate-900 rounded-t-[30px] shadow-[0_-5px_30px_rgba(0,0,0,0.5)] z-40 flex flex-col transition-all duration-500 ease-in-out border-t border-slate-700/50 ${
            isSheetExpanded ? 'h-[75%]' : 'h-[30%]'
        }`}
      >
        {/* Drag Handle */}
        <div 
            className="w-full flex justify-center pt-4 pb-2 cursor-pointer"
            onClick={() => setIsSheetExpanded(!isSheetExpanded)}
        >
            <div className="w-16 h-1.5 bg-slate-600 rounded-full"></div>
        </div>
        
        <div className="px-6 flex flex-col h-full overflow-hidden">
            
            {/* Header: Status & ETA */}
            <div className="flex justify-between items-start mb-6 mt-2">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Trajet vers École</h3>
                    <div className="flex items-center gap-2">
                         <span className={`flex h-3 w-3 relative`}>
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDelayed ? 'bg-orange-500' : 'bg-green-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${isDelayed ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                         </span>
                         <p className={`text-sm font-medium ${isDelayed ? 'text-orange-400' : 'text-green-400'}`}>
                            {isDelayed ? `${t.status_delayed} (+10m)` : t.status_moving}
                         </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-purple-400">
                        {Math.floor((100 - busProgress) / 5)} <span className="text-lg text-gray-400 font-normal">min</span>
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{t.estimatedTime}</div>
                </div>
            </div>

            {/* Content Container with Scroll for Expanded State */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                
                {/* Driver Info Card */}
                <div className="bg-slate-800/50 rounded-2xl p-4 flex items-center gap-4 border border-slate-700 mb-6 shadow-lg backdrop-blur-sm">
                    <div className="relative">
                        <img src="https://picsum.photos/100/100" alt="Driver" className="w-14 h-14 rounded-full object-cover border-2 border-slate-600" />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-slate-800 w-4 h-4 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                        <div className="text-base font-bold text-white">Mohsen Bani</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{t.driver} • Bus 42</div>
                    </div>
                    <button className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 hover:bg-green-600 hover:text-white transition-all">
                        <Icons.Phone className="w-5 h-5" />
                    </button>
                </div>

                {/* Quick Actions Grid (Parent Needs) */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                     <button className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2 active:bg-slate-700 transition-colors h-24">
                        <div className="bg-red-500/20 p-2 rounded-lg text-red-400">
                            <Icons.CalendarOff size={20} />
                        </div>
                        <span className="text-gray-300 text-[10px] font-bold text-center leading-tight">Signaler Absence</span>
                     </button>
                     
                     <button className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2 active:bg-slate-700 transition-colors h-24">
                        <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                            <Icons.School size={20} />
                        </div>
                        <span className="text-gray-300 text-[10px] font-bold text-center leading-tight">Contacter École</span>
                     </button>

                     {/* New Share Button */}
                     <button 
                        onClick={handleShare}
                        className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2 active:bg-slate-700 transition-colors h-24"
                     >
                        <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                            <Icons.Share size={20} />
                        </div>
                        <span className="text-gray-300 text-[10px] font-bold text-center leading-tight">Partager Trajet</span>
                     </button>
                </div>

                {/* Route Details Section */}
                <div className={`transition-opacity duration-300 ${isSheetExpanded ? 'opacity-100' : 'opacity-100'}`}>
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 pl-1">ITINÉRAIRE</h3>
                   <div className="relative pl-2">
                      {/* Vertical Line */}
                      <div className="absolute left-[7px] top-2 bottom-4 w-0.5 bg-slate-700"></div>
                      
                      <div className="space-y-8">
                        {stops.map((stop, idx) => (
                            <div key={idx} className="relative pl-8 group">
                               {/* Dot Indicator */}
                               <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-slate-900 shadow-sm z-10 transition-colors ${
                                   stop.status === 'completed' ? 'bg-purple-500' :
                                   stop.status === 'current' ? 'bg-orange-500 animate-pulse ring-4 ring-orange-500/20' :
                                   'bg-slate-700'
                               }`}></div>
                               
                               <div className="flex justify-between items-center">
                                    <div>
                                        <span className={`text-base font-medium transition-colors ${
                                            stop.status === 'pending' ? 'text-gray-500' : 
                                            stop.status === 'current' ? 'text-white' : 'text-gray-300'
                                        }`}>
                                            {stop.name}
                                        </span>
                                        {stop.status === 'current' && (
                                            <div className="text-xs text-orange-400 font-medium mt-1">En cours</div>
                                        )}
                                    </div>
                                    <span className="text-xs font-mono text-gray-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                                        {stop.time}
                                    </span>
                               </div>
                            </div>
                        ))}
                      </div>
                   </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- NEW VIEW: Child Profile ---
// Displays static details about the child (School, Class, ID Card)
const ChildProfileView = ({ user, onBack, t }: any) => {
    return (
        <div className="h-full bg-gray-50 dark:bg-slate-900 flex flex-col p-6 overflow-y-auto transition-colors duration-300">
             <div className="flex items-center gap-4 mb-8 pt-6">
                <button onClick={onBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm"><Icons.Back className="w-5 h-5 text-gray-700 dark:text-white" /></button>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.childProfile}</h1>
            </div>

            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-3xl font-bold text-purple-600 dark:text-purple-400 border-4 border-white dark:border-slate-800 shadow-lg mb-4">
                    {user.childName.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user.childName}</h2>
                <p className="text-gray-500 dark:text-gray-400">{user.childSchool}</p>
            </div>

            <div className="space-y-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                    <label className="text-xs text-gray-400 uppercase font-bold">École</label>
                    <p className="text-gray-800 dark:text-white font-medium mt-1">{user.childSchool}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                    <label className="text-xs text-gray-400 uppercase font-bold">Age</label>
                    <p className="text-gray-800 dark:text-white font-medium mt-1">{user.childAge} ans</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                    <label className="text-xs text-gray-400 uppercase font-bold">Classe</label>
                    <p className="text-gray-800 dark:text-white font-medium mt-1">3ème Année</p>
                </div>
                
                 {/* QR Code Section - Simulated */}
                <div className="bg-purple-600 p-6 rounded-2xl shadow-lg mt-4 flex items-center justify-between text-white">
                    <div>
                        <h3 className="font-bold text-lg">Carte d'accès</h3>
                        <p className="text-purple-200 text-xs">Scan pour monter dans le bus</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg">
                        <div className="w-12 h-12 bg-gray-900 opacity-20"></div> {/* Placeholder for QR */}
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- NEW VIEW: History ---
// Displays past rides
const HistoryView = ({ onBack, t }: any) => {
    const [search, setSearch] = useState('');
    
    // Filter history based on search
    const filteredHistory = MOCK_HISTORY.filter(ride => 
        ride.date.toLowerCase().includes(search.toLowerCase()) || 
        ride.pickup.toLowerCase().includes(search.toLowerCase()) ||
        ride.dropoff.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-900 flex flex-col p-6 overflow-y-auto transition-colors duration-300">
             <div className="flex items-center gap-4 mb-6 pt-6">
                <button onClick={onBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm"><Icons.Back className="w-5 h-5 text-gray-700 dark:text-white" /></button>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.history}</h1>
            </div>

            {/* Search Input */}
            <div className="mb-6 relative">
                <Icons.Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Rechercher par date ou lieu..." 
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border-none shadow-sm focus:ring-2 focus:ring-purple-500 text-gray-700 dark:text-white placeholder-gray-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button onClick={() => setSearch('')} className="absolute right-4 top-3.5 text-gray-400">
                        <Icons.Close size={18} />
                    </button>
                )}
            </div>

            <div className="space-y-4 pb-20">
                {filteredHistory.length > 0 ? (
                    filteredHistory.map((ride) => (
                        <div key={ride.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-800 dark:text-white">{ride.date}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    ride.status === 'completed' ? 'bg-green-100 text-green-600' : 
                                    ride.status === 'absent' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {ride.status === 'completed' ? 'Terminé' : 'Absent'}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 relative">
                                <div className="absolute left-1.5 top-1 bottom-1 w-0.5 bg-gray-200 dark:bg-slate-700"></div>
                                <div className="space-y-4 w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-600 rounded-full z-10"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{ride.pickup}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 border-2 border-purple-600 bg-white dark:bg-slate-800 rounded-full z-10"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{ride.dropoff}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-gray-400 block">Durée</span>
                                    <span className="text-sm font-mono text-gray-700 dark:text-gray-200">{ride.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">Aucun trajet trouvé.</div>
                )}
            </div>
        </div>
    )
}

// Notification List View
const NotificationView = ({ notifications, t }: any) => {
  const [search, setSearch] = useState('');

  const filteredNotifs = notifications.filter((n: Notification) => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full bg-gray-50 dark:bg-slate-900 flex flex-col pb-24 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 p-6 pt-12 shadow-sm z-10 sticky top-0">
         <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t.notifications}</h1>
         
         {/* Search Input */}
         <div className="relative">
            <Icons.Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Rechercher une notification..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-800 dark:text-white placeholder-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-gray-400">
                    <Icons.Close size={16} />
                </button>
            )}
         </div>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto no-scrollbar flex-grow">
        {filteredNotifs.length > 0 ? (
            filteredNotifs.map((notif: Notification) => (
            <div key={notif.id} className={`p-4 rounded-2xl shadow-sm border-l-4 transition-all duration-300 dark:bg-slate-800 ${
                notif.type === 'arrival' ? 'bg-white border-green-500' :
                notif.type === 'delay' ? 'bg-orange-50 dark:bg-slate-700 border-orange-500' :
                notif.type === 'incident' ? 'bg-red-50 dark:bg-slate-700 border-red-500' :
                'bg-white border-purple-500'
            }`}>
                <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold ${
                    notif.type === 'delay' ? 'text-orange-700 dark:text-orange-400' : 'text-gray-800 dark:text-white'
                }`}>{notif.title}</h3>
                <span className="text-xs text-gray-400 bg-white/50 dark:bg-slate-900/50 px-2 py-1 rounded-full">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{notif.message}</p>
            </div>
            ))
        ) : (
            <div className="text-center py-10 text-gray-500">Aucune notification trouvée.</div>
        )}
      </div>
    </div>
  );
};

// Profile View: User Settings, Navigation to Child Profile, Theme, Language
const ProfileView = ({ user, setUser, onLogout, t, isDarkMode, setIsDarkMode, lang, setLang, navigate }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(user.name);
    const [editPhone, setEditPhone] = useState(user.phone);

    const handleSave = () => {
        setUser({...user, name: editName, phone: editPhone});
        setIsEditing(false);
    };

    return (
        <div className="h-full bg-gray-50 dark:bg-slate-900 flex flex-col pb-24 transition-colors duration-300">
            {/* Header / Avatar Card */}
            <div className="bg-purple-600 dark:bg-purple-800 text-white p-6 pt-12 pb-12 rounded-b-[40px] shadow-lg relative transition-colors duration-300">
                 <div className="flex justify-between items-start mb-4">
                     <h2 className="text-xl font-bold">{t.profile}</h2>
                     <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="p-2 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-sm">
                        {isEditing ? <Icons.Save className="w-5 h-5" /> : <Icons.Edit className="w-5 h-5" />}
                     </button>
                 </div>
                 
                 <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                        {user.name.charAt(0)}
                     </div>
                     <div className="flex-1">
                         {isEditing ? (
                             <input className="bg-white/20 border border-white/30 rounded p-1 w-full mb-1 text-white placeholder-purple-200" value={editName} onChange={(e) => setEditName(e.target.value)} />
                         ) : (
                             <h2 className="text-xl font-bold">{user.name}</h2>
                         )}
                         {isEditing ? (
                             <input className="bg-white/20 border border-white/30 rounded p-1 w-full text-xs text-white" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                         ) : (
                             <p className="text-purple-200 text-sm">+216 {user.phone}</p>
                         )}
                     </div>
                 </div>
            </div>

            <div className="mt-8 px-6 space-y-2 overflow-y-auto">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.general}</div>
                
                <button onClick={() => navigate(AppView.CHILD_PROFILE)} className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400"><Icons.User size={18} /></div>
                        <span className="text-gray-700 dark:text-gray-200 font-medium">{t.childProfile}</span>
                    </div>
                    <Icons.ChevronRight size={18} className="text-gray-400" />
                </button>
                
                <button onClick={() => navigate(AppView.HISTORY)} className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"><Icons.Map size={18} /></div>
                        <span className="text-gray-700 dark:text-gray-200 font-medium">{t.history}</span>
                    </div>
                    <Icons.ChevronRight size={18} className="text-gray-400" />
                </button>

                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">{t.settings}</div>
                
                {/* Theme Toggle */}
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                            {isDarkMode ? <Icons.Moon size={18} /> : <Icons.Sun size={18} />}
                        </div>
                        <span className="text-gray-700 dark:text-gray-200 font-medium">{t.darkMode}</span>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-purple-600' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : ''}`}></div>
                    </div>
                </button>

                {/* Language Toggle */}
                <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between mt-2">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400"><Icons.Globe size={18} /></div>
                        <span className="text-gray-700 dark:text-gray-200 font-medium">{t.language}</span>
                    </div>
                    <div className="flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
                        <button onClick={() => setLang('fr')} className={`px-2 py-1 text-xs rounded-md transition-colors ${lang === 'fr' ? 'bg-white dark:bg-slate-600 shadow-sm font-bold text-purple-600' : 'text-gray-500'}`}>FR</button>
                        <button onClick={() => setLang('en')} className={`px-2 py-1 text-xs rounded-md transition-colors ${lang === 'en' ? 'bg-white dark:bg-slate-600 shadow-sm font-bold text-purple-600' : 'text-gray-500'}`}>EN</button>
                        <button onClick={() => setLang('ar')} className={`px-2 py-1 text-xs rounded-md transition-colors ${lang === 'ar' ? 'bg-white dark:bg-slate-600 shadow-sm font-bold text-purple-600' : 'text-gray-500'}`}>AR</button>
                    </div>
                </div>

                 <button onClick={onLogout} className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/20 group transition-colors mt-6">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 group-hover:bg-red-200 transition-colors"><Icons.Logout size={18} /></div>
                        <span className="text-red-600 font-medium">{t.logout}</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
// Orchestrates the view navigation and global state
export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.SPLASH);
  const [lang, setLang] = useState<Language>('fr');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mapMode, setMapMode] = useState<MapMode>('standard');
  const [user, setUser] = useState<User>({
    name: 'Fatma Ben Ali',
    email: 'fatma@email.com',
    childName: 'Amine',
    childAge: '8',
    childSchool: 'École El Ghazala',
    phone: '20 123 456',
    avatarUrl: ''
  });
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const t = TRANSLATIONS[lang];
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogin = () => {
    setCurrentView(AppView.HOME);
  };

  const handleLogout = () => {
    setCurrentView(AppView.LOGIN);
  };

  // Notification simulation
  useEffect(() => {
    const timer = setTimeout(() => {
        const newNotif: Notification = {
            id: '4', 
            type: 'info', 
            title: 'Info Trafic', 
            message: 'Trafic fluide sur le retour.', 
            time: '08:10', 
            read: false 
        };
        setNotifications(prev => [newNotif, ...prev]);
    }, 10000); 
    return () => clearTimeout(timer);
  }, []);

  // Main Render Logic
  const renderContent = () => {
    switch (currentView) {
      case AppView.SPLASH:
        return <SplashScreen onFinish={() => setCurrentView(AppView.LOGIN)} />;
      case AppView.LOGIN:
        return <LoginScreen onLogin={handleLogin} onSignupClick={() => setCurrentView(AppView.SIGNUP)} t={t} />;
      case AppView.SIGNUP:
        return <SignupScreen onSignup={handleLogin} onLoginClick={() => setCurrentView(AppView.LOGIN)} t={t} />;
      case AppView.HOME:
        return <HomeView user={user} t={t} mapMode={mapMode} setMapMode={setMapMode} isDarkMode={isDarkMode} />;
      case AppView.NOTIFICATIONS:
        return <NotificationView notifications={notifications} t={t} />;
      case AppView.PROFILE:
        return <ProfileView 
            user={user} 
            setUser={setUser} 
            onLogout={handleLogout} 
            t={t} 
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode} 
            lang={lang} 
            setLang={setLang}
            navigate={setCurrentView}
        />;
      case AppView.CHILD_PROFILE:
          return <ChildProfileView user={user} onBack={() => setCurrentView(AppView.PROFILE)} t={t} />;
      case AppView.HISTORY:
          return <HistoryView onBack={() => setCurrentView(AppView.PROFILE)} t={t} />;
      default:
        return <SplashScreen onFinish={() => setCurrentView(AppView.LOGIN)} />;
    }
  };

  // Determine if we should show the bottom tab bar
  const showNav = [AppView.HOME, AppView.NOTIFICATIONS, AppView.PROFILE].includes(currentView);

  return (
    <div className={`w-full h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-gray-100'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {/* Mobile Container Frame: Simulates a mobile device view on desktop, or fills screen on mobile */}
        <div className="w-full h-full max-w-md bg-white dark:bg-slate-900 shadow-2xl relative overflow-hidden flex flex-col transition-colors duration-300">
            
            {/* View Content */}
            <main className="flex-grow relative h-full overflow-hidden">
                {renderContent()}
            </main>

            {/* Bottom Navigation */}
            {showNav && (
                <nav className="absolute bottom-6 left-4 right-4 bg-slate-900/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700 p-2 flex justify-around items-center z-50">
                    <button 
                        onClick={() => setCurrentView(AppView.HOME)}
                        className={`p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 ${currentView === AppView.HOME ? 'bg-purple-600 text-white w-24 shadow-lg shadow-purple-900/50' : 'text-gray-400 hover:bg-slate-800'}`}
                    >
                        <Icons.Navigation size={22} className={currentView === AppView.HOME ? 'fill-current' : ''} />
                    </button>
                    
                    <button 
                        onClick={() => setCurrentView(AppView.NOTIFICATIONS)}
                        className={`p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 ${currentView === AppView.NOTIFICATIONS ? 'bg-purple-600 text-white w-24 shadow-lg shadow-purple-900/50' : 'text-gray-400 hover:bg-slate-800'}`}
                    >
                         <div className="relative">
                             <Icons.Bell 
                                size={22} 
                                className={`${currentView === AppView.NOTIFICATIONS ? 'fill-current' : ''} ${unreadCount > 0 ? 'animate-bell-ring' : ''}`} 
                             />
                             {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
                         </div>
                    </button>
                    
                    <button 
                        onClick={() => setCurrentView(AppView.PROFILE)}
                        className={`p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 ${currentView === AppView.PROFILE ? 'bg-purple-600 text-white w-24 shadow-lg shadow-purple-900/50' : 'text-gray-400 hover:bg-slate-800'}`}
                    >
                        <Icons.User size={22} className={currentView === AppView.PROFILE ? 'fill-current' : ''} />
                    </button>
                </nav>
            )}
        </div>
    </div>
  );
}